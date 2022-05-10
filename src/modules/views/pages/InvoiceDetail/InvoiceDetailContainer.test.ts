import { push } from 'connected-react-router';
import { mapDispatchToProps, mapStateToProps } from './InvoiceDetailContainer';
import { getInitialState } from '../../../../test/rootState';

describe('InvoiceDetailContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({});
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      navigate: expect.any(Function),
    });
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });
});
