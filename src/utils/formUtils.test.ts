import { validateObject } from './formUtils';
import { getAddress_2 } from '../test/entities';

describe('formUtils', () => {
  const formRules = {
    city: {
      required: true,
      rules: [],
    },
  };
  it('should validateObject', () => {
    const errors = validateObject({ value: getAddress_2() }, formRules);
    expect(errors).toEqual({
      city: 'is required',
    });
  });
});
