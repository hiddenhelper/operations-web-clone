import React from 'react';
import { render } from '@testing-library/react';

import PieChart, { IPieChartProps } from './PieChart';
import { getProjectWidgetStatistics_1 } from '../../../../../test/entities';
import { ResourceModel } from '../../../../models';

describe('PieChart', () => {
  global.console.warn = () => {
    /** */
  };
  let props: IPieChartProps;

  beforeEach(() => {
    props = {
      pieProps: {
        padAngle: 3,
        innerRadius: 10,
        style: {},
        labels: () => '',
      },
      data: getProjectWidgetStatistics_1().pieChart.map(entry => ({
        ...entry,
        x: ResourceModel.statusMap[entry.status],
        y: entry.total,
        color: ResourceModel.statusColorMap[entry.status],
      })),
      isLoading: false,
    };
  });

  it('should render skeleton', () => {
    props.isLoading = true;
    const wrapper = render(<PieChart {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render', () => {
    const wrapper = render(<PieChart {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render empty', () => {
    props.data = getProjectWidgetStatistics_1().pieChart.map(entry => ({
      ...entry,
      x: ResourceModel.statusMap[entry.status],
      y: 0,
      color: ResourceModel.statusColorMap[entry.status],
    }));
    const wrapper = render(<PieChart {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
