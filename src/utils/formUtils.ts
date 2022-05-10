import { IFormRules, validateRules } from './useValidator';

export const validateObject = <T>(value: T, rules: IFormRules) => {
  const err = validateRules({ model: value, constraints: rules });
  const errorList = Object.keys(err).reduce((total: any, field) => ({ ...total, [field]: err[field] }), {});
  return Object.keys(err).length > 0 ? errorList : false;
};
