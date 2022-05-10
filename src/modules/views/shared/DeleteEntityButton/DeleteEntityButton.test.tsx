import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import DeleteEntityButton, { IDeleteEntityButtonProps } from './DeleteEntityButton';

describe('DeleteEntityButton', () => {
  let props: IDeleteEntityButtonProps;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(<DeleteEntityButton {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should click', () => {
    const wrapper = render(<DeleteEntityButton {...props} />);

    act(() => {
      fireEvent.click(wrapper.getByTestId('delete-entity-button'));
    });

    expect(props.onClick).toHaveBeenCalled();
  });
});
