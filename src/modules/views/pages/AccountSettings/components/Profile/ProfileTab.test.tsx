import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { getAccount_1, getUploadFile_1, getUser_1 } from '../../../../../../test/entities';
import { getAdminInitialState, getInitialState } from '../../../../../../test/rootState';
import { FileModel, UserModel } from '../../../../../models';
import ProfileTab, { IProfileTabProps } from './ProfileTab';

describe.skip('ProfileTab', () => {
  let props: IProfileTabProps;
  let wrapper;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      isFcaUser: true,
      isAdmin: true,
      accountData: null,
      loadingMap: null,
      user: getUser_1(),
      fileMap: { [getUploadFile_1().uploadId]: { [getUploadFile_1().id]: getUploadFile_1() } },
      saveLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      getAccountData: jest.fn(),
      updateProfile: jest.fn(),
      updateProfilePhoto: jest.fn(),
      clearFileUpload: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with picture', () => {
    (global as any).URL.createObjectURL = jest.fn();
    props.fileMap = { profilePhoto: { [getUploadFile_1().id]: getUploadFile_1() } };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with picture from data loaded', () => {
    (global as any).URL.createObjectURL = jest.fn();
    props.fileMap = { profilePhoto: {} };
    props.accountData = { firstName: 'John', lastName: 'Doe', pictureUrl: 'url' };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with in progress picture', () => {
    (global as any).URL.createObjectURL = jest.fn();
    props.fileMap = { profilePhoto: { [getUploadFile_1().id]: { ...getUploadFile_1(), status: FileModel.FileStatus.PROGRESS } } };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render without pending files', () => {
    (global as any).URL.createObjectURL = jest.fn();
    props.fileMap = { profilePhoto: { [getUploadFile_1().id]: { ...getUploadFile_1(), status: FileModel.FileStatus.SUCCESS } } };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetch data', () => {
    props.accountData = null;
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );
    expect(props.getAccountData).toHaveBeenCalled();
  });

  it('should set data', () => {
    props.accountData = { firstName: 'John', lastName: 'Doe' };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );
    expect(props.getAccountData).not.toHaveBeenCalled();
  });

  it('should update account', () => {
    (global as any).URL.createObjectURL = jest.fn();
    props.fileMap = { profilePhoto: { [getUploadFile_1().id]: getUploadFile_1() } };
    props.isFcaUser = true;
    props.isAdmin = true;
    wrapper = render(
      <Provider store={createMockStore(getAdminInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );

    const nameInput = wrapper.getByTestId('profile-first-name');
    const lastNameInput = wrapper.getByTestId('profile-last-name');

    act(() => {
      fireEvent.change(nameInput, { target: { name: 'firstName', value: 'test' } });
    });

    act(() => {
      fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('confirm-btn'));
    });

    expect(props.updateProfile).toHaveBeenCalled();
  });

  it('should finish upload', () => {
    (global as any).URL.createObjectURL = jest.fn();
    props.fileMap = { profilePhoto: { [getUploadFile_1().id]: getUploadFile_1() } };
    props.loadingMap = { test: { traceId: 'test', isLoading: false, hasError: false, error: null } };
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );

    const nameInput = wrapper.getByTestId('profile-first-name');
    const lastNameInput = wrapper.getByTestId('profile-last-name');

    act(() => {
      fireEvent.change(nameInput, { target: { name: 'firstName', value: 'test' } });
    });

    act(() => {
      fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('confirm-btn'));
    });

    props.saveLoading = { isLoading: false, hasError: false, error: null };
    props.loadingMap = { test: { traceId: 'test', isLoading: false, hasError: false, error: null } };

    wrapper.rerender();

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should discard', () => {
    props.accountData = getAccount_1();
    wrapper = render(
      <Provider store={createMockStore(getInitialState()) as any}>
        <ProfileTab {...props} />
      </Provider>
    );

    const nameInput = wrapper.getByTestId('profile-first-name');

    act(() => {
      fireEvent.change(nameInput, { target: { name: 'firstName', value: 'test' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('discard-changes-btn'));
    });

    expect(props.clearFileUpload).toHaveBeenCalled();
  });
});
