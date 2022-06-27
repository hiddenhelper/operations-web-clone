import { Role } from './user';
import { IStepMap, INamedEntity } from './general';
import { Status } from './resource';
import { IAddress, ILocation, addressFieldRules, getFallbackAddress } from './address';
import { ICertificationGroup } from './certification';
import { ITrainingGroup } from './training';
import { IBadgeTemplate, getFallbackBadgeTemplate, getFallbackVisitorBadgeTemplate, BadgeStatus, BadgeType } from './badge';

import { formatNumberWithCommas } from '../../utils/generalUtils';
import { IConsentForm, IConsentFormFieldConfig, IConsentFormLegal } from './consentForm';
import { IS3FileResponse } from './file';
import { PaymentModel } from './index';

export enum ProjectFields {
  NAME = 'name',
  DESCRIPTION = 'description',
  CATEGORY_ID = 'categoryId',
  COMMERCIAL_CONSTRUCTION_VALUE = 'ccv',
  FC_REGION = 'regionId',
  FC_NAE = 'naeId',
  TIME_ZONE = 'timeZoneId',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  PLANNED_MONTHS = 'plannedMonths',
  BILLING_MODEL_TYPE = 'billingModelType',
  BADGES_MODEL = 'badgeBillingModel',
  SEATS_MODEL = 'seatBillingModel',
  BADGING_MATCHES_JOB_SITE = 'badgingSiteAddressMatchesJobSiteAddress',
  BADGING_ADDRESS = 'badgingSiteAddress',
  JOB_SITE_ADDRESS = 'jobSiteAddress',
  JOB_SITE_LOCATIONS = 'locations',
  MAILING_ADDRESS_MATCHING_TYPE = 'mailingAddressMatchingType',
  MAILING_ADDRESS = 'mailingAddress',
  CERTIFICATION_GROUPS = 'certificationGroups',
  TRAINING_GROUPS = 'trainingGroups',
  RELATED_COMPANIES = 'relatedCompanies',
  CONSENT_FORM_FIELDS = 'consentFormFields',
  CONSENT_FORM_LEGALS = 'consentFormLegals',
  MUST_COMPLY_WITH_NYC_LL_196 = 'mustComplyWithNycLL196',
  PERMIT_HOLDER = 'permitHolder',
  PERMIT_NUMBER = 'permitNumber',
  LICENCE_NUMBER = 'licenseNumber',
}

export enum BadgesModelFields {
  BADGE_PRICE = 'badgePrice',
  BADGE_REPRINTING_COST = 'reprintingCost',
  CLIENT_PAYS = 'isBilledPerCompany',
  BILLED_COMPANY = 'billedCompany',
  BILLED_COMPANY_ID = 'billedCompanyId',
  VISITOR_BADGE_PRICE = 'visitorBadgePrice',
  VISITOR_REPRINTING_COST = 'visitorReprintingCost',
}

export enum SeatsModelFields {
  WORKERS_NUMBER = 'estimatedWorkersNumber',
  IS_FIXED_SEAT_PRICE = 'isFixedSeatPrice',
  SEAT_PRICE = 'seatPrice',
  BILLING_TIER = 'billingTier',
  BILLING_TIER_ID = 'billingTierId',
  BILLED_COMPANY = 'billedCompany',
  BILLED_COMPANY_ID = 'billedCompanyId',
  REPRINTING_COST = 'reprintingCost',
  VISITOR_BADGE_PRICE = 'visitorBadgePrice',
  VISITOR_REPRINTING_COST = 'visitorReprintingCost',
}

export interface IBillingTier {
  id: string;
  top: number;
  bottom: number;
  price: number;
}

export enum CompanyRole {
  DEVELOPER = 0,
  GENERAL_CONTRACTOR = 1,
  SUB_CONTRACTOR = 2,
  DEVELOPER_PROJECT_OWNER = 3,
}

export enum CompanyStatus {
  DRAFT = 0,
  PENDING_APPROVAL = 1,
  ACTIVE = 2,
  ARCHIVED = 3,
}

export enum MailingAddressMatchingType {
  NONE = 0,
  JOB_SITE_ADDRESS = 1,
  BADGING_SITE_ADDRESS = 2,
}

