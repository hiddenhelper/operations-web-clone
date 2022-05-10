import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SearchInput, { IProps } from './SearchInput';

describe('WorkerResult', () => {
  let props: IProps;

  beforeEach(() => {
    props = {
      chipLabel: 'Workers',
      handleClear: jest.fn(),
      inputRef: undefined,
      isActive: false,
      onChange: jest.fn(),
      onClick: jest.fn(),
      onClose: jest.fn(),
      search: '',
    };
  });

  it('should render input with placeholder', () => {
    const { getByPlaceholderText } = render(<SearchInput {...props} />);
    getByPlaceholderText('Find a project, client, worker...');
  });

  it('should call onClick when clicked', () => {
    const { getByPlaceholderText } = render(<SearchInput {...props} />);
    fireEvent.click(getByPlaceholderText('Find a project, client, worker...'));
    expect(props.onClick).toHaveBeenCalled();
  });

  it('should call onChange with the expected parameters', () => {
    const { getByTestId } = render(<SearchInput {...props} />);
    fireEvent.change(getByTestId('main-search-input'), { target: { value: 'some text' } });
    expect(props.onChange).toHaveBeenCalledWith('some text');
  });

  it('should call onClose when clicking close icon', () => {
    props.isActive = true;
    const { getByTitle } = render(<SearchInput {...props} />);
    fireEvent.click(getByTitle('Close'));
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should render clear icon when search is defined and call onClear when clicking it', () => {
    props.isActive = true;
    props.search = 'search';
    const { getByTitle } = render(<SearchInput {...props} />);
    fireEvent.click(getByTitle('Clear'));
    expect(props.handleClear).toHaveBeenCalled();
  });
});
