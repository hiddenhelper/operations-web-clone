import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import ButtonPrinter, { IButtonPrinterProps } from './ButtonPrinter';

describe('ButtonPrinter', () => {
  let wrapper: RenderResult;
  let props: IButtonPrinterProps;

  beforeEach(() => {
    props = {
      isLoading: false,
      onPrint: jest.fn(),
      destroyPrinter: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(<ButtonPrinter {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render loading', () => {
    props.isLoading = true;
    wrapper = render(<ButtonPrinter {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render disabled', () => {
    props.disabled = true;
    wrapper = render(<ButtonPrinter {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
