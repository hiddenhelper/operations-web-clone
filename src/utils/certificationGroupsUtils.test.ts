import { sanitizeCertificationGroups } from './certificationGroupsUtils';

describe('Certifications Groups Utils', () => {
  describe('sanitizeCertificationGroups', () => {
    const certificationWithEmptyString = [
      {
        id: '123abc',
        name: 'certification Group',
        certifications: [
          {
            alias: '',
            id: '4c43e33c-044d-4598-83eb-37df6c8031ea',
            name: 'Crane Operator',
          },
        ],
        validationType: 1,
      },
    ];
    const certificationWithEmptyStringAndSpace = [
      {
        id: '123abc',
        name: 'certification Group',
        certifications: [
          {
            alias: '     ',
            id: '4c43e33c-044d-4598-83eb-37df6c8031ea',
            name: 'Crane Operator',
          },
        ],
        validationType: 1,
      },
    ];
    const certificationWithNullValue = [
      {
        id: '123abc',
        name: 'certification Group',
        certifications: [
          {
            alias: null,
            id: '4c43e33c-044d-4598-83eb-37df6c8031ea',
            name: 'Crane Operator',
          },
        ],
        validationType: 1,
      },
    ];
    const certificationWithString = [
      {
        id: '123abc',
        name: 'certification Group',
        certifications: [
          {
            alias: 'Crane Operator',
            id: '4c43e33c-044d-4598-83eb-37df6c8031ea',
            name: 'Crane Operator',
          },
        ],
        validationType: 1,
      },
    ];

    it('should validate empty string', () => {
      expect(sanitizeCertificationGroups(certificationWithEmptyString)).toEqual(certificationWithNullValue);
    });

    it('should validate empty string and space', () => {
      expect(sanitizeCertificationGroups(certificationWithEmptyStringAndSpace)).toEqual(certificationWithNullValue);
    });

    it('should validate a null value', () => {
      expect(sanitizeCertificationGroups(certificationWithNullValue)).toEqual(certificationWithNullValue);
    });

    it('should validate a string', () => {
      expect(sanitizeCertificationGroups(certificationWithString)).toEqual(certificationWithString);
    });
  });
});
