import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { RenderResult, render, fireEvent, act } from '@testing-library/react';

import { getWorker_1, getWorkerProject_1, getWorkerProject_2, getWorkerProject_3 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import ProjectsTab, { IProjectsTabProps } from './ProjectsTab';

describe('ProjectsTab', () => {
  let wrapper: RenderResult;
  let props: IProjectsTabProps;

  beforeEach(() => {
    props = {
      worker: getWorker_1(),
      queryParams: {} as any,
      count: 1,
      listLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      updateLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      updateBadgeDataLoading: {
        isLoading: false,
        hasError: false,
        error: undefined,
      },
      projectMap: { [getWorker_1().id]: { [getWorkerProject_1().id]: getWorkerProject_1() } },
      onPageChange: jest.fn(),
      fetchWorkerProjectList: jest.fn(),
      navigate: jest.fn(),
    };
  });

  it('should fetchWorkerCertificationList', () => {
    render(
      <MemoryRouter>
        <ProjectsTab {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkerProjectList).toHaveBeenCalledWith(getWorker_1().id, {});
  });

  it('should loading', () => {
    props.listLoading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const { container } = render(
      <MemoryRouter>
        <ProjectsTab {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render', () => {
    const { container } = render(
      <MemoryRouter>
        <ProjectsTab {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render consent form view', () => {
    props.updateLoading = undefined;
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('open-view-consent-form'));
    });

    expect(wrapper.container).toMatchSnapshot();

    act(() => {
      fireEvent.click(wrapper.getByTestId('close-consent-form'));
    });
  });

  it('should render consent form editable', () => {
    props.updateLoading = undefined;
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('open-edit-consent-form'));
    });

    expect(wrapper.container).toMatchSnapshot();

    act(() => {
      fireEvent.click(wrapper.getByTestId('close-consent-form'));
    });
  });

  it('should empty', () => {
    props.projectMap = {};
    wrapper = render(
      <MemoryRouter>
        <ProjectsTab {...props} />
      </MemoryRouter>
    );

    expect(wrapper.getByText('There are no Projects assigned')).toBeTruthy();
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should show badge modal', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('open-badge-modal'));
    });

    expect(wrapper.getByTestId('badge-title')).toBeTruthy();

    act(() => {
      fireEvent.click(wrapper.getByTestId('form-dialog-close'));
    });
  });

  it('should navigate to project detail', () => {
    wrapper = render(
      <MemoryRouter>
        <ProjectsTab {...props} />
      </MemoryRouter>
    );

    const projectButton = wrapper.getByTestId('project-list-row-open-button');

    expect(projectButton.href).toContain(`/projects/detail/${getWorkerProject_1().project.id}`);

    act(() => {
      fireEvent.click(wrapper.getByTestId('project-list-row-open-button'));
    });

    // TODO: expect right redirection
  });

  it('should change status filter', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const filterPeriodBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    expect(props.fetchWorkerProjectList).toHaveBeenCalledWith(getWorker_1().id, { status: 0 });
  });

  it('should render link that allows download scanned file if the worker is migrated', () => {
    props.projectMap = { [getWorker_1().id]: { [getWorkerProject_2().id]: getWorkerProject_2() } };
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    const fileDownloadAnchor = wrapper.getByTestId('scannedfile-download');

    expect(fileDownloadAnchor).toBeTruthy();
    expect(fileDownloadAnchor.href).toEqual('https://www.picsum.com/');
    expect(fileDownloadAnchor.title).toEqual('consent-form-aa21632f8-ca42-c6ab-251b-297264775d5c.tiff');
    expect(fileDownloadAnchor.download).toEqual('');
  });

  it('should render link that DOES NOT allow download scanned file if the worker is migrated', () => {
    props.projectMap = { [getWorker_1().id]: { [getWorkerProject_3().id]: getWorkerProject_3() } };
    wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <ProjectsTab {...props} />
        </MemoryRouter>
      </Provider>
    );
    const fileDownloadAnchor = wrapper.getByTestId('scannedfile-download');

    expect(fileDownloadAnchor).toBeTruthy();
    expect(fileDownloadAnchor.href).toBe('');
  });
});
