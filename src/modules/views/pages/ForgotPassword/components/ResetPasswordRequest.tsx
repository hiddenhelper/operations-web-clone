import React, { memo, useCallback } from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';

import AuthScreenLayout from '../../../shared/AuthScreenLayout/AuthScreenLayout';
import ControlledError from '../../../shared/FormHandler/ControlledError/ControlledError';
import ControlledInput from '../../../shared/FormHandler/ControlledInput/ControlledInput';
import ButtonLoader from '../../../shared/ButtonLoader/ButtonLoader';
import { useForm } from '../../../../../utils/useForm';
import { ruleMap } from '../../../../../utils/useValidator';

import { useStyles } from '../styles';
import { GeneralModel } from '../../../../models';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';

export interface IResetPasswordRequestProps {
  loadingStatus: GeneralModel.ILoadingStatus;
  onResetPassword: (email: string) => void;
}

const ResetPasswordRequest = ({ loadingStatus, onResetPassword }: IResetPasswordRequestProps) => {
  const classes = useStyles();

  const { model, formRules, errors, onSubmit, onChange, onValidate } = useForm<{ email: string }>({
    initValues: { email: '' },
    formRules: { email: { required: true, rules: [ruleMap.isValidEmail] } },
    onSubmitCallback: onResetPassword,
  });

  const onChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );

  const onBlurValidate = useCallback(event => onValidate(event.target.name), [onValidate]);

  return (
    <AuthScreenLayout
      title="Reset your Password"
      subtitle="Please enter your Email Address and we will send you a Link to reset your Password"
      renderContent={() => (
        <form autoComplete={'off'} noValidate={true} onSubmit={/* istanbul ignore next */ event => event.preventDefault()}>
          <ControlledError
            show={!!errors.email}
            error={getConditionalDefaultValue(errors.email && errors.email === 'is required', 'Please enter Email.', errors.email)}
            styleClass={classes.resetPasswordError}
          >
            <ControlledInput styleClass={classes.emailInput} label="Email" required={true} dataTestId="email-wrapper">
              <TextField
                name="email"
                autoComplete="off"
                variant="outlined"
                fullWidth={true}
                placeholder="Email"
                type="text"
                className={classes.emailTextField}
                aria-describedby="reset-password-email"
                required={formRules.email.required}
                value={model.email}
                onChange={onChangeHandler}
                onBlur={onBlurValidate}
                error={!!errors.email}
                inputProps={{
                  'data-testid': 'email-input',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      className={`${getConditionalDefaultValue(
                        model.email.length > 0 && !errors.email,
                        classes.filledEmailIcon,
                        ''
                      )} ${getConditionalDefaultValue(errors.email, classes.errorEmailIcon, '')} ${classes.emailIcon}`}
                      position="start"
                    >
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </ControlledInput>
          </ControlledError>
          <div className={classes.resetPasswordBtnWrapper}>
            <ButtonLoader
              className={classes.resetPasswordBtn}
              color="primary"
              variant="contained"
              fullWidth={true}
              size="large"
              type="submit"
              disabled={false}
              onClick={onSubmit}
              data-testid="reset-pwd-btn"
              isLoading={loadingStatus && loadingStatus.isLoading}
              text="Reset Password"
              loadingText="Resetting Password..."
            />
          </div>
        </form>
      )}
    />
  );
};

export default memo(ResetPasswordRequest);
