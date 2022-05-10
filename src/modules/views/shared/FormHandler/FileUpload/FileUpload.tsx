import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import FileRow from './FileRow';

import { GeneralModel, FileModel } from '../../../../models';
import { formatBytes, getConditionalDefaultValue, getDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from './styles';
import { IFile } from 'modules/models/file';
export interface IFileUploadProps {
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  uploadId: string;
  showProgress?: boolean;
  supportedExtensionList?: string[];
  maxFileSize?: number;
  placeholder?: string;
  inputProps?: object;
  showDelete?: boolean;
  singleInput?: boolean;
  wrapperStyleClass?: string;
  addFileList: (uploadId: string, fileList: FileModel.IFile[]) => void;
  removeFile: (uploadId: string, fileId: string) => void;
  addDefaultFileToRemoveList: (uploadId: string, fileName: string) => void;
  clearDefaultFileToRemoveList: () => void;
  clearFileMap: (uploadId: string) => void;
  defaultFiles?: IFile[];
  defaultFilesToRemove: string[];
}

const FileUpload = ({
  fileMap,
  uploadId,
  inputProps,
  showProgress = false,
  supportedExtensionList = [],
  maxFileSize = 1000000, // 1MB
  placeholder = '',
  showDelete = true,
  addFileList,
  removeFile,
  addDefaultFileToRemoveList,
  clearDefaultFileToRemoveList,
  clearFileMap,
  singleInput = false,
  wrapperStyleClass,
  defaultFiles = [],
  defaultFilesToRemove = [],
}: IFileUploadProps) => {
  const classes = useStyles();
  const fileList = useMemo(() => (fileMap[uploadId] ? Object.values(fileMap[uploadId]) : []), [uploadId, fileMap]);
  const [value, setValue] = useState<string>('');

  const fileName = useMemo(() => value.split('\\').pop(), [value]);
  const cleanedDefaultFiles = useMemo(() => defaultFiles.filter(file => !defaultFilesToRemove.includes(file.id)), [defaultFiles, defaultFilesToRemove]);

  const sanitizeFile = useCallback(
    (file: File) => {
      const extension = file.name
        .split('.')
        .pop()
        .toLowerCase();
      if (supportedExtensionList.length > 0 && !supportedExtensionList.includes(extension)) {
        return FileModel.getFallbackFile(file, uploadId, FileModel.FileStatus.FAIL, 'Unsupported extension');
      } else if (file.size > maxFileSize) {
        return FileModel.getFallbackFile(file, uploadId, FileModel.FileStatus.FAIL, `File size exceed the limit allowed of ${formatBytes(maxFileSize, 0)}.`);
      }
      return FileModel.getFallbackFile(file, uploadId);
    },
    [uploadId, maxFileSize, supportedExtensionList]
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const list = Array.from(event.target.files).map(file => sanitizeFile(file));
      const newList = (inputProps as any).multiple ? [...fileList, ...list] : [list[0]];
      const hasNewFiles = newList.filter(Boolean).length;
      addFileList(uploadId, newList);
      if (hasNewFiles) addFileList(uploadId, newList);
      setValue(event.target.value);
    },
    [uploadId, fileList, inputProps, addFileList, setValue, sanitizeFile]
  );

  const onDeleteFile = useCallback(
    (id: string) => {
      removeFile(uploadId, id);
      setValue('');
    },
    [uploadId, removeFile, setValue]
  );

  const onDeleteDefaultFile = useCallback(
    (id: string) => {
      addDefaultFileToRemoveList(uploadId, id);
    },
    [uploadId, addDefaultFileToRemoveList]
  );

  useEffect(() => {
    if (!fileMap[uploadId]) setValue('');
  }, [fileMap, uploadId, setValue]);

  useEffect(() => {
    return function unMount() {
      clearFileMap(uploadId);
      clearDefaultFileToRemoveList();
    };
  }, [uploadId, clearFileMap, clearDefaultFileToRemoveList]);
  return (
    <div className={getConditionalDefaultValue(singleInput, classes.singleInputUploadItem, classes.fileUploadItem)}>
      <label className={`${getDefaultValue(wrapperStyleClass, '')} ${classes.fileUploadWrapper}`}>
        <div data-testid="file-upload-wrapper">
          <TextField
            type="file"
            name="fileUploader"
            variant="outlined"
            autoComplete="off"
            placeholder={placeholder}
            fullWidth={true}
            value={value}
            inputProps={{
              ...inputProps,
              'data-testid': 'file-upload-input',
            }}
            onChange={handleOnChange}
          />
        </div>
        <div className={classes.fileUpload}>
          <span className={classes.fileUploadText}>{singleInput ? getDefaultValue(fileName, placeholder) : placeholder}</span>
          <IconButton disableRipple={true} aria-label="upload image" color="default" className={classes.iconUpload}>
            <CloudUploadIcon />
          </IconButton>
        </div>
      </label>
      {cleanedDefaultFiles.length > 0 && (
        <div className={classes.fileList}>
          {cleanedDefaultFiles.map((file, index) => (
            <FileRow
              key={`default_files_${index}`}
              file={file}
              showDelete={showDelete}
              showProgress={showProgress}
              deleteFile={onDeleteDefaultFile}
              allowDownload={false}
            />
          ))}
        </div>
      )}
      {!singleInput && (
        <div className={classes.fileList}>
          {fileList.map(file => (
            <FileRow key={file.id} file={file} showDelete={showDelete} showProgress={showProgress} deleteFile={onDeleteFile} allowDownload={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(FileUpload);
