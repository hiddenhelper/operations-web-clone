import { push } from 'connected-react-router';
import { getInitialState } from '../../../../../../../../test/rootState';
import { clientState } from '../../../../../../../state-mgmt/client';
import { mapStateToProps, mapDispatchToProps } from './HirearchyViewContainer';

describe('HirearchyViewContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      hirearchyMap: getInitialState().client.clientProjectHirearchyMap,
      loading: undefined,
      assignClientLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProjectClientHirearchyList: expect.any(Function),
      clearClientMap: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectClientHirearchyList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectClientHirearchyList('id');
    expect(dispatch).toBeCalledWith(clientState.actions.fetchProjectClientHirearchyListStart('id'));
  });

  it('should dispatch clearClientMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientMap();
    expect(dispatch).toBeCalledWith(clientState.actions.clearClientMap());
  });
});
