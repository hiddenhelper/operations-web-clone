import React, { memo, useCallback } from 'react';
import { Radio, TableCell, TableRow, withStyles } from '@material-ui/core';

import RoleGuard from 'modules/views/shared/RoleGuard';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { AccessControlSystemModel, UserModel } from 'modules/models';
import { getDefaultValue } from 'utils';
import { tableGlobalStyles, tableRowStyles } from 'assets/styles/Tables/styles';
import { useStyles as radioStyles } from '../../../../../../shared/FormHandler/ControlledRadio/styles';
import { useStyles } from '../../../../styles';

export interface IAccessControlSystemRowProps {
  isSelected: boolean;
  accessControlSystem: AccessControlSystemModel.IAccessControlSystem;
  onSelect: (id: string) => void;
}

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const AccessControlSystemRow = ({ accessControlSystem, isSelected, onSelect }: IAccessControlSystemRowProps) => {
  const globalClasses = tableGlobalStyles();
  const classes = useStyles();
  const radioClasses = radioStyles();
  const onSelectHandler = useCallback(() => onSelect(accessControlSystem.id), [accessControlSystem, onSelect]);
  const acsType = AccessControlSystemModel.accessControlSystemTypeMap[accessControlSystem.type];

  return (
    <StyledTableRow className={isSelected ? globalClasses.selectedRow : ''} data-testid="assign-list-row" key={accessControlSystem.id}>
      <TableCell>
        <div className={`${globalClasses.tableColoredEllipsis} ${classes.assignNameLeftSpace}`}>
          <Radio
            className={radioClasses.root}
            disableRipple={true}
            color="default"
            checked={isSelected}
            checkedIcon={<span className={`${radioClasses.icon} ${radioClasses.checkedIcon}`} />}
            icon={<span className={`${radioClasses.icon} ${isSelected ? radioClasses.activeIcon : radioClasses.unactiveIcon}`} />}
            data-testid="acs-radio-item"
            onClick={onSelectHandler}
          />
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]} fallback={<>{acsType}</>}>
            <TableCellLink href={`/inventory/access-control-system/wizard/${accessControlSystem.id}`} text={acsType} title="Edit ACS" />
          </RoleGuard>
        </div>
      </TableCell>
      <TableCell>{getDefaultValue(accessControlSystem?.serialNumber, '-')}</TableCell>
      <TableCell>{getDefaultValue(accessControlSystem?.reader1Hostname, '-')}</TableCell>
      <TableCell>{getDefaultValue(accessControlSystem?.reader2Hostname, '-')}</TableCell>
    </StyledTableRow>
  );
};

export default memo(AccessControlSystemRow);
