import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';

import ControlledRadio, { IControlledRadioProps } from './ControlledRadio';

describe('Controlled Radio', () => {
  let wrapper: RenderResult;
  let props: IControlledRadioProps = {
    radioItems: [
      {
        value: 'item1',
        label: 'Item 1',
      },
      {
        value: 'item2',
        label: 'Item 2',
      },
    ],
    formControlProps: {
      name: 'Test',
      label: 'Test',
      value: 'item1',
      onChange: jest.fn(),
    },
  };

  it('should render', () => {
    wrapper = render(<ControlledRadio {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should handle item change', async () => {
    wrapper = render(<ControlledRadio {...props} />);

    await act(async () => {
      fireEvent.click(wrapper.getAllByTestId('controlled-radio-button')[1]);
    });

    expect(props.formControlProps.onChange).toHaveBeenCalled();
  });
});
