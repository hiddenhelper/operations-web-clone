import { UserModel, ClientModel, ResourceModel, AddressModel } from '../modules/models';
import { getDefaultValue, getConditionalDefaultValue, sanitizePhoneNumber, isEmpty, sanitizeNumber } from './generalUtils';
import { sanitizeAddress } from './addressUtils';

export const sanitizeUser = (user: UserModel.IUser) => ({
  ...user,
  firstName: getDefaultValue(user.firstName, null),
  lastName: getDefaultValue(user.lastName, null),
  title: getDefaultValue(user.title, null),
  email: getDefaultValue(user.email, null),
  preferredContactMethod: parseInt(user.preferredContactMethod as any, 10),
  mobilePhoneNumber: isEmpty(user.mobilePhoneNumber) ? null : sanitizePhoneNumber(user.mobilePhoneNumber),
  officePhoneNumber: isEmpty(user.officePhoneNumber) ? null : sanitizePhoneNumber(user.officePhoneNumber),
  officePhoneExtension: isEmpty(user.officePhoneExtension) ? null : sanitizePhoneNumber(user.officePhoneExtension),
});

export const sanitizeUserList = (userList: UserModel.IUser[]) => userList.map(user => sanitizeUser(user));

export const sanitizeClient = (client: ClientModel.IClient, noneId) => ({
  ...client,
  taxpayerIdentificationNumber: !isEmpty(client.taxpayerIdentificationNumber) ? String(client.taxpayerIdentificationNumber) : null,
  mwbeTypeId: !isEmpty(client.mwbeTypeId) ? client.mwbeTypeId : noneId,
  billingAddress: sanitizeAddress(client.billingAddress),
  mailingAddress: /* istanbul ignore next */ client.mailingAddressMatchesBillingAddress
    ? null
    : client.mailingAddress
    ? sanitizeAddress(client.mailingAddress)
    : null,
  trades: client.trades.map(trade => trade.id) as any,
  users: client.users && sanitizeUserList([...client.users]),
  universalBadgePrice: getConditionalDefaultValue(client?.hasUniversalBadge, sanitizeNumber(client.universalBadgePrice), null),
});

export const preloadClient = (client: ClientModel.IClient) => ({
  ...client,
  billingAddress: isEmpty(client.billingAddress) ? AddressModel.getFallbackAddress() : client.billingAddress,
});

export const getDrawerButton = (status, clientId: string): { buttonText: string; linkTo: string } => {
  const drawerButton = {
    [ResourceModel.CompanyStatus.DRAFT]: {
      buttonText: 'Edit',
      linkTo: `/clients/wizard/${clientId}`,
    },
    [ResourceModel.CompanyStatus.ACTIVE]: {
      buttonText: 'Client Detail',
      linkTo: `/clients/detail/${clientId}`,
    },
    [ResourceModel.CompanyStatus.PENDING_APPROVAL]: {
      buttonText: 'Review',
      linkTo: `/clients/wizard/${clientId}/review`,
    },
    [ResourceModel.CompanyStatus.ARCHIVED]: {
      buttonText: 'Client Detail',
      linkTo: `/clients/detail/${clientId}`,
    },
    [ResourceModel.CompanyStatus.ONBOARDING]: {
      buttonText: 'Client Detail',
      linkTo: null,
    },
    [ResourceModel.CompanyStatus.ONBOARDING_PENDING_APPROVAL]: {
      buttonText: 'Review',
      linkTo: `/clients/detail/${clientId}/review`,
    },
    [ResourceModel.CompanyStatus.REJECTED]: {
      buttonText: 'Client Detail',
      linkTo: null,
    },
  };
  return drawerButton[status];
};
