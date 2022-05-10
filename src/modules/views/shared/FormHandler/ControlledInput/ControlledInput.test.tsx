import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import ControlledInput, { IControlledInputProps } from './ControlledInput';

describe('Controlled Input', () => {
  let wrapper: RenderResult;
  let props: IControlledInputProps = {
    label: 'label',
    required: true,
    showMark: true,
    children: <div>input</div>,
    dataTestId: 'testid',
  };

  it('should render with mark', () => {
    wrapper = render(<ControlledInput {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render without mark', () => {
    props.showMark = false;
    wrapper = render(<ControlledInput {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
