import { INamedEntity } from './general';

export enum AddressFields {
  LINE_1 = 'line1',
  LINE_2 = 'line2',
  COUNTRY = 'country',
  COUNTRY_ID = 'countryId',
  CITY = 'city',
  STATE = 'stateCode',
  STATE_NAME = 'stateName',
  ZIP_CODE = 'zipCode',
  COUNTY = 'county',
  BOROUGH = 'borough',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  ATTENTION_1 = 'attention1',
  ATTENTION_2 = 'attention2',
}

export enum LocationsFields {
  NAME = 'name',
}

export enum Borough {
  MANHATTAN = 'Manhattan',
  BROOKLYN = 'Brooklyn',
  QUEENS = 'Queens',
  STATEN_ISLAND = 'Staten Island',
  THE_BRONX = 'The Bronx',
}

export interface IAddress {
  [AddressFields.LINE_1]: string;
  [AddressFields.LINE_2]: string;
  [AddressFields.CITY]: string;
  [AddressFields.STATE]: string;
  [AddressFields.ZIP_CODE]: string;
  [AddressFields.COUNTRY]?: INamedEntity;
  [AddressFields.COUNTRY_ID]?: string;
  [AddressFields.COUNTY]?: string;
  [AddressFields.ATTENTION_1]?: string;
  [AddressFields.ATTENTION_2]?: string;
  [AddressFields.STATE_NAME]?: string;
  [AddressFields.BOROUGH]?: Borough;
  [AddressFields.LATITUDE]: number;
  [AddressFields.LONGITUDE]: number;
}

export interface ILocation {
  id?: string;
  [LocationsFields.NAME]?: string;
  isUsed?: boolean;
}

export const addressFieldRules = {
  required: [
    { name: AddressFields.LINE_1, required: true },
    { name: AddressFields.LINE_2, required: false },
    { name: AddressFields.COUNTRY_ID, required: true, computePositive: true },
    { name: AddressFields.STATE, required: true },
    { name: AddressFields.ZIP_CODE, required: true },
    { name: AddressFields.CITY, required: true },
    { name: AddressFields.ATTENTION_1, required: false },
    { name: AddressFields.ATTENTION_2, required: false },
  ],
  notRequired: [
    { name: AddressFields.LINE_1, required: false },
    { name: AddressFields.LINE_2, required: false },
    { name: AddressFields.COUNTRY_ID, required: false },
    { name: AddressFields.STATE, required: false },
    { name: AddressFields.ZIP_CODE, required: false },
    { name: AddressFields.CITY, required: false },
    { name: AddressFields.ATTENTION_1, required: false },
    { name: AddressFields.ATTENTION_2, required: false },
  ],
};

export const boroughOptionList = [
  {
    value: Borough.MANHATTAN,
    label: Borough.MANHATTAN,
  },
  {
    value: Borough.BROOKLYN,
    label: Borough.BROOKLYN,
  },
  {
    value: Borough.QUEENS,
    label: Borough.QUEENS,
  },
  {
    value: Borough.STATEN_ISLAND,
    label: Borough.STATEN_ISLAND,
  },
  {
    value: Borough.THE_BRONX,
    label: Borough.THE_BRONX,
  },
];

export enum ZipCodeFormatType {
  FIVE_DIGITS = 0,
  FIVE_DIGITS_PLUS_FOUR = 1,
  CANADA_FORMAT = 2,
}

export const zipCodeFormatMap: { [key: string]: { placeholder: string; mask: any[] } } = {
  [ZipCodeFormatType.FIVE_DIGITS]: {
    placeholder: '00000',
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  },
  [ZipCodeFormatType.FIVE_DIGITS_PLUS_FOUR]: {
    placeholder: '00000-0000',
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  },
  [ZipCodeFormatType.CANADA_FORMAT]: {
    placeholder: 'ANA-NAN',
    mask: [/[a-zA-Z]/, /\d/, /[a-zA-Z]/, '-', /\d/, /[a-zA-Z]/, /\d/],
  },
};

export const getFallbackAddress = () => ({
  line1: null,
  line2: null,
  city: null,
  countryId: null,
  stateCode: null,
  zipCode: null,
  county: null,
  latitude: null,
  longitude: null,
  stateName: null,
});

export const getFallbackLocation = (): ILocation => ({
  name: null,
});
