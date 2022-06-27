import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MenuPopover from '../../../../../../shared/MenuPopover';
import Pagination from '../../../../../../shared/Pagination';
import AssignModal from '../../../../../../shared/Modal/components/AssignModal';
import BadgePrintingSystemRow from './BadgePrintingSystemRow';

import { GeneralModel, BadgePrintingSystemModel } from '../../../../../../../models';
import { SearchIcon } from '../../../../../../../../constants';
import { deleteObjectItem } from '../../../../../../../../utils/generalUtils';
import { useDebounce } from '../../../../../../../../utils/useDebounce';
import { inputGlobalStyles } from '../../../../../../../../assets/styles/Inputs/styles';
import { useStyles as summaryStyles } from '../../../../../../shared/BadgePrintingSystemSummary/styles';
import { useStyles } from '../../../../../../shared/Modal/components/AssignModal/styles';
import { tableGlobalStyles } from '../../../../../../../../assets/styles';

export interface IAssignBadgePrintingSystemModalProps {
  id: string;
  count: number;
  loading: GeneralModel.ILoadingStatus;
  assignLoading: GeneralModel.ILoadingStatus;
  badgePrintingSystemMap: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
  fetchBadgePrintingSystemList: (query: GeneralModel.IQueryParams) => void;
  assignBadgePrintingSystem: (projectId: string, list: BadgePrintingSystemModel.IBadgePrintingSystemUpdateDate[]) => void;
  closeModal: () => void;
}

interface ISelectedState {
  original: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
  filtered: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
}

