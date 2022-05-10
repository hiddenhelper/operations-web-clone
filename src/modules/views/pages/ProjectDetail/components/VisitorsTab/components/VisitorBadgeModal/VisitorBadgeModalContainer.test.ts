import { GENERAL } from '../../../../../../../../constants';
import { getBadge_1, getBadgeUpdateRequest_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import { badgeState } from '../../../../../../../state-mgmt/badge';
import { generalState } from '../../../../../../../state-mgmt/general';

import { mapStateToProps, mapDispatchToProps } from './VisitorBadgeModalContainer';

describe('VisitorBadgeModalContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      badgeMap: getInitialState().badge.badgeMap,
      badgeLoading: undefined,
      updateLoading: undefined,
      assignLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchBadge: expect.any(Function),
      revokeBadge: expect.any(Function),
      clearBadge: expect.any(Function),
      clearUpdateLoading: expect.any(Function),
      printVisitorBadge: expect.any(Function),
      updateBadge: expect.any(Function),
      clearUpdateBadgeLoading: expect.any(Function),
    });
  });

  it('should dispatch fetchBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadge(getBadge_1().id);
    expect(dispatch).toBeCalledWith(badgeState.actions.fetchBadgeVisitorStart(getBadge_1().id));
  });

  it('should dispatch revokeBadge start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.revokeBadge(getBadge_1().id, 'reason');
    expect(dispatch).toBeCalledWith(badgeState.actions.revokeBadgeStart(getBadge_1().id, 'reason'));
  });

  it('should dispatch clearBadge action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearBadge();
    expect(dispatch).toBeCalledWith(badgeState.actions.clearBadge());
  });

  it('should dispatch clearUpdateLoading action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearUpdateLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE));
  });

  it('should dispatch printVisitorBadge action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.printVisitorBadge('id');
    expect(dispatch).toBeCalledWith(badgeState.actions.printVisitorBadgeStart('id'));
  });

  it('should dispatch updateBadge action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateBadge('id', getBadgeUpdateRequest_1());
    expect(dispatch).toBeCalledWith(badgeState.actions.updateVisitorBadgeStart('id', getBadgeUpdateRequest_1()));
  });

  it('should dispatch clearUpdateBadgeLoading action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearUpdateBadgeLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.UPDATE_BADGE_DATA));
  });
});
