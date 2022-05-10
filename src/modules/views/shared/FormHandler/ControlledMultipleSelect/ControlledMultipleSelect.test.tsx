import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';

import ControlledMultipleSelect, { IControlledMultipleSelectProps } from './ControlledMultipleSelect';

describe('Controlled Multiple Select', () => {
  let wrapper: RenderResult;
  let props: IControlledMultipleSelectProps = {
    items: [],
    name: '',
    value: [],
    onChange: jest.fn(),
  };

  it('should render', () => {
    wrapper = render(<ControlledMultipleSelect {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should handle item change', async () => {
    props = {
      items: [
        {
          id: '1',
          name: 'item1',
        },
        {
          id: '2',
          name: 'item2',
        },
      ],
      name: 'test',
      onChange: jest.fn(),
      value: [
        {
          id: '1',
          name: 'item1',
        },
      ],
    };
    wrapper = render(<ControlledMultipleSelect {...props} />);

    await act(async () => {
      fireEvent.click(wrapper.getAllByTestId('multiple-checkbox')[0].querySelector('input'));
    });

    expect(props.onChange).toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(wrapper.getAllByTestId('multiple-checkbox')[1].querySelector('input'));
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
