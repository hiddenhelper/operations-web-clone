import { GeneralModel, UserModel } from '../../models';

export interface IState {
  userMap: GeneralModel.IEntityMap<UserModel.IUser>;
  companyUserProfile: GeneralModel.IEntityMap<UserModel.IUser>;
  userProjectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<UserModel.IUserProject>>;
  userClientMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<UserModel.IUserProject>>;
  roleList: GeneralModel.INamedEntity[];
  accountData: UserModel.IAccount;
  email: string;
  count: number;
  groupList: string[];
}

export const initialState: IState = {
  userMap: {},
  companyUserProfile: {},
  userProjectMap: {},
  userClientMap: {},
  roleList: [],
  accountData: null,
  email: null,
  count: null,
  groupList: [],
};
