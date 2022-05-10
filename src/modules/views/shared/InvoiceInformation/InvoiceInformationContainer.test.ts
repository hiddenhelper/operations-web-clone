import { getInitialState } from '../../../../test/rootState';
import { invoiceState } from '../../../state-mgmt/invoice';
import { mapDispatchToProps, mapStateToProps } from './InvoiceInformationContainer';

describe('InvoiceInformationContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      invoiceMap: getInitialState().invoice.invoiceMap,
      loading: undefined,
      downloadLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchInvoiceInformation: expect.any(Function),
      downloadInvoice: expect.any(Function),
    });
  });

  it('should dispatch fetchInvoiceInformation start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchInvoiceInformation('id');
    expect(dispatch).toBeCalledWith(invoiceState.actions.fetchInvoiceStart('id'));
  });

  it('should dispatch downloadInvoice start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.downloadInvoice('id', '2020-01-10 3344');
    expect(dispatch).toBeCalledWith(invoiceState.actions.downloadStart('id', '2020-01-10 3344'));
  });
});
