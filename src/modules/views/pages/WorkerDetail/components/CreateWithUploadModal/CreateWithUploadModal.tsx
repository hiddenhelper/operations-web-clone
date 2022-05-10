import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FileModel } from '../../../../../models';

const CreateWithUploadModal = ({
  entityId,
  isOpen,
  list,
  clearLoading,
  saveLoading,
  queryParams,
  uploadId,
  fileMap,
  loadingMap,
  traceKey,
  addNewEntity,
  renderModal,
  fetchList,
  fetchSuccessList,
  onSuccess,
  onClose,
  updateLoading,
  onUpdate,
}) => {
  const [inProgress, setInProgress] = useState<boolean>(false);

  const uploadList: FileModel.IFile[] = useMemo(() => Object.values(fileMap[uploadId] || []), [uploadId, fileMap]);

  const shouldClose = useMemo(
    () =>
      (!!(saveLoading && !saveLoading.isLoading) || !!(updateLoading && !updateLoading.isLoading)) &&
      !inProgress &&
      (uploadList.length === 0 ||
        !!(
          uploadList.length > 0 &&
          uploadList.filter(file => file.status === FileModel.FileStatus.PROGRESS).length === 0 &&
          uploadList.filter(file => file.status === FileModel.FileStatus.INACTIVE).length === 0
        )),
    [saveLoading, inProgress, uploadList, updateLoading]
  );

  const onAddCallback = useCallback(
    (id: string, entity: any) => {
      setInProgress(true);
      addNewEntity(id, entity, uploadId);
    },
    [addNewEntity, uploadId, setInProgress]
  );

  useEffect(() => {
    if (updateLoading && updateLoading.isLoading) {
      setInProgress(true);
    }
  }, [setInProgress, updateLoading]);

  useEffect(() => {
    if (
      inProgress &&
      ((saveLoading && !saveLoading.isLoading) || (updateLoading && !updateLoading.isLoading)) &&
      loadingMap &&
      !Object.values(loadingMap).find((item: any) => item && item?.traceId && item.traceId === traceKey)
    ) {
      setInProgress(false);
    }
  }, [loadingMap, saveLoading, inProgress, setInProgress, traceKey, updateLoading]);

  useEffect(() => {
    /* istanbul ignore else */
    if (shouldClose) {
      if (!updateLoading) {
        onSuccess(entityId);
      } else {
        onUpdate();
      }
      onClose();
      clearLoading();
      fetchSuccessList(entityId, queryParams);
    }
  }, [shouldClose, queryParams, entityId, onClose, clearLoading, fetchSuccessList, onSuccess, updateLoading, onUpdate]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!list.length) fetchList();
  }, [list, fetchList]);

  return <>{isOpen && renderModal(onAddCallback, inProgress, uploadId)}</>;
};

export default memo(CreateWithUploadModal);
