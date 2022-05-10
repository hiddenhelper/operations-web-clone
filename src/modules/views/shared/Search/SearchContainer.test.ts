import { mapStateToProps, mapDispatchToProps } from './SearchContainer';
import { getInitialState } from 'test/rootState';
import { generalState } from 'modules/state-mgmt/general';

describe('WorkersTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      loading: undefined,
      loadingMore: undefined,
      searchResults: undefined,
      userRole: getInitialState().auth.role,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      clearSearch: expect.any(Function),
      triggerSearch: expect.any(Function),
      triggerSearchMore: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkerList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearSearch();
    expect(dispatch).toBeCalledWith(generalState.actions.clearSearch());
  });

  it('should dispatch triggerSearch start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.triggerSearch({ nameContains: 'search', searchType: 1 });
    expect(dispatch).toBeCalledWith(generalState.actions.fetchSearchStart({ nameContains: 'search', searchType: 1 }));
  });

  it('should dispatch triggerSearchMore start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.triggerSearchMore({ nameContains: 'search', searchType: 1, pageNumber: 2 });
    expect(dispatch).toBeCalledWith(generalState.actions.fetchSearchMoreStart({ nameContains: 'search', searchType: 1, pageNumber: 2 }));
  });
});
