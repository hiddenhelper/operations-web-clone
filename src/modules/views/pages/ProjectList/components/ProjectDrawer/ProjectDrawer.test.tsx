import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, act, fireEvent } from '@testing-library/react';

import ProjectDrawer, { IProjectDrawerProps } from './ProjectDrawer';
import { getProject_1, getProjectCompany_1, getProjectCompany_2, getProjectCompany_5, getProject_5 } from '../../../../../../test/entities';
import { UserModel, ProjectModel } from '../../../../../models';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../test/rootState';
import { Provider } from 'react-redux';

describe('Project Drawer', () => {
  let props: IProjectDrawerProps;

  beforeEach(() => {
    props = {
      isOpen: true,
      isLoading: false,
      deleteLoading: undefined,
      project: getProject_1(),
      projectListElement: null,
      userRole: UserModel.Role.FCA_ADMIN,
      onClose: jest.fn(),
      onDelete: jest.fn(),
      navigate: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading', () => {
    props.isLoading = true;
    props.deleteLoading = { isLoading: false, error: null, hasError: false };
    const { container } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  it('should render projectOwnerList', () => {
    props.project.relatedCompanies = [getProjectCompany_5()];

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.getByTestId('projectOwnerList')).toBeTruthy();
  });
  it('should render devList', () => {
    props.project.relatedCompanies = [getProjectCompany_1()];

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.getByTestId('devList')).toBeTruthy();
  });
  it('should render gcList', () => {
    props.project.relatedCompanies = [getProjectCompany_2()];

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.getByTestId('gcList')).toBeTruthy();
  });

  it('should render Seats billing', () => {
    props.project = getProject_5();
    props.project.billingModelType = ProjectModel.BillingModelType.SEATS;

    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.getByTestId('seats-billing-type')).toBeTruthy();
  });

  it('should onDelete', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectDrawer {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('deleteProjectButton'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('confirm-button'));
    });

    expect(props.onDelete).toHaveBeenCalledWith(props.project.id);
  });
});
