import React, { memo } from 'react';
import { UserModel } from '../../../models';

export interface IRoleGuardProps {
  currentUserRole: UserModel.Role;
  roleList: UserModel.Role[];
  children: React.ReactElement;
  fallback?: React.ReactElement;
}

const RoleGuard = ({ currentUserRole, roleList, fallback = null, children }: IRoleGuardProps) => {
  const shouldRenderChildren = roleList.includes(currentUserRole);
  return shouldRenderChildren ? children : fallback;
};

export default memo(RoleGuard);
