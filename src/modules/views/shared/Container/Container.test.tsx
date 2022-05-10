import React from 'react';
import { render } from '@testing-library/react';

import Container, { IContainer } from './Container';

describe('Container', () => {
  let props: IContainer = { children: null };

  it('should render child item', () => {
    props.children = <div>Hello world</div>;
    const wrapper = render(<Container {...props} />);
    wrapper.getByText('Hello world');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render child items', () => {
    props.children = [<p key={1}>Hello world</p>, <p key={2}>Welcome</p>];
    const wrapper = render(<Container {...props} />);
    wrapper.getByText('Hello world');
    wrapper.getByText('Welcome');
    expect(wrapper).toMatchSnapshot();
  });
});
