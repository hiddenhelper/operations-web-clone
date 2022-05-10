import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import moment from 'moment';

import { Box } from '@material-ui/core';

import EmptyList from '../../../../shared/EmptyList/EmptyList';
import CertificationModal from './CertificationModal';
import CertificationTabRow from './CertificationTabRow';
import DetailTab from '../../../../shared/DetailTab';
import DetailUploadModal from '../DetailUploadModal';
import AutocompleteFilter from '../../../../shared/AutocompleteFilter';
import CreateWithUploadModal from '../CreateWithUploadModal';

import { GeneralModel, CertificationModel, WorkerModel, FileModel, ProjectModel } from '../../../../../models';

import { GENERAL, WorkersIcon } from '../../../../../../constants';
import { getConditionalDefaultValue, getDefaultValue } from '../../../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import Modal from 'modules/views/shared/Modal';
import Confirm from 'modules/views/shared/Modal/components/Confirm';
import { useStyles as modalStyles } from 'modules/views/shared/Modal/style';
export interface ICertificationTabProps {
  worker: WorkerModel.IWorker;
  certificationMap: GeneralModel.IEntityMap<CertificationModel.IWorkerCertification>;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  projectList: GeneralModel.INamedEntity[];
  certificationList: GeneralModel.INamedEntity[];
  queryParams: GeneralModel.IQueryParams;
  count: number;
  listLoading: GeneralModel.ILoadingStatus;
  loadingMap: GeneralModel.IEntityMap<GeneralModel.ILoadingStatus>;
  saveLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  detailLoading: GeneralModel.ILoadingStatus;
  projectWorkerMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IWorkerProject>>;
  onPageChange: (page: number) => void;
  addWorkerCertification: (id: string, certification: CertificationModel.IWorkerCertification, uploadId: string) => void;
  updateWorkerCertification: (id: string, certification: CertificationModel.IWorkerCertification, uploadId: string) => void;
  fetchCertificationList: () => void;
  fetchWorkerCertificationList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchWorkerCertificationDetail: (id: string, certId: string) => void;
  fetchProjectList: (id: string) => void;
  addCertificationSuccess: () => void;
  updateCertificationSuccess: () => void;
  clearLoading: () => void;
  fetchWorker: (id: string) => void;
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => void;
  setQueryParams: (params: GeneralModel.IQueryParams) => void;
  deleteWorkerCertification: (workerId: string, certificationId: string) => void;
  clearFileMap: (uploadId: string) => void;
  defaultFilesToRemove: string[];
}

