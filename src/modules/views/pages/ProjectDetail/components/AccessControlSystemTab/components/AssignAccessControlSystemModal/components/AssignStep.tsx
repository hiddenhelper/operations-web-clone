import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import MenuPopover from '../../../../../../../shared/MenuPopover';
import Pagination from '../../../../../../../shared/Pagination';
import SelectFilter from '../../../../../../../shared/SelectFilter';
import AccessControlSystemRow from '../AccessControlSystemRow';

import { GeneralModel, AccessControlSystemModel } from '../../../../../../../../models';
import { SearchIcon } from '../../../../../../../../../constants';
import { getDefaultValue } from '../../../../../../../../../utils/generalUtils';
import { useDebounce } from '../../../../../../../../../utils/useDebounce';
import { useStyles } from '../../../../../../../shared/Modal/components/AssignModal/styles';
import { inputGlobalStyles } from '../../../../../../../../../assets/styles/Inputs/styles';
import { tableGlobalStyles } from '../../../../../../../../../assets/styles/Tables/styles';

export interface IAssignAccessControlSystemStepProps {
  count: number;
  loading: GeneralModel.ILoadingStatus;
  accessControlSystemMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  selectAcs: (id: string) => void;
  fetchAccessControlSystemList: (query: GeneralModel.IQueryParams) => void;
}

interface ISelectedState {
  original: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  filtered: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
}

