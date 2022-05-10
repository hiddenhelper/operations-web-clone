import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import AuthScreenLayout from '../../../shared/AuthScreenLayout';

import { useStyles } from '../styles';

const ResetPasswordSuccess = () => {
  const classes = useStyles();
  return (
    <AuthScreenLayout
      title="Password Reset Successfully!"
      renderContent={() => (
        <div className={classes.confirmResetPasswordBtnWrapper}>
          <Link className={classes.confirmResetPasswordBtn} data-testid="go-to-login-btn" to="/">
            <Button color="primary" variant="contained" fullWidth={true} size="large" type="submit">
              Go to Login
            </Button>
          </Link>
        </div>
      )}
    />
  );
};

export default memo(ResetPasswordSuccess);
