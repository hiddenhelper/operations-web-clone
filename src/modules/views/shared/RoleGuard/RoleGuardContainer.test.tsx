import { getInitialState } from '../../../../test/rootState';
import { mapStateToProps } from './RoleGuardContainer';

describe('RoleGuardContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      currentUserRole: null,
    });
  });
});
