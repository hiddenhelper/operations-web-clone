import { GeneralModel, CertificationModel } from '../../models';

export interface IState {
  workerMap: GeneralModel.IEntityMap<CertificationModel.IWorkerCertification>;
  certificationList: GeneralModel.INamedEntity[];
  count: number;
}

export const initialState: IState = {
  certificationList: [],
  workerMap: {},
  count: null,
};
