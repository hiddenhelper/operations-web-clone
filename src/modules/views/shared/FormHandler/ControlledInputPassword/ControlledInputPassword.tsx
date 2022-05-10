import React, { memo, useState, useCallback } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import ControlledInput from '../ControlledInput';

import { VisibilityOn, VisibilityOff } from '../../../../../constants';

import { useStyles as inputStyles } from '../ControlledInput/styles';
import { useStyles } from './styles';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';

export interface IControlledInputPasswordProps {
  fieldName: string;
  value: string;
  label: string;
  error: string;
  rules: any;
  placeholder?: string;
  dataTestId?: string;
  styleClass?: any;
  onChangeHandler: (value) => void;
  onBlurValidate: (value) => void;
}

const ControlledInputPassword = ({
  fieldName,
  value,
  label,
  error,
  rules,
  placeholder,
  dataTestId,
  styleClass = '',
  onChangeHandler,
  onBlurValidate,
}: IControlledInputPasswordProps) => {
  const classes = useStyles();
  const inputClasses = inputStyles();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }, []);

  return (
    <ControlledInput styleClass={`${inputClasses.loginLabels} ${styleClass}`} label={label} required={true} dataTestId="confirm-password-wrapper">
      <TextField
        name={fieldName}
        autoComplete="off"
        variant="outlined"
        fullWidth={true}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        className={inputClasses.textField}
        aria-describedby="confirm-password-password"
        required={rules.required}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurValidate}
        error={!!error}
        inputProps={{
          'data-testid': dataTestId,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              className={`${value.length > 0 && !error ? classes.filledInput : ''}  ${!!error ? classes.errorIcon : ''}  ${inputClasses.loginIcons}`}
              position="start"
            >
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                data-testid="toggle-visibility-button"
                aria-label="toggle-visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOn
                    className={` ${classes.inactiveIcon} ${getConditionalDefaultValue(value.length > 0, classes.filledInput, classes.inactiveIcon)}`}
                  />
                ) : (
                  <VisibilityOff
                    className={` ${classes.inactiveIcon} ${getConditionalDefaultValue(value.length > 0, classes.filledInput, classes.inactiveIcon)}`}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </ControlledInput>
  );
};

export default memo(ControlledInputPassword);
