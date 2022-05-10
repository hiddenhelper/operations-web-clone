import { INamedEntity, GroupValidationType } from './general';

export interface ITraining {
  id: string;
  name: string;
}

export interface IProjectTraining extends ITraining {
  alias: string;
}

export interface ITrainingGroup {
  id: string;
  name: string;
  validationType: GroupValidationType;
  trainings: IProjectTraining[];
}

export interface IWorkerTrainingFile {
  id?: string;
  displayName: string;
  url: string;
  fileSize: number;
}

export interface IWorkerTraining {
  id?: string;
  trainingId?: string;
  completionDate: string;
  projectId?: string;
  training?: INamedEntity;
  description: string;
  trainerName: string;
  trainerBadgeCode: string;
  project?: INamedEntity;
  files?: IWorkerTrainingFile[];
  index?: number;
}

export const getTrainingFallback = (): IWorkerTraining => ({
  id: null,
  trainingId: '',
  projectId: '',
  description: null,
  completionDate: null,
  trainerName: '',
  trainerBadgeCode: '',
});