const CertificationTab = ({
  worker,
  fileMap,
  certificationMap,
  count,
  certificationList,
  queryParams,
  listLoading,
  saveLoading,
  deleteLoading,
  updateLoading,
  projectList,
  detailLoading,
  loadingMap,
  projectWorkerMap,
  onPageChange,
  addWorkerCertification,
  fetchCertificationList,
  fetchWorkerCertificationList,
  fetchWorkerCertificationDetail,
  fetchProjectList,
  addCertificationSuccess,
  updateCertificationSuccess,
  clearLoading,
  fetchWorker,
  fetchWorkerProjectList,
  setQueryParams,
  updateWorkerCertification,
  deleteWorkerCertification,
  clearFileMap,
  defaultFilesToRemove,
}: ICertificationTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const modalClasses = modalStyles();

  const [detail, setDetail] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: null });
  const [isModalOpen, setModal] = useState<boolean>(false);
  const [certificationToEdit, setCertificationToEdit] = useState<{ isEditing: boolean; id: string }>({ isEditing: false, id: null });
  const [certificationToDelete, setCertificationToDelete] = useState<{ isDeleting: boolean; id: string }>({ isDeleting: false, id: null });

  const detailModalSubtitle = useMemo(
    () => `${certificationMap[detail.id]?.completionDate ? moment(certificationMap[detail.id].completionDate).format('MMM DD, YYYY') : '-'}
                     to ${
                       certificationMap[detail.id]?.expirationDate ? moment(certificationMap[detail.id].expirationDate).format('MMM DD, YYYY') : '-'
                     }. ${getDefaultValue(certificationMap[detail.id]?.project?.name, '')}`,
    [certificationMap, detail.id]
  );
  const certificationName = useMemo(
    () =>
      certificationMap[detail.id]?.certification &&
      `${certificationMap[detail.id].certification.name}. ID ${getDefaultValue(certificationMap[detail.id].idNumber)}`,
    [certificationMap, detail.id]
  );

  const workerProjectList: ProjectModel.IWorkerProject[] = useMemo(() => (projectWorkerMap[worker?.id] ? Object.values(projectWorkerMap[worker?.id]) : []), [
    projectWorkerMap,
    worker,
  ]);

  const projectFilterList = workerProjectList.reduce((tot, item) => [...tot, { id: item?.project?.id, name: item?.project?.name }], [
    { id: '', name: 'All projects' },
    { id: GeneralModel.OptionFilterType.NO_RELATED, name: 'No Related Project' },
  ]);
  const userProjectMap = workerProjectList.reduce((tot, item) => ({ ...tot, [item?.project?.id]: item?.project?.name }), {
    [GeneralModel.OptionFilterType.NO_RELATED]: 'No Related Project',
  });

  const projectFilterValue = useMemo(
    () => getConditionalDefaultValue(queryParams.noRelatedProject, GeneralModel.OptionFilterType.NO_RELATED, queryParams.projectId),
    [queryParams.noRelatedProject, queryParams.projectId]
  );

  const onOpenDetail = useCallback((id: string) => setDetail(prevState => ({ isOpen: true, id })), [setDetail]);
  const onCloseDetail = useCallback(() => setDetail(prevState => ({ ...prevState, isOpen: false })), [setDetail]);
  const onOpenModal = useCallback(() => setModal(true), [setModal]);
  const onCloseModal = useCallback(() => {
    setModal(false);
    clearFileMap('workerCertification');
    setCertificationToEdit({ isEditing: false, id: null });
  }, [setModal, clearFileMap, setCertificationToEdit]);
  const onEditCertification = useCallback((id: string) => setCertificationToEdit({ isEditing: true, id }), [setCertificationToEdit]);
  const onDeleteCertification = useCallback((id: string) => setCertificationToDelete({ isDeleting: true, id }), [setCertificationToDelete]);
  const onCloseConfirmationAlert = useCallback(() => setCertificationToDelete({ isDeleting: false, id: null }), [setCertificationToDelete]);
  const onConfirmDeleteCertification = useCallback(() => {
    deleteWorkerCertification(worker.id, certificationToDelete.id);
    onCloseConfirmationAlert();
  }, [deleteWorkerCertification, worker.id, certificationToDelete.id, onCloseConfirmationAlert]);

  const handleSuccess = useCallback(
    (id: string) => {
      addCertificationSuccess();
      fetchWorker(id);
    },
    [addCertificationSuccess, fetchWorker]
  );

  const handleUpdate = useCallback(() => {
    updateCertificationSuccess();
  }, [updateCertificationSuccess]);

  const handleFilterProjectChange = useCallback(
    (projectId: string) => {
      if (projectId === GeneralModel.OptionFilterType.NO_RELATED) {
        setQueryParams({ ...queryParams, projectId: '', noRelatedProject: true, page: 1 });
      } else {
        setQueryParams({ ...queryParams, projectId, noRelatedProject: false, page: 1 });
      }
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    fetchProjectList(worker.id);
    fetchWorkerProjectList(worker?.id, queryParams);
  }, [worker, fetchProjectList]); // eslint-disable-line

  useEffect(() => {
    if (deleteLoading && !deleteLoading.isLoading) {
      clearLoading();
      fetchWorkerCertificationList(worker?.id, queryParams);
    }
  }, [worker, fetchWorkerCertificationList, deleteLoading, queryParams, clearLoading]); // eslint-disable-line

  return (
    <>
      <DetailTab
        buttonLabel="Add Certification"
        buttonTestId="open-certification-modal-btn"
        onButtonClick={onOpenModal}
        entityId={worker.id}
        listLoading={listLoading}
        queryParams={queryParams}
        onPageChange={onPageChange}
        fetchList={fetchWorkerCertificationList}
        count={count}
        entityMap={certificationMap}
        tableAriaLabel="device-list"
        tableHeaders={['Name', 'Certification ID', 'Completion Date', 'Expiration Date', 'Project']}
        clearLoading={clearLoading}
        renderRow={(item, index) => (
          <CertificationTabRow
            certification={item}
            key={index}
            openDetail={onOpenDetail}
            onEdit={(certificationId: string) => {
              onEditCertification(certificationId);
              onOpenModal();
            }}
            onDelete={(certificationId: string) => {
              onDeleteCertification(certificationId);
            }}
          />
        )}
        renderEmptyList={() => <EmptyList icon={<WorkersIcon />} text="There are no Certifications assigned" />}
        renderFilters={() => (
          <>
            <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus}`}>
              <AutocompleteFilter
                value={projectFilterValue}
                label={getConditionalDefaultValue(projectFilterValue, userProjectMap[projectFilterValue], 'All Projects')}
                optionList={projectFilterList}
                onChange={handleFilterProjectChange}
              />
            </Box>
          </>
        )}
      />
      {
        <CreateWithUploadModal
          entityId={worker.id}
          onClose={onCloseModal}
          isOpen={isModalOpen || certificationToEdit.isEditing}
          saveLoading={saveLoading}
          updateLoading={updateLoading}
          fileMap={fileMap}
          loadingMap={loadingMap}
          uploadId="workerCertification"
          traceKey={GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_CERTIFICATION}
          queryParams={queryParams}
          addNewEntity={addWorkerCertification}
          onSuccess={handleSuccess}
          onUpdate={handleUpdate}
          clearLoading={clearLoading}
          fetchSuccessList={fetchWorkerCertificationList}
          list={certificationList}
          fetchList={fetchCertificationList}
          renderModal={(onAddCertification: (id: string, cert: CertificationModel.IWorkerCertification) => void, inProgress: boolean, uploadId: string) => (
            <CertificationModal
              workerId={worker.id}
              uploadId={uploadId}
              certificationList={certificationList}
              projectList={projectList}
              assignLoading={inProgress}
              addCertification={onAddCertification}
              updateCertification={updateWorkerCertification}
              closeModal={onCloseModal}
              certificationToEdit={certificationToEdit}
              fetchDetail={fetchWorkerCertificationDetail}
              entityId={worker.id}
              detailLoading={detailLoading}
              entityMap={certificationMap}
              defaultFilesToRemove={defaultFilesToRemove}
              fileMap={fileMap}
            />
          )}
        />
      }

      {detail.id && (
        <DetailUploadModal
          detail={detail}
          entityId={worker.id}
          detailLoading={detailLoading}
          title="Worker Certification"
          subtitle={detailModalSubtitle}
          entityName={certificationName}
          description={certificationMap[detail.id]?.description}
          entityMap={certificationMap}
          onClose={onCloseDetail}
          fetchDetail={fetchWorkerCertificationDetail}
        />
      )}
      <Modal
        show={certificationToDelete.isDeleting}
        styleClass={`${modalClasses.dialogContainer} ${certificationToDelete.isDeleting ? 'open' : 'closed'}`}
        onClose={onCloseConfirmationAlert}
        render={() => (
          <Confirm
            title={'Delete Certification?'}
            content={'If you do it, all the information entered will be lost.'}
            confirmLabel={'Yes, Delete'}
            closeLabel="Close"
            onClose={onCloseConfirmationAlert}
            onConfirm={onConfirmDeleteCertification}
          />
        )}
      />
    </>
  );
};

export default memo(CertificationTab);
