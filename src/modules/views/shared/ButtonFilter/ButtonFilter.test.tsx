import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import ButtonFilter, { IButtonFilterProps } from './ButtonFilter';

describe('ButtonFilter Component', () => {
  let props: IButtonFilterProps;

  beforeEach(() => {
    props = {
      text: '',
      disabled: false,
      showDivider: true,
      styleClass: '',
      buttonProps: {},
      render: currentProps => {
        return (
          <div>
            <button data-testid="button-filter-close" onClick={() => currentProps.handleClose()}>
              Close
            </button>
            Children Node
          </div>
        );
      },
    };
  });

  it('should render', () => {
    const wrapper = render(<ButtonFilter {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should toggle', () => {
    const wrapper = render(<ButtonFilter {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('button-filter-open'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should close', () => {
    const wrapper = render(<ButtonFilter {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('button-filter-close'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });
});
