import { Role } from './user';
import { WorkerStatus } from './worker';

export enum Status {
  DRAFT = 0,
  PENDING_APPROVAL = 1,
  ACTIVE = 2,
  ARCHIVED = 3,
}

export enum CompanyStatus {
  DRAFT = 0,
  PENDING_APPROVAL = 1,
  ACTIVE = 2,
  ARCHIVED = 3,
  ONBOARDING = 4,
  ONBOARDING_PENDING_APPROVAL = 5,
  REJECTED = 6,
}

export enum FilterType {
  SELF_PROJECT = 4,
}

export enum SettingsFilterType {
  PROFILE = 1,
  PASSWORD = 2,
  INTEGRATIONS = 3,
}

export enum Type {
  CLIENT = 'Client',
  PROJECT = 'Project',
  WORKER = 'Worker',
}

export enum ListViewType {
  LIST,
  HIERARCHY,
}

export const statusMap = {
  [Status.DRAFT]: 'Draft',
  [Status.PENDING_APPROVAL]: 'Pending Approval',
  [Status.ACTIVE]: 'Active',
  [Status.ARCHIVED]: 'Archived',
};

export const CompanyStatusMap = {
  [CompanyStatus.DRAFT]: 'Draft',
  [CompanyStatus.ONBOARDING]: 'Invitation Sent',
  [CompanyStatus.PENDING_APPROVAL]: 'Pending Approval',
  [CompanyStatus.REJECTED]: 'Rejected',
  [CompanyStatus.ACTIVE]: 'Active',
  [CompanyStatus.ARCHIVED]: 'Archived',
};

export const pieStatusMap = {
  ...statusMap,
  [Status.PENDING_APPROVAL]: 'Pending',
};

export const statusColorMap = {
  [Status.DRAFT]: '#1F86E8',
  [Status.PENDING_APPROVAL]: '#E9A61F',
  [Status.ACTIVE]: '#37A66C',
};

export const workerPieStatusMap = {
  [WorkerStatus.ACTIVE]: 'Active',
  [WorkerStatus.EXPIRED]: 'Expired',
  [WorkerStatus.PENDING_REGISTRATION]: 'Pending',
};

export const statusWorkerColorMap = {
  [WorkerStatus.ACTIVE]: '#37A66C',
  [WorkerStatus.EXPIRED]: '#E03535',
  [WorkerStatus.PENDING_REGISTRATION]: '#E9A61F',
};

export const filterTypeMap = {
  [FilterType.SELF_PROJECT]: 'My Projects',
};

export const settingsFilterTypeMap = {
  [SettingsFilterType.PROFILE]: 'Profile',
  [SettingsFilterType.PASSWORD]: 'Password',
  [SettingsFilterType.INTEGRATIONS]: 'Integrations',
};