export enum SourceType {
  SYSTEM = 1,
  MIGRATION = 2,
}

export interface IProjectAssignUser {
  id: string;
  roleId: string;
}

export interface IProjectCompany {
  id: string;
  role?: CompanyRole;
  name: string;
  status?: CompanyStatus;
  tempId?: string;
  isTaxExempt?: boolean;
}

export interface IVisitorModel {
  [BadgesModelFields.VISITOR_BADGE_PRICE]?: number;
  [BadgesModelFields.VISITOR_REPRINTING_COST]?: number;
}

export interface IBadgesModel extends IVisitorModel {
  [BadgesModelFields.BADGE_PRICE]: number;
  [BadgesModelFields.CLIENT_PAYS]: boolean;
  [BadgesModelFields.BADGE_REPRINTING_COST]: number;
  [BadgesModelFields.BILLED_COMPANY]?: IProjectCompany;
  [BadgesModelFields.BILLED_COMPANY_ID]?: string;
}

export interface ISeatsModel extends IVisitorModel {
  [SeatsModelFields.WORKERS_NUMBER]: number;
  [SeatsModelFields.IS_FIXED_SEAT_PRICE]: boolean;
  [SeatsModelFields.SEAT_PRICE]: number;
  [SeatsModelFields.BILLING_TIER]?: IBillingTier;
  [SeatsModelFields.BILLING_TIER_ID]?: string;
  [SeatsModelFields.BILLED_COMPANY]?: IProjectCompany;
  [SeatsModelFields.BILLED_COMPANY_ID]?: string;
  [SeatsModelFields.REPRINTING_COST]: number;
}

interface IAcsIdByLocation {
  location?: ILocation;
  accessControlSystems: string[];
}

export enum BillingModelType {
  BADGES = 0,
  SEATS = 1,
}

export enum CompanyProjectStatus {
  PENDING = 0,
  ACCEPTED = 1,
  REJECTED = 2,
}

export enum WorkerProjectStatus {
  PENDING = 0,
  ACCEPTED = 1,
  FINISHED = 2,
}

export interface IProject {
  id: string;
  [ProjectFields.NAME]: string;
  [ProjectFields.DESCRIPTION]: string;
  [ProjectFields.CATEGORY_ID]: string;
  [ProjectFields.COMMERCIAL_CONSTRUCTION_VALUE]: number;
  [ProjectFields.FC_REGION]: string;
  [ProjectFields.FC_NAE]: string;
  [ProjectFields.START_DATE]: string;
  [ProjectFields.END_DATE]: string;
  [ProjectFields.PLANNED_MONTHS]: string;
  [ProjectFields.JOB_SITE_ADDRESS]: IAddress;
  [ProjectFields.JOB_SITE_LOCATIONS]: ILocation[];
  [ProjectFields.BADGING_MATCHES_JOB_SITE]: boolean;
  [ProjectFields.BADGING_ADDRESS]: IAddress;
  [ProjectFields.MAILING_ADDRESS_MATCHING_TYPE]: MailingAddressMatchingType;
  [ProjectFields.MAILING_ADDRESS]: IAddress;
  [ProjectFields.BILLING_MODEL_TYPE]: number;
  [ProjectFields.BADGES_MODEL]: IBadgesModel;
  [ProjectFields.SEATS_MODEL]: ISeatsModel;
  [ProjectFields.CERTIFICATION_GROUPS]: ICertificationGroup[];
  [ProjectFields.TRAINING_GROUPS]: ITrainingGroup[];
  [ProjectFields.CONSENT_FORM_FIELDS]: IConsentFormFieldConfig[];
  [ProjectFields.CONSENT_FORM_LEGALS]: IConsentFormLegal[];
  [ProjectFields.TIME_ZONE]?: string;
  [ProjectFields.MUST_COMPLY_WITH_NYC_LL_196]?: number;
  [ProjectFields.PERMIT_HOLDER]?: string;
  [ProjectFields.PERMIT_NUMBER]?: string;
  [ProjectFields.LICENCE_NUMBER]?: string;
  status: Status;
  setupNotes?: string;
  companyProjectStatus?: CompanyProjectStatus;
  [ProjectFields.RELATED_COMPANIES]?: IProjectCompany[];
  category?: INamedEntity;
  region?: INamedEntity;
  nae?: INamedEntity;
  clientCount?: number;
  assignedCompaniesCount?: number;
  acsIdListByLocation?: IAcsIdByLocation[];
  bpsIdList?: string[];
  generalContractorBadgeTemplate?: IBadgeTemplate;
  subcontractorBadgeTemplate?: IBadgeTemplate;
  visitorBadgeTemplate?: IBadgeTemplate;
  subcontractorBadgeTemplateMatchesGeneralContractor?: boolean;
  companyHasCreditCard?: boolean;
  timeZone?: INamedEntity;
  paymentMethod?: PaymentModel.IPaymentMethod;
  generalContractors?: INamedEntity[];
}

