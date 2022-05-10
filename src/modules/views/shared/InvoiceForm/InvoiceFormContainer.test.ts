import { clientState } from '../../../state-mgmt/client';
import { invoiceState } from '../../../state-mgmt/invoice';
import { generalState } from '../../../state-mgmt/general';
import { projectState } from '../../../state-mgmt/project';

import { getInitialState } from '../../../../test/rootState';
import { mapStateToProps, mapDispatchToProps } from './InvoiceFormContainer';

describe('InvoiceFormContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      uiRelationMap: getInitialState().general.uiRelationMap,
      serviceList: getInitialState().invoice.serviceList,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      searchCompanies: expect.any(Function),
      searchProjects: expect.any(Function),
      fetchServices: expect.any(Function),
      clearRelationMap: expect.any(Function),
    });
  });

  it('should dispatch searchCompanies start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.searchCompanies({}, '');
    expect(dispatch).toBeCalledWith(clientState.actions.searchClientStart({}, ''));
  });

  it('should dispatch searchProjects start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.searchProjects({}, '');
    expect(dispatch).toBeCalledWith(projectState.actions.searchProjectStart({}, ''));
  });

  it('should dispatch fetchServices start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchServices();
    expect(dispatch).toBeCalledWith(invoiceState.actions.fetchServiceTypeListStart());
  });

  it('should dispatch clearRelationMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearRelationMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearRelationMap());
  });
});
