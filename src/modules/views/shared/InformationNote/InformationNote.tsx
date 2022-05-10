import React, { memo } from 'react';

import { InfoIcon } from '../../../../constants';
import { getDefaultValue } from '../../../../utils/generalUtils';
import { invoiceFormGlobalStyles } from '../../../../assets/styles';

export interface IInformationNoteProps {
  note: React.ReactNode;
  style?: any;
}

const InformationNote = ({ note, style }: IInformationNoteProps) => {
  const invoiceStyleClasses = invoiceFormGlobalStyles();
  return (
    <div style={getDefaultValue(style?.infoContainer, {})} className={invoiceStyleClasses.infoContainer}>
      <InfoIcon />
      <div className={invoiceStyleClasses.textContainer}>{note}</div>
    </div>
  );
};

export default memo(InformationNote);
