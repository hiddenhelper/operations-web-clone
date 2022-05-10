import { ProjectModel, GeneralModel, ConsentFormModel } from '../../models';

export interface IState {
  projectMap: GeneralModel.IEntityMap<ProjectModel.IProject>;
  projectWorkerMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IWorkerProject>>;
  projectClientMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IProject>>;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  billingTierList: ProjectModel.IBillingTier[];
  consentFormFields: ConsentFormModel.IConsentFormField[];
  badgeVisitorEntityList: string[];
  count: number;
}

export const initialState: IState = {
  projectMap: {},
  projectWorkerMap: {},
  projectClientMap: {},
  categoryList: [],
  regionList: [],
  fcaNaeList: [],
  billingTierList: [],
  consentFormFields: [],
  badgeVisitorEntityList: [],
  count: null,
};
