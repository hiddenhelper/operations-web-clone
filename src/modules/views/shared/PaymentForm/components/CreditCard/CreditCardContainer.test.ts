import { mapStateToProps, mapDispatchToProps } from './CreditCardContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { paymentState } from '../../../../../state-mgmt/payment';
import { generalState } from '../../../../../state-mgmt/general';

describe('CreditCardContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      createLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      createPayment: expect.any(Function),
      clearLoading: expect.any(Function),
    });
  });

  it('should dispatch createPayment start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.createPayment('id');
    expect(dispatch).toBeCalledWith(paymentState.actions.createPaymentStart('id'));
  });

  it('should dispatch clearLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clearLoadingMap());
  });
});
