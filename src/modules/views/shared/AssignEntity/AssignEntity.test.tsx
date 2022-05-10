import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import AssignEntity, { IAssignEntityProps } from './AssignEntity';

jest.useFakeTimers();

describe('AssignEntity Component', () => {
  let props: IAssignEntityProps;

  beforeEach(() => {
    props = {
      index: 0,
      tempId: 'temp-id-0',
      result: [{ name: 'test' }, { name: 'test 2' }],
      params: { isDeveloper: false },
      isLoading: false,
      existRelation: false,
      optionLabel: 'name',
      assignValue: '',
      renderOption: jest.fn(),
      search: jest.fn(),
      onCreate: jest.fn(),
      onSelect: jest.fn(),
      onReset: jest.fn(),
    };
  });

  it('should render', () => {
    const { container } = render(<AssignEntity {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should search', () => {
    const wrapper = render(<AssignEntity {...props} />);

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test value search' } });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(props.search).toHaveBeenCalledWith({ isDeveloper: false, nameContains: 'test value search', maxItems: 30 }, 'temp-id-0');
  });

  it('should render option list', () => {
    const wrapper = render(<AssignEntity {...props} />);

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.mouseDown(input);
    });

    expect(props.renderOption).toHaveBeenCalled();
  });

  it('should render create new option', () => {
    props.showCreateNew = true;
    const wrapper = render(<AssignEntity {...props} />);

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test value search' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(wrapper.getByTestId('create-entity')).toBeTruthy();
  });

  it('should create new', () => {
    props.showCreateNew = true;
    const wrapper = render(<AssignEntity {...props} />);

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test value search' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const createButton = wrapper.getByTestId('create-entity');

    act(() => {
      fireEvent.click(createButton);
    });

    expect(props.onCreate).toHaveBeenCalledWith('test value search', 'temp-id-0');
  });

  it('should select', () => {
    props.showCreateNew = true;
    const wrapper = render(<AssignEntity {...props} />);

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.click(wrapper.getAllByRole('option')[0]);
    });

    expect(props.onSelect).toHaveBeenCalledWith(0, { name: 'test' }, 'temp-id-0');
  });

  it('should reset', () => {
    props.assignValue = { id: null, name: 'test' };
    const wrapper = render(<AssignEntity {...props} />);

    const input = wrapper.getByTestId('autocomplete-wrapper').querySelector('input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    act(() => {
      fireEvent.mouseDown(input);
    });

    act(() => {
      fireEvent.blur(input);
    });

    expect(props.onReset).toHaveBeenCalled();
  });

  it('should clear text when relation', () => {
    props.existRelation = true;
    const wrapper = render(<AssignEntity {...props} />);

    props.existRelation = false;
    wrapper.rerender(<AssignEntity {...props} />);

    expect(wrapper.container).toMatchSnapshot();
  });
});
