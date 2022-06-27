import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Button, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';

import ClientFilter from 'modules/views/shared/ClientFilter';
import EmptyList from 'modules/views/shared/EmptyList';
import Pagination from 'modules/views/shared/Pagination/Pagination';
import RoleGuard from 'modules/views/shared/RoleGuard/RoleGuardContainer';
import WorkerDrawer from 'modules/views/shared/WorkerDrawer';

import WorkerRow from './WorkerRow';
import WorkerModal from './WorkerModal';

import { ClientModel, GeneralModel, ProjectModel, UserModel, WorkerModel } from 'modules/models';
import { WorkersIcon } from 'constants/index';
import { tableGlobalStyles } from 'assets/styles';
import { useStyles as useButtonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';

export interface IWorkersTabProps {
  projectId: string;
  workerCount: number;
  modalCount: number;
  queryParams: GeneralModel.IQueryParams;
  currentProject: ProjectModel.IProject;
  workerMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  workerProjectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<WorkerModel.IWorkerProject>>;
  clientMap?: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ClientModel.IClientProject>>;
  projectWorkersLoading: GeneralModel.ILoadingStatus;
  loadWorkerModalLoading: GeneralModel.ILoadingStatus;
  assignLoading: GeneralModel.ILoadingStatus;
  summaryLoading: GeneralModel.ILoadingStatus;
  isModalOpen: boolean;
  ctaDisabled: boolean;
  isFcAdmin: boolean;
  modalMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  drawer: { open: boolean; id: string };
  setDrawer: ({ open: boolean, id: string }) => void;
  fetchProjectWorkerList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchWorkerList: (query: GeneralModel.IQueryParams) => void;
  fetchWorkerSummary: (id: string) => void;
  assignWorker: (id: string, list: Partial<WorkerModel.IWorker>[]) => void;
  openModal: () => void;
  closeModal: () => void;
  onPageChange: (page: number) => void;
  clearWorkerMap: () => void;
  setQueryParams: (params) => void;
  fetchProjectClientList?: (id: string, query: GeneralModel.IQueryParams) => void;
  countryList?: GeneralModel.INamedEntity[];
  assignWorkerProjectError: GeneralModel.ILoadingStatus;
}

const WorkersTab = ({
  projectId,
  workerCount,
  clientMap,
  queryParams,
  currentProject,
  workerMap,
  workerProjectMap,
  projectWorkersLoading,
  loadWorkerModalLoading,
  assignLoading,
  summaryLoading,
  isModalOpen,
  ctaDisabled,
  isFcAdmin,
  modalCount,
  modalMap,
  drawer,
  setDrawer,
  fetchProjectWorkerList,
  fetchWorkerList,
  fetchWorkerSummary,
  assignWorker,
  openModal,
  closeModal,
  onPageChange,
  clearWorkerMap,
  setQueryParams,
  fetchProjectClientList,
  countryList,
  assignWorkerProjectError,
}: IWorkersTabProps) => {
  const buttonStyles = useButtonStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const workersList = useMemo(() => (currentProject.id && Object.keys(workerProjectMap).length ? Object.values(workerProjectMap[currentProject.id]) : []), [
    workerProjectMap,
    currentProject.id,
  ]);

  const countWorkers = useMemo(() => Math.ceil(workerCount / queryParams.limit), [workerCount, queryParams.limit]);

  const selectedWorker = useMemo(() => workerMap[drawer.id] || WorkerModel.getFallbackWorker(), [workerMap, drawer.id]);
  const handleOpenSummary = useCallback(
    (workerId: string) => {
      fetchWorkerSummary(workerId);
      setDrawer({ open: true, id: workerId });
    },
    [fetchWorkerSummary, setDrawer]
  );
  const handleCloseSummary = () => setDrawer({ open: false, id: null });

  useEffect(() => {
    /* istanbul ignore else */
    if (assignLoading && !assignLoading.isLoading && !assignWorkerProjectError?.error) {
      closeModal();
      fetchProjectWorkerList(currentProject.id, queryParams);
    }
  }, [assignLoading, currentProject.id, queryParams, closeModal, fetchProjectWorkerList, assignWorkerProjectError]);

  useEffect(() => {
    fetchProjectWorkerList(currentProject.id, queryParams);
  }, [currentProject.id, queryParams, fetchProjectWorkerList]);

  useEffect(() => {
    fetchProjectClientList(projectId, queryParams);
  }, [fetchProjectClientList, projectId, queryParams]);

  useEffect(() => {
    return function unMount() {
      clearWorkerMap();
    };
  }, [clearWorkerMap]);

  if (projectWorkersLoading && projectWorkersLoading.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
          <ClientFilter
            queryParams={queryParams}
            clientMap={clientMap[projectId]}
            projectId={projectId}
            isFcAdmin={isFcAdmin}
            setQueryParams={setQueryParams}
            fetchClientList={fetchProjectClientList}
          />
          <Button
            className={`${buttonStyles.createButton} ${buttonStyles.primaryButtonLarge}`}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            data-testid="open-worker-modal-btn"
            onClick={openModal}
            disabled={ctaDisabled}
          >
            Assign Worker
          </Button>
        </div>
        {workersList.length === 0 ? (
          <EmptyList icon={<WorkersIcon />} text="There are no Workers assigned" />
        ) : (
          <>
            <Table aria-label="project-workers-list">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
                    <TableCell>Client</TableCell>
                  </RoleGuard>
                  <RoleGuard roleList={[UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
                    <TableCell>Company</TableCell>
                  </RoleGuard>
                  <TableCell>Trades</TableCell>
                  <TableCell>Status in Project</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workersList.map(worker => (
                  <WorkerRow key={worker.id} onClick={handleOpenSummary} worker={worker} />
                ))}
              </TableBody>
            </Table>
            <Pagination page={queryParams.page} count={countWorkers} onChange={onPageChange} />
          </>
        )}
        <WorkerDrawer isLoading={summaryLoading && summaryLoading.isLoading} isOpen={drawer.open} onClose={handleCloseSummary} worker={selectedWorker} />
        {isModalOpen && (
          <WorkerModal
            projectId={currentProject.id}
            count={modalCount}
            isFcAdmin={isFcAdmin}
            clientProjectMap={clientMap}
            loading={loadWorkerModalLoading}
            assignLoading={assignLoading}
            workerMap={modalMap}
            fetchWorkerList={fetchWorkerList}
            assignWorker={assignWorker}
            closeModal={closeModal}
            fetchProjectClientList={fetchProjectClientList}
            countryList={countryList}
            assignWorkerProjectError={assignWorkerProjectError}
          />
        )}
      </div>
    </>
  );
};

export default memo(WorkersTab);
