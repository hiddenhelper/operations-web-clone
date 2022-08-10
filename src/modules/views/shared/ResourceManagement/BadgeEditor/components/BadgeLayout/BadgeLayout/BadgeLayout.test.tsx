import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';

import BadgeLayout, { IBadgeLayout } from './BadgeLayout';

describe.skip('BadgeEditor', () => {
  let wrapper: RenderResult;
  let props: IBadgeLayout;

  beforeEach(() => {
    props = {
      currentBgColor: '',
      currentFont: '',
      currentFontColor: '',
      layoutClassSelector: '',
      toggleClass: '',
    };
  });

  it('should render', () => {
    wrapper = render(<BadgeLayout {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render logo', () => {
    props.logo = 'logo';
    props.showLogo = true;
    wrapper = render(<BadgeLayout {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
