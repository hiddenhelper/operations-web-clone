import React, { memo } from 'react';

import AuthScreenLayout from '../../../shared/AuthScreenLayout';

import { LANG } from '../../../../../constants';
import { useStyles } from '../styles';

const Expired = ({ expired }) => {
  const classes = useStyles();
  return (
    <>
      <AuthScreenLayout
        title={expired}
        subtitle={
          <>
            Please contact <a href={`mailto:{LANG.EN.SUPPORT_EMAIL}`}>{LANG.EN.SUPPORT_EMAIL}</a>
          </>
        }
        formContainerWrapperStyleClass={classes.expiredDateWrapper}
        titleTestId="expired-msg"
        subtitleStyleClass={classes.expiredMessage}
        renderContent={() => null}
      />
    </>
  );
};

export default memo(Expired);
