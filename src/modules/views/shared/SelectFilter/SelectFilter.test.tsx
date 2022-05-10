import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import SelectFilter, { ISelectFilterProps } from './SelectFilter';

describe('SelectFilter Component', () => {
  let props: ISelectFilterProps;

  beforeEach(() => {
    props = {
      optionList: [{ value: 'value', label: 'label' }],
      onChange: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(<SelectFilter {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change', () => {
    const wrapper = render(<SelectFilter {...props} />);

    act(() => {
      fireEvent.click(wrapper.getByTestId('button-filter-open'));
    });

    act(() => {
      fireEvent.click(wrapper.getAllByTestId('select-filter-option')[0]);
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
