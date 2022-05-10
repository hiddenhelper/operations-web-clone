import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Main, { IMainProps } from './Main';

describe('Main Component', () => {
  global.console.error = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IMainProps;

  beforeEach(() => {
    wrapper = render(
      <Main {...props}>
        <div>view</div>
      </Main>
    );
  });

  it('should render', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
