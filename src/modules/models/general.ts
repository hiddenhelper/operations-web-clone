import { Status, CompanyStatus } from './resource';
import { CompanyRole } from './project';
import { VisitorEntity } from './badge';
import { DeviceType } from './device';
import { IFormRules } from 'utils';

export type IEntityMap<T> = { [id: string]: T };

export interface ITokenResponse {
  email: string;
}

export interface ILoadingStatus {
  isLoading: boolean;
  hasError: boolean;
  error: any;
  traceId?: string;
}

export type IRelationUiMap = Record<string, any>;

export interface IPagination<T> {
  items: T[];
  pageNumber: number;
  totalResults: number;
  pageSize: number;
}

export interface IQueryParams {
  id?: string;
  page?: number;
  limit?: number;
  pageSize?: number;
  pageNumber?: number;
  query?: string;
  companyId?: string;
  excludeFromProjectId?: string;
  isDeveloper?: boolean;
  excludeProjectId?: string;
  stateCode?: string;
  countryCode?: string;
  period?: TimeFilterType;
  status?: Status | number;
  newPage?: boolean;
  filter?: number | string;
  filterByWorker?: boolean;
  nameContains?: string;
  maxItems?: number;
  projectId?: string;
  excludeCompanies?: string[];
  projectStatuses?: Status[];
  companyStatuses?: CompanyStatus[];
  isPaid?: boolean;
  sortType?: string;
  sortingName?: string;
  clientId?: string;
  tab?: string;
  active?: boolean | string;
  available?: boolean;
  type?: number;
  onlyPending?: boolean;
  role?: CompanyRole;
  entityType?: VisitorEntity;
  entity?: number;
  deviceType?: DeviceType;
  lastPage?: number;
  noRelatedProject?: boolean;
  name?: string;
  wStateCode?: string;
  wCountryCode?: string;
  wPeriod?: TimeFilterType;
  isActive?: boolean;
  timeZoneOffset?: string;
}

export interface INamedEntity {
  id: string;
  name: string;
  createdAt?: string;
  code?: string;
}

export interface ISelectOption {
  value: any;
  label: string;
}

export type IStepField = {
  name: string;
  required: boolean;
  computePositive?: boolean;
  fields?: IStepField[];
  requiredFunc?: (data: any) => number;
  completedFunc?: (data: any) => number;
};

export interface IStep {
  key: string;
  title: string;
  subtitle: string;
  hideControls: boolean;
  fields: IStepField[];
  order: number;
  draftFormRules?: IFormRules;
  approvalFormRules?: IFormRules;
  getDraftFormRules?: any;
  getApprovalFormRules?: any;
}

export interface IStepMap {
  [key: string]: IStep;
}

