import React, { memo, useCallback } from 'react';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import StatusChip from 'modules/views/shared/StatusChip/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { AccessControlSystemModel, DeviceModel } from 'modules/models';
import { getDefaultValue } from 'utils';
import { listGlobalStyles } from 'assets/styles';
import { useStyles as statusChipStyles } from '../../../../shared/StatusChip/styles';
import { tableRowStyles } from '../../styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const AccessControlSystemRow = ({ accessControlSystem, openDevice }) => {
  const statusChipClasses = statusChipStyles();
  const listClasses = listGlobalStyles();
  const openDeviceHandler = useCallback(redirect => openDevice(accessControlSystem.id, redirect), [openDevice, accessControlSystem.id]);
  return (
    <StyledTableRow data-testid="device-list-row" onClick={() => openDeviceHandler(false)} className={listClasses.clickableRow}>
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
      <TableCell>{getDefaultValue(accessControlSystem.serialNumber)}</TableCell>
      <TableCell>
        {accessControlSystem.project?.id ? (
          <TableCellLink href={`/projects/detail/${accessControlSystem.project.id}`} text={accessControlSystem.project.name} title="View Project detail" />
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
