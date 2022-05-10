import { mapDispatchToProps, mapStateToProps } from './WorkersByDemographicDataContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('WorkersByDemographicDataContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      pieStatisticsMap: getInitialState().statistics.pieStatisticsMap,
      topTenStatisticsMap: getInitialState().statistics.topTenStatisticsMap,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkersByDemographicData: expect.any(Function),
      fetchWorkersByEthnicity: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersByDemographicData start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByDemographicData('key', {}, 0);
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByDemographicDataStart('key', {}, 0));
  });

  it('should dispatch fetchWorkersByEthnicity start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersByEthnicity('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersByEthnicityStart('key', {}));
  });
});
