import { hasValidPermissions } from 'modules/models/user';
import React, { memo } from 'react';
import { UserModel } from '../../../models';

export interface IPermissionGuardProps {
  entityId?: any;
  entityType?: any;
  isAdmin: boolean;
  isFcaUser: boolean;
  shouldBeAdmin?: boolean;
  shouldbeFCAUser?: boolean;
  permissionsExpression?: string;
  currentUserPermissions: UserModel.IPermission[];
  children: React.ReactElement;
  fallback?: React.ReactElement;
}

const IPermissionGuardProps = ({
  currentUserPermissions,
  entityId,
  entityType,
  permissionsExpression,
  fallback = null,
  children,
  shouldbeFCAUser,
  shouldBeAdmin,
  isFcaUser,
  isAdmin,
}: IPermissionGuardProps) => {
  let shouldRenderChildren = true;
  shouldRenderChildren = hasValidPermissions(permissionsExpression, currentUserPermissions);
  return shouldRenderChildren && (shouldbeFCAUser ? isFcaUser : true) && (shouldBeAdmin ? isAdmin : true) ? children : fallback;
};

export default memo(IPermissionGuardProps);
