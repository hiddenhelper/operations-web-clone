import { DeviceType } from './device';
import { Role } from './user';
import { UserModel } from '.';

export const filterMap: {
  [k: string]: { id: string; key: string; title: string; roleList?: Role[]; permissionsExpression?: string };
} = {
  [DeviceType.ACCESS_CONTROL_SYSTEM]: {
    id: DeviceType.ACCESS_CONTROL_SYSTEM,
    key: DeviceType.ACCESS_CONTROL_SYSTEM,
    title: 'Access Control System',
    permissionsExpression: UserModel.AccessControlSystemsPermission.VIEWACCESS,
  },
  [DeviceType.BADGE_PRINTER_SYSTEM]: {
    id: DeviceType.BADGE_PRINTER_SYSTEM,
    key: DeviceType.BADGE_PRINTER_SYSTEM,
    title: 'Badge Printing System',
    permissionsExpression: UserModel.BadgePrintingSystemsPermission.VIEWACCESS,
  },
};
