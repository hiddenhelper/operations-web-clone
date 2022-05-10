import React from 'react';
import { render } from '@testing-library/react';
import ControlledMaskInput, { IMaskInputProps } from './ControlledMaskInput';

describe('Controlled Mask Input', () => {
  let props: IMaskInputProps = {
    inputRef: jest.fn(),
    mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    placeholderChar: '\u2000',
    showMask: true,
  };

  it('should render with mask', () => {
    const wrapper = render(<ControlledMaskInput {...props} />);
    expect(wrapper.findByText('  -         '));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render without mask', () => {
    props.showMask = false;
    const { container } = render(<ControlledMaskInput {...props} />);
    expect(container).toMatchSnapshot();
  });
});
