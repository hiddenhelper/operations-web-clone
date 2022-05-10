import React, { memo, useCallback, useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';

import Checkbox from 'modules/views/shared/FormHandler/Checkbox';
import ControlledDatePicker from 'modules/views/shared/FormHandler/ControlledDatePicker';
import RoleGuard from 'modules/views/shared/RoleGuard';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { BadgePrintingSystemModel, UserModel } from 'modules/models';
import { tableGlobalStyles, tableRowStyles } from 'assets/styles/Tables/styles';
import { getDefaultValue } from 'utils';
import { useStyles as datePickerStyles } from '../../../../../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from '../../../../styles';

export interface IBadgePrintingSystemRowProps {
  isSelected: boolean;
  badgePrintingSystem: BadgePrintingSystemModel.IBadgePrintingSystem;
  bpsDate: string;
  onSelect: (id: string) => void;
  onChange: (id: string, date: string) => void;
}

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const BadgePrintingSystemRow = ({ badgePrintingSystem, isSelected, bpsDate, onSelect, onChange }: IBadgePrintingSystemRowProps) => {
  const globalClasses = tableGlobalStyles();
  const classes = useStyles();
  const datePickerClasses = datePickerStyles();

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const onSelectHandler = useCallback(() => onSelect(badgePrintingSystem.id), [badgePrintingSystem, onSelect]);
  const onChangeDate = useCallback(
    event => {
      onChange(badgePrintingSystem.id, event.target.value);
      setOpenDatePicker(false);
    },
    [badgePrintingSystem, onChange]
  );
  const onOpenDatePicker = useCallback(() => setOpenDatePicker(true), []);
  const onBlurDatePicker = useCallback(() => setOpenDatePicker(false), []);
  return (
    <StyledTableRow className={isSelected ? globalClasses.selectedRow : ''} data-testid="assign-list-row" key={badgePrintingSystem.id}>
      <TableCell>
        <div className={`${globalClasses.tableColoredEllipsis} ${classes.assignNameLeftSpace}`}>
          <Checkbox name="badgePrintingSystem" onChange={onSelectHandler} value={badgePrintingSystem.id} isChecked={isSelected} />{' '}
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]} fallback={<>{badgePrintingSystem.name}</>}>
            <TableCellLink href={`/inventory/badge-printing-system/wizard/${badgePrintingSystem.id}`} text={badgePrintingSystem.name} title="Edit BPS" />
          </RoleGuard>
        </div>
      </TableCell>
      <TableCell>{getDefaultValue(badgePrintingSystem?.laptopSerialNumber)}</TableCell>
      <TableCell>{getDefaultValue(badgePrintingSystem?.printerSerialNumber)}</TableCell>
      <TableCell>{getDefaultValue(badgePrintingSystem?.scannerSerialNumber)}</TableCell>
      <TableCell>
        <ControlledDatePicker
          placeholder={`${bpsDate || 'Select Date'}`}
          variant="outlined"
          icon={/* istanbul ignore next */ !openDatePicker ? <Edit /> : null}
          iconPosition={/* istanbul ignore next */ !openDatePicker ? 'end' : null}
          name="date"
          styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput} ${datePickerClasses.adornmentEnd} ${
            datePickerClasses.baseInput
          } ${/* istanbul ignore next */ !openDatePicker ? classes.datePickerInline : ''}`}
          value={bpsDate}
          error={false}
          onChange={onChangeDate}
          onOpen={onOpenDatePicker}
          onClose={onBlurDatePicker}
          onAccept={onBlurDatePicker}
          onBlur={onBlurDatePicker}
          inputProps={{ disabled: true }}
        />
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(BadgePrintingSystemRow);
