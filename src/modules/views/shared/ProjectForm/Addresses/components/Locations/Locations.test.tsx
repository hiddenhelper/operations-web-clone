import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { getInitialState } from 'test/rootState';
import { getFallbackLocation } from 'modules/models/address';
import { Status } from 'modules/models/resource';
import Locations, { ILocationsProps } from './Locations';

describe.skip('Locations', () => {
  let props: ILocationsProps;

  beforeEach(() => {
    props = {
      errors: {},
      locationsList: [getFallbackLocation()],
      onChange: jest.fn(),
      status: Status.DRAFT,
    };
  });

  it('should render fallback locations', () => {
    props.locationsList = [];
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change a location', () => {
    props.locationsList = [{ name: 'location 1' }];
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    const locationInput = wrapper.getAllByTestId('project-location-name');
    act(() => {
      fireEvent.change(locationInput[0], { target: { value: 'location name', index: 0 } });
    });

    expect(locationInput).toMatchSnapshot();
  });

  it('should add location', () => {
    props.locationsList = [{ name: 'location 1' }];
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    act(() => {
      const addLocationButton = wrapper.getByTestId('add-location-button');
      fireEvent.click(addLocationButton);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should not add location if no name', () => {
    props.locationsList = [{ name: '' }];
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    act(() => {
      const addLocationButton = wrapper.getByTestId('add-location-button');
      fireEvent.click(addLocationButton);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should delete location', () => {
    props.locationsList = [
      { id: '1', name: 'location 1' },
      { id: '2', name: 'location 2' },
    ];
    props.status = Status.DRAFT;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    act(() => {
      const deleteLocationButton = wrapper.getAllByTestId('delete-location-button');
      fireEvent.click(deleteLocationButton[0]);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should delete location while delete string', () => {
    props.locationsList = [
      { id: '1', name: 'location 1' },
      { id: '2', name: 'location 2' },
    ];

    props.status = Status.DRAFT;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    const locationInput = wrapper.getAllByTestId('project-location-name');
    act(() => {
      fireEvent.change(locationInput[0], { target: { value: '', index: 0 } });
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should not delete location', () => {
    props.locationsList = [
      { id: '1', name: 'location 1' },
      { id: '2', name: 'location 2' },
    ];
    props.status = Status.ACTIVE;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    act(() => {
      const deleteLocationButton = wrapper.getAllByTestId('delete-location-button');
      fireEvent.click(deleteLocationButton[0]);
      fireEvent.click(deleteLocationButton[1]);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should disable delete location button for locations in use', () => {
    props.locationsList = [
      { id: '1', name: 'location 1', isUsed: true },
      { id: '2', name: 'location 2', isUsed: false },
    ];
    props.status = Status.ACTIVE;
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    const deleteLocationButton = wrapper.getAllByTestId('delete-location-button');
    expect(deleteLocationButton[0].disabled).toBe(true);
    expect(deleteLocationButton[1].disabled).toBe(false);
  });

  it('should getErrors', () => {
    props.locationsList = [
      { id: '1', name: 'location 1' },
      { id: '2', name: 'location 2' },
    ];
    props.errors = {
      locations: {
        'locations[0].name': 'error on field name',
      },
    };
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <Locations {...props} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });
});
