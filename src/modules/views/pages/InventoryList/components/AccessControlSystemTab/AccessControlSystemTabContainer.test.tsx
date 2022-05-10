import { push } from 'connected-react-router';
import { mapDispatchToProps, mapStateToProps } from './AccessControlSystemTabContainer';
import { accessControlSystemState } from '../../../../../state-mgmt/access-control-system';
import { getInitialState } from '../../../../../../test/rootState';

describe('AccessControlSystemTabContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      accessControlSystemMap: getInitialState().accessControlSystem.accessControlSystemMap,
      deviceCount: null,
      loading: undefined,
      summaryLoading: undefined,
      deleteLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchAccessControlSystemList: expect.any(Function),
      fetchAccessControlSystemSummary: expect.any(Function),
      deleteAccessControlSystem: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch fetchAccessControlSystemList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchAccessControlSystemList({});
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.fetchAccessControlSystemListStart({}));
  });

  it('should dispatch fetchAccessControlSystemSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const deviceId = '1';
    props.fetchAccessControlSystemSummary(deviceId);
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.fetchAccessControlSystemSummaryStart(deviceId));
  });

  it('should dispatch deleteAccessControlSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const deviceId = '1';
    props.deleteAccessControlSystem(deviceId, {});
    expect(dispatch).toBeCalledWith(accessControlSystemState.actions.deleteAccessControlSystemStart(deviceId, {}));
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });
});
