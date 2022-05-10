import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { GENERAL } from '../../../../constants';
import { IRootState } from '../../../state-mgmt/rootState';
import { projectState } from '../../../state-mgmt/project';
import { paymentState } from '../../../state-mgmt/payment';

import ProjectInvitation from './ProjectInvitation';

export const mapStateToProps = (state: IRootState) => ({
  projectMap: state.project.projectMap,
  acceptLoading: state.general.loadingMap[GENERAL.LOADING_KEY.ACCEPT_PROJECT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProject: (id: string) => dispatch(projectState.actions.fetchProjectStart(id)),
  acceptProjectInvitation: (id: string, paymentMethodId: string) => dispatch(projectState.actions.acceptProjectInvitationStart(id, paymentMethodId)),
  clearPayment: () => dispatch(paymentState.actions.clearPayment()),
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInvitation);
