import { mapStateToProps } from './PaymentSettingsContainer';

import { getInitialState } from '../../../../test/rootState';

describe('SettingsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
    });
  });
});
