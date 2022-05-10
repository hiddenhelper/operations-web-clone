import React, { memo, useCallback } from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { FileModel } from '../../../../models';
import { formatBytes, getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IFileUploadRowProps {
  file: FileModel.IFile;
  showProgress: boolean;
  showDelete: boolean;
  showInModal?: boolean;
  deleteFile?: (id: string) => void;
  allowDownload?: boolean;
}

const FileUploadRow = ({ file, showProgress, showDelete, showInModal = false, deleteFile, allowDownload = false }: IFileUploadRowProps) => {
  const classes = useStyles();
  const onDeleteFile = useCallback(() => deleteFile(file.id), [file, deleteFile]);

  return (
    <div
      key={file.id}
      className={`${getConditionalDefaultValue(showInModal, classes.fileItemModal, '')} ${classes.fileItem} ${getConditionalDefaultValue(
        file.status === FileModel.FileStatus.PROGRESS,
        classes.fileItemUploading,
        ''
      )} ${file.error && classes.fileItemError}`}
    >
      <div className={classes.fileRowTextContainer}>
        <div className={classes.fileRowText}>
          <span className={`${classes.fileItemText} ${classes.fileName} ${file.error && classes.fileError}`}>
            {allowDownload ? (
              <a href={file.file?.url} title={file.file?.name} download={file.file?.name} data-testid="file-download-span-link">
                {file.file?.name}
              </a>
            ) : (
              file.file?.name
            )}
          </span>
          <span className={`${classes.fileItemText} ${classes.fileSize}`}>{`(${formatBytes(file.file?.size)})`}</span>
          <div>{file.error && <span className={`${classes.fileItemText} ${classes.fileMessage} ${classes.fileRowError}`}>{file.error}</span>}</div>
        </div>
      </div>
      {showDelete && (
        <IconButton data-testid="file-upload-row" aria-label="remove image" color="default" className={classes.iconButton} onClick={onDeleteFile}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      {showProgress && file.status === FileModel.FileStatus.PROGRESS && <progress className={classes.fileItemProgress} value={file.progress} max={100} />}
    </div>
  );
};

export default memo(FileUploadRow);
