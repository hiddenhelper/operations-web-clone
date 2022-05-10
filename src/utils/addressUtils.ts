import { AddressModel } from '../modules/models';
import { isEmpty, getDefaultValue, getConditionalDefaultValue } from './generalUtils';
import { validateObject } from './formUtils';
import { FormRules, CountryCode } from '../constants';

export const canadaRegex = new RegExp(/^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}-[0-9]{1}[a-zA-Z]{1}[0-9]{1}$/);
export const zipRegex = new RegExp(/^[0-9]{5}-[0-9]{4}$|^[0-9]{5}$/);

export const formatZipCode = (postalCode: string) => {
  return postalCode?.trim()?.replace(' ', '-');
};

export const sanitizeZipCode = (zipCode: string) => {
  return getConditionalDefaultValue(zipCode?.length === 6, zipCode?.replace('-', '').replace(' ', ''), zipCode);
};

export const sanitizeAddress = (address: AddressModel.IAddress) => ({
  ...address,
  line1: !isEmpty(address.line1) ? address.line1 : null,
  line2: !isEmpty(address.line2) ? address.line2 : null,
  stateCode: !isEmpty(address.stateCode) ? address.stateCode : null,
  stateName: !isEmpty(address.stateName) ? address.stateName : null,
  countryId: getConditionalDefaultValue(address?.countryId, address?.countryId, getDefaultValue(address?.country?.id, null)),
  city: !isEmpty(address.city) ? address.city : null,
  zipCode: !isEmpty(address.zipCode) ? sanitizeZipCode(address.zipCode) : null,
});

export const validateAddress = ({ value }: { value: AddressModel.IAddress }) => {
  return validateObject<AddressModel.IAddress>(value, FormRules.address.addressRules);
};

export const validateRequiredAddress = ({ value }: { value: AddressModel.IAddress }) => {
  return validateObject<AddressModel.IAddress>(value, FormRules.address.requiredAddressRules);
};

export const isNYState = (stateCode: string) => stateCode === 'NY';

export const isNYCity = (city: string) => city === 'New York';

export const getLocationString = (city: string, stateName: string) =>
  isEmpty(city) && isEmpty(stateName) ? '-' : `${city ?? ''}${city && stateName ? ', ' : ''}${stateName ? stateName : ''}`;

export const getAddressString = (address: AddressModel.IAddress) =>
  address ? `${address.line1 ? `${address.line1}, ` : ''}${getLocationString(address.city, address?.stateName)}` : '-';

export const getZipCodeMaskByCountry = (countryCode: CountryCode = CountryCode.UNITED_STATES, zipCode: string): { placeholder: string; mask: any[] } => {
  const zipCodeMap = {
    [CountryCode.UNITED_STATES]: getConditionalDefaultValue(
      zipCode?.length > 5,
      AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS_PLUS_FOUR],
      AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS]
    ),
    [CountryCode.PUERTO_RICO]: getConditionalDefaultValue(
      zipCode?.length > 5,
      AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS_PLUS_FOUR],
      AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS]
    ),
    [CountryCode.MEXICO]: AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS],
    [CountryCode.CANADA]: AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.CANADA_FORMAT],
  };
  return zipCodeMap[countryCode];
};