const AssignAccessControlSystemStep = ({
  accessControlSystemMap,
  count,
  loading,
  selectAcs,
  fetchAccessControlSystemList,
}: IAssignAccessControlSystemStepProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const [isSearching, setSearching] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<GeneralModel.IQueryParams>({ page: 1, lastPage: 1, limit: 6, query: '', available: true });
  const [selectedAccessControlSystemMap, setSelectedAccessControlSystem] = useState<ISelectedState>({ original: {}, filtered: {} });
  const [search, setSearch] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 350);

  const pageCount = useMemo(
    () => (showSelected ? Math.ceil(Object.keys(selectedAccessControlSystemMap.original).length / queryParams.limit) : Math.ceil(count / queryParams.limit)),
    [count, queryParams.limit, showSelected, selectedAccessControlSystemMap.original]
  );

  const accessControlSystemList = useMemo(() => {
    if (showSelected) {
      const startPage = (queryParams.page - 1) * queryParams.limit;
      const endPage = startPage + queryParams.limit;
      return Object.values(selectedAccessControlSystemMap.original).slice(startPage, endPage);
    }
    return Object.values(accessControlSystemMap);
  }, [accessControlSystemMap, queryParams, showSelected, selectedAccessControlSystemMap]);

  const acsTypeFilterOptionList = useMemo(() => [{ value: '', label: 'All ACS' }, ...AccessControlSystemModel.typeOptionList], []);

  const onSelect = useCallback(
    (selectedId: string) => {
      selectAcs(selectedId);
      setSelectedAccessControlSystem(prevState => ({ ...prevState, original: { [selectedId]: accessControlSystemMap[selectedId] } }));
    },
    [setSelectedAccessControlSystem, selectAcs, accessControlSystemMap]
  );
  const onShowAll = useCallback(() => {
    /* istanbul ignore else */
    if (showSelected) {
      setShowSelected(false);
      setSearching(true);
      setQueryParams(prevState => ({ ...prevState, page: prevState.lastPage }));
    }
  }, [showSelected, setSearching, setShowSelected]);

  const onShowSelected = useCallback(() => {
    /* istanbul ignore else */
    if (!showSelected) {
      setShowSelected(true);
      setSearching(true);
      setQueryParams(prevState => ({ ...prevState, page: 1 }));
      setSelectedAccessControlSystem(prevState => ({ ...prevState, filtered: prevState.original }));
    }
  }, [showSelected, setSearching, setShowSelected, setQueryParams]);

  const onPageChange = useCallback(
    (newPage: number) => {
      setSearching(true);
      setQueryParams({ ...queryParams, page: newPage, lastPage: /* istanbul ignore next */ !showSelected ? newPage : queryParams.lastPage });
      /* istanbul ignore else */
      if (!showSelected) fetchAccessControlSystemList({ ...queryParams, page: newPage });
    },
    [setSearching, fetchAccessControlSystemList, setQueryParams, queryParams, showSelected]
  );

  const onSearchChange = useCallback(
    event => {
      event.persist();
      setSearching(true);
      setQueryParams({ ...queryParams, page: 1, query: event.target.value });
      setSearch(event.target.value);
    },
    [queryParams, setQueryParams, setSearch, setSearching]
  );

  const onFilterAcsTypeChange = useCallback(
    (type: number) => {
      setQueryParams({ ...queryParams, type });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    if (!showSelected) fetchAccessControlSystemList({ ...queryParams, query: debouncedSearch });
    if (showSelected) {
      setSelectedAccessControlSystem(prevState => {
        if (debouncedSearch.length > 0) {
          const searchValue = debouncedSearch.toLowerCase();
          return {
            ...prevState,
            original: Object.values(prevState.filtered)
              .filter(item => item.serialNumber.toLowerCase().indexOf(searchValue) > -1 || item?.reader1SerialNumber?.toLowerCase().indexOf(searchValue) > -1)
              .reduce((total, item) => ({ ...total, [item.id]: item }), {}),
          };
        }
        return { ...prevState, original: prevState.filtered };
      });
      setSearching(false);
    }
  }, [debouncedSearch, showSelected, setSearching, setSelectedAccessControlSystem, fetchAccessControlSystemList, queryParams.type]); // eslint-disable-line

  useEffect(() => {
    /* istanbul ignore else */
    if (loading && !loading.isLoading) setSearching(false);
  }, [loading, setSearching]);
  return (
    <>
      <div>
        <Box className={`${tableGlobalClasses.filterStatusContainer} ${classes.filterStatusSpaced} ${classes.filterAssignSpacing}`}>
          <TextField
            variant="outlined"
            data-testid="assign-search-wrapper"
            placeholder="Find an ACS..."
            type="text"
            autoComplete="off"
            name="find"
            value={search}
            onChange={onSearchChange}
            className={`${inputGlobalClasses.searchInput} ${inputGlobalClasses.searchSvg}`}
            inputProps={{
              'data-testid': 'search-filter',
            }}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <div className={classes.assignFilters}>
            <div className={classes.filterElement}>
              <Typography className={classes.filterTextColor}>Show {showSelected ? 'selected' : 'all'}</Typography>
              <span className={`${tableGlobalClasses.dropdownIcon} ${classes.boldFilter}`}>
                <MenuPopover
                  menuOptionList={[
                    { title: 'Show All', callback: onShowAll },
                    { title: 'Show selected', callback: onShowSelected },
                  ]}
                  placement={'bottom-end'}
                />
              </span>
            </div>
            <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
            <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer} ${classes.locationModalFilter}`}>
              <SelectFilter
                value={getDefaultValue(AccessControlSystemModel.accessControlSystemTypeMap[queryParams.type], 'All ACS')}
                optionList={acsTypeFilterOptionList}
                onChange={onFilterAcsTypeChange}
              />
            </Box>
            <div className={`${classes.boldFilter} ${classes.filterTextColor}`}>
              {count} ACS. {Object.keys(selectedAccessControlSystemMap.original).length} Selected
            </div>
          </div>
        </Box>
      </div>
      <div className={classes.assignSkeletonWrapper}>
        {loading && !loading.isLoading && !isSearching && accessControlSystemList.length === 0 && (
          <div className={classes.assignViewWrapper}>
            <Typography className={classes.notFoundText} data-testid="not-found">
              Your search did not match any ACS
            </Typography>
          </div>
        )}
        {(!loading || (loading && loading.isLoading) || isSearching) && (
          <div className={classes.assignViewWrapper}>
            <Typography>Loading...</Typography>
          </div>
        )}
        {!isSearching && !loading?.isLoading && accessControlSystemList.length > 0 && (
          <>
            <Table aria-label="accessControlSystem-list">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Device Serial Number</TableCell>
                  <TableCell>Reader 1 Hostname</TableCell>
                  <TableCell>Reader 2 Hostname</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accessControlSystemList.map(accessControlSystem => (
                  <AccessControlSystemRow
                    key={accessControlSystem.id}
                    accessControlSystem={accessControlSystem}
                    isSelected={!!selectedAccessControlSystemMap.original[accessControlSystem.id]}
                    onSelect={onSelect}
                  />
                ))}
              </TableBody>
            </Table>
            <Pagination styleClass={classes.assignPaginationLower} page={queryParams.page} count={pageCount} onChange={onPageChange} />
          </>
        )}
      </div>
    </>
  );
};

export default memo(AssignAccessControlSystemStep);
