import React from 'react';
import { render } from '@testing-library/react';
import ControlledError, { IControlledErrorProps } from './ControlledError';

describe('ControlledError', () => {
  let props: IControlledErrorProps = {
    errorList: ['error 1', 'error 2'],
    show: true,
    children: <div>Component</div>,
  };

  it('should render', () => {
    const wrapper = render(<ControlledError {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should not render errors', () => {
    props.show = false;
    const { container } = render(<ControlledError {...props} />);
    expect(container).toMatchSnapshot();
  });
});
