import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';

import CreditCard, { ICreditCardProps } from './CreditCard';

describe('CreditCard', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: ICreditCardProps;

  beforeEach(() => {
    props = {
      createLoading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      createPayment: jest.fn(),
      clearLoading: jest.fn(),
      onSuccessCallback: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(<CreditCard {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.createLoading = undefined;
    wrapper = render(<CreditCard {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should unMount', () => {
    wrapper = render(<CreditCard {...props} />);
    wrapper.unmount();
    expect(props.clearLoading).toHaveBeenCalled();
  });

  it('should createPayment', async () => {
    props.createLoading = undefined;
    wrapper = render(<CreditCard {...props} />);

    act(() => {
      fireEvent.change(wrapper.getByTestId('name-on-card'), { target: { name: 'nameOnCard', value: 'name' } });
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('country-or-region'), { target: { name: 'countryOrRegion', value: 'USA' } });
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('credit-card'), { target: { name: 'creditCard', value: '4242424242424242' } });
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('save-payment-method-btn'));
    });

    await act(() => {
      return Promise.resolve();
    });

    expect(props.createPayment).toHaveBeenCalled();
  });
});
