import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';

import { getInitialState } from '../../../../test/rootState';
import DashboardClient from './DashboardClient';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
  useLocation: jest.fn().mockReturnValue({ pathname: 'path', search: '' }),
}));

describe('DashboardClient', () => {
  let wrapper: RenderResult;

  const DashboardClientComponent = () => (
    <Provider store={createMockStore(getInitialState()) as any}>
      <MemoryRouter>
        <DashboardClient />
      </MemoryRouter>
    </Provider>
  );

  it('should render', () => {
    const { container } = render(<DashboardClientComponent />);
    expect(container).toMatchSnapshot();
  });

  it('should change state filter', () => {
    wrapper = render(<DashboardClientComponent />);

    const filterStateBtn = wrapper.getAllByTestId('button-filter-open')[0];

    act(() => {
      fireEvent.click(filterStateBtn);
    });

    const input = wrapper.getByTestId('autocomplete-filter-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'Arizona' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Arizona'));
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('path?period=1&stateCode="AZ"');
  });

  it('should change period filter', () => {
    wrapper = render(<DashboardClientComponent />);

    const filterPeriodBtn = wrapper.getAllByTestId('button-filter-open')[1];

    act(() => {
      fireEvent.click(filterPeriodBtn);
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[1]);
    });

    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith('path?period=2');
  });
});
