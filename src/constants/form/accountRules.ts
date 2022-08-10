import { IFormRules, ruleMap } from '../../utils/useValidator';
import { UserModel } from '../../modules/models';

export interface IAccountConfirmData {
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface IResetPasswordData {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
}

export const fieldRules: IFormRules = {
  password: {
    required: true,
    rules: [ruleMap.isInvalidPassword],
  },
  confirmPassword: {
    required: true,
    rules: [({ value, model }) => value !== model.password && "Passwords don't match"],
  },
  acceptTerms: {
    required: true,
    rules: [({ value }) => value !== true && 'You must accept terms and conditions'],
  },
};

export const resetPasswordRules: IFormRules = {
  newPassword: {
    required: true,
    rules: [ruleMap.isInvalidPassword],
  },
  confirmPassword: {
    required: true,
    rules: [({ value, model }) => value !== model.newPassword && "Passwords don't match"],
  },
  currentPassword: {
    required: true,
    rules: [],
  },
};

export const accountRules: IFormRules = {
  firstName: {
    required: true,
    rules: [],
  },
  lastName: {
    required: true,
    rules: [],
  },
};

export const getAccountRules = (isFcaUser: boolean, isAdmin: boolean) => ({
  ...accountRules,
  mobilePhoneNumber: {
    required: !(isFcaUser && isAdmin),
    rules: [],
  },
});

export const connectProcoreRules = {
  clientID: {
    required: true,
    rules: [],
  },
  clientSecret: {
    required: true,
    rules: [],
  },
};

export const getProcoreInitialData = () => ({
  clientID: '',
  clientSecret: '',
});

export const initialFormData = {
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export const resetPasswordData = {
  newPassword: '',
  confirmPassword: '',
  currentPassword: '',
};

export const accountDataInitValues = {
  firstName: '',
  lastName: '',
};

export const getAccountInitialData = (isFcaUser: boolean, isAdmin: boolean) => ({
  firstName: '',
  lastName: '',
  mobilePhoneNumber: isFcaUser && isAdmin ? '' : undefined,
  officePhoneNumber: isFcaUser && isAdmin ? '' : undefined,
  officePhoneExtension: isFcaUser && isAdmin ? '' : undefined,
  preferredContactMethod: isFcaUser && isAdmin ? UserModel.PreferredContactMethod.EMAIL : undefined,
});
