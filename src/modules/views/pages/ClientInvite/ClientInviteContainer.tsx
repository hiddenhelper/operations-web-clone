import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IRootState } from 'modules/state-mgmt/rootState';
import { generalState } from 'modules/state-mgmt/general';
import { ClientModel } from 'modules/models';
import { clientState } from 'modules/state-mgmt/client';
import ClientInviteWizard from './ClientInvite';
import { GENERAL } from 'constants/index';

export const mapStateToProps = (state: IRootState) => ({
  countryList: state.general.countryList,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearErrors: () => dispatch(generalState.actions.clear(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT)),
  fetchCountries: () => dispatch(generalState.actions.fetchCountryListStart()),
  inviteClient: (client: ClientModel.IClient) => dispatch(clientState.actions.inviteDraftClientStart(client)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientInviteWizard);
