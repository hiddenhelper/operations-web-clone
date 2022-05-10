import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getAccessControlSystemWidget_1 } from '../../../../../../test/entities';
import AccessControlSystem, { IAccessControlSystemProps } from './AccessControlSystem';

describe('AccessControlSystem Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IAccessControlSystemProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      acsWidget: getAccessControlSystemWidget_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchAcsWidget: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <AccessControlSystem {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchAcsWidget', () => {
    props.acsWidget = null;
    render(
      <MemoryRouter>
        <AccessControlSystem {...props} />
      </MemoryRouter>
    );
    expect(props.fetchAcsWidget).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <AccessControlSystem {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
