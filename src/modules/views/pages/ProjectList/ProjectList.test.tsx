import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';

import ProjectList, { IProjectListProps } from './ProjectList';
import {
  getProject_1,
  getProject_2,
  getProject_3,
  getProject_4,
  getProjectCategory_1,
  getProjectCompany_1,
  getProjectCompany_2,
  getProjectRegion_1,
  getProjectStatistics_1,
  getInvoiceStatistics_1,
} from '../../../../test/entities';
import { getAdminInitialState, getClientAdminInitialState } from '../../../../test/rootState';
import { ProjectModel, UserModel } from '../../../models';

describe('ProjectList Component', () => {
  let props: IProjectListProps;

  beforeEach(() => {
    props = {
      userRole: UserModel.Role.FCA_ADMIN,
      projectMap: {
        [getProject_1().id]: getProject_1(),
        [getProject_2().id]: getProject_2(),
        [getProject_4().id]: getProject_4(),
        [getProject_3().id]: getProject_3(),
      },
      projectCount: 17,
      projectStatistics: getProjectStatistics_1(),
      invoiceStatistics: getInvoiceStatistics_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      listLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      deleteLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      statisticsLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      currentFilter: 'draft',
      fetchProjectList: jest.fn(),
      fetchProjectSummary: jest.fn(),
      fetchProjectStatistics: jest.fn(),
      fetchInvoiceStatistics: jest.fn(),
      clearProjectStatistics: jest.fn(),
      clearInvoiceStatistics: jest.fn(),
      clearProjectMap: jest.fn(),
      deleteProject: jest.fn(),
      navigate: jest.fn(),
      updateCurrentFilter: jest.fn(),
    };
  });

  it.skip('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetchProjectList when FCA_ADMIN', () => {
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectList).toHaveBeenCalled();
  });

  it('should fetchInvoiceStatistics when NOT FC_ADMIN', () => {
    props.userRole = UserModel.Role.CLIENT_ADMIN;
    props.invoiceStatistics = undefined;
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchInvoiceStatistics).toHaveBeenCalled();
  });

  it.skip('should render loading', () => {
    props.loading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should clearProjectMap', () => {
    const { unmount } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearProjectMap).toHaveBeenCalled();
  });

  it.skip('should render drawer', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRowOne = wrapper.getAllByTestId('project-list-row')[0];
    const projectRowTwo = wrapper.getAllByTestId('project-list-row')[2];
    const closeBtn = wrapper.getByTestId('drawer-close-btn');
    const projectDrawerDetail = wrapper.getByTestId('project-drawer-detail');

    act(() => {
      fireEvent.click(projectRowOne);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.fetchProjectSummary).toHaveBeenCalledWith(getProject_1().id);

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(projectDrawerDetail.classList).toContain('closed');

    act(() => {
      fireEvent.click(projectRowTwo);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.fetchProjectSummary).toHaveBeenCalledWith(getProject_4().id);
  });

  it.skip('should show alternative values in project drawer', () => {
    props.projectMap = {
      ...props.projectMap,
      [getProject_1().id]: {
        ...getProject_1(),
        relatedCompanies: [getProjectCompany_1(), getProjectCompany_2()],
        category: getProjectCategory_1(),
        ccv: '$213,192,324.12' as any,
        region: getProjectRegion_1(),
        billingModelType: 1,
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRow = wrapper.getAllByTestId('project-list-row')[0];

    act(() => {
      fireEvent.click(projectRow);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.fetchProjectSummary).toHaveBeenCalledWith(getProject_1().id);
  });

  it.skip('should not show related companies if null', () => {
    props.projectMap = {
      ...props.projectMap,
      [getProject_1().id]: { ...getProject_1(), relatedCompanies: null },
    };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRow = wrapper.getAllByTestId('project-list-row')[0];

    act(() => {
      fireEvent.click(projectRow);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.fetchProjectSummary).toHaveBeenCalledWith(getProject_1().id);
  });

  it('should change filter option', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterOptList = wrapper.getAllByTestId('filter-status-opt')[2];

    act(() => {
      filterOptList.click();
    });

    const isPresentActiveFilter = Object.values(filterOptList.classList).filter(item => item.indexOf('activeFilter') > 1);
    expect(isPresentActiveFilter).toHaveLength(1);
  });

  it.skip('should change page', () => {
    props.projectCount = 17;
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchProjectList).toHaveBeenCalledWith({
      filter: 'draft',
      limit: 15,
      page: 1,
      status: 0,
      period: '',
      timeZoneOffset: '-07:00',
    });

    const pageBtn = wrapper.getByText('2');

    act(() => {
      pageBtn.click();
    });

    expect(props.fetchProjectList).toHaveBeenCalledWith({
      filter: 'draft',
      limit: 15,
      page: 2,
      status: 0,
      period: '',
      timeZoneOffset: '-07:00',
    });
  });

  it.skip('should change state filter', () => {
    props.projectCount = 17;
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchProjectList).toHaveBeenCalledWith({
      filter: 'draft',
      limit: 15,
      page: 1,
      status: 0,
      period: '',
      timeZoneOffset: '-07:00',
    });

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getByTestId('autocomplete-filter-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    expect(props.fetchProjectList).toHaveBeenCalledWith({
      filter: 'draft',
      limit: 15,
      page: 1,
      status: 0,
      stateCode: 'AZ',
      period: '',
      timeZoneOffset: '-07:00',
    });
  });

  it.skip('should change period filter', () => {
    props.projectCount = 17;
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchProjectList).toHaveBeenCalledWith({
      filter: 'draft',
      limit: 15,
      page: 1,
      status: 0,
      period: '',
      timeZoneOffset: '-07:00',
    });

    const filterPeriodBtn = wrapper.getAllByTestId('button-filter-open')[1];

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    expect(props.fetchProjectList).toHaveBeenCalledWith({
      filter: 'draft',
      limit: 15,
      page: 1,
      status: 0,
      period: 0,
      timeZoneOffset: '-07:00',
    });
  });

  it('should close drawer on navigate away', () => {
    props.projectCount = 17;

    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRowOne = wrapper.getAllByTestId('project-list-row')[0];
    const pageBtn = wrapper.getByText('2');
    const projectDrawerDetail = wrapper.getByTestId('project-drawer-detail');

    act(() => {
      fireEvent.click(projectRowOne);
    });

    act(() => {
      pageBtn.click();
    });

    expect(projectDrawerDetail.classList).toContain('closed');
  });

  it('should navigate to project wizard', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRow = wrapper.getAllByTestId('project-list-row')[0];

    act(() => {
      fireEvent.click(projectRow);
    });

    const drawerButton = wrapper.getByTestId('drawerProjectButton');

    expect(drawerButton.href).toContain(`/projects/wizard/${getProject_1().id}`);

    act(() => {
      fireEvent.click(drawerButton);
    });

    // TODO: validate redirection
  });

  it.skip('should delete project', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRow = wrapper.getAllByTestId('project-list-row')[0];

    act(() => {
      fireEvent.click(projectRow);
    });

    const deleteButton = wrapper.getByTestId('deleteProjectButton');

    act(() => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = wrapper.getByTestId('confirm-button');

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.deleteProject).toHaveBeenCalled();
  });

  it.skip('should delete last project in page', () => {
    props.projectMap = { [getProject_1().id]: getProject_1() };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter initialEntries={['?page=2']}>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectRow = wrapper.getAllByTestId('project-list-row')[0];

    act(() => {
      fireEvent.click(projectRow);
    });

    const deleteButton = wrapper.getByTestId('deleteProjectButton');

    act(() => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = wrapper.getByTestId('confirm-button');

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(wrapper.container).toMatchSnapshot();
    expect(props.deleteProject).toHaveBeenCalled();
  });

  it.skip('should show loading list', () => {
    props.listLoading = { isLoading: true, error: null, hasError: false };
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Loading...'));
  });

  it.skip('should hide elements based on role', () => {
    props.userRole = UserModel.Role.CLIENT_ADMIN;

    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should navigate to create Project device', () => {
    const wrapper = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const createProjectButton = wrapper.getByTestId('create-project-btn');

    fireEvent.click(createProjectButton);

    expect(props.navigate).toHaveBeenCalledWith('/projects/wizard/new');
  });

  it('should navigate to project information', () => {
    props.projectMap = { [getProject_1().id]: { ...getProject_1(), companyProjectStatus: ProjectModel.CompanyProjectStatus.PENDING } };
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter initialEntries={['?filter=my-projects']}>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );

    const projectInformationButton = wrapper.getByTestId('project-list-banner-open-button');

    fireEvent.click(projectInformationButton);

    expect(props.navigate).toHaveBeenCalledWith(`/projects/invitation/${getProject_1().id}`);
  });

  it.skip('should show loading widgets', () => {
    props.statisticsLoading.isLoading = true;
    const { container } = render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetch project statistics', () => {
    props.projectStatistics = null;
    render(
      <Provider store={createMockStore(getAdminInitialState())}>
        <MemoryRouter>
          <ProjectList {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProjectStatistics).toHaveBeenCalled();
  });
});