const AssignBadgePrintingSystemModal = ({
  id,
  badgePrintingSystemMap,
  count,
  loading,
  assignLoading,
  assignBadgePrintingSystem,
  fetchBadgePrintingSystemList,
  closeModal,
}: IAssignBadgePrintingSystemModalProps) => {
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const summaryClasses = summaryStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const [queryParams, setQueryParams] = useState<GeneralModel.IQueryParams>({ page: 1, lastPage: 1, limit: 6, query: '' });
  const [selectedBadgePrintingSystemMap, setSelectedBadgePrintingSystem] = useState<ISelectedState>({ original: {}, filtered: {} });
  const [search, setSearch] = useState<string>('');
  const [isSearching, setSearching] = useState<boolean>(false);
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [bpsDate, setBpsDate] = useState<{ [key: string]: string }>({});
  const debouncedSearch = useDebounce(search, 350);

  const pageCount = useMemo(
    () => (showSelected ? Math.ceil(Object.keys(selectedBadgePrintingSystemMap.original).length / queryParams.limit) : Math.ceil(count / queryParams.limit)),
    [count, queryParams.limit, showSelected, selectedBadgePrintingSystemMap.original]
  );

  const badgePrintingSystemList = useMemo(() => {
    if (showSelected) {
      const startPage = (queryParams.page - 1) * queryParams.limit;
      const endPage = startPage + queryParams.limit;
      return Object.values(selectedBadgePrintingSystemMap.original).slice(startPage, endPage);
    }
    return Object.values(badgePrintingSystemMap);
  }, [badgePrintingSystemMap, queryParams, showSelected, selectedBadgePrintingSystemMap]);

  const assignDisabled = useMemo(() => Object.keys(selectedBadgePrintingSystemMap.original).length === 0, [selectedBadgePrintingSystemMap.original]);

  const onSelectBadgePrintingSystem = useCallback(
    (selectedId: string) => {
      setSelectedBadgePrintingSystem(prevState =>
        !prevState.original[selectedId]
          ? { ...prevState, original: { ...prevState.original, [selectedId]: badgePrintingSystemMap[selectedId] } }
          : { filtered: deleteObjectItem(prevState.filtered, selectedId), original: deleteObjectItem(prevState.original, selectedId) }
      );
    },
    [setSelectedBadgePrintingSystem, badgePrintingSystemMap]
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
      setSelectedBadgePrintingSystem(prevState => ({ ...prevState, filtered: prevState.original }));
    }
  }, [showSelected, setSearching, setShowSelected, setQueryParams]);

  const onChangeDate = useCallback(
    (workerId: string, shippingDate: string) => {
      setBpsDate(prevState => ({ ...prevState, [workerId]: shippingDate }));
    },
    [setBpsDate]
  );

  const onSubmit = useCallback(
    event => {
      event.persist();
      assignBadgePrintingSystem(
        id,
        Object.keys(selectedBadgePrintingSystemMap.original).map(itemId => ({ badgePrintingSystemId: itemId, shippingDate: bpsDate[itemId] }))
      );
    },
    [assignBadgePrintingSystem, id, bpsDate, selectedBadgePrintingSystemMap]
  );

  const onPageChange = useCallback(
    (newPage: number) => {
      setSearching(true);
      setQueryParams({ ...queryParams, page: newPage, lastPage: /* istanbul ignore next */ !showSelected ? newPage : queryParams.lastPage });
      /* istanbul ignore else */
      if (!showSelected) fetchBadgePrintingSystemList({ ...queryParams, page: newPage, available: true });
    },
    [setSearching, fetchBadgePrintingSystemList, setQueryParams, queryParams, showSelected]
  );

  const onSearchChange = useCallback(
    event => {
      event.persist();
      setSearching(true);
      setQueryParams({ ...queryParams, page: 1, query: event.target.value });
      setSearch(event.target.value);
    },
    [queryParams, setSearching, setQueryParams, setSearch]
  );

  useEffect(() => {
    if (!showSelected) fetchBadgePrintingSystemList({ ...queryParams, query: debouncedSearch, available: true });
    if (showSelected) {
      setSelectedBadgePrintingSystem(prevState => {
        if (debouncedSearch.length > 0) {
          const searchValue = debouncedSearch.toLowerCase();
          return {
            ...prevState,
            original: Object.values(prevState.filtered)
              .filter(
                item =>
                  item?.printerSerialNumber?.toLowerCase().indexOf(searchValue) > -1 ||
                  item?.laptopSerialNumber?.toLowerCase().indexOf(searchValue) > -1 ||
                  item?.scannerSerialNumber?.toLowerCase().indexOf(searchValue) > -1
              )
              .reduce((total, item) => ({ ...total, [item.id]: item }), {}),
          };
        }
        return { ...prevState, original: prevState.filtered };
      });
      setSearching(false);
    }
  }, [debouncedSearch, showSelected, id, setSearching, setSelectedBadgePrintingSystem, fetchBadgePrintingSystemList]); // eslint-disable-line

  useEffect(() => {
    if (loading && !loading.isLoading) setSearching(false);
  }, [loading, setSearching]);
  return (
    <AssignModal
      title={'Assign BPS'}
      loading={assignLoading && assignLoading.isLoading}
      confirmLabel={'Assign'}
      confirmLoadingLabel={'Assigning'}
      isConfirmEnabled={!assignDisabled}
      onClose={closeModal}
      onSubmit={onSubmit}
      render={() => (
        <>
          <div>
            <Box className={`${summaryClasses.filterStatusContainer} ${summaryClasses.filterStatusSpaced} ${classes.filterAssignSpacing}`}>
              <TextField
                variant="outlined"
                data-testid="assign-search-wrapper"
                placeholder="Find a BPS..."
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
                        { title: 'Show all', callback: onShowAll },
                        { title: 'Show selected', callback: onShowSelected },
                      ]}
                      placement={'bottom-end'}
                    />
                  </span>
                </div>
                <div className={`${classes.boldFilter} ${classes.filterTextColor}`}>
                  {count} BPS. {Object.keys(selectedBadgePrintingSystemMap.original).length} Selected
                </div>
              </div>
            </Box>
          </div>
          <div className={classes.assignSkeletonWrapper}>
            {loading && !loading.isLoading && !isSearching && badgePrintingSystemList.length === 0 && (
              <div className={classes.assignViewWrapper}>
                <Typography className={classes.notFoundText} data-testid="not-found">
                  Your search did not match any BPS
                </Typography>
              </div>
            )}
            {(!loading || (loading && loading.isLoading) || isSearching) && (
              <div className={classes.assignViewWrapper}>
                <Typography>Loading...</Typography>
              </div>
            )}
            {!isSearching && badgePrintingSystemList.length > 0 && (
              <>
                <Table aria-label="badgePrintingSystem-list">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Laptop Serial Number</TableCell>
                      <TableCell>Printer Serial Number</TableCell>
                      <TableCell>Scanner Serial Number</TableCell>
                      <TableCell>Shipping Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {badgePrintingSystemList.map(badgePrintingSystem => (
                      <BadgePrintingSystemRow
                        key={badgePrintingSystem.id}
                        badgePrintingSystem={badgePrintingSystem}
                        isSelected={!!selectedBadgePrintingSystemMap.original[badgePrintingSystem.id]}
                        bpsDate={bpsDate[badgePrintingSystem.id] || null}
                        onSelect={onSelectBadgePrintingSystem}
                        onChange={onChangeDate}
                      />
                    ))}
                  </TableBody>
                </Table>
                <Pagination styleClass={classes.assignPagination} page={queryParams.page} count={pageCount} onChange={onPageChange} />
              </>
            )}
          </div>
        </>
      )}
    />
  );
};

export default memo(AssignBadgePrintingSystemModal);
