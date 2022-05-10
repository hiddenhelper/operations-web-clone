import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { List } from '@material-ui/icons';

import { Banner, IBannerProps } from './Banner';

describe('Banner Component', () => {
  const props: IBannerProps = { buttonLabel: 'Review' };

  it('should render with title', () => {
    props.title = 'Test title';
    const { getByText } = render(<Banner {...props} />);
    getByText('Test title');
  });

  it('should render with subTitle', () => {
    props.subTitle = 'Sub title test';
    const { getByText } = render(<Banner {...props} />);
    getByText('Sub title test');
  });

  it('should render with icon', () => {
    props.icon = <List />;
    const { getByTestId } = render(<Banner {...props} />);
    getByTestId('icon-container');
  });

  it('should handle click', () => {
    props.onButtonClick = jest.fn();
    const { getByText } = render(<Banner {...props} />);
    fireEvent.click(getByText('Review'));
    expect(props.onButtonClick).toHaveBeenCalled();
  });
});
