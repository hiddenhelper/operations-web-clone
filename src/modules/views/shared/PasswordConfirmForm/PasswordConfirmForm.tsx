import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import ControlledError from '../FormHandler/ControlledError';
import ControlledInputPassword from '../FormHandler/ControlledInputPassword/ControlledInputPassword';

import { useStyles } from './styles';
import { IFormRules } from '../../../../utils/useValidator';
import { getConditionalDefaultValue } from '../../../../utils/generalUtils';

export interface IPasswordConfirmProps {
  formRules: IFormRules;
  model: {
    password?: string;
    newPassword?: string;
    confirmPassword: string;
  };
  errors: any;
  passwordField?: string;
  passwordLabel?: string;
  onChangeHandler: (model: any) => void;
  onBlurValidate: (model: any) => void;
}

const PasswordConfirmForm = ({
  passwordField = 'password',
  passwordLabel = 'Password',
  formRules,
  model,
  errors,
  onChangeHandler,
  onBlurValidate,
}: IPasswordConfirmProps) => {
  const classes = useStyles();
  return (
    <>
      <ControlledInputPassword
        fieldName={passwordField}
        value={model[passwordField]}
        error={errors[passwordField]}
        rules={formRules[passwordField]}
        label={passwordLabel}
        placeholder={passwordLabel}
        dataTestId="password"
        onChangeHandler={onChangeHandler}
        onBlurValidate={onBlurValidate}
      />
      <Typography
        className={getConditionalDefaultValue(
          errors[passwordField],
          `${classes.inputSubtitle} ${classes.inputSubtitleError} ${classes.errorLoginMessage}`,
          classes.inputSubtitle
        )}
      >
        Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number and one symbol.
      </Typography>
      <ControlledError
        show={!!errors.confirmPassword}
        error={errors.confirmPassword && errors.confirmPassword === 'is required' ? 'Please enter Confirm Password.' : errors.confirmPassword}
        styleClass={classes.errorLoginMessage}
      >
        <ControlledInputPassword
          fieldName="confirmPassword"
          value={model.confirmPassword}
          error={errors.confirmPassword}
          rules={formRules.confirmPassword}
          label={`Confirm ${passwordLabel}`}
          placeholder={`Confirm ${passwordLabel}`}
          dataTestId="confirm-password"
          onChangeHandler={onChangeHandler}
          onBlurValidate={onBlurValidate}
        />
      </ControlledError>
    </>
  );
};

export default memo(PasswordConfirmForm);
