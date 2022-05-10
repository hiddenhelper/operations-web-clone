import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import GeneralInformation from './GeneralInformation';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn),
  useSelector: jest.fn().mockReturnValue(true),
}));

describe('GeneralInformation Component', () => {
  let props;

  beforeEach(() => {
    props = {
      model: { universalBadgePrice: 1000, hasUniversalBadge: true },
      formRules: {
        name: {
          required: true,
        },
        taxpayerIdentificationNumber: {
          required: false,
        },
        otherTrade: {
          required: false,
        },
        universalBadgePrice: {
          required: true,
        },
      },
      errors: {},
      mwbeList: [
        {
          id: '1',
          name: 'foo',
          createdAt: 'bar',
          code: 'foo',
        },
      ],
      tradeList: [
        {
          id: '1',
          name: 'foo',
          createdAt: 'bar',
          code: 'foo',
        },
      ],
      onChange: jest.fn(),
      updateRules: jest.fn(),
    };
  });

  it('should show universal badge price error', async () => {
    const { getAllByTestId, getByText, rerender } = render(<GeneralInformation {...props} />);
    const radio = getAllByTestId('controlled-radio-button')[1];
    const inputPrice = getAllByTestId('project-universalBadgePrice')[0];
    const validationMessage = 'Universal Badge Price must be less than $1,000.';

    await act(async () => {
      let newProps = props;
      newProps.errors = { universalBadgePrice: 'Universal Badge Price must be less than $1,000.' };
      rerender(<GeneralInformation {...newProps} />);
      await fireEvent.change(radio, { target: { value: 1 } });
      await fireEvent.change(inputPrice, { target: { name: 'universalBadgePrice', value: 1010 } });
      expect(getByText(validationMessage));
    });
  });

  it('should show taxpayer id format helper modal', async () => {
    const { getByText } = render(<GeneralInformation {...props} />);
    const moreInfoButton = getByText('More info');

    await act(async () => {
      await fireEvent.click(moreInfoButton);
    });

    await expect(getByText('Taxpayer ID Number formats allowed:'));

    await act(async () => {
      await fireEvent.click(getByText('Close'));
    });
  });
});
