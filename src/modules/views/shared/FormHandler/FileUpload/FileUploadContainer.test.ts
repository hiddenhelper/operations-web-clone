import { mapStateToProps, mapDispatchToProps } from './FileUploadContainer';
import { getInitialState } from '../../../../../test/rootState';
import { getUploadFile_1 } from '../../../../../test/entities';
import { fileState } from '../../../../state-mgmt/file';

describe('FileUploadContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      fileMap: getInitialState().file.fileMap,
      defaultFilesToRemove: getInitialState().file.defaultFilesToRemove,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      addFileList: expect.any(Function),
      removeFile: expect.any(Function),
      clearFileMap: expect.any(Function),
      clearDefaultFileToRemoveList: expect.any(Function),
      addDefaultFileToRemoveList: expect.any(Function),
    });
  });

  it('should dispatch addFileList action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.addFileList(getUploadFile_1().uploadId, [getUploadFile_1()]);
    expect(dispatch).toBeCalledWith(fileState.actions.addFileList(getUploadFile_1().uploadId, [getUploadFile_1()]));
  });

  it('should dispatch removeFile action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.removeFile(getUploadFile_1().uploadId, getUploadFile_1().id);
    expect(dispatch).toBeCalledWith(fileState.actions.removeFile(getUploadFile_1().uploadId, getUploadFile_1().id));
  });

  it('should dispatch clearFileMap action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearFileMap('id');
    expect(dispatch).toBeCalledWith(fileState.actions.clearUploadMap('id'));
  });
});
