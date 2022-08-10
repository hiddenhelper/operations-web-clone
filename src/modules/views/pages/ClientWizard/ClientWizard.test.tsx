import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import {
  getClient_1,
  getMwbeType_1,
  getTrades_1,
  getUser_1,
  getUser_3,
  getUser_4,
  getUser_5,
  getClient_4,
  getClient_5,
  getAddress_1,
  getClient_6,
  getUser_7,
  getCountry_1,
} from '../../../../test/entities';
import { ResourceModel } from '../../../models';
import { getInitialState } from '../../../../test/rootState';
import ClientWizard, { IWizardProps } from './ClientWizard';

jest.mock('../../../services/AutocompleteService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe.skip('ClientWizard Component', () => {
  global.console.error = () => {
    /** */
  };
  let props: IWizardProps;

  beforeEach(() => {
    props = {
      clientMap: { [getClient_1().id]: getClient_1() },
      mwbeList: getMwbeType_1(),
      tradeList: getTrades_1(),
      loading: undefined,
      sendForApprovalLoading: undefined,
      approveLoading: undefined,
      navigate: jest.fn(),
      fetchClient: jest.fn(),
      saveClient: jest.fn(),
      sendClientForApproval: jest.fn(),
      approveClient: jest.fn(),
      updateClient: jest.fn(),
      fetchMwbe: jest.fn(),
      fetchTradeList: jest.fn(),
      clearErrors: jest.fn(),
      clearClientMap: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: '' }));
  });

  it('should render', () => {
    props.clientMap[getClient_1().id] = getClient_1();
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with fallback', () => {
    props.clientMap = {};
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should unmount', () => {
    props.clientMap = {};
    const { unmount } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearErrors).toHaveBeenCalled();
    expect(props.clearClientMap).toHaveBeenCalled();
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
        },
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetchClient on load', () => {
    props.clientMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchClient).toHaveBeenCalledWith(getClient_1().id);
  });

  it('should fetchTradeList on load', () => {
    props.tradeList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchTradeList).toHaveBeenCalledWith();
  });

  it('should fetchMwbe on load', () => {
    props.clientMap[getClient_1().id] = {
      ...getClient_1(),
      mwbeTypeId: '',
    };
    props.mwbeList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchMwbe).toHaveBeenCalledWith();
  });

  it('should reset form', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('client-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.click(wrapper.getByText('Discard Changes'));
      expect(nameInput.value).toBe('Robert C. Martin'); // initial value
      expect(props.clearErrors).toHaveBeenCalled();
    });
  });

  it('should save form', async () => {
    (useParams as any).mockImplementation(() => ({ id: '', step: '' }));
    props.clientMap[getClient_1().id] = {
      ...getClient_1(),
      mwbeTypeId: '',
      users: [getUser_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('client-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.change(nameInput, { target: { name: 'taxpayerIdentificationNumber', value: 'FOO-750212-3T7' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.saveClient).toHaveBeenCalledWith(
        {
          id: null,
          name: 'some value',
          isDeveloper: false,
          taxpayerIdentificationNumber: 'FOO-750212-3T7',
          mwbeTypeId: '4', // None Id
          trades: [],
          otherTrade: null,
          users: [],
          billingAddress: {
            line1: null,
            line2: null,
            city: null,
            stateCode: null,
            zipCode: null,
            latitude: null,
            county: null,
            longitude: null,
            countryId: null,
            stateName: null,
          },
          mailingAddress: null,
          mailingAddressMatchesBillingAddress: true,
          status: 0,
          hasUniversalBadge: false,
          universalBadgePrice: null,
        },
        {
          fields: [
            { name: 'name', required: true },
            { name: 'isDeveloper', required: false },
            { name: 'taxpayerIdentificationNumber', required: true },
            { name: 'mwbeTypeId', required: true, computePositive: true },
            { name: 'trades', required: true },
            { name: 'otherTrade', required: false },
            { name: 'universalBadgePrice', required: false },
          ],
          hideControls: false,
          key: 'general-information',
          subtitle: 'Create New Client',
          title: 'General Information',
          order: 0,
        }
      );
    });
  });

  it('should show validations when save invalid data', () => {
    props.clientMap = { [getClient_1().id]: { ...getClient_1(), trades: [], otherTrade: null, taxpayerIdentificationNumber: null } };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('client-name');
    const otherTradeCheckbox: any = wrapper.getByTestId('other-trade-check');

    act(() => {
      fireEvent.change(nameInput, { target: { name: 'name', value: '' } });
      fireEvent.click(otherTradeCheckbox);
    });
    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Please enter Client Name.'));
    expect(wrapper.getByText('Please enter a trade.'));
    expect(props.saveClient).not.toHaveBeenCalled();
  });

  // it('should show validations when save invalid users data', () => {
  //   (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'users' }));
  //   props.loading = { isLoading: false, hasError: true, error: {} };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <ClientWizard {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const phoneInput: any = wrapper.getAllByTestId('office-user-phone')[0];
  //   const mobileInput: any = wrapper.getAllByTestId('mobile-user-phone')[0];

  //   act(() => {
  //     fireEvent.change(phoneInput, { target: { name: 'officePhoneNumber', value: '+1 111' } });
  //   });
  //   act(() => {
  //     fireEvent.change(mobileInput, { target: { name: 'mobilePhoneNumber', value: '+1 111' } });
  //   });
  //   act(() => {
  //     fireEvent.click(wrapper.getByText('Save Changes'));
  //   });
  //   expect(wrapper.container).toMatchSnapshot();
  //   expect(wrapper.getAllByText('The same Email Address cannot be used in different users.')[0]);
  //   expect(props.saveClient).not.toHaveBeenCalled();
  // });

  it('should show validations when save invalid address', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_4().id, step: 'addresses' }));
    let wrapper;
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ClientWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    const zipCode: any = wrapper.getByTestId('zip-code');

    act(() => {
      fireEvent.change(zipCode, { target: { name: 'zipCode', value: '12' } });
    });
    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    expect(wrapper.container).toMatchSnapshot();
    // expect(wrapper.getByText('Zip Code format is invalid.'));
    expect(props.saveClient).not.toHaveBeenCalled();
  });

  it('should update form', async () => {
    props.clientMap[getClient_1().id] = {
      ...getClient_1(),
      mwbeTypeId: '1',
      taxpayerIdentificationNumber: '',
      users: [{ ...getUser_3(), email: null }],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('client-name');
    const otherTradeCheckbox: any = wrapper.getByTestId('other-trade-check');

    const isDeveloperCheckbox: any = wrapper.getByTestId('developer-checkbox');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.click(isDeveloperCheckbox);
      await fireEvent.click(otherTradeCheckbox);
      await fireEvent.click(wrapper.getAllByTestId('controlled-radio-button')[0]);

      const otherTradeInput: any = wrapper.getByTestId('client-other-trade');

      await fireEvent.change(otherTradeInput, { target: { name: 'otherTrade', value: 'some trade' } });
      await fireEvent.click(otherTradeCheckbox);
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateClient).toHaveBeenCalledWith({
        ...getClient_1(),
        name: 'some value',
        isDeveloper: true,
        taxpayerIdentificationNumber: null,
        mwbeTypeId: '1',
        trades: ['1', '2'],
        users: [{ ...getUser_3(), email: null, officePhoneExtension: null }],
        hasUniversalBadge: false,
      });
    });
  });

  // it('should send client for approval', async () => {
  //   (useParams as any).mockImplementation(() => ({ id: getClient_5().id, step: '' }));
  //   props.clientMap[getClient_5().id] = {
  //     ...getClient_5(),
  //   };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <ClientWizard {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   await act(async () => {
  //     await fireEvent.click(wrapper.getByText('Send for Approval'));
  //   });
  //   expect(props.sendClientForApproval).toHaveBeenCalledWith(getClient_5().id);
  // });

  // it('should approve client', async () => {
  //   (useParams as any).mockImplementation(() => ({ id: getClient_5().id, step: '' }));
  //   props.clientMap[getClient_5().id] = {
  //     ...getClient_5(),
  //     status: ResourceModel.CompanyStatus.PENDING_APPROVAL,
  //   };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <ClientWizard {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   await act(async () => {
  //     await fireEvent.click(wrapper.getByText('Approve Client'));
  //   });
  //   expect(props.approveClient).toHaveBeenCalledWith(getClient_5().id);
  // });

  // it('should not send client for approval when no admin user present', async () => {
  //   (useParams as any).mockImplementation(() => ({ id: getClient_5().id, step: '' }));
  //   props.clientMap[getClient_5().id] = {
  //     ...getClient_5(),
  //     users: [getUser_7()],
  //   };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <ClientWizard {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   await act(async () => {
  //     await fireEvent.click(wrapper.getByText('Send for Approval'));
  //   });
  //   expect(props.sendClientForApproval).not.toHaveBeenCalled();
  // });

  it('should send developer client for approval', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_6().id, step: '' }));
    props.clientMap[getClient_6().id] = {
      ...getClient_6(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Send for Approval'));
    });
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('1/1'));
    expect(props.sendClientForApproval).toHaveBeenCalled();
  });

  // it('should update form with users', async () => {
  //   (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'users' }));
  //   props.clientMap[getClient_1().id] = {
  //     ...getClient_1(),
  //     billingAddress: getAddress_1(),
  //     mwbeTypeId: '1',
  //     users: [getUser_4(), getUser_5()],
  //   };
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <ClientWizard {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const nameInput: any = wrapper.getAllByTestId('user-first-name')[0];
  //   const mobileNumber: any = wrapper.getAllByTestId('mobile-user-phone')[0];
  //   const mobileNumberTwo: any = wrapper.getAllByTestId('mobile-user-phone')[1];

  //   await act(async () => {
  //     await fireEvent.change(nameInput, { target: { name: 'firstName', value: 'some value' } });
  //     await fireEvent.change(mobileNumber, { target: { name: 'mobilePhoneNumber', value: null } });
  //     await fireEvent.change(mobileNumberTwo, { target: { name: 'mobilePhoneNumber', value: null } });
  //     await fireEvent.click(wrapper.getByText('Save Changes'));
  //     expect(props.updateClient).toHaveBeenCalledWith({
  //       ...getClient_1(),
  //       billingAddress: {
  //         line1: '21 Street',
  //         line2: 'Apt 3',
  //         city: 'Dallas',
  //         stateCode: 'TX',
  //         zipCode: '12345',
  //         latitude: 1234,
  //         longitude: 5678,
  //         countryId: getCountry_1().id,
  //         stateName: null,
  //       },
  //       taxpayerIdentificationNumber: 'LOZG-780211-7B9',
  //       mwbeTypeId: '1',
  //       trades: ['1', '2'],
  //       users: [
  //         {
  //           ...getUser_4(),
  //           firstName: 'some value',
  //           mobilePhoneNumber: null,
  //           officePhoneExtension: null,
  //           officePhoneNumber: null,
  //         },
  //         {
  //           ...getUser_5(),
  //           mobilePhoneNumber: null,
  //           officePhoneExtension: null,
  //           officePhoneNumber: null,
  //         },
  //       ],
  //     });
  //   });
  // });

  it('should render dialog when moves step without saving changes', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('client-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.click(wrapper.getAllByTestId('step-button')[1]);
    });
    expect(wrapper.getByText('Unsaved changes')).toBeTruthy();
  });

  it('should render dialog when moves away from client flow', async () => {
    props.loading = {
      isLoading: false,
      hasError: false,
      error: null,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Link to="/clients" data-testid="link-to-another" />
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('client-name');

    act(() => {
      fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('link-to-another'));
    });

    expect(wrapper.getByTestId('modal-dialog').classList).toContain('open');

    act(() => {
      fireEvent.click(wrapper.getByTestId('confirm-button'));
    });

    expect(wrapper.getByTestId('modal-dialog').classList).toContain('closed');
  });

  it('should render addresses form', async () => {
    let wrapper;
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'addresses' }));
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ClientWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Billing Address'));
  });

  it('should render addresses form with default values', async () => {
    let wrapper;
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'addresses' }));
    props.clientMap[getClient_1().id] = {
      ...getClient_1(),
      billingAddress: null,
      mailingAddress: null,
      mailingAddressMatchesBillingAddress: false,
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ClientWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Mailing Address'));
  });

  // it('should render users form', () => {
  //   (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'users' }));
  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <ClientWizard {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   expect(wrapper.container).toMatchSnapshot();
  //   expect(wrapper.getByText('Add Users')).toBeTruthy();
  // });

  it('should change state', async () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'addresses' }));
    let wrapper;
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ClientWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    const stateInput = wrapper.getByTestId('addr-state');

    act(() => {
      fireEvent.change(stateInput, { target: { name: 'state', value: 'MI' } });
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change line 1', async () => {
    let wrapper;
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'addresses' }));
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ClientWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    const line1Input = wrapper.getByTestId('addr-line1');
    const line2Input = wrapper.getByTestId('addr-line2');
    const cityInput = wrapper.getByTestId('addr-city');
    const sameAddrCheck = wrapper.getByTestId('addr-same');

    act(() => {
      fireEvent.click(sameAddrCheck);
    });
    line1Input.focus();
    act(() => {
      fireEvent.change(line1Input, { target: { name: 'line1', value: '123' } });
    });
    line2Input.focus();
    act(() => {
      fireEvent.change(line2Input, { target: { name: 'line1', value: '123' } });
    });
    act(() => {
      fireEvent.change(cityInput, { target: { name: 'city', value: 'Test' } });
    });
    act(() => {
      fireEvent.click(sameAddrCheck);
    });
    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  // it('should render previous user', () => {
  //   (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'users' }));
  //   props.clientMap[getClient_1().id] = {
  //     ...getClient_1(),
  //     users: [getUser_1()],
  //   };

  //   const wrapper = render(
  //     <Provider store={createMockStore(getInitialState()) as any}>
  //       <MemoryRouter>
  //         <ClientWizard {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   expect(wrapper.container).toMatchSnapshot();
  // });

  it('should render review', () => {
    (useParams as any).mockImplementation(() => ({ id: getClient_1().id, step: 'review' }));
    const { container, getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ClientWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(getByText('Review')).toBeTruthy();
  });
});
