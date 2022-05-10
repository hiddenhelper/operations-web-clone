import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Box, TableBody, Table, TableHead, TableRow, TableCell, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AutocompleteFilter from 'modules/views/shared/AutocompleteFilter';
import PageTitle from 'modules/views/shared/PageTitle';
import Container from 'modules/views/shared/Container';
import StatusWidget from 'modules/views/shared/StatusWidget/StatusWidget';
import Pagination from 'modules/views/shared/Pagination/Pagination';
import ButtonTab from 'modules/views/shared/ButtonTab';
import RoleGuard from 'modules/views/shared/RoleGuard';
import WorkerDrawer from 'modules/views/shared/WorkerDrawer';

import WorkerRow from './components/WorkerRow';

import { GeneralModel, StatisticsModel, UserModel, WorkerModel } from 'modules/models';
import { getDefaultValue, getConditionalDefaultValue } from 'utils';
import { useQueryParamState } from 'utils/useQueryParamState';
import { useLocationFilter } from 'utils/useLocationFilter';
import { useStyles as buttonStyles } from 'modules/views/shared/FormHandler/ControlledButton/styles';
import { tableGlobalStyles, listGlobalStyles } from 'assets/styles';

export interface IWorkerListProps {
  userRole: UserModel.Role;
  workerMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  workersCount: number;
  uiRelationMap: GeneralModel.IRelationUiMap;
  workerStatistics: StatisticsModel.IWorkerStatistics;
  listLoading: GeneralModel.ILoadingStatus;
  statisticsLoading: GeneralModel.ILoadingStatus;
  clientSearchLoading: GeneralModel.ILoadingStatus;
  workerLoading: GeneralModel.ILoadingStatus;
  fetchWorkerList: (query: GeneralModel.IQueryParams) => void;
  fetchWorkerStatistics: () => void;
  fetchWorkerSummary: (id: string) => void;
  clearWorkerMap: () => void;
  clearWorkerStatistics: () => void;
  searchCompanies: (query: GeneralModel.IQueryParams) => void;
  navigate: (path: string) => void;
}

