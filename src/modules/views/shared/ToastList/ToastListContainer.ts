import { connect } from 'react-redux';

import { IRootState } from '../../../state-mgmt/rootState';
import ToastList from './ToastList';

export const mapStateToProps = (state: IRootState) => ({
  list: state.general.toastList,
});

export default connect(mapStateToProps, null)(ToastList);
