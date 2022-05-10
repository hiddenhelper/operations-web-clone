import React from 'react';
import { render } from '@testing-library/react';

import StatusWidget, { IStatusWidgetProps } from './StatusWidget';

describe('StatusWidget', () => {
  let props: IStatusWidgetProps;

  beforeEach(() => {
    props = {
      total: '10',
      status: 'status',
      content: 'some content',
    };
  });

  it('should render', () => {
    const { container } = render(<StatusWidget {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render loading', () => {
    const { container } = render(<StatusWidget {...props} />);
    expect(container).toMatchSnapshot();
  });
});
