import { intersection } from 'lodash';
import LEP from '@jeanbenitez/logical-expression-parser';

export enum InviteType {
  DO_NOT_INVITE = 0,
  CLIENT_ADMIN = 1,
  REGULAR_USER = 2,
  ON_SITE_REPRESENTATIVE = 4,
}

export enum PreferredContactMethod {
  EMAIL = 0,
  PHONE = 1,
}

export enum Role {
  FCA_ADMIN = 'FCA_ADMIN',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  REGULAR_USER = 'REGULAR_USER',
}

export const RoleMap = {
  [Role.FCA_ADMIN]: 'FCA Admin',
  [Role.CLIENT_ADMIN]: 'Client Admin',
  [Role.REGULAR_USER]: 'Regular User',
};

export enum InvitationStatus {
  ACCEPTED = 0,
  PENDING = 1,
  EXPIRED = 2,
  NOT_INVITED = 3,
}

export enum PaymentMethodsPermission {
  CREATE = 'PaymentMethods.Create',
  UPDATE = 'PaymentMethods.Update',
  VIEW = 'PaymentMethods.View',
  LIST = 'PaymentMethods.List',
  DELETE = 'PaymentMethods.Delete',
  VIEWACCESS = 'PaymentMethods.ViewAccess',
  MANAGE = 'PaymentMethods.Manage',
}

export enum InvoicesPermission {
  CREATE = 'Invoices.Create',
  UPDATE = 'Invoices.Update',
  VIEW = 'Invoices.View',
  LIST = 'Invoices.List',
  DELETE = 'Invoices.Delete',
  SUMMARY = 'Invoices.Summary',
  CALCULATE = 'Invoices.Summary',
  STATISTICS = 'Invoices.Statistics',
  VIEWACCESS = 'Invoices.ViewAccess',
  MANAGE = 'Invoices.Manage',
}

export enum BadgesPermission {
  CREATE = 'Badges.Create',
  UPDATE = 'Badges.Update',
  VIEW = 'Badges.View',
  LIST = 'Badges.List',
  DELETE = 'Badges.Delete',
  HISTORY = 'Badges.History',
  ACTIVATE = 'Badges.Activate',
  DEACTIVATE = 'Badges.Deactivate',
  STATISTICS = 'Badges.Statistics',
  VIEWACCESS = 'Badges.ViewAccess',
  MANAGE = 'Badges.Manage',
  REVOKE = 'Badges.Revoke',
}

export enum VisitorsPermission {
  CREATE = 'Visitors.Create',
  UPDATE = 'Visitors.Update',
  VIEW = 'Visitors.View',
  LIST = 'Visitors.List',
  DELETE = 'Visitors.Delete',
  LISTACTIVITIES = 'Visitors.ListActivities',
  VIEWACCESS = 'Visitors.ViewAccess',
  MANAGE = 'Visitors.Manage',
}

export enum AccessControlSystemsPermission {
  ASSIGNTOPROJECT = 'AccessControlSystems.AssignToProject',
  CREATE = 'AccessControlSystems.Create',
  UPDATE = 'AccessControlSystems.Update',
  VIEW = 'AccessControlSystems.View',
  LIST = 'AccessControlSystems.List',
  DELETE = 'AccessControlSystems.Delete',
  SETUP = 'AccessControlSystems.Setup',
  LISTLOCATIONS = 'AccessControlSystems.ListLocations',
  SUMMARY = 'AccessControlSystems.Summary',
  UNASSIGNFROMPROJECT = 'AccessControlSystems.UnassignFromProject',
  VIEWACCESS = 'AccessControlSystems.ViewAccess',
  MANAGE = 'AccessControlSystems.Manage',
}

