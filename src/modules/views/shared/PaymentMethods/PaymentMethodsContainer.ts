import { IRootState } from '../../../state-mgmt/rootState';
import { connect } from 'react-redux';
import PaymentMethods from './PaymentMethods';
import { GENERAL } from '../../../../constants';
import { paymentState } from '../../../state-mgmt/payment';
import { generalState } from '../../../state-mgmt/general';

export const mapStateToProps = (state: IRootState) => ({
  paymentMethods: state.payment.paymentMethod,
  createLoading: state.general.loadingMap[GENERAL.LOADING_KEY.CREATE_PAYMENT],
  deleteLoading: state.general.loadingMap[GENERAL.LOADING_KEY.DELETE_PAYMENT_METHOD],
  fetchPaymentLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS],
});

export const mapDispatchToProps = dispatch => ({
  fetchPaymentMethods: () => dispatch(paymentState.actions.fetchPaymentMethodsStart()),
  deletePaymentMethod: (id: string) => dispatch(paymentState.actions.deletePaymentStart(id)),
  replaceAndDeletePaymentMethod: (toDeleteId: string, toReplaceWithId: string) =>
    dispatch(paymentState.actions.replaceAndDeletePaymentStart(toDeleteId, toReplaceWithId)),
  clearLoading: (key: string) => dispatch(generalState.actions.clear(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods);
