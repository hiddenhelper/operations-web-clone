import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProcoreMapping, { IProcoreMappingProps } from './ProcoreMapping';
import { getClient_1, getDefaultLoading } from '../../../../test/entities';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Procore Mapping', () => {
  let props: IProcoreMappingProps;

  beforeEach(() => {
    props = {
      clientMap: { [getClient_1().id]: getClient_1() },
      clientLoading: getDefaultLoading(),
      procoreSaveReportFrequencyLoading: getDefaultLoading(),
      fetchClient: jest.fn(),
      fetchProcoreReportFrequency: jest.fn(),
      saveProcoreReportFrequency: jest.fn(),
      procoreReportFrequency: 1,
    };
    (useParams as any).mockImplementation(() => ({ id: '123' }));
  });

  it('should render empty with the project tabs', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProcoreMapping {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should display an action button to edit updates rate', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProcoreMapping {...props} />
        </MemoryRouter>
      </Provider>
    );
    const buttonSaveInitial = await wrapper.findByTestId('action-configure-report-frequency-container');
    expect(buttonSaveInitial).not.toBeNull();
  });

  it('should open a modal to change the edit the update hourly rate ', async () => {
    expect(true);
  });

  it('should change the selector field ', async () => {
    expect(true);
  });

  it('should render empty with the vendors tabs', () => {
    (useParams as any).mockImplementation(() => ({ id: '123', step: 'vendors' }));
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <ProcoreMapping {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
