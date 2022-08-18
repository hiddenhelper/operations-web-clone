import { IFormRules, ruleMap } from '../../utils/useValidator';
import { requiredAddressRules } from './addressRules';

export const fieldRules: IFormRules = {
  company: {
    required: true,
    rules: [],
  },
  firstName: {
    required: true,
    rules: [],
  },
  middleName: {
    required: false,
    rules: [],
  },
  lastName: {
    required: true,
    rules: [],
  },
  email: {
    required: false,
    rules: [ruleMap.isValidEmail],
  },
  mobilePhoneNumber: {
    required: true,
    rules: [ruleMap.isValidPhoneNumber],
  },
  dateOfBirth: {
    required: true,
    rules: [ruleMap.isInvalidDate],
  },
  gender: {
    required: false,
    rules: [],
  },
  ethnicityId: {
    required: false,
    rules: [],
  },
  socialSecurityNumber: {
    required: false,
    rules: [],
  },
  isVeteran: {
    required: false,
    rules: [],
  },
  primaryLanguageId: {
    required: false,
    rules: [],
  },
  otherPrimaryLanguage: {
    required: false,
    rules: [],
  },
  phoneNumber: {
    required: false,
    rules: [ruleMap.isValidPhoneNumber],
  },
  identificationNumber: {
    required: false,
    rules: [],
  },
  tradeStatusId: {
    required: false,
    rules: [],
  },
  otherTrade: {
    required: false,
    rules: [],
  },
  address: {
    required: false,
    rules: [],
  },
  emergencyContactName: {
    required: false,
    rules: [],
  },
  emergencyContactPhone: {
    required: false,
    rules: [ruleMap.isValidPhoneNumber],
  },
  emergencyContactRelationship: {
    required: false,
    rules: [],
  },
  isSkilled: {
    required: false,
    rules: [],
  },
  isSupervisor: {
    required: false,
    rules: [],
  },
  tradesIds: {
    required: false,
    rules: [],
  },
  ...requiredAddressRules,
};

export const certificationRules: IFormRules = {
  certificationId: {
    required: true,
    rules: [],
  },
  idNumber: {
    required: false,
    rules: [],
  },
  project: {
    required: false,
    rules: [],
  },
  description: {
    required: false,
    rules: [],
  },
  completionDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  expirationDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
};

export const trainingRules: IFormRules = {
  trainingId: {
    required: true,
    rules: [],
  },
  trainerName: {
    required: true,
    rules: [],
  },
  projectId: {
    required: true,
    rules: [],
  },
  description: {
    required: false,
    rules: [],
  },
  completionDate: {
    required: true,
    rules: [ruleMap.isInvalidDate],
  },
  trainerBadgeCode: {
    required: false,
    rules: [],
  },
};

export const workerFieldRulesMap = (isFcaUser: boolean, isAdmin: boolean) => {
  if (isFcaUser) {
    return {
      ...fieldRules,
    };
  }

  if (!isFcaUser) {
    return {
      ...fieldRules,
      company: {
        required: false,
        rules: [],
      },
    };
  }

  return {};
};
