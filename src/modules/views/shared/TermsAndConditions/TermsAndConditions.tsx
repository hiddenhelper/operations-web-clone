import React, { memo } from 'react';

import { LANG } from '../../../../constants';
import { accountConfirmModalStyles as useStyles } from '../Modal/style';

const TermsAndConditions = () => {
  const classes = useStyles();
  return (
    <div className="content">
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.AGREEMENTS_TO_TERMS.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.AGREEMENTS_TO_TERMS.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.INTELLECTUAL_PROPERTY_RIGHTS.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.INTELLECTUAL_PROPERTY_RIGHTS.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.USER_REPRESENTATIONS.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.USER_REPRESENTATIONS.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.APPLE_AND_ANDROID_DEVICES.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.APPLE_AND_ANDROID_DEVICES.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.WEB_PLATFORM_APP_MGMT.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.WEB_PLATFORM_APP_MGMT.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.TERM_AND_TERMINATION.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.TERM_AND_TERMINATION.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.MODIFICATIONS_AND_INTERRUPTIONS.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.MODIFICATIONS_AND_INTERRUPTIONS.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.GOVERNING_LAW.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.GOVERNING_LAW.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.CORRECTIONS.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.CORRECTIONS.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.DISCLAIMER.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.DISCLAIMER.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.INDEMNIFICATION.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.INDEMNIFICATION.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.USER_DATA.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.USER_DATA.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.ELECTRONIC_COMMUNICATIONS_TRANSACTIONS_SIGNATURES.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.ELECTRONIC_COMMUNICATIONS_TRANSACTIONS_SIGNATURES.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.CALIFORNIA_USERS_AND_RESIDENTS.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.CALIFORNIA_USERS_AND_RESIDENTS.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.MISSELANEOUS.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.MISSELANEOUS.CONTENT}</pre>
      </div>
      <div className={classes.paragraph}>
        <div className="title">{LANG.EN.TERMS_AND_CONDITIONS.CONTACT_US.TITLE}</div>
        <pre>{LANG.EN.TERMS_AND_CONDITIONS.CONTACT_US.CONTENT}</pre>
      </div>
    </div>
  );
};

export default memo(TermsAndConditions);
