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
        companyId: payload.session['custom:companyid'],
        companyUserId: payload.session['custom:companyuserid'],
      };
    case ActionType.SIGN_OUT_SUCCESS:
      return { ...state, authenticated: false };
    case ActionType.RECOVER_SESSION_DONE:
      return { ...state, sessionChecked: true };
    default:
      return state;
  }
};
