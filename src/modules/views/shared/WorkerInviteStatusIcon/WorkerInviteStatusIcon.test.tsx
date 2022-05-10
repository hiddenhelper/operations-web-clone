import React from 'react';
import { render } from '@testing-library/react';

import { WorkerModel } from 'modules/models';

import WorkerInviteStatusIcon from './WorkerInviteStatusIcon';

describe('WorkerInviteStatusIcon should render the expected icon', () => {
  it('should render the accepted icon', () => {
    const { getByText } = render(<WorkerInviteStatusIcon invitationStatus={WorkerModel.WorkerStatus.ACTIVE} />);
    getByText('accepted.svg');
  });

  it('should render the pending icon', () => {
    const { getByText } = render(<WorkerInviteStatusIcon invitationStatus={WorkerModel.WorkerStatus.PENDING_REGISTRATION} />);
    getByText('waiting.svg');
  });

  it('should render the expired icon', () => {
    const { getByText } = render(<WorkerInviteStatusIcon invitationStatus={WorkerModel.WorkerStatus.EXPIRED} />);
    getByText('expired.svg');
  });

  it('should render the migrated icon', () => {
    const { getByText } = render(<WorkerInviteStatusIcon invitationStatus={WorkerModel.WorkerStatus.MIGRATED} />);
    getByText('migrated.svg');
  });

  it('should render null for undefined states', () => {
    const { container } = render(<WorkerInviteStatusIcon invitationStatus={null} />);
    expect(container.children.length).toBe(0);
  });
});
