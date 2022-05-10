import React from 'react';
import { render } from '@testing-library/react';

import LineChart, { ILineChartProps } from './LineChart';
import { getProjectWidgetStatistics_1 } from '../../../../../test/entities';

describe('LineChart', () => {
  global.console.warn = () => {
    /** */
  };
  let props: ILineChartProps;

  beforeEach(() => {
    props = {
      width: 400,
      height: 400,
      series: [
        {
          name: 'serie 1',
          data: getProjectWidgetStatistics_1().lineChart.map(entry => ({ x: entry.date, y: entry.count })),
          style: {},
        },
      ],
      isLoading: false,
    };
  });

  it('should render skeleton', () => {
    props.isLoading = true;
    const wrapper = render(<LineChart {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render', () => {
    const wrapper = render(<LineChart {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render empty', () => {
    props.series = [
      {
        name: 'serie 1',
        data: [],
        style: {},
      },
    ];
    const wrapper = render(<LineChart {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
