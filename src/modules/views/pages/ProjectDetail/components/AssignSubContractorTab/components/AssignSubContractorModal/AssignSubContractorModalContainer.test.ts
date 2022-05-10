import { getClient_1, getProject_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import { clientState } from '../../../../../../../state-mgmt/client';
import { projectState } from '../../../../../../../state-mgmt/project';
import { generalState } from '../../../../../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './AssignSubContractorModalContainer';

describe('AssignSubContractorContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userCompanyId: getInitialState().auth.companyId,
      userRole: getInitialState().auth.role,
      subContractorMap: getInitialState().general.modalMap,
      count: getInitialState().general.modalCount,
      uiRelationMap: getInitialState().general.uiRelationMap,
      loading: undefined,
      assignLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchSubContractorList: expect.any(Function),
      assignSubcontractor: expect.any(Function),
      searchCompanies: expect.any(Function),
      clearRelationMap: expect.any(Function),
    });
  });

  it('should dispatch fetchSubContractorList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {};
    props.fetchSubContractorList(query);
    expect(dispatch).toBeCalledWith(clientState.actions.fetchSubcontractorListStart(query));
  });

  it('should dispatch assignSubcontractor start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.assignSubcontractor(getProject_1().id, [], getClient_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.assignClientProjectStart(getProject_1().id, [], getClient_1().id));
  });

  it('should dispatch searchCompanies start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    props.searchCompanies(query, 'tempId');
    expect(dispatch).toBeCalledWith(clientState.actions.searchClientStart(query, 'tempId'));
  });

  it('should dispatch clearRelationMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearRelationMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearRelationMap());
  });
});
