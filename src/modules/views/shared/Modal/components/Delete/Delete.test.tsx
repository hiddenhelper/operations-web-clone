import React from 'react';
import { render } from '@testing-library/react';

import DeleteModal, { IDeleteProps } from './Delete';

describe('Delete Modal Component', () => {
  let props: IDeleteProps;

  beforeEach(() => {
    props = {
      title: 'title',
      onCancel: jest.fn(),
      onConfirm: jest.fn(),
      text: '',
      confirmLoadingText: 'Loading...',
      isLoading: true,
    };
  });

  it('should render with the loading indicator', () => {
    const wrapper = render(<DeleteModal {...props} />);
    // expect(wrapper.findByText('Loading...')).toMatchSnapshot();
  });
});