export enum BadgePrintingSystemsPermission {
  CREATE = 'BadgePrintingSystems.Create',
  ASSIGNTOPROJECT = 'BadgePrintingSystems.AssignToProject',
  UNASSIGNFROMPROJECT = 'BadgePrintingSystems.UnassignFromProject',
  UPDATE = 'BadgePrintingSystems.Update',
  VIEW = 'BadgePrintingSystems.View',
  LIST = 'BadgePrintingSystems.List',
  DELETE = 'BadgePrintingSystems.Delete',
  VIEWACCESS = 'BadgePrintingSystems.ViewAccess',
  MANAGE = 'BadgePrintingSystems.Manage',
}

export enum AdminPermission {
  GENERAL = 'Admin.General',
}

export enum AppAccessPermission {
  JOBSITE = 'AppAccess.JobSite',
  TABLETEXPERIENCE = 'AppAccess.TabletExperience',
  WEB = 'AppAccess.Web',
  WORKER = 'AppAccess.Worker',
}

export enum DraftClientsPermission {
  CREATE = 'DraftClients.Create',
  UPDATE = 'DraftClients.Update',
  VIEW = 'DraftClients.View',
  LIST = 'DraftClients.List',
  INVITE = 'DraftClients.Invite',
  SENDFORAPPROVAL = 'DraftClients.SendForApproval',
  APPROVE = 'DraftClients.Approve',
  DELETE = 'DraftClients.Delete',
  VIEWACCESS = 'DraftClients.ViewAccess',
  MANAGE = 'DraftClients.Manage',
}

export enum ClientsPermission {
  UPDATE = 'Clients.Update',
  VIEW = 'Clients.View',
  SUMMARY = 'Clients.Summary',
  LIST = 'Clients.List',
  ARCHIVE = 'Clients.Archive',
  UNARCHIVE = 'Clients.Unarchive',
  LISTPROJECTS = 'Clients.ListProjects',
  STATISTICS = 'Clients.Statistics',
  VIEWACCESS = 'Clients.ViewAccess',
  MANAGE = 'Clients.Manage',
}

export enum ClientProjectsPermission {
  UPDATETAXEXEMPTIONSTATUS = 'ClientProjects.UpdateTaxExemptionStatus',
  VIEW = 'ClientProjects.View',
  SUMMARY = 'ClientProjects.Summary',
  LIST = 'ClientProjects.List',
  STATISTICS = 'ClientProjects.Statistics',
  VIEWACCESS = 'ClientProjects.ViewAccess',
  MANAGE = 'ClientProjects.Manage',
}

export enum DraftProjectsPermission {
  CREATE = 'DraftProjects.Create',
  UPDATE = 'DraftProjects.Update',
  VIEW = 'DraftProjects.View',
  LIST = 'DraftProjects.List',
  INVITE = 'DraftProjects.Invite',
  SENDFORAPPROVAL = 'DraftProjects.SendForApproval',
  APPROVE = 'DraftProjects.Approve',
  DELETE = 'DraftProjects.Delete',
  VIEWACCESS = 'DraftProjects.ViewAccess',
  MANAGE = 'DraftProjects.Manage',
}

export enum ProjectsPermission {
  UPDATE = 'Projects.Update',
  VIEW = 'Projects.View',
  SUMMARY = 'Projects.Summary',
  LIST = 'Projects.List',
  ARCHIVE = 'Projects.Archive',
  UNARCHIVE = 'Projects.Unarchive',
  ACCEPTSERVICEAGREEMENT = 'Projects.AcceptServiceAgreement',
  ADDTOCOMPANY = 'Projects.AddToCompany',
  LISTCOMPANIES = 'Projects.ListCompanies',
  LISTBADGES = 'Projects.ListBadges',
  LISTCERTIFICATIONS = 'Projects.ListCertifications',
  LISTTRAININGS = 'Projects.ListTrainings',
  LISTOBSERVATIONS = 'Projects.ListObservations',
  CHANGEPAYMENTMETHOD = 'Projects.ChangePaymentMethod',
  STATISTICS = 'Projects.Statistics',
  VIEWACCESS = 'Projects.ViewAccess',
  MANAGE = 'Projects.Manage',
}

