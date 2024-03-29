import { UserModel } from '../modules/models';

export const ROUTES = {
  DASHBOARD: { path: '/', permissionsExpression: '' },
  DASHBOARD_PROJECTS: {
    path: '/dashboard/projects',
    permissionsExpression: UserModel.ProjectsPermission.VIEWACCESS,
  },
  DASHBOARD_CLIENTS: { path: '/dashboard/clients', permissionsExpression: UserModel.ClientsPermission.VIEWACCESS },

  DASHBOARD_WORKERS: { path: '/dashboard/workers', permissionsExpression: UserModel.WorkersPermission.VIEWACCESS },

  CLIENT_WIZARD: { path: '/clients/wizard/:id/:step?', permissionsExpression: UserModel.DraftClientsPermission.MANAGE },

  CLIENT_INVITE: { path: '/clients/invite/:id', permissionsExpression: UserModel.DraftClientsPermission.MANAGE },

  CLIENT_DETAIL: { path: '/clients/detail/:id/:step?', permissionsExpression: UserModel.ClientsPermission.VIEWACCESS },

  CLIENT_LIST: { path: '/clients', permissionsExpression: UserModel.ClientsPermission.VIEWACCESS },

  PROJECT_WIZARD: {
    path: '/projects/wizard/:id/:step?',
    permissionsExpression: UserModel.DraftProjectsPermission.VIEWACCESS,
  },
  PROJECT_DETAIL: { path: '/projects/detail/:id/:step?', permissionsExpression: UserModel.ProjectsPermission.VIEWACCESS },
  PROJECT_LIST: { path: '/projects', permissionsExpression: UserModel.ProjectsPermission.VIEWACCESS },
  PROJECT_INVITATION: { path: '/projects/invitation/:id/:step?', permissionsExpression: UserModel.ProjectsPermission.ACCEPTSERVICEAGREEMENT },
  PROCORE_MAPPING: { path: '/procore-clients/client-mapping/:id/:step?', permissionsExpression: UserModel.ProcoreIntegrationsPermission.VIEWACCESS },
  WORKER_LIST: { path: '/workers', permissionsExpression: UserModel.WorkersPermission.VIEWACCESS },
  WORKER_WIZARD: { path: '/workers/wizard/:id', permissionsExpression: UserModel.WorkersPermission.MANAGE },
  WORKER_DETAIL: { path: '/workers/detail/:id/:step?', permissionsExpression: UserModel.WorkersPermission.VIEWACCESS },
  INVENTORY_LIST: { path: '/inventory', permissionsExpression: UserModel.StatisticsPermission.Inventory },
  ACCESS_CONTROL_SYSTEM_WIZARD: { path: '/inventory/access-control-system/wizard/:id', permissionsExpression: UserModel.AccessControlSystemsPermission.MANAGE },
  BADGE_PRINTER_SYSTEM_WIZARD: { path: '/inventory/badge-printing-system/wizard/:id', permissionsExpression: UserModel.BadgePrintingSystemsPermission.MANAGE },
  ACCOUNT_SETTINGS: { path: '/account/settings', permissionsExpression: '' },
  PAYMENT_SETTINGS: { path: '/payment/settings', permissionsExpression: UserModel.PaymentMethodsPermission.VIEWACCESS },
  INVOICE_LIST: { path: '/invoices', permissionsExpression: UserModel.InvoicesPermission.VIEWACCESS },
  INVOICE_DETAIL: { path: '/invoices/:id', permissionsExpression: UserModel.InvoicesPermission.VIEWACCESS },
  REGISTER: { path: '/users/registration', permissionsExpression: '' },
  FORGOT_PASSWORD: { path: '/forgot-password', permissionsExpression: '' },
  RESET_PASSWORD: { path: '/users/reset-password', permissionsExpression: '' },
  ADMIN: { path: '/admin', permissionsExpression: UserModel.AdminPermission.GENERAL },
  PROCORE_CLIENTS: { path: '/procore-clients', permissionsExpression: UserModel.ProcoreIntegrationsPermission.VIEWACCESS },
  CLIENT_ONBOARDING: { path: '/client-onboarding', permissionsExpression: UserModel.DraftClientsPermission.MANAGE },
  SECURITY: { path: '/security', permissionsExpression: UserModel.AdminPermission.GENERAL },
  REPORTS: { path: '/reports', permissionsExpression: '' },
};
