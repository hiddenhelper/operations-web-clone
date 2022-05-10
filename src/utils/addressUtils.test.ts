import {
  getAddressString,
  getLocationString,
  sanitizeAddress,
  validateAddress,
  validateRequiredAddress,
  getZipCodeMaskByCountry,
  formatZipCode,
} from './addressUtils';
import { getAddress_2 } from '../test/entities';
import { AddressModel } from '../modules/models';
import { CountryCode } from '../constants';

describe('addressUtils', () => {
  it('should sanitizeAddress', () => {
    const sanitizedAddress = sanitizeAddress({ ...getAddress_2(), stateName: 'Michigan' });
    expect(sanitizedAddress).toEqual({
      city: null,
      latitude: 3212,
      line1: '21 Street',
      line2: null,
      longitude: 5678,
      stateCode: 'TX',
      zipCode: '12345',
      countryId: null,
      stateName: 'Michigan',
    });
  });

  it('should validateAddress', () => {
    const sanitizedAddress = validateAddress({ value: getAddress_2() });
    expect(sanitizedAddress).toEqual(false);
  });

  it('should validateRequiredAddress', () => {
    const sanitizedAddress = validateRequiredAddress({ value: getAddress_2() });
    expect(sanitizedAddress).toEqual({
      city: 'is required',
      countryId: 'is required',
      county: 'is required',
    });
  });

  describe('getLocationString', () => {
    it('should retrieve all values', () => {
      expect(getLocationString('Dallas', 'Texas')).toEqual('Dallas, Texas');
    });

    it('should retrieve empty city', () => {
      expect(getLocationString(null, 'Texas')).toEqual('Texas');
    });

    it('should retrieve empty state', () => {
      expect(getLocationString('Dallas', null)).toEqual('Dallas');
    });

    it('should retrieve empty city and state', () => {
      expect(getLocationString(null, null)).toEqual('-');
    });
  });

  describe('getAddressString', () => {
    it('should retrieve full address', () => {
      expect(
        getAddressString({
          line1: '12 Central Av',
          line2: null,
          city: 'New York',
          stateCode: 'NY',
          stateName: 'New York',
          zipCode: null,
          latitude: null,
          longitude: null,
        })
      ).toEqual('12 Central Av, New York, New York');
    });

    it('should retrieve only location address', () => {
      expect(
        getAddressString({ line1: null, line2: null, city: 'New York', stateCode: 'NY', stateName: 'New York', zipCode: null, latitude: null, longitude: null })
      ).toEqual('New York, New York');
    });

    it('should retrieve empty address', () => {
      expect(getAddressString(null)).toEqual('-');
    });
  });

  describe('getZipCodeMaskByCountry', () => {
    it('should get default zip format mask', () => {
      expect(getZipCodeMaskByCountry(undefined, '')).toEqual(AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS]);
    });
    it('should get five plus four digits zip format mask', () => {
      expect(getZipCodeMaskByCountry(CountryCode.UNITED_STATES, '123451234')).toEqual(
        AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS_PLUS_FOUR]
      );
    });
    it('should get five plus four digits zip format mask', () => {
      expect(getZipCodeMaskByCountry(CountryCode.UNITED_STATES, '1234')).toEqual(AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS]);
    });
    it('should get five digits zip format mask', () => {
      expect(getZipCodeMaskByCountry(CountryCode.PUERTO_RICO, '123451234')).toEqual(
        AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS_PLUS_FOUR]
      );
    });
    it('should get five digits zip format mask', () => {
      expect(getZipCodeMaskByCountry(CountryCode.PUERTO_RICO, '1234')).toEqual(AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS]);
    });
    it('should get five digits zip format mask', () => {
      expect(getZipCodeMaskByCountry(CountryCode.MEXICO, '1323')).toEqual(AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.FIVE_DIGITS]);
    });
    it('should get canada zip format mask', () => {
      expect(getZipCodeMaskByCountry(CountryCode.CANADA, '')).toEqual(AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.CANADA_FORMAT]);
    });
  });

  describe('formatZipCode', () => {
    it('should format zip code', () => {
      expect(formatZipCode(' KL1 328 ')).toEqual('KL1-328');
    });
  });
});
