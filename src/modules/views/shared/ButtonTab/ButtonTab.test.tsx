import React from 'react';
import { render, act, fireEvent, RenderResult } from '@testing-library/react';

import ButtonTab, { IButtonTabProps } from './ButtonTab';

describe('ButtonTab', () => {
  let wrapper: RenderResult;
  let props: IButtonTabProps;

  beforeEach(() => {
    props = {
      optFilter: { id: 1, title: 'filter', key: 'filter-tab' },
      currentFilter: 'filter-tab',
      setFilter: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(<ButtonTab {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should change filter', () => {
    wrapper = render(<ButtonTab {...props} />);

    act(() => {
      fireEvent.click(wrapper.getByTestId('filter-status-opt'));
    });

    expect(props.setFilter).toHaveBeenCalled();
  });
});
