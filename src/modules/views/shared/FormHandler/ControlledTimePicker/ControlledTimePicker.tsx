import React, { memo, useCallback } from 'react';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { CalendarIcon } from '../../../../../constants';

export interface IControlledTimePickerProps {
  name: string;
  value: string;
  variant: 'standard' | 'outlined' | 'filled';
  iconPosition?: 'start' | 'end' | null;
  startDate?: string;
  endDate?: string;
  autoAccept?: boolean;
  placeholder?: string;
  styleClass?: string;
  inputProps?: any;
  fullWidth?: boolean;
  error: boolean;
  onChange: (data: any) => void;
  onOpen?: () => void;
  onAccept?: () => void;
  onClose?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ControlledTimePicker = ({
  name,
  value,
  variant,
  iconPosition,
  autoAccept = true,
  placeholder = '',
  styleClass = '',
  error,
  fullWidth,
  onChange,
  ...rest
}: IControlledTimePickerProps) => {
  const onDateChange = useCallback(
    date => {
      onChange({
        persist: /* istanbul ignore next */ () => {
          /* */
        },
        target: {
          name: name,
          value: date,
        },
      });
    },
    [onChange, name]
  );
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardTimePicker
        data-testid="keyboard-time-picker"
        format="hh:mm"
        value={value}
        onChange={onDateChange}
        inputVariant={variant}
        variant="inline"
        className={styleClass}
        keyboardIcon={<CalendarIcon />}
        InputAdornmentProps={{ position: iconPosition ? iconPosition : 'start' }}
        autoOk={autoAccept}
        placeholder={placeholder}
        error={error}
        fullWidth={fullWidth}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

export default memo(ControlledTimePicker);
