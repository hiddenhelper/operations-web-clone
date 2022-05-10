import { mapStateToProps } from './ToastListContainer';
import { getInitialState } from '../../../../test/rootState';

describe('ToastListContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      list: [],
    });
  });
});
