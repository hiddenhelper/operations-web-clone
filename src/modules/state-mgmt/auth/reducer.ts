import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload?: any }): IState => {
  switch (type) {
    case ActionType.SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        session: payload.session,
        role: payload.session['custom:role'],
        companyUserId: payload.session['custom:companyuserid'],
        companyWorkerId: payload.session['custom:companyworkerid'],
        currentCompanyId: payload.session['custom:currentcompanyid'],
        isFcaUser: payload.session['custom:currentcompanyid'] === 'ffffffff-ffff-ffff-ffff-ffffffffffff',
        isAdmin: payload.session['custom:isadmin'] === 'True',
      };
    case ActionType.FETCH_USER_PERMISSIONS_SUCCESS: {
      return {
        ...state,
        session: {
          ...state.session,
          permissions: payload.perimissions,
        },
      };
    }
    case ActionType.SIGN_OUT_SUCCESS:
      return { ...state, authenticated: false };
    case ActionType.RECOVER_SESSION_DONE:
      return { ...state, sessionChecked: true };
    default:
      return state;
  }
};
