import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

import SettingsTab from '../../../../shared/Settings/Tab';
import ControlledInputPassword from '../../../../shared/FormHandler/ControlledInputPassword';
import ControlledButton from '../../../../shared/FormHandler/ControlledButton';
import PasswordConfirmForm from '../../../../shared/PasswordConfirmForm';
import ButtonLoader from '../../../../shared/ButtonLoader';

import { GeneralModel } from '../../../../../models';
import { resetPasswordRules, IResetPasswordData, resetPasswordData } from '../../../../../../constants/form/accountRules';
import { LANG } from '../../../../../../constants';
import { useForm } from '../../../../../../utils/useForm';
import { getConditionalDefaultValue } from '../../../../../../utils/generalUtils';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../../styles';

export interface IPasswordTabProps {
  disabled?: boolean;
  loading: GeneralModel.ILoadingStatus;
  changePassword: (currentPassword: string, newPassword: string) => void;
  clearLoading: () => void;
}

const PasswordTab = ({ disabled = false, loading, changePassword, clearLoading }: IPasswordTabProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();

  const currentPasswordError = useMemo(
    () => loading && loading.error?.errors?.PASSWORD_UPDATE_FAILED && loading.error?.errors?.PASSWORD_UPDATE_FAILED[0] === 'Incorrect Current Password',
    [loading]
  );

  const onChangePassword = useCallback(
    data => {
      changePassword(data.currentPassword, data.newPassword);
    },
    [changePassword]
  );

  const { model, formRules, errors, hasChanges, onSubmit, onChange, discardChanges, update, onValidate, resetErrors } = useForm<IResetPasswordData>({
    initValues: resetPasswordData,
    formRules: resetPasswordRules,
    onSubmitCallback: onChangePassword,
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

  const handleDiscard = useCallback(() => {
    discardChanges();
    resetErrors();
  }, [resetErrors, discardChanges]);

  useEffect(() => {
    if (loading && !loading.isLoading) {
      update(resetPasswordData);
    }
  }, [loading, update]);

  useEffect(() => {
    return function unMount() {
      clearLoading();
    };
  }, [clearLoading]);
  return (
    <SettingsTab
      renderWrapperContent={() => (
        <>
          <div className={classes.currentPasswordSpacing}>
            {currentPasswordError && (
              <div className={`${classes.errorSettingsResponse} ${classes.errorSettingsResponseMarginBottom}`}>
                <WarningIcon />
                <Typography>Incorrect Current Password</Typography>
              </div>
            )}
            <ControlledInputPassword
              fieldName="currentPassword"
              value={model.currentPassword}
              error={errors.currentPassword}
              rules={formRules.currentPassword}
              label="Current Password"
              placeholder="Current Password"
              dataTestId="current-password"
              onChangeHandler={onChangeHandler}
              onBlurValidate={onBlurValidate}
            />
          </div>
          <PasswordConfirmForm
            passwordField="newPassword"
            passwordLabel="New Password"
            formRules={formRules}
            model={model}
            errors={errors}
            onChangeHandler={onChangeHandler}
            onBlurValidate={onBlurValidate}
          />
        </>
      )}
      renderContainerContent={() => (
        <div className={`${classes.formButtonWrapper} ${classes.passwordButtonWrapper}`}>
          <ControlledButton styleClass={getConditionalDefaultValue(!hasChanges, buttonClasses.noOutline, '')}>
            <Button data-testid="discard-changes-btn" color="primary" className={buttonClasses.discardButton} disabled={!hasChanges} onClick={handleDiscard}>
              {LANG.EN.NAVIGATION_TOP.ACTIONS.DISCARD}
            </Button>
          </ControlledButton>
          <ControlledButton styleClass={disabled ? buttonClasses.noOutline : ''}>
            <ButtonLoader
              text={LANG.EN.NAVIGATION_TOP.ACTIONS.SAVE}
              loadingText="Saving..."
              isLoading={loading && loading.isLoading}
              data-testid="next-changes-btn"
              className={`${buttonClasses.nextButton} ${buttonClasses.noPadding} ${loading && loading.isLoading ? classes.changePasswordButton : ''}`}
              color="primary"
              variant="contained"
              size="large"
              disabled={!hasChanges}
              onClick={onSubmit}
            />
          </ControlledButton>
        </div>
      )}
    />
  );
};

export default memo(PasswordTab);
