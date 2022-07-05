import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import IntegrationsTab from './IntegrationsTab';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../../../test/rootState';

describe('IntegrationsTab', () => {
  let props = {
    status: { isConnected: false },
    getStatusProcore: jest.fn(),
    connectProcore: jest.fn(),
    disconnectProcore: jest.fn(),
    saveProcoreLoading: undefined,
  };
  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
    expect(wrapper.getByText('Procore'));
  });

  it.skip('should show watch tutorial modal', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const watchTutorialButton = wrapper.getByTestId('watch-tutorial-button');

    fireEvent.click(watchTutorialButton);
    expect(wrapper.baseElement).toMatchSnapshot();
    expect(wrapper.getByText('Integrate with Procore'));
  });

  it.skip('should close modal', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const watchTutorialButton = wrapper.getByTestId('watch-tutorial-button');

    await act(async () => {
      await fireEvent.click(watchTutorialButton);
    });

    const watchTutorialCloseButton = wrapper.getByTestId('close-watch-tutorial');

    await act(async () => {
      await fireEvent.click(watchTutorialCloseButton);
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it.skip('should show connect modal', () => {
    props.status.isConnected = false;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const connectButton = wrapper.getByTestId('connect-button');

    fireEvent.click(connectButton);
    expect(wrapper.baseElement).toMatchSnapshot();
    expect(wrapper.getByText('Client ID'));
    expect(wrapper.getByText('Client Secret'));
    expect(wrapper.getAllByText('Connect')[0]);
  });
  it('should show disconnect button', async () => {
    props.status.isConnected = false;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const connectButtonCard = wrapper.getByTestId('connect-button');
    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });

    const clientId = wrapper.getByTestId('client-id-input');
    await act(async () => {
      fireEvent.change(clientId, { target: { name: 'clientID', value: '123' } });
    });

    const clientSecret = wrapper.getByTestId('client-secret-input');
    await act(async () => {
      fireEvent.change(clientSecret, { target: { name: 'clientSecret', value: '123' } });
    });

    const connectButton = wrapper.getByTestId('connect-procore');

    await act(async () => {
      await fireEvent.click(connectButton);
    });

    expect(props.connectProcore).toHaveBeenCalledWith({ clientID: '123', clientSecret: '123' });
  });
  it('should be able to dissmiss disconnect modal', async () => {
    props.status.isConnected = true;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const connectButton = wrapper.getByTestId('connect-button');

    await act(async () => {
      await fireEvent.click(connectButton);
    });

    const disconnectButton = wrapper.getByTestId('disconnect-button');

    await act(async () => {
      await fireEvent.keyDown(disconnectButton, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
    });

    expect(wrapper.queryByTestId('disconnect-button')).toBe(null);
  });
  it.skip('should show connect after clicking disconnect', async () => {
    props.status.isConnected = true;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const connectButtonCard = wrapper.getByTestId('connect-button');
    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });

    expect(wrapper.baseElement).toMatchSnapshot();

    const disconnectButton = wrapper.getByTestId('disconnect-button');
    await act(async () => {
      await fireEvent.click(disconnectButton);
    });

    let newProps = props;
    newProps.status.isConnected = false;
    wrapper.rerender(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...newProps} />
      </Provider>
    );

    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });
    const clientId = wrapper.getByTestId('client-id-input');
    await act(async () => {
      fireEvent.change(clientId, { target: { name: 'clientID', value: '123' } });
    });

    const clientSecret = wrapper.getByTestId('client-secret-input');
    await act(async () => {
      fireEvent.change(clientSecret, { target: { name: 'clientSecret', value: '123' } });
    });

    const connectButton = wrapper.getByTestId('connect-procore');

    await act(async () => {
      await fireEvent.click(connectButton);
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });
  it.skip('should show value changed', async () => {
    props.status.isConnected = false;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const connectButtonCard = wrapper.getByTestId('connect-button');
    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });
    const clientId = wrapper.getByTestId('client-id-input');
    await act(async () => {
      fireEvent.change(clientId, { target: { name: 'clientID', value: '123' } });
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it.skip('should submit', async () => {
    props.status.isConnected = false;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );

    const connectButtonCard = wrapper.getByTestId('connect-button');
    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });

    const connectButton = wrapper.getByTestId('connect-procore');

    await act(async () => {
      await fireEvent.click(connectButton);
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });
  it.skip('should close Connect Modal', async () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );
    const connectButtonCard = wrapper.getByTestId('connect-button');
    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });

    const closeButton = wrapper.getByTestId('close-procore');

    await act(async () => {
      await fireEvent.click(closeButton);
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it.skip('should show error Connect Modal', async () => {
    props.saveProcoreLoading = { hasError: true };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );
    const connectButtonCard = wrapper.getByTestId('connect-button');
    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });

    const connectButton = wrapper.getByTestId('connect-procore');

    await act(async () => {
      await fireEvent.click(connectButton);
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it.skip('should inputs be empty', async () => {
    props.status.isConnected = false;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <IntegrationsTab {...props} />
      </Provider>
    );
    const connectButtonCard = wrapper.getByTestId('connect-button');
    await act(async () => {
      await fireEvent.click(connectButtonCard);
    });

    const clientId = wrapper.getByTestId('client-id-input');

    await act(async () => {
      fireEvent.change(clientId, { target: { name: 'clientID', value: '123' } });
    });

    await act(async () => {
      fireEvent.change(clientId, { target: { name: 'clientID', value: '' } });
    });

    const clientSecret = wrapper.getByTestId('client-secret-input');
    await act(async () => {
      fireEvent.change(clientSecret, { target: { name: 'clientSecret', value: '321' } });
    });

    const connectButton = wrapper.getByTestId('connect-procore');

    await act(async () => {
      await fireEvent.click(connectButton);
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
