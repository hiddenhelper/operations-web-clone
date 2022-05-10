import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { getBadgeByLocationWidget_1 } from '../../../../../../test/entities';
import CertificationsByWorkers, { ICertificationsByWorkersProps } from './CertificationsByWorkers';

describe('CertificationsByWorkers Component', () => {
  global.console.warn = () => {
    /** */
  };
  let wrapper: RenderResult;
  let props: ICertificationsByWorkersProps;

  beforeEach(() => {
    const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
    Date.now = mockDate;
    props = {
      queryParams: { stateCode: '', period: 0 },
      topTenStatisticsMap: { ceritficationsByWorkers: getBadgeByLocationWidget_1() },
      loading: {
        isLoading: false,
        hasError: false,
        error: null,
      },
      fetchWorkersCertifications: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(
      <MemoryRouter>
        <CertificationsByWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchWorkersCertifications', () => {
    props.topTenStatisticsMap = {};
    render(
      <MemoryRouter>
        <CertificationsByWorkers {...props} />
      </MemoryRouter>
    );
    expect(props.fetchWorkersCertifications).toHaveBeenCalled();
  });

  it('should render loading', () => {
    props.loading = { isLoading: true, hasError: false, error: null };
    wrapper = render(
      <MemoryRouter>
        <CertificationsByWorkers {...props} />
      </MemoryRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
