import { mapDispatchToProps, mapStateToProps } from './PaymentMethodsContainer';
import { getInitialState } from '../../../../test/rootState';
import { paymentState } from '../../../state-mgmt/payment';
import { generalState } from '../../../state-mgmt/general';

describe('PaymentMethodsContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      paymentMethods: getInitialState().payment.paymentMethod,
      createLoading: undefined,
      fetchPaymentLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchPaymentMethods: expect.any(Function),
      clearLoading: expect.any(Function),
      deletePaymentMethod: expect.any(Function),
      replaceAndDeletePaymentMethod: expect.any(Function),
    });
  });

  it('should dispatch fetchPaymentMethods action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchPaymentMethods();
    expect(dispatch).toBeCalledWith(paymentState.actions.fetchPaymentMethodsStart());
  });

  it('should dispatch deletePaymentMethod action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deletePaymentMethod('someId');
    expect(dispatch).toBeCalledWith(paymentState.actions.deletePaymentStart('someId'));
  });

  it('should dispatch replacePaymentMethod action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.replaceAndDeletePaymentMethod('someId', 'someOtherId');
    expect(dispatch).toBeCalledWith(paymentState.actions.replaceAndDeletePaymentStart('someId', 'someOtherId'));
  });

  it('should dispatch clearLoading action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoading('fetchPayment');
    expect(dispatch).toBeCalledWith(generalState.actions.clear('fetchPayment'));
  });
});
