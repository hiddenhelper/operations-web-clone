import { GeneralModel, TrainingModel } from '../../models';

export interface IState {
  workerMap: GeneralModel.IEntityMap<TrainingModel.IWorkerTraining>;
  trainingList: GeneralModel.INamedEntity[];
  count: number;
}

export const initialState: IState = {
  trainingList: [],
  workerMap: {},
  count: null,
};
