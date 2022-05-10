import React from 'react';
import { render } from '@testing-library/react';

import StatusChip, { IStatusChipProps } from './StatusChip';

describe('StatusChip', () => {
  let props: IStatusChipProps;

  beforeEach(() => {
    props = {
      label: 'test',
    };
  });

  it('should render', () => {
    const { container } = render(<StatusChip {...props} />);
    expect(container).toMatchSnapshot();
  });
});
