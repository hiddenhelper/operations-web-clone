import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Divider from '@material-ui/core/Divider';

import MenuPopover from 'modules/views/shared/MenuPopover';
import Pagination from 'modules/views/shared/Pagination/Pagination';
import AssignModal from 'modules/views/shared/Modal/components/AssignModal';
import ClientFilter from 'modules/views/shared/ClientFilter/ClientFilter';

import WorkerModalRow from './WorkerModalRow';
import MigratedWorker from './MigratedWorker';
import { ClientModel, GeneralModel, WorkerModel } from '../../../../../models';
import { SearchIcon } from '../../../../../../constants';
import { deleteObjectItem, EMAIL_REGEXP, isEmpty, isObject } from '../../../../../../utils/generalUtils';
import { useDebounce } from '../../../../../../utils/useDebounce';
import { useStyles as summaryStyles } from '../../../../shared/BadgePrintingSystemSummary/styles';
import { inputGlobalStyles } from '../../../../../../assets/styles/Inputs/styles';
import { useStyles } from '../../../../shared/Modal/components/AssignModal/styles';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { parsePhoneNumber } from 'libphonenumber-js';
import { sanitizeWorker } from 'utils/workerUtils';

export interface IWorkerModalProps {
  projectId: string;
  isFcAdmin: boolean;
  count: number;
  loading: GeneralModel.ILoadingStatus;
  assignLoading: GeneralModel.ILoadingStatus;
  workerMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  clientProjectMap?: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ClientModel.IClientProject>>;
  closeModal: () => void;
  fetchWorkerList: (query: GeneralModel.IQueryParams) => void;
  assignWorker: (projectId: string, list: Partial<WorkerModel.IWorker>[]) => void;
  fetchProjectClientList?: (id: string, query: GeneralModel.IQueryParams) => void;
  countryList?: GeneralModel.INamedEntity[];
  assignWorkerProjectError: GeneralModel.ILoadingStatus;
}

export interface IMigratedWorkersErrors {
  email: string;
  mobilePhoneNumber: string;
}

interface ISelectedState {
  original: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  filtered: GeneralModel.IEntityMap<WorkerModel.IWorker>;
}

enum StepEnum {
  SELECTING = 1,
  FILLING_INVITE_METHOD = 2,
}

const phoneIsValid = (value: string) => {
  try {
    return isEmpty(value) ? false : value && parsePhoneNumber(value, 'US').isValid();
  } catch (error) {
    return false;
  }
};

