import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';

import { clientStepMap, ClientStep } from '../../../../models/client';
import ProcessOverview, { IProcessOverviewProps } from './ProcessOverview';
import StepIcon from './StepIcon';

jest.mock('./StepIcon', () => {
  return jest.fn(() => null);
});

describe('Process Overview', () => {
  let wrapper: RenderResult;
  let props: IProcessOverviewProps;

  beforeEach(() => {
    props = {
      completedFields: {
        'general-information': {
          title: 'General Information',
          required: 2,
          completed: 1,
          order: 0,
        },
        addresses: {
          title: 'Addresses',
          required: 3,
          completed: 2,
          order: 1,
        },
        users: {
          title: 'Users',
          required: 2,
          completed: 2,
          order: 2,
        },
        review: {
          title: 'Review',
          required: 0,
          completed: 0,
          order: 3,
        },
      },
      currentStep: clientStepMap[ClientStep.GENERAL_INFORMATION],
      onChangeStep: jest.fn(),
    };

    wrapper = render(<ProcessOverview {...props} />);
  });

  afterAll(() => {
    // @ts-ignore
    StepIcon.mockRestore();
  });

  it('should render', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should call set step handler on button click', async () => {
    wrapper = render(<ProcessOverview {...props} />);

    const stepButtons = await wrapper.findAllByTestId('step-button');

    await act(async () => {
      fireEvent.click(stepButtons[1]);
    });

    expect(props.onChangeStep).toBeCalledWith('addresses');
  });
});
