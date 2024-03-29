import { connect } from 'react-redux';
import Review from './Review';
import { IRootState } from '../../../../state-mgmt/rootState';
import { paymentState } from '../../../../state-mgmt/payment';

export const mapStateToProps = (state: IRootState) => ({
  paymentMethods: state.payment.paymentMethod,
  projectMap: state.project.projectMap,
  userCompanyId: state.auth.currentCompanyId,
  isFcaUser: state.auth.isFcaUser,
  isAdmin: state.auth.isAdmin,
});

export const mapDispatchToProps = dispatch => ({
  fetchPaymentMethods: () => dispatch(paymentState.actions.fetchPaymentMethodsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);
