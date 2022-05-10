import { mapDispatchToProps } from './DashboardWorkerContainer';
import { statisticsState } from '../../../state-mgmt/statistics';

describe('DashboardWorkerContainer', () => {
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      clearStatistics: expect.any(Function),
    });
  });

  it('should dispatch clearStatistics start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearStatistics());
  });
});
