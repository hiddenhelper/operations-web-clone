import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';

import WorkerBadge, { IBadgeProps } from './WorkerBadge';

import { getWorker_1 } from '../../../../../test/entities';
import { getFallbackWorker } from '../../../../models/worker';

describe.skip('Worker Badge', () => {
  let wrapper: RenderResult;
  let props: IBadgeProps;

  beforeEach(() => {
    props = { worker: getWorker_1() };

    wrapper = render(<WorkerBadge {...props} />);
  });

  it('should render', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with fallback values', () => {
    props = { worker: getFallbackWorker() };
    wrapper = render(<WorkerBadge {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render contact phone', () => {
    props = { worker: { ...getFallbackWorker(), emergencyContactPhone: '123456789' } };
    wrapper = render(<WorkerBadge {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with picture', () => {
    props = { worker: { ...getFallbackWorker(), pictureUrl: 'path' } };
    wrapper = render(<WorkerBadge {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