const WorkerModal = ({
  projectId,
  isFcAdmin,
  workerMap,
  count,
  loading,
  assignLoading,
  closeModal,
  fetchWorkerList,
  assignWorker,
  clientProjectMap,
  fetchProjectClientList,
  countryList,
  assignWorkerProjectError,
}: IWorkerModalProps) => {
  const classes = useStyles();
  const summaryClasses = summaryStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const [isSearching, setSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [queryParams, setQueryParams] = useState<GeneralModel.IQueryParams>({
    page: 1,
    lastPage: 1,
    limit: 6,
    query: '',
    id: projectId,
  });
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [selectedWorkerMap, setSelectedWorker] = useState<ISelectedState>({ original: {}, filtered: {} });
  const [migratedWorkers, setMigratedWorkers] = useState<GeneralModel.IEntityMap<WorkerModel.IWorker>>({});
  const [step, setStep] = useState<StepEnum>(StepEnum.SELECTING);
  const [systemWorkers, setSystemWorkers] = useState<GeneralModel.IEntityMap<WorkerModel.IWorker>>({});
  const [migratedWorkersErrors, setMigratedWorkersErrors] = useState<GeneralModel.IEntityMap<IMigratedWorkersErrors>>({});

  const debouncedSearch = useDebounce(search, 350);

  const workerList = useMemo(() => {
    if (showSelected) {
      const startPage = (queryParams.page - 1) * queryParams.limit;
      const endPage = startPage + queryParams.limit;
      return Object.values(selectedWorkerMap.original).slice(startPage, endPage);
    }
    return Object.values(workerMap);
  }, [workerMap, queryParams, showSelected, selectedWorkerMap]);

  const pageCount = useMemo(
    () => (showSelected ? Math.ceil(Object.keys(selectedWorkerMap.original).length / queryParams.limit) : Math.ceil(count / queryParams.limit)),
    [count, queryParams.limit, showSelected, selectedWorkerMap.original]
  );

  const assignDisabled = useMemo(() => Object.keys(selectedWorkerMap.original).length === 0, [selectedWorkerMap.original]);

  const onSearchChange = useCallback(
    event => {
      event.persist();
      setSearching(true);
      setQueryParams({ ...queryParams, page: 1, query: event.target.value });
      setSearch(event.target.value);
    },
    [queryParams, setSearching, setQueryParams]
  );

  const onShowAll = useCallback(() => {
    /* istanbul ignore else */
    if (showSelected) {
      setShowSelected(false);
      setSearching(true);
      setQueryParams(prevState => ({ ...prevState, page: prevState.lastPage }));
    }
  }, [showSelected, setShowSelected, setSearching]);

  const onShowSelected = useCallback(() => {
    /* istanbul ignore else */
    if (!showSelected) {
      setShowSelected(true);
      setQueryParams(prevState => ({ ...prevState, page: 1 }));
      setSelectedWorker(prevState => ({ ...prevState, filtered: prevState.original }));
    }
  }, [showSelected, setShowSelected, setQueryParams]);

  const areThereMigratedWorkers = useMemo(() => !isEmpty(migratedWorkers) && step === StepEnum.SELECTING, [migratedWorkers, step]);

  const onSelectWorker = useCallback(
    (selectedId: string) => {
      setSelectedWorker(prevState =>
        !prevState.original[selectedId]
          ? { ...prevState, original: { ...prevState.original, [selectedId]: workerMap[selectedId] } }
          : { filtered: deleteObjectItem(prevState.filtered, selectedId), original: deleteObjectItem(prevState.original, selectedId) }
      );
      if (workerMap[selectedId].invitationStatus === WorkerModel.WorkerStatus.MIGRATED) {
        setMigratedWorkers(prev => (!prev[selectedId] ? { ...prev, [selectedId]: workerMap[selectedId] } : deleteObjectItem(prev, selectedId)));
      } else {
        setSystemWorkers(prev => (!prev[selectedId] ? { ...prev, [selectedId]: workerMap[selectedId] } : deleteObjectItem(prev, selectedId)));
      }
    },
    [setSelectedWorker, workerMap]
  );

  const onPageChange = useCallback(
    (newPage: number) => {
      setSearching(true);
      setQueryParams({ ...queryParams, page: newPage, lastPage: /* istanbul ignore next */ !showSelected ? newPage : queryParams.lastPage });
      /* istanbul ignore else */
      if (!showSelected) fetchWorkerList({ ...queryParams, page: newPage });
    },
    [setSearching, fetchWorkerList, setQueryParams, queryParams, showSelected]
  );

  const onSubmit = useCallback(
    event => {
      event.persist();
      if (step === StepEnum.SELECTING) {
        if (isEmpty(migratedWorkers)) {
          assignWorker(
            projectId,
            Object.keys(selectedWorkerMap.original).map((id: string) => ({ id }))
          );
        } else {
          setMigratedWorkersErrors({});
          setStep(StepEnum.FILLING_INVITE_METHOD);
        }
      } else {
        let areThereErrors = false;
        const mobileErrorMessage = value => (isEmpty(value) ? 'Mobile Phone Number is required' : 'Please enter a valid Phone Number.');
        const emailErrorMessage = value => (isEmpty(value) ? 'Email is required' : 'Please enter a valid Email.');
        Object.keys(migratedWorkers).forEach((workerId: string) => {
          const element = migratedWorkers[workerId];
          const mobileIsFilled = !isEmpty(element.mobilePhoneNumber);
          const emailIsFilled = !isEmpty(element.email);
          const mobileIsCorrect = phoneIsValid(element.mobilePhoneNumber);
          const emailIsCorrect = EMAIL_REGEXP.test(element.email);

          const BOTH = element.inviteMethod === WorkerModel.InviteMethod.BOTH;

          const mustShowEmailError =
            element.inviteMethod === WorkerModel.InviteMethod.EMAIL || BOTH ? !emailIsFilled || !emailIsCorrect : emailIsFilled && !emailIsCorrect;
          const mustShowMobileError =
            element.inviteMethod === WorkerModel.InviteMethod.MOBILE_PHONE || BOTH ? !mobileIsFilled || !mobileIsCorrect : mobileIsFilled && !mobileIsCorrect;

          setMigratedWorkersErrors(prev => ({
            ...prev,
            [element.id]: {
              mobilePhoneNumber: mustShowMobileError ? mobileErrorMessage(element.mobilePhoneNumber) : null,
              email: mustShowEmailError ? emailErrorMessage(element.email) : null,
            },
          }));

          if (mustShowEmailError || mustShowMobileError) areThereErrors = true;
        });
        if (!areThereErrors) {
          assignWorker(projectId, [...Object.values(systemWorkers), ...Object.values(migratedWorkers).map(worker => sanitizeWorker(worker))]);
        }
      }
    },
    [assignWorker, projectId, selectedWorkerMap, migratedWorkers, step, systemWorkers]
  );

  useEffect(() => {
    const errors = assignWorkerProjectError?.error?.errors;
    if (isObject(errors)) {
      Object.keys(errors).forEach(errorKey => {
        var regExp = /\[([^)]+)\]/;
        const id = regExp.exec(errorKey)[1];
        setMigratedWorkersErrors(prev => ({
          ...prev,
          [id]: {
            mobilePhoneNumber: errors[`workerInvites[${id}].mobilePhoneNumber`]?.join(' - ') ?? null,
            email: errors[`workerInvites[${id}].email`]?.join(' - ') ?? null,
          },
        }));
      });
    }
  }, [assignWorkerProjectError]);

  useEffect(() => {
    if (!showSelected) fetchWorkerList({ ...queryParams, query: debouncedSearch });
    if (showSelected) {
      setSelectedWorker(prevState => {
        if (debouncedSearch.length > 0) {
          const searchValue = debouncedSearch.toLowerCase();
          return {
            ...prevState,
            original: Object.values(prevState.filtered)
              .filter(
                item =>
                  item?.firstName?.toLowerCase().indexOf(searchValue) > -1 ||
                  item?.lastName?.toLowerCase().indexOf(searchValue) > -1 ||
                  `${item?.firstName} ${item?.lastName}`.toLowerCase().indexOf(searchValue) > -1
              )
              .reduce((total, item) => ({ ...total, [item.id]: item }), {}),
          };
        }
        return { ...prevState, original: prevState.filtered };
      });
      setSearching(false);
    }
  }, [debouncedSearch, showSelected, setSearching, setSelectedWorker, fetchWorkerList, queryParams.companyId]); // eslint-disable-line

  useEffect(() => {
    if (loading && !loading.isLoading) setSearching(false);
  }, [loading, setSearching]);
  return (
    <>
      <AssignModal
        title={'Assign Worker'}
        loading={assignLoading && assignLoading.isLoading}
        confirmLabel={areThereMigratedWorkers ? 'Next Step' : 'Assign'}
        confirmLoadingLabel={'Assigning'}
        isConfirmEnabled={!assignDisabled}
        onClose={closeModal}
        onSubmit={onSubmit}
        render={() => (
          <>
            <div>
              {step === StepEnum.SELECTING && (
                <Box className={`${summaryClasses.filterStatusContainer} ${summaryClasses.filterStatusSpaced} ${classes.filterAssignSpacing}`}>
                  <TextField
                    variant="outlined"
                    data-testid="assign-search-wrapper"
                    placeholder="Find a Worker..."
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
                    <Box
                      className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer} ${classes.locationModalFilter}`}
                    >
                      <ClientFilter
                        queryParams={queryParams}
                        clientMap={clientProjectMap[projectId]}
                        projectId={projectId}
                        isFcAdmin={isFcAdmin}
                        setQueryParams={setQueryParams}
                        fetchClientList={fetchProjectClientList}
                      />
                    </Box>
                    <div className={`${classes.boldFilter} ${classes.filterTextColor}`}>
                      {count} Workers. {Object.keys(selectedWorkerMap.original).length} Selected
                    </div>
                  </div>
                </Box>
              )}
            </div>
            <div className={classes.assignSkeletonWrapper}>
              {loading && !loading.isLoading && !isSearching && workerList.length === 0 && (
                <div className={classes.assignViewWrapper}>
                  <Typography className={classes.notFoundText} data-testid="not-found">
                    {debouncedSearch.length > 0 ? 'Your search did not match any Worker' : 'There are no Workers to assign'}
                  </Typography>
                </div>
              )}
              {(!loading || (loading && loading.isLoading) || isSearching) && (
                <div className={classes.assignViewWrapper}>
                  <Typography>Loading...</Typography>
                </div>
              )}
              {!isSearching && !loading?.isLoading && workerList.length > 0 && step === StepEnum.SELECTING && (
                <>
                  <Table aria-label="worker-list">
                    <TableHead>
                      <TableRow>
                        {isFcAdmin && (
                          <>
                            <TableCell>Worker</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Trades</TableCell>
                            <TableCell>Projects Assigned</TableCell>
                          </>
                        )}
                        {!isFcAdmin && (
                          <>
                            <TableCell>Worker</TableCell>
                            <TableCell>Trades</TableCell>
                            <TableCell>Projects Assigned</TableCell>
                            <TableCell>Company</TableCell>
                          </>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workerList.map(worker => (
                        <WorkerModalRow
                          key={worker.id}
                          worker={worker}
                          isSelected={!!selectedWorkerMap.original[worker.id]}
                          onSelect={onSelectWorker}
                          isFcAdmin={isFcAdmin}
                        />
                      ))}
                    </TableBody>
                  </Table>
                  <Pagination styleClass={classes.assignPagination} page={queryParams.page} count={pageCount} onChange={onPageChange} />
                </>
              )}
              {!isSearching && !loading?.isLoading && step === StepEnum.FILLING_INVITE_METHOD && (
                <>
                  <div className={classes.fillInviteMethodDescription}>
                    <Typography>
                      Some of these Workers are migrated. Enter their information to complete the process of incorporation to the platform.
                    </Typography>
                  </div>
                  {Object.keys(migratedWorkers).map(workerId => (
                    <MigratedWorker
                      key={`migrated-worker-${workerId}`}
                      worker={migratedWorkers[workerId]}
                      countryList={countryList}
                      onChange={setMigratedWorkers}
                      errors={migratedWorkersErrors}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        )}
      />
    </>
  );
};

export default memo(WorkerModal);
