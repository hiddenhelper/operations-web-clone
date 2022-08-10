import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { getBadgePrinterSystem_1 } from '../../../../test/entities';
import { getInitialState } from '../../../../test/rootState';

import BadgePrinterSystemWizard, { IBadgePrintingSystemWizardProps } from './BadgePrinterSystemWizard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe.skip('BadgePrinterSystemWizard Component', () => {
  let props: IBadgePrintingSystemWizardProps;

  beforeEach(() => {
    props = {
      badgePrinterSystemMap: { [getBadgePrinterSystem_1().id]: getBadgePrinterSystem_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      saveBadgePrinterSystem: jest.fn(),
      updateBadgePrinterSystem: jest.fn(),
      fetchBadgePrinterSystem: jest.fn(),
      clearBadgePrinterSystemMap: jest.fn(),
      clearErrors: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getBadgePrinterSystem_1().id }));
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render fallback', () => {
    props.badgePrinterSystemMap = {};
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should unmount', () => {
    props.badgePrinterSystemMap = {};
    const { unmount } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearErrors).toHaveBeenCalled();
    expect(props.clearBadgePrinterSystemMap).toHaveBeenCalled();
  });

  it('should fetchBadgePrinterSystem on load', () => {
    props.badgePrinterSystemMap = {};
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchBadgePrinterSystem).toHaveBeenCalledWith(getBadgePrinterSystem_1().id);
  });

  it('should reset', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const printerSerialNumber: any = wrapper.getByTestId('bps-printer-serialNumber');

    act(() => {
      fireEvent.change(printerSerialNumber, { target: { name: 'serialNumber', value: 'abc' } });
    });
    act(() => {
      fireEvent.click(wrapper.getByText('Discard Changes'));
    });

    expect(printerSerialNumber.value).toBe(getBadgePrinterSystem_1().printer.serialNumber);
    expect(props.clearErrors).toHaveBeenCalled();
  });

  it('should save', () => {
    (useParams as any).mockImplementation(() => ({ id: '' }));
    props.badgePrinterSystemMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    // const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');

    const bpsName = wrapper.getByTestId('bps-name');
    const printerModel = wrapper.getByTestId('bps-printer-model');
    const printerSerialNumber = wrapper.getByTestId('bps-printer-serialNumber');
    const printerTypeSelect = wrapper.getByText('Select Option');
    const laptopModel = wrapper.getByTestId('bps-laptop-model');
    const laptopSerialNumber = wrapper.getByTestId('bps-laptop-serialNumber');
    const scannerModel = wrapper.getByTestId('bps-scanner-model');
    const scannerSerialNumber = wrapper.getByTestId('bps-scanner-serialNumber');

    act(() => {
      fireEvent.change(bpsName, { target: { name: 'name', value: 'bps name' } });
    });
    act(() => {
      fireEvent.change(printerModel, { target: { name: 'model', value: 'printer model' } });
    });
    act(() => {
      fireEvent.change(laptopModel, { target: { name: 'model', value: 'laptop model' } });
    });
    act(() => {
      fireEvent.change(scannerModel, { target: { name: 'model', value: 'scanner model' } });
    });
    act(() => {
      fireEvent.change(printerSerialNumber, { target: { name: 'serialNumber', value: 'SERIAL 1' } });
    });
    act(() => {
      fireEvent.change(laptopSerialNumber, { target: { name: 'serialNumber', value: 'SERIAL 2' } });
    });
    act(() => {
      fireEvent.change(scannerSerialNumber, { target: { name: 'serialNumber', value: 'SERIAL 3' } });
    });
    // act(() => {
    //   fireEvent.change(dateInputs[1].querySelector('input'), { target: { name: 'inServiceDate', value: 'Tue, Aug 11, 2020' } });
    // });
    // act(() => {
    //   fireEvent.change(dateInputs[2].querySelector('input'), { target: { name: 'warrantyExpirationDate', value: 'Tue, Aug 11, 2020' } });
    // });
    // act(() => {
    //   fireEvent.change(dateInputs[5].querySelector('input'), { target: { name: 'warrantyExpirationDate', value: 'Tue, Aug 11, 2020' } });
    // });
    // act(() => {
    //   fireEvent.change(dateInputs[6].querySelector('input'), { target: { name: 'warrantyExpirationDate', value: 'Tue, Aug 11, 2020' } });
    // });
    // act(() => {
    //   fireEvent.change(dateInputs[7].querySelector('input'), { target: { name: 'warrantyExpirationDate', value: 'Tue, Aug 11, 2020' } });
    // });
    // act(() => {
    //   fireEvent.change(dateInputs[8].querySelector('input'), { target: { name: 'inServiceDate', value: 'Tue, Aug 11, 2020' } });
    // });
    act(() => {
      fireEvent.mouseDown(printerTypeSelect);
    });
    act(() => {
      fireEvent.click(wrapper.getByText('Zebra'));
    });
    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    // expect(props.saveBadgePrinterSystem).toBeCalledWith({
    //   id: null,
    //   notes: null,
    //   name: 'bps name',
    //   shippingDate: null,
    //   project: null,
    //   laptop: {
    //     id: null,
    //     price: null,
    //     vendor: null,
    //     orderDate: null,
    //     invoice: null,
    //     model: 'laptop model',
    //     inServiceDate: expect.any(Object),
    //     warrantyExpirationDate: expect.any(Object),
    //     serialNumber: 'SERIAL 2',
    //     notes: null,
    //     osVersion: null,
    //   },
    //   printer: {
    //     id: null,
    //     price: null,
    //     vendor: null,
    //     orderDate: null,
    //     invoice: null,
    //     model: 'printer model',
    //     inServiceDate: expect.any(Object),
    //     warrantyExpirationDate: expect.any(Object),
    //     serialNumber: 'SERIAL 1',
    //     notes: null,
    //     lastMaintenanceDate: null,
    //     type: 0,
    //   },
    //   scanner: {
    //     id: null,
    //     price: null,
    //     vendor: null,
    //     orderDate: null,
    //     invoice: null,
    //     model: 'scanner model',
    //     inServiceDate: expect.any(Object),
    //     warrantyExpirationDate: expect.any(Object),
    //     serialNumber: 'SERIAL 3',
    //     notes: null,
    //   },
    // });
  });

  it('should update', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const bpsName = wrapper.getByTestId('bps-name');

    act(() => {
      fireEvent.change(bpsName, { target: { name: 'name', value: 'new name' } });
    });
    act(() => {
      fireEvent.click(wrapper.getByText('Save Changes'));
    });

    expect(props.updateBadgePrinterSystem).toHaveBeenCalledWith({
      ...getBadgePrinterSystem_1(),
      name: 'new name',
    });
  });

  it('should render dialog when moves away from ACS flow', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <Link to="/projects" data-testid="link-to-another" />
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const serialInput: any = wrapper.getByTestId('bps-name');

    act(() => {
      fireEvent.change(serialInput, { target: { name: 'name', value: 'new bps name' } });
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

  it('should NOT navigate when loading and click away', () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <Link to={{ pathname: '/projects', state: { success: true } }} data-testid="link-to-another" />
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('link-to-another'));
    });

    expect(window.location.pathname).toEqual(expect.not.stringContaining('/projects'));
  });

  it('should render server errors', () => {
    props.loading.error = {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|7952db37-4929e25babbabf98.',
      errors: {
        bpsName: ['BPS Name is required.'],
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show validations', () => {
    (useParams as any).mockImplementation(() => ({ id: '' }));
    props.badgePrinterSystemMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <BadgePrinterSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const bpsNameInput: any = wrapper.getByTestId('bps-notes');

    act(() => {
      fireEvent.change(bpsNameInput, { target: { name: 'notes', value: 'some note' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    act(() => {
      expect(props.saveBadgePrinterSystem).not.toBeCalled();
    });
  });
});
