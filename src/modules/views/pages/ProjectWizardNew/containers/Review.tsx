import { connect } from 'react-redux';
import Review from '../components/Review';
import { IRootState } from '../../../../state-mgmt/rootState';
import { paymentState } from '../../../../state-mgmt/payment';

export const mapStateToProps = (state: IRootState) => ({
  paymentMethods: state.payment.paymentMethod,
  projectMap: state.projectNew.projectMap,
  userCompanyId: state.auth.companyId,
  userRole: state.auth.role,
});

export const mapDispatchToProps = dispatch => ({
  fetchPaymentMethods: () => dispatch(paymentState.actions.fetchPaymentMethodsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);
