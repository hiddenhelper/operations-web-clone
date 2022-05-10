import React, { memo, useEffect, useMemo } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import Modal from '../../../../shared/Modal';
import FileRow from '../../../../shared/FormHandler/FileUpload/FileRow';

import { FileModel, GeneralModel } from '../../../../../models';
import { useStyles as modalStyles } from '../../../../shared/Modal/style';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';

export interface IDetailUploadModalProps {
  detail: { isOpen: boolean; id: string };
  entityId: string;
  detailLoading: GeneralModel.ILoadingStatus;
  entityMap: GeneralModel.IEntityMap<any>;
  title: string;
  subtitle: string;
  entityName: string;
  secondaryDetail?: React.ReactNode;
  description: string;
  onClose: () => void;
  fetchDetail: (entityId: string, detailId: string) => void;
}

const DetailUploadModal = ({
  detail,
  entityId,
  detailLoading,
  entityMap,
  title,
  subtitle,
  entityName,
  secondaryDetail,
  description,
  onClose,
  fetchDetail,
}: IDetailUploadModalProps) => {
  const modalClasses = modalStyles();
  const buttonClasses = buttonStyles();

  const fileList = useMemo(() => (entityMap && entityMap[detail.id] && entityMap[detail.id].files ? entityMap[detail.id].files : []), [entityMap, detail.id]);

  useEffect(() => {
    /* istanbul ignore else */
    if (detail.id) fetchDetail(entityId, detail.id);
  }, [detail, entityId, fetchDetail]);

  return (
    <Modal
      show={detail.isOpen}
      onClose={onClose}
      styleClass={`${modalClasses.dialogContainer} ${modalClasses.detailModal}`}
      render={() =>
        detailLoading && detailLoading.isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <DialogTitle data-testid="alert-dialog" id="alert-dialog-title">
              {title}
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">{subtitle}</Typography>
              {entityName && <Typography variant="h6">{entityName}</Typography>}
              {secondaryDetail && <Typography variant="h6">{secondaryDetail}</Typography>}
              {description && <Typography variant="body1">{description}</Typography>}
              {fileList.map((file, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  <FileRow
                    file={FileModel.getFallbackFile({ name: file.displayName, size: file.fileSize, url: file.url })}
                    showProgress={false}
                    showDelete={false}
                    showInModal={true}
                    allowDownload={true}
                  />
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button
                className={`${buttonClasses.closeButtonWidth} ${buttonClasses.saveButton}`}
                color="primary"
                variant="contained"
                autoFocus={true}
                onClick={onClose}
                data-testid="detail-modal-close-btn"
              >
                Close
              </Button>
            </DialogActions>
          </>
        )
      }
    />
  );
};

export default memo(DetailUploadModal);
