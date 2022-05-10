import { getInitialState } from '../../../../test/rootState';
import { mapStateToProps, mapDispatchToProps } from './ProjectInvitationContainer';
import { projectState } from '../../../state-mgmt/project';
import { paymentState } from '../../../state-mgmt/payment';
import { getProject_1 } from '../../../../test/entities';
import { push } from 'connected-react-router';

describe('ProjectInvitationContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      projectMap: getInitialState().project.projectMap,
      acceptLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProject: expect.any(Function),
      acceptProjectInvitation: expect.any(Function),
      clearPayment: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProject(getProject_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.fetchProjectStart(getProject_1().id));
  });

  it('should dispatch acceptProjectInvitationStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.acceptProjectInvitation(getProject_1().id, 'id');
    expect(dispatch).toBeCalledWith(projectState.actions.acceptProjectInvitationStart(getProject_1().id, 'id'));
  });

  it('should dispatch clearPayment start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearPayment();
    expect(dispatch).toBeCalledWith(paymentState.actions.clearPayment());
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });
});
