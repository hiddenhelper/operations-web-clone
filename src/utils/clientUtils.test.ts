import { sanitizeClient, preloadClient } from './clientUtils';
import { getClient_1, getClient_4 } from '../test/entities';
import { getFallbackAddress } from '../modules/models/address';

describe('sanitizeClient', () => {
  it('should sanitizeClient', () => {
    const sanitizedClient = sanitizeClient(getClient_1(), 'noneId');
    const sanitizedClientTwo = sanitizeClient(getClient_4(), null);
    expect(sanitizedClient).toEqual({
      billingAddress: {
        city: null,
        latitude: null,
        line1: null,
        line2: null,
        longitude: null,
        stateCode: null,
        zipCode: null,
        countryId: null,
        stateName: null,
      },
      taxpayerIdentificationNumber: 'LOZG-780211-7B9',
      id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
      isDeveloper: false,
      mailingAddress: null,
      mailingAddressMatchesBillingAddress: true,
      mwbeTypeId: '1',
      name: 'Robert C. Martin',
      otherTrade: null,
      status: 0,
      trades: ['1', '2'],
      users: [
        {
          companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
          company: {
            id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
            name: 'Constructions INC.',
          },
          email: 'user@test.com',
          firstName: 'Pedro',
          id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf3',
          invitationType: 0,
          lastName: 'Martin',
          mobilePhoneNumber: null,
          officePhoneExtension: null,
          officePhoneNumber: null,
          preferredContactMethod: 0,
          title: null,
          groupIds: [],
        },
        {
          companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
          company: {
            id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
            name: 'Constructions INC.',
          },
          email: 'user@test.com',
          firstName: 'Test',
          invitationType: 0,
          lastName: 'One',
          mobilePhoneNumber: null,
          officePhoneExtension: null,
          officePhoneNumber: '+5678947895',
          preferredContactMethod: 0,
          title: null,
          groupIds: [],
        },
      ],
      hasUniversalBadge: true,
      universalBadgePrice: null,
    });
    expect(sanitizedClientTwo).toEqual({
      billingAddress: {
        city: null,
        latitude: null,
        line1: null,
        line2: null,
        longitude: null,
        stateCode: null,
        zipCode: null,
        countryId: null,
        stateName: null,
      },
      taxpayerIdentificationNumber: null,
      id: '2222-47bb-9164e4c4-97fd-6521x-9164e4c4',
      isDeveloper: false,
      mailingAddress: null,
      mailingAddressMatchesBillingAddress: true,
      mwbeTypeId: null,
      name: '',
      otherTrade: null,
      status: 2,
      trades: [],
      users: [
        {
          companyId: null,
          email: null,
          firstName: null,
          id: undefined,
          invitationType: 0,
          lastName: null,
          mobilePhoneNumber: '+17323283234',
          officePhoneExtension: null,
          officePhoneNumber: null,
          preferredContactMethod: 0,
          title: null,
          groupIds: [],
        },
      ],
      hasUniversalBadge: false,
      universalBadgePrice: null,
    });
  });
});

describe('preloadClient', () => {
  it('should preloadClient', () => {
    expect(preloadClient({ ...getClient_1(), billingAddress: null })).toEqual({
      ...getClient_1(),
      billingAddress: getFallbackAddress(),
    });
  });
});
