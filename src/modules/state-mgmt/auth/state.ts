import { UserModel } from '../../models';

export interface IState {
  authenticated: boolean;
  sessionChecked: boolean;
  session: UserModel.IUser;
  role: UserModel.Role;
  isFcaUser: boolean;
  companyUserId: string;
  companyWorkerId: string;
  currentCompanyId: string;
  isAdmin: boolean;
}

export const initialState: IState = {
  authenticated: false,
  sessionChecked: false,
  session: null,
  role: null,
  isFcaUser: false,
  companyUserId: undefined,
  companyWorkerId: undefined,
  currentCompanyId: undefined,
  isAdmin: false,
};
