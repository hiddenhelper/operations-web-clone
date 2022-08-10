import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { store, history } from './state-mgmt/store';
import { ROUTES } from '../constants';
import { theme } from '../constants/style';

import ProtectedRoute from './views/shared/ProtectedRoute';
import ToastList from './views/shared/ToastList';
import Register from './views/pages/Register';
import ForgotPassword from './views/pages/ForgotPassword';
import ResetPassword from './views/pages/ResetPassword';

const Dashboard = React.lazy(() => import('./views/pages/Dashboard'));
const DashboardProject = React.lazy(() => import('./views/pages/DashboardProject'));
const DashboardClient = React.lazy(() => import('./views/pages/DashboardClient'));
const DashboardWorker = React.lazy(() => import('./views/pages/DashboardWorker'));
const ClientList = React.lazy(() => import('./views/pages/ClientList'));
const ClientInvite = React.lazy(() => import('./views/pages/ClientInvite'));
const ClientWizard = React.lazy(() => import('./views/pages/ClientWizard'));
const ClientDetail = React.lazy(() => import('./views/pages/ClientDetail'));
const ProjectList = React.lazy(() => import('./views/pages/ProjectList'));
const ProjectWizard = React.lazy(() => import('./views/pages/ProjectWizardNew'));
const ProjectDetailNew = React.lazy(() => import('./views/pages/ProjectDetailNew'));
const ProcoreMapping = React.lazy(() => import('./views/pages/ProcoreClientMapping'));
const ProjectInvitation = React.lazy(() => import('./views/pages/ProjectInvitation'));
const InventoryList = React.lazy(() => import('./views/pages/InventoryList'));
const AccessControlSystemWizard = React.lazy(() => import('./views/pages/AccessControlSystemWizard'));
const BadgePrinterSystemWizard = React.lazy(() => import('./views/pages/BadgePrinterSystemWizard'));
const WorkerWizard = React.lazy(() => import('./views/pages/WorkerWizard'));
const WorkerList = React.lazy(() => import('./views/pages/WorkerList'));
const WorkerDetail = React.lazy(() => import('./views/pages/WorkerDetail'));
const InvoiceList = React.lazy(() => import('./views/pages/InvoiceList'));
const InvoiceDetail = React.lazy(() => import('./views/pages/InvoiceDetail'));
const Security = React.lazy(() => import('./views/pages/Security'));
const AdminSettings = React.lazy(() => import('./views/pages/AdminSettings/Settings'));
const ProcoreCompanies = React.lazy(() => import('./views/pages/Procore'));
const AccountSettings = React.lazy(() => import('./views/pages/AccountSettings'));
const PaymentSettings = React.lazy(() => import('./views/pages/PaymentSettings'));
const ClientOnboarding = React.lazy(() => import('./views/pages/ClientOnboarding'));
const Reports = React.lazy(() => import('./views/pages/Reports'));

