import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { generalState } from '../../../state-mgmt/general';

import Wizard from './Wizard';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigate: (path: string) => dispatch(push(path)),
  clearLoadingMap: () => dispatch(generalState.actions.clearLoadingMap()),
});

export default connect(null, mapDispatchToProps)(Wizard);
