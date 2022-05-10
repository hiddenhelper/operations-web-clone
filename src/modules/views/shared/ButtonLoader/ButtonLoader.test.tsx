import React from 'react';
import { render } from '@testing-library/react';

import ButtonLoader, { IButtonLoaderProps } from './ButtonLoader';

describe('ButtonLoader Component', () => {
  let props: IButtonLoaderProps;

  beforeEach(() => {
    props = {
      text: 'Button text',
    };
  });

  it('should render', () => {
    const { container } = render(<ButtonLoader {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with loader', () => {
    props.isLoading = true;
    const wrapper = render(<ButtonLoader {...props} />);
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.getByTestId('button-spinner')).toBeTruthy();
  });
});
