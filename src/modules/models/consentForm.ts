import { Gender, INamedEntity } from './general';
import { IIdentificationGeographicLocation, PaymentType, WorkerProjectInvitationStatus } from './worker';
import { IAddress, getFallbackAddress } from './address';

export enum ConsentFormLanguages {
  ENGLISH = 'en',
  SPANISH = 'es',
}

export const ConsentFormLanguageNames = {
  [ConsentFormLanguages.ENGLISH]: 'English',
  [ConsentFormLanguages.SPANISH]: 'Spanish',
};

export enum YearsOfExperience {
  LESS_THAN_1_YEAR = 1,
  MORE_THAN_2_YEARS = 2,
  MORE_THAN_8_YEARS = 8,
  MORE_THAN_14_YEARS = 14,
  MORE_THAN_20_YEARS = 20,
}

export const yearsOfExperienceMap = {
  [YearsOfExperience.LESS_THAN_1_YEAR]: 'Less than 1 year',
  [YearsOfExperience.MORE_THAN_2_YEARS]: 'More than 2 years',
  [YearsOfExperience.MORE_THAN_8_YEARS]: 'More than 8 years',
  [YearsOfExperience.MORE_THAN_14_YEARS]: 'More than 14 years',
  [YearsOfExperience.MORE_THAN_20_YEARS]: 'More than 20 years',
};

export const yearsOfExperienceList = Object.keys(yearsOfExperienceMap).map(year => ({ value: parseInt(year, 10), label: yearsOfExperienceMap[year] }));

export interface IConsentFormLegal {
  languageId: string;
  languageCode: ConsentFormLanguages;
  name?: string;
  body: string;
}

export enum ConsentFormFieldDescriptions {
  DATE_OF_HIRE = '(Sat, Jan 01, 2000)',
  ELIGIBLE_TO_WORK_IN_US = '(Yes, No)',
  LANGUAGE_TURNER_PROTOCOL = '(English, Spanish, Other)',
  LAST_4_SSN = '(0000)',
  LGBTQ = '(Yes, No)',
  HOURLY_RATE_PAY = '(000.00)',
  PAYMENT_TYPE = '(Hourly, Salary)',
  JOB_TITLE = '(Inspector, Office Staff / Administrative Support, Other)',
  REFERRED_BY = '',
  SECTION_3_EMPLOYEE = '(Yes, No)',
  SECTION_3_RESIDENT = '(Yes, No)',
  SETP_STATUS = '(Yes, No)',
  SOC_JOB_TITLE = '(Brickmasons and Blockmasons, Carpenters, Carpet Installers, Cement Masons and Concrete Finishers, Construction and Building Inspectors, Electricians, etc.)',
  SUPERVISOR_NAME = '',
  SUPERVISOR_PHONE = '(+0 000 000 0000)',
  TRADE_STATUS = '(Apprentice, Foreman, Journeyman, Master, N/A)',
  VEHICLE_INFORMATION = '(Color, Make, Model, State, License Plate Number)',
  YEARS_OF_EXPERIENCE = '(0-1, 2-7, 8-13, 14-19, 20+)',
}

export enum ConsentFormFieldDataType {
  Undefined = 0,
  TextField = 1,
  Select = 2,
  PhoneNumber = 3,
  DatePicker = 4,
  CheckBoxes = 5,
  FieldsGroup = 6,
}

export interface IConsentFormFieldConfig {
  consentFormFieldId: string;
  consentFormFieldName?: string;
  isVisible?: boolean;
  isMandatory?: boolean;
}

export interface IConsentFormField {
  id: string;
  name: string;
  code: string;
  options?: INamedEntity[];
  createdAt: string;
  defaultValue?: string;
  dataType: ConsentFormFieldDataType;
  order: number;
}

export interface IWorkerConsentFormField extends IConsentFormField {
  isMandatory: boolean;
}

