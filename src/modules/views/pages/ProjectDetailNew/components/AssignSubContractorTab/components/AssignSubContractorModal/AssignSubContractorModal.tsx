import React, { memo, useCallback, useMemo, useEffect, useState, useRef } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import MenuPopover from '../../../../../../shared/MenuPopover';
import Pagination from '../../../../../../shared/Pagination';
import AssignModal from '../../../../../../shared/Modal/components/AssignModal';
import AssignEntity from '../../../../../../shared/AssignEntity';
import AutocompleteFilter from '../../../../../../shared/AutocompleteFilter';
import AssignEntityOption from '../../../../../../shared/AssignEntityOption';
import SubContractorRow from './SubContractorRow';

import { GeneralModel, ClientModel, ProjectModel, ResourceModel, UserModel } from '../../../../../../../models';
import { SearchIcon } from '../../../../../../../../constants';
import { useDebounce } from '../../../../../../../../utils/useDebounce';
import { useLocationFilter } from '../../../../../../../../utils/useLocationFilter';
import { deleteObjectItem, getConditionalDefaultValue, getDefaultValue, getHideOverflowClass, isEmpty } from '../../../../../../../../utils/generalUtils';
import { useStyles } from '../../../../../../shared/Modal/components/AssignModal/styles';
import { tableGlobalStyles } from '../../../../../../../../assets/styles/Tables/styles';
import { inputGlobalStyles } from '../../../../../../../../assets/styles/Inputs/styles';
import { formGlobalStyles } from '../../../../../../../../assets/styles';

export interface IAssignSubContractorModalProps {
  id: string;
  count: number;
  userCompanyId: string;
  userRole: UserModel.Role;
  subContractorMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  uiRelationMap: GeneralModel.IRelationUiMap;
  loading: GeneralModel.ILoadingStatus;
  assignLoading: GeneralModel.ILoadingStatus;
  fetchSubContractorList: (query: GeneralModel.IQueryParams) => void;
  assignSubcontractor: (id: string, list: ProjectModel.IAssignClientProject[], sponsorId: string) => void;
  searchCompanies: (params: GeneralModel.IQueryParams, tempId: string) => void;
  clearRelationMap: () => void;
  closeModal: () => void;
}

interface ISelectedState {
  original: GeneralModel.IEntityMap<ClientModel.IClient>;
  filtered: GeneralModel.IEntityMap<ClientModel.IClient>;
}

enum TabStep {
  SPONSOR = 'sponsor',
  ASSIGN = 'assign',
}