export enum ProjectStep {
  GENERAL_INFORMATION = 'general-information',
  ASSIGN_CLIENTS = 'assign-client',
  BILLING_MODEL = 'billing-model',
  ADDRESSES = 'addresses',
  CERTIFICATIONS_TRAININGS = 'certifications-and-trainings',
  BADGE_TEMPLATES = 'badge-templates',
  WORKER_CONSENT_FORM = 'worker-consent-form',
  REVIEW = 'review',
}

export interface IAssignClientProject {
  id: string;
  role: CompanyRole;
}

export interface IWorkerProject {
  id?: string;
  project: INamedEntity;
  jobSiteAddress?: IAddress;
  badgeStatus?: BadgeStatus;
  badgeType?: BadgeType;
  consentForm: IConsentForm;
  category: INamedEntity;
  company: INamedEntity;
  endDate: string;
  startDate: string;
  trades: INamedEntity[];
  workerProjectStatus: WorkerProjectStatus;
  badgeId?: string;
  scannedFileUrl: string;
  sourceType: SourceType;
}

export interface IClientTaxCondition {
  companyId: string;
  isTaxExempt: boolean;
}

export enum ProjectBadgeLogos {
  GENERAL_CONTRACTOR_BADGE_LOGO = 'generalContractorBadgeLogo',
  SUBCONTRACTOR_BADGE_LOGO = 'subContractorBadgeLogo',
  VISITOR_BADGE_LOGO = 'visitorBadgeLogo',
}

export const projectBadgeKeys = [
  ProjectBadgeLogos.GENERAL_CONTRACTOR_BADGE_LOGO,
  ProjectBadgeLogos.SUBCONTRACTOR_BADGE_LOGO,
  ProjectBadgeLogos.VISITOR_BADGE_LOGO,
];

export interface IProjectBadgeFiles {
  generalContractorFileName?: string;
  subContractorFileName?: string;
  visitorFileName?: string;
}

export interface IProjectBadgeFilesResource {
  generalContractorBadgeTemplateLogo?: IS3FileResponse;
  subcontractorBadgeTemplateLogo?: IS3FileResponse;
  visitorBadgeTemplateLogo?: IS3FileResponse;
}

export const projectBadgeResponseMap = {
  generalContractorBadgeTemplateLogo: ProjectBadgeLogos.GENERAL_CONTRACTOR_BADGE_LOGO,
  subcontractorBadgeTemplateLogo: ProjectBadgeLogos.SUBCONTRACTOR_BADGE_LOGO,
  visitorBadgeTemplateLogo: ProjectBadgeLogos.VISITOR_BADGE_LOGO,
};

export const workerProjectStatus = {
  [WorkerProjectStatus.PENDING]: 'Pending',
  [WorkerProjectStatus.ACCEPTED]: 'Accepted',
  [WorkerProjectStatus.FINISHED]: 'Finished',
};

export const workerProjectStatusList = [
  { value: '', label: 'All Status in Project' },
  { value: WorkerProjectStatus.PENDING, label: workerProjectStatus[WorkerProjectStatus.PENDING] },
  { value: WorkerProjectStatus.ACCEPTED, label: workerProjectStatus[WorkerProjectStatus.ACCEPTED] },
];

