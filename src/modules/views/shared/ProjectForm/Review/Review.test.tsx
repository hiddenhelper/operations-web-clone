import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import Review, { IReviewProps } from './Review';

import { ConsentFormModel, ProjectModel, UserModel } from 'modules/models';
import { getInitialState } from '../../../../../test/rootState';
import {
  getProject_6,
  getProject_5,
  getAddress_1,
  getProjectCategory_1,
  getProjectRegion_1,
  getFcaNae_1,
  getProjectCompany_1,
  getPaymentMethod_1,
  getConsentFormFieldConfigs,
} from '../../../../../test/entities';
import { getFallbackBadgeBillingModel, getFallbackProject, getFallbackSeatBillingModel } from '../../../../models/project';
import { useParams } from 'react-router-dom';

jest.mock('../../../../services/AutocompleteService');
jest.mock('../../../../../utils/generalUtils', () => {
  const { roundNumber, getProp, getListWithCommas, isEmpty } = jest.requireActual('../../../../../utils/generalUtils');
  return {
    formatViewforPhoneNumber: jest.fn(),
    formatNumberWithCommas: jest.fn(),
    getFormattedDate: jest.fn(),
    getDefaultValue: jest.fn(),
    getConditionalDefaultValue: jest.fn(),
    getProp,
    getListWithCommas,
    toREM: jest.fn(),
    roundNumber: roundNumber,
    isEmpty,
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Review Step', () => {
  let props: IReviewProps;
  let model = ProjectModel.getFallbackProject();
  model.locations = [{ id: '', name: 'Main Gate 1 ' }];
  model.consentFormLegals = [
    { languageId: 'lang1', languageCode: ConsentFormModel.ConsentFormLanguages.ENGLISH, body: 'Hellllooooou' },
    { languageId: 'lang2', languageCode: ConsentFormModel.ConsentFormLanguages.SPANISH, body: 'Holllaaaaaaa' },
  ];
  beforeEach(() => {
    props = {
      projectMap: {},
      model,
      userCompanyId: null,
      userRole: UserModel.Role.FCA_ADMIN,
      completedFields: {
        'general-information': {
          title: 'General Information',
          required: 0,
          completed: 0,
          order: 0,
        },
        'assign-client': {
          title: 'Assign Clients',
          required: 0,
          completed: 0,
          order: 1,
        },
        'billing-model': {
          title: 'Billing Model',
          required: 0,
          completed: 0,
          order: 2,
        },
        addresses: {
          title: 'Addresses',
          required: 0,
          completed: 0,
          order: 3,
        },
        'certifications-and-trainings': {
          title: 'Certifications And Trainings',
          required: 0,
          completed: 0,
          order: 4,
        },
        'worker-consent-form': {
          title: 'Worker Consent Form',
          required: 0,
          completed: 0,
          order: 5,
        },
      },
      categoryList: [],
      regionList: [],
      fcaNaeList: [],
      onChangeStep: jest.fn(),
      editAction: jest.fn(),
      editPayment: jest.fn(),
    };

    (useParams as any).mockImplementation(() => ({ id: getPaymentMethod_1().paymentMethodId }));
  });

  it('should render empty', () => {
    const emptyProps = {
      model: { ...ProjectModel.getFallbackProject(), certifications: undefined, trainings: undefined },
      projectMap: {},
      userCompanyId: null,
      userRole: UserModel.Role.CLIENT_ADMIN,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...emptyProps} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with locations', async () => {
    (useParams as any).mockImplementation(() => ({ id: 'pm_1IxH2iG4MY5WeilPihvXRyDa' }));

    props.projectMap = {
      pm_1IxH2iG4MY5WeilPihvXRyDa: getFallbackProject(),
    };
    /* tslint:disable:no-string-literal */
    props.projectMap['pm_1IxH2iG4MY5WeilPihvXRyDa'].locations = [
      {
        id: '1',
        name: 'gate 1',
      },
    ];
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...props} />
      </Provider>
    );

    await act(async () => {
      (useParams as any).mockImplementation(() => ({ id: '1233123' }));
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render empty companies', () => {
    const emptyProps = {
      projectMap: {},
      userCompanyId: null,
      userRole: UserModel.Role.CLIENT_ADMIN,
      model: {
        ...ProjectModel.getFallbackProject(),
        relatedCompanies: null,
        badgeBillingModel: { ...getFallbackBadgeBillingModel(), isBilledPerCompany: false },
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...emptyProps} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render seat billed company', () => {
    const emptyProps = {
      projectMap: {},
      userCompanyId: null,
      userRole: UserModel.Role.CLIENT_ADMIN,
      model: {
        ...ProjectModel.getFallbackProject(),
        relatedCompanies: null,
        billingModelType: ProjectModel.BillingModelType.SEATS,
        seatBillingModel: { ...getFallbackSeatBillingModel(), billedCompany: getProjectCompany_1() },
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...emptyProps} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...props} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render values', () => {
    props.model = {
      ...getProject_5(),
      region: null,
      category: null,
      naeId: getFcaNae_1().id,
      categoryId: getProjectCategory_1().id,
      regionId: getProjectRegion_1().id,
      consentFormFields: getConsentFormFieldConfigs(),
      mustComplyWithNycLL196: 1,
      permitHolder: 'Holder name',
      permitNumber: '1234',
      licenseNumber: '123456HC',
    };
    props.categoryList = [getProjectCategory_1()];
    props.regionList = [getProjectRegion_1()];
    props.fcaNaeList = [getFcaNae_1()];
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...props} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render secondary values', () => {
    props.model = {
      ...getProject_5(),
      nae: getFcaNae_1(),
      consentFormFields: [],
    };
    props.completedFields = {
      'general-information': {
        title: 'General Information',
        required: 2,
        completed: 1,
        order: 1,
      },
      'assign-client': {
        title: 'Assign Clients',
        required: 0,
        completed: 0,
        order: 2,
      },
      'billing-model': {
        title: 'Billing Model',
        required: 3,
        completed: 2,
        order: 3,
      },
      addresses: {
        title: 'Addresses',
        required: 5,
        completed: 2,
        order: 4,
      },
      'certifications-and-trainings': {
        title: 'Certifications And Trainings',
        required: 2,
        completed: 1,
        order: 5,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...props} />
      </Provider>
    );

    fireEvent.click(wrapper.getAllByTestId('missing-fields-btn')[0]);

    expect(props.onChangeStep).toHaveBeenCalled();
    expect(wrapper.container).toMatchSnapshot();
  });

  describe('should render addresses', () => {
    it('should load maps', () => {
      props.model = {
        ...getProject_5(),
        jobSiteAddress: getAddress_1(),
        badgingSiteAddress: getAddress_1(),
        badgingSiteAddressMatchesJobSiteAddress: false,
        mailingAddress: getAddress_1(),
      };
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should render custom mailing address as jobsite', () => {
      props.model = {
        ...getProject_5(),
        jobSiteAddress: getAddress_1(),
        badgingSiteAddress: getAddress_1(),
        badgingSiteAddressMatchesJobSiteAddress: false,
        mailingAddress: getAddress_1(),
        mailingAddressMatchingType: 0,
      };
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should render custom mailing address as badging site', () => {
      props.model = {
        ...getProject_5(),
        jobSiteAddress: getAddress_1(),
        badgingSiteAddress: getAddress_1(),
        badgingSiteAddressMatchesJobSiteAddress: true,
        mailingAddress: getAddress_1(),
        mailingAddressMatchingType: 2,
      };
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );
      expect(wrapper.container).toMatchSnapshot();
    });
  });

  it('should hide edit button', () => {
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    props.userCompanyId = null;

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...props} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should click edit button', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...props} />
      </Provider>
    );
    const editIcon = wrapper.getAllByTestId('missing-fields-btn');

    act(() => {
      fireEvent.click(editIcon[0]);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should click edit payment method button', () => {
    props.model.generalContractors = [{ id: '123', name: 'test' }];
    props.userCompanyId = '123';
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    props.edit = true;

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <Review {...props} />
      </Provider>
    );
    const editIcon = wrapper.getByTestId('payment-edit-button');

    act(() => {
      fireEvent.click(editIcon);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  describe('should render responsible', () => {
    it('should render badges model', () => {
      props.model = getProject_6();
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );

      expect(wrapper.container).toMatchSnapshot();
    });
  });

  describe('should render editor', () => {
    it('should render general information', () => {
      props.edit = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );

      act(() => {
        fireEvent.click(wrapper.getByTestId('gen-info-edit-button'));
      });

      expect(props.editAction).toHaveBeenCalledWith(ProjectModel.ProjectStep.GENERAL_INFORMATION);
    });

    it('should render billing model', () => {
      props.edit = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );

      act(() => {
        fireEvent.click(wrapper.getByTestId('billing-edit-button'));
      });

      expect(props.editAction).toHaveBeenCalledWith(ProjectModel.ProjectStep.BILLING_MODEL);
    });

    it('should render addresses', () => {
      props.edit = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );

      act(() => {
        fireEvent.click(wrapper.getByTestId('addr-edit-button'));
      });

      expect(props.editAction).toHaveBeenCalledWith(ProjectModel.ProjectStep.ADDRESSES);
    });

    it('should render addresses', () => {
      props.edit = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );

      act(() => {
        fireEvent.click(wrapper.getByTestId('addr-edit-button'));
      });

      expect(props.editAction).toHaveBeenCalledWith(ProjectModel.ProjectStep.ADDRESSES);
    });

    it('should render certifications', () => {
      props.edit = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );

      act(() => {
        fireEvent.click(wrapper.getByTestId('certs-edit-button'));
      });

      expect(props.editAction).toHaveBeenCalledWith(ProjectModel.ProjectStep.CERTIFICATIONS_TRAININGS);
    });

    it('should render consent form fields', () => {
      props.edit = true;
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <Review {...props} />
        </Provider>
      );

      act(() => {
        fireEvent.click(wrapper.getByTestId('consent-form-edit-button'));
      });

      expect(props.editAction).toHaveBeenCalledWith(ProjectModel.ProjectStep.WORKER_CONSENT_FORM);
    });

    it('should render payment-method via props', () => {
      props.paymentMethods = [getPaymentMethod_1()];
      props.selectedPaymentMethod = 'pm_1IxH2iG4MY5WeilPihvXRyDa';
      const state = {
        ...getInitialState(),
        payment: { initialState: { ...props.paymentMethods } },
      };

      const wrapper = render(
        <Provider store={createMockStore(state) as any}>
          <Review {...props} />
        </Provider>
      );

      expect(wrapper.container).toMatchSnapshot();
    });
  });
});