export const filterMap: { [k: number]: { id: number; key: string; title: string; roleList: Role[] } } = {
  [FilterType.SELF_PROJECT]: {
    id: FilterType.SELF_PROJECT,
    key: 'my-projects',
    title: filterTypeMap[FilterType.SELF_PROJECT],
    roleList: [Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [Status.DRAFT]: { id: Status.DRAFT, key: 'draft', title: statusMap[Status.DRAFT], roleList: [Role.FCA_ADMIN] },
  [Status.PENDING_APPROVAL]: {
    id: Status.PENDING_APPROVAL,
    key: 'pending-approval',
    title: statusMap[Status.PENDING_APPROVAL],
    roleList: [Role.FCA_ADMIN],
  },
  [Status.ACTIVE]: { id: Status.ACTIVE, key: 'active', title: statusMap[Status.ACTIVE], roleList: [Role.FCA_ADMIN] },
  [Status.ARCHIVED]: { id: Status.ARCHIVED, key: 'archived', title: statusMap[Status.ARCHIVED], roleList: [Role.FCA_ADMIN] },
};

export const keyFilterMap = {
  [filterMap[FilterType.SELF_PROJECT].key]: filterMap[FilterType.SELF_PROJECT].id,
  [filterMap[Status.DRAFT].key]: filterMap[Status.DRAFT].id,
  [filterMap[Status.PENDING_APPROVAL].key]: filterMap[Status.PENDING_APPROVAL].id,
  [filterMap[Status.ACTIVE].key]: filterMap[Status.ACTIVE].id,
  [filterMap[Status.ARCHIVED].key]: filterMap[Status.ARCHIVED].id,
};

export const companyFilterMap: { [k: number]: { id: number; key: string; title: string; roleList: Role[]; order?: number } } = {
  [FilterType.SELF_PROJECT]: {
    id: FilterType.SELF_PROJECT,
    key: 'my-projects',
    title: filterTypeMap[FilterType.SELF_PROJECT],
    roleList: [Role.CLIENT_ADMIN, Role.REGULAR_USER],
    order: 0,
  },
  [CompanyStatus.DRAFT]: { id: CompanyStatus.DRAFT, key: 'draft', title: CompanyStatusMap[CompanyStatus.DRAFT], roleList: [Role.FCA_ADMIN], order: 1 },
  [CompanyStatus.ONBOARDING]: {
    id: CompanyStatus.ONBOARDING,
    key: 'onboarding',
    title: CompanyStatusMap[CompanyStatus.ONBOARDING],
    roleList: [Role.FCA_ADMIN],
    order: 2,
  },
  [CompanyStatus.PENDING_APPROVAL]: {
    id: CompanyStatus.PENDING_APPROVAL,
    key: 'pending-approval',
    title: CompanyStatusMap[CompanyStatus.PENDING_APPROVAL],
    roleList: [Role.FCA_ADMIN],
    order: 3,
  },
  [CompanyStatus.REJECTED]: {
    id: CompanyStatus.REJECTED,
    key: 'rejected',
    title: CompanyStatusMap[CompanyStatus.REJECTED],
    roleList: [Role.FCA_ADMIN],
    order: 4,
  },
  [CompanyStatus.ACTIVE]: { id: CompanyStatus.ACTIVE, key: 'active', title: CompanyStatusMap[CompanyStatus.ACTIVE], roleList: [Role.FCA_ADMIN], order: 5 },
  [CompanyStatus.ARCHIVED]: {
    id: CompanyStatus.ARCHIVED,
    key: 'archived',
    title: CompanyStatusMap[CompanyStatus.ARCHIVED],
    roleList: [Role.FCA_ADMIN],
    order: 6,
  },
};

export const companyKeyFilterMap = {
  [companyFilterMap[FilterType.SELF_PROJECT].key]: companyFilterMap[FilterType.SELF_PROJECT].id,
  [companyFilterMap[CompanyStatus.DRAFT].key]: companyFilterMap[CompanyStatus.DRAFT].id,
  [companyFilterMap[CompanyStatus.ONBOARDING].key]: companyFilterMap[CompanyStatus.ONBOARDING].id,
  [companyFilterMap[CompanyStatus.PENDING_APPROVAL].key]: companyFilterMap[CompanyStatus.PENDING_APPROVAL].id,
  [companyFilterMap[CompanyStatus.REJECTED].key]: companyFilterMap[CompanyStatus.REJECTED].id,
  [companyFilterMap[CompanyStatus.ACTIVE].key]: companyFilterMap[CompanyStatus.ACTIVE].id,
  [companyFilterMap[CompanyStatus.ARCHIVED].key]: companyFilterMap[CompanyStatus.ARCHIVED].id,
};

export const settingsFilterMap: { [k: number]: { id: number; key: string; title: string; roleList: Role[] } } = {
  [SettingsFilterType.PROFILE]: {
    id: SettingsFilterType.PROFILE,
    key: 'profile',
    title: settingsFilterTypeMap[SettingsFilterType.PROFILE],
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [SettingsFilterType.PASSWORD]: {
    id: SettingsFilterType.PASSWORD,
    key: 'password',
    title: settingsFilterTypeMap[SettingsFilterType.PASSWORD],
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [SettingsFilterType.INTEGRATIONS]: {
    id: SettingsFilterType.INTEGRATIONS,
    key: 'integrations',
    title: settingsFilterTypeMap[SettingsFilterType.INTEGRATIONS],
    roleList: [Role.CLIENT_ADMIN],
  },
};

export const statusProjectArchiveMap = {
  0: (name: string) => ({
    archiveTitle: `Archive ${name}?`,
    archiveText: 'If you do it, this project will be seen as an Archived Project.',
    archiveButtonLabel: 'Archive Project',
    archiveCardTitle: 'Archive',
  }),
  1: (name: string) => ({
    archiveTitle: `Unarchive ${name}?`,
    archiveText: 'If you do it, this project will be seen as an Active Project again.',
    archiveButtonLabel: 'Unarchive Project',
    archiveCardTitle: 'Unarchive',
  }),
};

export const statusClientArchiveMap = {
  0: (name: string) => ({
    archiveTitle: `Archive ${name}?`,
    archiveText: 'If you do it, this client will be seen as an Archived Client and you will not be able to assign projects to it.',
    archiveButtonLabel: 'Archive Client',
    archiveCardTitle: 'Archive',
  }),
  1: (name: string) => ({
    archiveTitle: `Unarchive ${name}?`,
    archiveText: 'If you do it, this client will be seen as an Active Client again.',
    archiveButtonLabel: 'Unarchive Client',
    archiveCardTitle: 'Unarchive',
  }),
};
