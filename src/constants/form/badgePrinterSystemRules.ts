import { IFormRules, ruleMap } from '../../utils/useValidator';
import { isEmpty } from '../../utils/generalUtils';
import { validateObject } from '../../utils/formUtils';

export const deviceRules: IFormRules = {
  price: {
    required: false,
    rules: [],
  },
  vendor: {
    required: false,
    rules: [],
  },
  orderDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  invoice: {
    required: false,
    rules: [],
  },
  model: {
    required: true,
    rules: [],
  },
  inServiceDate: {
    required: true,
    rules: [ruleMap.isInvalidDate],
  },
  warrantyExpirationDate: {
    required: true,
    rules: [ruleMap.isInvalidDate],
  },
  serialNumber: {
    required: true,
    rules: [],
  },
  notes: {
    required: false,
    rules: [],
  },
};

export const printerRules: IFormRules = {
  ...deviceRules,
  type: {
    required: true,
    rules: [],
  },
};

const isSerialNumberDuplicated = (serialNumber: string, serialNumberList: string[]) => serialNumberList.includes(serialNumber);

export const validateDevice = (valueMap, constraints: IFormRules, serialNumberList: string[]) => {
  const errorList = validateObject(valueMap, constraints);
  const isDuplicated = !isEmpty(valueMap.serialNumber) && isSerialNumberDuplicated(valueMap.serialNumber?.toLowerCase(), serialNumberList);
  if (isDuplicated) return { serialNumber: 'Serial Number is duplicated' };
  return errorList;
};

export const validatePrinter = ({ value, model }) => {
  return validateDevice(value, printerRules, [model.laptop.serialNumber?.toLowerCase(), model.scanner.serialNumber?.toLowerCase()]);
};

export const validateLaptop = ({ value, model }) => {
  return validateDevice(value, deviceRules, [model.printer.serialNumber?.toLowerCase(), model.scanner.serialNumber?.toLowerCase()]);
};

export const validateScanner = ({ value, model }) => {
  return validateDevice(value, deviceRules, [model.laptop.serialNumber?.toLowerCase(), model.printer.serialNumber?.toLowerCase()]);
};

export const badgePrinterSystemRules: IFormRules = {
  name: {
    required: true,
    rules: [],
  },
  notes: {
    required: false,
    rules: [],
  },
  printer: {
    required: true,
    rules: [validatePrinter],
  },
  laptop: {
    required: true,
    rules: [validateLaptop],
  },
  scanner: {
    required: true,
    rules: [validateScanner],
  },
};
