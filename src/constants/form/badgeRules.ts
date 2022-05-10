import { ruleMap } from '../../utils/useValidator';

export const assignBadgeVisitorRules = {
  firstName: {
    required: true,
    rules: [],
  },
  lastName: {
    required: true,
    rules: [],
  },
  description: {
    required: true,
    rules: [],
  },
  companyId: {
    required: true,
    rules: [],
  },
  entityName: {
    required: false,
    rules: [],
  },
  validFrom: {
    required: true,
    rules: [ruleMap.isInvalidDate],
  },
  validTo: {
    required: true,
    rules: [ruleMap.isInvalidDate],
  },
};
