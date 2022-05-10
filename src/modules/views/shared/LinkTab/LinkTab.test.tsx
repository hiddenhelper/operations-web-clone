import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { DashboardIcon } from '../../../../constants/icons';

import LinkTab, { ILinkTabProps } from './LinkTab';

describe('LinkTab', () => {
  let wrapper;
  let props: ILinkTabProps;

  beforeEach(() => {
    props = {
      to: '/clients',
      label: 'Clients',
      icon: <DashboardIcon />,
      index: 1,
      selectedValue: true,
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <LinkTab {...props} />
      </MemoryRouter>
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
