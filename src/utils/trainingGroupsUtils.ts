import { IProjectTraining, ITrainingGroup } from 'modules/models/training';

export const sanitizeTrainingsGroups = (trainingsGroups: ITrainingGroup[]): ITrainingGroup[] => {
  return trainingsGroups.map((trainingsGroup: ITrainingGroup) => ({
    ...trainingsGroup,
    trainings: trainingsGroup.trainings.map((training: IProjectTraining) => ({
      ...training,
      alias: training.alias?.trim() || null,
    })),
  }));
};
