import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';

import BadgeTemplate, { IBadgeTemplateProps } from './BadgeTemplate';

describe('BadgeTemplate', () => {
  let wrapper: RenderResult;
  let props: IBadgeTemplateProps;

  beforeEach(() => {
    props = {
      render: ({ toggleClass }) => <div className={toggleClass}>Component</div>,
    };

    wrapper = render(<BadgeTemplate {...props} />);
  });

  it('should render', () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should toggle view', async () => {
    const badgeButtons = wrapper.getAllByTestId('worker-badge-button');

    await act(async () => {
      await fireEvent.click(badgeButtons[1]);
    });

    expect(wrapper.container).toMatchSnapshot();
  });
});