const AppRoot = () => {
  useEffect(() => {
    history.listen(() => {
      if (globalThis.swUpdateReady) {
        globalThis.swUpdateReady = false;
        window.stop();
        window.location.reload();
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <ProtectedRoute permissionsExpression={ROUTES.DASHBOARD.permissionsExpression} exact={true} path={ROUTES.DASHBOARD.path} render={Dashboard} />
            <ProtectedRoute
              permissionsExpression={ROUTES.DASHBOARD_PROJECTS.permissionsExpression}
              exact={true}
              path={ROUTES.DASHBOARD_PROJECTS.path}
              render={DashboardProject}
            />

            <ProtectedRoute
              permissionsExpression={ROUTES.DASHBOARD_CLIENTS.permissionsExpression}
              exact={true}
              path={ROUTES.DASHBOARD_CLIENTS.path}
              render={DashboardClient}
            />

            <ProtectedRoute
              permissionsExpression={ROUTES.DASHBOARD_WORKERS.permissionsExpression}
              exact={true}
              path={ROUTES.DASHBOARD_WORKERS.path}
              render={DashboardWorker}
            />

            <ProtectedRoute
              permissionsExpression={ROUTES.CLIENT_INVITE.permissionsExpression}
              exact={true}
              path={ROUTES.CLIENT_INVITE.path}
              render={ClientInvite}
            />

            <ProtectedRoute
              permissionsExpression={ROUTES.CLIENT_WIZARD.permissionsExpression}
              exact={true}
              path={ROUTES.CLIENT_WIZARD.path}
              render={ClientWizard}
            />

            <ProtectedRoute
              permissionsExpression={ROUTES.CLIENT_DETAIL.permissionsExpression}
              exact={true}
              path={ROUTES.CLIENT_DETAIL.path}
              render={ClientDetail}
            />

            <ProtectedRoute permissionsExpression={ROUTES.CLIENT_LIST.permissionsExpression} exact={true} path={ROUTES.CLIENT_LIST.path} render={ClientList} />

            <ProtectedRoute
              permissionsExpression={ROUTES.PROJECT_LIST.permissionsExpression}
              exact={true}
              path={ROUTES.PROJECT_LIST.path}
              render={ProjectList}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.PROJECT_DETAIL.permissionsExpression}
              exact={true}
              path={ROUTES.PROJECT_DETAIL.path}
              render={ProjectDetailNew}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.PROCORE_MAPPING.permissionsExpression}
              exact={true}
              path={ROUTES.PROCORE_MAPPING.path}
              render={ProcoreMapping}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.PROJECT_WIZARD.permissionsExpression}
              exact={true}
              path={ROUTES.PROJECT_WIZARD.path}
              render={ProjectWizard}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.PROJECT_INVITATION.permissionsExpression}
              exact={true}
              path={ROUTES.PROJECT_INVITATION.path}
              render={ProjectInvitation}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.INVENTORY_LIST.permissionsExpression}
              exact={true}
              path={ROUTES.INVENTORY_LIST.path}
              render={InventoryList}
            />
            <ProtectedRoute permissionsExpression={ROUTES.ADMIN.permissionsExpression} exact={true} path={ROUTES.ADMIN.path} render={AdminSettings} />
            <ProtectedRoute
              permissionsExpression={ROUTES.PROCORE_CLIENTS.permissionsExpression}
              exact={true}
              path={ROUTES.PROCORE_CLIENTS.path}
              render={ProcoreCompanies}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.PROCORE_MAPPING.permissionsExpression}
              exact={true}
              path={ROUTES.PROCORE_MAPPING.path}
              render={ProcoreCompanies}
            />

            <ProtectedRoute
              permissionsExpression={ROUTES.ACCESS_CONTROL_SYSTEM_WIZARD.permissionsExpression}
              exact={true}
              path={ROUTES.ACCESS_CONTROL_SYSTEM_WIZARD.path}
              render={AccessControlSystemWizard}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.BADGE_PRINTER_SYSTEM_WIZARD.permissionsExpression}
              exact={true}
              path={ROUTES.BADGE_PRINTER_SYSTEM_WIZARD.path}
              render={BadgePrinterSystemWizard}
            />
            <ProtectedRoute permissionsExpression={ROUTES.WORKER_LIST.permissionsExpression} exact={true} path={ROUTES.WORKER_LIST.path} render={WorkerList} />
            <ProtectedRoute
              permissionsExpression={ROUTES.WORKER_WIZARD.permissionsExpression}
              exact={true}
              path={ROUTES.WORKER_WIZARD.path}
              render={WorkerWizard}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.WORKER_DETAIL.permissionsExpression}
              exact={true}
              path={ROUTES.WORKER_DETAIL.path}
              render={WorkerDetail}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.INVOICE_LIST.permissionsExpression}
              exact={true}
              path={ROUTES.INVOICE_LIST.path}
              render={InvoiceList}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.INVOICE_DETAIL.permissionsExpression}
              exact={true}
              path={ROUTES.INVOICE_DETAIL.path}
              render={InvoiceDetail}
            />
            <ProtectedRoute permissionsExpression={ROUTES.SECURITY.permissionsExpression} exact={true} path={ROUTES.SECURITY.path} render={Security} />
            <ProtectedRoute permissionsExpression={ROUTES.REPORTS.permissionsExpression} exact={true} path={ROUTES.REPORTS.path} render={Reports} />

            <ProtectedRoute
              permissionsExpression={ROUTES.ACCOUNT_SETTINGS.permissionsExpression}
              path={ROUTES.ACCOUNT_SETTINGS.path}
              exact={true}
              render={AccountSettings}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.PAYMENT_SETTINGS.permissionsExpression}
              path={ROUTES.PAYMENT_SETTINGS.path}
              exact={true}
              render={PaymentSettings}
            />
            <ProtectedRoute
              permissionsExpression={ROUTES.CLIENT_ONBOARDING.permissionsExpression}
              path={ROUTES.CLIENT_ONBOARDING.path}
              exact={true}
              render={ClientOnboarding}
            />

            <Route path={ROUTES.REGISTER.path} exact={true} render={() => <Register />} />
            <Route path={ROUTES.FORGOT_PASSWORD.path} exact={true} render={() => <ForgotPassword />} />
            <Route path={ROUTES.RESET_PASSWORD.path} exact={true} render={() => <ResetPassword />} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
      <ToastList />
    </Provider>
  );
};

export default AppRoot;
