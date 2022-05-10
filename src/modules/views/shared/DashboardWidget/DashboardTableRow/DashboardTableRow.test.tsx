import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';

import DashboardTableRow, { IDashboardTableRowProps } from './DashboardTableRow';
import { getProjectTopTenStatistics_1 } from '../../../../../test/entities';

describe('DashboardTableRow Component', () => {
  let wrapper: RenderResult;
  let props: IDashboardTableRowProps;

  beforeEach(() => {
    props = {
      row: getProjectTopTenStatistics_1()[0],
      navigate: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <table>
        <tbody>
          <DashboardTableRow {...props} />
        </tbody>
      </table>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should navigate', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <DashboardTableRow {...props} />
        </tbody>
      </table>
    );

    act(() => {
      fireEvent.click(getByTestId('navigate-btn'));
    });

    expect(props.navigate).toHaveBeenCalled();
  });
});
