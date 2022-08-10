import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { render, act, fireEvent, RenderResult } from '@testing-library/react';

import RequiredInformation, { IRequiredInformationProps } from './RequiredInformation';
import { getClient_1, getProjectCompany_1, getWorker_1, getWorker_2 } from '../../../../../test/entities';

import { getAdminInitialState } from '../../../../../test/rootState';
import { UserModel, WorkerModel } from '../../../../models';

jest.useFakeTimers();

describe('Required Information', () => {
  let wrapper: RenderResult;
  let props: IRequiredInformationProps;

  beforeEach(() => {
    props = {
      isFcaUser: true,
      isAdmin: true,
      model: getWorker_1(),
      company: getClient_1(),
      errors: {},
      uiRelationMap: {
        'worker-company': {
          searchResult: [getProjectCompany_1()],
        },
      },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      formRules: {},
      isEdit: false,
      emailHasChanges: false,
      onChange: jest.fn(),
      searchCompanies: jest.fn(),
      onChangeHandler: jest.fn(),
      fetchCompany: jest.fn(),
      updateRules: jest.fn(),
    };
  });

  it('should fetchCompany', () => {
    props.isFcaUser = false;
    props.company = null;
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchCompany).toHaveBeenCalled();
  });

  it('should not edit an email', async () => {
    const worker = getWorker_2();
    props.model = { ...worker, company: { id: null, name: 'company name' } };
    props.company = null;
    props.isEdit = true;
    props.emailHasChanges = true;
    const wrapperComponent = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const emailField = await wrapperComponent.getByTestId('worker-email');
    const workerEmail = worker.email;
    act(() => {
      fireEvent.change(emailField, { target: { value: 'another@email.com' } });
    });

    expect(await emailField.value).toBe(workerEmail);
  });

  it('should show error on middlename if empty', async () => {
    props.errors = { middleName: 'is required' };
    const wrapperComponent = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const field = await wrapperComponent.getByTestId('worker-middleName');
    act(() => {
      fireEvent.change(field, { target: { value: '' } });
    });

    expect(wrapperComponent.getByText('Middle Name is required.'));
  });

  it('should show error on alternate phone if empty', async () => {
    props.errors = { phoneNumber: 'is invalid phone number' };
    const wrapperComponent = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const field = await wrapperComponent.getByTestId('worker-phone');
    act(() => {
      fireEvent.change(field, { target: { value: '' } });
    });

    expect(wrapperComponent.getByText('Please enter a valid Alternate Phone.'));
  });

  it('should show error on mobile phone number if empty', async () => {
    props.model.inviteMethod = null;
    props.errors = { mobilePhoneNumber: 'Please enter a valid Mobile Phone Number.' };
    const wrapperComponent = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const selectInput = wrapperComponent.container.querySelector('[data-testid="controlled-radio-button"][value="2"]');

    act(() => {
      fireEvent.click(selectInput);
    });

    const field = await wrapperComponent.getByTestId('mobile-worker-phone');
    act(() => {
      fireEvent.change(field, { target: { value: '' } });
    });

    expect(wrapperComponent.getByText('Please enter a valid Mobile Phone Number.'));
  });

  it('should show error on email if empty', async () => {
    props.errors = { email: 'is required' };
    props.formRules.email = { required: true };
    const wrapperComponent = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const selectInput = wrapperComponent.container.querySelector('[data-testid="controlled-radio-button"][value="1"]');

    act(() => {
      fireEvent.click(selectInput);
    });

    const field = await wrapperComponent.getByTestId('worker-email');
    act(() => {
      fireEvent.change(field, { target: { value: '' } });
    });

    expect(wrapperComponent.getByText('Email is required.'));
  });

  it('should show error on email and mobile phone number if they are empty', async () => {
    props.model.inviteMethod = WorkerModel.InviteMethod.BOTH;
    props.errors = { email: 'is required', mobilePhoneNumber: 'Please enter a valid Mobile Phone Number.' };
    props.formRules.email = { required: true };
    props.formRules.mobilePhoneNumber = { required: true };
    const wrapperComponent = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const emailField = await wrapperComponent.getByTestId('worker-email');
    act(() => {
      fireEvent.change(emailField, { target: { value: '' } });
    });

    const phoneField = await wrapperComponent.getByTestId('mobile-worker-phone');
    act(() => {
      fireEvent.change(phoneField, { target: { value: '' } });
    });

    expect(wrapperComponent.getByText('Please enter a valid Mobile Phone Number.'));
    expect(wrapperComponent.getByText('Email is required.'));

    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('should show error on both condition', async () => {
    const wrapperComponent = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const selectInput = wrapperComponent.container.querySelector('[data-testid="controlled-radio-button"][value="3"]');

    act(() => {
      fireEvent.click(selectInput);
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should change badge type', () => {
    props.model.company = { id: '1', name: 'Company 1', hasUniversalBadge: true };
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );
  });

  // it('should select item', () => {
  //   wrapper = render(
  //     <Provider store={createMockStore(getAdminInitialState())}>
  //       <MemoryRouter>
  //         <RequiredInformation {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

  //   act(() => {
  //     fireEvent.change(input, { target: { value: 'comp' } });
  //   });

  //   act(() => {
  //     fireEvent.mouseDown(input);
  //   });

  //   act(() => {
  //     jest.runOnlyPendingTimers();
  //   });

  //   act(() => {
  //     fireEvent.click(wrapper.getAllByRole('option')[0]);
  //   });

  //   expect(props.onChange).toHaveBeenCalled();
  // });

  // it('should reset', () => {
  //   props.model = { ...getWorker_1(), company: { id: null, name: 'company name' } };
  //   wrapper = render(
  //     <Provider store={createMockStore(getAdminInitialState())}>
  //       <MemoryRouter>
  //         <RequiredInformation {...props} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

  //   act(() => {
  //     fireEvent.change(input, { target: { value: 'test' } });
  //   });

  //   act(() => {
  //     fireEvent.mouseDown(input);
  //   });

  //   act(() => {
  //     fireEvent.blur(input);
  //   });

  //   expect(props.onChange).toHaveBeenCalled();
  // });

  it('should allow edit email for migrated workers', () => {
    props.model = { ...getWorker_1(), email: null, invitationStatus: WorkerModel.WorkerStatus.MIGRATED };
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <RequiredInformation {...props} />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = wrapper.getByTestId('worker-email');

    expect(emailInput.disabled).toBe(false);
  });
});
