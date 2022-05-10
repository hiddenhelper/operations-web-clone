import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { useStyles } from '../styles';
import AuthScreenLayout from '../../../shared/AuthScreenLayout';

const Success = () => {
  const classes = useStyles();
  return (
    <>
      <AuthScreenLayout
        title="Welcome to FC Analytics Platform!"
        subtitle="Your account was created successfully."
        formContainerStyleClass={classes.successContainer}
        formContainerWrapperStyleClass={classes.successWrapper}
        subtitleStyleClass={classes.successSubTitle}
        renderContent={() => (
          <div className={classes.submitWrapper}>
            <Link className={classes.submit} data-testid="login-btn" to="/">
              <Button color="primary" variant="contained" fullWidth={true} size="large" type="submit">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      />
    </>
  );
};

export default memo(Success);
