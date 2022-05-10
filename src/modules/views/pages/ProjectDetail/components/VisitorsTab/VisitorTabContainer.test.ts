import { GENERAL } from '../../../../../../constants';
import { getProject_1, getVisitorProject_1 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import { badgeState } from '../../../../../state-mgmt/badge';
import { generalState } from '../../../../../state-mgmt/general';
import { projectState } from '../../../../../state-mgmt/project';

import { mapStateToProps, mapDispatchToProps } from './VisitorTabContainer';

describe('VisitorTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      visitorMap: getInitialState().badge.badgeVisitorMap,
      visitorCount: getInitialState().badge.count,
      projectBadgeVisitorLoading: undefined,
      saveBadgeVisitorLoading: undefined,
      updateLoading: undefined,
      updateBadgeDataLoading: undefined,
      badgeVisitorEntityLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      saveBadgeVisitor: expect.any(Function),
      unassignBadgeVisitor: expect.any(Function),
      clearProjectMap: expect.any(Function),
      fetchProjectBadgeVisitorList: expect.any(Function),
      fetchBadgeVisitorEntityList: expect.any(Function),
      clearSaveBadgeLoading: expect.any(Function),
    });
  });

  it('should dispatch saveBadgeVisitor start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveBadgeVisitor(getProject_1().id, 10);
    expect(dispatch).toBeCalledWith(badgeState.actions.createBadgeVisitorStart(getProject_1().id, 10));
  });

  it('should dispatch unassignBadgeVisitor start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.unassignBadgeVisitor(getProject_1().id, getVisitorProject_1());
    expect(dispatch).toBeCalledWith(badgeState.actions.unassignProjectBadgeVisitorStart(getProject_1().id, getVisitorProject_1()));
  });

  it('should dispatch clearProjectMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearProjectMap();
    expect(dispatch).toBeCalledWith(badgeState.actions.clearBadge());
  });

  it('should dispatch fetchProjectBadgeVisitorList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectBadgeVisitorList('id', 1, 1);
    expect(dispatch).toBeCalledWith(badgeState.actions.fetchProjectBadgeVisitorListStart('id', 1, 1));
  });

  it('should dispatch fetchBadgeVisitorEntityList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgeVisitorEntityList(getVisitorProject_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.fetchBadgeVisitorEntityListStart(getVisitorProject_1().id));
  });

  it('should dispatch clearSaveBadgeLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearSaveBadgeLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_PROJECT_BADGE_VISITOR));
  });
});
