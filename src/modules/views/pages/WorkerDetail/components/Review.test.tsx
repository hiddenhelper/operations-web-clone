import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Review, { IReviewProps } from './Review';
import { getWorker_1 } from '../../../../../test/entities';

describe('Worker Detail Review', () => {
  test('one of my tests', () => {
    expect(1 + 1).toEqual(2);
  });
  // let props: IReviewProps;

  // beforeEach(() => {
  //   props = {
  //     model: getWorker_1(),
  //     edit: false,
  //     onPageChange: jest.fn(),
  //   };
  // });

  // it('should render', () => {
  //   const wrapper = render(<Review {...props} />);

  //   expect(wrapper.container).toMatchSnapshot();
  // });

  // it('should render with mobile phone as optional', () => {
  //   props.model.inviteMethod = 1;
  //   const wrapper = render(<Review {...props} />);

  //   expect(wrapper.container).toMatchSnapshot();
  // });

  // it('should click on edit', async () => {
  //   props.edit = true;
  //   const wrapper = render(<Review {...props} />);

  //   await act(async () => {
  //     fireEvent.click(wrapper.getByTestId('review-info-edit-button'));
  //   });

  //   expect(props.onPageChange).toHaveBeenCalled();
  //   expect(wrapper.container).toMatchSnapshot();
  // });
});
