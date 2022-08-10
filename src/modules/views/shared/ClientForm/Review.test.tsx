import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Review, { IReviewProps } from './Review';
import { getClient_1, getMwbeType_1, getClient_2, getMwbeType_2, getClient_6, getUser_3 } from '../../../../test/entities';
import { getFallbackClient } from '../../../models/client';

jest.mock('../../../services/AutocompleteService');
jest.mock('../../../../utils/generalUtils', () => {
  return {
    formatViewforPhoneNumber: jest.fn(),
    toREM: jest.fn(),
    formatPhoneNumber: jest.requireActual('../../../../utils/generalUtils').formatPhoneNumber,
    getConditionalDefaultValue: jest.requireActual('../../../../utils/generalUtils').getConditionalDefaultValue,
    getDefaultValue: jest.requireActual('../../../../utils/generalUtils').getDefaultValue,
    getListWithCommas: jest.requireActual('../../../../utils/generalUtils').getListWithCommas,
    getFormattedDate: jest.requireActual('../../../../utils/generalUtils').getFormattedDate,
  };
});

describe.skip('Review Step', () => {
  let props: IReviewProps;

  beforeEach(() => {
    props = {
      model: getFallbackClient(),
      userList: getFallbackClient().users,
      mwbeList: [],
      invalidUserList: false,
      completedFields: {
        'general-information': {
          title: 'General Information',
          required: 0,
          completed: 0,
          order: 0,
        },
        addresses: {
          title: 'Addresses',
          required: 0,
          completed: 0,
          order: 1,
        },
        users: {
          title: 'Users',
          required: 0,
          completed: 0,
          order: 2,
        },
      },
      onChangeStep: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(<Review {...props} />);

    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getAllByText('-').length).toBe(5);
  });

  it('should render with values', () => {
    props.model = getClient_1();
    props.userList = getClient_1().users;
    props.mwbeList = getMwbeType_1();
    props.completedFields = {
      'general-information': {
        title: 'General Information',
        required: 2,
        completed: 1,
        order: 0,
      },
      addresses: {
        title: 'Addresses',
        required: 1,
        completed: 1,
        order: 1,
      },
      users: {
        title: 'Users',
        required: 2,
        completed: 2,
        order: 2,
      },
    };

    const wrapper = render(<Review {...props} />);

    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Robert C. Martin'));
    expect(wrapper.getByText('LOZG-780211-7B9'));
    expect(wrapper.getByText('Option 1'));
    expect(wrapper.getByText('trade 1, trade 2.'));
    expect(wrapper.getByText('Pedro Martin'));
    expect(wrapper.getAllByText('user@test.com'));
    expect(wrapper.getAllByTestId('user-phone-label')[1]);
    expect(wrapper.getAllByText('Email')[1]);
  });

  it('should render with secondary values', () => {
    props.model = getClient_2();
    props.mwbeList = getMwbeType_2();
    props.userList = [{ ...getUser_3(), firstName: null, lastName: null }];
    props.completedFields = {
      'general-information': {
        title: 'General Information',
        required: 2,
        completed: 1,
        order: 0,
      },
      addresses: {
        title: 'Addresses',
        required: 2,
        completed: 2,
        order: 1,
      },
      users: {
        title: 'Users',
        required: 5,
        completed: 2,
        order: 2,
      },
    };
    const wrapper = render(<Review {...props} />);

    fireEvent.click(wrapper.getAllByTestId('missing-fields-btn')[0]);

    expect(props.onChangeStep).toHaveBeenCalled();
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getAllByText('Mobile Number'));
    expect(wrapper.getAllByText('Office Number'));
  });

  it('should render developer', () => {
    props.model = getClient_6();
    props.invalidUserList = true;
    props.completedFields = {
      'general-information': {
        title: 'General Information',
        required: 1,
        completed: 1,
        order: 0,
      },
      addresses: {
        title: 'Addresses',
        required: 0,
        completed: 0,
        order: 1,
      },
      users: {
        title: 'Users',
        required: 0,
        completed: 0,
        order: 2,
      },
    };

    const wrapper = render(<Review {...props} />);

    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByText('Developer'));
    expect(wrapper.queryByText('Some required fields are missing')).toBeNull();
  });

  it('should render default', () => {
    props.mwbeList = undefined;
    props.userList = undefined;

    const wrapper = render(<Review {...props} />);

    expect(wrapper.container).toMatchSnapshot();
  });
});
