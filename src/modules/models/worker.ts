import { IAddress, Borough } from './address';
import { INamedEntity, Gender } from './general';
import { IFilePreview } from './file';
import { BadgeType } from './badge';
import { UserModel } from '.';

export enum WorkerStatusFilter {
  NOT_SET = 0,
  ACTIVE = 1,
  PENDING_REGISTRATION = 2,
  MIGRATED = 4,
}

export enum WorkerStatus {
  PENDING_REGISTRATION = 1,
  ACTIVE = 0,
  EXPIRED = 2,
  NOT_INVITED = 3,
  MIGRATED = 4,
}

export enum WorkerProjectInvitationStatus {
  PENDING_REGISTRATION = 0,
  ACTIVE = 1,
}

export enum InviteMethod {
  EMAIL = 1,
  MOBILE_PHONE = 2,
  BOTH = 3,
}

export const InviteMethodMap = {
  [InviteMethod.EMAIL]: 'Email',
  [InviteMethod.MOBILE_PHONE]: 'Mobile Phone',
  [InviteMethod.BOTH]: 'Mobile Phone And Email',
};

export const InviteMethodValues = [
  { value: InviteMethod.MOBILE_PHONE, label: 'Mobile phone' },
  { value: InviteMethod.EMAIL, label: 'Email' },
  { value: InviteMethod.BOTH, label: 'Mobile Phone And Email' },
];

export enum WorkerDetailsTabs {
  PROJECTS = 'projects',
  ACTIVITY = 'activity',
  CERTIFICATIONS = 'certifications',
  TRAINIGS = 'trainings',
  OBSERVATIONS = 'observations',
  INFORMATION = 'information',
}

export enum WorkerActivityType {
  UNKNOWN = 0,
  ENTRANCE = 1,
  EXIT = 2,
}

export enum GeographicLocationType {
  COUNTRY = 1,
  STATE = 2,
}

export const workerActivityNameMap = {
  [WorkerActivityType.UNKNOWN]: { name: 'unknown', color: '#000000' },
  [WorkerActivityType.ENTRANCE]: { name: 'Check in', color: '#37A66C' },
  [WorkerActivityType.EXIT]: { name: 'Check out', color: '#E03534' },
};
export interface IWorkerActivity {
  id: string;
  type: WorkerActivityType;
  dateTime: string;
  location?: string;
  project: INamedEntity;
}

export interface IWorkerObservation {
  id: string;
  type: INamedEntity;
  date: string;
  project: INamedEntity;
  company?: INamedEntity;
  standardDescription: INamedEntity;
  comments?: string;
  files?: IFilePreview[];
  owner?: INamedEntity;
}

export interface IEthnicity extends INamedEntity {}

export interface ILanguage extends INamedEntity {}

export interface IJobTitle extends INamedEntity {}

export interface ISocJobTitle extends INamedEntity {}

export interface ITradeStatus extends INamedEntity {}

export interface ILanguageTurnerProtocol extends INamedEntity {}

export interface ISkilledTrade extends INamedEntity {}

export interface IProjectList extends INamedEntity {}

export interface IIdentificationType extends INamedEntity {
  geographicLocationsIds: string[];
}

export interface IIdentificationGeographicLocation extends INamedEntity {}

export interface IGeographicLocation extends INamedEntity {
  type: GeographicLocationType.COUNTRY | GeographicLocationType.STATE;
}

export interface ISOCJobTitle extends INamedEntity {}

export interface IWorkerCompany extends INamedEntity {
  hasUniversalBadge?: boolean;
}

export enum PaymentType {
  HOURLY = 1,
  SALARY = 2,
}

export interface IWorker {
  id: string;
  company?: IWorkerCompany;
  firstName: string;
  middleName: string;
  lastName: string;
  mobilePhoneNumber: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  ethnicity?: IEthnicity;
  ethnicityId?: string;
  socialSecurityNumber: string;
  isVeteran: boolean;
  allergies: string;
  identificationType?: IIdentificationType;
  identificationTypeId?: string;
  identificationNumber: string;
  identificationGeographicLocation: IIdentificationGeographicLocation;
  identificationGeographicLocationId: string;
  primaryLanguage?: ILanguage;
  primaryLanguageId?: string;
  otherPrimaryLanguage?: string;
  phoneNumber: string;
  isSkilled: boolean;
  otherTrade: string;
  address: IAddress;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  isSupervisor: boolean;
  laborUnionNumber: string;
  trades?: ISkilledTrade[];
  tradesIds?: string[];
  invitationStatus: WorkerStatus;
  isAffiliatedToLaborUnion: boolean;
  projectsCount?: number;
  pictureUrl?: string;
  createdAt?: string;
  certificationsCount?: number;
  trainingsCount?: number;
  observationsCount?: number;
  electronicBadgeCode?: string;
  inviteMethod: InviteMethod;
  line1: string;
  line2: string;
  city: string;
  stateCode: string;
  zipCode: string;
  country?: INamedEntity;
  countryId?: string;
  county?: string;
  attention1?: string;
  attention2?: string;
  stateName?: string;
  borough?: Borough;
  latitude: number;
  longitude: number;
}

export interface IExistingWorker {
  fullName: string;
  companyName?: string;
  mobilePhoneNumber?: string;
  email: string;
  dateOfBirth: string;
  stateCode?: string;
  stateName?: string;
  pictureUrl: string;
  socialSecurityNumber?: string;
}

export interface IWorkerProject extends IWorker {
  workerProjectStatus: WorkerProjectInvitationStatus;
}