const WorkerList = ({
  workerMap,
  workersCount,
  workerStatistics,
  uiRelationMap,
  listLoading,
  statisticsLoading,
  clientSearchLoading,
  workerLoading,
  fetchWorkerList,
  fetchWorkerStatistics,
  fetchWorkerSummary,
  clearWorkerMap,
  clearWorkerStatistics,
  searchCompanies,
  navigate,
}: IWorkerListProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();
  const listClasses = listGlobalStyles();

  const listRef = useRef();

  const [queryParams, setQueryParams] = useQueryParamState<GeneralModel.IQueryParams>({
    status: WorkerModel.WorkerStatusFilter.MIGRATED,
    page: 1,
    limit: 15,
  });

  const [locationOptionList, locationLabel, onLocationFilter, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });

  const workerList: WorkerModel.IWorker[] = useMemo(() => Object.values(workerMap), [workerMap]);

  const filterList = useMemo(() => Object.values(WorkerModel.workerTabMap).sort((a, b) => a.order - b.order), []);

  const setFilter = useCallback(status => setQueryParams({ status, page: 1 }), [setQueryParams]);

  const pageCount = useMemo(() => Math.ceil(workersCount / queryParams.limit), [workersCount, queryParams.limit]);

  const clientFilterOptionList = useMemo(() => {
    let list = [{ id: '', name: 'All Clients' }];
    if (uiRelationMap?.clientWorker?.searchResult) {
      list = [...list, ...uiRelationMap?.clientWorker?.searchResult];
    }
    return list;
  }, [uiRelationMap]);

  const clientLabel = useMemo(() => Object.values(workerMap).find(worker => worker.company?.id === queryParams.companyId), [queryParams.companyId, workerMap]);

  const onPageChange = useCallback(
    newPage => {
      setQueryParams({ ...queryParams, page: newPage });
    },
    [setQueryParams, queryParams]
  );

  const [openSummary, setOpenSummary] = useState<boolean>(false);
  const [workerId, setWorkerId] = useState<string>();
  const currentWorker = useMemo(() => workerMap[workerId] || WorkerModel.getFallbackWorker(), [workerMap, workerId]);
  const handleOpenSummary = useCallback(
    (id: string) => {
      fetchWorkerSummary(id);
      setWorkerId(id);
      setOpenSummary(true);
    },
    [setOpenSummary, setWorkerId, fetchWorkerSummary]
  );
  const handleCloseSummary = () => setOpenSummary(false);

  const onFilterLocationChange = useCallback(
    (stateCode: string) => {
      onLocationFilter(stateCode, { page: 1 });
    },
    [onLocationFilter]
  );

  const onFilterClientChange = useCallback(
    (id: string) => {
      setQueryParams({ ...queryParams, companyId: getDefaultValue(id, ''), page: 1 });
    },
    [setQueryParams, queryParams]
  );

  const onSearchClient = useCallback(
    (searchText: string) => {
      searchCompanies({ nameContains: searchText });
    },
    [searchCompanies]
  );

  const handleInviteWorkerClick = useCallback(() => {
    navigate('/workers/wizard/new');
  }, [navigate]);

  useEffect(() => {
    if (!workerStatistics) fetchWorkerStatistics();
  }, [workerStatistics, fetchWorkerStatistics]);

  useEffect(() => {
    fetchWorkerList(queryParams);
  }, [fetchWorkerList, queryParams]);

  useEffect(() => {
    return function unMount() {
      clearWorkerMap();
      clearWorkerStatistics();
    };
  }, [clearWorkerMap, clearWorkerStatistics]);

  return (
    <Container ref={listRef}>
      <div className={getConditionalDefaultValue(openSummary, listClasses.generalListContent, '')}>
        <PageTitle
          title="Workers"
          right={
            <Button
              className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              size="large"
              data-testid="invite-worker-btn"
              onClick={handleInviteWorkerClick}
            >
              Create Worker
            </Button>
          }
        />
        <div className={listClasses.widgetsWrapper} id="summary-widgets">
          <StatusWidget
            total={getDefaultValue(workerStatistics?.migrated, 0)}
            status="Pending Invitation"
            content={<Link to={`/workers?status=${WorkerModel.WorkerStatusFilter.MIGRATED}`}>Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getDefaultValue(workerStatistics?.pendingRegistration, 0)}
            status="Pending Registration"
            content={<Link to={`/workers?status=${WorkerModel.WorkerStatusFilter.PENDING_REGISTRATION}`}>Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getDefaultValue(workerStatistics?.active, 0)}
            status="Active"
            content={<Link to={`/workers?status=${WorkerModel.WorkerStatusFilter.ACTIVE}`}>Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
        </div>
        <div className={tableGlobalClasses.tableWrapper}>
          <div className={tableGlobalClasses.filterContainer}>
            <div className={tableGlobalClasses.statusFilter}>
              {filterList.map(optFilter => (
                <ButtonTab key={optFilter.id} optFilter={optFilter} isActive={queryParams.status === optFilter.id} setFilter={setFilter} />
              ))}
            </div>
            <div className={tableGlobalClasses.filterActionsContainer}>
              <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
                <AutocompleteFilter value={locationCode} optionList={locationOptionList} onChange={onFilterLocationChange} label={locationLabel} />
              </Box>
              <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
                <>
                  <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
                  <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.filterContainerMaxWidth}`}>
                    <AutocompleteFilter
                      value={locationCode}
                      isLoading={clientSearchLoading && clientSearchLoading.isLoading}
                      optionList={getDefaultValue(clientFilterOptionList, [])}
                      label={getConditionalDefaultValue(queryParams.companyId, clientLabel?.company?.name, 'All Clients')}
                      onChange={onFilterClientChange}
                      onSearch={onSearchClient}
                    />
                  </Box>
                </>
              </RoleGuard>
            </div>
          </div>
          {listLoading && !listLoading.isLoading ? (
            <>
              {workerList.length > 0 && (
                <>
                  <Table aria-label="worker-list">
                    <TableHead>
                      <TableRow>
                        <TableCell>Worker Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Trades</TableCell>
                        <TableCell>Projects Assigned</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workerList.map(worker => (
                        <WorkerRow key={worker.id} worker={worker} onOpen={handleOpenSummary} />
                      ))}
                    </TableBody>
                  </Table>
                  <Pagination data-testid="pagination" page={queryParams.page} count={pageCount} onChange={onPageChange} />
                </>
              )}
            </>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
      <WorkerDrawer
        isLoading={workerLoading && workerLoading.isLoading}
        isOpen={openSummary}
        listElement={listRef.current}
        onClose={handleCloseSummary}
        worker={currentWorker}
      />
    </Container>
  );
};

export default memo(WorkerList);
