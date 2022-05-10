import { FileModel } from '../../models';

export enum ActionType {
  ADD_UPLOAD_FILE_LIST = '[file] add file list',
  DELETE_UPLOAD_FILE_LIST = '[file] delete file list',
  ADD_DEFAULT_FILE_TO_REMOVE_LIST = '[file] add default file to remove list',
  CLEAR_DEFAULT_FILE_TO_REMOVE_LIST = '[file] clear default file to remove list',
  UPLOAD_FILE_LIST_START = '[file] upload list start',
  UPLOAD_FILE_START = '[file] upload file start',
  UPLOAD_FILE_PROGRESS = '[file] file progress',
  CLEAR_UPLOAD_MAP = '[file] clear upload id map',
  CLEAR_MAP = '[file] clear map',
}

export const actions = {
  addFileList: (uploadId, list: FileModel.IFile[]) => ({ type: ActionType.ADD_UPLOAD_FILE_LIST, payload: { uploadId, list } }),
  removeFile: (uploadId: string, fileId: string) => ({ type: ActionType.DELETE_UPLOAD_FILE_LIST, payload: { uploadId, fileId } }),
  addDefaultFileToRemoveList: (uploadId: string, fileId: string) => ({ type: ActionType.ADD_DEFAULT_FILE_TO_REMOVE_LIST, payload: { uploadId, fileId } }),
  clearDefaultFileToRemoveList: () => ({ type: ActionType.CLEAR_DEFAULT_FILE_TO_REMOVE_LIST, payload: {} }),
  uploadFileListStart: (list: FileModel.IS3FileResponse[], fileList: FileModel.IFile[], traceId?: string) => ({
    type: ActionType.UPLOAD_FILE_LIST_START,
    payload: { list, fileList, traceId },
  }),
  uploadFileStart: (file: FileModel.IFile, url: string, fileId: string, traceId?: string) => ({
    type: ActionType.UPLOAD_FILE_START,
    payload: { url, file, fileId, traceId },
  }),
  uploadProgress: (file: Partial<FileModel.IFile>) => ({ type: ActionType.UPLOAD_FILE_PROGRESS, payload: { file } }),
  clearUploadMap: (uploadId: string) => ({ type: ActionType.CLEAR_UPLOAD_MAP, payload: { uploadId } }),
  clearMap: () => ({ type: ActionType.CLEAR_MAP, payload: {} }),
};
