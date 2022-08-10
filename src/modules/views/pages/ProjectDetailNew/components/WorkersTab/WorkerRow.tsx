import React, { memo, useMemo } from 'react';
import { Avatar, Badge, TableCell, TableRow, withStyles } from '@material-ui/core';

import AvatarImage from 'modules/views/shared/AvatarImage';
import StatusChip from 'modules/views/shared/StatusChip';
import WorkerInviteStatusIcon from 'modules/views/shared/WorkerInviteStatusIcon';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

import { WorkerModel, UserModel } from 'modules/models';
import { getTradesString } from 'utils/tradeUtils';
import { avatarGlobalStyles } from 'assets/styles';
import { useStyles as statusChipStyles } from '../../../../shared/StatusChip/styles';
import { tableRowSecondaryStyles, useStyles } from '../../styles';
import TableCellLink from 'modules/views/shared/TableCellLink';

const StyledTableRow = withStyles(tableRowSecondaryStyles)(TableRow);

export interface IWorkerRowProps {
  onClick: (id: string) => void;
  worker: WorkerModel.IWorkerProject;
}

const WorkerRow = ({ onClick, worker }: IWorkerRowProps) => {
  const classes = useStyles();
  const statusChipClasses = statusChipStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const trades = useMemo(() => getTradesString(worker.trades, worker.otherTrade), [worker.trades, worker.otherTrade]);
  const projectInvitationStatusChipMap = useMemo(
    () => ({
      [WorkerModel.WorkerProjectInvitationStatus.ACTIVE]: { label: 'Active', class: statusChipClasses.active },
      [WorkerModel.WorkerProjectInvitationStatus.PENDING_REGISTRATION]: { label: 'Pending', class: statusChipClasses.pending },
    }),
    [statusChipClasses]
  );
  return (
    <StyledTableRow data-testid="worker-list-row" key={worker.id} onClick={() => onClick(worker.id)} className={classes.pointer}>
      <TableCell>
        <div className={classes.userCenter}>
          <Badge
            className={`${classes.avatarPosition} ${avatarGlobalClasses.avatarWithSmallBadge}`}
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={<WorkerInviteStatusIcon invitationStatus={worker.invitationStatus} />}
          >
            <Avatar className={`${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.avatarMedium}`}>
              <AvatarImage url={worker?.pictureUrl} title={WorkerModel.workerInviteMap[worker.invitationStatus]} />
            </Avatar>
          </Badge>
          <PermissionGuard permissionsExpression={UserModel.WorkersPermission.VIEWACCESS} fallback={<>{worker.firstName + ' ' + worker.lastName}</>}>
            <TableCellLink
              href={`/workers/detail/${worker.id}`}
              testId="worker-row-btn"
              text={`${worker.firstName} ${worker.lastName}`}
              title="View Worker details"
            />
          </PermissionGuard>
        </div>
      </TableCell>
      <TableCell>
        {worker?.company?.id ? (
          <PermissionGuard permissionsExpression={UserModel.ClientsPermission.VIEWACCESS} fallback={<>{worker.company.name}</>}>
            <TableCellLink href={`/clients/detail/${worker.company.id}`} testId="worker-row-btn" text={worker.company.name} title="View Client details" />
          </PermissionGuard>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>{trades}</TableCell>
      <TableCell>
        <StatusChip
          styleClasses={`${projectInvitationStatusChipMap[worker.workerProjectStatus].class} `}
          label={projectInvitationStatusChipMap[worker.workerProjectStatus].label}
        />
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(WorkerRow);
