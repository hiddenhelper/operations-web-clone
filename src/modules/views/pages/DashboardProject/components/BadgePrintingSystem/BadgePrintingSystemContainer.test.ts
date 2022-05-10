import { mapDispatchToProps, mapStateToProps } from './BadgePrintingSystemContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('BadgePrintingSystemContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      bpsWidget: getInitialState().statistics.bpsProjectStatistics,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchBpsWidget: expect.any(Function),
    });
  });

  it('should dispatch fetchBpsWidget start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBpsWidget({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchProjectBpsStart({}));
  });
});
