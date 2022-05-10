import { mapStateToProps, mapDispatchToProps } from './ListViewContainer';
import { getInitialState } from '../../../../../../../../test/rootState';
import { clientState } from '../../../../../../../state-mgmt/client';

describe('ListViewContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      clientMap: getInitialState().client.clientProjectMap,
      clientCount: getInitialState().client.count,
      mwbeList: getInitialState().client.mwbeList,
      userRole: getInitialState().auth.role,
      clientLoading: undefined,
      assignClientLoading: undefined,
      projectClientSummaryLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProjectClientList: expect.any(Function),
      fetchProjectClientSummary: expect.any(Function),
      updateTaxCondition: expect.any(Function),
      fetchMwbe: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectClientList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectClientList('id', {});
    expect(dispatch).toBeCalledWith(clientState.actions.fetchProjectClientListStart('id', {}));
  });

  it('should dispatch fetchProjectClientSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectClientSummary('id', 'cId');
    expect(dispatch).toBeCalledWith(clientState.actions.fetchProjectClientSummaryStart('id', 'cId'));
  });

  it('should dispatch updateTaxCondition start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const taxCondition = { companyId: 'cId', isTaxExempt: true };
    props.updateTaxCondition('id', taxCondition);
    expect(dispatch).toBeCalledWith(clientState.actions.updateProjectClientTaxConditionStart('id', taxCondition));
  });

  it('should dispatch fetchMwbe start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchMwbe();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchMWbeListStart());
  });
});
