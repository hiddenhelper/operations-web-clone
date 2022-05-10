import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MenuPopover, { IMenuPopoverProps } from './MenuPopover';

jest.mock('../../../../utils/generalUtils', () => {
  return {
    toREM: jest.fn(),
  };
});

describe('MenuPopover Component', () => {
  let props: IMenuPopoverProps;

  beforeEach(() => {
    const placeholderFunction = jest.fn();
    props = {
      menuOptionList: [
        { title: 'Profile', callback: placeholderFunction },
        { title: 'Sign Out', callback: placeholderFunction },
      ],
      placement: 'bottom-end',
    };
  });

  it('should render', () => {
    const wrapper = render(<MenuPopover {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('open the popup', () => {
    const wrapper = render(<MenuPopover {...props} />);

    fireEvent.click(wrapper.getByTestId('popover-button'));

    expect(wrapper.getByTestId('popover-wrapper')).toMatchSnapshot();
  });

  it('close the popup when menu item is clicked', () => {
    const wrapper = render(<MenuPopover {...props} />);

    fireEvent.click(wrapper.getByTestId('popover-button'));
    fireEvent.click(wrapper.getAllByTestId('popover-menu-button')[1]);

    expect(wrapper.getByTestId('popover-wrapper')).toMatchSnapshot();
  });
});
