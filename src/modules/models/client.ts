import { IStep, INamedEntity } from './general';
import { IUser, UserFields } from './user';
import { IAddress, getFallbackAddress, addressFieldRules } from './address';
import { CompanyStatus } from './resource';
import { CompanyRole, CompanyProjectStatus } from './project';

export enum ClientFields {
  NAME = 'name',
  DEVELOPER = 'isDeveloper',
  TAXPAYER_IDENTIFICATION_NUMBER = 'taxpayerIdentificationNumber',
  MWBE_TYPE = 'mwbeTypeId',
  TRADES = 'trades',
  OTHER_TRADE = 'otherTrade',
  USERS = 'users',
  ADMIN_USER = 'user',
  BILLING_ADDRESS = 'billingAddress',
  MAILING_ADDRESS = 'mailingAddress',
  SAME_ADDRESS = 'mailingAddressMatchesBillingAddress',
  UNIVERSAL_BADGE_PRICE = 'universalBadgePrice',
}

export interface IClient {
  id: string;
  [ClientFields.NAME]: string;
  [ClientFields.DEVELOPER]: boolean;
  [ClientFields.TAXPAYER_IDENTIFICATION_NUMBER]?: string;
  [ClientFields.MWBE_TYPE]?: string;
  [ClientFields.TRADES]: INamedEntity[];
  [ClientFields.OTHER_TRADE]: string;
  [ClientFields.USERS]?: IUser[];
  [ClientFields.ADMIN_USER]?: IUser;
  [ClientFields.BILLING_ADDRESS]: IAddress;
  [ClientFields.MAILING_ADDRESS]: IAddress;
  [ClientFields.SAME_ADDRESS]: boolean;
  hasUniversalBadge: boolean;
  [ClientFields.UNIVERSAL_BADGE_PRICE]: number;
  status: CompanyStatus;
  hasPaymentMethod?: string;
  isTaxExempt?: boolean;
}

export interface IClientProject extends IClient {
  companyProjectStatus: CompanyProjectStatus;
  jobSiteAddress: IAddress;
  role: CompanyRole;
}

export interface IHirearchyClientProject extends Partial<IClientProject> {
  level: number;
  sponsoredCompaniesIds: string[];
  trades: INamedEntity[];
  createdAt?: string;
}

export enum ClientStep {
  GENERAL_INFORMATION = 'general-information',
  ADDRESSES = 'addresses',
  USERS = 'users',
  REVIEW = 'review',
}

export interface IStepMap {
  [key: string]: IStep;
}

export const clientStepMap: IStepMap = {
  [ClientStep.GENERAL_INFORMATION]: {
    key: ClientStep.GENERAL_INFORMATION,
    title: 'General Information',
    subtitle: 'Create New Client',
    hideControls: false,
    order: 0,
    fields: [
      { name: ClientFields.NAME, required: true },
      { name: ClientFields.DEVELOPER, required: false },
      { name: ClientFields.TAXPAYER_IDENTIFICATION_NUMBER, required: true },
      { name: ClientFields.MWBE_TYPE, required: true, computePositive: true },
      { name: ClientFields.TRADES, required: true },
      { name: ClientFields.OTHER_TRADE, required: false },
      { name: ClientFields.UNIVERSAL_BADGE_PRICE, required: false },
    ],
  },
  [ClientStep.ADDRESSES]: {
    key: ClientStep.ADDRESSES,
    title: 'Addresses',
    subtitle: 'My Company LCC',
    hideControls: false,
    order: 1,
    fields: [
      {
        name: ClientFields.BILLING_ADDRESS,
        required: true,
        fields: addressFieldRules.required,
      },
      {
        name: ClientFields.MAILING_ADDRESS,
        required: false,
        fields: addressFieldRules.notRequired,
      },
    ],
  },
  [ClientFields.USERS]: {
    key: ClientStep.USERS,
    title: 'Users',
    subtitle: 'My Company LCC',
    hideControls: false,
    order: 2,
    fields: [
      {
        name: ClientFields.USERS,
        required: true,
        fields: [
          { name: UserFields.FIRST_NAME, required: true },
          { name: UserFields.LAST_NAME, required: true },
          { name: UserFields.EMAIL, required: false },
          { name: UserFields.TITLE, required: false },
          { name: UserFields.MOBILE_PHONE_NUMBER, required: false },
          { name: UserFields.OFFICE_PHONE_NUMBER, required: false },
          { name: UserFields.PREFERRED_CONTACT_METHOD, required: true },
          { name: UserFields.GROUP_IDS, required: false },
        ],
      },
    ],
  },
  [ClientStep.REVIEW]: {
    key: ClientStep.REVIEW,
    title: 'Review',
    subtitle: 'My Company LCC',
    hideControls: true,
    order: 3,
    fields: [],
  },
};

export const developerStepMap = {
  [ClientStep.GENERAL_INFORMATION]: {
    ...clientStepMap[ClientStep.GENERAL_INFORMATION],
    fields: [{ name: ClientFields.NAME, required: true }],
  },
  [ClientStep.ADDRESSES]: {
    ...clientStepMap[ClientStep.ADDRESSES],
    fields: [],
  },
  [ClientFields.USERS]: {
    ...clientStepMap[ClientStep.USERS],
    fields: [],
  },
  [ClientStep.REVIEW]: {
    ...clientStepMap[ClientStep.REVIEW],
    fields: [],
  },
};

export const tabList: { id: string; key: string; title: string }[] = [
  {
    id: 'projects',
    key: 'projects',
    title: 'Projects',
  },
  {
    id: 'users',
    key: 'users',
    title: 'Users',
  },
  {
    id: 'workers',
    key: 'workers',
    title: 'Workers',
  },
  {
    id: 'invoices',
    key: 'invoices',
    title: 'Invoices',
  },
  {
    id: 'information',
    key: 'information',
    title: 'Information',
  },
];

export const taxExemptOptionList = [
  { value: 1, label: 'Exempt' },
  { value: 0, label: 'Not Exempt' },
];

export const getFallbackClient = (): IClient => ({
  id: null,
  name: '',
  isDeveloper: false,
  taxpayerIdentificationNumber: null,
  mwbeTypeId: '',
  trades: [],
  otherTrade: null,
  users: [],
  billingAddress: getFallbackAddress(),
  mailingAddress: getFallbackAddress(),
  mailingAddressMatchesBillingAddress: true,
  status: CompanyStatus.DRAFT,
  hasUniversalBadge: false,
  universalBadgePrice: null,
});
