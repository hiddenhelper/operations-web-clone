export enum DeviceType {
  ACCESS_CONTROL_SYSTEM = 'access-control-system',
  BADGE_PRINTER_SYSTEM = 'badge-printing-system',
}

export interface IDevice {
  id?: string;
  deviceName?: string;
  serialNumber?: string;
  notes?: string;
  status?: DeviceStatus;
}

export enum DeviceStatus {
  AVAILABLE = 0,
  ASSIGNED = 1,
}

export const deviceStatusMap = {
  [DeviceStatus.AVAILABLE]: 'Available',
  [DeviceStatus.ASSIGNED]: 'Assigned',
};

export const deviceStatusOptionList = [
  { value: DeviceStatus.AVAILABLE, label: deviceStatusMap[DeviceStatus.AVAILABLE] },
  { value: DeviceStatus.ASSIGNED, label: deviceStatusMap[DeviceStatus.ASSIGNED] },
];

export const deviceStatusAvailableMap = {
  [DeviceStatus.AVAILABLE]: true,
  [DeviceStatus.ASSIGNED]: false,
};
