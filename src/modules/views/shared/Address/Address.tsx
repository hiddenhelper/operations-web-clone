import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import { AddressModel } from '../../../models';
import { getDefaultValue, getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { cardGlobalStyles } from '../../../../assets/styles';

export interface IAddressProps {
  address: AddressModel.IAddress;
  bigFont?: boolean;
  isCountryOnNewLine?: boolean;
}

const Address = ({ address, bigFont, isCountryOnNewLine }: IAddressProps) => {
  const cardGlobalClasses = cardGlobalStyles();
  return (
    <>
      <Typography className={`${cardGlobalClasses.cardFont} ${getConditionalDefaultValue(bigFont, cardGlobalClasses.bigFont, '')}`}>
        {getConditionalDefaultValue(address?.line2, `${address?.line2}. `, '')}
        <span
          className={`${getConditionalDefaultValue(address?.line1, cardGlobalClasses.cardFontAccent, '')} ${getConditionalDefaultValue(
            bigFont,
            cardGlobalClasses.bigFont,
            ''
          )}`}
        >
          {getDefaultValue(address?.line1)}
        </span>
      </Typography>
      <Typography className={`${cardGlobalClasses.cardFont} ${getConditionalDefaultValue(bigFont, cardGlobalClasses.bigFont, '')}`}>
        {getConditionalDefaultValue(address?.city, `${address?.city}, `, '')}
        {getConditionalDefaultValue(address?.stateName, `${address?.stateName}, `, '')}
        {getConditionalDefaultValue(address?.zipCode, `${address?.zipCode}`, '')}
        {getConditionalDefaultValue(!isCountryOnNewLine && address?.country?.name, `, ${address?.country?.name}`, '')}
      </Typography>
      {isCountryOnNewLine && (
        <Typography className={`${cardGlobalClasses.cardFont} ${getConditionalDefaultValue(bigFont, cardGlobalClasses.bigFont, '')}`}>
          {getDefaultValue(address?.country?.name)}
        </Typography>
      )}
    </>
  );
};

export default memo(Address);
