import React from 'react';
import { render } from '@testing-library/react';

import Loader from './Loader';

describe('Loader', () => {
  let wrapper;

  it('should render', () => {
    wrapper = render(<Loader />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
