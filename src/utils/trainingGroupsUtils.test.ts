import { sanitizeTrainingsGroups } from './trainingGroupsUtils';

describe('Trainig Groups Utils', () => {
  describe('sanitizeTrainingsGroups', () => {
    const trainigWithEmptyString = [
      {
        id: '123abc',
        name: 'Trainig Group',
        trainings: [
          {
            alias: '',
            id: '4c43e33c-044d-4598-83eb-37df6c8031ea',
            name: 'Crane Operator',
          },
        ],
        validationType: 1,
      },
    ];
    const trainigWithEmptyStringAndSpace = [
      {
        id: '123abc',
        name: 'Trainig Group',
        trainings: [
          {
            alias: '     ',
            id: '4c43e33c-044d-4598-83eb-37df6c8031ea',
            name: 'Crane Operator',
          },
        ],
        validationType: 1,
      },
    ];
    const trainigWithNullValue = [
      {
        id: '123abc',
        name: 'Trainig Group',
        trainings: [
          {
            alias: null,
            id: '4c43e33c-044d-4598-83eb-37df6c8031ea',
            name: 'Crane Operator',
          },
        ],
        validationType: 1,
      },
    ];
    const trainigWithString = [
      {
        id: '123abc',
        name: 'Trainig Group',
        trainings: [
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
      expect(sanitizeTrainingsGroups(trainigWithEmptyString)).toEqual(trainigWithNullValue);
    });

    it('should validate empty string and space', () => {
      expect(sanitizeTrainingsGroups(trainigWithEmptyStringAndSpace)).toEqual(trainigWithNullValue);
    });

    it('should validate a null value', () => {
      expect(sanitizeTrainingsGroups(trainigWithNullValue)).toEqual(trainigWithNullValue);
    });

    it('should validate a string', () => {
      expect(sanitizeTrainingsGroups(trainigWithString)).toEqual(trainigWithString);
    });
  });
});
