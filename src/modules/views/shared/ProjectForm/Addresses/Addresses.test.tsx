import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { getProject_1 } from 'test/entities';
import { getInitialState } from 'test/rootState';
import { getFallbackAddress } from 'modules/models/address';
import Addresses, { IAddressesProps } from './Addresses';

describe('Addresses', () => {
  let props: IAddressesProps;

  beforeEach(() => {
    props = {
      errors: {},
      model: getProject_1(),
      onChange: jest.fn(),
    };
  });

  it('should render fallback address', () => {
    props.model.jobSiteAddress = null;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Addresses {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change matching address', async () => {
    props.model.badgingSiteAddressMatchesJobSiteAddress = false;
    props.model.badgingSiteAddress = getFallbackAddress();

    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Addresses {...props} />
      </Provider>
    );

    const badgingMatchJobSiteCheck = wrapper.getByTestId('badgingMatchJobSite');

    await act(async () => {
      fireEvent.click(badgingMatchJobSiteCheck);
    });

    await act(async () => {
      fireEvent.click(badgingMatchJobSiteCheck);
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
