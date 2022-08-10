import { getInitialState } from '../../../../test/rootState';
import { mapStateToProps } from './SidebarContainer';

describe('SidebarContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      location: getInitialState().router.location,
    });
  });
});
