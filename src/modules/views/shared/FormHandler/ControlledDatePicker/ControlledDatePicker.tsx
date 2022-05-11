import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { CalendarIcon } from '../../../../../constants/';
// import { useHideScroll } from '../../../../../utils/useHideScroll';
import { noop } from '../../../../../utils/generalUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, InputAdornment } from '@material-ui/core';

export interface IControlledDatePickerProps {
  name: string;
  value: string;
  variant: 'standard' | 'outlined' | 'filled';
  icon?: React.ReactNode | null;
  iconPosition?: 'start' | 'end' | null;
  startDate?: string;
  endDate?: string;
  autoAccept?: boolean;
  placeholder?: string;
  styleClass?: string;
  inputProps?: any;
  fullWidth?: boolean;
  style?: any;
  error: boolean;
  required?: boolean;
  onChange: (data: any) => void;
  onOpen?: () => void;
  onAccept?: () => void;
  onClose?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  invalidDateMessage?: string;
}
export interface ICustomInputProps {
  onChange?: () => void;
  placeholder?: string;
  value?: string;
  onClick?: () => void;
}

const ControlledDatePicker = ({
  name,
  value,
  variant,
  icon,
  iconPosition,
  startDate,
  endDate,
  required,
  autoAccept = true,
  placeholder = '',
  styleClass = '',
  error,
  fullWidth,
  onChange,
  ...rest
}: IControlledDatePickerProps) => {
  const [state, setState] = useState({ startDate, endDate });
  const ref = useRef(null);
  // const { setHideScroll } = useHideScroll();
  const onDateChange = useCallback(
    date => {
      onChange({
        persist: noop,
        target: {
          name: name,
          value: date?.toUTCString(),
        },
      });
    },
    [onChange, name]
  );
  const extraProps = {};
  if (state.startDate) (extraProps as any).minDate = new Date(state.startDate);
  if (state.endDate) (extraProps as any).maxDate = new Date(state.endDate);

  // const onOpen = useCallback(() => {
  //   setHideScroll(true);
  // }, [setHideScroll]);
  // const onClose = useCallback(() => {
  //   setHideScroll(false);
  // }, [setHideScroll]);

  useEffect(() => {
    setState({ startDate, endDate });
  }, [startDate, endDate]);

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {/* <KeyboardDatePicker
          data-testid="keyboard-date-picker"
          format="MM/DD/YYYY"
          mask="___, ___ __, ____"
          refuse={/[^a-z\d]+/gi}
          value={value}
          onChange={onDateChange}
          animateYearScrolling={true}
          inputVariant={variant}
          variant="inline"
          className={styleClass}
          keyboardIcon={icon ? icon : <CalendarIcon />}
          InputAdornmentProps={{ position: iconPosition ? iconPosition : 'start' }}
          autoOk={autoAccept}
          placeholder={placeholder}
          error={error}
          required={required}
          fullWidth={fullWidth}
          onOpen={onOpen}
          onClose={onClose}
          {...extraProps}
          {...rest}
        /> */}
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={onDateChange}
          placeholderText={placeholder}
          required={required}
          {...extraProps}
          {...rest}
          showMonthDropdown={true}
          showYearDropdown={true}
          dropdownMode="select"
          onCalendarClose={() => ref.current.blur()}
          customInput={
            <TextField
              inputRef={ref}
              data-testid="keyboard-date-picker"
              value={value}
              onChange={onDateChange}
              className={styleClass}
              variant={variant}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon />
                  </InputAdornment>
                ),
              }}
            />
          }
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default memo(ControlledDatePicker);
