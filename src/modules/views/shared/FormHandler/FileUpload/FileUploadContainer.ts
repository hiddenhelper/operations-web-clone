import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IRootState } from '../../../../state-mgmt/rootState';
import { fileState } from '../../../../state-mgmt/file';
import { FileModel } from '../../../../models';
import FileUpload from './FileUpload';

export const mapStateToProps = (state: IRootState) => ({
  fileMap: state.file.fileMap,
  defaultFilesToRemove: state.file.defaultFilesToRemove,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addFileList: (uploadId: string, list: FileModel.IFile[]) => dispatch(fileState.actions.addFileList(uploadId, list)),
  removeFile: (uploadId: string, fileId: string) => dispatch(fileState.actions.removeFile(uploadId, fileId)),
  clearDefaultFileToRemoveList: () => dispatch(fileState.actions.clearDefaultFileToRemoveList()),
  addDefaultFileToRemoveList: (uploadId: string, fileId: string) => dispatch(fileState.actions.addDefaultFileToRemoveList(uploadId, fileId)),
  clearFileMap: (uploadId: string) => dispatch(fileState.actions.clearUploadMap(uploadId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
