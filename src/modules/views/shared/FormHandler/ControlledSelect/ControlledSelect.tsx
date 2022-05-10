import React, { memo, useMemo } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface ISelectProps {
  name: string;
  value: string | number;
  options: { value: any; label: string }[];
  error?: any;
  label?: string;
  inlineLabel?: boolean;
  includeNone?: boolean;
  noneLabel?: string;
  noneValue?: string | number;
  dataTestId?: string;
  styleClass?: any;
  disabled?: boolean;
  required?: boolean;
  inputProps?: any;
  variant?: 'outlined' | 'filled' | 'standard';
  showMark?: boolean;
  onChange?: (data: any) => void;
}

const ControlledSelect = ({
  name,
  label,
  value,
  options,
  error,
  inlineLabel = false,
  noneValue = '',
  includeNone = false,
  noneLabel = 'Select Option',
  disabled = false,
  required,
  inputProps = {},
  styleClass = '',
  dataTestId = '',
  variant = 'outlined',
  showMark,
  onChange,
}: ISelectProps) => {
  const classes = useStyles();
  const optionList = useMemo(() => (includeNone ? [{ label: noneLabel, value: noneValue }] : []).concat(options as any), [
    includeNone,
    options,
    noneLabel,
    noneValue,
  ]);
  return (
    <FormControl className={`${inlineLabel ? classes.inlineSelect + ' ' : ''}${classes.formControl} ${styleClass}`}>
      {label && (
        <Typography color="secondary" variant="caption" align="left" component="h1">
          {label} {required && showMark && <span className={classes.requiredMark}>*</span>}
        </Typography>
      )}
      <Select
        id="demo-simple-select-outlined"
        variant={variant}
        labelId="demo-simple-select-outlined-label"
        name={name}
        value={value}
        fullWidth={true}
        error={error}
        data-testid={dataTestId}
        displayEmpty={true}
        disabled={disabled}
        inputProps={{ ...inputProps }}
        className={`${getConditionalDefaultValue(disabled, classes.removeHover, '')}  ${classes.selectElement} ${
          includeNone && value === '' ? classes.inactiveOption : ''
        }`}
        MenuProps={{
          disableScrollLock: false,
        }}
        onChange={onChange}
        required={required}
      >
        {optionList.map((option, index) => (
          <MenuItem key={index} value={option.value} className={classes.selectItem}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(ControlledSelect);
