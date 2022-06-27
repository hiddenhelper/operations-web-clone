import React, { memo, useCallback } from 'react';
import { Avatar, Badge, TableCell, TableRow, withStyles } from '@material-ui/core';

import AvatarImage from 'modules/views/shared/AvatarImage';
import Checkbox from 'modules/views/shared/FormHandler/Checkbox';
import RoleGuard from 'modules/views/shared/RoleGuard';
import TableCellLink from 'modules/views/shared/TableCellLink';
import WorkerInviteStatusIcon from 'modules/views/shared/WorkerInviteStatusIcon';

import { UserModel, WorkerModel } from 'modules/models';
import { getConditionalDefaultValue, getDefaultValue } from 'utils';
import { getTradesString } from 'utils/tradeUtils';
import { tableGlobalStyles, tableRowStyles } from 'assets/styles/Tables/styles';
import { avatarGlobalStyles } from 'assets/styles';
import { useStyles } from '../../styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IWorkerModalRowProps {
  isSelected: boolean;
  worker: WorkerModel.IWorker;
  onSelect: (id: string) => void;
}

const WorkerModalRow = ({ worker, isSelected, onSelect }: IWorkerModalRowProps) => {
  const globalClasses = tableGlobalStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const classes = useStyles();

  const onSelectHandler = useCallback(() => onSelect(worker.id), [worker, onSelect]);
  return (
    <StyledTableRow className={isSelected ? globalClasses.selectedRow : ''} data-testid="assign-list-row" key={worker.id}>
      <TableCell>
        <div className={`${globalClasses.tableColoredEllipsis} ${classes.assignNameLeftSpace}`}>
          <Checkbox name="worker" onChange={onSelectHandler} value={worker.id} isChecked={isSelected} />{' '}
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
          <TableCellLink href={`/workers/detail/${worker.id}`} text={`${worker.firstName} ${worker.lastName}`} title="View Worker details" />
        </div>
      </TableCell>
      <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
        <TableCell>
          {worker?.company?.id ? <TableCellLink href={`/clients/detail/${worker.company.id}`} text={worker.company.name} title="View Client details" /> : '-'}
        </TableCell>
      </RoleGuard>
      <TableCell>{getTradesString(worker?.trades, worker?.otherTrade)}</TableCell>
      <TableCell>{`${getDefaultValue(worker.projectsCount, 0)} Project${getConditionalDefaultValue(worker.projectsCount === 1, '', 's')}`}</TableCell>
      <RoleGuard roleList={[UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
        <TableCell>{getDefaultValue(worker?.company?.name)}</TableCell>
      </RoleGuard>
    </StyledTableRow>
  );
};

export default memo(WorkerModalRow);
