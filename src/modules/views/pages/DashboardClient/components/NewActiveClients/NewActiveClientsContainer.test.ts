import { mapDispatchToProps, mapStateToProps } from './NewActiveClientsContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('NewActiveClientsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      locationWidget: getInitialState().statistics.locationStatistics,
      loading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchActiveClients: expect.any(Function),
    });
  });

  it('should dispatch fetchActiveClients start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchActiveClients({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchActiveClientsStart({}));
  });
});
