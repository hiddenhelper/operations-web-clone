import { INamedEntity } from './general';
import { WorkerProjectStatus } from './project';

export enum BadgeStatus {
  ACTIVE = 0,
  REVOKED = 1,
  DEACTIVATE = 2,
  EXPIRED = 3,
  NOT_ISSUED = 4,
}

export enum BadgeLayout {
  LARGE_HEADER = 1,
  SMALL_HEADER = 2,
  WHITE_HEADER = 3,
  VISITOR = 4,
}

export enum BadgeType {
  REGULAR = 0,
  UNIVERSAL = 1,
}

export enum VisitorAvailability {
  PENDING = 0,
  AVAILABLE = 1,
  ASSIGNED = 2,
}

export enum VisitorType {
  REGULAR = 0,
  VIP = 1,
}

export enum VisitorEntity {
  CLIENT = 0,
  OTHER = 1,
}

export enum VisitorBadgeStatus {
  AVAILABLE = 0,
  ASSIGNED = 1,
}

export interface IBadgeTemplate {
  id: string;
  layout: BadgeLayout;
  color: string;
  fontColor: string;
  font: string;
  logoUrl?: string;
  templateFileUrl?: string;
}

export interface IBadge {
  id: string;
  badgeTemplate: IBadgeTemplate;
  code: string;
  status: BadgeStatus;
  firstName: string;
  lastName: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  pictureUrl: string;
  companyName: string;
  hardHatNumber: string;
  tagId?: string;
  expirationDate?: string;
  badgeType?: BadgeType;
  consentFormSigned?: boolean;
  trainingsCompleted?: boolean;
  certificationsCompleted?: boolean;
  defaultExpirationDate?: string;
  workerProjectStatus?: WorkerProjectStatus;
  isSynchronizing?: boolean;
}

export enum BadgeAction {
  UNKNOWN = 0,
  ACTIVATE = 1,
  DEACTIVATE = 2,
  REVOKE = 3,
  REACTIVATE = 4,
  ADD_TO_ACS = 5,
  REMOVE_FROM_ACS = 6,
  UPDATE_EXPIRATION_DATE = 7,
  GENERATE_PDF = 8,
  INSERT_TAG_ID = 9,
}

export interface IBadgeHistory {
  id: string;
  date: string;
  badgeAction: BadgeAction;
  tagId: string;
  description: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  projectAccessControlSystem: {
    id: string;
    deviceName: string;
  };
  reader: {
    id: string;
    hostname: string;
  };
}

export interface IBadgeUpdateRequest {
  expirationDate?: string;
  hasExpiration?: number;
  tagId?: string;
}

export interface IBadgeVisitor {
  id: string;
  number: number;
  code: string;
  status: BadgeStatus;
  availability: VisitorAvailability;
  firstName: string;
  lastName: string;
  visitorType: VisitorType;
  validFrom: string;
  validTo: string;
  description: string;
  company?: INamedEntity;
  companyId?: string;
  entityName: string;
  visitorBadgeStatus: VisitorBadgeStatus;
  tagId?: string;
  isSynchronizing?: boolean;
}

export const badgeActionMap = {
  [BadgeAction.UNKNOWN]: () => 'Unknown',
  [BadgeAction.ACTIVATE]: () => 'Activate the badge',
  [BadgeAction.DEACTIVATE]: () => 'Deactivate the badge',
  [BadgeAction.REVOKE]: () => 'Revoke the badge',
  [BadgeAction.REACTIVATE]: () => 'Reactivate the badge',
  [BadgeAction.ADD_TO_ACS]: (name: string) => `Badge added on ACS ${name}`,
  [BadgeAction.REMOVE_FROM_ACS]: (name: string) => `Badge removed on ACS ${name}`,
  [BadgeAction.UPDATE_EXPIRATION_DATE]: () => 'Change the expiration date',
  [BadgeAction.GENERATE_PDF]: () => 'Generate PDF',
  [BadgeAction.INSERT_TAG_ID]: () => 'Insert Tag ID',
};

