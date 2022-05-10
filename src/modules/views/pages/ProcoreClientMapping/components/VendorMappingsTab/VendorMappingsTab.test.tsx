import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getDefaultLoading } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import VendorMappingsTab, { IVendorMappingsTabProps } from './VendorMappingsTab';
import { ProcoreMappingStatus } from '../../../../../models/procore';
import { act } from 'react-dom/test-utils';

const MockVendorMappings = {
  clientId: '123',
  mappings: {
    pageNumber: 1,
    pageSize: 2,
    totalResults: 2,
    items: [
      {
        company: {
          id: 'f3-abf0-9dc9978ed6a4-1',
          name: '45 Park Place',
          taxpayerIdentificationNumber: null,
        },
        mappingStatus: ProcoreMappingStatus.NO,
        procoreVendorId: null,
      },
      {
        company: {
          id: 'f3-abf0-9dc9978ed6a4-2',
          name: '55 Hudson Yards',
          taxpayerIdentificationNumber: null,
        },
        mappingStatus: ProcoreMappingStatus.SUGGESTED,
        procoreVendorId: 'f3-abf0-9dc9978ed6a4-3',
      },
    ],
  },
};

const MockVendors = {
  clientId: '123',
  vendors: {
    pageNumber: 1,
    pageSize: 2,
    totalResults: 2,
    items: [
      {
        id: 'f3-abf0-9dc9978ed6a4-2',
        name: '45 Park Place',
        taxpayerIdentificationNumber: 'TPIN: 12-4774870',
      },
      {
        id: 'f3-abf0-9dc9978ed6a4-3',
        name: '55 Hudson Yards',
        taxpayerIdentificationNumber: null,
      },
    ],
  },
};

describe('Procore Vendors Mapping Tab', () => {
  let props: IVendorMappingsTabProps;

  beforeEach(() => {
    props = {
      clientId: '123',
      procoreVendorsLoading: getDefaultLoading(),
      procoreVendorMappingsLoading: getDefaultLoading(),
      procoreVendorMappingsSaving: getDefaultLoading(),
      procoreSaveReportFrequencyLoading: getDefaultLoading(),
      procoreVendors: MockVendors,
      procoreVendorMappings: MockVendorMappings,
      fetchProcoreVendors: jest.fn(),
      fetchProcoreVendorMappings: jest.fn(),
      saveProcoreVendorMappings: jest.fn(),
      saveProcoreReportFrequency: jest.fn(),
      fetchProcoreReportFrequency: jest.fn(),
      procoreReportFrequency: 1,
    };
  });

  it('should render empty', () => {
    render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VendorMappingsTab {...{ ...props, procoreVendors: undefined, procoreVendorMappings: undefined }} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.fetchProcoreVendorMappings).toHaveBeenLastCalledWith('123');
    expect(props.fetchProcoreVendors).toHaveBeenLastCalledWith('123');
  });

  it('should trasnsform save data', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VendorMappingsTab {...props} />
        </MemoryRouter>
      </Provider>
    );

    const buttonSave = await wrapper.findByTestId('save-mapping-btn');
    await act(async () => {
      fireEvent.click(buttonSave);
    });

    expect(props.saveProcoreVendorMappings).toHaveBeenLastCalledWith('123', [
      {
        procoreVendorId: 'f3-abf0-9dc9978ed6a4-3',
        vendorCompanyId: 'f3-abf0-9dc9978ed6a4-2',
        isDisabled: false,
      },
    ]);
  });

  it('should render loading', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VendorMappingsTab {...{ ...props, procoreVendorMappingsLoading: { isLoading: true, hasError: false, error: undefined } }} />
        </MemoryRouter>
      </Provider>
    );

    getByText('Loading...');
  });

  it('should render loading error', () => {
    const { getByText } = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <MemoryRouter>
          <VendorMappingsTab {...{ ...props, procoreVendorMappingsLoading: { isLoading: false, hasError: true, error: undefined } }} />
        </MemoryRouter>
      </Provider>
    );

    getByText('Error while loading Procore Data...');
  });
});
