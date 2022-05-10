import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import AutocompleteFilter, { IAutocompleteFilterProps } from './AutocompleteFilter';

jest.useFakeTimers();

describe('AutocompleteFilter Component', () => {
  let props: IAutocompleteFilterProps;

  beforeEach(() => {
    props = {
      value: '',
      label: 'Label',
      optionList: [{ id: 'id', name: 'name' }],
      onChange: jest.fn(),
      onSearch: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = render(<AutocompleteFilter {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change', () => {
    const wrapper = render(<AutocompleteFilter {...props} />);

    act(() => {
      fireEvent.click(wrapper.getByTestId('button-filter-open'));
    });

    const input = wrapper.getByTestId('autocomplete-filter-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'name' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getByText('name'));
    });

    expect(props.onChange).toHaveBeenCalledWith('id');
    expect(props.onSearch).toHaveBeenCalledWith('name');
  });
});
