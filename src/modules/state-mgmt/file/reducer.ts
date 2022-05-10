import { ActionType } from './actions';
import { initialState, IState } from './state';
import { deleteObjectItem } from '../../../utils/generalUtils';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.ADD_UPLOAD_FILE_LIST:
      return {
        ...state,
        fileMap: { ...state.fileMap, [payload.uploadId]: payload.list.reduce((total, item) => ({ ...total, [item.id]: item }), {}) },
      };
    case ActionType.DELETE_UPLOAD_FILE_LIST:
      return {
        ...state,
        fileMap: {
          ...state.fileMap,
          [payload.uploadId]: deleteObjectItem(state.fileMap[payload.uploadId], payload.fileId),
        },
      };
    case ActionType.ADD_DEFAULT_FILE_TO_REMOVE_LIST:
      return {
        ...state,
        defaultFilesToRemove: [...Array.from(new Set([...state.defaultFilesToRemove, payload.fileId]))],
      };
    case ActionType.CLEAR_DEFAULT_FILE_TO_REMOVE_LIST:
      return {
        ...state,
        defaultFilesToRemove: [],
      };
    case ActionType.UPLOAD_FILE_PROGRESS:
      return {
        ...state,
        fileMap: {
          ...state.fileMap,
          [payload.file.uploadId]: {
            ...state.fileMap[payload.file.uploadId],
            [payload.file.id]: { ...state.fileMap[payload.file.uploadId][payload.file.id], ...payload.file },
          },
        },
      };
    case ActionType.CLEAR_UPLOAD_MAP:
      return {
        ...state,
        fileMap: {
          ...state.fileMap,
          [payload.uploadId]: {},
        },
      };
    case ActionType.CLEAR_MAP:
      return {
        ...state,
        fileMap: {},
      };
    default:
      return state;
  }
};
