import { mapDispatchToProps, mapStateToProps } from './InvoiceListContainer';
import { getInitialState } from '../../../../test/rootState';
import { invoiceState } from '../../../state-mgmt/invoice';
import { statisticsState } from '../../../state-mgmt/statistics';
import { InvoiceModel } from '../../../models';

describe('InvoiceListContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      invoiceMap: getInitialState().invoice.invoiceMap,
      invoiceStatistics: getInitialState().statistics.invoiceStatistics,
      payInvoiceLoading: undefined,
      saveInvoiceLoading: undefined,
      editInvoiceLoading: undefined,
      fetchInvoiceLoading: undefined,
      invoiceStatisticsLoading: undefined,
      isFcaUser: getInitialState().auth.isFcaUser,
      isAdmin: getInitialState().auth.isAdmin,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchInvoiceList: expect.any(Function),
      editInvoice: expect.any(Function),
      clearInvoiceMap: expect.any(Function),
      saveInvoice: expect.any(Function),
      fetchInvoiceStatistics: expect.any(Function),
      clearInvoiceStatistics: expect.any(Function),
    });
  });

  it('should dispatch fetchInvoiceList action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchInvoiceList({});
    expect(dispatch).toBeCalledWith(invoiceState.actions.fetchInvoiceListStart({}));
  });

  it('should dispatch clearInvoiceMap action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearInvoiceMap();
    expect(dispatch).toBeCalledWith(invoiceState.actions.clearInvoiceMap());
  });

  it('should dispatch saveInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveInvoice({}, InvoiceModel.InvoiceStep.DRAFT);
    expect(dispatch).toBeCalledWith(invoiceState.actions.saveInvoiceStart({}, InvoiceModel.InvoiceStep.DRAFT));
  });

  it('should dispatch fetchInvoiceStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchInvoiceStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchInvoiceStatisticsStart());
  });

  it('should dispatch clearInvoiceStatistics action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearInvoiceStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearInvoiceStatistics());
  });

  it('should dispatch editInvoice action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.editInvoice('id', {} as any, InvoiceModel.InvoiceStep.DRAFT);
    expect(dispatch).toBeCalledWith(invoiceState.actions.editInvoiceStart('id', {} as any, InvoiceModel.InvoiceStep.DRAFT));
  });
});
