import { getInitialState } from 'test/rootState';
import { clientState } from 'modules/state-mgmt/client';
import { generalState } from 'modules/state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './ClientInviteContainer';

import { GENERAL } from 'constants/index';

describe('ClientWizardContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      countryList: [],
      loading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      clearErrors: expect.any(Function),
      fetchCountries: expect.any(Function),
      inviteClient: expect.any(Function),
    });
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.INVITE_DRAFT_CLIENT));
  });

  it('should dispatch fetchCountries start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchCountries();
    expect(dispatch).toBeCalledWith(generalState.actions.fetchCountryListStart());
  });

  it('should dispatch inviteClient start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const client = { name: 'client name', taxpayerIdentificationNumber: '99-9999999' } as any;
    props.inviteClient(client);
    expect(dispatch).toBeCalledWith(clientState.actions.inviteDraftClientStart(client));
  });
});
