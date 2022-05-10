import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import {
  getBillingTierList_1,
  getCertification_1,
  getCertification_2,
  getCertification_3,
  getConsentFormFields,
  getDefaultLoading,
  getFcaNae_1,
  getFcaNae_2,
  getProject_1,
  getProject_3,
  getProjectCategory_1,
  getProjectCategory_2,
  getProjectCompany_1,
  getProjectRegion_1,
  getProjectRegion_2,
  getTimeZone_1,
  getTraining_1,
  getTraining_2,
  getUploadFile_1,
  getUploadFile_2,
} from '../../../../test/entities';
import { getAdminInitialState, getInitialState } from '../../../../test/rootState';
import ProjectDetail, { IProjectWizardProps } from './ProjectWizard';
import { AddressModel, BadgeModel, ConsentFormModel, ProjectModel, ResourceModel, UserModel } from '../../../models';
import { MailingAddressMatchingType } from '../../../models/project';

jest.mock('../../../services/AutocompleteService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('ProjectWizard Component', () => {
  let props: IProjectWizardProps;

  beforeEach(() => {
    props = {
      projectMap: { [getProject_1().id]: getProject_1() },
      loading: getDefaultLoading(),
      searchLoading: getDefaultLoading(),
      sendForApprovalLoading: getDefaultLoading(),
      approveLoading: getDefaultLoading(),
      uploadBadgesLoading: getDefaultLoading(),
      categoryList: [getProjectCategory_1(), getProjectCategory_2()],
      regionList: [getProjectRegion_1(), getProjectRegion_2()],
      fcaNaeList: [getFcaNae_1(), getFcaNae_2()],
      certificationList: [getCertification_1(), getCertification_2(), getCertification_3()],
      trainingList: [getTraining_1(), getTraining_2()],
      mwbeList: [],
      timeZoneList: [getTimeZone_1()],
      billingTierList: getBillingTierList_1(),
      consentFormFields: getConsentFormFields(),
      loadingMap: {},
      fileMap: {},
      userRole: UserModel.Role.FCA_ADMIN,
      fetchProject: jest.fn(),
      saveProject: jest.fn(),
      updateDraftProject: jest.fn(),
      clearErrors: jest.fn(),
      fetchCategoryList: jest.fn(),
      fetchRegionList: jest.fn(),
      fetchNaeList: jest.fn(),
      fetchCertificationList: jest.fn(),
      fetchTrainingList: jest.fn(),
      fetchMwbeList: jest.fn(),
      clearRelationMap: jest.fn(),
      sendProjectForApproval: jest.fn(),
      approveProject: jest.fn(),
      fetchBillingTierList: jest.fn(),
      fetchConsentFormFields: jest.fn(),
      addProjectBadges: jest.fn(),
      clearFileMap: jest.fn(),
      fetchTimeZoneList: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: '' }));
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render billing model', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: null,
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render review', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'review' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  describe('should render certifications and trainings', () => {
    it('should be able to create and delete certification groups', async () => {
      (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'certifications-and-trainings' }));
      props.projectMap[getProject_1().id] = {
        ...getProject_1(),
        certificationGroups: [],
        trainingGroups: [],
      };

      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );

      // Create group
      const createCertificationGroupButton = await wrapper.getByTestId('add-certification-group-button');
      await act(async () => {
        await fireEvent.click(createCertificationGroupButton);
      });

      // Set group config
      await act(async () => {
        // Set name
        const nameInput = await wrapper.getByTestId('group-name');
        await fireEvent.change(nameInput.querySelector('input'), { target: { value: 'New group' } });

        // Set validation type
        const validationTypeInput = await wrapper.getByTestId('validation-type');
        await fireEvent.mouseDown(validationTypeInput.querySelector('.MuiSelect-root'));
        await fireEvent.click(await wrapper.getByText('At least one is mandatory'));

        // Add a certification
        const certSelectInput = await wrapper.findByTestId('autocomplete-input-wrapper');
        await fireEvent.click(certSelectInput.querySelector('.MuiIconButton-label'));
        await fireEvent.click(wrapper.getByText('test other cert'));

        // Edit certification alias
        const aliasInput = await wrapper.findByTestId('item-alias');
        await fireEvent.change(aliasInput.querySelector('input'), { target: { value: 'other cert alias' } });

        await fireEvent.click(wrapper.getByText('Save Changes'));
      });

      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        certificationGroups: [
          {
            name: 'New group',
            validationType: 2,
            certifications: [{ id: getCertification_2().id, name: getCertification_2().name, alias: 'other cert alias' }],
          },
        ],
        trainingGroups: [],
      });

      // Delete group
      await act(async () => {
        // Test close delete modal
        await fireEvent.click(wrapper.getByTestId('delete-group-button'));
        await fireEvent.click(wrapper.getByText('Close'));

        await fireEvent.click(wrapper.getByTestId('delete-group-button'));
        await fireEvent.click(wrapper.getByText('Yes, Delete'));

        await fireEvent.click(wrapper.getByText('Save Changes'));
      });

      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        certificationGroups: [],
        trainingGroups: [],
      });
    });

    it('should be able to add and remove certifications to a group', async () => {
      (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'certifications-and-trainings' }));
      props.projectMap[getProject_1().id] = {
        ...getProject_1(),
        certificationGroups: [
          {
            id: 'groupId',
            name: 'Group Name',
            validationType: 1,
            certifications: [{ id: getCertification_1().id, name: getCertification_1().name, alias: getCertification_1().name }],
          },
        ],
        trainingGroups: [],
      };

      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );

      await act(async () => {
        // Add a new certification
        const certSelectInput = await wrapper.findByTestId('autocomplete-input-wrapper');
        await fireEvent.click(certSelectInput.querySelector('.MuiIconButton-label'));
        fireEvent.click(wrapper.getByText('test other cert'));

        const aliasInput = await wrapper.getAllByTestId('item-alias');
        await fireEvent.change(await aliasInput[1].querySelector('input'), { target: { value: 'new alias' } });

        // Focus alias input to allow render delete button
        await fireEvent.focus(aliasInput[0].querySelector('input'));
        const deleteItemButton = await wrapper.getByTestId('delete-item-button');
        fireEvent.click(deleteItemButton);

        await fireEvent.click(wrapper.getByText('Save Changes'));
      });

      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        certificationGroups: [
          {
            id: 'groupId',
            name: 'Group Name',
            validationType: 1,
            certifications: [{ id: getCertification_2().id, name: getCertification_2().name, alias: 'new alias' }],
          },
        ],
        trainingGroups: [],
      });
    });

    it('should be able to create and delete training groups', async () => {
      (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'certifications-and-trainings' }));
      props.projectMap[getProject_1().id] = {
        ...getProject_1(),
        certificationGroups: [],
        trainingGroups: [],
      };

      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );

      // Create group
      const createTrainingGroupButton = await wrapper.getByTestId('add-training-group-button');
      await act(async () => {
        await fireEvent.click(createTrainingGroupButton);
      });

      // Set group config
      await act(async () => {
        // Set name
        const nameInput = await wrapper.getByTestId('group-name');
        await fireEvent.change(nameInput.querySelector('input'), { target: { value: 'New group' } });

        // Set validation type
        const validationTypeInput = await wrapper.getByTestId('validation-type');
        await fireEvent.mouseDown(validationTypeInput.querySelector('.MuiSelect-root'));
        await fireEvent.click(await wrapper.getByText('All Mandatory'));

        // Add a training
        const certSelectInput = await wrapper.findByTestId('autocomplete-input-wrapper');
        await fireEvent.click(certSelectInput.querySelector('.MuiIconButton-label'));
        await fireEvent.click(wrapper.getByText('test training'));

        // Edit training alias
        const aliasInput = await wrapper.findByTestId('item-alias');
        await fireEvent.change(aliasInput.querySelector('input'), { target: { value: 'test training alias' } });

        await fireEvent.click(wrapper.getByText('Save Changes'));
      });

      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        certificationGroups: [],
        trainingGroups: [
          {
            name: 'New group',
            validationType: 3,
            trainings: [{ id: getTraining_1().id, name: getTraining_1().name, alias: 'test training alias' }],
          },
        ],
      });

      // Delete group
      await act(async () => {
        // Test close delete modal
        await fireEvent.click(wrapper.getByTestId('delete-group-button'));
        await fireEvent.click(wrapper.getByText('Close'));

        await fireEvent.click(wrapper.getByTestId('delete-group-button'));
        await fireEvent.click(wrapper.getByText('Yes, Delete'));

        await fireEvent.click(wrapper.getByText('Save Changes'));
      });

      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        certificationGroups: [],
        trainingGroups: [],
      });
    });

    it('should be able to add and remove trainings to a group', async () => {
      (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'certifications-and-trainings' }));
      props.projectMap[getProject_1().id] = {
        ...getProject_1(),
        certificationGroups: [],
        trainingGroups: [
          {
            id: 'groupId',
            name: 'Group Name',
            validationType: 1,
            trainings: [{ id: getTraining_1().id, name: getTraining_1().name, alias: getTraining_1().name }],
          },
        ],
      };

      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );

      await act(async () => {
        // Add a new training
        const trainingSelectInput = await wrapper.findByTestId('autocomplete-input-wrapper');
        await fireEvent.click(trainingSelectInput.querySelector('.MuiIconButton-label'));
        fireEvent.click(wrapper.getByText(getTraining_2().name));

        const aliasInput = await wrapper.getAllByTestId('item-alias');
        await fireEvent.change(await aliasInput[1].querySelector('input'), { target: { value: 'new alias' } });

        // Focus alias input to allow render delete button
        await fireEvent.focus(aliasInput[0].querySelector('input'));
        const deleteItemButton = await wrapper.getByTestId('delete-item-button');
        fireEvent.click(deleteItemButton);

        await fireEvent.click(wrapper.getByText('Save Changes'));
      });

      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        certificationGroups: [],
        trainingGroups: [
          {
            id: 'groupId',
            name: 'Group Name',
            validationType: 1,
            trainings: [{ id: getTraining_2().id, name: getTraining_2().name, alias: 'new alias' }],
          },
        ],
      });
    });
  });

  it('should render assign clients', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'assign-client' }));
    let wrapper;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render addresses', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'addresses' }));
    let wrapper;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change matching address', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'addresses' }));
    let wrapper;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      badgingSiteAddressMatchesJobSiteAddress: false,
      badgingSiteAddress: AddressModel.getFallbackAddress(),
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    const badgingMatchJobSiteCheck = wrapper.getByTestId('badgingMatchJobSite');

    await act(async () => {
      fireEvent.click(badgingMatchJobSiteCheck);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change mailing matching address', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'addresses' }));
    let wrapper;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      mailingAddressMatchingType: MailingAddressMatchingType.NONE,
      mailingAddress: AddressModel.getFallbackAddress(),
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    const mailingMatchJobSiteCheck = wrapper.getByTestId('mailingMatchJobSite');

    await act(async () => {
      fireEvent.click(mailingMatchJobSiteCheck);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change mailing none matching address', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'addresses' }));
    let wrapper;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      mailingAddressMatchingType: MailingAddressMatchingType.NONE,
      mailingAddress: AddressModel.getFallbackAddress(),
      badgingSiteAddress: AddressModel.getFallbackAddress(),
      badgingSiteAddressMatchesJobSiteAddress: false,
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    const mailingMatchCheck = wrapper.getByTestId('mailingMatchNone');

    await act(async () => {
      fireEvent.click(mailingMatchCheck);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render badge templates', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'badge-templates' }));
    (global as any).URL.createObjectURL = jest.fn();
    props.uploadBadgesLoading = undefined;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
    };
    props.fileMap = { generalContractorBadgeLogo: { file1: { ...getUploadFile_1(), status: 2 } } };
    const { container, getAllByTestId, getByText, getByTestId } = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    const sameBadgeCheck = getByTestId('badge-same');
    const fileInput = getAllByTestId('file-upload-input');

    act(() => {
      fireEvent.click(sameBadgeCheck);
    });

    // creo que hay que borrar este
    act(() => {
      fireEvent.click(sameBadgeCheck);
    });

    act(() => {
      fireEvent.change(fileInput[0], { target: { files: [getUploadFile_1().file, getUploadFile_2().file] } });
    });
    act(() => {
      fireEvent.click(getByText('Save Changes'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should render pending badge templates', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'badge-templates' }));
    (global as any).URL.createObjectURL = jest.fn();
    props.uploadBadgesLoading = undefined;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
    };
    props.fileMap = { generalContractorBadgeLogo: { file1: { ...getUploadFile_1(), status: 1 } } };
    const { container, getByText, getByTestId } = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const sameBadgeCheck = getByTestId('badge-same');

    act(() => {
      fireEvent.click(sameBadgeCheck);
    });

    act(() => {
      fireEvent.click(getByText('Save Changes'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should render with fallback', () => {
    props.projectMap = {};
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render errors coming from server', () => {
    props.loading.error = {
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
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render errors on upload badge', () => {
    props.uploadBadgesLoading.error = {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|7952db37-4929e25babbabf98.',
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  describe('should render worker consent form', () => {
    it('without errors', () => {
      (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'worker-consent-form' }));
      props.projectMap[getProject_1().id] = {
        ...getProject_1(),
      };
      const { container } = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('and fields should be editable', async () => {
      (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'worker-consent-form' }));
      props.projectMap[getProject_1().id] = {
        ...getProject_1(),
        consentFormLegals: [
          { languageId: 'lang1', languageCode: ConsentFormModel.ConsentFormLanguages.ENGLISH, body: 'Hellllooooou' },
          { languageId: 'lang2', languageCode: ConsentFormModel.ConsentFormLanguages.SPANISH, body: 'Holllaaaaaaa' },
        ],
      };
      const wrapper = render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );

      const englishLegalInput = await wrapper.getByTestId('consent-form-legals-input-en');
      await act(async () => {
        /* tslint:disable:no-empty */
        await fireEvent.change(englishLegalInput, { persist: () => {}, target: { value: 'New consent form legal agreement' } });
      });
    });
  });

  it('should fetchProject on load', () => {
    props.projectMap = {};
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProject).toHaveBeenCalledWith(getProject_1().id);
  });

  it('should fetchCertificationList on load', () => {
    props.certificationList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchCertificationList).toHaveBeenCalled();
  });

  it('should fetchTrainingList on load', () => {
    props.trainingList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchTrainingList).toHaveBeenCalled();
  });

  it('should fetchTimeZoneList on load', () => {
    props.timeZoneList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchTimeZoneList).toHaveBeenCalled();
  });

  it('should fetchBillingTierList on load', () => {
    props.billingTierList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchBillingTierList).toHaveBeenCalled();
  });

  it('should fetchCategoryList on load', () => {
    props.projectMap = {};
    props.categoryList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchCategoryList).toHaveBeenCalled();
  });

  it('should fetchRegionList on load', () => {
    props.projectMap = {};
    props.regionList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchRegionList).toHaveBeenCalled();
  });

  it('should fetchNaeList on load', () => {
    props.projectMap = {};
    props.fcaNaeList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchNaeList).toHaveBeenCalled();
  });

  it('should fetchMwbeList on load', () => {
    props.mwbeList = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchMwbeList).toHaveBeenCalled();
  });

  it('should consentFormFields on load', () => {
    props.consentFormFields = [];
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchConsentFormFields).toHaveBeenCalled();
  });

  it('should reset form', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('project-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.click(wrapper.getByText('Discard Changes'));
      expect(nameInput.value).toBe('Project Name');
    });
  });

  it('should save form', async () => {
    (useParams as any).mockImplementation(() => ({ id: '', step: '' }));
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('project-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.saveProject).toHaveBeenCalledWith(
        {
          id: undefined,
          name: 'some value',
          categoryId: null,
          ccv: null,
          consentFormFields: [],
          consentFormLegals: [],
          description: null,
          endDate: null,
          naeId: null,
          timeZoneId: null,
          plannedMonths: null,
          regionId: null,
          startDate: null,
          jobSiteAddress: AddressModel.getFallbackAddress(),
          badgingSiteAddressMatchesJobSiteAddress: true,
          badgingSiteAddress: null,
          mailingAddressMatchingType: 1,
          mailingAddress: null,
          locations: [],
          relatedCompanies: [],
          billingModelType: 0,
          badgeBillingModel: null,
          seatBillingModel: null,
          certificationGroups: [],
          trainingGroups: [],
          status: 0,
          generalContractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
          subcontractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
          visitorBadgeTemplate: BadgeModel.getFallbackVisitorBadgeTemplate(),
          subcontractorBadgeTemplateMatchesGeneralContractor: false,
        },
        'general-information'
      );
    });
  });

  it('should be able to edit NYC LL196 info', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'general-information' }));
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nycLl196Yes: any = wrapper.getByRole('radio', { name: 'Yes' });
    await fireEvent.click(nycLl196Yes);

    const permitHolderInput: any = wrapper.getByTestId('project-permitHolder');
    const permitNumberInput: any = wrapper.getByTestId('project-permitNumber');
    const licenseNumberInput: any = wrapper.getByTestId('project-licenseNumber');
    await fireEvent.change(permitHolderInput, { target: { value: 'Permit holder name' } });
    await fireEvent.change(permitNumberInput, { target: { value: 'Permit number 1234' } });
    await fireEvent.change(licenseNumberInput, { target: { value: 'License number 1234' } });

    await fireEvent.click(wrapper.getByText('Save Changes'));

    expect(props.updateDraftProject).toHaveBeenCalledWith({
      ...getProject_1(),
      mustComplyWithNycLL196: true,
      permitHolder: 'Permit holder name',
      permitNumber: 'Permit number 1234',
      licenseNumber: 'License number 1234',
    });

    const nycLl196No: any = wrapper.getByRole('radio', { name: 'No' });
    await fireEvent.click(nycLl196No);

    await fireEvent.click(wrapper.getByText('Save Changes'));

    expect(props.updateDraftProject).toHaveBeenCalledWith({
      ...getProject_1(),
      mustComplyWithNycLL196: false,
      permitHolder: null,
      permitNumber: null,
      licenseNumber: null,
    });
  });

  it('should show validations save invalid data', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('project-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: '' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(wrapper.container).toMatchSnapshot();
      expect(wrapper.getByText('Please enter Project Name.'));
      expect(props.saveProject).not.toHaveBeenCalled();
    });
  });

  it('should update form', async () => {
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      name: 'some updated name',
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('project-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        id: getProject_1().id,
        name: 'some value',
        naeId: null,
      });
    });
  });

  it('should update billing info', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 1,
      relatedCompanies: [],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInputs: any = wrapper.getAllByTestId('controlled-radio-button');

    await act(async () => {
      await fireEvent.click(billingModelInputs[0]);
    });

    const badgePriceInput: any = wrapper.getByTestId('project-badgePrice');
    const isBilledCompanyCheckbox: any = wrapper.getByTestId('badge-isBilled');
    const visitorBadgePriceInput: any = wrapper.getByTestId('project-visitorBadgePrice');
    const visitorReprintingCostInput: any = wrapper.getByTestId('project-visitorReprintingCost');

    await act(async () => {
      await fireEvent.change(badgePriceInput, { target: { name: 'badgePrice', value: '12' } });
      await fireEvent.change(visitorBadgePriceInput, { target: { name: 'visitorBadgePrice', value: '12' } });
      await fireEvent.change(visitorReprintingCostInput, { target: { name: 'visitorReprintingCost', value: '12' } });
      await fireEvent.click(isBilledCompanyCheckbox);
      await fireEvent.click(isBilledCompanyCheckbox);
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 0,
        badgeBillingModel: {
          ...getProject_1().badgeBillingModel,
          badgePrice: 12,
          isBilledPerCompany: true,
          billedCompanyId: null,
          billedCompany: null,
          visitorBadgePrice: 12,
          visitorReprintingCost: 12,
        },
        relatedCompanies: [],
      });
    });
  });

  it('should update billing info for first time', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: null,
      badgeBillingModel: null,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const badgePriceInput: any = wrapper.getByTestId('project-badgePrice');

    await act(async () => {
      await fireEvent.change(badgePriceInput, { target: { name: 'badgePrice', value: '12' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 0,
        badgeBillingModel: {
          ...getProject_1().badgeBillingModel,
          badgePrice: 12,
          billedCompany: null,
        },
      });
    });
  });

  it('should change billed company', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: null,
      badgeBillingModel: null,
      relatedCompanies: [getProjectCompany_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const isBilledCompanyCheckbox: any = wrapper.getByTestId('badge-isBilled');

    await act(async () => {
      await fireEvent.click(isBilledCompanyCheckbox);
    });
    await act(async () => {
      const billedCompanySelect: any = wrapper.getAllByText('Select Client');
      await fireEvent.mouseDown(billedCompanySelect[0]);
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('company 1'));
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 0,
        badgeBillingModel: {
          ...getProject_1().badgeBillingModel,
          billedCompany: getProjectCompany_1(),
          billedCompanyId: getProjectCompany_1().id,
          isBilledPerCompany: false,
        },
        relatedCompanies: [{ id: getProjectCompany_1().id, role: getProjectCompany_1().role }],
      });
    });
  });

  it('should update seats billing info', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 0,
      relatedCompanies: [getProjectCompany_1()],
      seatBillingModel: {
        estimatedWorkersNumber: 20,
        isFixedSeatPrice: false,
        seatPrice: 120,
        billingTier: null,
        billingTierId: null,
        billedCompany: null,
        billedCompanyId: null,
        reprintingCost: 150,
        visitorBadgePrice: null,
        visitorReprintingCost: null,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInputs: any = wrapper.getAllByTestId('controlled-radio-button');

    await act(async () => {
      await fireEvent.click(billingModelInputs[1]);
    });

    const estimatedWorkersNumberInput: any = wrapper.getByTestId('project-seats-estimatedWorkersNumber');
    const isFixedPriceInput: any = wrapper.getByTestId('seat-isFixed');
    const visitorBadgePriceInput: any = wrapper.getByTestId('project-visitorBadgePrice');
    const visitorReprintingCostInput: any = wrapper.getByTestId('project-visitorReprintingCost');

    await act(async () => {
      await fireEvent.change(estimatedWorkersNumberInput, { target: { name: 'estimatedWorkersNumber', value: '12' } });
      await fireEvent.change(visitorBadgePriceInput, { target: { name: 'visitorBadgePrice', value: '12' } });
      await fireEvent.change(visitorReprintingCostInput, { target: { name: 'visitorReprintingCost', value: '7' } });
      await fireEvent.click(isFixedPriceInput);
    });
    await act(async () => {
      await fireEvent.change(wrapper.getByTestId('project-seatPrice'), { target: { name: 'seatPrice', value: '3' } });
      const billedCompanySelect: any = wrapper.getAllByText('Select Client');
      await fireEvent.mouseDown(billedCompanySelect[0]);
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('company 1'));
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 1,
        badgeBillingModel: null,
        seatBillingModel: {
          estimatedWorkersNumber: 12,
          billingTierId: '1',
          billedCompanyId: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
          seatPrice: 3,
          isFixedSeatPrice: true,
          reprintingCost: 150,
          visitorBadgePrice: 12,
          visitorReprintingCost: 7,
        },
        relatedCompanies: [
          {
            id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
            role: 0,
          },
        ],
      });
    });
  });

  it('should update seats billing info for first time', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 0,
      relatedCompanies: [getProjectCompany_1()],
      seatBillingModel: null,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInputs: any = wrapper.getAllByTestId('controlled-radio-button');

    await act(async () => {
      await fireEvent.click(billingModelInputs[1]);
    });

    const estimatedWorkersNumberInput: any = wrapper.getByTestId('project-seats-estimatedWorkersNumber');
    const isFixedPriceInput: any = wrapper.getByTestId('seat-isFixed');

    await act(async () => {
      await fireEvent.change(estimatedWorkersNumberInput, { target: { name: 'estimatedWorkersNumber', value: '12' } });
      await fireEvent.click(isFixedPriceInput);
    });
    await act(async () => {
      await fireEvent.change(wrapper.getByTestId('project-seatPrice'), { target: { name: 'seatPrice', value: '3' } });
      const billedCompanySelect: any = wrapper.getAllByText('Select Client');
      await fireEvent.mouseDown(billedCompanySelect[0]);
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('company 1'));
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 1,
        badgeBillingModel: null,
        seatBillingModel: {
          estimatedWorkersNumber: 12,
          billingTierId: '1',
          billedCompanyId: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
          seatPrice: 3,
          isFixedSeatPrice: true,
          reprintingCost: null,
          visitorBadgePrice: null,
          visitorReprintingCost: null,
        },
        relatedCompanies: [
          {
            id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
            role: 0,
          },
        ],
      });
    });
  });

  it('should send seat price from tier', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 0,
      relatedCompanies: [getProjectCompany_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInputs: any = wrapper.getAllByTestId('controlled-radio-button');

    await act(async () => {
      await fireEvent.click(billingModelInputs[1]);
    });

    const estimatedWorkersNumberInput: any = wrapper.getByTestId('project-seats-estimatedWorkersNumber');

    await act(async () => {
      await fireEvent.change(estimatedWorkersNumberInput, { target: { name: 'estimatedWorkersNumber', value: '12' } });
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 1,
        badgeBillingModel: null,
        seatBillingModel: {
          estimatedWorkersNumber: 12,
          billingTierId: '1',
          billedCompanyId: null,
          seatPrice: 15,
          isFixedSeatPrice: false,
          reprintingCost: null,
          visitorBadgePrice: null,
          visitorReprintingCost: null,
        },
        relatedCompanies: [
          {
            id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
            role: 0,
          },
        ],
      });
    });
  });

  it('should update seats billing info for first time', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 0,
      relatedCompanies: [getProjectCompany_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInputs: any = wrapper.getAllByTestId('controlled-radio-button');

    await act(async () => {
      await fireEvent.click(billingModelInputs[1]);
    });

    const reprintingCostInput: any = wrapper.getByTestId('project-seats-reprintingCost');
    const estimatedWorkersNumberInput: any = wrapper.getByTestId('project-seats-estimatedWorkersNumber');

    await act(async () => {
      await fireEvent.change(reprintingCostInput, { target: { name: 'reprintingCost', value: '12' } });
      await fireEvent.change(estimatedWorkersNumberInput, { target: { name: 'estimatedWorkersNumber', value: '12' } });
    });
    await act(async () => {
      await fireEvent.change(estimatedWorkersNumberInput, { target: { name: 'estimatedWorkersNumber', value: '' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 1,
        badgeBillingModel: null,
        seatBillingModel: {
          billedCompanyId: null,
          reprintingCost: 12,
          billingTierId: null,
          estimatedWorkersNumber: null,
          isFixedSeatPrice: false,
          seatPrice: null,
          visitorBadgePrice: null,
          visitorReprintingCost: null,
        },
        relatedCompanies: [
          {
            id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
            role: 0,
          },
        ],
      });
    });
  });

  it('should change seat price', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 0,
      relatedCompanies: [getProjectCompany_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInputs: any = wrapper.getAllByTestId('controlled-radio-button');

    await act(async () => {
      await fireEvent.click(billingModelInputs[1]);
    });

    const isFixedPriceInput: any = wrapper.getByTestId('seat-isFixed');

    await act(async () => {
      await fireEvent.click(isFixedPriceInput);
    });
    await act(async () => {
      await fireEvent.change(wrapper.getByTestId('project-seatPrice'), { target: { name: 'seatPrice', value: '3' } });
      await fireEvent.click(isFixedPriceInput);
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 1,
        badgeBillingModel: null,
        seatBillingModel: {
          billedCompanyId: null,
          reprintingCost: null,
          billingTierId: null,
          estimatedWorkersNumber: null,
          isFixedSeatPrice: false,
          seatPrice: 3,
          visitorBadgePrice: null,
          visitorReprintingCost: null,
        },
        relatedCompanies: [
          {
            id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
            role: 0,
          },
        ],
      });
    });
  });

  it('should update seats billed company', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 1,
      relatedCompanies: [getProjectCompany_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      const billedCompanySelect: any = wrapper.getAllByText('Select Client');
      await fireEvent.mouseDown(billedCompanySelect[0]);
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('company 1'));
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateDraftProject).toHaveBeenCalledWith({
        ...getProject_1(),
        billingModelType: 1,
        badgeBillingModel: null,
        seatBillingModel: {
          billedCompanyId: getProjectCompany_1().id,
          billingTierId: null,
          estimatedWorkersNumber: null,
          isFixedSeatPrice: false,
          seatPrice: null,
          reprintingCost: null,
          visitorBadgePrice: null,
          visitorReprintingCost: null,
        },
        relatedCompanies: [
          {
            id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
            role: 0,
          },
        ],
      });
    });
  });

  it('should show validations for billing model', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: ProjectModel.BillingModelType.BADGES,
      relatedCompanies: [getProjectCompany_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInput: any = wrapper.getAllByTestId('controlled-radio-button')[0];
    const badgePriceInput: any = wrapper.getByTestId('project-badgePrice');
    const reprintingCostInput: any = wrapper.getByTestId('project-reprintingCost');

    await act(async () => {
      await fireEvent.click(billingModelInput);
      await fireEvent.change(badgePriceInput, { target: { name: 'badgePrice', value: '1200' } });
      await fireEvent.change(reprintingCostInput, { target: { name: 'reprintingCost', value: '1200' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(wrapper.getByText('Badge price should be less than $1,000.'));
      expect(wrapper.getByText('Badge reprint price should be less than $1,000.'));
      expect(props.updateDraftProject).not.toHaveBeenCalled();
    });
  });

  it('should show validations for seats model', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      billingModelType: 1,
      relatedCompanies: [getProjectCompany_1()],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingModelInput: any = wrapper.getAllByTestId('controlled-radio-button')[1];

    await act(async () => {
      await fireEvent.click(billingModelInput);
    });
    await act(async () => {
      const isFixedCheckbox: any = wrapper.getByTestId('seat-isFixed');
      await fireEvent.click(isFixedCheckbox);
      const reprintingCostInput: any = wrapper.getByTestId('project-seats-reprintingCost');
      await fireEvent.change(reprintingCostInput, { target: { name: 'reprintingCost', value: '1200' } });
    });
    await act(async () => {
      const seatPriceInput: any = wrapper.getByTestId('project-seatPrice');
      await fireEvent.change(seatPriceInput, { target: { name: 'seatPrice', value: '1200' } });
    });
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(wrapper.getByText('Badge reprint price should be less than $1,000.'));
      expect(wrapper.getByText('Seat price should be less than $1,000.'));
      expect(props.updateDraftProject).not.toHaveBeenCalled();
    });
  });

  it('should count billed company as required field', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'billing-model' }));
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
      badgeBillingModel: {
        badgePrice: null,
        isBilledPerCompany: false,
        reprintingCost: null,
        billedCompanyId: null,
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    // TODO make a better test for this case
    // expect(getByText('2/6'));
    expect(container).toMatchSnapshot();
  });

  it('should update addresses', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'addresses' }));
    let wrapper;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    const badgingMatchJobSite = await wrapper.findByTestId('badgingMatchJobSite');

    await act(async () => {
      await fireEvent.click(badgingMatchJobSite);
    });

    const mailingMatchType = wrapper.getByTestId('mailingMatchType');
    await act(async () => {
      await fireEvent.click(mailingMatchType);
    });

    const mailingMatchNone = await wrapper.findByTestId('mailingMatchNone');

    await act(async () => {
      await fireEvent.click(mailingMatchNone);
    });

    const addressLines = await wrapper.findAllByTestId('addr-line2');

    await act(async () => {
      await fireEvent.change(addressLines[1], { target: { name: 'line2', value: 'test' } });
    });
    await act(async () => {
      await fireEvent.change(addressLines[2], { target: { name: 'line2', value: 'test2' } });
    });

    await fireEvent.click(wrapper.getByText('Save Changes'));
    expect(wrapper.container).toMatchSnapshot();
    expect(props.updateDraftProject).toHaveBeenCalledWith({
      ...getProject_1(),
      badgingSiteAddress: {
        ...AddressModel.getFallbackAddress(),
        line2: 'test',
      },
      mailingAddress: {
        ...AddressModel.getFallbackAddress(),
        line2: 'test2',
      },
      mailingAddressMatchingType: 0,
      badgingSiteAddressMatchesJobSiteAddress: false,
      line2: 'test2',
    });
  });

  it('should update secondary addresses', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'addresses' }));
    let wrapper;
    props.projectMap[getProject_1().id] = {
      ...getProject_1(),
    };
    await act(async () => {
      wrapper = await render(
        <Provider store={createMockStore(getInitialState()) as any}>
          <MemoryRouter>
            <ProjectDetail {...props} />
          </MemoryRouter>
        </Provider>
      );
    });
    const badgingMatchJobSite = await wrapper.findByTestId('badgingMatchJobSite');
    const mailingMatchJobSite = await wrapper.findByTestId('mailingMatchJobSite');

    await act(async () => {
      await fireEvent.click(mailingMatchJobSite);
    });
    await act(async () => {
      await fireEvent.click(badgingMatchJobSite);
    });
    const mailingMatchType = await wrapper.findByTestId('mailingMatchType');
    await act(async () => {
      await fireEvent.change(mailingMatchType, { target: { name: 'mailingAddressMatchingType', value: '1' } });
    });

    await fireEvent.click(wrapper.getByText('Save Changes'));
    expect(wrapper.container).toMatchSnapshot();
    expect(props.updateDraftProject).toHaveBeenCalledWith({
      ...getProject_1(),
      badgingSiteAddress: {
        ...AddressModel.getFallbackAddress(),
        line2: null,
      },
      mailingAddress: {
        ...AddressModel.getFallbackAddress(),
      },
      mailingAddressMatchingType: 0,
      badgingSiteAddressMatchesJobSiteAddress: false,
    });
  });

  it('should render dialog when moves step without saving changes', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('project-name');

    await act(async () => {
      await fireEvent.change(nameInput, { target: { name: 'name', value: 'some value' } });
      await fireEvent.click(wrapper.getAllByTestId('step-button')[1]);
      expect(wrapper.getByText('Unsaved changes')).toBeTruthy();
    });
  });

  it('should render dialog when moves away from client flow', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <Link to="/projects" data-testid="link-to-another" />
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const nameInput: any = wrapper.getByTestId('project-name');

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

  it('should clearErrors', () => {
    const { unmount } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearErrors).toHaveBeenCalled();
    expect(props.clearRelationMap).toHaveBeenCalled();
  });

  it('should send project for approval', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_3().id, step: '' }));
    props.projectMap[getProject_3().id] = {
      ...getProject_3(),
      region: getProjectRegion_1(),
      category: getProjectCategory_1(),
      nae: getFcaNae_1(),
      certificationGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          certifications: [{ id: getCertification_1().id, name: getCertification_1().name, alias: getCertification_1().name }],
        },
      ],
      trainingGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          trainings: [{ id: getTraining_1().id, name: getTraining_1().name, alias: getTraining_1().name }],
        },
      ],
      consentFormLegals: [
        { languageId: 'lang1', languageCode: ConsentFormModel.ConsentFormLanguages.ENGLISH, body: 'Hellllooooou', name: 'Consent name 1' },
        { languageId: 'lang2', languageCode: ConsentFormModel.ConsentFormLanguages.SPANISH, body: 'Holllaaaaaaa', name: 'Consent name 2' },
      ],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Send for Approval'));
    });
    expect(wrapper.container).toMatchSnapshot();
    expect(props.sendProjectForApproval).toHaveBeenCalledWith(getProject_3().id);
  });

  it('should approve project', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_3().id, step: '' }));
    props.projectMap[getProject_3().id] = {
      ...getProject_3(),
      status: ResourceModel.Status.PENDING_APPROVAL,
      region: getProjectRegion_1(),
      category: getProjectCategory_1(),
      nae: getFcaNae_1(),
      certificationGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          certifications: [{ id: getCertification_1().id, name: getCertification_1().name, alias: getCertification_1().name }],
        },
      ],
      trainingGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          trainings: [{ id: getTraining_1().id, name: getTraining_1().name, alias: getTraining_1().name }],
        },
      ],
      consentFormLegals: [
        { languageId: 'lang1', languageCode: ConsentFormModel.ConsentFormLanguages.ENGLISH, body: 'Hellllooooou', name: 'Consent name 1' },
        { languageId: 'lang2', languageCode: ConsentFormModel.ConsentFormLanguages.SPANISH, body: 'Holllaaaaaaa', name: 'Consent name 2' },
      ],
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    await act(async () => {
      await fireEvent.click(wrapper.getByText('Approve Project'));
    });
    expect(props.approveProject).toHaveBeenCalledWith(getProject_3().id);
  });
});
