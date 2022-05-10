import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { clientState } from '../../../../../state-mgmt/client';

import AssignSubContractorTab from './AssignSubContractorTab';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearClientMap: () => dispatch(clientState.actions.clearClientMap()),
});

export default connect(null, mapDispatchToProps)(AssignSubContractorTab);