export const billingModelTypeMap = {
  [BillingModelType.BADGES]: 'badgeBillingModel',
  [BillingModelType.SEATS]: 'seatBillingModel',
};

export const projectStepMap: IStepMap = {
  [ProjectStep.GENERAL_INFORMATION]: {
    key: ProjectStep.GENERAL_INFORMATION,
    title: 'General Information',
    subtitle: 'Create New Project',
    hideControls: false,
    order: 0,
    fields: [
      { name: ProjectFields.NAME, required: true },
      { name: ProjectFields.DESCRIPTION, required: false },
      { name: ProjectFields.CATEGORY_ID, required: true },
      { name: ProjectFields.COMMERCIAL_CONSTRUCTION_VALUE, required: true },
      { name: ProjectFields.FC_REGION, required: true },
      { name: ProjectFields.FC_NAE, required: true },
      { name: ProjectFields.START_DATE, required: true },
      { name: ProjectFields.END_DATE, required: true },
      { name: ProjectFields.TIME_ZONE, required: true },
      { name: ProjectFields.MUST_COMPLY_WITH_NYC_LL_196, required: false },
      { name: ProjectFields.PERMIT_HOLDER, required: false },
      { name: ProjectFields.PERMIT_NUMBER, required: false },
      { name: ProjectFields.LICENCE_NUMBER, required: false },
    ],
  },
  [ProjectStep.ASSIGN_CLIENTS]: {
    key: ProjectStep.ASSIGN_CLIENTS,
    title: 'Clients',
    subtitle: '',
    hideControls: false,
    order: 1,
    fields: [
      {
        name: ProjectFields.RELATED_COMPANIES,
        required: true,
        fields: [{ name: 'id', required: true }],
        requiredFunc: ({ accumulator, value, field }) => {
          const hasDeveloperProjectOwner = !!value?.find(company => company.role === CompanyRole.DEVELOPER_PROJECT_OWNER);
          const hasGeneralContractor = !!value?.find(company => company.role === CompanyRole.GENERAL_CONTRACTOR);
          const multipleBy = value?.length > 1 ? value.length : 1;
          const additionalRequired = !hasDeveloperProjectOwner || !hasGeneralContractor ? 1 : 0;
          return accumulator + field.fields.filter(ff => ff.required).length * multipleBy + additionalRequired;
        },
        completedFunc: ({ value = [] }) => {
          return value.filter(company => company.status === CompanyStatus.ACTIVE).length;
        },
      },
    ],
  },
  [ProjectStep.BILLING_MODEL]: {
    key: ProjectStep.BILLING_MODEL,
    title: 'Billing Model',
    subtitle: '',
    hideControls: false,
    order: 2,
    fields: [
      { name: ProjectFields.BILLING_MODEL_TYPE, required: true, computePositive: true },
      {
        name: ProjectFields.BADGES_MODEL,
        required: true,
        fields: [
          { name: BadgesModelFields.BADGE_PRICE, required: true },
          { name: BadgesModelFields.CLIENT_PAYS, required: true, computePositive: true },
          { name: BadgesModelFields.BADGE_REPRINTING_COST, required: true },
          { name: BadgesModelFields.BILLED_COMPANY_ID, required: false },
        ],
      },
      {
        name: ProjectFields.SEATS_MODEL,
        required: false,
        fields: [
          { name: SeatsModelFields.WORKERS_NUMBER, required: false },
          { name: SeatsModelFields.IS_FIXED_SEAT_PRICE, required: false },
          { name: SeatsModelFields.SEAT_PRICE, required: false },
          { name: SeatsModelFields.BILLING_TIER, required: false },
          { name: SeatsModelFields.BILLED_COMPANY, required: false },
          { name: SeatsModelFields.REPRINTING_COST, required: false },
        ],
      },
    ],
  },
  [ProjectStep.ADDRESSES]: {
    key: ProjectStep.ADDRESSES,
    title: 'Addresses and Locations',
    subtitle: '',
    hideControls: false,
    order: 3,
    fields: [
      { name: ProjectFields.BADGING_MATCHES_JOB_SITE, required: false },
      { name: ProjectFields.MAILING_ADDRESS_MATCHING_TYPE, required: false },
      {
        name: ProjectFields.JOB_SITE_ADDRESS,
        required: true,
        fields: addressFieldRules.required,
      },
      {
        name: ProjectFields.JOB_SITE_LOCATIONS,
        required: true,
        fields: [{ name: 'name', required: true }],
      },
      {
        name: ProjectFields.BADGING_ADDRESS,
        required: false,
        fields: addressFieldRules.notRequired,
      },
      {
        name: ProjectFields.MAILING_ADDRESS,
        required: true,
        fields: addressFieldRules.notRequired,
      },
    ],
  },
  [ProjectStep.CERTIFICATIONS_TRAININGS]: {
    key: ProjectStep.CERTIFICATIONS_TRAININGS,
    title: 'Certifications and Trainings',
    subtitle: '',
    hideControls: false,
    order: 4,
    fields: [
      { name: ProjectFields.CERTIFICATION_GROUPS, required: false },
      { name: ProjectFields.TRAINING_GROUPS, required: false },
    ],
  },
  [ProjectStep.BADGE_TEMPLATES]: {
    key: ProjectStep.BADGE_TEMPLATES,
    title: 'Badge Templates',
    subtitle: '',
    order: 5,
    hideControls: false,
    fields: [],
  },
  [ProjectStep.WORKER_CONSENT_FORM]: {
    key: ProjectStep.WORKER_CONSENT_FORM,
    title: 'Worker Consent Form',
    subtitle: '',
    order: 6,
    hideControls: false,
    fields: [
      { name: ProjectFields.CONSENT_FORM_FIELDS, required: false },
      {
        name: ProjectFields.CONSENT_FORM_LEGALS,
        required: true,
        fields: [
          { name: 'body', required: true },
          { name: 'name', required: true },
        ],
      },
    ],
  },
  [ProjectStep.REVIEW]: {
    key: ProjectStep.REVIEW,
    title: 'Review',
    subtitle: '',
    order: 7,
    hideControls: true,
    fields: [],
  },
};

