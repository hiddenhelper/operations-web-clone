import React, { memo, useCallback } from 'react';

import AuthScreenLayout from '../../../shared/AuthScreenLayout';
import ButtonLoader from '../../../shared/ButtonLoader';
import PasswordConfirmForm from '../../../shared/PasswordConfirmForm';

import { useForm } from '../../../../../utils/useForm';
import { useStyles } from '../../ForgotPassword/styles';
import { GeneralModel } from '../../../../models';
import { fieldRules } from '../../../../../constants/form/accountRules';

export interface IResetPasswordFormProps {
  loadingStatus: GeneralModel.ILoadingStatus;
  onResetPasswordConfirm: (password: string) => void;
}

const ResetPasswordForm = ({ loadingStatus, onResetPasswordConfirm }: IResetPasswordFormProps) => {
  const classes = useStyles();

  const { model, formRules, errors, onSubmit, onChange, onValidate } = useForm<{ password: string; confirmPassword: string }>({
    initValues: { password: '', confirmPassword: '' },
    formRules: { ...fieldRules, acceptTerms: { required: false } },
    onSubmitCallback: onResetPasswordConfirm,
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
    <>
      <AuthScreenLayout
        title="Create your new Password"
        renderContent={() => (
          <form autoComplete={'off'} noValidate={true} onSubmit={/* istanbul ignore next */ event => event.preventDefault()}>
            <PasswordConfirmForm formRules={formRules} model={model} errors={errors} onChangeHandler={onChangeHandler} onBlurValidate={onBlurValidate} />
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
    </>
  );
};

export default memo(ResetPasswordForm);
