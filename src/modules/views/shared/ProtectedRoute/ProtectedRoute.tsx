import React, { memo, useEffect, useMemo } from 'react';
import { Route, Redirect, useHistory } from 'react-router';

import { ClientModel, GeneralModel, UserModel } from '../../../models';

import Main from '../Main';
import Loader from '../Loader';
import { ROUTES } from 'constants/routes';
import { CompanyStatus } from 'modules/models/resource';
import { hasValidPermissions } from 'modules/models/user';

export interface IProtectedRouteProps {
  location?: { pathname: string };
  authenticated: boolean;
  currentUserPermissions: UserModel.IPermission[];
  permissionsExpression?: string;
  clientMap?: GeneralModel.IEntityMap<ClientModel.IClient>;
  path: string;
  exact?: boolean;
  sessionChecked: boolean;
  currentCompanyId?: string;
  companyUserId?: string;
  render: any;
  fetchClient: (id: string) => void;
  fetchAdminPermission: (id: string) => void;
  fetchUserPermissions: (id: string) => void;
  recoverSession: () => void;
  getAccountData: () => void;
}

const ProtectedRoute = ({
  path,
  exact,
  authenticated,
  currentUserPermissions = [],
  permissionsExpression,
  render: RenderComponent,
  sessionChecked,
  clientMap,
  currentCompanyId,
  companyUserId,
  fetchClient,
  fetchAdminPermission,
  fetchUserPermissions,
  recoverSession,
  getAccountData,
}: IProtectedRouteProps) => {
  const hasCurrentUserPermissions = currentUserPermissions.length > 0;
  const hasAccess = hasValidPermissions(permissionsExpression, currentUserPermissions);
  const LoginComponent = React.lazy(() => import('../Login'));
  const currentClient = useMemo(() => (clientMap[currentCompanyId] ? clientMap[currentCompanyId] : ClientModel.getFallbackClient()), [
    clientMap,
    currentCompanyId,
  ]);
  const isGuest = !!currentCompanyId && currentClient.status === CompanyStatus.ONBOARDING;
  const history = useHistory();

  useEffect(() => {
    if (!clientMap[currentCompanyId] && currentCompanyId) fetchClient(currentCompanyId);
  }, [fetchClient, clientMap, currentCompanyId]);

  useEffect(() => {
    if (companyUserId) {
      fetchAdminPermission(companyUserId);
      fetchUserPermissions(companyUserId);
    }
  }, [companyUserId, fetchAdminPermission, fetchUserPermissions]);

  useEffect(() => {
    if (!authenticated) return;
    getAccountData();
  }, [authenticated, getAccountData]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!sessionChecked) recoverSession();
  }, [sessionChecked, recoverSession]);

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (authenticated && !hasCurrentUserPermissions) return <Loader />;
        if (hasCurrentUserPermissions && !hasAccess) return <Redirect to="/" />;

        if (!authenticated)
          return (
            <React.Suspense fallback={<Loader />}>
              <LoginComponent />
            </React.Suspense>
          );
        if (currentClient && currentClient.status === CompanyStatus.ONBOARDING && history.location.pathname !== ROUTES.CLIENT_ONBOARDING.path)
          return <Redirect to="/client-onboarding" />;

        return (
          <Main isGuest={isGuest}>
            <React.Suspense fallback={<Loader />}>
              <RenderComponent />
            </React.Suspense>
          </Main>
        );
      }}
    />
  );
};

export default memo(ProtectedRoute);
