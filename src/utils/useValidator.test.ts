import { renderHook } from '@testing-library/react-hooks';
import { isNumber } from './generalUtils';
import { useValidator, ruleMap, IFormRules } from './useValidator';

describe('useValidator', () => {
  const model = {
    id: null,
    name: '',
    lastname: '',
    email: 'hgf',
    phone: 'ards',
    age: 0,
    custom: 0,
    taxpayerIdentificationNumber: '3827382',
    maxLength: 'text',
    users: [
      {
        email: 'asd',
      },
    ],
  };
  const constraints: IFormRules = {
    name: {
      required: true,
      rules: [],
    },
    lastname: {
      required: true,
    },
    email: {
      required: true,
      rules: [ruleMap.isValidEmail],
    },
    phone: {
      required: false,
      rules: [ruleMap.isValidPhoneNumber],
    },
    custom: {
      required: true,
      rules: [({ value }) => value < 9 && !isNumber(value) && 'invalid taxpayerIdentificationNumber number'],
    },
    taxpayerIdentificationNumber: {
      required: true,
      rules: [ruleMap.isValidTaxpayerIdentificationNumber],
      args: [{ max: 12, min: 9 }],
    },
    age: {
      required: false,
      rules: [({ value }) => value < 15 && 'is less than 15'],
    },
    maxLength: {
      required: false,
      rules: [ruleMap.isMaxLength],
      args: [{ max: 10 }],
    },
  };

  describe('validateForm', () => {
    it('should validate all inputs of a model form', () => {
      const { result } = renderHook(() => useValidator(), [] as any);
      const { validateForm } = result.current;
      const response = validateForm({ model, constraints });
      expect(response).toEqual({
        age: 'is less than 15',
        email: 'Please enter a valid Email Address.',
        phone: 'Please enter a valid Phone Number.',
        lastname: 'is required',
        name: 'is required',
        maxLength: 'it should be 10 long',
        taxpayerIdentificationNumber: 'Please enter valid Taxpayer Identification Number.',
      });
    });

    it('should return empty error map when all fields are valid', () => {
      const { result } = renderHook(() => useValidator(), [] as any);
      model.name = 'name';
      (model.lastname = 'lastname'), (model.email = 'email@something.com');
      model.age = 23;
      model.phone = '+54 (34) 16514041';
      model.maxLength = 'some long text more than 10';
      model.taxpayerIdentificationNumber = 'LOZG-780211-7B9';
      model.users = [{ email: 'email@something.com' }];
      const { validateForm } = result.current;
      const response = validateForm({ model, constraints });
      expect(response).toEqual({});
    });
  });

  describe('validateField', () => {
    it('should validate one field of a model', () => {
      const { result } = renderHook(() => useValidator(), [] as any);
      const { validateField } = result.current;
      model.email = 'some@email';
      const response = validateField(model, 'email', { rules: [({ value }) => value.length < 20 && 'length < 20'] });
      expect(response).toEqual({
        email: 'length < 20',
      });
    });
  });

  describe('isInvalidPassword', () => {
    const validList = [
      'Aa45678@',
      'Aa@45678',
      '@Aa45678',
      '@Aa45678 €“£’©®',
      '5oM3Pa5S*',
      '1234567890@zZ',
      'Test.123',
      "Test''123",
      'Test"1234',
      'Test^$*.[]{}()?"!@#%&/,><\':;|_~123 $Aa45678 ;Aa45678 Aa45678',
    ];
    const invalidList = [
      '12345678',
      'abcabcad',
      'ABCDEFGH',
      'Aa345678',
      'aa@45678',
      'AA@45678',
      'Aa€5678',
      'Aa£5678',
      'Aa“5678',
      'Aa+45678',
      'Aa-45678',
      'Aa=45678',
      'Aa 5678',
    ];

    it('should be valid for all validList', () => {
      validList.forEach(password => {
        expect(ruleMap.isInvalidPassword({ value: password } as any)).toBe(false);
      });
    });

    it('should be invalid for all invalidList', () => {
      invalidList.forEach(password => {
        expect(ruleMap.isInvalidPassword({ value: password } as any)).toBe('invalid');
      });
    });
  });

  it('should validate taxpayer id number', () => {
    const validFormats = ['LOZG-780211-7B9', 'FOO-750212-3T7', '12-9876543', '432-34-4532'];
    const invalidFormats = ['ABCDEFGHI', 'a12345678', '0123.5678', 'LO-ZG-78-02-11-7B9', 'LOZG750212', 'ABCDEF123343', '12324343532', '12.987654'];

    validFormats.forEach(id => {
      expect(ruleMap.isValidTaxpayerIdentificationNumber({ value: id, args: {}, model: null, name: null })).toBeFalsy();
    });

    invalidFormats.forEach(id => {
      expect(ruleMap.isValidTaxpayerIdentificationNumber({ value: id, args: {}, model: null, name: null })).toEqual(
        'Please enter valid Taxpayer Identification Number.'
      );
    });
  });
});
