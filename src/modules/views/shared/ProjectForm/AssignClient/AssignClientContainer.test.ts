import { mapStateToProps, mapDispatchToProps } from './AssignClientContainer';
import { getInitialState } from '../../../../../test/rootState';
import { clientState } from '../../../../state-mgmt/client';
import { generalState } from '../../../../state-mgmt/general';
import { getClient_1 } from '../../../../../test/entities';
import { GENERAL } from '../../../../../constants';

describe('AssignClientContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      clientMap: {},
      mwbeList: [],
      uiRelationMap: {},
      searchLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchMwbeList: expect.any(Function),
      setRelationUiId: expect.any(Function),
      searchCompanies: expect.any(Function),
      createCompany: expect.any(Function),
      clearClientErrors: expect.any(Function),
      clearRelationMap: expect.any(Function),
    });
  });

  it('should dispatch fetchMwbeList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchMwbeList();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchMWbeListStart());
  });

  it('should dispatch setRelationUiId start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const key = 'key';
    const value = 'value';
    props.setRelationUiId(key, value);
    expect(dispatch).toBeCalledWith(generalState.actions.setRelationUiId(key, value));
  });

  it('should dispatch searchCompanies start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    const tempId = 'tempId';
    props.searchCompanies(query, tempId);
    expect(dispatch).toBeCalledWith(clientState.actions.searchClientStart(query, tempId));
  });

  it('should dispatch createCompany start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const client = getClient_1();
    const step = {} as any;
    const tempId = 'tempId';
    props.createCompany(client, step, tempId);
    expect(dispatch).toBeCalledWith(clientState.actions.saveClientStart(client, step, false, tempId));
  });

  it('should dispatch clearClientErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_CLIENT));
  });

  it('should dispatch clearRelationMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearRelationMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearRelationMap());
  });
});
