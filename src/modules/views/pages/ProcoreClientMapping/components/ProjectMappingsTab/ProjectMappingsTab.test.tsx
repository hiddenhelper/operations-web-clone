import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getDefaultLoading } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import ProjectMappingsTab, { IProjectMappingsTabProps } from './ProjectMappingsTab';
import { ProcoreMappingStatus } from '../../../../../models/procore';
import { act } from 'react-dom/test-utils';

const MockProjectMappings = {
  clientId: '123',
  mappings: {
    clientId: '123',
    pageNumber: 1,
    pageSize: 2,
    totalResults: 2,
    items: [
      {
        project: {
          id: 'f3-abf0-9dc9978ed6a4-1',
          name: '45 Park Place',
        },
        mappingStatus: ProcoreMappingStatus.NO,
        procoreProjectId: null,
      },
      {
        project: {
          id: 'f3-abf0-9dc9978ed6a4-2',
          name: '55 Hudson Yards',
        },
        mappingStatus: ProcoreMappingStatus.SUGGESTED,
        procoreProjectId: 'f3-abf0-9dc9978ed6a4-3',
      },
    ],
  },
};

const MockProjects = {
  clientId: '123',
  projects: {
    pageNumber: 1,
    pageSize: 2,
    totalResults: 2,
    clientId: '123',
    items: [
      {
        id: 'f3-abf0-9dc9978ed6a4-2',
        name: '45 Park Place',
      },
      {
        id: 'f3-abf0-9dc9978ed6a4-3',
        name: '55 Hudson Yards',
      },
    ],
  },
};

describe('Procore Projects Mapping Tab', () => {
  let props: IProjectMappingsTabProps;

  beforeEach(() => {
    props = {
      clientId: '123',
      procoreProjectsLoading: getDefaultLoading(),
      procoreProjectMappingsLoading: getDefaultLoading(),
      procoreProjectMappingsSaving: getDefaultLoading(),
      procoreSaveReportFrequencyLoading: getDefaultLoading(),
      procoreReportFrequency: 0,
      procoreProjects: MockProjects,
      procoreProjectMappings: MockProjectMappings,
      fetchProcoreProjects: jest.fn(),
      fetchProcoreProjectMappings: jest.fn(),
      saveProcoreProjectMappings: jest.fn(),
      fetchProcoreReportFrequency: jest.fn(),
      saveProcoreReportFrequency: jest.fn(),
    };
  });

  it('should render empty', () => {
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectMappingsTab {...{ ...props, procoreProjects: undefined, procoreProjectMappings: undefined }} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchProcoreProjectMappings).toHaveBeenLastCalledWith('123');
    expect(props.fetchProcoreProjects).toHaveBeenLastCalledWith('123');
  });

  it('should trasnsform save data', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectMappingsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const buttonSave = await wrapper.findByTestId('save-mapping-btn');
    await act(async () => {
      fireEvent.click(buttonSave);
    });

    expect(props.saveProcoreProjectMappings).toHaveBeenLastCalledWith('123', [
      {
        procoreProjectId: 'f3-abf0-9dc9978ed6a4-3',
        projectId: 'f3-abf0-9dc9978ed6a4-2',
        isDisabled: false,
      },
    ]);
  });

  it('should render loading', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectMappingsTab {...{ ...props, procoreProjectMappingsLoading: { isLoading: true, hasError: false, error: undefined } }} />
        </MemoryRouter>
      </Provider>
    );

    getByText('Loading...');
  });

  it('should render loading error', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProjectMappingsTab {...{ ...props, procoreProjectMappingsLoading: { isLoading: false, hasError: true, error: undefined } }} />
        </MemoryRouter>
      </Provider>
    );

    getByText('Error while loading Procore Data...');
  });
});