export interface IConsentForm {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobilePhoneNumber: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  ethnicity: INamedEntity;
  socialSecurityNumber: string;
  isVeteran: boolean;
  primaryLanguage: INamedEntity;
  phoneNumber: string;
  identificationNumber: string;
  identificationType: INamedEntity;
  identificationGeographicLocation: IIdentificationGeographicLocation;
  jobTitle: INamedEntity;
  jobTitleId: string;
  tradeStatus: INamedEntity;
  tradeStatusId: string;
  otherTrade: string;
  address: IAddress;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  isSkilled: boolean;
  isSupervisor: boolean;
  company: INamedEntity;
  allergies: string;
  paymentType: PaymentType;
  isAffiliatedToLaborUnion: boolean;
  laborUnionNumber: string;
  yearsOfExperience: number;
  socJobTitle: INamedEntity;
  socJobTitleId: string;
  licensePlate: string;
  invitationStatus: WorkerProjectInvitationStatus;
  trades: INamedEntity[];
  skilledTrades: INamedEntity[];
  signatureUrl: string;
  supervisorPhone: string;
  hardHatNumber: string;
  supervisorName: string;
  section3Employee: number;
  referredById: string;
  referredBy?: any;
  dateOfHire: string;
  consentFormFields: IWorkerConsentFormField[];
  projectId?: string;
  createdAt: string;
  eligibleToWorkInUs: number;
  lgbtq: number;
  languageTurnerProtocol: INamedEntity;
  languageTurnerProtocolId: string;
  projectSkilledTrade: INamedEntity;
  projectSkilledTradeId: string;
  otherProjectSkilledTrade?: string;
  hourlyRatePay: number;
  section3Resident: number;
  stepStatus: number;
  legalInformation: string;
  consentFormName: string;
}

export interface IProjectInformationForm {
  supervisorPhone: string;
  hardHatNumber: string;
  supervisorName: string;
  section3Employee: number;
  referredById: string;
  dateOfHire: string;
  eligibleToWorkInUs: number;
  lgbtq: number;
  jobTitle: INamedEntity;
  jobTitleId: string;
  socJobTitle: INamedEntity;
  socJobTitleId: string;
  tradeStatus: INamedEntity;
  tradeStatusId: string;
  languageTurnerProtocol: INamedEntity;
  languageTurnerProtocolId: string;
  projectSkilledTrade: INamedEntity;
  projectSkilledTradeId: string;
  otherProjectSkilledTrade: string;
  hourlyRatePay: number;
  section3Resident: number;
  stepStatus: number;
  paymentType: number;
  yearsOfExperience: number;
}

export const getFallbackProjectInformationForm = (): IProjectInformationForm => ({
  supervisorPhone: null,
  hardHatNumber: null,
  supervisorName: null,
  section3Employee: null,
  referredById: null,
  dateOfHire: null,
  eligibleToWorkInUs: null,
  lgbtq: null,
  jobTitle: null,
  jobTitleId: null,
  socJobTitle: null,
  socJobTitleId: null,
  tradeStatus: null,
  tradeStatusId: null,
  languageTurnerProtocol: null,
  languageTurnerProtocolId: null,
  projectSkilledTrade: null,
  projectSkilledTradeId: null,
  otherProjectSkilledTrade: null,
  hourlyRatePay: null,
  section3Resident: null,
  stepStatus: null,
  paymentType: null,
  yearsOfExperience: null,
});

export const getFallbackConsentForm = (): IConsentForm => ({
  id: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobilePhoneNumber: null,
  email: null,
  dateOfBirth: null,
  gender: null,
  ethnicity: null,
  socialSecurityNumber: null,
  isVeteran: null,
  primaryLanguage: null,
  phoneNumber: null,
  identificationNumber: null,
  identificationType: null,
  identificationGeographicLocation: null,
  jobTitle: null,
  jobTitleId: null,
  tradeStatus: null,
  tradeStatusId: null,
  otherTrade: null,
  address: getFallbackAddress(),
  emergencyContactName: null,
  emergencyContactPhone: null,
  emergencyContactRelationship: null,
  isSkilled: null,
  isSupervisor: null,
  company: null,
  allergies: null,
  paymentType: null,
  isAffiliatedToLaborUnion: null,
  laborUnionNumber: null,
  yearsOfExperience: null,
  socJobTitle: null,
  socJobTitleId: null,
  licensePlate: null,
  invitationStatus: null,
  trades: null,
  skilledTrades: null,
  signatureUrl: null,
  supervisorPhone: null,
  hardHatNumber: null,
  supervisorName: null,
  section3Employee: null,
  referredById: null,
  dateOfHire: null,
  referredBy: null,
  consentFormFields: [],
  createdAt: null,
  eligibleToWorkInUs: null,
  lgbtq: null,
  languageTurnerProtocol: null,
  languageTurnerProtocolId: null,
  projectSkilledTrade: null,
  projectSkilledTradeId: null,
  otherProjectSkilledTrade: null,
  hourlyRatePay: null,
  section3Resident: null,
  stepStatus: null,
  legalInformation: null,
  consentFormName: null,
});
