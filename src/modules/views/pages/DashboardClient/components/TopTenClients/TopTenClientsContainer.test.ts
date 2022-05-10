import { push } from 'connected-react-router';

import { getInitialState } from '../../../../../../test/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';
import { mapDispatchToProps, mapStateToProps } from './TopTenClientsContainer';

describe('TopTenClientsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      clientTopTenWidget: getInitialState().statistics.clientTopTenStatistics,
      loading: undefined,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchClientTopTen: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch fetchClientTopTen start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchClientTopTen({});
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchClientTopTenStart({}));
  });

  it('should dispatch navigate start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/');
    expect(dispatch).toBeCalledWith(push('/'));
  });
});
