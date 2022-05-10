import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import moment from 'moment';

import EmptyList from '../../../../shared/EmptyList';
import TrainingModal from './TrainingModal';
import TrainingTabRow from './TrainingsTabRow';
import DetailTab from '../../../../shared/DetailTab';
import DetailUploadModal from '../DetailUploadModal';
import CreateWithUploadModal from '../CreateWithUploadModal';
import WorkerProjectFilter from '../WorkerProjectFilter';

import { GeneralModel, TrainingModel, WorkerModel, FileModel, ProjectModel } from '../../../../../models';
import { GENERAL, WorkersIcon } from '../../../../../../constants';

import { formatBadgeCode, getDefaultValue } from '../../../../../../utils/generalUtils';
import { useStyles } from '../../styles';
import Modal from 'modules/views/shared/Modal';
import Confirm from 'modules/views/shared/Modal/components/Confirm';
import { useStyles as modalStyles } from 'modules/views/shared/Modal/style';

export interface ITrainingTabProps {
  worker: WorkerModel.IWorker;
  trainingMap: GeneralModel.IEntityMap<TrainingModel.IWorkerTraining>;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  projectList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  queryParams: GeneralModel.IQueryParams;
  count: number;
  listLoading: GeneralModel.ILoadingStatus;
  loadingMap: GeneralModel.IEntityMap<GeneralModel.ILoadingStatus>;
  saveLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  detailLoading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  projectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IWorkerProject>>;
  onPageChange: (page: number) => void;
  addWorkerTraining: (id: string, training: TrainingModel.IWorkerTraining, uploadId: string) => void;
  fetchTrainingList: () => void;
  fetchWorkerTrainingList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchWorkerTrainingDetail: (id: string, trainId: string) => void;
  fetchProjectList: (id: string) => void;
  addTrainingSuccess: () => void;
  updateTrainingSuccess: () => void;
  clearLoading: () => void;
  fetchWorker: (id: string) => void;
  fetchWorkerProjectList: (id: string, query: GeneralModel.IQueryParams) => void;
  onFilterProjectChange: (projectId: string) => void;
  updateWorkerTraining: (id: string, certification: TrainingModel.IWorkerTraining, uploadId: string) => void;
  deleteWorkerTraining: (workerId: string, certificationId: string) => void;
  clearFileMap: (uploadId: string) => void;
  defaultFilesToRemove: string[];
}

