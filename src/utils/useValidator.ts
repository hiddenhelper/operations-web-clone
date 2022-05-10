import { useCallback } from 'react';
import moment from 'moment';
import { parsePhoneNumber } from 'libphonenumber-js';
import { isEmpty, EMAIL_REGEXP, TAX_ID_REGEXP_LIST } from './generalUtils';

type Rule = ({ value, args, model, name }: { value: any; args: any; model: any; name: string }) => string | string[] | false;

export interface IErrorMessage {
  [field: string]: string;
}

export const ruleMap: { [fieldName: string]: Rule } = {
  isEmpty: ({ value }) => isEmpty(value) && 'is required',
  isValidEmail: ({ value }) => !EMAIL_REGEXP.test(value) && 'Please enter a valid Email Address.',
  isValidPhoneNumber: ({ value }) => {
    const msg = 'Please enter a valid Phone Number.';
    try {
      return value && !parsePhoneNumber(value, 'US').isValid() && msg;
    } catch (error) {
      return msg;
    }
  },
  isMaxLength: ({ value, args }) => String(value).length < args.max && `it should be ${args.max} long`,
  isValidTaxpayerIdentificationNumber: ({ value, args }) =>
    !TAX_ID_REGEXP_LIST.some(regex => new RegExp(regex, 'g').test(String(value).replace(/\s+/g, ''))) && `Please enter valid Taxpayer Identification Number.`,
  isInvalidPassword: ({ value }) =>
    (value.length < 8 || value.length > 256 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*(\d))(?=.*[\^$* .[\]{}()?"!@#%&/\\,><':;|_~`])+/.test(value)) && 'invalid',
  isInvalidDate: ({ value }) => !moment(value).isValid() && 'Please enter a valid Date',
};

export interface IValidateMessage {
  isInvalid: boolean;
  message: string;
}

export interface IFormRules {
  [fieldName: string]: {
    requiredForApproval?: boolean;
    required?: boolean;
    rules?: Rule[];
    args?: { [name: string]: any };
  };
}

export interface IFormValidate<FormType> {
  model: FormType;
  constraints: IFormRules;
}

export const validate = (model, fieldName, constraints, accumulator = {}) => {
  const { rules = [], args = [], required = false } = constraints[fieldName] || constraints;
  let ruleList = [...rules];
  if (required && !ruleList.includes(ruleMap.isEmpty)) ruleList = [...ruleList, ruleMap.isEmpty];
  return ruleList.reduce((total, rule, index) => {
    if (!required && isEmpty(model[fieldName])) return accumulator;
    const error = rule({ name: fieldName, value: model[fieldName], rules: constraints, args: args[index] || null, model });
    if (error) accumulator[fieldName] = error;
    return accumulator;
  }, accumulator);
};

export const validateRules = <FormType>({ model, constraints }: IFormValidate<FormType>): IErrorMessage => {
  return Object.keys(constraints).reduce((accumulator, fieldName) => validate(model, fieldName, constraints, accumulator), {});
};

export function useValidator<FormType>() {
  const validateField = useCallback(validate, []);

  const validateForm = useCallback(validateRules, [validateField]);

  return { validateForm, validateField };
}