export enum WorkersPermission {
  CREATE = 'Workers.Create',
  UPDATE = 'Workers.Update',
  VIEW = 'Workers.View',
  LIST = 'Workers.List',
  DELETE = 'Workers.Delete',
  ADDTOCOMPANY = 'Workers.AddToCompany',
  REMOVEFROMCOMPANY = 'Workers.RemoveFromCompany',
  ASSIGNTOPROJECT = 'Workers.AssignToProject',
  UNASSIGNFROMPROJECT = 'Workers.UnassignFromProject',
  STATISTICS = 'Workers.Statistics',
  VIEWACCESS = 'Workers.ViewAccess',
  MANAGE = 'Workers.Manage',
}

export enum UsersPermission {
  CREATE = 'Users.Create',
  UPDATE = 'Users.Update',
  VIEW = 'Users.View',
  LIST = 'Users.List',
  DELETE = 'Users.Delete',
  ADDTOCOMPANY = 'Users.AddToCompany',
  REMOVEFROMCOMPANY = 'Users.RemoveFromCompany',
  ASSIGNTOPROJECT = 'Users.AssignToProject',
  UNASSIGNFROMPROJECT = 'Users.UnassignFromProject',
  LISTPROJECTS = 'Users.ListProjects',
  VIEWACCESS = 'Users.ViewAccess',
  MANAGE = 'Users.Manage',
}

export enum ProcoreIntegrationsPermission {
  CONNECT = 'ProcoreIntegrations.Connect',
  DISCONNECT = 'ProcoreIntegrations.Disconnect',
  VIEW = 'ProcoreIntegrations.View',
  LISTVENDORS = 'ProcoreIntegrations.ListVendors',
  LISTPROJECTS = 'ProcoreIntegrations.ListProjects',
  LISTCOMPANIES = 'ProcoreIntegrations.ListCompanies',
  UPDATEPROJECTMAPPINGS = 'ProcoreIntegrations.UpdateProjectMappings',
  UPDATEVENDORMAPPINGS = 'ProcoreIntegrations.UpdateVendorMappings',
  VIEWACCESS = 'ProcoreIntegrations.ViewAccess',
  MANAGE = 'ProcoreIntegrations.Manage',
}

export enum WorkerCertificationsPermission {
  UPDATE = 'WorkerCertifications.Update',
  VIEW = 'WorkerCertifications.View',
  LIST = 'WorkerCertifications.List',
  CREATE = 'WorkerCertifications.Create',
  DELETE = 'WorkerCertifications.Delete',
  VIEWACCESS = 'WorkerCertifications.ViewAccess',
  MANAGE = 'WorkerCertifications.Manage',
}

export enum WorkerTrainingsPermission {
  CREATE = 'WorkerTrainings.Create',
  UPDATE = 'WorkerTrainings.Update',
  VIEW = 'WorkerTrainings.View',
  LIST = 'WorkerTrainings.List',
  DELETE = 'WorkerTrainings.Delete',
  ACCEPT = 'WorkerTrainings.Accept',
  VIEWACCESS = 'WorkerTrainings.ViewAccess',
  MANAGE = 'WorkerTrainings.Manage',
}

export enum WorkerObservationsPermission {
  CREATE = 'WorkerObservations.Create',
  UPDATE = 'WorkerObservations.Update',
  VIEW = 'WorkerObservations.View',
  LIST = 'WorkerObservations.List',
  DELETE = 'WorkerObservations.Delete',
  VIEWACCESS = 'WorkerObservations.ViewAccess',
  MANAGE = 'WorkerObservations.Manage',
}

export enum InventoryPermission {
  STATISTICS = 'Inventory.Statistics',
}

export enum WorkforceMonitoringPermission {
  STATISTICS = 'WorkforceMonitoring.Statistics',
}

export enum PermissionsPermission {
  CREATE = 'Permissions.Create',
  DELETE = 'Permissions.Delete',
  LIST = 'Permissions.List',
  UPDATE = 'Permissions.Update',
  VIEW = 'Permissions.View',
}

