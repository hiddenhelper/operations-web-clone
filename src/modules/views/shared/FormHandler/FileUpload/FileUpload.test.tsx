import React from 'react';
import { RenderResult, render, act, fireEvent } from '@testing-library/react';

import FileUpload, { IFileUploadProps } from './FileUpload';
import { getUploadFile_1, getUploadFile_2, getUploadFile_3, getUploadFile_4, getUploadFile_5 } from '../../../../../test/entities';
import { FileModel } from '../../../../models';

describe('FileUpload', () => {
  let wrapper: RenderResult;
  let props: IFileUploadProps;

  beforeEach(() => {
    Date.now = jest.fn(() => 123456);
    props = {
      fileMap: {
        [getUploadFile_1().uploadId]: {
          [getUploadFile_1().id]: getUploadFile_1(),
          [getUploadFile_2().id]: getUploadFile_2(),
          [getUploadFile_3().id]: getUploadFile_3(),
          [getUploadFile_4().id]: getUploadFile_4(),
        },
      },
      uploadId: getUploadFile_1().uploadId,
      inputProps: { multiple: true },
      addFileList: jest.fn(),
      removeFile: jest.fn(),
      clearFileMap: jest.fn(),
      clearDefaultFileToRemoveList: jest.fn(),
      onChange: jest.fn(),
    };
  });

  it('should render', () => {
    props.showProgress = true;
    wrapper = render(<FileUpload {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render empty', () => {
    props.fileMap = {};
    wrapper = render(<FileUpload {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should add file', () => {
    props.fileMap = {};
    wrapper = render(<FileUpload {...props} />);
    const fileInput = wrapper.getByTestId('file-upload-input');

    act(() => {
      fireEvent.change(fileInput, { target: { files: [getUploadFile_1().file, getUploadFile_2().file] } });
    });

    expect(props.addFileList).toHaveBeenCalledWith(getUploadFile_1().uploadId, [
      { ...getUploadFile_1(), id: `123456-${getUploadFile_1().file.name}` },
      { ...getUploadFile_2(), id: `123456-${getUploadFile_2().file.name}`, status: FileModel.FileStatus.INACTIVE },
    ]);
  });

  it('should invalid files', () => {
    props.fileMap = {};
    props.supportedExtensionList = ['png', 'jpg'];
    wrapper = render(<FileUpload {...props} />);
    const fileInput = wrapper.getByTestId('file-upload-input');

    act(() => {
      fireEvent.change(fileInput, { target: { files: [getUploadFile_4().file, getUploadFile_5().file] } });
    });

    expect(props.addFileList).toHaveBeenCalledWith(getUploadFile_1().uploadId, [
      {
        ...getUploadFile_4(),
        error: 'Unsupported extension',
        id: `123456-${getUploadFile_4().file.name}`,
        status: FileModel.FileStatus.FAIL,
      },
      {
        ...getUploadFile_5(),
        error: 'File size exceed the limit allowed of 1 MB.',
        id: `123456-${getUploadFile_5().file.name}`,
        status: FileModel.FileStatus.FAIL,
      },
    ]);
  });

  it('should delete file', () => {
    wrapper = render(<FileUpload {...props} />);
    const deleteRowInput = wrapper.getAllByTestId('file-upload-row')[0];

    act(() => {
      fireEvent.click(deleteRowInput);
    });

    expect(props.removeFile).toHaveBeenCalledWith(getUploadFile_1().uploadId, getUploadFile_1().id);
  });

  it('should delete file without callback', () => {
    props.onChange = undefined;
    wrapper = render(<FileUpload {...props} />);
    const deleteRowInput = wrapper.getAllByTestId('file-upload-row')[0];

    act(() => {
      fireEvent.click(deleteRowInput);
    });

    expect(props.removeFile).toHaveBeenCalledWith(getUploadFile_1().uploadId, getUploadFile_1().id);
  });
});
