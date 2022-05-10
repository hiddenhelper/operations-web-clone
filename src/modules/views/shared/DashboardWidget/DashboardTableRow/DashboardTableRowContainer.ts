import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import DashboardTableRow from './DashboardTableRow';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(null, mapDispatchToProps)(DashboardTableRow);