export const tabList: { id: string; key: string; title: string; permissionsExpression?: string }[] = [
  {
    id: 'projects',
    key: 'projects',
    title: 'Projects',
    permissionsExpression: UserModel.WorkersPermission.VIEWACCESS,
  },
  {
    id: 'activity',
    key: 'activity',
    title: 'Activity',
    permissionsExpression: UserModel.WorkersPermission.VIEWACCESS,
  },
  {
    id: 'certifications',
    key: 'certifications',
    title: 'Certifications',
    permissionsExpression: `${UserModel.WorkerCertificationsPermission.VIEWACCESS} AND ${UserModel.ProjectsPermission.VIEWACCESS}`,
  },
  {
    id: 'trainings',
    key: 'trainings',
    title: 'Trainings',
    permissionsExpression: `${UserModel.WorkerTrainingsPermission.VIEWACCESS} AND ${UserModel.ProjectsPermission.VIEWACCESS}`,
  },
  {
    id: 'observations',
    key: 'observations',
    title: 'Observations',
    permissionsExpression: `${UserModel.WorkerObservationsPermission.VIEWACCESS} AND ${UserModel.ProjectsPermission.VIEWACCESS}`,
  },
  {
    id: 'information',
    key: 'information',
    title: 'Information',
    permissionsExpression: UserModel.WorkersPermission.VIEWACCESS,
  },
];

export const workerTabMap = {
  [WorkerStatusFilter.MIGRATED]: {
    id: WorkerStatusFilter.MIGRATED,
    key: 'pending-invitation',
    title: 'Pending Invitation',
    order: 0,
  },
  [WorkerStatusFilter.PENDING_REGISTRATION]: {
    id: WorkerStatusFilter.PENDING_REGISTRATION,
    key: 'pending-registration',
    title: 'Pending Registration',
    order: 1,
  },
  [WorkerStatusFilter.ACTIVE]: {
    id: WorkerStatusFilter.ACTIVE,
    key: 'active',
    title: 'Active',
    order: 2,
  },
};

export const workerInviteMap = {
  [WorkerStatus.ACTIVE]: 'Active',
  [WorkerStatus.PENDING_REGISTRATION]: 'Pending Registration',
  [WorkerStatus.EXPIRED]: 'Expired',
  [WorkerStatus.MIGRATED]: 'Pending Invitation',
};

export const isSkilledOptionList = [
  { value: 1, label: 'Skilled' },
  { value: 0, label: 'Non Skilled' },
];

export const isSupervisorOptionList = [
  { value: 1, label: 'Supervisor' },
  { value: 0, label: 'Non Supervisor' },
];

export const paymentTypeMap = {
  [PaymentType.HOURLY]: 'Hourly',
  [PaymentType.SALARY]: 'Salary',
};

export const paymentTypeList = [
  { value: PaymentType.HOURLY, label: paymentTypeMap[PaymentType.HOURLY] },
  { value: PaymentType.SALARY, label: paymentTypeMap[PaymentType.SALARY] },
];

export const badgeTypeMap = {
  [BadgeType.REGULAR]: 'Regular',
  [BadgeType.UNIVERSAL]: 'Universal',
};

export const badgeTypeList = [
  { value: BadgeType.REGULAR, label: badgeTypeMap[BadgeType.REGULAR] },
  { value: BadgeType.UNIVERSAL, label: badgeTypeMap[BadgeType.UNIVERSAL] },
];

export enum IsAllowed {
  ALLOWED = 0,
  NOT_ALLOWED = 1,
}

export const confirmModalPropsMap = {
  [IsAllowed.ALLOWED]: ({ onClose, content, onConfirm }) => ({
    title: 'Worker may exist',
    content,
    closeLabel: 'Cancel',
    isLoading: false,
    confirmLabel: 'Go to Profile',
    onConfirm: onConfirm,
    onClose: onClose,
  }),
  [IsAllowed.NOT_ALLOWED]: ({ onClose, content, onConfirm }) => ({
    title: 'Worker may exist',
    content,
    closeLabel: 'Cancel',
    isLoading: false,
    confirmLabel: 'Contact FCA Admin',
    onConfirm: onConfirm,
    onClose: onClose,
  }),
};

export const getFallbackWorker = (): IWorker => ({
  id: null,
  company: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobilePhoneNumber: null,
  phoneNumber: null,
  email: null,
  dateOfBirth: null,
  gender: null,
  ethnicity: null,
  ethnicityId: null,
  socialSecurityNumber: null,
  isVeteran: null,
  primaryLanguage: null,
  primaryLanguageId: null,
  otherPrimaryLanguage: null,
  allergies: null,
  identificationType: null,
  identificationTypeId: null,
  identificationNumber: null,
  identificationGeographicLocation: null,
  identificationGeographicLocationId: null,
  otherTrade: null,
  address: null,
  emergencyContactName: null,
  emergencyContactPhone: null,
  emergencyContactRelationship: null,
  isSkilled: null,
  isSupervisor: null,
  laborUnionNumber: null,
  trades: [],
  tradesIds: [],
  invitationStatus: WorkerStatus.ACTIVE,
  isAffiliatedToLaborUnion: null,
  inviteMethod: InviteMethod.MOBILE_PHONE,
  line1: null,
  line2: null,
  city: null,
  stateCode: null,
  zipCode: null,
  country: null,
  countryId: null,
  county: null,
  attention1: null,
  attention2: null,
  stateName: null,
  borough: null,
  latitude: null,
  longitude: null,
});
