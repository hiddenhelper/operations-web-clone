import { GeneralModel, UserModel } from '../../models';

export interface IState {
  userMap: GeneralModel.IEntityMap<UserModel.IUser>;
  userProjectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<UserModel.IUserProject>>;
  userClientMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<UserModel.IUserProject>>;
  roleList: GeneralModel.INamedEntity[];
  accountData: UserModel.IAccount;
  email: string;
  count: number;
}

export const initialState: IState = {
  userMap: {},
  userProjectMap: {},
  userClientMap: {},
  roleList: [],
  accountData: null,
  email: null,
  count: null,
};
