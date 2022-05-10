import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import ButtonMenu, { IButtonMenuProps } from './ButtonMenu';

describe('Button Menu', () => {
  let wrapper: RenderResult;
  let props: IButtonMenuProps;

  beforeEach(() => {
    props = {
      optionList: [
        { title: 'Active', callback: jest.fn() },
        { title: 'Deactivate', callback: jest.fn() },
      ],
      disabled: false,
      showDivider: true,
      text: '',
      showIconMargin: false,
    };

    wrapper = render(<ButtonMenu {...props} />);
  });

  it('should render', () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with secondary values', () => {
    props.disabled = true;
    props.showDivider = true;
    props.showIconMargin = false;

    wrapper = render(<ButtonMenu {...props} />);

    expect(wrapper.container).toMatchSnapshot();
  });
});
