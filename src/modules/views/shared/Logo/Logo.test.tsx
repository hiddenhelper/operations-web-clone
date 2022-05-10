import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Logo, { ILogoProps } from './Logo';

describe('Logo Component', () => {
  let wrapper: RenderResult;
  let props: ILogoProps;

  it('should render', () => {
    wrapper = render(<Logo {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    props = { width: 50, height: 50, color: 'red', title: 'some title' };
    wrapper = render(<Logo {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
