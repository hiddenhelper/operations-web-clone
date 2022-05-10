import React, { memo, useEffect, useMemo } from 'react';
import { Route, Redirect, useHistory } from 'react-router';

import { ClientModel, GeneralModel, UserModel } from '../../../models';

import Main from '../Main';
import Loader from '../Loader';
import { ROUTES } from 'constants/routes';
import { CompanyStatus } from 'modules/models/resource';

export interface IProtectedRouteProps {
  location?: { pathname: string };
  authenticated: boolean;
  currentUserRole: UserModel.Role;
  roleList: UserModel.Role[];
  clientMap?: GeneralModel.IEntityMap<ClientModel.IClient>;
  path: string;
  exact?: boolean;
  sessionChecked: boolean;
  companyId?: string;
  render: any;
  fetchClient: (id: string) => void;
  recoverSession: () => void;
}

const ProtectedRoute = ({
  path,
  exact,
  authenticated,
  currentUserRole,
  roleList,
  render: RenderComponent,
  sessionChecked,
  clientMap,
  companyId,
  fetchClient,
  recoverSession,
}: IProtectedRouteProps) => {
  const hasValidRole: boolean = [...roleList, UserModel.Role.FCA_ADMIN].includes(currentUserRole);
  const LoginComponent = React.lazy(() => import('../Login'));
  const currentClient = useMemo(() => (clientMap[companyId] ? clientMap[companyId] : ClientModel.getFallbackClient()), [clientMap, companyId]);
  const isGuest = !!companyId && currentClient.status === CompanyStatus.ONBOARDING;
  const history = useHistory();

  useEffect(() => {
    if (!clientMap[companyId] && companyId) fetchClient(companyId);
  }, [fetchClient, clientMap, companyId]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!sessionChecked) recoverSession();
  }, [sessionChecked, recoverSession]);
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (authenticated && !currentUserRole) return <Loader />;
        if (currentUserRole && !hasValidRole) return <Redirect to="/" />;

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
