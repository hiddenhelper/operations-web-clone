import { mapDispatchToProps, mapStateToProps } from './CertificationsByWorkersContainer';
import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

describe('CertificationsByWorkersContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      topTenStatisticsMap: getInitialState().statistics.topTenStatisticsMap,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchWorkersCertifications: expect.any(Function),
    });
  });

  it('should dispatch fetchWorkersCertifications start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkersCertifications('key', {});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchWorkersCertificationsStart('key', {}));
  });
});
