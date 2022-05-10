import { ProjectNewModel, GeneralModel, ConsentFormModel } from '../../models';

export interface IState {
  reviewMode: boolean;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  certificationList: GeneralModel.INamedEntity[];
  projectMap: GeneralModel.IEntityMap<ProjectNewModel.IProject>;
  billingTierList: ProjectNewModel.IBillingTier[];
  consentFormFields: ConsentFormModel.IConsentFormField[];
  badgeVisitorEntityList: string[];
  count: number;
}

export const initialState: IState = {
  projectMap: {},
  categoryList: [],
  regionList: [],
  fcaNaeList: [],
  trainingList: [],
  certificationList: [],
  reviewMode: false,
  billingTierList: [],
  consentFormFields: [],
  badgeVisitorEntityList: [],
  count: null,
};
