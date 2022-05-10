import { mapDispatchToProps } from './ButtonPrinterContainer';

import { generalState } from '../../../state-mgmt/general';

describe('ButtonPrinterContainer', () => {
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      destroyPrinter: expect.any(Function),
    });
  });

  it('should dispatch destroyPrinter action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.destroyPrinter();
    expect(dispatch).toBeCalledWith(generalState.actions.destroyPrinter());
  });
});
