import { DeviceType } from './device';
import { Role } from './user';

export const filterMap: { [k: string]: { id: string; key: string; title: string; roleList: Role[] } } = {
  [DeviceType.ACCESS_CONTROL_SYSTEM]: {
    id: DeviceType.ACCESS_CONTROL_SYSTEM,
    key: DeviceType.ACCESS_CONTROL_SYSTEM,
    title: 'Access Control System',
    roleList: [Role.FCA_ADMIN],
  },
  [DeviceType.BADGE_PRINTER_SYSTEM]: {
    id: DeviceType.BADGE_PRINTER_SYSTEM,
    key: DeviceType.BADGE_PRINTER_SYSTEM,
    title: 'Badge Printing System',
    roleList: [Role.FCA_ADMIN],
  },
};