export enum GroupsPermission {
  ADDCOMPANYUSER = 'Groups.AddCompanyUser',
  CREATE = 'Groups.Create',
  DELETE = 'Groups.Delete',
  LIST = 'Groups.List',
  REMOVECOMPANYUSER = 'Groups.RemoveCompanyUser',
  UPDATE = 'Groups.Update',
  VIEW = 'Groups.View',
}

export enum GroupPermissionsPermission {
  CREATE = 'GroupPermissions.Create',
  DELETE = 'GroupPermissions.Delete',
  LIST = 'GroupPermissions.List',
  VIEW = 'GroupPermissions.View',
}

export enum GroupCompanyUsersPermission {
  LIST = 'GroupCompanyUsers.List',
  VIEW = 'GroupCompanyUsers.View',
}

export enum GroupLabelsPermission {
  CREATE = 'GroupLabels.Create',
  DELETE = 'GroupLabels.Delete',
  LIST = 'GroupLabels.List',
  VIEW = 'GroupLabels.View',
}

export enum LabelsPermission {
  CREATE = 'Labels.Create',
  DELETE = 'Labels.Delete',
  LIST = 'Labels.List',
  UPDATE = 'Labels.Update',
  VIEW = 'Labels.View',
}

export enum LabelCategoriesPermission {
  CREATE = 'LabelCategories.Create',
  DELETE = 'LabelCategories.Delete',
  LIST = 'LabelCategories.List',
  UPDATE = 'LabelCategories.Update',
  VIEW = 'LabelCategories.View',
}

export enum PermissionTemplatesPermission {
  CREATE = 'PermissionTemplates.Create',
  DELETE = 'PermissionTemplates.Delete',
  LIST = 'PermissionTemplates.List',
  UPDATE = 'PermissionTemplates.Update',
  VIEW = 'PermissionTemplates.View',
}

export enum PermissionTemplatePermissionsPermission {
  CREATE = 'PermissionTemplatePermissions.Create',
  DELETE = 'PermissionTemplatePermissions.Delete',
  LIST = 'PermissionTemplatePermissions.List',
  VIEW = 'PermissionTemplatePermissions.View',
}

export enum ScopesPermission {
  CREATE = 'Scopes.Create',
  DELETE = 'Scopes.Delete',
  LIST = 'Scopes.List',
  UPDATE = 'Scopes.Update',
  VIEW = 'Scopes.View',
}

export enum StatisticsPermission {
  Badges = 'Statistics.Badges',
  ClientProjects = 'Statistics.ClientProjects',
  Clients = 'Statistics.Clients',
  Inventory = 'Statistics.Inventory',
  Projects = 'Statistics.Projects',
  Workers = 'Statistics.Workers',
}

export enum ScopePermissionsPermission {
  CREATE = 'ScopePermissions.Create',
  DELETE = 'ScopePermissions.Delete',
  LIST = 'ScopePermissions.List',
  VIEW = 'ScopePermissions.View',
}

export enum CompanyUserPermissionsPermission {
  CREATE = 'CompanyUserPermissions.Create',
  DELETE = 'CompanyUserPermissions.Delete',
  LIST = 'CompanyUserPermissions.List',
  VIEW = 'CompanyUserPermissions.View',
}

export enum UserFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  TITLE = 'title',
  MOBILE_PHONE_NUMBER = 'mobilePhoneNumber',
  OFFICE_PHONE_NUMBER = 'officePhoneNumber',
  OFFICE_PHONE_EXTERNAL = 'officePhoneExtension',
  PREFERRED_CONTACT_METHOD = 'preferredContactMethod',
  INVITATION_TYPE = 'invitationType',
  GROUP_IDS = 'groupIds',
}

