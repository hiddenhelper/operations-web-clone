import React from 'react';
import { WorkerStatus } from 'modules/models/worker';
import { AcceptedIcon, ExpiredIcon, PendingIcon, MigratedIcon } from 'constants/index';

const statusIconMap = {
  [WorkerStatus.ACTIVE]: <AcceptedIcon />,
  [WorkerStatus.PENDING_REGISTRATION]: <PendingIcon />,
  [WorkerStatus.EXPIRED]: <ExpiredIcon />,
  [WorkerStatus.MIGRATED]: <MigratedIcon />,
};

const WorkerInviteStatusIcon = ({ invitationStatus }: { invitationStatus: WorkerStatus }) => statusIconMap[invitationStatus] ?? null;

export default WorkerInviteStatusIcon;
