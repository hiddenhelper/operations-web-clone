import React, { memo, useCallback, useMemo } from 'react';
import { Box, TableRow, TableCell, Avatar, Badge, withStyles } from '@material-ui/core';

import AvatarImage from 'modules/views/shared/AvatarImage';
import RoleGuard from 'modules/views/shared/RoleGuard';
import TableCellLink from 'modules/views/shared/TableCellLink';
import WorkerInviteStatusIcon from 'modules/views/shared/WorkerInviteStatusIcon';

import { UserModel, WorkerModel } from 'modules/models';
import { tableRowStyles } from 'assets/styles/Tables/styles';
import { avatarGlobalStyles, listGlobalStyles } from 'assets/styles';
import { getDefaultValue } from 'utils';
import { getTradesString } from 'utils/tradeUtils';
import { useStyles, workerStyles } from '../styles';

export interface IWorkerRowProps {
  worker: WorkerModel.IWorker;
  onOpen: (id: string) => void;
}

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const WorkerRow = ({ worker, onOpen }: IWorkerRowProps) => {
  const classes = useStyles();
  const workerClasses = workerStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const listClasses = listGlobalStyles();

  const tradeList = useMemo(() => getTradesString(worker.trades, worker.otherTrade), [worker.trades, worker.otherTrade]);

  const onClick = useCallback(() => onOpen(worker.id), [worker.id, onOpen]);

  return (
    <StyledTableRow data-testid="worker-list-row" key={worker.id} onClick={onClick} className={listClasses.clickableRow}>
      <TableCell className={listClasses.listName}>
        <Box className={workerClasses.workerRow}>
          <Box className={workerClasses.workerCenter}>
            <Badge
              className={`${classes.avatarPosition} ${avatarGlobalClasses.avatarWithSmallBadge}`}
              overlap="circle"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<WorkerInviteStatusIcon invitationStatus={worker.invitationStatus} />}
            >
              <Avatar className={`${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.avatarMedium}`}>
                <AvatarImage url={worker?.pictureUrl} />
              </Avatar>
            </Badge>
            <TableCellLink
              href={`/workers/detail/${worker.id}`}
              testId="worker-list-row-open-button"
              text={`${worker.firstName} ${worker.lastName}`}
              title="Review worker details"
            />
          </Box>
        </Box>
      </TableCell>
      <TableCell>{worker.address?.city && worker.address?.stateCode ? <span>{`${worker.address.city}, ${worker.address.stateName}`}</span> : '-'}</TableCell>
      <TableCell>
        {worker.company?.id ? (
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]} fallback={<>{worker.company.name}</>}>
            <TableCellLink href={`/clients/detail/${worker.company.id}`} text={worker.company.name} title="View Client details" />
          </RoleGuard>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>{tradeList}</TableCell>
      <TableCell>{getDefaultValue(worker.projectsCount, 0)}</TableCell>
    </StyledTableRow>
  );
};

export default memo(WorkerRow);
