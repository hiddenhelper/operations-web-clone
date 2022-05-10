import { getBadge_1, getVisitorProject_1 } from '../../../../../../../../test/entities';
import { getInitialState } from '../../../../../../../../test/rootState';
import { badgeState } from '../../../../../../../state-mgmt/badge';
import { clientState } from '../../../../../../../state-mgmt/client';

import { mapStateToProps, mapDispatchToProps } from './AssignVisitorBadgeModalContainer';

describe('AssignVisitorBadgeModalContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      entityList: getInitialState().project.badgeVisitorEntityList,
      uiRelationMap: getInitialState().general.uiRelationMap,
      clientListLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      searchCompanies: expect.any(Function),
      assignBadgeVisitor: expect.any(Function),
    });
  });

  it('should dispatch searchCompanies start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.searchCompanies({} as any, 'tempid');
    expect(dispatch).toBeCalledWith(clientState.actions.searchClientStart({} as any, 'tempid'));
  });

  it('should dispatch assignBadgeVisitor start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.assignBadgeVisitor(getBadge_1().id, getVisitorProject_1());
    expect(dispatch).toBeCalledWith(badgeState.actions.assignProjectBadgeVisitorStart(getBadge_1().id, getVisitorProject_1()));
  });
});
