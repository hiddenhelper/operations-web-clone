import React, { memo, useCallback, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/semantic-ui.css';

import { useStyles } from './styles';
import { GeneralModel } from '../../../models';
import { PHONE_MASK_LIST } from '../../../../utils/generalUtils';

interface IInputProps {
  variant: string;
  error: boolean;
  name: string;
  required?: boolean;
  'data-testid': string;
  id?: string;
}

export interface IPhoneNumberInputProps {
  className?: string;
  inputProps: IInputProps;
  fullWidth?: boolean;
  value: string;
  countryList?: GeneralModel.INamedEntity[];
  onChange?: (value) => void;
  disabled?: boolean;
}

const PhoneNumberInput = ({ inputProps, value, className, countryList, onChange, disabled = false }: IPhoneNumberInputProps) => {
  const countryCodes = countryList?.map(item => item.code.toLowerCase());
  const [focus, setFocus] = useState(false);
  const classes = useStyles();
  const internalOnChange = useCallback(
    (val, country, event, formattedValue) => {
      event.target.value = val === '' ? val : formattedValue;
      onChange(event);
    },
    [onChange]
  );

  const onFocus = useCallback(() => {
    setFocus(true);
  }, [setFocus]);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  const focusClass = focus ? classes.focus : '';

  return (
    <>
      <PhoneInput
        onChange={internalOnChange}
        onFocus={onFocus}
        onBlur={onBlur}
        masks={PHONE_MASK_LIST}
        value={value}
        disableDropdown={true}
        containerClass={`${classes.phoneInput} ${className} ${focusClass}`}
        preferredCountries={countryCodes}
        buttonClass={`${inputProps.error ? classes.errorBorder : ''}`}
        inputClass={`${inputProps.error ? classes.errorBorder : ''}`}
        disabled={disabled}
        inputProps={{
          autoComplete: 'off',
          placeholder: '+0 (000) 000-0000',
          type: 'text',
          ...inputProps,
        }}
      />
    </>
  );
};

export default memo(PhoneNumberInput);
