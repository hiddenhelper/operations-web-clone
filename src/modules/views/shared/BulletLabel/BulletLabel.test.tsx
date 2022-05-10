import React from 'react';
import { render } from '@testing-library/react';

import BulletLabel, { IBulletLabelProps } from './BulletLabel';

describe('BulletLabel Component', () => {
  let props: IBulletLabelProps;

  beforeEach(() => {
    props = {
      label: '',
      status: '',
    };
  });

  it('should render with content', () => {
    props.label = 'test';
    props.status = 'Active';

    const { container } = render(<BulletLabel {...props} />);
    expect(container).toMatchSnapshot();
  });
});
