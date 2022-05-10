import { IFormRules, ruleMap } from '../../utils/useValidator';
import { validateObject } from '../../utils/formUtils';
import { AccessControlSystemModel } from '../../modules/models';
import { isEmpty } from '../../utils/generalUtils';

const readerRules: IFormRules = {
  serialNumber: {
    required: false,
    rules: [],
  },
  notes: {
    required: false,
    rules: [],
  },
  model: {
    required: false,
    rules: [],
  },
  inServiceDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  lastMaintenanceDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  hostname: {
    required: true,
    rules: [],
  },
};

const isSerialNumberDuplicated = (serialNumberList: string[]) => serialNumberList.some((val, i) => serialNumberList.indexOf(val) !== i);

const validateReader = ({ value, model }) => {
  const serialNumberList = [model.serialNumber?.toLowerCase()];
  if (model.reader1) {
    serialNumberList.push(model.reader1.serialNumber?.toLowerCase());
  }
  if (model.reader2) {
    serialNumberList.push(model.reader2.serialNumber?.toLowerCase());
  }
  const isDuplicated = !isEmpty(value.serialNumber) && isSerialNumberDuplicated(serialNumberList);
  if (isDuplicated) return { serialNumber: 'Serial Number is duplicated' };
  return validateObject<AccessControlSystemModel.IReader>(value, readerRules);
};

export const fieldRules: IFormRules = {
  type: {
    required: true,
    rules: [],
  },
  serialNumber: {
    required: false,
    rules: [],
  },
  version: {
    required: false,
    rules: [],
  },
  lifeCycle: {
    required: true,
    rules: [],
  },
  notes: {
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
  invoiced: {
    required: false,
    rules: [],
  },
  inServiceDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  lastMaintenanceDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  lastRefurbishedDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  warrantyExpirationDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  reader1: {
    required: false,
    rules: [validateReader],
  },
  reader2: {
    required: false,
    rules: [validateReader],
  },
};

const assignReaderRules: IFormRules = {
  hostAddress: {
    required: true,
    rules: [],
  },
  telnetConnectionPort: {
    required: true,
    rules: [],
  },
  directionType: {
    required: true,
    rules: [],
  },
};

const validateAssignReader = ({ value }: { value: AccessControlSystemModel.IReader }) => {
  return validateObject<AccessControlSystemModel.IReader>(value, assignReaderRules);
};

export const getAssignAcsToProjectFieldRules = (hasReader2: boolean = false): IFormRules => ({
  deviceName: {
    required: true,
    rules: [],
  },
  locationId: {
    required: true,
    rules: [],
  },
  hasReverseInstallation: {
    required: true,
    rules: [],
  },
  reader1: {
    required: true,
    rules: [validateAssignReader],
  },
  reader2: {
    required: hasReader2,
    rules: [validateAssignReader],
  },
});
