import { mapStateToProps, mapDispatchToProps } from './ClientOnboardingContainer';
import { getInitialState } from '../../../../test/rootState';

describe('ClientOnboardingContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      user: getInitialState().auth.session,
      clientMap: getInitialState().client.clientMap,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchClient: expect.any(Function),
    });
  });
});
