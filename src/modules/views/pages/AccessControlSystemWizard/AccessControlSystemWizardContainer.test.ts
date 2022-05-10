import { mapStateToProps, mapDispatchToProps } from './AccessControlSystemWizardContainer';
import { getInitialState } from '../../../../test/rootState';
import { accessControlSystemState } from '../../../state-mgmt/access-control-system';
import { generalState } from '../../../state-mgmt/general';
import { GENERAL } from '../../../../constants';

describe('AccessControlSystemContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      accessControlSystemMap: {},
      loading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      saveAccessControlSystem: expect.any(Function),
      updateAccessControlSystem: expect.any(Function),
      clearErrors: expect.any(Function),
      fetchAccessControlSystem: expect.any(Function),
      clearAccessControlSystemMap: expect.any(Function),
    });
  });

  it('should dispatch fetchAccessControlSystemStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.fetchAccessControlSystem(id);
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.fetchAccessControlSystemSummaryStart(id));
  });

  it('should dispatch saveAccessControlSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const accessControlSystem = { name: 'acs name', type: 0 } as any;
    props.saveAccessControlSystem(accessControlSystem);
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.saveAccessControlSystemStart(accessControlSystem));
  });

  it('should dispatch updateAccessControlSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const accessControlSystem = { name: 'acs name', type: 0 } as any;
    props.updateAccessControlSystem(accessControlSystem);
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.updateAccessControlSystemStart(accessControlSystem));
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_ACCESS_CONTROL_SYSTEM));
  });

  it('should dispatch clearAccessControlSystemMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearAccessControlSystemMap();
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.clearAccessControlSystemMap());
  });
});