export interface IStepCompletedMap {
  [key: string]: {
    completed: number;
    required: number;
    title: string;
    order: number;
  };
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export enum ToastType {
  SUCCESS = 'success',
  WARN = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export const genderMap = {
  [Gender.MALE]: 'Male',
  [Gender.FEMALE]: 'Female',
};

export const booleanOptionList = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' },
];

export enum TimeFilterType {
  ALL_TIMES = '',
  TODAY = 0,
  LAST_WEEK = 1,
  LAST_TWO_WEEK = 2,
  LAST_MONTH = 3,
  LAST_YEAR = 4,
}

export enum TimeFilterWorkerActivity {
  ALL_TIMES = '',
  TODAY = 0,
  LAST_WEEK = 1,
  LAST_TWO_WEEK = 2,
  LAST_MONTH = 3,
  LAST_YEAR = 4,
}

export const timeFilterWorkerActivityMap = {
  [TimeFilterWorkerActivity.ALL_TIMES]: 'All Times',
  [TimeFilterWorkerActivity.TODAY]: 'Today',
  [TimeFilterWorkerActivity.LAST_WEEK]: 'Last 7 days',
  [TimeFilterWorkerActivity.LAST_MONTH]: 'Last 30 days',
  [TimeFilterWorkerActivity.LAST_YEAR]: 'Last 365 days',
};

export enum SortingType {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export const timeFilterTypeMap = {
  [TimeFilterType.ALL_TIMES]: 'All Times',
  [TimeFilterType.TODAY]: 'Today',
  [TimeFilterType.LAST_WEEK]: 'Last 7 days',
  [TimeFilterType.LAST_MONTH]: 'Last 30 days',
  [TimeFilterType.LAST_YEAR]: 'Last 365 days',
};

export const dayFilterTypeMap = {
  [TimeFilterType.LAST_WEEK]: 'Last 7 days',
  [TimeFilterType.LAST_TWO_WEEK]: 'Last 15 days',
  [TimeFilterType.LAST_MONTH]: 'Last 30 days',
};

export const timeFilterOptionList = [
  { value: TimeFilterType.ALL_TIMES, label: timeFilterTypeMap[TimeFilterType.ALL_TIMES] },
  { value: TimeFilterType.TODAY, label: timeFilterTypeMap[TimeFilterType.TODAY] },
  { value: TimeFilterType.LAST_WEEK, label: timeFilterTypeMap[TimeFilterType.LAST_WEEK] },
  { value: TimeFilterType.LAST_MONTH, label: timeFilterTypeMap[TimeFilterType.LAST_MONTH] },
  { value: TimeFilterType.LAST_YEAR, label: timeFilterTypeMap[TimeFilterType.LAST_YEAR] },
];

export const dayFilterOptionList = [
  { value: TimeFilterType.LAST_WEEK, label: dayFilterTypeMap[TimeFilterType.LAST_WEEK] },
  { value: TimeFilterType.LAST_TWO_WEEK, label: dayFilterTypeMap[TimeFilterType.LAST_TWO_WEEK] },
  { value: TimeFilterType.LAST_MONTH, label: dayFilterTypeMap[TimeFilterType.LAST_MONTH] },
];

export const workerActivityPeriodList = [
  { value: TimeFilterWorkerActivity.ALL_TIMES, label: timeFilterWorkerActivityMap[TimeFilterWorkerActivity.ALL_TIMES] },
  { value: TimeFilterWorkerActivity.TODAY, label: timeFilterWorkerActivityMap[TimeFilterWorkerActivity.TODAY] },
  { value: TimeFilterWorkerActivity.LAST_WEEK, label: timeFilterWorkerActivityMap[TimeFilterWorkerActivity.LAST_WEEK] },
  { value: TimeFilterWorkerActivity.LAST_MONTH, label: timeFilterWorkerActivityMap[TimeFilterWorkerActivity.LAST_MONTH] },
  { value: TimeFilterWorkerActivity.LAST_YEAR, label: timeFilterWorkerActivityMap[TimeFilterWorkerActivity.LAST_YEAR] },
];

export enum IJobFilter {
  TRADE = 0,
  WORK_EXPERIENCE = 1,
}

export const jobFilterMap = {
  [IJobFilter.TRADE]: 'Trade',
  [IJobFilter.WORK_EXPERIENCE]: 'Work Experience',
};

export const jobDataFilterList = [
  { value: IJobFilter.TRADE, label: jobFilterMap[IJobFilter.TRADE] },
  { value: IJobFilter.WORK_EXPERIENCE, label: jobFilterMap[IJobFilter.WORK_EXPERIENCE] },
];

export enum IDemographicFilter {
  PRIMARY_LANGUAGE = 0,
  ETHNICITY = 1,
  GENDER = 2,
}

export const demographicFilterMap = {
  [IDemographicFilter.PRIMARY_LANGUAGE]: 'Primary Language',
  [IDemographicFilter.ETHNICITY]: 'Ethnicity',
  [IDemographicFilter.GENDER]: 'Gender',
};

export const demographicFilterList = [
  { value: IDemographicFilter.ETHNICITY, label: demographicFilterMap[IDemographicFilter.ETHNICITY] },
  { value: IDemographicFilter.GENDER, label: demographicFilterMap[IDemographicFilter.GENDER] },
  { value: IDemographicFilter.PRIMARY_LANGUAGE, label: demographicFilterMap[IDemographicFilter.PRIMARY_LANGUAGE] },
];

export enum GenericType {
  NOT_DEFINED = -1,
}

export const genericType = {
  [GenericType.NOT_DEFINED]: 'Not Defined',
};

export enum IDempgrahicLanguage {
  ENGLISH = 0,
  SPANISH = 1,
  OTHER = 2,
}

export enum IDemographicEthnicity {
  ASIAN = 0,
  BLACK = 1,
  HISPANIC = 2,
  WHITE = 3,
  OTHER = 4,
}

export enum IDemographicGender {
  MALE = 0,
  FEMALE = 1,
}

export const demographicMap = {
  [IDemographicFilter.PRIMARY_LANGUAGE]: {
    ...genericType,
    [IDempgrahicLanguage.ENGLISH]: 'English',
    [IDempgrahicLanguage.SPANISH]: 'Spanish',
    [IDempgrahicLanguage.OTHER]: 'Other',
  },
  [IDemographicFilter.ETHNICITY]: {
    ...genericType,
    [IDemographicEthnicity.ASIAN]: 'Asian',
    [IDemographicEthnicity.BLACK]: 'Black',
    [IDemographicEthnicity.HISPANIC]: 'Hispanic',
    [IDemographicEthnicity.WHITE]: 'White',
    [IDemographicEthnicity.OTHER]: 'Other',
  },
  [IDemographicFilter.GENDER]: {
    ...genericType,
    [IDemographicGender.MALE]: 'Male',
    [IDemographicGender.FEMALE]: 'Female',
  },
};

export enum DateFormat {
  DATE,
  DATE_TEXT,
  DATE_MONTH,
  MONTH_YEAR,
  DATE_TIME,
  NUMERIC_DATE,
  DASHED_NUMERIC,
}

export const dateFormatMap = {
  [DateFormat.DATE]: 'MMM DD, YYYY',
  [DateFormat.DATE_TEXT]: 'MMMM DD, YYYY',
  [DateFormat.DATE_MONTH]: 'DD MMM',
  [DateFormat.MONTH_YEAR]: 'MMMM YYYY',
  [DateFormat.DATE_TIME]: 'MMM DD, YYYY hh:mm a',
  [DateFormat.NUMERIC_DATE]: 'MM/DD/YYYY',
  [DateFormat.DASHED_NUMERIC]: 'YYYY-MM-DD',
};

export enum OptionFilterType {
  NO_RELATED = 'no-related',
}

export enum ITraining {
  SAFETY_ORIENTATION = 0,
  EQUIPMENT_TRAINING = 1,
  VEHICLE_TRAINING = 2,
}

export const trainingMap = {
  ...genericType,
  [ITraining.SAFETY_ORIENTATION]: 'Safety Orientation',
  [ITraining.EQUIPMENT_TRAINING]: 'Equipment Training',
  [ITraining.VEHICLE_TRAINING]: 'Vehicle Training',
};

export const pieBlueMap = {
  0: '#00346B',
  1: '#006DF7',
  2: '#59A0FA',
  3: '#B2D3FD',
  4: '#D9E9FE',
  5: '#00346B',
};

export enum GroupValidationType {
  NOT_MANDATORY = 1,
  AT_LEAST_ONE = 2,
  ALL_MANDATORY = 3,
}

export const GroupValidationOptions = [
  { value: GroupValidationType.NOT_MANDATORY, label: 'Not mandatory' },
  { value: GroupValidationType.AT_LEAST_ONE, label: 'At least one is mandatory' },
  { value: GroupValidationType.ALL_MANDATORY, label: 'All Mandatory' },
];
