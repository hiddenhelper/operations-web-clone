import React from 'react';
import { render } from '@testing-library/react';

import StatisticWidget, { IStatisticWidget } from './StatisticWidget';

describe('StatisticWidget', () => {
  let wrapper;
  let props: IStatisticWidget;

  beforeEach(() => {
    props = {
      loading: false,
      title: 'Title',
      content: 284,
      inlineContent: false,
    };
  });

  it('should render', () => {
    wrapper = render(<StatisticWidget {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with secondary values', () => {
    props.subtitle = 'Subtitle';
    wrapper = render(<StatisticWidget {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with inline content', () => {
    props.inlineContent = true;
    props.renderActivity = <div>renderActivity</div>;
    props.renderAuxContent = <div>renderAuxContent</div>;
    wrapper = render(<StatisticWidget {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with loading status', () => {
    props.loading = true;
    props.inlineContent = false;
    props.renderAuxContent = <div>renderAuxContent</div>;
    wrapper = render(<StatisticWidget {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with loading status with no auxContent', () => {
    props.loading = true;
    props.inlineContent = false;
    props.renderActivity = <div>renderActivity</div>;
    wrapper = render(<StatisticWidget {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render with loading status and inline content', () => {
    props.loading = true;
    props.inlineContent = true;
    props.renderActivity = <div>renderActivity</div>;
    props.renderAuxContent = <div>renderAuxContent</div>;
    wrapper = render(<StatisticWidget {...props} />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
