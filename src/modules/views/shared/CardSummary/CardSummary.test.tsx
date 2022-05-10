import React from 'react';
import { render, RenderResult, act, fireEvent } from '@testing-library/react';

import CardSummary, { ICardSummaryProps } from './CardSummary';
import { getFallbackWorker } from '../../../models/worker';
import { getSkilledTrade_1, getWorker_1 } from '../../../../test/entities';

jest.mock('moment', () => () => ({
  format: jest.fn().mockReturnValue('08/03/2015'),
}));

describe('CardSummary Component', () => {
  let wrapper: RenderResult;
  let props: ICardSummaryProps;

  beforeEach(() => {
    props = {
      model: getWorker_1(),
    };

    wrapper = render(<CardSummary {...props} />);
  });

  it('should render with required values', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with optional values', () => {
    props.model.gender = 1;
    props.model.isVeteran = true;
    props.model.trades = [getSkilledTrade_1(), getSkilledTrade_1(), getSkilledTrade_1(), getSkilledTrade_1()];
    props.editAction = jest.fn();

    wrapper = render(<CardSummary {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with null values', () => {
    props = {
      model: getFallbackWorker(),
    };
    wrapper = render(<CardSummary {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should click editAction', async () => {
    props.editAction = jest.fn();
    const { getByTestId } = render(<CardSummary {...props} />);

    await act(async () => {
      await fireEvent.click(getByTestId('edit-button'));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
