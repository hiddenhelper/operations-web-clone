import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import SearchLocation, { ISearchLocation } from './SearchLocation';

describe('SearchLocation', () => {
  let props: ISearchLocation;

  beforeEach(() => {
    props = {
      value: { name: 'location 1' },
      placeholder: 'search',
      optionList: [{ name: 'location 1' }, { name: 'location 2' }],
      onChange: jest.fn(),
    };
  });

  it('should render', () => {
    props.hasIcon = true;
    const { container } = render(<SearchLocation {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render disabled', () => {
    props.disabled = true;
    const { container } = render(<SearchLocation {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should change location', () => {
    const wrapper = render(<SearchLocation {...props} />);

    const input = wrapper.getByTestId('search-autocomplete').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'new location' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    expect(wrapper.getByText('Add new location')).toBeTruthy();

    act(() => {
      fireEvent.click(wrapper.getByText('Add new location'));
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
