import { generalState } from '../../../state-mgmt/general';
import { mapDispatchToProps } from './WizardContainer';
import { push } from 'connected-react-router';

describe('WizardContainer', () => {
  let dispatch;
  let props;

  beforeEach(() => {
    dispatch = jest.fn();
    props = mapDispatchToProps(dispatch);
  });

  it('should mapDispatchToProps', () => {
    expect(props).toEqual({
      navigate: expect.any(Function),
      clearLoadingMap: expect.any(Function),
    });
  });

  it('should dispatch push action', () => {
    const path = 'path';
    props.navigate(path);
    expect(dispatch).toBeCalledWith(push(path));
  });

  it('should clearLoadingMap action', () => {
    props.clearLoadingMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearLoadingMap());
  });
});
