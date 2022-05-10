import { getInitialState } from '../../../../test/rootState';
import { mapStateToProps } from './SidebarContainer';

describe('SidebarContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      location: getInitialState().router.location,
    });
  });
});
