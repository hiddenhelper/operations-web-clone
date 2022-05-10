import { mapStateToProps, mapDispatchToProps } from './InvoicesTabContainer';
import { push } from 'connected-react-router';

import { GENERAL } from '../../../../constants';
import { getInitialState } from '../../../../test/rootState';
import { getInvoice_1 } from '../../../../test/entities';
import { invoiceState } from '../../../state-mgmt/invoice';
import { generalState } from '../../../state-mgmt/general';
import { clientState } from '../../../state-mgmt/client';
import { projectState } from '../../../state-mgmt/project';

describe('InvoicesTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      invoiceMap: getInitialState().invoice.invoiceMap,
      clientMap: getInitialState().client.clientMap,
      projectMap: getInitialState().project.projectClientMap,
      count: getInitialState().invoice.count,
      listLoading: getInitialState().general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVOICE_LIST],
      saveInvoiceLoading: getInitialState().general.loadingMap[GENERAL.LOADING_KEY.SAVE_INVOICE],
      confirmInvoiceLoading: getInitialState().general.loadingMap[GENERAL.LOADING_KEY.CONFIRM_INVOICE],
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProjectInvoiceList: expect.any(Function),
      fetchProjectClientList: expect.any(Function),
      fetchClientInvoiceList: expect.any(Function),
      fetchClientProjectList: expect.any(Function),
      saveInvoice: expect.any(Function),
      clearLoading: expect.any(Function),
      clearConfirmLoading: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch fetchInvoiceList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectInvoiceList('id', {});
    expect(dispatch).toBeCalledWith(invoiceState.actions.fetchInvoiceListStart({ projectId: 'id' }));
  });

  it('should dispatch fetchProjectClientList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectClientList('id', {});
    expect(dispatch).toBeCalledWith(clientState.actions.fetchProjectClientListStart('id', {}));
  });

  it('should dispatch saveInvoice start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveInvoice(getInvoice_1(), 0);
    expect(dispatch).toBeCalledWith(invoiceState.actions.saveInvoiceStart(getInvoice_1(), 0));
  });

  it('should dispatch clearLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_INVOICE));
  });

  it('should dispatch clearConfirmLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearConfirmLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.CONFIRM_INVOICE));
  });

  it('should dispatch navigate start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('path');
    expect(dispatch).toBeCalledWith(push('path'));
  });

  it('should dispatch fetchClientProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientProjectList('id', {});
    expect(dispatch).toBeCalledWith(projectState.actions.fetchClientProjectListStart('id', {}));
  });

  it('should dispatch fetchClientInvoiceList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientInvoiceList('id', {});
    expect(dispatch).toBeCalledWith(invoiceState.actions.fetchInvoiceListStart({ clientId: 'id' }));
  });
});
