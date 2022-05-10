import { Role } from './user';

export enum MappingTabType {
  PROJECTS = 'projects',
  VENDORS = 'vendors',
}

export const tabMap: { [key: string]: { id: string; key: string; title: string; roleList: Role[] } } = {
  [MappingTabType.PROJECTS]: {
    id: 'projects',
    key: 'projects',
    title: 'Projects',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [MappingTabType.VENDORS]: {
    id: 'vendors',
    key: 'vendors',
    title: 'Vendors',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
};

export interface IProcoreSaveVendorMapping {
  vendorCompanyId: string;
  procoreVendorId: string;
}

export interface IProcoreSaveProjectMapping {
  projectId: string;
  procoreProjectId: string;
}

export interface IProcoreVendor {
  id: string;
  name: string;
  taxpayerIdentificationNumber: string | null;
}

export interface IProcoreVendorMapping {
  mappingStatus: ProcoreMappingStatus;
  procoreVendorId: string | null;
  company: IProcoreVendor;
  isDisabled: boolean;
}

export interface IProcoreVendorMappings {
  pageNumber: number;
  pageSize: number;
  totalResults: number;
  items: IProcoreVendorMapping[];
}

export interface IProcoreVendors {
  pageNumber: number;
  pageSize: number;
  totalResults: number;
  items: IProcoreVendor[];
}

export interface IProcoreProjectMapping {
  mappingStatus: ProcoreMappingStatus;
  procoreProjectId: string | null;
  project: IProcoreProject;
  isDisabled: boolean;
}

export interface IProcoreProject {
  id: string;
  name: string;
}

export interface IProcoreProjects {
  pageNumber: number;
  pageSize: number;
  totalResults: number;
  items: IProcoreProject[];
}

export interface IProcoreProjectMappings {
  pageNumber: number;
  pageSize: number;
  totalResults: number;
  items: IProcoreProjectMapping[];
}

export interface IProcoreClient {
  company: {
    id: string;
    name: string;
  };
  status: number;
  createdAt: string;
  numberOfProjects: number;
}

export enum ProcoreClientStatus {
  PENDING = 0,
  ACTIVE = 1,
}

export enum ProcoreMappingStatus {
  NO = 0,
  MAPPED = 1,
  SUGGESTED = 2,
}

export enum ProcoreReportFrequency {
  DAILY = 0,
  HOURLY = 1,
}

export enum ProcoreErrorKeys {
  UNABLE_TO_CONNECT_WITH_PROCORE = 'UNABLE_TO_CONNECT_WITH_PROCORE',
  PROCORE_VALIDATION_ERROR = 'PROCORE_VALIDATION_ERROR',
}
