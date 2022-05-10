import React from 'react';
import { render } from '@testing-library/react';

import Skeleton, { ISkeleton } from './Skeleton';

describe('Skeleton', () => {
  let props: ISkeleton;

  beforeEach(() => {
    props = {
      animation: 'pulse',
      height: 300,
      variant: 'rect',
      width: 300,
      isLoading: false,
    };
  });

  it('should render', () => {
    const { container } = render(
      <Skeleton {...props}>
        <div>test</div>
      </Skeleton>
    );
    expect(container).toMatchSnapshot();
  });

  it('should show loading', () => {
    props.isLoading = true;
    const { container } = render(
      <Skeleton {...props}>
        <div>test</div>
      </Skeleton>
    );
    expect(container).toMatchSnapshot();
  });
});
