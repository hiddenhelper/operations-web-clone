import React, { memo } from 'react';

import SettingsTab from '../../../../shared/Settings/Tab';

import { useStyles } from './style';
import PaymentMethods from '../../../../shared/PaymentMethods';

const CreditCardTab = () => {
  const classes = useStyles();
  return <SettingsTab styleClass={classes.creditCardContainer} renderWrapperContent={() => <PaymentMethods admin={true} />} />;
};

export default memo(CreditCardTab);
