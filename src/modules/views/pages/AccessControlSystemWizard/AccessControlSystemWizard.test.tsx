import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { getAccessControlSystemDevice_3 } from '../../../../test/entities';
import { getInitialState } from '../../../../test/rootState';
import { AccessControlSystemModel, DeviceModel } from '../../../models';

import AccessControlSystemWizard from './AccessControlSystemWizard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe.skip('AccessControlSystemWizard Component', () => {
  let props;

  beforeEach(() => {
    props = {
      accessControlSystemMap: { [getAccessControlSystemDevice_3().id]: getAccessControlSystemDevice_3() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      saveAccessControlSystem: jest.fn(),
      updateAccessControlSystem: jest.fn(),
      clearErrors: jest.fn(),
      fetchAccessControlSystem: jest.fn(),
      clearAccessControlSystemMap: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getAccessControlSystemDevice_3().id }));
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render fallback', () => {
    props.accessControlSystemMap = {};
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should unmount', () => {
    props.accessControlSystemMap = {};
    const { unmount } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    unmount();
    expect(props.clearErrors).toHaveBeenCalled();
    expect(props.clearAccessControlSystemMap).toHaveBeenCalled();
  });

  it('should fetchAccessControlSystem on load', () => {
    props.accessControlSystemMap = {};
    render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchAccessControlSystem).toHaveBeenCalledWith(getAccessControlSystemDevice_3().id);
  });

  it('should reset form', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const serialInput: any = wrapper.getByTestId('serialNumber');

    await act(async () => {
      await fireEvent.change(serialInput, { target: { name: 'serialNumber', value: 'abc' } });
      await fireEvent.click(wrapper.getByText('Discard Changes'));
      expect(serialInput.value).toBe('NRFFJE3149 - 4991'); // initial value
      expect(props.clearErrors).toHaveBeenCalled();
    });
  });

  it('should reset form reader 2', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const reader2Checkbox: any = wrapper.getByTestId('render-child');

    act(() => {
      fireEvent.click(reader2Checkbox);
    });
    act(() => {
      fireEvent.click(reader2Checkbox);
    });

    await act(async () => {
      expect(wrapper.container).toMatchSnapshot();
    });
  });

  it('should save access point', async () => {
    (useParams as any).mockImplementation(() => ({ id: '', step: '' }));
    props.accessControlSystemMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deviceTypeSelect: any = wrapper.getByText('Open Portal');

    await act(async () => {
      fireEvent.mouseDown(deviceTypeSelect);
    });

    await act(async () => {
      fireEvent.click(wrapper.getByText('Turnstile'));
    });

    const serialInput: any = wrapper.getByTestId('serialNumber');
    const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');
    const reader1SerialInput = wrapper.getByTestId('reader-serialNumber');
    const readerModelInput = wrapper.getByTestId('reader-model');
    const hostnameInput = wrapper.getByTestId('reader-hostname');

    await act(async () => {
      fireEvent.change(serialInput, { target: { name: 'serialNumber', value: 'NRFFJE3149 - 0000' } });
      fireEvent.change(dateInputs[2].querySelector('input'), { target: { name: 'inServiceDate', value: 'Tue, Aug 11, 2020' } });
      fireEvent.change(dateInputs[3].querySelector('input'), { target: { name: 'warrantyExpirationDate', value: 'Tue, Aug 11, 2020' } });
      fireEvent.change(dateInputs[5].querySelector('input'), { target: { name: 'inServiceDate', value: 'Tue, Aug 11, 2020' } });
    });

    await act(async () => {
      fireEvent.change(reader1SerialInput, { target: { name: 'serialNumber', value: 'NRFFJE3149 - 1111' } });
    });

    await act(async () => {
      fireEvent.change(readerModelInput, { target: { name: 'model', value: 'test' } });
    });

    await act(async () => {
      fireEvent.change(hostnameInput, { target: { name: 'hostname', value: 'test222' } });
    });

    await act(async () => {
      await fireEvent.click(wrapper.getByTestId('save-changes-btn'));
      expect(props.saveAccessControlSystem).toBeCalledWith(
        expect.objectContaining({
          id: null,
          type: AccessControlSystemModel.AccessControlSystemType.TURNSTILE,
          serialNumber: 'nrffje3149 - 0000',
          lifeCycle: 0,
          invoice: null,
          lastRefurbishedDate: null,
          lastMaintenanceDate: null,
          inServiceDate: '8/11/2020',
          warrantyExpirationDate: '8/11/2020',
          orderDate: null,
          project: null,
          status: null,
          notes: null,
          version: 0,
          vendor: null,
          reader1: expect.objectContaining({
            inServiceDate: '8/11/2020',
            model: 'test',
            serialNumber: 'nrffje3149 - 1111',
          }),
        })
      );
    });
  });

  it('should update access point', async () => {
    (useParams as any).mockImplementation(() => ({ id: getAccessControlSystemDevice_3().id, step: '' }));
    props.accessControlSystemMap[getAccessControlSystemDevice_3().id] = {
      ...getAccessControlSystemDevice_3(),
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const serialInput: any = wrapper.getByTestId('serialNumber');
    const hostnameInput = wrapper.getByTestId('reader-hostname');

    await act(async () => {
      await fireEvent.change(serialInput, { target: { name: 'serialNumber', value: 'NRFFJE3149 - 0000' } });
      fireEvent.change(hostnameInput, { target: { name: 'hostname', value: 'test222' } });
      await fireEvent.click(wrapper.getByText('Save Changes'));
      expect(props.updateAccessControlSystem).toHaveBeenCalledWith({
        id: '13315742-0a3a-4916-af26-e983632a6484',
        deviceName: 'Test turnstile',
        type: AccessControlSystemModel.AccessControlSystemType.TURNSTILE,
        serialNumber: 'nrffje3149 - 0000',
        lifeCycle: 0,
        lastRefurbishedDate: 1589883810049 as any,
        lastMaintenanceDate: 1589883810049 as any,
        inServiceDate: 1589883810049 as any,
        warrantyExpirationDate: 1589883810049 as any,
        project: {
          id: 'acsId',
          name: 'Orlando International Airport',
        },
        status: DeviceModel.DeviceStatus.AVAILABLE,
        notes: 'Working Properly',
        version: AccessControlSystemModel.AccessControlSystemVersion.V3_FACIAL,
        location: {
          id: 'locationId',
          name: 'Back gate',
        },
        reader1: {
          serialNumber: 'mxt-nekfoefj31293',
          lastMaintenanceDate: 1589883810049 as any,
          inServiceDate: 1589883810049 as any,
          model: 'Model 4923',
          notes: 'Working properly as well.',
          hostname: 'test222',
          directionType: null,
          hostAddress: null,
          httpConnectionPort: 0,
          sshConnectionPort: 0,
          tcpConnectionPort: 0,
          telnetConnectionPort: 0,
        },
        reader2: null,
      });
    });
  });

  it('should save handheld', async () => {
    (useParams as any).mockImplementation(() => ({ id: '', step: '' }));
    props.accessControlSystemMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deviceTypeSelect: any = wrapper.getByText('Open Portal');

    await act(async () => {
      fireEvent.mouseDown(deviceTypeSelect);
    });

    await act(async () => {
      fireEvent.click(wrapper.getByText('Handheld'));
    });

    const serialInput: any = wrapper.getByTestId('serialNumber');
    const dateInputs = wrapper.getAllByTestId('keyboard-date-picker');

    await act(async () => {
      fireEvent.change(serialInput, { target: { name: 'serialNumber', value: 'NRFFJE3149 - 0000' } });
      fireEvent.change(dateInputs[1].querySelector('input'), { target: { name: 'inServiceDate', value: 'Tue, Aug 11, 2020' } });
      fireEvent.change(dateInputs[3].querySelector('input'), { target: { name: 'warrantyExpirationDate', value: 'Tue, Aug 11, 2020' } });
    });

    await act(async () => {
      await fireEvent.click(wrapper.getByTestId('save-changes-btn'));
      expect(props.saveAccessControlSystem).toBeCalledWith(
        expect.objectContaining({
          id: null,
          type: AccessControlSystemModel.AccessControlSystemType.HANDHELD,
          serialNumber: 'nrffje3149 - 0000',
          lifeCycle: 0,
          invoice: null,
          lastRefurbishedDate: null,
          lastMaintenanceDate: null,
          inServiceDate: '8/11/2020',
          warrantyExpirationDate: '8/11/2020',
          orderDate: null,
          project: null,
          status: null,
          notes: null,
          version: 0,
          vendor: null,
          hasReverseInstallation: false,
          reader1: {
            directionType: null,
            httpConnectionPort: 0,
            sshConnectionPort: 0,
            tcpConnectionPort: 0,
            telnetConnectionPort: 0,
          },
          reader2: null,
        })
      );
    });
  });

  it('should render server errors', () => {
    props.loading.error = {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'One or more validation errors occurred.',
      status: 400,
      traceId: '|7952db37-4929e25babbabf98.',
      errors: {
        serialNumber: ['serial number is invalid.'],
        'reader1.serialNumber': ['serial number is invalid'],
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show validations', () => {
    (useParams as any).mockImplementation(() => ({ id: '', step: '' }));
    props.accessControlSystemMap = {};
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const deviceTypeSelect: any = wrapper.getByText('Open Portal');

    act(() => {
      fireEvent.mouseDown(deviceTypeSelect);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Turnstile'));
    });

    const notesInput: any = wrapper.getByTestId('acs-notes');

    act(() => {
      fireEvent.change(notesInput, { target: { name: 'notes', value: 'Something' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
      expect(props.saveAccessControlSystem).not.toBeCalled();
    });
  });

  it('should NOT navigate when loading and click away', async () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <Link to={{ pathname: '/projects', state: { success: true } }} data-testid="link-to-another" />
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('link-to-another'));
    });

    expect(window.location.pathname).toEqual(expect.not.stringContaining('/projects'));
  });

  it('should NOT navigate when loading and click away', async () => {
    props.loading = {
      isLoading: true,
      hasError: false,
      error: undefined,
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <Link to={{ pathname: '/projects', state: { success: true } }} data-testid="link-to-another" />
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('link-to-another'));
    });

    expect(window.location.pathname).toEqual(expect.not.stringContaining('/projects'));
  });

  it('should render dialog when moves away from ACS flow', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <Link to="/projects" data-testid="link-to-another" />
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const serialInput: any = wrapper.getByTestId('serialNumber');

    act(() => {
      fireEvent.change(serialInput, { target: { name: 'serialNumber', value: 'some value' } });
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

  it('should change reader 2', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const reader2Checkbox = wrapper.getByTestId('render-child');

    act(() => {
      fireEvent.click(reader2Checkbox);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    const readerSerialInput = wrapper.getAllByTestId('reader-serialNumber');

    act(() => {
      fireEvent.change(readerSerialInput[1], { target: { name: 'serialNumber', value: 'NRFFJE3149 - 1111' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    expect(props.saveAccessControlSystem).not.toHaveBeenCalled();
  });

  it('should validate when reader 2 is checked', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <MemoryRouter>
          <AccessControlSystemWizard {...props} />
        </MemoryRouter>
      </Provider>
    );

    const reader2Checkbox = wrapper.getByTestId('render-child');

    act(() => {
      fireEvent.click(reader2Checkbox);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('save-changes-btn'));
    });

    expect(wrapper.getAllByText('Hostname is required.').length).toEqual(2);
  });
});
