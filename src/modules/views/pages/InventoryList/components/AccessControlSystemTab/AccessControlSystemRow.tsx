import React, { memo, useCallback } from 'react';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import StatusChip from 'modules/views/shared/StatusChip/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { AccessControlSystemModel, DeviceModel, UserModel } from 'modules/models';
import { getDefaultValue } from 'utils';
import { listGlobalStyles } from 'assets/styles';
import { useStyles as statusChipStyles } from '../../../../shared/StatusChip/styles';
import { tableRowStyles } from '../../styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const AccessControlSystemRow = ({ accessControlSystem, openDevice }) => {
  const statusChipClasses = statusChipStyles();
  const listClasses = listGlobalStyles();
  const openDeviceHandler = useCallback(redirect => openDevice(accessControlSystem.id, redirect), [openDevice, accessControlSystem.id]);
  return (
    <StyledTableRow data-testid="device-list-row" onClick={() => openDeviceHandler(false)} className={listClasses.clickableRow}>
      <PermissionGuard
        permissionsExpression={UserModel.AccessControlSystemsPermission.MANAGE}
        fallback={<TableCell>{AccessControlSystemModel.accessControlSystemTypeMap[accessControlSystem.type]}</TableCell>}
      >
        <TableCell
          className={`${listClasses.listName} ${listClasses.listNameFullWidth} ${listClasses.clickableTableCell}`}
          onClick={e => {
            e.stopPropagation();
            openDeviceHandler(true);
          }}
        >
          {/* <TableCellLink
          href={`/inventory/access-control-system/wizard/${accessControlSystem.id}`}
          text={AccessControlSystemModel.accessControlSystemTypeMap[accessControlSystem.type]}
          title="Edit ACS"
        /> */}
          {AccessControlSystemModel.accessControlSystemTypeMap[accessControlSystem.type]}
        </TableCell>
      </PermissionGuard>
      <TableCell>{getDefaultValue(accessControlSystem.serialNumber)}</TableCell>
      <TableCell>
        {accessControlSystem.project?.id ? (
          <PermissionGuard permissionsExpression={UserModel.ProjectsPermission.VIEWACCESS} fallback={<TableCell>{accessControlSystem.project.name}</TableCell>}>
            <TableCellLink href={`/projects/detail/${accessControlSystem.project.id}`} text={accessControlSystem.project.name} title="View Project detail" />
          </PermissionGuard>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>{getDefaultValue(accessControlSystem?.location?.name)}</TableCell>
      <TableCell>
        <StatusChip
          styleClasses={`${accessControlSystem.status === DeviceModel.DeviceStatus.AVAILABLE ? statusChipClasses.available : statusChipClasses.assigned} `}
          label={DeviceModel.deviceStatusMap[accessControlSystem.status]}
        />
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(AccessControlSystemRow);
