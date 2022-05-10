import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import {
  getClient_1,
  getEthnicity_1,
  getExistingWorkerResponse,
  getIdentificationType_1,
  getPrimaryLanguage_1,
  getPrimaryLanguage_other,
  getProjectCompany_1,
  getSkilledTrade_1,
  getSkilledTrade_Other,
  getWorker_1,
  getCountry_1,
  getCountry_2,
  getGeographicLocation_1,
} from '../../../../test/entities';
import WorkerWizard, { IWorkerWizardProps } from './WorkerWizard';
import { createMockStore } from 'redux-test-utils';
import { getAdminInitialState, getClientAdminInitialState, getRegularUserInitialState } from '../../../../test/rootState';
import { Provider } from 'react-redux';
import { UserModel } from '../../../models';

jest.useFakeTimers();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('WorkerWizard', () => {
  let wrapper;
  let props: IWorkerWizardProps;
  const stateWithCountryList = {
    ...getAdminInitialState(),
    general: {
      ...getAdminInitialState().general,
      countryList: [getCountry_1(), getCountry_2()],
    },
  };
  const WorkerWizardComponent = currentProps => (
    <Provider store={createMockStore(stateWithCountryList)}>
      <MemoryRouter>
        <WorkerWizard {...currentProps} />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      workersMap: { [getWorker_1().id]: { ...getWorker_1(), company: null } },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      saveLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      searchLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      ethnicityList: [getEthnicity_1()],
      languageList: [getPrimaryLanguage_1(), getPrimaryLanguage_other()],
      skilledTradeList: [getSkilledTrade_1(), getSkilledTrade_Other()],
      identificationTypeList: [getIdentificationType_1()],
      geographicLocationsList: [getGeographicLocation_1()],
      uiRelationMap: {},
      company: null,
      currentUserRole: UserModel.Role.FCA_ADMIN,
      countryList: [{ id: 'dda6b99c-e294-40f1-ba1b-2058b5e24082', name: 'United States', code: 'US' }],
      saveWorker: jest.fn(),
      updateWorker: jest.fn(),
      fetchWorker: jest.fn(),
      fetchEthnicityList: jest.fn(),
      fetchLanguageList: jest.fn(),
      fetchSkilledTradeList: jest.fn(),
      fetchIdentificationTypeList: jest.fn(),
      fetchGeographicLocationsList: jest.fn(),
      searchCompanies: jest.fn(),
      clearErrors: jest.fn(),
      clearWorkersMap: jest.fn(),
      navigate: jest.fn(),
      fetchCompany: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id }));
  });

  it('should render', async () => {
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render client worker', async () => {
    props.company = getClient_1();
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render fallback', async () => {
    props.workersMap = {};
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should unmount', async () => {
    props.workersMap = {};
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    wrapper.unmount();
    expect(props.clearErrors).toHaveBeenCalled();
    expect(props.clearWorkersMap).toHaveBeenCalled();
  });

  it('should fetchWorker', async () => {
    props.workersMap = {};
    await act(async () => {
      await render(<WorkerWizardComponent {...props} />);
    });
    expect(props.fetchWorker).toHaveBeenCalledWith(getWorker_1().id);
  });

  it('should reset form', async () => {
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    const firstNameInput: any = wrapper.getByTestId('worker-firstName');

    await act(async () => {
      await fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'some name' } });
      await fireEvent.click(wrapper.getByText('Discard Changes'));
      expect(firstNameInput.value).toBe('John');
      expect(props.clearErrors).toHaveBeenCalled();
    });
  });

  it('should save worker', async () => {
    props.uiRelationMap = { 'worker-company': { searchResult: [{ ...getProjectCompany_1(), hasUniversalBadge: true }] } };
    (useParams as any).mockImplementation(() => ({ id: '' }));
    props.workersMap = {};
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    const input = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'comp' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    const firstNameInput: any = wrapper.getByTestId('worker-firstName');
    const middleNameInput: any = wrapper.getByTestId('worker-middleName');
    const lastNameInput: any = wrapper.getByTestId('worker-lastName');
    const mobilePhoneNumberInput: any = wrapper.getByTestId('mobile-worker-phone');
    const laborUnionNumber: any = wrapper.getByTestId('worker-laborUnionNumber');
    const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');

    const inputSelect: any = wrapper.getAllByText('Select Option');

    const select = wrapper.getByTestId('worker-isAffiliatedToLaborUnion');
    await act(async () => {
      await fireEvent.change(select, { target: { value: 1 } });
    });

    const isVeteranSelect = wrapper.getByTestId('worker-isVeteran');
    await act(async () => {
      await fireEvent.mouseDown(isVeteranSelect.querySelector('.MuiSelect-root'));
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Yes'));
    });

    await act(async () => {
      fireEvent.click(wrapper.getByText('Other'));
      await fireEvent.mouseDown(inputSelect[5]);
    });

    await act(async () => {
      await fireEvent.change(dateInputs[0].querySelector('input'), { target: { name: 'dateOfBirth', value: 'Tue, Aug 11, 2020' } });
    });

    await fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'some name' } });
    await fireEvent.change(middleNameInput, { target: { name: 'middleName', value: 'middle name' } });
    await fireEvent.change(lastNameInput, { target: { value: 'some other name' } });
    await fireEvent.change(mobilePhoneNumberInput, { target: { name: 'mobilePhoneNumber', value: '16122222222' } });
    await fireEvent.change(laborUnionNumber, { target: { name: 'laborUnionNumber', value: '12345678' } });

    await act(async () => {
      await fireEvent.click(wrapper.getByText('Create Worker'));
    });

    expect(wrapper).toMatchSnapshot();
    // expect(props.saveWorker).toHaveBeenCalledWith({
    //   id: null,
    //   company: { ...getProjectCompany_1(), hasUniversalBadge: true },
    //   companyId: getProjectCompany_1().id,
    //   firstName: 'some name',
    //   lastName: 'some other name',
    //   middleName: 'middle name',
    //   mobilePhoneNumber: '+16122222222',
    //   email: null,
    //   dateOfBirth: expect.any(Object),
    //   gender: null,
    //   allergies: null,
    //   ethnicity: null,
    //   ethnicityId: null,
    //   socialSecurityNumber: null,
    //   primaryLanguage: null,
    //   primaryLanguageId: null,
    //   otherPrimaryLanguage: null,
    //   phoneNumber: null,
    //   identificationType: null,
    //   identificationTypeId: null,
    //   identificationNumber: null,
    //   identificationGeographicLocation: null,
    //   identificationGeographicLocationId: null,
    //   isVeteran: true,
    //   isSupervisor: null,
    //   laborUnionNumber: '12345678',
    //   otherTrade: null,
    //   address: null,
    //   isSkilled: null,
    //   emergencyContactName: null,
    //   emergencyContactPhone: null,
    //   emergencyContactRelationship: null,
    //   trades: [],
    //   tradesIds: [],
    //   invitationStatus: 0,
    //   isAffiliatedToLaborUnion: null,
    //   inviteMethod: 2,
    // });
  });

  it('should update worker', async () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id }));
    props.workersMap = {
      [getWorker_1().id]: { ...getWorker_1(), company: getProjectCompany_1(), trades: [getSkilledTrade_1(), getSkilledTrade_Other()] },
    };
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    await fireEvent.change(wrapper.getByTestId('worker-other-trade'), { target: { name: 'otherTrade', value: 'Other trade' } });

    const firstNameInput: any = wrapper.getByTestId('worker-firstName');

    await act(async () => {
      await fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'some name' } });

      await fireEvent.click(wrapper.getByTestId('save-changes-btn'));
      // expect(props.updateWorker).toHaveBeenCalledWith({
      //   ...getWorker_1(),
      //   company: getProjectCompany_1(),
      //   companyId: getProjectCompany_1().id,
      //   firstName: 'some name',
      //   phoneNumber: null,
      //   mobilePhoneNumber: '+16122222222',
      //   emergencyContactPhone: null,
      //   trades: [getSkilledTrade_1().id, getSkilledTrade_Other().id],
      //   tradesIds: [getSkilledTrade_1().id, getSkilledTrade_Other().id],
      //   otherTrade: 'Other trade',
      //   address: {
      //     ...getWorker_1().address,
      //     borough: null,
      //   },
      // });
    });
  });

  it('should update worker by changing ID type dropdown', async () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id }));
    props.workersMap = {
      [getWorker_1().id]: { ...getWorker_1(), company: getProjectCompany_1() },
    };
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    const firstNameInput: any = wrapper.getByTestId('worker-firstName');
    await act(async () => {
      await fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'some name' } });

      const identificationTypeIdSelect = wrapper.getByTestId('worker-identificationTypeId');
      await act(async () => {
        await fireEvent.mouseDown(identificationTypeIdSelect.querySelector('.MuiSelect-root'));
        await fireEvent.click(wrapper.getAllByText('Driver License')[0]);
      });

      await fireEvent.click(wrapper.getByTestId('save-changes-btn'));
      // expect(props.updateWorker).toHaveBeenCalledWith({
      //   ...getWorker_1(),
      //   company: getProjectCompany_1(),
      //   companyId: getProjectCompany_1().id,
      //   firstName: 'some name',
      //   trades: [getSkilledTrade_1().id],
      //   phoneNumber: null,
      //   mobilePhoneNumber: '+16122222222',
      //   otherTrade: 'Plumbing',
      //   emergencyContactPhone: null,
      //   address: {
      //     ...getWorker_1().address,
      //     borough: null,
      //   },
      //   identificationGeographicLocationId: 'd43dbc1e-adab-4262-940f-281cce6daa8c',
      //   identificationTypeId: '4a49860b-5035-429c-892d-551c514a73a9',
      // });
    });
  });

  it('should render loading server errors', async () => {
    props.loading.error = {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|7952db37-4929e25babbabf98.',
      errors: {
        firstName: ['first name is invalid.'],
      },
    };
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render server errors on save', async () => {
    props.saveLoading.error = {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|7952db37-4929e25babbabf98.',
      errors: {
        email: ['email is already in use.'],
      },
    };
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    expect(wrapper.getByText('email is already in use.'));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show validations', async () => {
    (useParams as any).mockImplementation(() => ({ id: '' }));
    props.workersMap = {};
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    const firstNameInput: any = wrapper.getByTestId('worker-firstName');
    const lastNameInput: any = wrapper.getByTestId('worker-lastName');
    const emailInput: any = wrapper.getByTestId('worker-email');
    const mobilePhoneInput: any = wrapper.getByTestId('mobile-worker-phone');
    const phoneInput: any = wrapper.getByTestId('worker-phone');
    const emergencyPhoneInput: any = wrapper.getByTestId('worker-emergencyContactPhone');

    await fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'some name' } });
    await fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'some other name' } });
    await fireEvent.change(emailInput, { target: { name: 'email', value: 'email.com' } });
    await fireEvent.change(mobilePhoneInput, { target: { name: 'mobilePhoneNumber', value: '123' } });
    await fireEvent.change(phoneInput, { target: { name: 'phoneNumber', value: '123' } });
    await fireEvent.change(emergencyPhoneInput, { target: { name: 'emergencyContactPhone', value: '123' } });

    await act(async () => {
      await fireEvent.click(wrapper.getByText('Create Worker'));
    });

    expect(props.saveWorker).not.toHaveBeenCalled();
    expect(wrapper.getByText('Please enter a valid Email.'));
  });

  it('should validate required fields', async () => {
    (useParams as any).mockImplementation(() => ({ id: '' }));
    props.workersMap = {};
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    const firstNameInput: any = wrapper.getByTestId('worker-firstName');
    const lastNameInput: any = wrapper.getByTestId('worker-lastName');
    const mobilePhoneNumberInput: any = wrapper.getByTestId('mobile-worker-phone');

    await fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'some' } });
    await fireEvent.change(firstNameInput, { target: { name: 'firstName', value: '' } });
    await fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'last' } });
    await fireEvent.change(lastNameInput, { target: { name: 'lastName', value: '' } });
    await fireEvent.change(mobilePhoneNumberInput, { target: { name: 'mobilePhoneNumber', value: '+16122222222' } });
    await fireEvent.change(mobilePhoneNumberInput, { target: { name: 'mobilePhoneNumber', value: '' } });

    await act(async () => {
      await fireEvent.click(wrapper.getByText('Create Worker'));
    });
    expect(props.saveWorker).not.toHaveBeenCalled();
    expect(wrapper.getByText('First Name is required.'));
    expect(wrapper.getByText('Last Name is required.'));
    expect(wrapper.getByText('Mobile Phone Number is required.'));
  });

  it('should validate "otherPrimaryLanguage" as required if primary language is "Other"', async () => {
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    const primaryLanguageInput = wrapper.getByTestId('worker-primaryLanguageId');

    await act(async () => {
      await fireEvent.mouseDown(primaryLanguageInput.querySelector('.MuiSelect-root'));
      await fireEvent.click(await wrapper.getAllByText('Other')[1]);
      await wrapper.getByTestId('worker-otherPrimaryLanguage');
    });

    await act(async () => {
      await fireEvent.click(wrapper.getByText('Save Changes'));
    });

    expect(props.saveWorker).not.toHaveBeenCalled();
    expect(wrapper.getByText('Other Primary Language is required.'));
  });

  it('should clean otherPrimaryLanguage if primaryLanguage is different than "Other"', async () => {
    props.workersMap = {
      [getWorker_1().id]: { ...getWorker_1(), primaryLanguageId: getPrimaryLanguage_other().id, company: getProjectCompany_1() },
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getClientAdminInitialState())}>
          <MemoryRouter>
            <WorkerWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    const primaryLanguageInput = wrapper.getByTestId('worker-primaryLanguageId');

    await act(async () => {
      await fireEvent.mouseDown(primaryLanguageInput.querySelector('.MuiSelect-root'));
      await fireEvent.click(await wrapper.getByText('English'));
      expect(await wrapper.queryByTestId('worker-otherPrimaryLanguage')).toBeFalsy();
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Save Changes'));
    });
    expect(wrapper.baseElement).toMatchSnapshot();
    // expect(props.updateWorker).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     otherPrimaryLanguage: null,
    //     primaryLanguageId: getPrimaryLanguage_1().id,
    //   })
    // );
  });

  it('should NOT navigate when loading and click away', async () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(stateWithCountryList)}>
          <MemoryRouter>
            <Link to={{ pathname: '/projects', state: { success: true } }} data-testid="link-to-another" />
            <WorkerWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    act(() => {
      fireEvent.click(wrapper.getByTestId('link-to-another'));
    });
    expect(window.location.pathname).toEqual(expect.not.stringContaining('/projects'));
  });

  it('should render dialog', async () => {
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(stateWithCountryList)}>
          <MemoryRouter>
            <Link to="/projects" data-testid="link-to-another" />
            <WorkerWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    const serialInput: any = wrapper.getByTestId('worker-firstName');
    act(() => {
      fireEvent.change(serialInput, { target: { name: 'firstName', value: 'some value' } });
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

  it('should fetchEthnicityList', async () => {
    props.workersMap = {};
    props.ethnicityList = [];
    await act(async () => {
      await render(<WorkerWizardComponent {...props} />);
    });
    expect(props.fetchEthnicityList).toHaveBeenCalled();
  });

  it('should fetchLanguageList', async () => {
    props.workersMap = {};
    props.languageList = [];
    await act(async () => {
      await render(<WorkerWizardComponent {...props} />);
    });
    expect(props.fetchLanguageList).toHaveBeenCalled();
  });

  it('should fetchSkilledTradeList', async () => {
    props.workersMap = {};
    props.skilledTradeList = [];
    await act(async () => {
      await render(<WorkerWizardComponent {...props} />);
    });
    expect(props.fetchSkilledTradeList).toHaveBeenCalled();
  });

  it('should fetchIdentificationTypeList', async () => {
    props.workersMap = {};
    props.identificationTypeList = [];
    await act(async () => {
      await render(<WorkerWizardComponent {...props} />);
    });
    expect(props.fetchIdentificationTypeList).toHaveBeenCalled();
  });

  it('should fetchGeographicLocationsList', async () => {
    props.workersMap = {};
    props.geographicLocationsList = [];
    await act(async () => {
      await render(<WorkerWizardComponent {...props} />);
    });
    expect(props.fetchGeographicLocationsList).toHaveBeenCalled();
  });

  it('should render company for FCA_ADMIN', async () => {
    props.workersMap = {};
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    expect(wrapper.getByText('Client Name'));
  });

  it('should hide company for CLIENT_ADMIN', async () => {
    props.workersMap = {};
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getClientAdminInitialState())}>
          <MemoryRouter>
            <WorkerWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(wrapper.queryByText('Client')).toBeNull();
  });

  it('should open existing worker modal', async () => {
    props.saveLoading = { isLoading: false, hasError: true, error: getExistingWorkerResponse() };

    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should navigate to existing worker profile', async () => {
    wrapper = render(<WorkerWizardComponent {...props} />);

    const name: any = wrapper.getByTestId('worker-firstName');

    await act(async () => {
      await fireEvent.change(name, { target: { name: 'firstName', value: 'some value' } });
    });

    props.saveLoading = { isLoading: false, hasError: true, error: getExistingWorkerResponse() };

    wrapper.rerender(<WorkerWizardComponent {...props} />);

    const navigateBtn = wrapper.getByTestId('modal-confirm-btn');

    act(() => {
      fireEvent.click(navigateBtn);
    });

    expect(props.navigate).toHaveBeenCalledWith(`/workers/detail/${getWorker_1().id}`);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should close existing worker modal', async () => {
    props.saveLoading = { isLoading: false, hasError: true, error: getExistingWorkerResponse() };

    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    const closeBtn = wrapper.getAllByTestId('modal-close-btn');

    act(() => {
      fireEvent.click(closeBtn[0]);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should open existing worker modal for client admin', async () => {
    props.saveLoading = {
      isLoading: false,
      hasError: true,
      error: { ...getExistingWorkerResponse(), isWorkerInformationAvailable: false },
    };
    props.currentUserRole = UserModel.Role.CLIENT_ADMIN;

    await act(async () => {
      wrapper = await render(
        <Provider
          store={
            createMockStore({
              ...getClientAdminInitialState(),
              general: {
                ...getClientAdminInitialState().general,
                countryList: [getCountry_1(), getCountry_2()],
              },
            }) as any
          }
        >
          <MemoryRouter>
            <WorkerWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should open existing worker modal for regular user', async () => {
    props.saveLoading = {
      isLoading: false,
      hasError: true,
      error: { ...getExistingWorkerResponse(), isWorkerInformationAvailable: false },
    };
    props.currentUserRole = UserModel.Role.REGULAR_USER;

    await act(async () => {
      wrapper = await render(
        <Provider
          store={
            createMockStore({
              ...getRegularUserInitialState(),
              general: {
                ...getRegularUserInitialState().general,
                countryList: [getCountry_1(), getCountry_2()],
              },
            }) as any
          }
        >
          <MemoryRouter>
            <WorkerWizard {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(wrapper.getByText('This information matches with an existing worker. Please contact FCA Admin to resolve this conflict.'));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should disable worker client', async () => {
    (useParams as any).mockImplementation(() => ({ id: getWorker_1().id }));
    props.workersMap = {
      [getWorker_1().id]: { ...getWorker_1(), company: getProjectCompany_1(), projectsCount: 1 },
    };

    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });

    const input = wrapper.getAllByTestId('autocomplete-wrapper')[0].querySelector('input');

    expect(input.disabled).toBeTruthy();
  });

  it('should render with a migrated worker', async () => {
    props.workersMap = {
      [getWorker_1().id]: { ...getWorker_1(), company: getProjectCompany_1(), invitationStatus: 4 },
    };
    await act(async () => {
      wrapper = await render(<WorkerWizardComponent {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });
});
