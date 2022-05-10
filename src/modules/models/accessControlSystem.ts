import { ILocation } from './address';
import { IDevice, DeviceStatus } from './device';

export enum AccessControlSystemType {
  PORTAL = 0,
  TURNSTILE = 1,
  ENCLOSED_TS = 2,
  HANDHELD = 3,
}

export enum ReaderType {
  Entrance = 0,
  Exit = 1,
  BiDirectionalByAntenna = 2,
  BiDirectionalBySpec = 3,
}

export interface IReader {
  serialNumber: string;
  lastMaintenanceDate?: string;
  inServiceDate: string;
  model: string;
  notes?: string;
  hostname?: string;
  directionType?: ReaderType;
  hostAddress?: string;
  telnetConnectionPort?: string;
  sshConnectionPort?: string;
  httpConnectionPort?: string;
  tcpConnectionPort?: string;
}

export enum LifeCycleType {
  NEW = 0,
  UPGRADE = 1,
  IN_FIELD_TRANSFER = 2,
  REFURBISHED = 3,
}

export enum AccessControlSystemVersion {
  V1 = 0,
  V2 = 1,
  V3 = 2,
  V3_FACIAL = 3,
}

export interface IAccessControlSystem extends IDevice {
  type: AccessControlSystemType;
  lifeCycle: LifeCycleType;
  lastRefurbishedDate: string;
  lastMaintenanceDate: string;
  inServiceDate: string;
  warrantyExpirationDate: string;
  orderDate?: string;
  vendor?: string;
  invoice?: string;
  reader1?: IReader;
  reader2?: IReader;
  version: AccessControlSystemVersion;
  project?: {
    id: string;
    name: string;
  };
  status: DeviceStatus;
  location?: ILocation;
  hasReverseInstallation?: boolean;
  reader1SerialNumber?: string;
  reader2SerialNumber?: string;
  reader1Hostname?: string;
  reader2Hostname?: string;
}

export interface IProjectAccessControlSystem {
  id?: string;
  accessControlSystemId?: string;
  projectId?: string;
  type: AccessControlSystemType;
  serialNumber: string;
  locationId?: string;
  location?: ILocation;
  deviceName: string;
  hasReverseInstallation: boolean;
  reader1: IReader;
  reader2?: IReader;
}

export interface IProjectAccessControlSystemByLocation {
  location?: ILocation;
  accessControlSystems: IAccessControlSystem[];
}

export const accessControlSystemTypeMap = {
  [AccessControlSystemType.ENCLOSED_TS]: 'Enclosed TS',
  [AccessControlSystemType.HANDHELD]: 'Handheld',
  [AccessControlSystemType.PORTAL]: 'Open Portal',
  [AccessControlSystemType.TURNSTILE]: 'Turnstile',
};

export const typeOptionList = [
  { value: AccessControlSystemType.PORTAL, label: accessControlSystemTypeMap[AccessControlSystemType.PORTAL] },
  { value: AccessControlSystemType.TURNSTILE, label: accessControlSystemTypeMap[AccessControlSystemType.TURNSTILE] },
  { value: AccessControlSystemType.ENCLOSED_TS, label: accessControlSystemTypeMap[AccessControlSystemType.ENCLOSED_TS] },
  { value: AccessControlSystemType.HANDHELD, label: accessControlSystemTypeMap[AccessControlSystemType.HANDHELD] },
];

export const lifeCycleMap = {
  [LifeCycleType.NEW]: 'New',
  [LifeCycleType.UPGRADE]: 'Upgrade',
  [LifeCycleType.IN_FIELD_TRANSFER]: 'In Field Transfer',
  [LifeCycleType.REFURBISHED]: 'Refurbished',
};

export const lifeCycleOptionList = [
  { value: LifeCycleType.NEW, label: lifeCycleMap[LifeCycleType.NEW] },
  { value: LifeCycleType.UPGRADE, label: lifeCycleMap[LifeCycleType.UPGRADE] },
  { value: LifeCycleType.IN_FIELD_TRANSFER, label: lifeCycleMap[LifeCycleType.IN_FIELD_TRANSFER] },
  { value: LifeCycleType.REFURBISHED, label: lifeCycleMap[LifeCycleType.REFURBISHED] },
];

export const deviceVersionMap = {
  [AccessControlSystemVersion.V1]: 'V1',
  [AccessControlSystemVersion.V2]: 'V2',
  [AccessControlSystemVersion.V3]: 'V3',
  [AccessControlSystemVersion.V3_FACIAL]: 'V3Facial',
};

export const deviceVersionOptionList = [
  { value: AccessControlSystemVersion.V1, label: deviceVersionMap[AccessControlSystemVersion.V1] },
  { value: AccessControlSystemVersion.V2, label: deviceVersionMap[AccessControlSystemVersion.V2] },
  { value: AccessControlSystemVersion.V3, label: deviceVersionMap[AccessControlSystemVersion.V3] },
  { value: AccessControlSystemVersion.V3_FACIAL, label: deviceVersionMap[AccessControlSystemVersion.V3_FACIAL] },
];

export const readerTypeMap = {
  [ReaderType.Entrance]: 'Entrance',
  [ReaderType.Exit]: 'Exit',
  [ReaderType.BiDirectionalByAntenna]: 'BiDirectional By Antenna',
  [ReaderType.BiDirectionalBySpec]: 'BiDirectional By Spec',
};

export const readerTypeByTypeMap = {
  [AccessControlSystemType.PORTAL]: [
    { label: readerTypeMap[ReaderType.Entrance], value: ReaderType.Entrance },
    { label: readerTypeMap[ReaderType.Exit], value: ReaderType.Exit },
    { label: readerTypeMap[ReaderType.BiDirectionalByAntenna], value: ReaderType.BiDirectionalByAntenna },
  ],
  [AccessControlSystemType.TURNSTILE]: [{ label: readerTypeMap[ReaderType.BiDirectionalBySpec], value: ReaderType.BiDirectionalBySpec }],
  [AccessControlSystemType.ENCLOSED_TS]: [{ label: readerTypeMap[ReaderType.BiDirectionalBySpec], value: ReaderType.BiDirectionalBySpec }],
  [AccessControlSystemType.HANDHELD]: [],
};

export const getFallbackAccessControlSystem = (): IAccessControlSystem => ({
  id: null,
  type: AccessControlSystemType.PORTAL,
  serialNumber: null,
  lifeCycle: LifeCycleType.NEW,
  lastRefurbishedDate: null,
  lastMaintenanceDate: null,
  inServiceDate: null,
  warrantyExpirationDate: null,
  orderDate: null,
  vendor: null,
  invoice: null,
  project: null,
  status: null,
  notes: null,
  version: AccessControlSystemVersion.V1,
  reader1: getFallbackReader(),
  reader2: null,
  hasReverseInstallation: false,
});

export const getFallbackReader = (): IReader => ({
  serialNumber: null,
  lastMaintenanceDate: null,
  inServiceDate: null,
  model: null,
  notes: null,
});

export const getFallbackProjectAccessControlSystem = (): IProjectAccessControlSystem => ({
  type: AccessControlSystemType.PORTAL,
  accessControlSystemId: null,
  serialNumber: null,
  deviceName: null,
  hasReverseInstallation: false,
  reader1: null,
  reader2: null,
});