export const roleMap = {
  [CompanyRole.DEVELOPER]: 'Developer',
  [CompanyRole.GENERAL_CONTRACTOR]: 'General Contractor',
  [CompanyRole.SUB_CONTRACTOR]: 'Subcontractor',
  [CompanyRole.DEVELOPER_PROJECT_OWNER]: 'Project Owner',
};

export const roleListOptions = [
  { value: '', label: 'All Roles' },
  { value: CompanyRole.DEVELOPER, label: roleMap[CompanyRole.DEVELOPER] },
  { value: CompanyRole.GENERAL_CONTRACTOR, label: roleMap[CompanyRole.GENERAL_CONTRACTOR] },
  { value: CompanyRole.SUB_CONTRACTOR, label: roleMap[CompanyRole.SUB_CONTRACTOR] },
  { value: CompanyRole.DEVELOPER_PROJECT_OWNER, label: roleMap[CompanyRole.DEVELOPER_PROJECT_OWNER] },
];

export const roleAcronymMap = {
  [CompanyRole.DEVELOPER]: 'DEV',
  [CompanyRole.GENERAL_CONTRACTOR]: 'GC',
  [CompanyRole.SUB_CONTRACTOR]: 'SUB',
  [CompanyRole.DEVELOPER_PROJECT_OWNER]: 'PO',
};

export enum DetailTabType {
  CLIENTS = 'clients',
  COMPANIES = 'companies',
  USERS = 'users',
  WORKERS = 'workers',
  VISITORS = 'visitors',
  ACS = 'acs',
  BPS = 'bps',
  INVOICES = 'invoices',
  INFORMATION = 'information',
}