export const badgeOptionList = [{ title: 'Deactivate' }, { title: 'Revoke' }, { title: 'Reprint' }];

export const badgeStatusMap = {
  [BadgeStatus.ACTIVE]: 'Active',
  [BadgeStatus.REVOKED]: 'Revoked',
  [BadgeStatus.DEACTIVATE]: 'Deactivated',
  [BadgeStatus.EXPIRED]: 'Expired',
  [BadgeStatus.NOT_ISSUED]: 'Not Issued',
};

export const modalStatusMap = {
  [BadgeStatus.ACTIVE]: () => ({
    title: 'Activate Badge?',
    text: `Enter Badge Tag ID`,
    confirmLabel: 'Activate',
    loadingText: 'Activating...',
  }),
  [BadgeStatus.DEACTIVATE]: () => ({
    title: 'Deactivate Badge?',
    text: 'Please enter the reason to deactivate the Badge.',
    confirmLabel: 'Deactivate',
    loadingText: 'Deactivating...',
  }),
  [BadgeStatus.REVOKED]: () => ({
    title: 'Revoke Badge?',
    text: 'Please enter the reason to revoke the Badge.',
    confirmLabel: 'Revoke',
    loadingText: 'Revoking...',
  }),
  [BadgeStatus.EXPIRED]: () => ({}),
};

export const visitorAvailabilityMap = {
  [VisitorAvailability.AVAILABLE]: 'Available',
  [VisitorAvailability.ASSIGNED]: 'Assigned',
};

export const visitorTypeMap = {
  [VisitorType.REGULAR]: 'Regular',
  [VisitorType.VIP]: 'VIP',
};

export const visitorEntityMap = {
  [VisitorEntity.CLIENT]: 'Client',
  [VisitorEntity.OTHER]: 'Other',
};

export const entityOptionList = [
  { value: VisitorEntity.CLIENT, label: visitorEntityMap[VisitorEntity.CLIENT] },
  { value: VisitorEntity.OTHER, label: visitorEntityMap[VisitorEntity.OTHER] },
];

export enum BadgeModalAction {
  ACTIVE = 0,
  NOT_ACTIVE = 1,
}

export const getFallbackBadgeTemplate = (): IBadgeTemplate => ({
  id: null,
  layout: BadgeLayout.LARGE_HEADER,
  color: '1E86E8',
  fontColor: '444444',
  font: 'Arial',
  logoUrl: null,
  templateFileUrl: null,
});

export const getFallbackVisitorBadgeTemplate = (): IBadgeTemplate => ({
  id: null,
  layout: BadgeLayout.VISITOR,
  color: 'FFE304',
  fontColor: '444444',
  font: 'Arial',
  logoUrl: null,
  templateFileUrl: null,
});

export const getFallbackBadge = (isVisitor = false): IBadge => ({
  id: null,
  badgeTemplate: isVisitor ? getFallbackVisitorBadgeTemplate() : getFallbackBadgeTemplate(),
  status: BadgeStatus.DEACTIVATE,
  firstName: null,
  lastName: null,
  emergencyContactName: null,
  emergencyContactPhone: null,
  emergencyContactRelationship: null,
  companyName: null,
  hardHatNumber: null,
  code: null,
  pictureUrl: null,
  tagId: null,
  expirationDate: null,
  consentFormSigned: false,
  trainingsCompleted: false,
  certificationsCompleted: false,
  badgeType: BadgeType.REGULAR,
  defaultExpirationDate: null,
  workerProjectStatus: WorkerProjectStatus.PENDING,
});

export const getFallbackBadgeVisitor = (): IBadgeVisitor => ({
  id: null,
  number: null,
  code: null,
  firstName: null,
  lastName: null,
  validFrom: null,
  validTo: null,
  companyId: null,
  entityName: null,
  description: null,
  visitorType: VisitorType.REGULAR,
  status: BadgeStatus.DEACTIVATE,
  availability: VisitorAvailability.AVAILABLE,
  visitorBadgeStatus: VisitorBadgeStatus.AVAILABLE,
  tagId: null,
});
