import React, { memo, useCallback } from 'react';
import moment from 'moment';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import TableCellLink from 'modules/views/shared/TableCellLink';

import { TrainingModel, UserModel } from 'modules/models';
import { tableRowStyles } from 'assets/styles/Tables/styles';
import { formatBadgeCode } from 'utils';
import ThreeDotsPopover from '../Shared/ThreeDotsPopover';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface ITrainingRowProps {
  training: TrainingModel.IWorkerTraining;
  openDetail: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TrainingTabRow = ({ training, openDetail, onEdit, onDelete }: ITrainingRowProps) => {
  const openDetailHandler = useCallback(() => openDetail(training.id), [openDetail, training.id]);

  return (
    <StyledTableRow style={{ cursor: 'pointer' }} onClick={openDetailHandler} data-testid="training-list-row">
      <TableCell>{training.training.name}</TableCell>
      <TableCell>{training.completionDate ? moment(training.completionDate).format('MMMM DD, YYYY') : '-'}</TableCell>
      <TableCell>{training.trainerName}</TableCell>
      <TableCell>{training.trainerBadgeCode ? formatBadgeCode(training.trainerBadgeCode) : '-'}</TableCell>
      <TableCell>
        {training?.project?.id ? (
          <TableCellLink href={`/projects/detail/${training.project.id}`} text={training.project.name} title="View Project detail" />
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell data-testid="update-delete-cell">
        <PermissionGuard permissionsExpression={UserModel.WorkerTrainingsPermission.MANAGE}>
          <ThreeDotsPopover entity={training} onEdit={onEdit} onDelete={onDelete} />
        </PermissionGuard>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(TrainingTabRow);
