import React, { memo, useCallback } from 'react';
import moment from 'moment';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import StatusChip from 'modules/views/shared/StatusChip/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { BadgePrintingSystemModel, DeviceModel, UserModel } from 'modules/models';
import { tableRowStyles } from '../../styles';
import { useStyles as statusChipStyles } from '../../../../shared/StatusChip/styles';
import { listGlobalStyles } from 'assets/styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IBadgePrintingSystemRow {
  badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem;
  openDevice: (id: string, redirect: boolean) => void;
}

const BadgePrinterSystemRow = ({ badgePrinterSystem, openDevice }: IBadgePrintingSystemRow) => {
  const statusChipClasses = statusChipStyles();
  const listClasses = listGlobalStyles();
  const openDeviceHandler = useCallback(redirect => openDevice(badgePrinterSystem.id, redirect), [openDevice, badgePrinterSystem.id]);
  return (
    <StyledTableRow data-testid="device-list-row" onClick={() => openDeviceHandler(false)} className={listClasses.clickableRow}>
      <PermissionGuard permissionsExpression={UserModel.BadgePrintingSystemsPermission.MANAGE} fallback={<TableCell>{badgePrinterSystem.name}</TableCell>}>
        <TableCell
          className={`${listClasses.listName} ${listClasses.listNameFullWidth} ${listClasses.clickableTableCell}`}
          onClick={e => {
            e.stopPropagation();
            openDeviceHandler(true);
          }}
        >
          {/* <TableCellLink
            href={`/inventory/badge-printing-system/wizard/${badgePrinterSystem.id}`}
            testId="project-list-row-item-link"
            text={badgePrinterSystem.name}
            title="Edit BPS"
          /> */}
          {badgePrinterSystem.name}
        </TableCell>
      </PermissionGuard>

      <TableCell>
        {badgePrinterSystem.project?.id ? (
          <PermissionGuard permissionsExpression={UserModel.ProjectsPermission.VIEWACCESS} fallback={<TableCell>{badgePrinterSystem.project.name}</TableCell>}>
            <TableCellLink href={`/projects/detail/${badgePrinterSystem.project.id}`} text={badgePrinterSystem.project.name} title="View Project detail" />
          </PermissionGuard>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>{badgePrinterSystem?.shippingDate ? moment(badgePrinterSystem.shippingDate).format('MMMM DD, YYYY') : '-'}</TableCell>
      <TableCell>
        <StatusChip
          styleClasses={`${badgePrinterSystem.status === DeviceModel.DeviceStatus.AVAILABLE ? statusChipClasses.available : statusChipClasses.assigned} `}
          label={DeviceModel.deviceStatusMap[badgePrinterSystem.status]}
        />
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(BadgePrinterSystemRow);
