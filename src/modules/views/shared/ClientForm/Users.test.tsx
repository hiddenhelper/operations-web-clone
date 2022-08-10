import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getUser_5, getUser_4 } from '../../../../test/entities';
import Users, { IUsersProps } from './Users';
import { UserModel } from '../../../models';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getInitialState } from '../../../../test/rootState';

describe.skip('Users Form', () => {
  global.console.error = () => {
    /** */
  };
  let props: IUsersProps;
  beforeEach(() => {
    props = {
      userList: [getUser_4(), getUser_5()],
      errors: {},
      onChange: jest.fn(),
    };
  });

  it('should call onChange callback', () => {
    const { getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState())}>
        <Users {...props} />
      </Provider>
    );

    const firstName = getAllByTestId('user-first-name')[1];
    const lastName = getAllByTestId('user-last-name')[1];
    const email = getAllByTestId('user-email')[1];
    const phone = getAllByTestId('office-user-phone')[1];
    const contactMethodPhone = getAllByTestId('controlled-radio-button')[1];

    fireEvent.change(firstName, { target: { name: 'firstName', value: 'Test value' } });
    fireEvent.change(lastName, { target: { name: 'lastName', value: 'User' } });
    fireEvent.change(email, { target: { name: 'email', value: 'user@test.com' } });
    fireEvent.change(phone, { target: { name: 'officePhoneNumber', value: '123456' } });
    fireEvent.click(contactMethodPhone);
    expect(props.onChange).toHaveBeenCalledTimes(5);
  });

  it('should render default', async () => {
    props.userList = undefined;

    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <Users {...props} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should add a user', async () => {
    const { getByTestId } = render(
      <Provider store={createMockStore(getInitialState())}>
        <Users {...props} />
      </Provider>
    );

    const addUser = getByTestId('add-user-button');
    await fireEvent.click(addUser);
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    const { getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState())}>
        <Users {...props} />
      </Provider>
    );

    const deleteUser = getAllByTestId('delete-user-button')[0];
    await fireEvent.click(deleteUser);
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should show errors coming from server', () => {
    props.errors = {
      'users[0].firstName': 'Please type a User Name',
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <Users {...props} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with Fallback User', async () => {
    props.userList = [];
    const { container, getAllByTestId } = render(
      <Provider store={createMockStore(getInitialState())}>
        <Users {...props} />
      </Provider>
    );

    const deleteUser = getAllByTestId('delete-user-button')[0];
    const firstNameInput = getAllByTestId('user-first-name')[0];
    const lastNameInput = getAllByTestId('user-last-name')[0];

    expect(container).toMatchSnapshot();

    await fireEvent.click(deleteUser);

    expect(props.onChange).toHaveBeenCalled();
    expect(firstNameInput.nodeValue).toEqual(UserModel.getFallbackUser().firstName);
    expect(lastNameInput.nodeValue).toEqual(UserModel.getFallbackUser().lastName);
  });

  it('should return field errors', () => {
    props.userList = [{ ...UserModel.getFallbackUser(), invitationType: UserModel.InviteType.CLIENT_ADMIN }];
    props.errors = {
      users: {
        firstName: 'msg',
      },
    };
    const { container } = render(
      <Provider store={createMockStore(getInitialState())}>
        <Users {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
