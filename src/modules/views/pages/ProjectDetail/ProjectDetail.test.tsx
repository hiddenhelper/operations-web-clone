import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import {
  getAddress_1,
  getCertification_1,
  getCertification_2,
  getConsentFormFields,
  getDefaultLoading,
  getFcaNae_1,
  getProject_1,
  getProjectCategory_1,
  getProjectCompany_1,
  getProjectDetailStatistics_1,
  getProjectRegion_1,
  getTraining_1,
  getTraining_2,
  getUser_1,
  getCountry_1,
  getCountry_2,
  getTimeZone_1,
  getPaymentMethod_1,
  getPaymentMethod_2,
} from '../../../../test/entities';
import { getAdminInitialState, getClientAdminInitialState, getInitialState } from '../../../../test/rootState';
import { AddressModel, ResourceModel, UserModel } from '../../../models';
import ProjectDetail, { IProjectDetailProps } from './ProjectDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('ProjectDetail', () => {
  let props: IProjectDetailProps;
  const stateWithCountryList = {
    ...getAdminInitialState(),
    general: {
      ...getAdminInitialState().general,
      countryList: [getCountry_1(), getCountry_2()],
    },
  };
  const ProjectDetailComponent = currentProps => (
    <Provider store={createMockStore(stateWithCountryList) as any}>
      <MemoryRouter>
        <ProjectDetail {...currentProps} />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      projectMap: { [getProject_1().id]: getProject_1() },
      projectStatistics: getProjectDetailStatistics_1(),
      projectLoading: getDefaultLoading(),
      updateProjectLoading: getDefaultLoading(),
      statisticsLoading: getDefaultLoading(),
      updatePaymentMethodLoading: getDefaultLoading(),
      saveBadgeVisitorLoading: undefined,
      updateBadgeVisitorLoading: undefined,
      categoryList: [getProjectCategory_1()],
      regionList: [getProjectRegion_1()],
      fcaNaeList: [getFcaNae_1()],
      timeZoneList: [getTimeZone_1()],
      billingTierList: [],
      certificationList: [getCertification_1(), getCertification_2()],
      trainingList: [getTraining_1(), getTraining_2()],
      consentFormFields: getConsentFormFields(),
      fetchProject: jest.fn(),
      clearProjectMap: jest.fn(),
      clearLoadingMap: jest.fn(),
      updateProject: jest.fn(),
      fetchCategoryList: jest.fn(),
      fetchRegionList: jest.fn(),
      fetchNaeList: jest.fn(),
      fetchBillingTierList: jest.fn(),
      fetchCertificationList: jest.fn(),
      fetchTrainingList: jest.fn(),
      clearErrors: jest.fn(),
      archiveProject: jest.fn(),
      unarchiveProject: jest.fn(),
      clearModalMap: jest.fn(),
      fetchConsentFormFields: jest.fn(),
      clearLoading: jest.fn(),
      fetchProjectStatistics: jest.fn(),
      clearProjectStatistics: jest.fn(),
      fetchTimeZoneList: jest.fn(),
      updateProjectPaymentMethod: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: '' }));
  });

  it('should fetchProject', () => {
    props.projectMap = {};
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchProject).toHaveBeenCalledWith(getProject_1().id);
  });

  it('should fetchProjectStatistics', () => {
    props.projectStatistics = null;
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchProjectStatistics).toHaveBeenCalledWith(getProject_1().id);
  });

  it('should fetchCategoryList on mount', () => {
    props.categoryList = [];
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchCategoryList).toHaveBeenCalled();
  });

  it('should fetchRegionList on mount', () => {
    props.regionList = [];
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchRegionList).toHaveBeenCalled();
  });

  it('should fetchNaeList on mount', () => {
    props.fcaNaeList = [];
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchNaeList).toHaveBeenCalled();
  });

  it('should fetchBillingTierList on mount', () => {
    props.billingTierList = [];
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchBillingTierList).toHaveBeenCalled();
  });

  it('should fetchCertificationList on mount', () => {
    props.certificationList = [];
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchCertificationList).toHaveBeenCalled();
  });

  it('should fetchConsentFormFields on mount', () => {
    props.consentFormFields = [];
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchConsentFormFields).toHaveBeenCalled();
  });

  it('should fetchTrainingList on mount', () => {
    props.trainingList = [];
    render(<ProjectDetailComponent {...props} />);
    expect(props.fetchTrainingList).toHaveBeenCalled();
  });

  it('should unmount', () => {
    const { unmount } = render(<ProjectDetailComponent {...props} />);
    unmount();
    expect(props.clearProjectMap).toHaveBeenCalled();
    expect(props.clearLoadingMap).toHaveBeenCalled();
  });

  it('should render loader', () => {
    props.projectLoading = undefined;
    const { container } = render(<ProjectDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render information tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    const { container } = render(<ProjectDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should re-fetch project information when navigating from another tab', async () => {
    const { getByText, getAllByTestId, rerender } = render(<ProjectDetailComponent {...props} />);
    getByText('Assign Subcontractor');

    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));

    const projectTabs = getAllByTestId('filter-status-opt');

    await act(async () => {
      await fireEvent.click(projectTabs[projectTabs.length - 1]);
    });

    await act(async () => {
      await getByText('General Information');
    });

    expect(props.fetchProject).toHaveBeenCalledWith(getProject_1().id);
  });

  it('should edit information', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        ccv: 1,
        nae: getFcaNae_1(),
        naeId: getFcaNae_1().id,
        region: getProjectRegion_1(),
        category: getProjectCategory_1(),
        timeZone: getTimeZone_1(),
        timeZoneId: getTimeZone_1().id,
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    await act(async () => {
      const nameInput = await wrapper.findByTestId('project-name');

      fireEvent.change(nameInput, { target: { value: 'some name', name: 'name' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.updateProject).toHaveBeenCalledWith({
      ...getProject_1(),
      name: 'some name',
      ccv: 1,
      nae: getFcaNae_1(),
      naeId: getFcaNae_1().id,
      region: getProjectRegion_1(),
      category: getProjectCategory_1(),
      timeZone: getTimeZone_1(),
      timeZoneId: getTimeZone_1().id,
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should edit billing', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        status: ResourceModel.Status.ACTIVE,
        badgeBillingModel: {
          badgePrice: 12,
          isBilledPerCompany: true,
          reprintingCost: 2,
          billedCompanyId: null,
          visitorBadgePrice: 10,
          visitorReprintingCost: 3,
        },
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const billingEditBtn = wrapper.getByTestId('billing-edit-button');

    await act(async () => {
      fireEvent.click(billingEditBtn);
    });

    await act(async () => {
      const badgePriceInput = await wrapper.findByTestId('project-badgePrice');
      const visitorBadgePriceInput = await wrapper.findByTestId('project-visitorBadgePrice');
      const visitorReprintingCostInput = await wrapper.findByTestId('project-visitorReprintingCost');

      fireEvent.change(badgePriceInput, { target: { value: '14', name: 'badgePrice' } });
      fireEvent.change(visitorBadgePriceInput, { target: { value: '12', name: 'visitorBadgePrice' } });
      fireEvent.change(visitorReprintingCostInput, { target: { value: '8', name: 'visitorReprintingCost' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.updateProject).toHaveBeenCalledWith({
      ...getProject_1(),
      status: ResourceModel.Status.ACTIVE,
      badgeBillingModel: {
        badgePrice: 14,
        isBilledPerCompany: true,
        reprintingCost: 2,
        billedCompanyId: null,
        visitorBadgePrice: 12,
        visitorReprintingCost: 8,
      },
    });
  });

  it('should fetchTimeZoneList on load', () => {
    props.timeZoneList = [];
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchTimeZoneList).toHaveBeenCalled();
  });

  it('should discard changes and close modal', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        ccv: 1,
        naeId: getFcaNae_1().id,
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    await act(async () => {
      const nameInput = await wrapper.findByTestId('project-name');

      fireEvent.change(nameInput, { target: { value: 'some name', name: 'name' } });

      const discardBtn = wrapper.getByTestId('form-dialog-discard');
      const closeBtn = wrapper.getByTestId('form-dialog-close');

      fireEvent.click(discardBtn);
      fireEvent.click(closeBtn);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show validations', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        ccv: 1,
        nae: null,
        naeId: null,
        region: null,
        regionId: null,
        category: null,
        categoryId: null,
        startDate: null,
        endDate: null,
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const generalInfoEditBtn = wrapper.getByTestId('gen-info-edit-button');

    await act(async () => {
      fireEvent.click(generalInfoEditBtn);
    });

    await act(async () => {
      const nameInput = await wrapper.findByTestId('project-name');
      const ccvInput = await wrapper.findByTestId('project-ccv');

      fireEvent.change(nameInput, { target: { value: '', name: 'name' } });
      fireEvent.change(ccvInput, { target: { value: '', name: 'ccv' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.updateProject).not.toHaveBeenCalled();
    expect(wrapper.getByText('Please enter Project Name.'));
    expect(wrapper.getByText('Please enter Category.'));
    expect(wrapper.getByText('Please enter CCV.'));
    expect(wrapper.getByText('Please enter Region.'));
    expect(wrapper.getByText('Please enter FCA NAE.'));
    expect(wrapper.getByText('Please enter Start Date.'));
    expect(wrapper.getByText('Please enter End Date.'));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should edit billing information', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        ccv: 1,
        nae: getFcaNae_1(),
        naeId: getFcaNae_1().id,
        region: getProjectRegion_1(),
        category: getProjectCategory_1(),
        badgeBillingModel: {
          badgePrice: 12,
          isBilledPerCompany: true,
          reprintingCost: 5,
          billedCompanyId: getProjectCompany_1().id,
          visitorBadgePrice: 15,
          visitorReprintingCost: 4,
        },
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const billingEditBtn = wrapper.getByTestId('billing-edit-button');

    await act(async () => {
      fireEvent.click(billingEditBtn);
    });

    await act(async () => {
      const badgePriceInput = await wrapper.findByTestId('project-badgePrice');

      fireEvent.change(badgePriceInput, { target: { value: 10, name: 'badgePrice' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.updateProject).toHaveBeenCalledWith({
      ...getProject_1(),
      badgeBillingModel: {
        badgePrice: 10,
        isBilledPerCompany: true,
        reprintingCost: 5,
        billedCompanyId: getProjectCompany_1().id,
        visitorBadgePrice: 15,
        visitorReprintingCost: 4,
      },
      nae: getFcaNae_1(),
      naeId: getFcaNae_1().id,
      region: getProjectRegion_1(),
      category: getProjectCategory_1(),
      ccv: 1,
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show billing validations', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        ccv: 1,
        nae: getFcaNae_1(),
        region: getProjectRegion_1(),
        category: getProjectCategory_1(),
        badgeBillingModel: {
          badgePrice: 12,
          isBilledPerCompany: false,
          reprintingCost: null,
          billedCompanyId: null,
        },
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const billingEditBtn = wrapper.getByTestId('billing-edit-button');

    await act(async () => {
      fireEvent.click(billingEditBtn);
    });

    await act(async () => {
      const badgePriceInput = await wrapper.findByTestId('project-badgePrice');

      fireEvent.change(badgePriceInput, { target: { value: '', name: 'badgePrice' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.updateProject).not.toHaveBeenCalled();
    expect(wrapper.getByText('Badge Price is required.'));
    expect(wrapper.getByText('Reprint Price is required.'));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show seat billing validations', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        ccv: 1,
        nae: getFcaNae_1(),
        region: getProjectRegion_1(),
        category: getProjectCategory_1(),
        billingModelType: 1,
        seatBillingModel: {
          estimatedWorkersNumber: 500,
          isFixedSeatPrice: true,
          seatPrice: null,
          billingTier: null,
          billingTierId: null,
          billedCompany: null,
          billedCompanyId: null,
          reprintingCost: null,
        },
        badgeBillingModel: {
          badgePrice: 12,
          isBilledPerCompany: true,
          reprintingCost: 5,
          billedCompanyId: getProjectCompany_1().id,
        },
        status: ResourceModel.Status.ACTIVE,
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const billingEditBtn = wrapper.getByTestId('billing-edit-button');

    await act(async () => {
      fireEvent.click(billingEditBtn);
    });

    await act(async () => {
      const estimatedWorkersInput = await wrapper.findByTestId('project-seats-estimatedWorkersNumber');

      fireEvent.change(estimatedWorkersInput, { target: { value: '', name: 'estimatedWorkersNumber' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.updateProject).not.toHaveBeenCalled();
    expect(wrapper.getByText('Estimated Workers is required.'));
    expect(wrapper.getByText('Seat Price is required.'));
    expect(wrapper.getByText('Reprint Price is required.'));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should edit addresses', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        ccv: 1,
        nae: getFcaNae_1(),
        naeId: getFcaNae_1().id,
        region: getProjectRegion_1(),
        category: getProjectCategory_1(),
        jobSiteAddress: getAddress_1(),
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const addressesEditBtn = wrapper.getByTestId('addr-edit-button');

    await act(async () => {
      fireEvent.click(addressesEditBtn);
    });

    await act(async () => {
      const line2Inputs = await wrapper.getAllByTestId('addr-line2');

      fireEvent.change(line2Inputs[0], { target: { value: 'some address', name: 'line2' } });

      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    // expect(props.updateProject).toHaveBeenCalledWith({
    //   ...getProject_1(),
    //   jobSiteAddress: {
    //     ...getAddress_1(),
    //     line2: 'some address',
    //   },
    //   ccv: 1,
    //   nae: getFcaNae_1(),
    //   naeId: getFcaNae_1().id,
    //   region: getProjectRegion_1(),
    //   category: getProjectCategory_1(),
    // });
    expect(wrapper.container).toMatchSnapshot();
  });

  // it('should show address validations', async () => {
  //   (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
  //   props.projectMap = {
  //     [getProject_1().id]: {
  //       ...getProject_1(),
  //       ccv: 1,
  //       nae: getFcaNae_1(),
  //       naeId: getFcaNae_1().id,
  //       region: getProjectRegion_1(),
  //       category: getProjectCategory_1(),
  //       jobSiteAddress: {
  //         ...AddressModel.getFallbackAddress(),
  //         line2: 'line2',
  //       },
  //     },
  //   };
  //   const wrapper = render(<ProjectDetailComponent {...props} />);

  //   const addressesEditBtn = wrapper.getByTestId('addr-edit-button');

  //   await act(async () => {
  //     fireEvent.click(addressesEditBtn);
  //   });

  //   await act(async () => {
  //     const line2Inputs = await wrapper.getAllByTestId('addr-line2');

  //     fireEvent.change(line2Inputs[0], { target: { value: '', name: 'line2' } });

  //     const saveBtn = wrapper.getByTestId('form-dialog-save');

  //     fireEvent.click(saveBtn);
  //   });

  //   expect(props.updateProject).not.toHaveBeenCalledWith();
  //   expect(wrapper.getByText('State Code is required.'));
  //   expect(wrapper.getByText('Zip Code is required.'));
  //   expect(wrapper.getByText('City is required.'));
  //   expect(wrapper.container).toMatchSnapshot();
  // });

  it('should edit certifications', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        certificationGroups: [
          {
            id: 'certificationGgroupId',
            name: 'Cert Group Name',
            validationType: 1,
            certifications: [
              { id: getCertification_1().id, name: getCertification_1().name, alias: getCertification_1().name },
              { id: getCertification_2().id, name: getCertification_2().name, alias: getCertification_2().name },
            ],
          },
        ],
        trainingGroups: [
          {
            id: 'trainingGroupId',
            name: 'Train Group Name',
            validationType: 2,
            trainings: [
              { id: getTraining_1().id, name: getTraining_1().name, alias: getTraining_1().name },
              { id: getTraining_2().id, name: getTraining_2().name, alias: getTraining_2().name },
            ],
          },
        ],
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const certificationsEditBtn = wrapper.getByTestId('certs-edit-button');

    await act(async () => {
      fireEvent.click(certificationsEditBtn);
    });

    await act(async () => {
      const aliasInput = await wrapper.getAllByTestId('item-alias');

      // Delete certification on first position
      await fireEvent.focus(aliasInput[0].querySelector('input'));
      await fireEvent.click(await wrapper.getByTestId('delete-item-button'));

      // Delete training
      await fireEvent.focus(aliasInput[2].querySelector('input'));
      await fireEvent.click(await wrapper.getByTestId('delete-item-button'));
    });

    await act(async () => {
      const saveBtn = wrapper.getByTestId('form-dialog-save');

      fireEvent.click(saveBtn);
    });

    expect(props.updateProject).toHaveBeenCalledWith({
      ...getProject_1(),
      certificationGroups: [
        {
          id: 'certificationGgroupId',
          name: 'Cert Group Name',
          validationType: 1,
          certifications: [{ id: getCertification_2().id, name: getCertification_2().name, alias: getCertification_2().name }],
        },
      ],
      trainingGroups: [
        {
          id: 'trainingGroupId',
          name: 'Train Group Name',
          validationType: 2,
          trainings: [{ id: getTraining_2().id, name: getTraining_2().name, alias: getTraining_2().name }],
        },
      ],
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render subContractor Modal', () => {
    const { container, getByTestId } = render(<ProjectDetailComponent {...props} />);

    act(() => {
      fireEvent.click(getByTestId('opensubcontractor-modal-btn'));
    });
    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.click(getByTestId('assign-btn-close'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should render User Modal', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'users' }));
    const { container, getByTestId } = render(
      <Provider
        store={
          createMockStore({
            ...getInitialState(),
            user: { ...getInitialState().user, userProjectMap: { [getProject_1().id]: { [getUser_1().id]: getUser_1() } }, count: 1 },
          }) as any
        }
      >
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(getByTestId('user-modal-open-btn'));
    });
    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.click(getByTestId('assign-btn-close'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should archive project', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        status: ResourceModel.Status.ACTIVE,
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const openArchiveBtn = wrapper.getByTestId('archive-btn');

    await act(async () => {
      fireEvent.click(openArchiveBtn);
    });

    await act(async () => {
      const confirmBtn = wrapper.getByText('Yes, Archive');

      fireEvent.click(confirmBtn);
    });

    expect(props.archiveProject).toHaveBeenCalledWith(getProject_1().id);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should unarchive project', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        status: ResourceModel.Status.ARCHIVED,
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const openArchiveBtn = wrapper.getByTestId('archive-btn');

    await act(async () => {
      fireEvent.click(openArchiveBtn);
    });

    await act(async () => {
      const confirmBtn = wrapper.getByText('Yes, Unarchive');

      fireEvent.click(confirmBtn);
    });

    expect(props.unarchiveProject).toHaveBeenCalledWith(getProject_1().id);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should close archive modal', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        status: ResourceModel.Status.ACTIVE,
      },
    };
    const wrapper = render(<ProjectDetailComponent {...props} />);

    const openArchiveBtn = wrapper.getByTestId('archive-btn');

    await act(async () => {
      fireEvent.click(openArchiveBtn);
    });

    await act(async () => {
      const closeBtn = wrapper.getByText('Close');

      fireEvent.click(closeBtn);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render ACS Modal', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'acs' }));
    const { container, getByTestId } = render(<ProjectDetailComponent {...props} />);

    act(() => {
      fireEvent.click(getByTestId('open-acs-modal-btn'));
    });
    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.click(getByTestId('form-dialog-close'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should render BPS Modal', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'bps' }));
    const { container, getByTestId } = render(<ProjectDetailComponent {...props} />);

    act(() => {
      fireEvent.click(getByTestId('open-bps-modal-btn'));
    });
    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.click(getByTestId('assign-btn-close'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should render worker Modal', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'workers' }));
    const { container, getByTestId } = render(<ProjectDetailComponent {...props} />);

    act(() => {
      fireEvent.click(getByTestId('open-worker-modal-btn'));
    });
    expect(container).toMatchSnapshot();

    act(() => {
      fireEvent.click(getByTestId('assign-btn-close'));
    });

    expect(container).toMatchSnapshot();
  });

  it('should render invoices tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'invoices' }));
    const { container } = render(<ProjectDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render visitors tab', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'visitors' }));
    const { container } = render(<ProjectDetailComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should change users page', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'users' }));
    const { getByText } = render(
      <Provider
        store={
          createMockStore({
            ...getInitialState(),
            user: { ...getInitialState().user, userProjectMap: { [getProject_1().id]: { [getUser_1().id]: getUser_1() } }, count: 16 },
          }) as any
        }
      >
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const pageItem = getByText('2');

    act(() => {
      fireEvent.click(pageItem);
    });

    act(() => {
      fireEvent.click(pageItem);
    });
  });

  it('should edit payment method', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    props.projectMap = { [getProject_1().id]: { ...getProject_1(), paymentMethod: getPaymentMethod_1() } };
    const wrapper = render(
      <Provider store={createMockStore({ ...getClientAdminInitialState(), paymentMethod: [getPaymentMethod_1(), getPaymentMethod_2()] })}>
        <MemoryRouter>
          <ProjectDetail {...props} />
        </MemoryRouter>
      </Provider>
    );

    const paymentEditBtn = wrapper.getByTestId('payment-edit-button');

    await act(async () => {
      await fireEvent.click(paymentEditBtn);
    });

    await act(async () => {
      await fireEvent.click(wrapper.getByTestId('card-item'));
    });

    await act(async () => {
      await fireEvent.click(wrapper.getByTestId('form-dialog-close'));
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should not set payment method selected if there is not', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'information' }));
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    props.projectMap = {
      [getProject_1().id]: {
        ...getProject_1(),
        paymentMethod: undefined,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore({ ...getClientAdminInitialState(), paymentMethod: [getPaymentMethod_1(), getPaymentMethod_2()] })}>
        <MemoryRouter>
          <ProjectDetailComponent {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });
});