export type Permission =
  | PaymentMethodsPermission
  | InvoicesPermission
  | BadgesPermission
  | VisitorsPermission
  | AccessControlSystemsPermission
  | BadgePrintingSystemsPermission
  | AdminPermission
  | AppAccessPermission
  | DraftClientsPermission
  | ClientsPermission
  | ClientProjectsPermission
  | DraftProjectsPermission
  | ProjectsPermission
  | WorkersPermission
  | UsersPermission
  | ProcoreIntegrationsPermission
  | WorkerCertificationsPermission
  | WorkerTrainingsPermission
  | WorkerObservationsPermission
  | InventoryPermission
  | WorkforceMonitoringPermission
  | PermissionsPermission
  | GroupsPermission
  | GroupPermissionsPermission
  | GroupCompanyUsersPermission
  | GroupLabelsPermission
  | LabelsPermission
  | LabelCategoriesPermission
  | PermissionTemplatesPermission
  | PermissionTemplatePermissionsPermission
  | ScopesPermission
  | StatisticsPermission
  | ScopePermissionsPermission
  | CompanyUserPermissionsPermission;

export interface IPermission {
  id: string;
  name: Permission;
  source: string;
  additional: {
    entityId: string;
  };
}

export interface IUser {
  id?: string;
  [UserFields.FIRST_NAME]: string;
  [UserFields.LAST_NAME]: string;
  [UserFields.EMAIL]: string;
  [UserFields.TITLE]: string;
  [UserFields.MOBILE_PHONE_NUMBER]: string;
  [UserFields.OFFICE_PHONE_NUMBER]: string;
  [UserFields.OFFICE_PHONE_EXTERNAL]: string;
  [UserFields.PREFERRED_CONTACT_METHOD]: number;
  [UserFields.INVITATION_TYPE]: InviteType;
  companyId: string;
  company?: {
    id: string;
    name: string;
  };
  invitationStatus?: InvitationStatus;
  roleName?: string;
  groupIds?: string[];
  permissions?: IPermission[];
  oldGroupIds?: string[];
}

export interface IUserProject extends IUser {}

export interface IAccount {
  firstName: string;
  lastName: string;
  pictureUrl?: string;
  email?: string;
  mobilePhoneNumber?: string;
  officePhoneNumber?: string;
  officePhoneExtension?: string;
  preferredContactMethod?: PreferredContactMethod;
}

export interface IProcoreClientSecrets {
  clientID: string;
  clientSecret: string;
}

export const getFallbackUser = (): IUser => ({
  id: undefined,
  firstName: null,
  lastName: null,
  title: null,
  mobilePhoneNumber: null,
  officePhoneNumber: null,
  officePhoneExtension: null,
  email: null,
  preferredContactMethod: PreferredContactMethod.EMAIL,
  invitationType: InviteType.DO_NOT_INVITE,
  companyId: null,
  groupIds: [],
  oldGroupIds: [],
});

export const userInviteMap = {
  [InviteType.DO_NOT_INVITE]: 'Do not invite',
  [InviteType.CLIENT_ADMIN]: 'Client Admin',
  [InviteType.REGULAR_USER]: 'Regular User',
  [InviteType.ON_SITE_REPRESENTATIVE]: 'On Site Representative',
};

export const userInviteList = [
  {
    label: userInviteMap[InviteType.DO_NOT_INVITE],
    value: InviteType.DO_NOT_INVITE,
  },
  // {
  //   label: userInviteMap[InviteType.CLIENT_ADMIN],
  //   value: InviteType.CLIENT_ADMIN,
  // },
  // {
  //   label: userInviteMap[InviteType.REGULAR_USER],
  //   value: InviteType.REGULAR_USER,
  // },
  // {
  //   label: userInviteMap[InviteType.ON_SITE_REPRESENTATIVE],
  //   value: InviteType.ON_SITE_REPRESENTATIVE,
  // },
];

export const hasAccess = (permissionsList, usersPermission) => {
  const permissions = (usersPermission || []).map(permission => permission.name);
  return intersection(permissionsList, permissions).length === permissionsList.length;
};

export const hasValidPermissions = (permissionsExpression, currentUserPermissions) => {
  let shouldRenderChildren = true;
  const permissions = (currentUserPermissions || []).map(permission => permission.name);
  if (permissionsExpression) {
    shouldRenderChildren = LEP.parse(permissionsExpression, permission => permissions.includes(permission));
  }
  return shouldRenderChildren;
};
