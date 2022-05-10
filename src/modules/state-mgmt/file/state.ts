import { GeneralModel, FileModel } from '../../models';

export interface IState {
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  defaultFilesToRemove: string[];
}

export const initialState: IState = {
  fileMap: {},
  defaultFilesToRemove: [],
};
