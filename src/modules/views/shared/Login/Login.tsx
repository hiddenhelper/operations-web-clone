import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import WarningIcon from '@material-ui/icons/Warning';

import loginHeroSrc from '../../../../assets/images/login-hero.jpg';
import Logo from '../Logo';
import ControlledInput from '../FormHandler/ControlledInput';
import ControlledError from '../FormHandler/ControlledError';
import ButtonLoader from '../ButtonLoader';

import { GeneralModel } from '../../../models';
import { LANG, FormRules, ROUTES } from '../../../../constants';
import { useForm } from '../../../../utils/useForm';
import { useStyles } from './styles';

export interface ILoginProps {
  login: (email: string, password: string) => void;
  loadingStatus: GeneralModel.ILoadingStatus;
}

export type ILoginForm = {
  email: string;
  password: string;
};

const Login = ({ login, loadingStatus }: ILoginProps) => {
  const classes = useStyles();
  const onLogin = useCallback(
    ({ email, password }) => {
      login(email, password);
    },
    [login]
  );
  const { model, formRules, errors, onSubmit, onChange, onValidate } = useForm<ILoginForm>({
    initValues: FormRules.login.initialData,
    formRules: FormRules.login.rules,
    onSubmitCallback: onLogin,
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
      <Grid className={classes.container} container={true} alignItems="center" justify="center" key="Login">
        <Box className={classes.box} component="div" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <div className={classes.formLoginContainer}>
            <div className={classes.formLoginWrapper}>
              <img className={classes.formLoginImg} src={loginHeroSrc} alt="Workers at construction site" />
            </div>
            <div className={classes.formRightContainer}>
              <div className={classes.logoWrapper}>
                <Link to="#">
                  <Logo styleClass={classes.loginLogo} />
                </Link>
                <Typography color="secondary" className={classes.formTitle} align="left" component="h1" variant="h5">
                  {LANG.EN.LOGIN.TITLE}
                </Typography>
              </div>

              <div className={classes.formRightContainerWrapper}>
                {loadingStatus && loadingStatus.hasError && (
                  <div className={classes.errorResponse}>
                    <WarningIcon />
                    <Typography>{loadingStatus.error}</Typography>
                  </div>
                )}
                <form autoComplete={'off'} noValidate={true} onSubmit={/* istanbul ignore next */ event => event.preventDefault()}>
                  <ControlledError
                    show={!!errors.email}
                    error={errors.email && errors.email === 'is required' ? 'Please enter Email Address.' : errors.email}
                    styleClass={classes.errorLoginMessage}
                  >
                    <ControlledInput styleClass={classes.loginLabels} label={LANG.EN.LOGIN.FORM.EMAIL.LABEL} required={true} dataTestId="login-email-wrapper">
                      <TextField
                        name="email"
                        autoComplete="off"
                        placeholder={LANG.EN.LOGIN.FORM.EMAIL.PLACEHOLDER}
                        variant="outlined"
                        fullWidth={true}
                        className={classes.textField}
                        aria-describedby="login-input"
                        required={formRules.email.required}
                        value={model.email}
                        onChange={onChangeHandler}
                        onBlur={onBlurValidate}
                        error={!!errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              className={`${model.email.length > 0 && !!errors.email === false ? classes.filledInput : ''}  ${
                                !!errors.email ? classes.errorIcon : ''
                              }  ${classes.loginIcons}`}
                              position="start"
                            >
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          'data-testid': 'login-email',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                  <ControlledError
                    show={!!errors.password}
                    error={errors.password && errors.password === 'is required' ? 'Please enter Password.' : errors.password}
                    styleClass={classes.errorLoginMessage}
                  >
                    <ControlledInput
                      styleClass={classes.loginLabels}
                      label={LANG.EN.LOGIN.FORM.PASSWORD.LABEL}
                      required={true}
                      dataTestId="login-password-wrapper"
                    >
                      <TextField
                        name="password"
                        autoComplete="off"
                        variant="outlined"
                        fullWidth={true}
                        placeholder={LANG.EN.LOGIN.FORM.PASSWORD.PLACEHOLDER}
                        type="password"
                        className={classes.textField}
                        aria-describedby="login-password"
                        required={formRules.password.required}
                        value={model.password}
                        onChange={onChangeHandler}
                        onBlur={onBlurValidate}
                        error={!!errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              className={`${model.password.length > 0 && !!errors.password === false ? classes.filledInput : ''}  ${
                                !!errors.password ? classes.errorIcon : ''
                              }  ${classes.loginIcons}`}
                              position="start"
                            >
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          'data-testid': 'login-password',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                  <div className={classes.submitWrapper}>
                    <Typography color="primary" align="left" component="h1" variant="body2">
                      <Link className={classes.submitWrapperAnchor} to={ROUTES.FORGOT_PASSWORD.path} color="inherit">
                        {LANG.EN.LOGIN.FORGOT_PASSWORD_LINK}
                      </Link>
                    </Typography>
                    <ButtonLoader
                      className={classes.submit}
                      color="primary"
                      variant="contained"
                      fullWidth={true}
                      size="large"
                      type="submit"
                      onClick={onSubmit}
                      data-testid="login-btn"
                      isLoading={loadingStatus && loadingStatus.isLoading}
                      text={LANG.EN.LOGIN.FORM.BUTTON}
                      loadingText={LANG.EN.LOGIN.FORM.BUTTON_LOADING}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={classes.legalLabelWrapper}>
            <Typography className={classes.legalLabel}>{LANG.EN.LOGIN.LEGAL_LABEL}</Typography>
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default memo(Login);
