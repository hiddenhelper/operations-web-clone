import { getBadge_1 } from '../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../test/rootState';
import { badgeState } from '../../../../../../state-mgmt/badge';
import { mapStateToProps, mapDispatchToProps } from './BadgeHistoryTabContainer';

describe('BadgeHistoryTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      historyList: getInitialState().badge.historyList,
      count: getInitialState().badge.count,
      loading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchBadgeHistory: expect.any(Function),
      clearBadgeHistory: expect.any(Function),
    });
  });

  it('should dispatch fetchBadgeHistory start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgeHistory(getBadge_1().id, { page: 1, limit: 10 });
    expect(dispatch).toBeCalledWith(badgeState.actions.fetchBadgeHistoryStart(getBadge_1().id, { page: 1, limit: 10 }));
  });

  it('should dispatch clearBadgeHistory start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearBadgeHistory();
    expect(dispatch).toBeCalledWith(badgeState.actions.clearBadgeHistory());
  });
});
