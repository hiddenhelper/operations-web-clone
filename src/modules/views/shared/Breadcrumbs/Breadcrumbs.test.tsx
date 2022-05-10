import React from 'react';
import { render } from '@testing-library/react';

import Breadcrumbs, { IBreadcrumbsProps } from './Breadcrumbs';
import { MemoryRouter } from 'react-router';

describe('Breadcrumbs Component', () => {
  let props: IBreadcrumbsProps;

  beforeEach(() => {
    props = {
      breadcrumbs: [
        {
          link: 'path-1',
          label: 'label-1',
          title: 'title-1',
        },
        {
          label: 'label-2',
          title: 'title-2',
        },
      ],
    };
  });

  it('should render with content', () => {
    const { container } = render(
      <MemoryRouter>
        <Breadcrumbs {...props} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