const TrainingTab = ({
  worker,
  fileMap,
  trainingMap,
  count,
  trainingList,
  queryParams,
  listLoading,
  saveLoading,
  updateLoading,
  deleteLoading,
  projectList,
  detailLoading,
  loadingMap,
  projectMap,
  onPageChange,
  addWorkerTraining,
  fetchTrainingList,
  fetchWorkerTrainingList,
  fetchWorkerTrainingDetail,
  fetchProjectList,
  addTrainingSuccess,
  updateTrainingSuccess,
  clearLoading,
  fetchWorker,
  onFilterProjectChange,
  fetchWorkerProjectList,
  updateWorkerTraining,
  deleteWorkerTraining,
  clearFileMap,
  defaultFilesToRemove,
}: ITrainingTabProps) => {
  const classes = useStyles();
  const modalClasses = modalStyles();

  const [detail, setDetail] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: null });
  const [isModalOpen, setModal] = useState<boolean>(false);
  const [trainingToEdit, setTrainingToEdit] = useState<{ isEditing: boolean; id: string }>({ isEditing: false, id: null });
  const [trainingToDelete, setTrainingToDelete] = useState<{ isDeleting: boolean; id: string }>({ isDeleting: false, id: null });

  const detailModalSubtitle = useMemo(
    () =>
      `${trainingMap[detail.id]?.completionDate ? moment(trainingMap[detail.id].completionDate).format('MMM DD, YYYY') : '-'}. ${getDefaultValue(
        trainingMap[detail.id]?.project?.name,
        ''
      )}`,
    [trainingMap, detail.id]
  );
  const trainingName = useMemo(() => trainingMap[detail.id]?.training && `${trainingMap[detail.id].training.name}`, [trainingMap, detail.id]);
  const detailModalSecondaryDetail = useMemo(
    () => (
      <>
        Trainer:{' '}
        <span className={classes.secondaryDetailValue}>
          {trainingMap[detail.id]?.trainerName}. {formatBadgeCode(trainingMap[detail.id]?.trainerBadgeCode)}
        </span>
      </>
    ),
    [trainingMap, detail.id, classes.secondaryDetailValue]
  );

  const onOpenDetail = useCallback((id: string) => setDetail(prevState => ({ isOpen: true, id })), [setDetail]);
  const onCloseDetail = useCallback(() => setDetail(prevState => ({ ...prevState, isOpen: false })), [setDetail]);
  const onOpenModal = useCallback(() => setModal(true), [setModal]);
  const onCloseModal = useCallback(() => {
    setModal(false);
    clearFileMap('workerTraining');
    setTrainingToEdit({ isEditing: false, id: null });
  }, [setModal, clearFileMap, setTrainingToEdit]);
  const onEditTraining = useCallback((id: string) => setTrainingToEdit({ isEditing: true, id }), [setTrainingToEdit]);
  const onDeleteTraining = useCallback((id: string) => setTrainingToDelete({ isDeleting: true, id }), [setTrainingToDelete]);
  const onCloseConfirmationAlert = useCallback(() => setTrainingToDelete({ isDeleting: false, id: null }), [setTrainingToDelete]);
  const onConfirmDeleteTraining = useCallback(() => {
    deleteWorkerTraining(worker.id, trainingToDelete.id);
    onCloseConfirmationAlert();
  }, [deleteWorkerTraining, worker.id, trainingToDelete.id, onCloseConfirmationAlert]);

  const handleSuccess = useCallback(
    (id: string) => {
      addTrainingSuccess();
      fetchWorker(id);
    },
    [addTrainingSuccess, fetchWorker]
  );

  const handleUpdate = useCallback(() => {
    updateTrainingSuccess();
  }, [updateTrainingSuccess]);

  useEffect(() => {
    fetchProjectList(worker.id);
  }, [worker, fetchProjectList]);

  useEffect(() => {
    if (deleteLoading && !deleteLoading.isLoading) {
      clearLoading();
      fetchWorkerTrainingList(worker?.id, queryParams);
    }
  }, [worker, fetchWorkerTrainingList, deleteLoading, queryParams, clearLoading]);

  return (
    <>
      <DetailTab
        buttonLabel="Add Training"
        buttonTestId="open-training-modal-btn"
        onButtonClick={onOpenModal}
        entityId={worker.id}
        listLoading={listLoading}
        queryParams={queryParams}
        onPageChange={onPageChange}
        fetchList={fetchWorkerTrainingList}
        count={count}
        entityMap={trainingMap}
        tableAriaLabel="device-list"
        tableHeaders={['Type', 'Date', 'Trainer', 'Trainer Badge Code', 'Project']}
        clearLoading={clearLoading}
        renderRow={(item, index) => (
          <TrainingTabRow
            training={item}
            key={index}
            openDetail={onOpenDetail}
            onEdit={(trainingId: string) => {
              onEditTraining(trainingId);
              onOpenModal();
            }}
            onDelete={(trainingId: string) => {
              onDeleteTraining(trainingId);
            }}
          />
        )}
        renderEmptyList={() => <EmptyList icon={<WorkersIcon />} text="There are no Trainings assigned" />}
        renderFilters={() => (
          <>
            <WorkerProjectFilter
              workerId={worker?.id}
              queryParams={queryParams}
              projectMap={projectMap[worker?.id]}
              onFilterProjectChange={onFilterProjectChange}
              fetchWorkerProjectList={fetchWorkerProjectList}
            />
          </>
        )}
      />
      <CreateWithUploadModal
        entityId={worker.id}
        onClose={onCloseModal}
        isOpen={isModalOpen || trainingToEdit.isEditing}
        uploadId="workerTraining"
        saveLoading={saveLoading}
        updateLoading={updateLoading}
        fileMap={fileMap}
        loadingMap={loadingMap}
        traceKey={GENERAL.TRACE_KEY.SAVE_UPLOAD_WORKER_TRAINING}
        queryParams={queryParams}
        addNewEntity={addWorkerTraining}
        onSuccess={handleSuccess}
        onUpdate={handleUpdate}
        clearLoading={clearLoading}
        fetchSuccessList={fetchWorkerTrainingList}
        list={trainingList}
        fetchList={fetchTrainingList}
        renderModal={(onAddTraining: (id: string, train: TrainingModel.IWorkerTraining) => void, inProgress: boolean, uploadId: string) => (
          <TrainingModal
            workerId={worker.id}
            uploadId={uploadId}
            trainingList={trainingList}
            projectList={projectList}
            assignLoading={inProgress}
            addTraining={onAddTraining}
            closeModal={onCloseModal}
            trainingToEdit={trainingToEdit}
            updateTraining={updateWorkerTraining}
            fetchDetail={fetchWorkerTrainingDetail}
            entityId={worker.id}
            detailLoading={detailLoading}
            entityMap={trainingMap}
            defaultFilesToRemove={defaultFilesToRemove}
            fileMap={fileMap}
          />
        )}
      />
      {detail.id && (
        <DetailUploadModal
          detail={detail}
          entityId={worker.id}
          detailLoading={detailLoading}
          title="Worker Training"
          subtitle={detailModalSubtitle}
          secondaryDetail={detailModalSecondaryDetail}
          entityName={trainingName}
          description={trainingMap[detail.id]?.description}
          entityMap={trainingMap}
          onClose={onCloseDetail}
          fetchDetail={fetchWorkerTrainingDetail}
        />
      )}
      <Modal
        show={trainingToDelete.isDeleting}
        styleClass={`${modalClasses.dialogContainer} ${trainingToDelete.isDeleting ? 'open' : 'closed'}`}
        onClose={onCloseConfirmationAlert}
        render={() => (
          <Confirm
            title={'Delete Training?'}
            content={'If you do it, all the information entered will be lost.'}
            confirmLabel={'Yes, Delete'}
            closeLabel="Close"
            onClose={onCloseConfirmationAlert}
            onConfirm={onConfirmDeleteTraining}
          />
        )}
      />
    </>
  );
};

export default memo(TrainingTab);
