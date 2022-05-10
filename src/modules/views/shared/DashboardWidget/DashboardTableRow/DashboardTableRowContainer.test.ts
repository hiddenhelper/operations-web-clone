import { mapDispatchToProps } from './DashboardTableRowContainer';
import { push } from 'connected-react-router';

describe('DashboardTableRowContainer', () => {
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      navigate: expect.any(Function),
    });
  });

  it('should dispatch navigate start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/');
    expect(dispatch).toBeCalledWith(push('/'));
  });
});
