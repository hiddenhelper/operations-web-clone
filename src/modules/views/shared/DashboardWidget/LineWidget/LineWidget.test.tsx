import React from 'react';
import { render } from '@testing-library/react';

import LineWidget, { ILineWidgetProps } from './LineWidget';

describe('LineWidget', () => {
  let props: ILineWidgetProps;

  beforeEach(() => {
    props = {
      title: 'title',
      total: 1,
      data: [{ x: 'x axis', y: 12 }],
      isLoading: false,
    };
  });

  it('should render', () => {
    const { container } = render(<LineWidget {...props} />);
    expect(container).toMatchSnapshot();
  });
});
