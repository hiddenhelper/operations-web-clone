import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import { getInitialState } from '../../../../test/rootState';
import ClientInvite, { IProps } from './ClientInvite';

jest.mock('../../../services/AutocompleteService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('ClientInvite Component', () => {
  let props: IProps;

  beforeEach(() => {
    props = {
      countryList: [],
      loading: undefined,
      clearErrors: jest.fn(),
      fetchCountries: jest.fn(),
      inviteClient: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: 'new', step: '' }));
  });

  it('should render', () => {
    const { getAllByText, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );
    getByText('Client Information');
    expect(getAllByText('Invite Client').length).toBe(2);

    expect(getAllByText('Client Name').length).toBe(2);
    getByText('Legal Information');
    getByText('Client Admin');
  });

  it('should unmount', () => {
    const { unmount } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearErrors).toHaveBeenCalled();
  });

  it('should render errors coming from server', () => {
    props.loading = {
      isLoading: false,
      hasError: true,
      error: {
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'One or more validation errors occurred.',
        status: 400,
        traceId: '|7952db37-4929e25babbabf98.',
        errors: {
          taxpayerIdentificationNumber: [
            "'taxpayerIdentificationNumber' must be 9 characters in length. You entered 6 characters.",
            "'taxpayerIdentificationNumber' is not in the correct format.",
          ],
          name: ['A company with same name already exists.'],
          'users[0].email': ['Email Address is already in use.'],
        },
      },
    };
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );

    getByText(
      "'taxpayerIdentificationNumber' must be 9 characters in length. You entered 6 characters.'taxpayerIdentificationNumber' is not in the correct format."
    );
    getByText('A company with same name already exists.');
    getByText('Email Address is already in use.');
  });

  it('should fetchTradeList on load', () => {
    props.countryList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchCountries).toHaveBeenCalledWith();
  });

  it('should reset form', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('client-name');

    await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });

    await fireEvent.click(wrapper.getByText('Discard Changes'));

    expect(nameInput.value).toBe(''); // initial value
    expect(props.clearErrors).toHaveBeenCalled();
  });

  it('should invite client', async () => {
    const { getByRole, getByTestId, getByText, baseElement } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = getByTestId('client-name');
    const taxpayerInput: any = getByTestId('client-taxpayerIdentificationNumber');
    const userFirstNameInput: any = getByTestId('user-first-name');
    const userLastNameInput: any = getByTestId('user-last-name');
    const userEmailInput: any = getByTestId('user-email');

    await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
    await fireEvent.change(taxpayerInput, { target: { name: 'taxpayerIdentificationNumber', value: 'FOO-750212-3T7' } });

    await fireEvent.change(userFirstNameInput, { target: { name: 'firstName', value: 'some value' } });
    await fireEvent.change(userLastNameInput, { target: { name: 'lastName', value: 'other value' } });
    await fireEvent.change(userEmailInput, { target: { name: 'email', value: 'testemail@mail.com' } });

    await fireEvent.click(getByRole('button', { name: 'Invite Client' }));

    // This should work
    /* expect(props.inviteClient).toHaveBeenCalledWith(
      sanitizeClient(
        {
          name: 'some value',
          taxpayerIdentificationNumber: 'FOO-750212-3T7',
          users: [{ ...getFallbackUser(), firstName: 'some value', lastName: 'other value', email: 'testemail@mail.com' }],
        },
        null
      )
    ); */
    expect(props.inviteClient).toHaveBeenCalledWith({
      id: null,
      name: 'some value',
      taxpayerIdentificationNumber: 'FOO-750212-3T7',
      billingAddress: {
        city: null,
        countryId: null,
        county: null,
        latitude: null,
        line1: null,
        line2: null,
        longitude: null,
        stateCode: null,
        stateName: null,
        zipCode: null,
      },
      hasUniversalBadge: false,
      isDeveloper: false,
      mailingAddress: null,
      mailingAddressMatchesBillingAddress: true,
      mwbeTypeId: null,
      otherTrade: null,
      status: 0,
      trades: [],
      universalBadgePrice: null,
      users: [
        {
          id: undefined,
          firstName: 'some value',
          lastName: 'other value',
          email: 'testemail@mail.com',
          companyId: null,
          invitationType: 0,
          mobilePhoneNumber: null,
          officePhoneExtension: null,
          officePhoneNumber: null,
          preferredContactMethod: 0,
          title: null,
          groupIds: [],
        },
      ],
    });
  });

  it('should show validations when invalid data is submitted', async () => {
    const { getByRole, getByTestId, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );

    const taxpayerInput: any = getByTestId('client-taxpayerIdentificationNumber');

    await fireEvent.change(taxpayerInput, { target: { name: 'taxpayerIdentificationNumber', value: '1234' } });

    await fireEvent.click(getByRole('button', { name: 'Invite Client' }));

    expect(getByText('Please enter Client Name.'));
    expect(getByText('Please enter valid Taxpayer Identification Number.'));
    expect(getByText('Please enter First Name.'));
    expect(getByText('Please enter Email Address.'));

    expect(props.inviteClient).not.toHaveBeenCalled();
  });

  it('should show validations when invalid data is submitted and preferredContactMethod is phone', async () => {
    const { getByRole, getByTestId, getByText, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );

    const taxpayerInput: any = getByTestId('client-taxpayerIdentificationNumber');

    await fireEvent.change(taxpayerInput, { target: { name: 'taxpayerIdentificationNumber', value: '1234' } });

    const contactMethodPhone = getAllByTestId('controlled-radio-button')[1];
    fireEvent.click(contactMethodPhone);

    await fireEvent.click(getByRole('button', { name: 'Invite Client' }));

    expect(getByText('Please enter Mobile Phone Number.'));

    expect(props.inviteClient).not.toHaveBeenCalled();
  });

  it('should show taxpayer id format helper modal', async () => {
    const { getByRole, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientInvite {...props} />
        </MemoryRouter>
      </Provider>
    );

    const moreInfoButton = getByRole('button', { name: 'More info' });

    await fireEvent.click(moreInfoButton);

    await expect(getByText('Taxpayer ID Number formats allowed:'));

    await fireEvent.click(getByText('Close'));
  });
});
