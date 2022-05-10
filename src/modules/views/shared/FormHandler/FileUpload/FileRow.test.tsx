import React from 'react';
import { RenderResult, render } from '@testing-library/react';

import FileRow, { IFileUploadRowProps } from './FileRow';
import { getUploadFile_1 } from '../../../../../test/entities';

describe('FileRow', () => {
  let wrapper: RenderResult;
  let props: IFileUploadRowProps;

  beforeEach(() => {
    props = {
      file: getUploadFile_1(),
      showProgress: true,
      showDelete: true,
      deleteFile: jest.fn(),
      showInModal: false,
    };
  });

  it('should render with initial state', () => {
    wrapper = render(<FileRow {...props} />);
    const fileDownloadAnchor = wrapper.queryByTestId('file-download-span-link');
    expect(fileDownloadAnchor).toBeNull();
  });

  it('should render without allowing download', () => {
    props.allowDownload = false;
    wrapper = render(<FileRow {...props} />);
    const fileDownloadAnchor = wrapper.queryByTestId('file-download-span-link');
    expect(fileDownloadAnchor).toBeNull();
  });

  it('should render allowing download', () => {
    props.allowDownload = true;
    props.file.file.url = 'https://test.png';

    wrapper = render(<FileRow {...props} />);
    const fileDownloadAnchor = wrapper.queryByTestId('file-download-span-link');

    expect(fileDownloadAnchor).not.toBeNull();
    expect(fileDownloadAnchor.href).toEqual('https://test.png/');
    expect(fileDownloadAnchor.title).toEqual('test.png');
    expect(fileDownloadAnchor.download).toEqual('test.png');
  });
});
