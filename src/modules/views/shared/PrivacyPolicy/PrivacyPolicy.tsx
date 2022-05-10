import React, { memo } from 'react';

import { LANG } from '../../../../constants';
import { accountConfirmModalStyles as useStyles } from '../Modal/style';

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <>
      <div className="content">
        <div className={classes.paragraph}>
          <div className="title">{LANG.EN.PRIVACY_POLICY.TITLE}</div>
          <pre>
            {LANG.EN.PRIVACY_POLICY.CONTENT_1}
            <a href={LANG.EN.PRIVACY_POLICY.URL}>{LANG.EN.PRIVACY_POLICY.URL}</a>
            {LANG.EN.PRIVACY_POLICY.CONTENT_2}
          </pre>
        </div>
      </div>
    </>
  );
};

export default memo(PrivacyPolicy);
