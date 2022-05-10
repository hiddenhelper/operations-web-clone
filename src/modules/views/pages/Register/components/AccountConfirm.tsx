import React, { memo, useMemo, useCallback, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import Modal from '../../../shared/Modal';
import ControlledCheckbox from '../../../shared/FormHandler/Checkbox';
import ControlledError from '../../../shared/FormHandler/ControlledError';
import ControlledButton from '../../../shared/FormHandler/ControlledButton';
import AuthScreenLayout from '../../../shared/AuthScreenLayout';
import ButtonLoader from '../../../shared/ButtonLoader';
import PasswordConfirmForm from '../../../shared/PasswordConfirmForm';
import TermsAndConditions from '../../../shared/TermsAndConditions';
import PrivacyPolicy from '../../../shared/PrivacyPolicy';

import { GeneralModel } from '../../../../models';
import { LANG, FormRules } from '../../../../../constants';
import { IAccountConfirmData } from '../../../../../constants/form/accountRules';
import { useForm } from '../../../../../utils/useForm';
import { useStyles as modalStyles, accountConfirmModalStyles } from '../../../shared/Modal/style';
import { useStyles } from '../styles';

export interface IAccountConfirmProps {
  email: string;
  loadingStatus: GeneralModel.ILoadingStatus;
  onCreateAccount: (password: string) => void;
}

interface IModalState {
  open: boolean;
  content: React.ReactNode;
}

const AccountConfirm = ({ email, loadingStatus, onCreateAccount }: IAccountConfirmProps) => {
  const classes = useStyles();
  const confirmModalClasses = accountConfirmModalStyles();
  const dialogClasses = modalStyles();
  const [modal, setModal] = useState<IModalState>({ open: false, content: '' });

  const { model, formRules, errors, onSubmit, onChange, onValidate } = useForm<IAccountConfirmData>({
    initValues: FormRules.account.initialFormData,
    formRules: FormRules.account.fieldRules,
    onSubmitCallback: onCreateAccount,
  });
  const isCreateBtnEnabled = useMemo(() => model.acceptTerms && Object.values(errors).filter(Boolean).length === 0, [model, errors]);

  const closeModal = useCallback(
    /* istanbul ignore next */ () => {
      setModal(prevState => ({ ...prevState, open: false }));
    },
    [setModal]
  );

  const openTermsAndConditions = useCallback(() => {
    setModal({ open: true, content: <TermsAndConditions /> });
  }, [setModal]);

  const openPrivacyPolicy = useCallback(() => {
    setModal({ open: true, content: <PrivacyPolicy /> });
  }, [setModal]);

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
  const onChangeTerms = useCallback(() => {
    onChange(prevState => ({
      ...prevState,
      acceptTerms: !prevState.acceptTerms,
    }));
  }, [onChange]);
  const onBlurValidate = useCallback(event => onValidate(event.target.name), [onValidate]);
  return (
    <>
      <AuthScreenLayout
        title="Complete your Account Creation"
        titleStyleClass={classes.confirmTitle}
        subtitle={
          <>
            Please create your password in order to complete the account creation for <span className={classes.accentText}>{email}</span>
          </>
        }
        renderContent={() => (
          <form autoComplete={'off'} noValidate={true} onSubmit={/* istanbul ignore next */ event => event.preventDefault()}>
            <PasswordConfirmForm formRules={formRules} model={model} errors={errors} onChangeHandler={onChangeHandler} onBlurValidate={onBlurValidate} />
            <ControlledError show={!!errors.acceptTerms} error={errors.acceptTerms} styleClass={`${classes.errorLoginMessage} ${classes.termConditionError}`}>
              <div className={classes.termsWrapper}>
                <ControlledCheckbox
                  isChecked={model.acceptTerms}
                  name="acceptTerms"
                  value="acceptTerms"
                  onChange={onChangeTerms}
                  inputProps={{ 'data-testid': 'accept-terms' }}
                />
                <div>
                  By signing up you accept the{' '}
                  <ControlledButton>
                    <Button
                      className={`${classes.legalButton} ${classes.accentText}`}
                      data-testid="open-terms-and-conditions"
                      disableRipple={true}
                      onClick={openTermsAndConditions}
                    >
                      Terms and conditions
                    </Button>{' '}
                  </ControlledButton>
                  and{' '}
                  <ControlledButton>
                    <Button
                      className={`${classes.legalButton} ${classes.accentText}`}
                      disableRipple={true}
                      data-testid="open-privacy-policy"
                      onClick={openPrivacyPolicy}
                    >
                      Privacy Policy.
                    </Button>
                  </ControlledButton>
                </div>
              </div>
            </ControlledError>
            <div className={classes.submitWrapper}>
              <ButtonLoader
                className={classes.submit}
                color="primary"
                variant="contained"
                fullWidth={true}
                size="large"
                type="submit"
                disabled={!isCreateBtnEnabled}
                onClick={onSubmit}
                data-testid="sign-up-btn"
                isLoading={loadingStatus && loadingStatus.isLoading}
                text="Create your Account"
                loadingText="Creating Account..."
              />
            </div>
          </form>
        )}
      />
      <Modal
        show={modal.open}
        styleClass={`${dialogClasses.dialogContainer} ${dialogClasses.termsAndConditions}`}
        onClose={closeModal}
        render={() => (
          <>
            <div className={confirmModalClasses.header}>
              <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.TITLE}</div>
              <div className="date">{LANG.EN.TERMS_AND_CONDITIONS.DATE}</div>
              <IconButton onClick={closeModal}>
                <CloseIcon />
              </IconButton>
            </div>
            {modal.content}
          </>
        )}
      />
    </>
  );
};

export default memo(AccountConfirm);
