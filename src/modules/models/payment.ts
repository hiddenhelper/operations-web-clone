import { Role } from './user';

export interface IPaymentMethod {
  paymentMethodId?: string;
  brand: string;
  country: string;
  expirationYear: number;
  expirationMonth: number;
  lastFourDigits: number;
  nameOnCard: string;
  hasAssociatedProjects?: boolean;
}

export interface IPaymentMethodRequest {
  nameOnCard: string;
  countryOrRegion: string;
  creditCard: string;
}

export enum SettingsFilterType {
  CREDIT_CARD = 0,
}

export const settingsFilterTypeMap = {
  [SettingsFilterType.CREDIT_CARD]: 'Credit Card',
};

export const settingsFilterMap: { [k: number]: { id: number; key: string; title: string; roleList: Role[] } } = {
  [SettingsFilterType.CREDIT_CARD]: {
    id: SettingsFilterType.CREDIT_CARD,
    key: 'credit-card',
    title: settingsFilterTypeMap[SettingsFilterType.CREDIT_CARD],
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN],
  },
};

export const getPaymentMethodFallback = (): IPaymentMethod => ({
  brand: null,
  country: null,
  expirationYear: null,
  expirationMonth: null,
  lastFourDigits: null,
  nameOnCard: null,
});
