import React, { memo, useCallback } from 'react';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import TableCellLink from 'modules/views/shared/TableCellLink';

import { CertificationModel, GeneralModel, UserModel } from 'modules/models';
import { tableGlobalStyles, tableRowStyles } from 'assets/styles/Tables/styles';
import { getDefaultValue, getFormattedDate } from 'utils';
import ThreeDotsPopover from '../Shared/ThreeDotsPopover';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface ICertificationRowProps {
  certification: CertificationModel.IWorkerCertification;
  openDetail: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CertificationTabRow = ({ certification, openDetail, onEdit, onDelete }: ICertificationRowProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const openDetailHandler = useCallback(() => openDetail(certification.id), [openDetail, certification.id]);

  return (
    <StyledTableRow style={{ cursor: 'pointer' }} onClick={openDetailHandler} data-testid="certification-list-row">
      <TableCell>{certification.certification.name}</TableCell>
      <TableCell>{certification.idNumber ? certification.idNumber : '-'}</TableCell>
      <TableCell data-testid="row-completion">{getDefaultValue(getFormattedDate(certification.completionDate, GeneralModel.DateFormat.DATE_TEXT))}</TableCell>
      <TableCell data-testid="row-expiration">{getDefaultValue(getFormattedDate(certification.expirationDate, GeneralModel.DateFormat.DATE_TEXT))} </TableCell>
      <TableCell className={`${tableGlobalClasses.noTopCell} ${tableGlobalClasses.threeDotsWrapper}`} data-testid="row-project">
        {certification.project?.id ? (
          <TableCellLink href={`/projects/detail/${certification.project.id}`} text={certification.project.name} title="View Project detail" />
        ) : (
          'No Related Project'
        )}
      </TableCell>
      <TableCell data-testid="update-delete-cell">
        <PermissionGuard permissionsExpression={UserModel.WorkerCertificationsPermission.MANAGE}>
          <ThreeDotsPopover entity={certification} onEdit={onEdit} onDelete={onDelete} />
        </PermissionGuard>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(CertificationTabRow);
