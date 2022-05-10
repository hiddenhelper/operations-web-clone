import React from 'react';
import { render } from '@testing-library/react';

import BadgePrintingSystemSummary, { IDeviceDrawerProps } from './BadgePrintingSystemSummary';
import { getFallbackBadgePrinterSystem } from '../../../models/badgePrinterSystem';

describe('BadgePrintingSystemSummary', () => {
  let props: IDeviceDrawerProps;

  beforeEach(() => {
    props = {
      device: getFallbackBadgePrinterSystem(),
    };
  });

  it('should render', () => {
    const wrapper = render(<BadgePrintingSystemSummary {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should print notes', async () => {
    props.device.scanner.notes = 'scanner notes';
    const wrapper = render(<BadgePrintingSystemSummary {...props} />);
    const node = await wrapper.findByText('scanner notes');
    expect(node.textContent).toEqual('scanner notes');
  });
});
