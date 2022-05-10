import { mapDispatchToProps, mapStateToProps } from './ReviewContainer';
import { getInitialState } from '../../../../../test/rootState';
import { paymentState } from '../../../../state-mgmt/payment';

describe('PaymentMethodsContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      paymentMethods: getInitialState().payment.paymentMethod,
      projectMap: getInitialState().project.projectMap,
      userCompanyId: getInitialState().auth.companyId,
      userRole: getInitialState().auth.role,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchPaymentMethods: expect.any(Function),
    });
  });
  it('should dispatch fetchPaymentMethods action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchPaymentMethods();
    expect(dispatch).toBeCalledWith(paymentState.actions.fetchPaymentMethodsStart());
  });
});
