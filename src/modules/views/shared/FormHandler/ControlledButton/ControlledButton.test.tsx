import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { disableFocus, enableFocusOnTab } from '../../../../../utils/generalUtils';

jest.mock('../../../../../utils/generalUtils', () => {
  return {
    disableFocus: jest.fn(),
    enableFocusOnTab: jest.fn(),
  };
});

import ControlledButton from './ControlledButton';

describe('ControlledButton', () => {
  let wrapper;

  it('should render', () => {
    wrapper = render(
      <ControlledButton>
        <button>Testing</button>
      </ControlledButton>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should call disable and enable focus', () => {
    wrapper = render(
      <ControlledButton>
        <button>Testing</button>
      </ControlledButton>
    );

    act(() => {
      fireEvent.mouseDown(wrapper.getByTestId('controlled-button'));
      fireEvent.keyDown(wrapper.getByTestId('controlled-button'));
    });

    expect(disableFocus).toHaveBeenCalled();
    expect(enableFocusOnTab).toHaveBeenCalled();
  });
});