export const tabMap: { [key: string]: { id: string; key: string; title: string; roleList: Role[] } } = {
  [DetailTabType.CLIENTS]: {
    id: 'clients',
    key: 'clients',
    title: 'Clients',
    roleList: [Role.FCA_ADMIN],
  },
  [DetailTabType.COMPANIES]: {
    id: 'companies',
    key: 'companies',
    title: 'Companies',
    roleList: [Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [DetailTabType.USERS]: {
    id: 'users',
    key: 'users',
    title: 'Users',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [DetailTabType.WORKERS]: {
    id: 'workers',
    key: 'workers',
    title: 'Workers',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [DetailTabType.VISITORS]: {
    id: 'visitors',
    key: 'visitors',
    title: 'Visitors',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [DetailTabType.ACS]: {
    id: 'acs',
    key: 'acs',
    title: 'ACS',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [DetailTabType.BPS]: {
    id: 'bps',
    key: 'bps',
    title: 'BPS',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [DetailTabType.INVOICES]: {
    id: 'invoices',
    key: 'invoices',
    title: 'Invoices',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
  [DetailTabType.INFORMATION]: {
    id: 'information',
    key: 'information',
    title: 'Information',
    roleList: [Role.FCA_ADMIN, Role.CLIENT_ADMIN, Role.REGULAR_USER],
  },
};

export const widgetMap = {
  [Role.FCA_ADMIN]: {
    First: {
      status: 'Draft',
      content: 'Review',
      total: (value: number) => value,
    },
    Second: {
      status: 'Pending Approval',
      content: 'Review',
      total: (value: number) => value,
    },
    Third: {
      status: 'Active',
      content: 'Review',
      total: (value: number) => value,
    },
  },
  [Role.CLIENT_ADMIN]: {
    First: {
      status: 'Pending Invitation',
      content: '',
      total: (value: number) => value,
    },
    Second: {
      status: 'Active',
      content: '',
      total: (value: number) => value,
    },
    Third: {
      status: 'Invoices',
      content: '',
      total: (value: number) => `$ ${formatNumberWithCommas(value)}`,
    },
  },
  [Role.REGULAR_USER]: {
    First: {
      status: 'Pending Invitation',
      content: '',
      total: (value: number) => value,
    },
    Second: {
      status: 'Active',
      content: '',
      total: (value: number) => value,
    },
    Third: {
      status: 'Invoices',
      content: '',
      total: (value: number) => `$ ${formatNumberWithCommas(value)}`,
    },
  },
};

export const getFallbackRelatedCompany = (tempId: string = null, role = CompanyRole.DEVELOPER): IProjectCompany => ({
  id: null,
  role,
  name: '',
  status: null,
  tempId,
  isTaxExempt: false,
});

export const getFallbackBadgeBillingModel = () => ({
  badgePrice: null,
  isBilledPerCompany: true,
  reprintingCost: null,
  billedCompany: null,
  billedCompanyId: null,
  visitorBadgePrice: null,
  visitorReprintingCost: null,
});

export const getFallbackSeatBillingModel = () => ({
  estimatedWorkersNumber: null,
  isFixedSeatPrice: false,
  seatPrice: null,
  billingTier: null,
  billingTierId: null,
  billedCompany: null,
  billedCompanyId: null,
  reprintingCost: null,
  visitorBadgePrice: null,
  visitorReprintingCost: null,
});

export const getFallbackProject = (): IProject => ({
  id: undefined,
  name: null,
  description: null,
  categoryId: '',
  ccv: null,
  regionId: '',
  naeId: '',
  startDate: null,
  endDate: null,
  plannedMonths: null,
  jobSiteAddress: getFallbackAddress(),
  locations: [],
  badgingSiteAddressMatchesJobSiteAddress: true,
  badgingSiteAddress: null,
  mailingAddressMatchingType: MailingAddressMatchingType.JOB_SITE_ADDRESS,
  mailingAddress: null,
  relatedCompanies: [],
  billingModelType: BillingModelType.BADGES,
  badgeBillingModel: null,
  seatBillingModel: null,
  certificationGroups: [],
  trainingGroups: [],
  status: Status.DRAFT,
  generalContractorBadgeTemplate: getFallbackBadgeTemplate(),
  subcontractorBadgeTemplate: getFallbackBadgeTemplate(),
  visitorBadgeTemplate: getFallbackVisitorBadgeTemplate(),
  subcontractorBadgeTemplateMatchesGeneralContractor: false,
  consentFormFields: [],
  consentFormLegals: [],
  setupNotes: '',
});
