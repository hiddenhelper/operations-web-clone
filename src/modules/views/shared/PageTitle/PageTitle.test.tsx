import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import PageTitle, { IPageTitle } from './PageTitle';

describe('PageTitle Component', () => {
  let wrapper: RenderResult;
  let props: IPageTitle = {
    title: 'Hello',
  };

  it('should render', () => {
    wrapper = render(<PageTitle {...props} />);
    wrapper.getByText('Hello');
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render subtitle', () => {
    props.subtitle = 'Welcome!';
    wrapper = render(<PageTitle {...props} />);
    wrapper.getByText('Hello');
    wrapper.getByText('Welcome!');
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render content on the right', () => {
    props.right = <button>Click Me!</button>;
    wrapper = render(<PageTitle {...props} />);
    wrapper.getByText('Hello');
    wrapper.getByText('Welcome!');
    wrapper.getByText('Click Me!');
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
