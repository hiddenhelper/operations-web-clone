import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import { getDefaultLoading, getPaymentMethod_1, getProject_1 } from '../../../../test/entities';
import { getClientAdminInitialState } from '../../../../test/rootState';
import ProjectInvitation, { IProjectInvitationProps } from './ProjectInvitation';
import { GENERAL } from '../../../../constants';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('ProjectInvitation', () => {
  let props: IProjectInvitationProps;

  beforeEach(() => {
    props = {
      projectMap: { [getProject_1().id]: getProject_1() },
      acceptLoading: getDefaultLoading(),
      fetchProject: jest.fn(),
      acceptProjectInvitation: jest.fn(),
      clearPayment: jest.fn(),
      navigate: jest.fn(),
    };
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: '' }));
  });

  it('should fetchProject', () => {
    props.projectMap = {};
    render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(props.fetchProject).toHaveBeenCalledWith(getProject_1().id);
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should unMount', () => {
    const wrapper = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.unmount();
    expect(props.clearPayment).toHaveBeenCalled();
  });

  it('should show loading button', () => {
    props.acceptLoading = { isLoading: true, hasError: false, error: null };
    const { container, getByText } = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(getByText('Accepting...'));
    expect(container).toMatchSnapshot();
  });

  it('should render alternative service agreement form', () => {
    const { container } = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render payment settings step', () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'payment-settings' }));
    const { container } = render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should accept project', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'payment-settings' }));
    const wrapper = render(
      <Provider store={createMockStore({ ...getClientAdminInitialState(), payment: { paymentMethod: [getPaymentMethod_1()] } })}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      await fireEvent.click(wrapper.getByTestId('card-item'));
    });

    await act(async () => {
      await fireEvent.click(wrapper.getByText('Accept Project'));
    });

    expect(props.acceptProjectInvitation).toHaveBeenCalled();
  });

  it('should navigate to payment settings', async () => {
    const wrapper = render(
      <Provider store={createMockStore({ ...getClientAdminInitialState(), payment: { paymentMethod: [getPaymentMethod_1()] } })}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      await fireEvent.click(wrapper.getByTestId('service-agreement-accept'));
    });

    await act(async () => {
      await fireEvent.click(wrapper.getByText('Go to Payment Method'));
    });

    expect(props.navigate).toHaveBeenCalled();
  });

  it('should show payment settings loading', async () => {
    props.projectMap = { [getProject_1().id]: { ...getProject_1() } };
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'payment-settings' }));
    const wrapper = render(
      <Provider
        store={createMockStore({
          ...getClientAdminInitialState(),
          general: { loadingMap: { [GENERAL.LOADING_KEY.FETCH_PAYMENT_METHODS]: { isLoading: true, hasError: false, error: null } } },
        })}
      >
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should redirect when no service agreement accepted', async () => {
    (useParams as any).mockImplementation(() => ({ id: getProject_1().id, step: 'payment-settings' }));
    props.projectMap = { [getProject_1().id]: { ...getProject_1(), companyHasCreditCard: false } };
    render(
      <Provider store={createMockStore(getClientAdminInitialState())}>
        <MemoryRouter>
          <ProjectInvitation {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(props.navigate).toHaveBeenCalledWith(`/projects/invitation/${getProject_1().id}`);
  });
});
