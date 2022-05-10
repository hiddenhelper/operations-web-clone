import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import { getProject_3 } from '../../../../../../test/entities';
import { getInitialState } from '../../../../../../test/rootState';
import ProjectBanner, { IProjectBannerProps } from './ProjectBanner';

describe('Project Banner', () => {
  let props: IProjectBannerProps;

  beforeEach(() => {
    props = {
      project: getProject_3(),
    };
  });

  it('should render', () => {
    const wrapper = render(
      <Provider store={createMockStore(getInitialState())}>
        <ProjectBanner {...props} />
      </Provider>
    );

    expect(wrapper.container).toMatchSnapshot();
  });
});
