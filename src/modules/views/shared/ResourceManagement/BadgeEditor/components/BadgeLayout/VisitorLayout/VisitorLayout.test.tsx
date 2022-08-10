import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import VisitorLayout, { IVisitorLayoutProps } from './VisitorLayout';
import { getBadge_1 } from '../../../../../../../../test/entities';

describe.skip('BadgeEditor', () => {
  let wrapper: RenderResult;
  let props: IVisitorLayoutProps;

  beforeEach(() => {
    props = {
      badge: getBadge_1(),
      template: getBadge_1().badgeTemplate,
      barCode: '',
      qrCode: '',
      toggleClass: '',
      visitorMode: true,
    };
  });

  it('should render', () => {
    wrapper = render(<VisitorLayout {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render logo and number', () => {
    props.logo = 'logo';
    props.showLogo = true;
    props.badgeNumber = 8;
    wrapper = render(<VisitorLayout {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
