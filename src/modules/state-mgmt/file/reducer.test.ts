import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getUploadFile_1 } from '../../../test/entities';

describe('file reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(undefined, { type: null, payload: null })).toEqual(initialState);
  });

  it('should return a new state ActionType.ADD_UPLOAD_FILE_LIST', () => {
    expect(reducer(undefined, actions.addFileList(getUploadFile_1().uploadId, [getUploadFile_1()]))).toEqual({
      fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } },
      defaultFilesToRemove: [],
    });
  });

  it('should return a new state ActionType.DELETE_UPLOAD_FILE_LIST', () => {
    const state = { ...initialState, fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } } };
    expect(reducer(state, actions.removeFile(getUploadFile_1().uploadId, getUploadFile_1().id))).toEqual({
      fileMap: { [getUploadFile_1().uploadId]: {} },
      defaultFilesToRemove: [],
    });
  });

  it('should return a new state ActionType.ADD_DEFAULT_FILE_TO_REMOVE_LIST', () => {
    expect(reducer(undefined, actions.addDefaultFileToRemoveList(getUploadFile_1().uploadId, getUploadFile_1().id))).toEqual({
      fileMap: {},
      defaultFilesToRemove: [getUploadFile_1().id],
    });
  });

  it('should return a new state ActionType.CLEAR_DEFAULT_FILE_TO_REMOVE_LIST', () => {
    const state = { ...initialState, defaultFilesToRemove: [getUploadFile_1().id] };
    expect(reducer(state, actions.clearDefaultFileToRemoveList())).toEqual({
      fileMap: {},
      defaultFilesToRemove: [],
    });
  });

  it('should return a new state ActionType.UPLOAD_FILE_PROGRESS', () => {
    const state = { ...initialState, fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } } };
    expect(reducer(state, actions.uploadProgress({ ...getUploadFile_1(), progress: 50 }))).toEqual({
      fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: { ...getUploadFile_1(), progress: 50 } } },
      defaultFilesToRemove: [],
    });
  });

  it('should return a new state ActionType.CLEAR_UPLOAD_MAP', () => {
    const state = { ...initialState, fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } } };
    expect(reducer(state, actions.clearUploadMap(getUploadFile_1().uploadId))).toEqual({
      fileMap: { [getUploadFile_1().uploadId]: {} },
      defaultFilesToRemove: [],
    });
  });

  it('should return a new state ActionType.CLEAR_MAP', () => {
    const state = { ...initialState, fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } } };
    expect(reducer(state, actions.clearMap())).toEqual({ fileMap: {}, defaultFilesToRemove: [] });
  });
});
