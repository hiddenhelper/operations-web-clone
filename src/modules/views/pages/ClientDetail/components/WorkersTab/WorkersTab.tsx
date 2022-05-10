import React, { memo, useEffect, useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import AutocompleteFilter from 'modules/views/shared/AutocompleteFilter';
import Pagination from 'modules/views/shared/Pagination';
import EmptyList from 'modules/views/shared/EmptyList';
import WorkerDrawer from 'modules/views/shared/WorkerDrawer';

import WorkerRow from './WorkerRow';

import { ClientModel, GeneralModel, WorkerModel } from 'modules/models';
import { WorkersIcon } from 'constants/index';
import { getDefaultValue } from 'utils';
import { useLocationFilter } from 'utils/useLocationFilter';
import { tableGlobalStyles } from 'assets/styles';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../../styles';

export interface IWorkersTabProps {
  workerClientMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<WorkerModel.IWorker>>;
  workerCount: number;
  workerMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  currentClient: ClientModel.IClient;
  uiRelationMap: GeneralModel.IRelationUiMap;
  queryParams: GeneralModel.IQueryParams;
  loading: GeneralModel.ILoadingStatus;
  loadingSummary: GeneralModel.ILoadingStatus;
  drawer: boolean;
  setDrawer: (state) => void;
  setQueryParams: (query: any) => void;
  onPageChange: (page: number) => void;
  clearWorkerMap: () => void;
  clearRelationMap: () => void;
  fetchWorkerList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchWorkerSummary: (id: string) => void;
  searchProjectStart: (query: GeneralModel.IQueryParams, key: string) => void;
}

const WorkersTab = ({
  currentClient,
  queryParams,
  workerClientMap,
  workerCount,
  workerMap,
  uiRelationMap,
  loading,
  loadingSummary,
  drawer,
  setDrawer,
  setQueryParams,
  searchProjectStart,
  fetchWorkerList,
  fetchWorkerSummary,
  onPageChange,
  clearWorkerMap,
  clearRelationMap,
}: IWorkersTabProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();

  const projectSearchKey = 'project-by-worker-company';
  const [locationOptionList, locationLabel, onLocationChange, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });

  const workerList = useMemo(
    () => (currentClient.id && Object.keys(workerClientMap) && workerClientMap[currentClient.id] ? Object.values(workerClientMap[currentClient.id]) : []),
    [workerClientMap, currentClient]
  );

  const projectList = useMemo(() => {
    if (uiRelationMap[projectSearchKey]?.searchResult) {
      return [{ id: '', name: 'All Assigned Projects' }, ...uiRelationMap[projectSearchKey]?.searchResult];
    }
    return [];
  }, [projectSearchKey, uiRelationMap]);

  const workerPageCount = useMemo(() => Math.ceil(workerCount / queryParams.pageSize), [workerCount, queryParams.pageSize]);

  const selectedProjectFilter = useMemo(
    () => (!!queryParams.projectId ? projectList.find(project => project.id === queryParams.projectId)?.name : 'All Projects Assigned'),
    [queryParams, projectList]
  );

  const onProjectFilterSearch = useCallback(
    (text: string) => {
      searchProjectStart({ nameContains: text }, projectSearchKey);
    },
    [projectSearchKey, searchProjectStart]
  );

  const onProjectFilterChange = useCallback(
    projectId => {
      setQueryParams({ ...queryParams, projectId });
    },
    [queryParams, setQueryParams]
  );

  useEffect(() => {
    fetchWorkerList(currentClient.id, queryParams);
  }, [currentClient.id, queryParams, fetchWorkerList]);

  useEffect(() => {
    return function unMount() {
      clearWorkerMap();
      clearRelationMap();
    };
  }, [clearWorkerMap, clearRelationMap]);

  const [workerId, setWorkerId] = useState<string>();
  const currentWorker = useMemo(() => workerMap[workerId] || WorkerModel.getFallbackWorker(), [workerMap, workerId]);
  const handleOpenSummary = useCallback(
    (id: string) => {
      fetchWorkerSummary(id);
      setWorkerId(id);
      setDrawer({ open: true });
    },
    [setDrawer, setWorkerId, fetchWorkerSummary]
  );
  const handleCloseSummary = () => setDrawer({ open: false });

  if (loading && loading.isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className={tableGlobalClasses.filterActionsContainer}>
        <div className={tableGlobalClasses.filterActionsContainer}>
          <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus} ${classes.firstFilter}`}>
            <AutocompleteFilter value={locationCode} optionList={locationOptionList} label={locationLabel} onChange={onLocationChange} />
          </Box>
          <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus}`}>
            <AutocompleteFilter
              value={queryParams.projectId}
              optionList={projectList}
              label={getDefaultValue(selectedProjectFilter, 'All Projects Assigned')}
              onChange={onProjectFilterChange}
              onSearch={onProjectFilterSearch}
            />
          </Box>
        </div>
        <Link to="/workers/wizard/new">
          <Button
            className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge}`}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            type="submit"
          >
            Create Worker
          </Button>
        </Link>
      </div>
      {loading && !loading.isLoading && workerList.length === 0 ? (
        <EmptyList icon={<WorkersIcon />} text="There are no Workers assigned" />
      ) : (
        <>
          <Table aria-label="worker-list">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Trades</TableCell>
                <TableCell>Projects Assigned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workerList.map(worker => (
                <WorkerRow key={worker.id} onClick={handleOpenSummary} worker={worker} />
              ))}
            </TableBody>
          </Table>
          <Pagination page={queryParams.pageNumber} count={workerPageCount} onChange={onPageChange} />
        </>
      )}
      <WorkerDrawer isLoading={loadingSummary && loadingSummary.isLoading} isOpen={drawer} onClose={handleCloseSummary} worker={currentWorker} />
    </>
  );
};

export default memo(WorkersTab);
