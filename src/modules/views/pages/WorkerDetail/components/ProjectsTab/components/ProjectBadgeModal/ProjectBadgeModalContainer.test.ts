import { GENERAL } from '../../../../../../../../constants';
import { getBadge_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import { badgeState } from '../../../../../../../state-mgmt/badge';
import { generalState } from '../../../../../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './ProjectBadgeModalContainer';

describe('ProjectBadgeModalContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      badgeMap: getInitialState().badge.badgeMap,
      badgeFileUrl: undefined,
      badgeLoading: undefined,
      updateLoading: undefined,
      currentUserRole: null,
      printLoading: undefined,
      updateBadgeDataLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchBadge: expect.any(Function),
      activateBadge: expect.any(Function),
      deactivateBadge: expect.any(Function),
      revokeBadge: expect.any(Function),
      updateBadge: expect.any(Function),
      clearBadge: expect.any(Function),
      clearUpdateLoading: expect.any(Function),
      clearUpdateBadgeLoading: expect.any(Function),
      printWorkerBadge: expect.any(Function),
    });
  });

  it('should dispatch fetchBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadge(getBadge_1().id);
    expect(dispatch).toBeCalledWith(badgeState.actions.fetchBadgeStart(getBadge_1().id));
  });

  it('should dispatch activateBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.activateBadge(getBadge_1().id, 'tagId');
    expect(dispatch).toBeCalledWith(badgeState.actions.activateBadgeStart(getBadge_1().id, 'tagId'));
  });

  it('should dispatch deactivateBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deactivateBadge(getBadge_1().id, 'reason');
    expect(dispatch).toBeCalledWith(badgeState.actions.deactivateBadgeStart(getBadge_1().id, 'reason'));
  });

  it('should dispatch revokeBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.revokeBadge(getBadge_1().id, 'reason');
    expect(dispatch).toBeCalledWith(badgeState.actions.revokeBadgeStart(getBadge_1().id, 'reason'));
  });

  it('should dispatch updateBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateBadge(getBadge_1().id, {
      badgeType: 0,
      expirationDate: null,
      hasExpiration: 0,
    });
    expect(dispatch).toBeCalledWith(
      badgeState.actions.updateProjectBadgeStart(getBadge_1().id, {
        badgeType: 0,
        expirationDate: null,
        hasExpiration: 0,
      })
    );
  });

  it('should dispatch clearBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearBadge();
    expect(dispatch).toBeCalledWith(badgeState.actions.clearBadge());
  });

  it('should dispatch clearUpdateLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearUpdateLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE));
  });

  it('should dispatch clearUpdateBadgeLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearUpdateBadgeLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA));
  });

  it('should dispatch printWorkerBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.printWorkerBadge('id');
    expect(dispatch).toBeCalledWith(badgeState.actions.printWorkerBadgeStart('id'));
  });
});
