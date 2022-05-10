import { ruleMap } from '../../utils/useValidator';

export const rules = {
  email: {
    required: true,
    rules: [ruleMap.isValidEmail],
  },
  password: {
    required: true,
    rules: [],
  },
};

export const initialData = {
  email: '',
  password: '',
};
