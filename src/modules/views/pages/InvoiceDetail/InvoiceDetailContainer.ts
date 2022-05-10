import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { push } from 'connected-react-router';
import InvoiceList from './InvoiceDetail';

export const mapStateToProps = (state: IRootState) => ({});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
