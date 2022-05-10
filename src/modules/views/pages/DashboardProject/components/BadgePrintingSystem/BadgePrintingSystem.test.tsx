import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgePrintingSystemWidget_1 } from '../../../../../../test/entities';
import BadgePrintingSystem, { IBadgePrintingSystemProps } from './BadgePrintingSystem';

describe('BadgePrintingSystem Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: IBadgePrintingSystemProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      bpsWidget: getBadgePrintingSystemWidget_1(),
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchBpsWidget: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <BadgePrintingSystem {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchBpsWidget', () => {
    props.bpsWidget = null;
    render(
      <MemoryRouter>
        <BadgePrintingSystem {...props} />
      </MemoryRouter>
    );
    expect(props.fetchBpsWidget).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <BadgePrintingSystem {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
