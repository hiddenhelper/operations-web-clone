import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import { getDefaultValue } from '../../../../../../../../../utils/generalUtils';

import { fullScreenModalGlobalStyles } from '../../../../../../../../../assets/styles';

export interface IConsentFormCellProps {
  title: string;
  data: string | number;
  styleClass?: string;
}

const ConsentFormCell = ({ title, data, styleClass }: IConsentFormCellProps) => {
  const modalClasses = fullScreenModalGlobalStyles();

  return (
    <div className={`${getDefaultValue(styleClass, '')} ${modalClasses.consentFormCell}`}>
      <Typography className={modalClasses.consentFormCellTitle}>{title}</Typography>
      <Typography className={modalClasses.consentFormCellData}>{getDefaultValue(data, '-')}</Typography>
    </div>
  );
};

export default memo(ConsentFormCell);
