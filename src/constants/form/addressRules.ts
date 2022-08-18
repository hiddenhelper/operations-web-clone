import { sanitizeZipCode, canadaRegex, zipRegex } from '../../utils/addressUtils';

const validateZipCode = ({ value, model }) => {
  const sanitizedValue = sanitizeZipCode(value);
  const isInvalid = !zipRegex.test(sanitizedValue) && !canadaRegex.test(sanitizedValue);
  return value && value.length > 0 && isInvalid && 'Zip Code format is invalid.';
};

export const addressRules = {
  line1: {
    required: false,
    rules: [],
  },
  line2: {
    required: false,
    rules: [],
  },
  city: {
    required: false,
    rules: [],
  },
  countryId: {
    required: false,
    rules: [],
  },
  stateCode: {
    required: false,
    rules: [],
  },
  zipCode: {
    required: false,
    rules: [validateZipCode],
  },
  latitude: {
    required: false,
    rules: [],
  },
  longitude: {
    required: false,
    rules: [],
  },
  attention1: {
    required: false,
    rules: [],
  },
  attention2: {
    required: false,
    rules: [],
  },
};

export const requiredAddressRules = {
  line1: {
    required: true,
    rules: [],
  },
  line2: {
    required: false,
    rules: [],
  },
  city: {
    required: true,
    rules: [],
  },
  countryId: {
    required: true,
    rules: [],
  },
  stateCode: {
    required: true,
    rules: [],
  },
  zipCode: {
    required: true,
    rules: [validateZipCode],
  },
  latitude: {
    required: false,
    rules: [],
  },
  longitude: {
    required: false,
    rules: [],
  },
  county: {
    required: true,
    rules: [],
  },
};
