import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { render, act, fireEvent } from '@testing-library/react';

import Profile, { IProfile } from './Profile';
import { getAdminInitialState } from '../../../../../test/rootState';
import { getAccount_1 } from '../../../../../test/entities';

describe('Profile', () => {
  let wrapper;
  let props: IProfile;

  beforeEach(() => {
    props = {
      hasChanges: false,
      errors: {},
      model: getAccount_1(),
      account: getAccount_1(),
      loading: false,
      formRules: {
        firstName: { required: true },
      },
      onChangew: jest.fn(),
      onDiscard: jest.fn(),
      onSubmit: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <Profile {...props} />
      </Provider>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render', () => {
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <Profile {...props} />
      </Provider>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should show validations', () => {
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <Profile {...props} />
      </Provider>
    );
    const nameInput = wrapper.getByTestId('profile-first-name');

    act(() => {
      fireEvent.change(nameInput, { target: { name: 'firstName', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('confirm-btn'));
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('discard-changes-btn'));
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should show validations for first name', () => {
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <Profile {...props} />
      </Provider>
    );
    const lastNameInput = wrapper.getByTestId('profile-last-name');

    act(() => {
      fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('confirm-btn'));
    });

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
