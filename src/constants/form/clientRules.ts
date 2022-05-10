import { IUser, UserFields } from '../../modules/models/user';
import { IFormRules, ruleMap, validateRules } from '../../utils/useValidator';
import { validateAddress, validateRequiredAddress } from '../../utils/addressUtils';
import { isEmpty, isNull } from '../../utils/generalUtils';
import { validateBadge } from './projectRules';
import { isValidNumber } from 'libphonenumber-js';
import { validateObject } from 'utils/formUtils';

const validateUBadgePrice = value => validateBadge(value, 1000, true) && 'Universal Badge Price must be less than $1,000.';

export const userRules: IFormRules = {
  firstName: {
    required: false,
    rules: [],
  },
  lastName: {
    required: false,
    rules: [],
  },
  email: {
    required: false,
    rules: [ruleMap.isValidEmail],
  },
  title: {
    required: false,
    rules: [],
  },
  otherTrade: {
    required: false,
    rules: [],
  },
  invitationType: {
    required: false,
    rules: [],
  },
  mobilePhoneNumber: {
    required: false,
    rules: [({ value }) => value && !isValidNumber(value) && 'Please enter a valid Mobile Phone Number.'],
  },
  officePhoneNumber: {
    required: false,
    rules: [({ value }) => value && !isValidNumber(value) && 'Please enter a valid Office Phone Number.'],
  },
  officePhoneExtension: {
    required: false,
    rules: [],
  },
  preferredContactMethod: {
    required: false,
    rules: [],
  },
};

export const userActiveRules = ({ assignClientRequired = true }): IFormRules => ({
  ...userRules,
  firstName: {
    ...userRules.firstName,
    required: true,
  },
  lastName: {
    ...userRules.lastName,
    required: true,
  },
  email: {
    ...userRules.email,
    required: true,
  },
  assignClient: {
    required: assignClientRequired,
    rules: [],
  },
});

const defaultUserValueList = [UserFields.PREFERRED_CONTACT_METHOD, UserFields.INVITATION_TYPE];

export const isUserEmpty = user => {
  return Object.entries(user).filter(([field, value]) => !defaultUserValueList.includes(field as UserFields) && !isEmpty(value)).length === 0;
};

const isDuplicatedEmail = (user: IUser, userList: IUser[]) => userList.filter(userItem => userItem.email === user.email).length > 0;

const validateUserList = ({ value: userList, model }: { value: IUser[]; model: any }) => {
  const userErrorList = userList.reduce((acc: any, user, index) => {
    const err = validateRules({ model: user, constraints: userRules });
    const isDuplicated =
      !isEmpty(user.email) &&
      isDuplicatedEmail(
        user,
        model.users.filter((u, i) => i !== index)
      );
    if (Object.keys(err).length > 0) {
      Object.entries(err).forEach(([field, value]) => {
        acc[`users[${index}].${field}`] = value;
      });
    }
    if (isDuplicated) {
      acc[`users[${index}].email`] = 'The same Email Address cannot be used in different users.';
    }
    return acc;
  }, {});
  return Object.keys(userErrorList).length > 0 ? userErrorList : false;
};

export const draftFieldRules: IFormRules = {
  name: {
    required: true,
    rules: [],
  },
  taxpayerIdentificationNumber: {
    required: false,
    rules: [ruleMap.isValidTaxpayerIdentificationNumber],
    args: [{ max: 12, min: 9 }],
  },
  mwbeTypeId: {
    required: false,
    rules: [],
  },
  trades: {
    required: false,
    rules: [],
  },
  otherTrade: {
    required: false,
    rules: [],
  },
  billingAddress: {
    required: false,
    rules: [validateAddress],
  },
  mailingAddress: {
    required: false,
    rules: [validateAddress],
  },
  users: {
    required: false,
    rules: [validateUserList],
  },
  isUniversalBadge: {
    required: false,
    rules: [],
  },
  universalBadgePrice: {
    required: false,
    rules: [validateUBadgePrice],
  },
};

export const getGeneralInformationRules = (hasTrades: boolean, otherTrade: string, isDeveloper: boolean, hasUniversalBadge: boolean) => ({
  ...draftFieldRules,
  name: {
    required: true,
    rules: [],
  },
  taxpayerIdentificationNumber: {
    required: !isDeveloper,
    rules: [ruleMap.isValidTaxpayerIdentificationNumber],
    args: [{ max: 12, min: 9 }],
  },
  mwbeTypeId: {
    required: !isDeveloper,
    rules: [],
  },
  trades: {
    required: !isDeveloper && !hasTrades && isNull(otherTrade),
    rules: [],
  },
  otherTrade: {
    required: !isNull(otherTrade),
    rules: [],
  },
  universalBadgePrice: {
    required: hasUniversalBadge,
    rules: [validateUBadgePrice],
  },
});

export const getAddressesRules = (mailingMatchesBilling: boolean, isDeveloper: boolean) => ({
  ...draftFieldRules,
  billingAddress: {
    required: !isDeveloper,
    rules: [validateRequiredAddress],
  },
  mailingAddress: {
    required: !isDeveloper && !mailingMatchesBilling,
    rules: [mailingMatchesBilling ? validateAddress : validateRequiredAddress],
  },
});

export const inviteClientRules: IFormRules = {
  name: {
    required: true,
    rules: [],
  },
  taxpayerIdentificationNumber: {
    required: false,
    rules: [ruleMap.isValidTaxpayerIdentificationNumber],
    args: [{ max: 12, min: 9 }],
  },
  users: {
    required: true,
    rules: [
      ({ value: userList }: { value: IUser[] }) => {
        const userErrorList = userList.reduce((acc: any, user, index) => {
          const userErrors = validateObject(user, userActiveRules({ assignClientRequired: false }));
          if (Object.keys(userErrors).length > 0) {
            Object.entries(userErrors).forEach(([field, value]) => {
              acc[`users[${index}].${field}`] = value;
            });
          }
          return acc;
        }, {});
        return Object.keys(userErrorList).length > 0 ? userErrorList : false;
      },
    ],
  },
};
