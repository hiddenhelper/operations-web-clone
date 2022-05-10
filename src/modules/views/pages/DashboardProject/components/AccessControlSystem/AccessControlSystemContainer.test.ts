import { mapDispatchToProps, mapStateToProps } from './AccessControlSystemContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('AccessControlSystemContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      acsWidget: getInitialState().statistics.acsProjectStatistics,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchAcsWidget: expect.any(Function),
    });
  });

  it('should dispatch fetchAcsWidget start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchAcsWidget({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchProjectAcsStart({}));
  });
});
