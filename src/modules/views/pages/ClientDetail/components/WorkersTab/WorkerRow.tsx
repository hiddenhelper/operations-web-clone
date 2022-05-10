import React, { memo } from 'react';
import { Avatar, Badge, TableCell, TableRow, withStyles } from '@material-ui/core';

import AvatarImage from 'modules/views/shared/AvatarImage';
import TableCellLink from 'modules/views/shared/TableCellLink';
import WorkerInviteStatusIcon from 'modules/views/shared/WorkerInviteStatusIcon';

import { WorkerModel } from 'modules/models';
import { avatarGlobalStyles, listGlobalStyles, tableGlobalStyles } from 'assets/styles';
import { getTradesString } from 'utils/tradeUtils';
import { getLocationString } from 'utils/addressUtils';
import { tableRowStyles, useStyles } from '../../styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IWorkerRowProps {
  worker: WorkerModel.IWorker;
  onClick: (id: string) => void;
}

const WorkerRow = ({ worker, onClick }: IWorkerRowProps) => {
  const classes = useStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const listClasses = listGlobalStyles();
  const tableGlobalClasses = tableGlobalStyles();
  return (
    <StyledTableRow data-testid="worker-client-list-row" key={worker.id} onClick={() => onClick(worker.id)} className={listClasses.clickableRow}>
      <TableCell className={tableGlobalClasses.cellAvatar}>
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
          <TableCellLink
            href={`/workers/detail/${worker.id}`}
            testId="worker-row-btn"
            text={`${worker.firstName} ${worker.lastName}`}
            title="View Worker detail"
          />
        </div>
      </TableCell>
      <TableCell>{getLocationString(worker.address?.city, worker.address?.stateName)}</TableCell>
      <TableCell>{getTradesString(worker.trades, worker.otherTrade)}</TableCell>
      <TableCell>{worker.projectsCount}</TableCell>
    </StyledTableRow>
  );
};

export default memo(WorkerRow);
