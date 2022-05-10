import { clientState } from '../../../../../state-mgmt/client';
import { mapDispatchToProps } from './AssignSubContractorTabContainer';

describe('AssignSubContractorTabContainer', () => {
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      clearClientMap: expect.any(Function),
    });
  });

  it('should dispatch clearClientMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearClientMap();
    expect(dispatch).toBeCalledWith(clientState.actions.clearClientMap());
  });
});
