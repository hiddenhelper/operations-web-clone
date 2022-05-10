import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Popover, { IPopoverProps } from './Popover';

describe('Popover', () => {
  let wrapper: RenderResult;
  let props: IPopoverProps;

  beforeEach(() => {
    props = {
      menuOptionList: [
        { title: 'Item 1', callback: jest.fn() },
        { title: 'Item 2', callback: jest.fn() },
      ],
      isOpen: false,
      onClose: jest.fn(),
      placement: 'bottom-end',
      divider: false,
    };

    wrapper = render(<Popover {...props} />);
  });

  it('should render', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with secondary values', () => {
    props.divider = true;

    wrapper = render(<Popover {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