const AssignSubContractorModal = ({
  id,
  count,
  userRole,
  userCompanyId,
  uiRelationMap,
  subContractorMap,
  loading,
  assignLoading,
  searchCompanies,
  assignSubcontractor,
  fetchSubContractorList,
  clearRelationMap,
  closeModal,
}: IAssignSubContractorModalProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const formClasses = formGlobalStyles();
  const classes = useStyles();
  const modalRef = useRef(null);

  const [queryParams, setQueryParams] = useState<GeneralModel.IQueryParams>({
    page: 1,
    lastPage: 1,
    limit: 6,
    isDeveloper: false,
    status: ResourceModel.Status.ACTIVE,
    excludeFromProjectId: id,
  });
  const [locationOptionList, locationLabel, onLocationChange, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });
  const [selectedSubcontractorMap, setSelectedSubcontractor] = useState<ISelectedState>({ original: {}, filtered: {} });
  const [isSearching, setSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const isFCAdmin = useMemo(() => userRole === UserModel.Role.FCA_ADMIN, [userRole]);
  const [tabStep, setTabStep] = useState<TabStep>(getConditionalDefaultValue(isFCAdmin, TabStep.SPONSOR, TabStep.ASSIGN));
  const [sponsor, setSponsor] = useState(null);
  const debouncedSearch = useDebounce(search, 350);

  const pageCount = useMemo(
    () => (showSelected ? Math.ceil(Object.keys(selectedSubcontractorMap.original).length / queryParams.limit) : Math.ceil(count / queryParams.limit)),
    [count, queryParams.limit, showSelected, selectedSubcontractorMap.original]
  );

  const subContractorList = useMemo(() => {
    if (showSelected) {
      const startPage = (queryParams.page - 1) * queryParams.limit;
      const endPage = startPage + queryParams.limit;
      return Object.values(selectedSubcontractorMap.original).slice(startPage, endPage);
    }
    return Object.values(subContractorMap);
  }, [subContractorMap, queryParams, showSelected, selectedSubcontractorMap]);

  const assignDisabled = useMemo(
    () =>
      Object.keys(selectedSubcontractorMap.original).length === 0 ||
      (isFCAdmin && Object.entries(selectedSubcontractorMap.original).some(([, val]) => isEmpty(val.isTaxExempt))),
    [selectedSubcontractorMap.original, isFCAdmin]
  );

  const hideOverflow = useMemo(() => {
    return getHideOverflowClass(subContractorList, modalRef, classes.hideOverflow);
  }, [subContractorList, classes.hideOverflow]);

  const onSelectSubcontractor = useCallback(
    (selectedId: string) => {
      setSelectedSubcontractor(prevState =>
        !prevState.original[selectedId]
          ? { ...prevState, original: { ...prevState.original, [selectedId]: subContractorMap[selectedId] } }
          : { filtered: deleteObjectItem(prevState.filtered, selectedId), original: deleteObjectItem(prevState.original, selectedId) }
      );
    },
    [setSelectedSubcontractor, subContractorMap]
  );

  const onChangeTaxExempt = useCallback(
    (selectedId: string, value: boolean) => {
      setSelectedSubcontractor(prevState => ({
        ...prevState,
        original: { ...prevState.original, [selectedId]: { ...subContractorMap[selectedId], isTaxExempt: value } },
      }));
    },
    [setSelectedSubcontractor, subContractorMap]
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
      setSelectedSubcontractor(prevState => ({ ...prevState, filtered: prevState.original }));
    }
  }, [showSelected, setSearching, setShowSelected, setQueryParams]);

  const onSubmit = useCallback(
    event => {
      event.persist();
      assignSubcontractor(
        id,
        Object.keys(selectedSubcontractorMap.original).map(itemId => ({
          id: itemId,
          role: ProjectModel.CompanyRole.SUB_CONTRACTOR,
          isTaxExempt: selectedSubcontractorMap.original[itemId].isTaxExempt,
        })),
        getConditionalDefaultValue(userRole === UserModel.Role.FCA_ADMIN, sponsor?.id, userCompanyId)
      );
    },
    [assignSubcontractor, id, userRole, userCompanyId, selectedSubcontractorMap, sponsor]
  );

  const onPageChange = useCallback(
    (newPage: number) => {
      setSearching(true);
      setQueryParams({ ...queryParams, page: newPage, lastPage: /* istanbul ignore next */ !showSelected ? newPage : queryParams.lastPage });
      /* istanbul ignore else */
      if (!showSelected) fetchSubContractorList({ ...queryParams, page: newPage });
    },
    [setSearching, fetchSubContractorList, setQueryParams, queryParams, showSelected]
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

  const onNextStep = useCallback(() => {
    setTabStep(TabStep.ASSIGN);
  }, [setTabStep]);

  const tabStepModal = useMemo(
    () => ({
      [TabStep.SPONSOR]: {
        confirmLabel: 'Next Step',
        confirmLoadingLabel: null,
        isConfirmEnabled: !!sponsor,
        onConfirm: onNextStep,
      },
      [TabStep.ASSIGN]: {
        confirmLabel: 'Assign',
        confirmLoadingLabel: 'Assigning',
        isConfirmEnabled: !assignDisabled,
        onConfirm: onSubmit,
      },
    }),
    [sponsor, assignDisabled, onNextStep, onSubmit]
  );

  const onSponsorChange = useCallback((sponsorId: string) => setSponsor(sponsorId), [setSponsor]);

  const onSelect = useCallback(
    (index: number, item, tempId: string) => {
      if (typeof item !== 'string') {
        onSponsorChange(item);
      }
    },
    [onSponsorChange]
  );

  const onReset = useCallback(() => {
    onSponsorChange(null);
  }, [onSponsorChange]);

  const clientRenderOption = useCallback((option, inputValue) => <AssignEntityOption option={option} inputValue={inputValue} />, []);

  const onSearchCompany = useCallback(
    (query: GeneralModel.IQueryParams, tempId: string) => {
      searchCompanies({ ...query, projectId: id }, tempId);
    },
    [searchCompanies, id]
  );

  const onFilterLocationChange = useCallback(
    (stateCode: string) => {
      setSearching(true);
      onLocationChange(stateCode, { page: 1 });
    },
    [onLocationChange, setSearching]
  );

  useEffect(() => {
    if (!showSelected) fetchSubContractorList({ ...queryParams, query: debouncedSearch });
    if (showSelected) {
      setSelectedSubcontractor(prevState => {
        if (debouncedSearch.length > 0) {
          const searchValue = debouncedSearch.toLowerCase();
          return {
            ...prevState,
            original: Object.values(prevState.filtered)
              .filter(item => item.name.toLowerCase().indexOf(searchValue) > -1)
              .reduce((total, item) => ({ ...total, [item.id]: item }), {}),
          };
        }
        return { ...prevState, original: prevState.filtered };
      });
      setSearching(false);
    }
    // eslint-disable-next-line
  }, [debouncedSearch, showSelected, setSearching, setSelectedSubcontractor, fetchSubContractorList, queryParams.stateCode, queryParams.countryCode]);

  useEffect(() => {
    if (loading && !loading.isLoading) setSearching(false);
  }, [loading, setSearching]);

  useEffect(() => {
    return function unMount() {
      clearRelationMap();
    };
  }, [clearRelationMap]);

  return (
    <AssignModal
      title={'Assign Subcontractors'}
      titleAdditionalText={getConditionalDefaultValue(
        !isFCAdmin,
        'All Companies you add will pay taxes. If you want to make a change, please contact an FCA Admin.',
        null
      )}
      loading={assignLoading && assignLoading.isLoading}
      modalRef={modalRef}
      hideOverflow={hideOverflow}
      confirmLabel={tabStepModal[tabStep].confirmLabel}
      confirmLoadingLabel={tabStepModal[tabStep].confirmLoadingLabel}
      isConfirmEnabled={tabStepModal[tabStep].isConfirmEnabled}
      onSubmit={tabStepModal[tabStep].onConfirm}
      onClose={closeModal}
      render={() => (
        <>
          {tabStep === TabStep.SPONSOR && (
            <div className={classes.assignSubModalContentWrapper}>
              <Typography className={classes.assignSponsorTitle}>Select a Client to be the Sponsor for the upcoming Subcontractor(s):</Typography>
              <div className={`${formClasses.modalForm} ${classes.modalInput}`}>
                <AssignEntity
                  index={0}
                  tempId={'project-client-id'}
                  optionLabel="name"
                  result={getDefaultValue(uiRelationMap['project-client-id']?.searchResult, [])}
                  isLoading={false}
                  showCreateNew={false}
                  disableClearable={false}
                  assignValue={sponsor}
                  placeholder="Select Client"
                  inputLabel="Sponsor Client"
                  existRelation={uiRelationMap && uiRelationMap['project-client-id']}
                  onSelect={onSelect}
                  search={onSearchCompany}
                  renderOption={clientRenderOption}
                  onReset={onReset}
                  showError={false}
                />
              </div>
            </div>
          )}
          {tabStep === TabStep.ASSIGN && (
            <>
              <Box className={`${tableGlobalClasses.filterStatusContainer} ${classes.filterStatusSpaced} ${classes.filterAssignSpacing}`}>
                <TextField
                  variant="outlined"
                  data-testid="assign-search-wrapper"
                  placeholder="Find a client..."
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
                  <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
                  <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer} ${classes.locationModalFilter}`}>
                    <AutocompleteFilter
                      value={locationCode}
                      optionList={locationOptionList}
                      autocompleteWidth={250}
                      onChange={onFilterLocationChange}
                      label={locationLabel}
                    />
                  </Box>
                  <div className={`${classes.boldFilter} ${classes.filterTextColor}`}>
                    <span>
                      {count} Clients. {Object.keys(selectedSubcontractorMap.original).length} Selected
                    </span>
                  </div>
                </div>
              </Box>
              <div className={classes.assignSkeletonWrapper}>
                {loading && !loading.isLoading && !isSearching && subContractorList.length === 0 && (
                  <div className={classes.assignViewWrapper}>
                    <Typography className={classes.notFoundText} data-testid="not-found">
                      Your search did not match any Client
                    </Typography>
                  </div>
                )}
                {(!loading || (loading && loading.isLoading) || isSearching) && (
                  <div className={classes.assignViewWrapper}>
                    <Typography>Loading...</Typography>
                  </div>
                )}
                {!isSearching && subContractorList.length > 0 && (
                  <>
                    <Table aria-label="subcontractor-list">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Trades</TableCell>
                          {isFCAdmin && <TableCell>Tax Condition</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {subContractorList.map(subContractor => (
                          <SubContractorRow
                            key={subContractor.id}
                            subContractor={subContractor}
                            isSelected={!!selectedSubcontractorMap.original[subContractor.id]}
                            isTaxExempt={selectedSubcontractorMap.original[subContractor.id]?.isTaxExempt}
                            showTaxCondition={isFCAdmin}
                            onSelect={onSelectSubcontractor}
                            onChangeTaxExempt={onChangeTaxExempt}
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
        </>
      )}
    />
  );
};

export default memo(AssignSubContractorModal);
