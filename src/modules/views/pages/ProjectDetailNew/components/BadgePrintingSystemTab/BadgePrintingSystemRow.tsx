import React, { memo, useCallback } from 'react';
import moment from 'moment';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import PermissionGuard from 'modules/views/shared/PermissionGuard';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { BadgePrintingSystemModel, UserModel } from 'modules/models';
import { listGlobalStyles } from 'assets/styles';
import { tableRowStyles } from '../../styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IBadgePrintingSystemRowProps {
  badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem;
  openDrawer: (id: string) => void;
}

const BadgePrintingSystemRow = ({ badgePrinterSystem, openDrawer }: IBadgePrintingSystemRowProps) => {
  const listClasses = listGlobalStyles();
  const onClick = useCallback(() => {
    openDrawer(badgePrinterSystem?.id);
  }, [badgePrinterSystem, openDrawer]);
  return (
    <StyledTableRow data-testid="bps-list-row" key={badgePrinterSystem.id} onClick={onClick} className={listClasses.clickableRow}>
      <TableCell>
        <PermissionGuard permissionsExpression={UserModel.BadgePrintingSystemsPermission.MANAGE} fallback={<>{badgePrinterSystem.name}</>}>
          <TableCellLink href={`/inventory/badge-printing-system/wizard/${badgePrinterSystem.id}`} text={badgePrinterSystem.name} title="Edit BPS" />
        </PermissionGuard>
      </TableCell>
      <TableCell>{badgePrinterSystem.laptopSerialNumber}</TableCell>
      <TableCell>{badgePrinterSystem.printerSerialNumber}</TableCell>
      <TableCell>{badgePrinterSystem.scannerSerialNumber}</TableCell>
      <TableCell>{badgePrinterSystem.shippingDate ? moment(badgePrinterSystem.shippingDate).format('MMMM DD, YYYY') : '-'}</TableCell>
    </StyledTableRow>
  );
};

export default memo(BadgePrintingSystemRow);
