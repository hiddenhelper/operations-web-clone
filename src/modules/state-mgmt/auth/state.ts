import { UserModel } from '../../models';

export interface IState {
  authenticated: boolean;
  sessionChecked: boolean;
  session: UserModel.IUser;
  role: UserModel.Role;
  companyId: string;
  companyUserId: string;
}

export const initialState: IState = {
  authenticated: false,
  sessionChecked: false,
  session: null,
  role: null,
  companyId: null,
  companyUserId: null,
};
