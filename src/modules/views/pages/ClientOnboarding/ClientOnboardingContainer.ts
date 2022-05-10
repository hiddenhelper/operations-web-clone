import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { clientState } from '../../../state-mgmt/client';

import ClientOnboarding from './ClientOnboarding';

export const mapStateToProps = (state: IRootState) => ({
  user: state.auth.session,
  clientMap: state.client.clientMap,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClient: (id: string) => dispatch(clientState.actions.fetchClientStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientOnboarding);
