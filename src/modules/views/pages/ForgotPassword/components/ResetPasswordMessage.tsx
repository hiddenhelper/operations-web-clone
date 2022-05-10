import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import AuthScreenLayout from '../../../shared/AuthScreenLayout';

import { useStyles } from '../styles';

const ResetPasswordMessage = () => {
  const classes = useStyles();
  return (
    <AuthScreenLayout
      title="Reset Password Email Sent!"
      subtitle="Check your Inbox."
      renderContent={() => (
        <div className={classes.resetPasswordBtnWrapper}>
          <Link className={classes.resetPasswordBtn} data-testid="go-to-login-btn" to="/">
            <Button color="primary" variant="contained" fullWidth={true} size="large" type="submit">
              Go to Login
            </Button>
          </Link>
        </div>
      )}
    />
  );
};

export default memo(ResetPasswordMessage);
