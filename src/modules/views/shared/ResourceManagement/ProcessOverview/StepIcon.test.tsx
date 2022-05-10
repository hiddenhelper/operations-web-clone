import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import StepIcon, { IStepIconProps } from './StepIcon';

describe('Step Icon', () => {
  let wrapper: RenderResult;
  let props: IStepIconProps;

  beforeEach(() => {
    props = {
      active: true,
      completed: false,
      started: false,
    };

    wrapper = render(<StepIcon {...props} />);
  });

  it('should render', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
