import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { paymentState } from '../../../../../state-mgmt/payment';

import CreditCard from './CreditCard';
import { generalState } from '../../../../../state-mgmt/general';

export const mapStateToProps = (state: IRootState) => ({
  createLoading: state.general.loadingMap[GENERAL.LOADING_KEY.CREATE_PAYMENT],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  createPayment: (id: string) => dispatch(paymentState.actions.createPaymentStart(id)),
  clearLoading: () => dispatch(generalState.actions.clearLoadingMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCard);
