import React from 'react';
import { render } from '@testing-library/react';

import DashboardWidget, { IDashboardWidget } from './DashboardWidget';
import DashboardWidgetInlineHeader from './DashboardWidgetInlineHeader';
import DashboardWidgetHeader from './DashboardWidgetHeader';

describe('DashboardWidget', () => {
  let props: IDashboardWidget;

  beforeEach(() => {
    props = {
      renderHeader: () => <DashboardWidgetInlineHeader title="test" isLoading={false} />,
      renderContent: () => <div>test</div>,
      showDivider: false,
      renderDetail: () => <div>test</div>,
    };
  });

  it('should render with primary header', () => {
    const { container } = render(<DashboardWidget {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with primary header and secondary values', () => {
    props.renderHeader = () => <DashboardWidgetInlineHeader title="test" subtitle="test" isLoading={true} />;
    const { container } = render(<DashboardWidget {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with secondary header', () => {
    props.renderHeader = () => <DashboardWidgetHeader title="test" activity={<div>test</div>} isLoading={false} />;
    props.showDivider = true;
    const { container } = render(<DashboardWidget {...props} />);
    expect(container).toMatchSnapshot();
  });
});
