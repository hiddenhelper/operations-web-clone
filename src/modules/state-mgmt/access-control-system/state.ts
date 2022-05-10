import { AccessControlSystemModel, GeneralModel } from '../../models';

export interface IState {
  accessControlSystemMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  projectAccessControlSystem: AccessControlSystemModel.IProjectAccessControlSystem;
  count: number;
}

export const initialState: IState = {
  accessControlSystemMap: {},
  projectAccessControlSystem: null,
  count: null,
};
