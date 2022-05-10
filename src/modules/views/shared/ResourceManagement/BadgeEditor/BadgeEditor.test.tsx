import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';

import BadgeEditor, { IBadgeEditor } from './BadgeEditor';
import { createMockStore } from 'redux-test-utils';
import { getAdminInitialState } from '../../../../../test/rootState';
import { Provider } from 'react-redux';
import { getUploadFile_1, getUploadFile_2 } from '../../../../../test/entities';
import { FileStatus } from '../../../../models/file';

jest.mock('../../../../../utils/generalUtils', () => {
  const { getConditionalDefaultValue, getDefaultValue, getVisitorBadgeText, formatBadgeCode } = jest.requireActual('../../../../../utils/generalUtils');
  return {
    getImageUrl: jest.fn(),
    toREM: jest.fn(),
    hexToRgb: jest.fn(),
    formatPhoneNumber: jest.fn(),
    getConditionalDefaultValue,
    getDefaultValue,
    getVisitorBadgeText,
    formatBadgeCode,
  };
});

describe('BadgeEditor', () => {
  let wrapper: RenderResult;
  let props: IBadgeEditor;
  const BadgeEditorComponent = currentProps => (
    <Provider store={createMockStore(getAdminInitialState()) as any}>
      <BadgeEditor {...currentProps} />
    </Provider>
  );

  beforeEach(() => {
    props = {
      badge: {
        id: 'id-badge-template-layout',
        layout: 1,
        color: 'ffaabb',
        fontColor: '444444',
        font: 'Arial',
      },
      badgeKey: 'generalContractorBadge',
      showLogo: true,
      errors: null,
      uploadId: 'testUpload',
      fileMap: {},
      onChange: jest.fn(),
      setHasChanged: jest.fn(),
    };
  });

  it('should render', () => {
    wrapper = render(<BadgeEditorComponent {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with upload in progress', () => {
    props.fileMap = { testUpload: { file1: { ...getUploadFile_1(), status: FileStatus.INACTIVE } } };
    wrapper = render(<BadgeEditorComponent {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render layout two', async () => {
    props.badge.layout = 2;
    wrapper = render(<BadgeEditorComponent {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('badge-layout-two-btn'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render layout two with default values', () => {
    props.badge.layout = 2;
    props.badge.color = '';
    props.badge.fontColor = '';
    props.badge.font = '';
    props.showLogo = false;

    wrapper = render(<BadgeEditorComponent {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('badge-layout-two-btn'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render layout three', () => {
    props.badge.layout = 3;
    wrapper = render(<BadgeEditorComponent {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('badge-layout-three-btn'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render layout three with default values', () => {
    props.badge.layout = 3;
    props.badge.color = '';
    props.badge.fontColor = '';
    wrapper = render(<BadgeEditorComponent {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('badge-layout-three-btn'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render layout one', () => {
    props.badge.layout = 1;
    wrapper = render(<BadgeEditorComponent {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('badge-layout-one-btn'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render layout one with default values', () => {
    props.badge.layout = 1;
    props.badge.color = '';
    props.badge.fontColor = '';

    wrapper = render(<BadgeEditorComponent {...props} />);
    act(() => {
      fireEvent.click(wrapper.getByTestId('badge-layout-one-btn'));
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render visitor layout', () => {
    props.badge.layout = 4;
    props.visitorMode = true;
    props.badge.color = 'FFE304';
    props.badge.fontColor = '444444';
    props.badge.text = 'PROVISORY BADGE';
    props.badge.font = '';

    wrapper = render(<BadgeEditorComponent {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render visitor layout with default values', () => {
    props.badge.layout = 4;
    props.visitorMode = true;
    props.badge.color = '';
    props.badge.fontColor = '';
    props.badge.text = '';
    props.badge.logoUrl = 'path';

    wrapper = render(<BadgeEditorComponent {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should update', () => {
    props.showLogo = true;
    props.showText = true;
    wrapper = render(<BadgeEditorComponent {...props} />);
    const colorRadioList = wrapper.getAllByTestId('color-item');
    const fontInput = wrapper.getByText('Arial');
    const fileInput = wrapper.getByTestId('file-upload-input');

    act(() => {
      fireEvent.mouseDown(fontInput);
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Verdana'));
    });

    act(() => {
      fireEvent.click(colorRadioList[0]);
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [getUploadFile_1().file, getUploadFile_2().file] } });
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [] } });
    });

    expect(props.onChange).toHaveBeenCalledTimes(2);
  });
});
