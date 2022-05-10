import { push } from 'connected-react-router';
import { mapDispatchToProps, mapStateToProps } from './InvoiceTableContainer';
import { getInitialState } from '../../../../test/rootState';
import { invoiceState } from '../../../state-mgmt/invoice';
import { InvoiceModel } from '../../../models';
import { GENERAL } from '../../../../constants';

describe('InvoiceTableContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      invoiceMap: getInitialState().invoice.invoiceMap,
      invoiceCount: getInitialState().invoice.count,
      payLoading: getInitialState().general.loadingMap[GENERAL.LOADING_KEY.PAY_INVOICE],
      userRole: getInitialState().auth.role,
      listLoading: undefined,
      invoiceDetailLoading: undefined,
      deleteLoading: undefined,
      markAsPaidLoading: undefined,
      confirmInvoiceLoading: undefined,
      voidLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchInvoice: expect.any(Function),
      editInvoice: expect.any(Function),
      saveInvoice: expect.any(Function),
      confirmInvoice: expect.any(Function),
      navigate: expect.any(Function),
      fetchInvoiceSummary: expect.any(Function),
      deleteInvoice: expect.any(Function),
      markAsPaidInvoice: expect.any(Function),
      markAsVoidInvoice: expect.any(Function),
      payInvoice: expect.any(Function),
    });
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });

  it('should dispatch saveInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveInvoice({}, InvoiceModel.InvoiceStep.DRAFT);
    expect(dispatch).toBeCalledWith(invoiceState.actions.saveInvoiceStart({}, InvoiceModel.InvoiceStep.DRAFT));
  });

  it('should dispatch fetchInvoiceSummary action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchInvoiceSummary('id');
    expect(dispatch).toBeCalledWith(invoiceState.actions.fetchInvoiceSummaryStart('id'));
  });

  it('should dispatch deleteInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deleteInvoice('id');
    expect(dispatch).toBeCalledWith(invoiceState.actions.deleteInvoiceStart('id'));
  });

  it('should dispatch markAsPaidInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.markAsPaidInvoice('id');
    expect(dispatch).toBeCalledWith(invoiceState.actions.markAsPaidInvoiceStart('id'));
  });

  it('should dispatch markAsVoidInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.markAsVoidInvoice('id');
    expect(dispatch).toBeCalledWith(invoiceState.actions.markAsVoidInvoiceStart('id'));
  });

  it('should dispatch payInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.payInvoice('id');
    expect(dispatch).toBeCalledWith(invoiceState.actions.payInvoiceStart('id'));
  });

  it('should dispatch confirmInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.confirmInvoice('id', {} as any);
    expect(dispatch).toBeCalledWith(invoiceState.actions.confirmInvoiceStart('id', {} as any));
  });

  it('should dispatch fetchInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchInvoice('id');
    expect(dispatch).toBeCalledWith(invoiceState.actions.fetchInvoiceStart('id'));
  });

  it('should dispatch editInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.editInvoice('id', {} as any, InvoiceModel.InvoiceStep.DRAFT);
    expect(dispatch).toBeCalledWith(invoiceState.actions.editInvoiceStart('id', {} as any, InvoiceModel.InvoiceStep.DRAFT));
  });
});
