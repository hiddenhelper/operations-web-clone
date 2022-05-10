import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import SelectFilter from '../../../../shared/SelectFilter';
import EmptyList from '../../../../shared/EmptyList';
import Pagination from '../../../../shared/Pagination';
import ConsentForm from './components/ConsentForm';
import ProjectBadgeModal from './components/ProjectBadgeModal';
import ProjectRow from './ProjectRow';

import { GeneralModel, ProjectModel, WorkerModel } from '../../../../../models';
import { WorkersIcon } from '../../../../../../constants';
import { getDefaultValue } from '../../../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../../../assets/styles';

export interface IProjectsTabProps {
  worker: WorkerModel.IWorker;
  queryParams: GeneralModel.IQueryParams;
  count: number;
  listLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  updateBadgeDataLoading: GeneralModel.ILoadingStatus;
  projectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IWorkerProject>>;
  onPageChange: (page: number) => void;
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => void;
  navigate: (path: string) => void;
}

const ProjectsTab = ({
  worker,
  queryParams,
  count,
  listLoading,
  projectMap,
  updateLoading,
  updateBadgeDataLoading,
  onPageChange,
  fetchWorkerProjectList,
  navigate,
}: IProjectsTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const [projectStatus, setStatusFilter] = useState<ProjectModel.WorkerProjectStatus>('' as any);
  const [consentFormModal, setConsentForm] = useState<{ id: string; open: boolean; isEditable: boolean; project: GeneralModel.INamedEntity }>({
    id: null,
    open: false,
    isEditable: false,
    project: null,
  });
  const [projectBadgeModal, setProjectBadgeModal] = useState({ id: null, open: false });

  const pageCount = useMemo(() => Math.ceil(count / queryParams.limit), [count, queryParams.limit]);
  const workerProjectList: ProjectModel.IWorkerProject[] = useMemo(() => (projectMap[worker.id] ? Object.values(projectMap[worker.id]) : []), [
    projectMap,
    worker.id,
  ]);

  const onFilterStatusChange = useCallback(
    status => {
      setStatusFilter(status);
    },
    [setStatusFilter]
  );

  const onOpenConsentForm = useCallback(
    (id: string, isEditable: boolean) => setConsentForm({ id, isEditable, open: true, project: projectMap[worker.id][id]?.project }),
    [setConsentForm, projectMap, worker]
  );
  const onCloseConsentForm = useCallback(() => setConsentForm(prevState => ({ ...prevState, open: false })), [setConsentForm]);

  const openProjectBadgeModal = useCallback(id => setProjectBadgeModal({ id, open: true }), [setProjectBadgeModal]);
  const closeProjectBadgeModal = useCallback(() => setProjectBadgeModal({ id: null, open: false }), [setProjectBadgeModal]);

  const onProjectClick = useCallback(
    (id: string) => {
      navigate(`/projects/detail/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if ((updateLoading && !updateLoading.isLoading) || (updateBadgeDataLoading && !updateBadgeDataLoading.isLoading)) {
      fetchWorkerProjectList(worker.id, queryParams);
    }
  }, [updateLoading, updateBadgeDataLoading, worker.id, fetchWorkerProjectList]); // eslint-disable-line

  useEffect(() => {
    fetchWorkerProjectList(worker.id, { ...queryParams, status: projectStatus });
  }, [fetchWorkerProjectList, worker.id, queryParams, projectStatus]);
  return (
    <>
      <div className={tableGlobalClasses.tableWrapper}>
        <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
          <Box className={tableGlobalClasses.filterStatusContainer}>
            <SelectFilter
              value={getDefaultValue(ProjectModel.workerProjectStatus[projectStatus], 'All Status in Project')}
              optionList={ProjectModel.workerProjectStatusList}
              onChange={onFilterStatusChange}
            />
          </Box>
        </div>
        {listLoading && !listLoading.isLoading ? (
          !workerProjectList.length ? (
            <EmptyList icon={<WorkersIcon />} text="There are no Projects assigned" />
          ) : (
            <>
              <Table aria-label="device-list">
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Job Site</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>Status in Project</TableCell>
                    <TableCell style={{ display: 'flex', width: '92%', justifyContent: 'flex-end' }}>Documentation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workerProjectList.map((project, index) => (
                    <ProjectRow
                      project={project}
                      key={index}
                      onClick={onProjectClick}
                      openBadgeModal={openProjectBadgeModal}
                      onOpenConsentForm={onOpenConsentForm}
                    />
                  ))}
                </TableBody>
              </Table>
              <Pagination page={queryParams.page} count={pageCount} onChange={onPageChange} />
            </>
          )
        ) : (
          'Loading...'
        )}
      </div>
      {consentFormModal.open && (
        <ConsentForm
          isEditable={consentFormModal.isEditable}
          workerId={worker.id}
          projectId={consentFormModal.id}
          projectName={consentFormModal?.project?.name}
          onClose={onCloseConsentForm}
        />
      )}
      {projectBadgeModal.open && (
        <ProjectBadgeModal
          projectWorker={projectBadgeModal.open && projectMap[worker.id] && projectMap[worker.id] && projectMap[worker.id][projectBadgeModal.id]}
          closeModal={closeProjectBadgeModal}
        />
      )}
    </>
  );
};

export default memo(ProjectsTab);
