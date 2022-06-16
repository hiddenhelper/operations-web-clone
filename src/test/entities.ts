import {
  ClientModel,
  ProjectModel,
  UserModel,
  GeneralModel,
  ResourceModel,
  AccessControlSystemModel,
  WorkerModel,
  BadgePrintingSystemModel,
  DeviceModel,
  BadgeModel,
  CertificationModel,
  FileModel,
  AddressModel,
  ConsentFormModel,
  StatisticsModel,
  TrainingModel,
  PaymentModel,
  InvoiceModel,
  SearchModel,
} from '../modules/models';
import { LANG } from '../constants/locales';

export const validateTokenResponse = (): GeneralModel.ITokenResponse => ({
  email: 'some@email.test',
});

export const getDate_1 = () => '2001-01-01T00:00:00';

export const cognitoResponse = () => ({
  session: {
    user: 'username',
    email: 'email@test.com',
    token: 'token',
    'custom:role': 'role',
    'custom:companyid': 'company-id',
  },
});

export const getClientUserPagination_1 = (): GeneralModel.IPagination<Partial<UserModel.IUser>> => ({
  pageNumber: 1,
  pageSize: 5,
  totalResults: 1,
  items: [
    {
      id: '8acb3a-8932bcc-cca214-af321b',
      firstName: 'string',
      lastName: 'string',
      title: 'string',
      email: 'string',
      mobilePhoneNumber: 'string',
      officePhoneNumber: 'string',
      invitationType: 0,
    },
  ],
});

export const getClientWorkerPagination_1 = (): GeneralModel.IPagination<Partial<WorkerModel.IWorker>> => ({
  pageNumber: 1,
  pageSize: 5,
  totalResults: 1,
  items: [getWorker_1()],
});

export const getClientProjectPagination_1 = (): GeneralModel.IPagination<ProjectModel.IProject> => ({
  pageNumber: 1,
  pageSize: 5,
  totalResults: 1,
  items: [
    {
      id: '1',
      name: 'Project name',
      jobSiteAddress: {
        line1: 'line 1',
        line2: 'line 2',
        city: 'city',
        stateCode: 'state code',
        zipCode: 'zip code',
        latitude: 34.12434,
        longitude: -12.4312,
      },
      startDate: '123190231221',
      endDate: '2139102930123',
      clientCount: 5,
    } as any,
  ],
});

export const getMwbeType_1 = (): GeneralModel.INamedEntity[] => [
  {
    id: '1',
    name: 'Option 1',
  },
  {
    id: '2',
    name: 'Option 2',
  },
  {
    id: '3',
    name: 'Option 3',
  },
  {
    id: '4',
    name: 'None',
  },
];

export const getMwbeType_2 = (): GeneralModel.INamedEntity[] => [
  {
    id: '1',
    name: 'Disabled Veteran Business Enterprise',
  },
  {
    id: '2',
    name: 'Disadvanteged Business Enterprise ',
  },
  {
    id: '3',
    name: 'Micro-Business',
  },
  {
    id: '4',
    name: 'None',
  },
];

export const getTrades_1 = (): GeneralModel.INamedEntity[] => [
  {
    id: '1',
    name: 'one',
  },
  {
    id: '2',
    name: 'two',
  },
  {
    id: '3',
    name: 'three',
  },
  {
    id: '4',
    name: 'four',
  },
];

export const getTrades_2 = (): GeneralModel.INamedEntity[] => [
  {
    id: '1',
    name: 'Ceiling',
  },
  {
    id: '2',
    name: 'Concrete',
  },
  {
    id: '3',
    name: 'Electrical',
  },
  {
    id: '4',
    name: 'Low Voltage',
  },
];

export const getConsentFormFields = (): ConsentFormModel.IConsentFormField[] => [
  {
    id: 'b2fa9f81-d2da-44a1-b33d-4de2cc4bc508',
    name: 'Date of Hire',
    code: 'DATE_OF_HIRE',
    options: [],
    createdAt: '2020-10-20T17:44:18.774061',
    defaultValue: null,
    dataType: 4,
    order: 8,
  },
  {
    id: '839035c0-e876-4b4f-8bb3-e80bbecd05d7',
    name: 'Referred by',
    code: 'REFERRED_BY',
    options: [],
    createdAt: '2020-10-20T17:44:18.774062',
    defaultValue: '9f2848b7-5ec8-4409-89b7-ac2e1b163cf4',
    dataType: 0,
    order: 0,
  },
  {
    id: '20ad0c1a-3600-4344-bdb5-4b1e6741ee21',
    name: 'Section 3 Employee',
    code: 'SECTION_3_EMPLOYEE',
    options: [],
    createdAt: '2020-10-20T17:44:18.774063',
    defaultValue: null,
    dataType: 2,
    order: 5,
  },
  {
    id: '25ee236e-e57d-462d-b738-29495a930ee1',
    name: 'Supervisor Name',
    code: 'SUPERVISOR_NAME',
    options: [],
    createdAt: '2020-10-20T17:44:18.774064',
    defaultValue: null,
    dataType: 1,
    order: 3,
  },
  {
    id: '577525c3-ce59-48d6-8237-3a50bbbff0b7',
    name: 'Supervisor Phone',
    code: 'SUPERVISOR_PHONE',
    options: [],
    createdAt: '2020-10-20T17:44:18.774065',
    defaultValue: null,
    dataType: 3,
    order: 4,
  },
  {
    id: 'd42a8b19-0d09-492c-b54f-8f9e136392d1',
    name: 'Hard Hat Number',
    code: 'HARD_HAT_NUMBER',
    options: [],
    createdAt: '2020-10-20T17:44:18.774065',
    defaultValue: null,
    dataType: 0,

    order: 0,
  },
  {
    id: 'abee068b-e8bd-4ba0-bff3-5a74acac26cc',
    name: 'STEP Status',
    code: 'SETP_STATUS',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 7,
  },
  {
    id: '42d4eaec-5777-46e0-b5f3-ef467cb69f5a',
    name: 'Eligible To Work In Us',
    code: 'ELIGIBLE_TO_WORK_IN_US',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 9,
  },
  {
    id: '569cf404-301f-49f9-907e-99da39d580bd',
    name: 'SOC Job Title',
    code: 'SOC_JOB_TITLE',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 10,
  },
  {
    id: '65faf605-30bd-4ebc-82ba-d0688ce1be2f',
    name: 'Years of Experience',
    code: 'YEARS_OF_EXPERIENCE',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 11,
  },
  {
    id: '724aebdf-f8d4-4c26-89b4-b0c516eda107',
    name: 'Job Title',
    code: 'JOB_TITLE',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 0,
  },
  {
    id: 'ca4c0101-a239-4232-90dd-cf618423274a',
    name: 'Hourly Rate of Pay',
    code: 'HOURLY_RATE_PAY',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 1,
    order: 13,
  },
  {
    id: '9aa33953-d0b1-430e-a8ac-7716787a3b04',
    name: 'Vehicle Information',
    code: 'VEHICLE_INFORMATION',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 6,
    order: 14,
  },
  {
    id: 'ce9817bf-e3e3-4f22-a7b7-50455f4f8a3d',
    name: 'Language of Turner Protocol',
    code: 'LANGUAGE_TURNER_PROTOCOL',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 15,
  },
  {
    id: '76dd454a-62f1-4c95-b774-39ce0b856536',
    name: 'LGBTQ',
    code: 'LGBTQ',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 16,
  },
  {
    id: '5f8d0f22-28d2-4a66-87df-0d1da32f5823',
    name: 'Payment Type',
    code: 'PAYMENT_TYPE',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 12,
  },
  {
    id: '679ade51-bb2a-4be4-b228-f9df58c68eab',
    name: 'Trade Status',
    code: 'TRADE_STATUS',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 1,
  },
  {
    id: '52bcd3ec-9dfb-4250-833e-69165a09018a',
    name: 'Last 4 SSN',
    code: 'LAST_4_SSN',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 1,
    order: 2,
  },
  {
    id: 'b68defca-1b0b-40ad-9cc3-48ac7e6bd48c',
    name: 'Section 3 Resident',
    code: 'SECTION_3_RESIDENT',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 2,
    order: 6,
  },
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Project Trade',
    code: 'PROJECT_SKILLED_TRADE',
    options: [],
    createdAt: '2021-06-02T18:43:28.92491',
    defaultValue: null,
    dataType: 5,
    order: 17,
  },
];

export const getConsentFormFieldConfigs = (): ConsentFormModel.IConsentFormFieldConfig[] => [
  {
    consentFormFieldId: 'b2fa9f81-d2da-44a1-b33d-4de2cc4bc508',
    consentFormFieldName: 'Date of Hire',
    isVisible: true,
    isMandatory: true,
  },
  {
    consentFormFieldId: '839035c0-e876-4b4f-8bb3-e80bbecd05d7',
    consentFormFieldName: 'Referred by...',
    isVisible: true,
    isMandatory: true,
  },
  {
    consentFormFieldId: '20ad0c1a-3600-4344-bdb5-4b1e6741ee21',
    consentFormFieldName: 'Section 3 Employee',
    isVisible: true,
    isMandatory: true,
  },
  {
    consentFormFieldId: '25ee236e-e57d-462d-b738-29495a930ee1',
    consentFormFieldName: 'Supervisor Name',
    isVisible: true,
    isMandatory: true,
  },
  {
    consentFormFieldId: '577525c3-ce59-48d6-8237-3a50bbbff0b7',
    consentFormFieldName: 'Supervisor Phone',
    isVisible: true,
    isMandatory: true,
  },
  {
    consentFormFieldId: 'd42a8b19-0d09-492c-b54f-8f9e136392d1',
    consentFormFieldName: 'Hard Hat Number',
    isVisible: true,
    isMandatory: true,
  },
];

export const getProjectCategory_1 = (): GeneralModel.INamedEntity => ({
  id: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
  name: 'category-1',
});

export const getProjectCategory_2 = (): GeneralModel.INamedEntity => ({
  id: '8acce4c4-6521-47bb-97fd-c75ac02b2213',
  name: 'category-2',
});

export const getProjectRegion_1 = (): GeneralModel.INamedEntity => ({
  id: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
  name: 'region-1',
});

export const getProjectRegion_2 = (): GeneralModel.INamedEntity => ({
  id: '8acce4c4-6521-47bb-97fd-c75ac02b2215',
  name: 'region-2',
});

export const getFcaNae_1 = (): GeneralModel.INamedEntity => ({
  id: '8acce4c4-6521-47bb-97fd-c75ac02b2216',
  name: 'fca-nae-1',
});

export const getFcaNae_2 = (): GeneralModel.INamedEntity => ({
  id: '8acce4c4-6521-47bb-97fd-c75ac02b2217',
  name: 'fca-nae-2',
});

export const getCertification_1 = (): CertificationModel.ICertification => ({
  id: 'cert-1',
  name: 'test certification-g',
});

export const getCertification_2 = (): CertificationModel.ICertification => ({
  id: 'cert-2',
  name: 'test other cert',
});

export const getCertification_3 = (): CertificationModel.ICertification => ({
  id: 'cert-3',
  name: 'Awesome Certification',
});

export const getTraining_1 = (): GeneralModel.INamedEntity => ({
  id: 'train-1',
  name: 'test training',
});

export const getTraining_2 = (): GeneralModel.INamedEntity => ({
  id: 'train-22',
  name: 'Other training',
});

export const getProjectCompany_1 = (): ProjectModel.IProjectCompany => ({
  id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
  role: ProjectModel.CompanyRole.DEVELOPER,
  name: 'company 1',
  status: ProjectModel.CompanyStatus.ACTIVE,
  tempId: 'temp-dev-search-id-0',
});

export const getProjectCompany_2 = (): ProjectModel.IProjectCompany => ({
  id: null,
  role: ProjectModel.CompanyRole.GENERAL_CONTRACTOR,
  name: 'company 2',
  status: ProjectModel.CompanyStatus.ACTIVE,
  tempId: 'tempid-1',
});

export const getProjectCompany_3 = (): ProjectModel.IProjectCompany => ({
  id: 'ff14e4c4-6521-a5cb-64fd-c75ac02b2cf3',
  role: ProjectModel.CompanyRole.DEVELOPER,
  name: 'company 3',
  status: ProjectModel.CompanyStatus.DRAFT,
});

export const getProjectCompany_4 = (): ProjectModel.IProjectCompany => ({
  id: 'ab29c3c5-7733-f5cb-53fc-f720c07b2aff',
  role: ProjectModel.CompanyRole.GENERAL_CONTRACTOR,
  name: 'company 4',
  status: ProjectModel.CompanyStatus.ACTIVE,
});

export const getProjectCompany_5 = (): ProjectModel.IProjectCompany => ({
  id: '7fc9c3c5-7733-f5cb-53fc-f720c07b2ab1',
  role: ProjectModel.CompanyRole.DEVELOPER_PROJECT_OWNER,
  name: 'company 4',
  status: ProjectModel.CompanyStatus.ACTIVE,
});

export const getProject_1 = (): ProjectModel.IProject => ({
  id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
  name: 'Project Name',
  description: 'description',
  categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
  category: getProjectCategory_1(),
  ccv: null,
  regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
  region: getProjectRegion_1(),
  naeId: null,
  timeZoneId: null,
  startDate: 1594828379742 as any,
  endDate: 1594828379742 as any,
  plannedMonths: '',
  billingModelType: 0,
  badgeBillingModel: {
    badgePrice: null,
    isBilledPerCompany: true,
    reprintingCost: null,
    billedCompanyId: null,
    visitorBadgePrice: null,
    visitorReprintingCost: null,
  },
  seatBillingModel: null,
  jobSiteAddress: AddressModel.getFallbackAddress(),
  locations: [],
  badgingSiteAddressMatchesJobSiteAddress: true,
  badgingSiteAddress: null,
  mailingAddressMatchingType: 1,
  mailingAddress: null,
  relatedCompanies: [],
  certificationGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      certifications: [{ ...getCertification_1(), alias: getCertification_1().name }],
    },
  ],
  trainingGroups: [],
  status: ResourceModel.Status.DRAFT,
  generalContractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
  subcontractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
  visitorBadgeTemplate: BadgeModel.getFallbackVisitorBadgeTemplate(),
  subcontractorBadgeTemplateMatchesGeneralContractor: false,
  consentFormFields: [],
  consentFormLegals: [
    { languageId: 'enId', languageCode: ConsentFormModel.ConsentFormLanguages.ENGLISH, body: 'Consent from' },
    { languageId: 'esId', languageCode: ConsentFormModel.ConsentFormLanguages.SPANISH, body: 'Formulario de consentimiento' },
  ],
  companyHasCreditCard: true,
  paymentMethod: {
    brand: 'Visa',
    country: 'US',
    expirationMonth: 12,
    expirationYear: 28,
    lastFourDigits: 1234,
    nameOnCard: 'Card Name',
    paymentMethodId: '8acce4c4-6521-47bb-97fd-c75ac4442214',
  },
});

export const getProject_2 = (): ProjectModel.IProject => ({
  id: '8aa1c4c4-6521-47bb-27fd-af5ac02b2cd8',
  name: 'Project Name 2',
  description: 'description',
  categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
  ccv: '$213,192,324.12' as any,
  regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
  naeId: '',
  timeZoneId: '155dc3dc-98d5-11eb-a8b3-0242ac130003',
  startDate: 1594828379742 as any,
  endDate: 1594828379742 as any,
  plannedMonths: '',
  billingModelType: 0,
  badgeBillingModel: {
    badgePrice: null,
    isBilledPerCompany: true,
    reprintingCost: null,
    billedCompanyId: null,
  },
  seatBillingModel: null,
  jobSiteAddress: null,
  locations: null,
  badgingSiteAddressMatchesJobSiteAddress: true,
  badgingSiteAddress: null,
  mailingAddressMatchingType: 1,
  mailingAddress: null,
  relatedCompanies: [getProjectCompany_1(), getProjectCompany_2()],
  certificationGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      certifications: [{ ...getCertification_1(), alias: getCertification_1().name }],
    },
  ],
  trainingGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      trainings: [{ ...getTraining_1(), alias: getTraining_1().name }],
    },
  ],
  status: ResourceModel.Status.PENDING_APPROVAL,
  category: { id: 'category-id', name: 'category-name' },
  region: { id: 'region-id', name: 'region-name' },
  consentFormFields: [],
  consentFormLegals: [],
});

export const getProject_3 = (): ProjectModel.IProject => ({
  id: '820ccbf5-03aa-4797-9001-d79643c3d35d',
  name: 'Project Name 3',
  description: 'description',
  categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
  ccv: 12345,
  regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
  naeId: '8acce4c4-6521-47bb-97fd-c75ac02b2216',
  timeZoneId: '155dc3dc-98d5-11eb-a8b3-0242ac130003',
  startDate: 1594828379742 as any,
  endDate: 1594828379742 as any,
  plannedMonths: '0',
  billingModelType: 0,
  badgeBillingModel: {
    badgePrice: 15,
    isBilledPerCompany: true,
    reprintingCost: 5,
    billedCompanyId: null,
    visitorBadgePrice: 12,
    visitorReprintingCost: 3,
  },
  seatBillingModel: null,
  jobSiteAddress: {
    line1: 'line 1',
    line2: 'line 2',
    city: 'city',
    stateCode: 'state code',
    zipCode: 'zip code',
    latitude: 34.12434,
    longitude: -12.4312,
  },
  locations: [
    {
      id: 'locID',
      name: 'location name',
      isUsed: false,
    },
  ],
  badgingSiteAddressMatchesJobSiteAddress: true,
  badgingSiteAddress: null,
  mailingAddressMatchingType: 1,
  mailingAddress: null,
  relatedCompanies: [getProjectCompany_1(), getProjectCompany_4(), getProjectCompany_5()],
  certificationGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      certifications: [{ ...getCertification_1(), alias: getCertification_1().name }],
    },
  ],
  trainingGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      trainings: [{ ...getTraining_1(), alias: getTraining_1().name }],
    },
  ],
  status: ResourceModel.Status.DRAFT,
  consentFormFields: [
    { consentFormFieldId: '1', consentFormFieldName: 'trade 1', isVisible: true, isMandatory: false },
    { consentFormFieldId: '2', consentFormFieldName: 'trade 2', isVisible: true, isMandatory: false },
  ],
  consentFormLegals: [],
});

export const getProject_4 = (): ProjectModel.IProject => ({
  id: 'cbb1c4c4-2221-f7bb-27fd-ff5ac02b2cda',
  name: 'Project Name 4',
  description: 'description',
  categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
  ccv: '$213,192,324.12' as any,
  regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
  naeId: '',
  timeZoneId: '155dc3dc-98d5-11eb-a8b3-0242ac130003',
  startDate: 1594828379742 as any,
  endDate: 1594828379742 as any,
  plannedMonths: '',
  billingModelType: 1,
  badgeBillingModel: {
    badgePrice: null,
    isBilledPerCompany: true,
    reprintingCost: null,
    billedCompanyId: null,
  },
  seatBillingModel: {
    estimatedWorkersNumber: 20,
    isFixedSeatPrice: false,
    seatPrice: 120,
    billingTier: null,
    billingTierId: null,
    billedCompany: null,
    billedCompanyId: null,
    reprintingCost: 150,
  },
  jobSiteAddress: null,
  locations: [AddressModel.getFallbackLocation()],
  badgingSiteAddressMatchesJobSiteAddress: true,
  badgingSiteAddress: null,
  mailingAddressMatchingType: 1,
  mailingAddress: null,
  relatedCompanies: [getProjectCompany_1(), getProjectCompany_2()],
  certificationGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      certifications: [{ ...getCertification_1(), alias: getCertification_1().name }],
    },
  ],
  trainingGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      trainings: [{ ...getTraining_1(), alias: getTraining_1().name }],
    },
  ],
  status: ResourceModel.Status.PENDING_APPROVAL,
  category: { id: 'category-id', name: 'category-name' },
  region: { id: 'region-id', name: 'region-name' },
  consentFormFields: [
    { consentFormFieldId: '1', consentFormFieldName: 'trade 1', isVisible: true, isMandatory: false },
    { consentFormFieldId: '2', consentFormFieldName: 'trade 2', isVisible: true, isMandatory: false },
  ],
  consentFormLegals: [],
});

export const getProject_5 = (): ProjectModel.IProject => ({
  id: 'acf2231a-1331-c5cb-27fd-ca4bc12f2cff',
  name: 'Project Name 5',
  description: 'description',
  categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
  ccv: '$213,192,324.12' as any,
  regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
  naeId: 'ccffe4c4-4413-c7bb-f7fd-a75bf47b2222',
  startDate: 1594828379742 as any,
  endDate: 1594828379742 as any,
  plannedMonths: '',
  timeZoneId: '155dc3dc-98d5-11eb-a8b3-0242ac130003',
  billingModelType: 1,
  badgeBillingModel: {
    badgePrice: null,
    isBilledPerCompany: false,
    reprintingCost: null,
    billedCompanyId: null,
  },
  seatBillingModel: {
    estimatedWorkersNumber: 20,
    isFixedSeatPrice: false,
    seatPrice: 120,
    billingTier: null,
    billingTierId: null,
    billedCompany: null,
    billedCompanyId: null,
    reprintingCost: 150,
  },
  jobSiteAddress: getAddress_1(),
  locations: [AddressModel.getFallbackLocation()],
  badgingSiteAddressMatchesJobSiteAddress: true,
  badgingSiteAddress: getAddress_1(),
  mailingAddressMatchingType: 1,
  mailingAddress: getAddress_1(),
  relatedCompanies: [getProjectCompany_1(), getProjectCompany_2(), getProjectCompany_5()],
  certificationGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      certifications: [{ ...getCertification_1(), alias: getCertification_1().name }],
    },
  ],
  trainingGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      trainings: [{ ...getTraining_1(), alias: getTraining_1().name }],
    },
  ],
  status: ResourceModel.Status.PENDING_APPROVAL,
  category: { id: 'category-id', name: 'category-name' },
  region: { id: 'region-id', name: 'region-name' },
  consentFormFields: [],
  consentFormLegals: [],
});

export const getProject_6 = (): ProjectModel.IProject => ({
  id: 'bcfcb322-453a-f52c-27fd-ca2bc329afaa',
  name: 'Project Name 6',
  description: 'description type two',
  categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
  ccv: '$213,192,324.12' as any,
  regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
  naeId: 'ccffe4c4-4413-c7bb-f7fd-a75bf47b2222',
  startDate: 1594828379742 as any,
  endDate: 1594828379742 as any,
  plannedMonths: '',
  timeZoneId: '155dc3dc-98d5-11eb-a8b3-0242ac130003',
  billingModelType: ProjectModel.BillingModelType.BADGES,
  badgeBillingModel: {
    badgePrice: null,
    isBilledPerCompany: false,
    reprintingCost: null,
    billedCompany: getProjectCompany_1(),
    billedCompanyId: null,
  },
  seatBillingModel: null,
  jobSiteAddress: getAddress_1(),
  locations: [AddressModel.getFallbackLocation()],
  badgingSiteAddressMatchesJobSiteAddress: true,
  badgingSiteAddress: getAddress_1(),
  mailingAddressMatchingType: 1,
  mailingAddress: getAddress_1(),
  relatedCompanies: [getProjectCompany_1(), getProjectCompany_2()],
  certificationGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      certifications: [{ ...getCertification_1(), alias: getCertification_1().name }],
    },
  ],
  trainingGroups: [
    {
      id: 'groupId',
      name: 'Group Name',
      validationType: 1,
      trainings: [{ ...getTraining_1(), alias: getTraining_1().name }],
    },
  ],
  status: ResourceModel.Status.PENDING_APPROVAL,
  category: { id: 'category-id', name: 'category-name' },
  region: { id: 'region-id', name: 'region-name' },
  consentFormFields: [
    { consentFormFieldId: '1', consentFormFieldName: 'trade 1', isVisible: true, isMandatory: false },
    { consentFormFieldId: '2', consentFormFieldName: 'trade 2', isVisible: true, isMandatory: false },
  ],
  consentFormLegals: [],
});

export const getProjectUserPagination_1 = (): GeneralModel.IPagination<Partial<UserModel.IUser>> => ({
  pageNumber: 1,
  pageSize: 1,
  totalResults: 1,
  items: [getProject_1()],
});

export const getUserRole_1 = () => ({
  id: 'some-id',
  label: 'label',
  name: 'label',
});

export const getAccount_1 = (): UserModel.IAccount => ({
  firstName: 'account name',
  lastName: 'account last name',
  pictureUrl: 'aws:url.com/id',
  email: 'email@test.com',
  mobilePhoneNumber: '+54871093',
  officePhoneNumber: '+43781983',
  officePhoneExtension: '',
  preferredContactMethod: 0,
});

export const getUser_1 = (): UserModel.IUser => ({
  id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf3',
  firstName: 'Pedro',
  lastName: 'Martin',
  email: 'user@test.com',
  title: '',
  invitationType: UserModel.InviteType.DO_NOT_INVITE,
  mobilePhoneNumber: '',
  officePhoneNumber: '',
  officePhoneExtension: '',
  preferredContactMethod: UserModel.PreferredContactMethod.EMAIL,
  companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
  company: {
    id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
    name: 'Constructions INC.',
  },
  groupIds: [],
});

export const getUser_2 = (): UserModel.IUser => ({
  firstName: 'Test',
  lastName: 'One',
  email: 'user@test.com',
  title: '',
  invitationType: UserModel.InviteType.DO_NOT_INVITE,
  mobilePhoneNumber: '',
  officePhoneNumber: '+5678947895',
  officePhoneExtension: '',
  preferredContactMethod: UserModel.PreferredContactMethod.EMAIL,
  companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
  company: {
    id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
    name: 'Constructions INC.',
  },
  groupIds: [],
});

export const getUser_3 = (): UserModel.IUser => ({
  firstName: 'user3',
  lastName: 'user3 lastname',
  email: 'test',
  title: 'title 3 ',
  invitationType: UserModel.InviteType.DO_NOT_INVITE,
  mobilePhoneNumber: '+12133734253',
  officePhoneNumber: '+12133734253',
  officePhoneExtension: '',
  preferredContactMethod: UserModel.PreferredContactMethod.PHONE,
  companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
  company: {
    id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
    name: 'Constructions INC.',
  },
  groupIds: [],
});

export const getUser_4 = (): UserModel.IUser => ({
  id: '7213e5c5-6521-47ba-97cd-f75ac02b2cf3',
  firstName: 'Test',
  lastName: 'One',
  email: 'test@email.com',
  title: 'titleUser1',
  invitationType: UserModel.InviteType.DO_NOT_INVITE,
  mobilePhoneNumber: null,
  officePhoneNumber: null,
  officePhoneExtension: '',
  preferredContactMethod: UserModel.PreferredContactMethod.EMAIL,
  companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
  company: {
    id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
    name: 'Constructions INC.',
  },
  groupIds: [],
});

export const getUser_5 = (): UserModel.IUser => ({
  firstName: 'Test',
  lastName: 'Two',
  email: 'test2@email.com',
  title: 'titleUser2',
  invitationType: UserModel.InviteType.DO_NOT_INVITE,
  mobilePhoneNumber: null,
  officePhoneNumber: null,
  officePhoneExtension: '',
  preferredContactMethod: UserModel.PreferredContactMethod.EMAIL,
  companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
  company: {
    id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
    name: 'Constructions INC.',
  },
  groupIds: [],
});

export const getUser_6 = (): UserModel.IUser => ({
  firstName: 'user3',
  lastName: 'user3 lastname',
  email: 'user6@test.com',
  title: 'title 3 ',
  invitationType: UserModel.InviteType.CLIENT_ADMIN,
  mobilePhoneNumber: '+12133734253',
  officePhoneNumber: '+12133734253',
  officePhoneExtension: '4',
  preferredContactMethod: UserModel.PreferredContactMethod.PHONE,
  companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
  company: {
    id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
    name: 'Constructions INC.',
  },
  groupIds: [],
});

export const getUser_7 = (): UserModel.IUser => ({
  firstName: 'not',
  lastName: 'admin',
  email: 'test',
  title: 'title 3 ',
  invitationType: UserModel.InviteType.REGULAR_USER,
  mobilePhoneNumber: '+12133734253',
  officePhoneNumber: '+12133734253',
  officePhoneExtension: '4',
  preferredContactMethod: UserModel.PreferredContactMethod.PHONE,
  companyId: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
  company: {
    id: '5164e4c4-6521-47bb-97fd-b75ac02b2cf1',
    name: 'Constructions INC.',
  },
  groupIds: [],
});

export const getUserPagination_1 = (): GeneralModel.IPagination<Partial<UserModel.IUser>> => ({
  pageNumber: 1,
  pageSize: 1,
  totalResults: 1,
  items: [getUser_1()],
});

export const getClient_1 = (): ClientModel.IClient => ({
  id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
  name: 'Robert C. Martin',
  isDeveloper: false,
  taxpayerIdentificationNumber: 'LOZG-780211-7B9',
  mwbeTypeId: '1',
  trades: [
    { id: '1', name: 'trade 1' },
    { id: '2', name: 'trade 2' },
  ],
  otherTrade: null,
  billingAddress: {
    line1: null,
    line2: null,
    city: null,
    stateCode: null,
    zipCode: null,
    latitude: null,
    longitude: null,
    countryId: null,
    stateName: null,
  },
  mailingAddress: null,
  mailingAddressMatchesBillingAddress: true,
  users: [getUser_1(), getUser_2()],
  status: ResourceModel.CompanyStatus.DRAFT,
  hasUniversalBadge: true,
  universalBadgePrice: null,
});

export const getClient_2 = (): ClientModel.IClient => ({
  id: '47bb-9164e4c4-6521-97fd-9164e4c4-6521F',
  name: 'Martin Fowler',
  isDeveloper: false,
  taxpayerIdentificationNumber: '1212346789',
  mwbeTypeId: '',
  trades: [
    { id: '1', name: 'trade 1' },
    { id: '2', name: 'trade 2' },
    { id: '3', name: 'trade 3' },
  ],
  otherTrade: 'some trade',
  billingAddress: {
    line1: null,
    line2: null,
    city: null,
    stateCode: null,
    zipCode: null,
    latitude: null,
    longitude: null,
    countryId: null,
    stateName: null,
  },
  mailingAddress: null,
  mailingAddressMatchesBillingAddress: true,
  users: [getUser_3()],
  status: ResourceModel.CompanyStatus.PENDING_APPROVAL,
  hasUniversalBadge: true,
  universalBadgePrice: 123,
});

export const getClient_3 = (): ClientModel.IClient => ({
  id: '6521-47bb-9164e4c4-97fd-6521x-9164e4c4',
  name: 'Eric Evans',
  isDeveloper: false,
  taxpayerIdentificationNumber: '987654321',
  mwbeTypeId: '',
  trades: [{ id: '1', name: 'trade 1' }],
  otherTrade: null,
  billingAddress: {
    line1: null,
    line2: null,
    city: null,
    stateCode: null,
    zipCode: null,
    latitude: null,
    longitude: null,
    countryId: null,
    stateName: null,
  },
  mailingAddress: null,
  users: [],
  mailingAddressMatchesBillingAddress: true,
  status: ResourceModel.CompanyStatus.ARCHIVED,
  hasUniversalBadge: false,
  universalBadgePrice: null,
});

export const getClient_4 = (): ClientModel.IClient => ({
  id: '2222-47bb-9164e4c4-97fd-6521x-9164e4c4',
  name: '',
  isDeveloper: false,
  taxpayerIdentificationNumber: '',
  mwbeTypeId: '',
  trades: [],
  otherTrade: null,
  billingAddress: {
    line1: null,
    line2: null,
    city: null,
    stateCode: null,
    zipCode: null,
    latitude: null,
    longitude: null,
    countryId: null,
    stateName: null,
  },
  mailingAddress: null,
  mailingAddressMatchesBillingAddress: true,
  status: ResourceModel.CompanyStatus.ACTIVE,
  users: [{ ...UserModel.getFallbackUser(), mobilePhoneNumber: '+1 (732) 3283-234' }],
  hasUniversalBadge: false,
  universalBadgePrice: null,
});

export const getClient_5 = (): ClientModel.IClient => ({
  id: 'a521bdcd-264c-4ae8-920a-cad6e481db65',
  name: 'Martin',
  isDeveloper: false,
  taxpayerIdentificationNumber: '1212346798',
  mwbeTypeId: '1',
  trades: [
    { id: '1', name: 'trade 1' },
    { id: '2', name: 'trade 2' },
    { id: '5', name: 'trade 5' },
  ],
  otherTrade: null,
  billingAddress: getAddress_1(),
  mailingAddress: null,
  mailingAddressMatchesBillingAddress: true,
  users: [getUser_6()],
  status: ResourceModel.CompanyStatus.DRAFT,
  hasUniversalBadge: false,
  universalBadgePrice: null,
});

export const getClient_6 = (): ClientModel.IClient => ({
  id: 'a521bdcd-264c-4ae8-920a-cad6e481db65',
  name: 'Martin',
  isDeveloper: true,
  taxpayerIdentificationNumber: null,
  mwbeTypeId: '1',
  trades: [],
  otherTrade: null,
  billingAddress: AddressModel.getFallbackAddress(),
  mailingAddress: null,
  mailingAddressMatchesBillingAddress: true,
  users: [],
  status: ResourceModel.CompanyStatus.DRAFT,
  hasUniversalBadge: false,
  universalBadgePrice: null,
});

export const getClientProject_1 = (): ClientModel.IClientProject => ({
  ...getClient_1(),
  companyProjectStatus: ProjectModel.CompanyProjectStatus.PENDING,
  jobSiteAddress: { city: 'New York', state: 'FL' } as any,
  role: ProjectModel.CompanyRole.DEVELOPER,
});

export const getClientProject_2 = (): ClientModel.IClientProject => ({
  ...getClient_2(),
  companyProjectStatus: ProjectModel.CompanyProjectStatus.ACCEPTED,
  jobSiteAddress: null,
  role: ProjectModel.CompanyRole.GENERAL_CONTRACTOR,
});

export const getClientProject_3 = (): ClientModel.IClientProject => ({
  ...getClient_3(),
  companyProjectStatus: ProjectModel.CompanyProjectStatus.ACCEPTED,
  jobSiteAddress: null,
  role: ProjectModel.CompanyRole.GENERAL_CONTRACTOR,
});

export const getClientProject_4 = (): ClientModel.IClientProject => ({
  ...getClient_4(),
  companyProjectStatus: ProjectModel.CompanyProjectStatus.ACCEPTED,
  jobSiteAddress: null,
  role: ProjectModel.CompanyRole.DEVELOPER,
});

export const getCountry_1 = (): GeneralModel.INamedEntity => ({ id: 'uuid-1', code: 'US', name: 'United States' });
export const getCountry_2 = (): GeneralModel.INamedEntity => ({ id: 'uuid-2', code: 'MX', name: 'Mexico' });
export const getCountry_3 = (): GeneralModel.INamedEntity => ({ id: 'uuid-3', code: 'PR', name: 'Puerto Rico' });
export const getCountry_4 = (): GeneralModel.INamedEntity => ({ id: 'uuid-4', code: 'CA', name: 'Canada' });

export const getTimeZone_1 = (): GeneralModel.INamedEntity => ({ id: '155dc3dc-98d5-11eb-a8b3-0242ac130003', name: 'UTC-3' });

export const getAddress_1 = (): AddressModel.IAddress => ({
  line1: '21 Street',
  line2: 'Apt 3',
  city: 'Dallas',
  stateCode: 'TX',
  zipCode: '12345',
  latitude: 1234,
  longitude: 5678,
  countryId: getCountry_1().id,
  stateName: null,
});

export const getAddress_2 = (): AddressModel.IAddress => ({
  line1: '21 Street',
  line2: '',
  city: '',
  countryId: null,
  stateCode: 'TX',
  zipCode: '12345',
  latitude: 3212,
  longitude: 5678,
});

export const getBillingTier_1 = (): ProjectModel.IBillingTier => ({
  id: '1',
  top: 100,
  bottom: 1,
  price: 15,
});

export const getBillingTier_2 = (): ProjectModel.IBillingTier => ({
  id: '2',
  top: 500,
  bottom: 101,
  price: 12,
});

export const getBillingTier_3 = (): ProjectModel.IBillingTier => ({
  id: '3',
  top: null,
  bottom: 501,
  price: 10,
});

export const getBillingTierList_1 = (): ProjectModel.IBillingTier[] => [getBillingTier_1(), getBillingTier_2(), getBillingTier_3()];

export const getProjectClientPagination_1 = (): GeneralModel.IPagination<ClientModel.IClient> => ({
  items: [getClient_1()],
  pageNumber: 1,
  totalResults: 1,
  pageSize: 1,
});

export const getAccessControlSystemDevice_1 = (): AccessControlSystemModel.IAccessControlSystem => ({
  id: '13315742-0a3a-4916-af26-e983632a6484',
  type: AccessControlSystemModel.AccessControlSystemType.TURNSTILE,
  serialNumber: 'NRFFJE3149 - 4991',
  lifeCycle: 0,
  lastRefurbishedDate: 1589883810049 as any,
  lastMaintenanceDate: 1589883810049 as any,
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  project: {
    id: 'acsId',
    name: 'Orlando International Airport',
  },
  status: DeviceModel.DeviceStatus.AVAILABLE,
  notes: 'Working Properly',
  version: AccessControlSystemModel.AccessControlSystemVersion.V3_FACIAL,
  location: { id: 'locationId', name: 'Front gate' },
  reader1: {
    serialNumber: 'MXT-NEKFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 4923',
    notes: 'Working properly as well.',
    directionType: null,
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
  reader2: {
    serialNumber: 'TMX-ZZZFOEFJ312F0',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 7218',
    notes: 'Working properly as well.',
    directionType: AccessControlSystemModel.ReaderType.BiDirectionalBySpec,
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
});

export const getAccessControlSystemDevice_3 = (): AccessControlSystemModel.IAccessControlSystem => ({
  id: '13315742-0a3a-4916-af26-e983632a6484',
  deviceName: 'Test turnstile',
  type: AccessControlSystemModel.AccessControlSystemType.TURNSTILE,
  serialNumber: 'NRFFJE3149 - 4991',
  lifeCycle: 0,
  lastRefurbishedDate: 1589883810049 as any,
  lastMaintenanceDate: 1589883810049 as any,
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  project: {
    id: 'acsId',
    name: 'Orlando International Airport',
  },
  status: DeviceModel.DeviceStatus.AVAILABLE,
  notes: 'Working Properly',
  version: AccessControlSystemModel.AccessControlSystemVersion.V3_FACIAL,
  location: { id: 'locationId', name: 'Back gate' },
  reader1: {
    serialNumber: 'MXT-NEKFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 4923',
    notes: 'Working properly as well.',
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
});

export const getAccessControlSystemDevice_2 = (): AccessControlSystemModel.IAccessControlSystem => ({
  id: 'e9624709-bd54-4968-b93e-1f5f62d99657',
  type: AccessControlSystemModel.AccessControlSystemType.HANDHELD,
  serialNumber: 'NSDFJE3129 - 3354',
  lifeCycle: 1,
  lastRefurbishedDate: 1589883810049 as any,
  lastMaintenanceDate: 1589883810049 as any,
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  project: {
    id: 'acsId',
    name: 'Orlando International Airport',
  },
  status: DeviceModel.DeviceStatus.ASSIGNED,
  notes: 'Working Properly',
  version: AccessControlSystemModel.AccessControlSystemVersion.V3,
  reader1: {
    serialNumber: 'MXT-NEKFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 4923',
    notes: 'Working properly as well.',
    directionType: AccessControlSystemModel.ReaderType.Entrance,
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
});

export const getAccessControlSystemDevice_4 = (): AccessControlSystemModel.IAccessControlSystem => ({
  id: 'e9624709-bd54-4968-b93e-1f5f62d99657',
  deviceName: 'Test handheld',
  type: AccessControlSystemModel.AccessControlSystemType.HANDHELD,
  serialNumber: 'NSDFJE3129 - 3354/2',
  lifeCycle: 1,
  lastRefurbishedDate: 1589883810049 as any,
  lastMaintenanceDate: 1589883810049 as any,
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  project: {
    id: 'acsId',
    name: 'Orlando International Airport',
  },
  status: DeviceModel.DeviceStatus.AVAILABLE,
  notes: 'Working Properly',
  version: AccessControlSystemModel.AccessControlSystemVersion.V3,
  reader1: {
    serialNumber: 'MXT-NEKFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 4923',
    notes: 'Working properly as well.',
    directionType: AccessControlSystemModel.ReaderType.Entrance,
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
});

export const getPrinter_1 = (): BadgePrintingSystemModel.IPrinter => ({
  price: 300,
  vendor: 'vendor',
  orderDate: 1589883810049 as any,
  invoice: 'invoice',
  model: 'model type',
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  serialNumber: '12904328913',
  notes: 'some note',
  lastMaintenanceDate: 1589883810049 as any,
  type: BadgePrintingSystemModel.PrinterType.ZEBRA,
});

export const getPrinter_2 = (): BadgePrintingSystemModel.IPrinter => ({
  price: 378,
  vendor: 'vendor 2',
  orderDate: 1589883810049 as any,
  invoice: 'invoice 2',
  model: 'model type',
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  serialNumber: '332182912',
  notes: 'note printer 2',
  lastMaintenanceDate: 1589883810049 as any,
  type: BadgePrintingSystemModel.PrinterType.DATA_CARD,
});

export const getLaptop_1 = (): BadgePrintingSystemModel.ILaptop => ({
  price: 3200,
  vendor: 'Lenovo',
  orderDate: 1589883810049 as any,
  invoice: 'invoice number',
  model: 'thinkpad x1',
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  serialNumber: 'AFF12903112',
  notes: 'notes',
  osVersion: '18.0.1',
});

export const getScanner_1 = (): BadgePrintingSystemModel.IBadgePrintingDevice => ({
  price: 1000,
  vendor: 'vendor',
  orderDate: 1589883810049 as any,
  invoice: 'invoice',
  model: 'model',
  inServiceDate: 1589883810049 as any,
  warrantyExpirationDate: 1589883810049 as any,
  serialNumber: 'BBF19021',
  notes: '',
});

export const getBadgePrinterSystem_1 = (): BadgePrintingSystemModel.IBadgePrintingSystem => ({
  id: '77afbfce-1bca-31c3-b512-3a1ed78742bb',
  notes: 'some notes',
  name: 'Badge Printer Name',
  shippingDate: 1589883810049 as any,
  status: DeviceModel.DeviceStatus.AVAILABLE,
  laptop: getLaptop_1(),
  printer: getPrinter_1(),
  scanner: getScanner_1(),
  badgePrintingSystem: { id: '77afbfce-1bca-31c3-b512-3a1ed78742bb', name: 'Badge Printer Name' },
  laptopSerialNumber: getLaptop_1().serialNumber,
  printerSerialNumber: getPrinter_1().serialNumber,
  scannerSerialNumber: getScanner_1().serialNumber,
});

export const getBadgePrinterSystem_2 = (): BadgePrintingSystemModel.IBadgePrintingSystem => ({
  id: '6631aacb-21fa-91cc-c5ff-55b12cbaf33b',
  notes: 'notes 2',
  name: 'Badge Printer Name 2',
  shippingDate: 1589883810049 as any,
  status: DeviceModel.DeviceStatus.ASSIGNED,
  laptop: getLaptop_1(),
  printer: getPrinter_2(),
  scanner: getScanner_1(),
  laptopSerialNumber: getLaptop_1().serialNumber,
  printerSerialNumber: getPrinter_2().serialNumber,
  scannerSerialNumber: getScanner_1().serialNumber,
});

export const getEthnicity_1 = (): WorkerModel.IEthnicity => ({
  id: '89185dc1-5330-45f9-9614-45e075874292',
  name: 'Latin',
});

export const getPrimaryLanguage_1 = (): WorkerModel.ILanguage => ({
  id: '37cfe470-52ea-4010-9b0c-dccec654c9b4',
  name: 'English',
});

export const getPrimaryLanguage_other = (): WorkerModel.ILanguage => ({
  id: 'primaryLanguageOtherOptionId',
  name: 'Other',
});

export const getJobTitle_1 = (): WorkerModel.IJobTitle => ({
  id: '92eb4216-3b32-49e1-a6d3-c3ba642287cc',
  name: 'Electrician',
});

export const getTradeStatus_1 = (): WorkerModel.ITradeStatus => ({
  id: '1d2db4b7-10ce-4ad0-a45a-bb4efb537482',
  name: 'Apprentice',
});

export const getSkilledTrade_1 = (): WorkerModel.ISkilledTrade => ({
  id: 'fdad83be-8bcc-488e-9f38-2db4d6f4ef20',
  name: 'Ceiling',
});

export const getSkilledTrade_Other = (): WorkerModel.ISkilledTrade => ({
  id: 'otherTradeId',
  name: 'Other',
});

export const getIdentificationType_1 = (): WorkerModel.IIdentificationType => ({
  id: '4a49860b-5035-429c-892d-551c514a73a9',
  name: 'Driver License',
  geographicLocationsIds: ['d43dbc1e-adab-4262-940f-281cce6daa8c'],
});

export const getGeographicLocation_1 = (): WorkerModel.IGeographicLocation => ({
  id: 'd43dbc1e-adab-4262-940f-281cce6daa8c',
  name: 'United States',
  type: 1,
});

export const getIdentificationGeographicLocation_1 = (): WorkerModel.IIdentificationGeographicLocation => ({
  id: 'd43dbc1e-adab-4262-940f-281cce6daa8c',
  name: 'United States',
});

export const getSocJobTitle_1 = (): WorkerModel.ISOCJobTitle => ({
  id: '00aadb03-0f7a-4e8d-8b85-2693964d50b3',
  name: 'Carpenters',
});

export const getLanguageTurnerProtocol_1 = (): WorkerModel.ILanguageTurnerProtocol => ({
  id: 'fe61560b-78f5-4303-96b1-fbe43b6f4f39',
  name: 'English',
});

export const getWorker_1 = (): WorkerModel.IWorker => ({
  id: '11029ead-e3eb-48d5-a658-cd818a70719f',
  firstName: 'John',
  middleName: 'Michael',
  lastName: 'Doe',
  mobilePhoneNumber: '+16122222222',
  email: 'test@test.com',
  dateOfBirth: getDate_1(),
  gender: 0,
  ethnicity: getEthnicity_1(),
  ethnicityId: getEthnicity_1().id,
  socialSecurityNumber: '123456789',
  isVeteran: false,
  allergies: null,
  primaryLanguage: getPrimaryLanguage_1(),
  primaryLanguageId: getPrimaryLanguage_1().id,
  phoneNumber: '',
  identificationType: getIdentificationType_1(),
  identificationTypeId: getIdentificationType_1().id,
  identificationNumber: '11223344',
  identificationGeographicLocation: getIdentificationGeographicLocation_1(),
  identificationGeographicLocationId: getIdentificationGeographicLocation_1().id,
  otherTrade: 'Plumbing',
  address: getAddress_1(),
  emergencyContactName: 'Jane',
  emergencyContactPhone: '',
  emergencyContactRelationship: 'Wife',
  isSkilled: true,
  isSupervisor: false,
  laborUnionNumber: null,
  trades: [getSkilledTrade_1()],
  tradesIds: [getSkilledTrade_1().id],
  invitationStatus: WorkerModel.WorkerStatus.ACTIVE,
  isAffiliatedToLaborUnion: false,
  inviteMethod: WorkerModel.InviteMethod.MOBILE_PHONE,
  ...getAddress_1(),
});

export const getWorker_2 = (): WorkerModel.IWorker => ({
  id: '11029ead-e34c-48d5-a658-c1241d70719f',
  firstName: 'Christian',
  middleName: 'Michael',
  lastName: 'Ristango',
  mobilePhoneNumber: '',
  email: 'christian@test.com',
  dateOfBirth: getDate_1(),
  gender: 0,
  ethnicity: getEthnicity_1(),
  ethnicityId: getEthnicity_1().id,
  socialSecurityNumber: '123456789',
  isVeteran: false,
  allergies: null,
  primaryLanguage: getPrimaryLanguage_1(),
  primaryLanguageId: getPrimaryLanguage_1().id,
  phoneNumber: '',
  identificationType: getIdentificationType_1(),
  identificationTypeId: getIdentificationType_1().id,
  identificationNumber: '11223344',
  identificationGeographicLocation: getIdentificationGeographicLocation_1(),
  identificationGeographicLocationId: getIdentificationGeographicLocation_1().id,
  otherTrade: 'Plumbing',
  address: getAddress_1(),
  emergencyContactName: 'Jane',
  emergencyContactPhone: '',
  emergencyContactRelationship: 'Wife',
  isSkilled: true,
  isSupervisor: false,
  laborUnionNumber: null,
  trades: [getSkilledTrade_1()],
  tradesIds: [getSkilledTrade_1().id],
  invitationStatus: WorkerModel.WorkerStatus.MIGRATED,
  isAffiliatedToLaborUnion: false,
  inviteMethod: WorkerModel.InviteMethod.MOBILE_PHONE,
  company: {
    id: getClient_1().id,
    name: getClient_1().name,
  },
  ...getAddress_1(),
});

export const getWorkerStatistics_1 = (): StatisticsModel.IWorkerStatistics => ({
  active: 1256,
  sent: 12,
  expired: 5,
  migrated: 234,
  pendingRegistration: 4,
});

export const getWorkerTrainingFile_1 = (): FileModel.IFilePreview => ({
  displayName: 'test.png',
  fileSize: 123748,
  url: 's3://url/path/to/test.png',
});

export const getWorkerCertificationFile_1 = (): CertificationModel.IWorkerCertificationFile => ({
  displayName: 'test.png',
  fileSize: 123748,
  url: 's3://url/path/to/test.png',
});

export const getWorkerTraining_1 = (): TrainingModel.IWorkerTraining => ({
  id: '22a1ccb5-60cf-ffa0-263b-cc4efb51174ff',
  trainingId: 'worker training',
  training: getTraining_1(),
  trainerName: 'Alfred Henry',
  trainerBadgeCode: 'TD18NG',
  project: { id: getProject_1().id, name: getProject_1().name },
  description: 'description',
  completionDate: 1589883810049 as any,
  files: [getWorkerTrainingFile_1()],
  index: 0,
});

export const getWorkerTraining_2 = (): TrainingModel.IWorkerTraining => ({
  id: '22a1ccb5-60cf-ffa0-263b-cc4efb51174ff',
  trainingId: getTraining_2().id,
  training: getTraining_2(),
  trainerName: 'Relf Harold',
  trainerBadgeCode: 'NF13CF',
  project: { id: getProject_2().id, name: getProject_2().name },
  description: 'description',
  completionDate: null,
  index: 1,
});

export const getWorkerTraining_3 = (): TrainingModel.IWorkerTraining => ({
  id: '441f2ccb5-60cf-ffa0-263b-fa4efb5117455',
  trainingId: getTraining_2().id,
  training: getTraining_2(),
  trainerName: 'Joe Dawson',
  trainerBadgeCode: null,
  project: { id: getProject_2().id, name: getProject_2().name },
  description: 'description',
  completionDate: null,
  index: 2,
});

export const getWorkerTraining_4 = (): TrainingModel.IWorkerTraining => ({
  id: '31c99f51-d2e6-4d1b-b36d-5953c76d5c29',
  trainingId: getTraining_2().id,
  training: getTraining_2(),
  trainerName: null,
  trainerBadgeCode: null,
  project: { id: getProject_2().id, name: getProject_2().name },
  description: 'description',
  completionDate: null,
});

export const getWorkerCertification_1 = (): CertificationModel.IWorkerCertification => ({
  id: '22a1ccb5-60cf-ffa0-263b-cc4efb51174ff',
  certificationId: 'worker certification',
  certification: getCertification_1(),
  idNumber: '1892132',
  project: { id: getProject_1().id, name: getProject_1().name },
  description: 'description',
  completionDate: getDate_1(),
  expirationDate: getDate_1(),
  files: [getWorkerCertificationFile_1()],
  index: 0,
});

export const getWorkerCertification_2 = (): CertificationModel.IWorkerCertification => ({
  id: '22a1ccb5-60cf-ffa0-263b-cc4efb51174fg',
  certificationId: getCertification_2().id,
  certification: getCertification_2(),
  idNumber: '329812',
  project: { id: getProject_2().id, name: getProject_2().name },
  description: 'description',
  completionDate: null,
  expirationDate: null,
  index: 1,
});

export const getWorkerCertification_3 = (): CertificationModel.IWorkerCertification => ({
  id: '441f2ccb5-60cf-ffa0-263b-fa4efb5117455',
  certificationId: getCertification_2().id,
  certification: getCertification_2(),
  idNumber: '',
  project: { id: getProject_2().id, name: getProject_2().name },
  description: 'description',
  completionDate: null,
  expirationDate: null,
  index: 2,
});
export const getWorkerCertification_4 = (): CertificationModel.IWorkerCertification => ({
  id: '31c99f51-d2e6-4d1b-b36d-5953c76d5c29',
  certificationId: getCertification_2().id,
  certification: getCertification_2(),
  idNumber: '',
  project: { id: getProject_2().id, name: getProject_2().name },
  description: 'description',
  completionDate: null,
  expirationDate: null,
});

export const getProjectStatistics_1 = (): StatisticsModel.IResourceStatistics => ({
  draft: 99,
  pendingApproval: 99,
  active: 99,
});

export const getCompanyProjectStatistics_1 = (): StatisticsModel.IProjectStatistics => ({
  draft: 99,
  pendingApproval: 99,
  active: 99,
  billing: 100,
  accepted: 10,
});

export const getClientStatistics_1 = (): StatisticsModel.IResourceStatistics => ({
  draft: 99,
  pendingApproval: 99,
  active: 99,
});

export const getInventoryStatistics_1 = (): StatisticsModel.IInventoryStatistics => ({
  assignedDevices: 35,
  availableAccessControlSystems: 99,
  availableBadgePrintingSystems: 99,
});

export const getFile_1 = (): Partial<File> => ({
  name: 'test.png',
  size: 13290,
  type: 'images/png',
});

export const getFile_2 = (): Partial<File> => ({
  name: 'test-2.jpg',
  size: 12902,
  type: 'images/jpeg',
});

export const getFile_3 = (): Partial<File> => ({
  name: 'test.exe',
  size: 400,
  type: 'executable',
});

export const getFile_4 = (): Partial<File> => ({
  name: 'test.png',
  size: 237812932102,
  type: 'executable',
});

export const getUploadFile_1 = (): FileModel.IFile => ({
  ...FileModel.getFallbackFile(getFile_1(), 'test-upload-id'),
  id: 'upload-id-1',
  status: 0,
});
export const getUploadFile_2 = (): FileModel.IFile => ({
  ...FileModel.getFallbackFile(getFile_2(), 'test-upload-id'),
  id: 'upload-id-2',
  status: FileModel.FileStatus.PROGRESS,
});
export const getUploadFile_3 = (): FileModel.IFile => ({
  ...FileModel.getFallbackFile(getFile_2(), 'test-upload-id'),
  id: 'upload-id-3',
  progress: 100,
  status: FileModel.FileStatus.FAIL,
});
export const getUploadFile_4 = (): FileModel.IFile => ({
  ...FileModel.getFallbackFile(getFile_3(), 'test-upload-id'),
  id: 'upload-id-4',
  progress: 0,
  status: FileModel.FileStatus.FAIL,
  error: 'Server Error',
});
export const getUploadFile_5 = (): FileModel.IFile => ({
  ...FileModel.getFallbackFile(getFile_4(), 'test-upload-id'),
  id: 'upload-id-5',
  progress: 0,
  status: FileModel.FileStatus.INACTIVE,
  error: null,
});

export const getFileResource_1 = (): FileModel.IS3FileResponse => ({
  fileId: '181b551f-dc88-42e6-aaef-5fd24c96b694',
  url: 'http://file-resource-url/path/to/image.png',
  fileName: 'image.png',
});

export const getFileResource_2 = (): FileModel.IS3FileResponse => ({
  fileId: '181b551f-dc88-42e6-aaef-5fd24c96b694',
  url: 'http://file-resource-url/path/to/image-2.png',
  fileName: 'image-2.png',
});

export const getBadge_1 = (): BadgeModel.IBadge => ({
  id: '77b6f7d3-5866-40f2-bbeb-ea9dc74cb763',
  tagId: '123456789112',
  badgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
  status: BadgeModel.BadgeStatus.DEACTIVATE,
  firstName: 'badge name deactive',
  lastName: 'badge lastname deactive',
  emergencyContactName: 'emergency contact deactive',
  emergencyContactPhone: '218-378-8381',
  emergencyContactRelationship: 'Wife',
  companyName: 'Some Company',
  code: '9317821',
  hardHatNumber: '1829132',
  pictureUrl: null,
  badgeType: BadgeModel.BadgeType.UNIVERSAL,
  consentFormSigned: false,
  trainingsCompleted: true,
  certificationsCompleted: true,
  workerProjectStatus: 1,
  defaultExpirationDate: null,
});

export const getBadge_2 = (): BadgeModel.IBadge => ({
  id: '1a7cba28-0cf2-55a1-bcf2-247264c75d22',
  badgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
  status: BadgeModel.BadgeStatus.ACTIVE,
  firstName: 'badge name active',
  lastName: 'badge lastname active',
  emergencyContactName: 'emergency contact active',
  emergencyContactPhone: '218-378-8381',
  emergencyContactRelationship: 'Wife',
  companyName: 'Some Company',
  code: '9317821',
  hardHatNumber: '1829132',
  pictureUrl: null,
  expirationDate: '123190231221',
  badgeType: BadgeModel.BadgeType.UNIVERSAL,
  consentFormSigned: true,
  trainingsCompleted: true,
  certificationsCompleted: true,
  workerProjectStatus: 1,
  defaultExpirationDate: null,
});

export const getBadge_3 = (): BadgeModel.IBadge => ({
  id: '73ccba24-0cf2-d9a1-4aff-7f7264c75d5c',
  badgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
  status: BadgeModel.BadgeStatus.REVOKED,
  firstName: 'badge name revoked',
  lastName: 'badge lastname revoed',
  emergencyContactName: 'emergency contact revoked',
  emergencyContactPhone: '218-378-8381',
  emergencyContactRelationship: 'Wife',
  companyName: 'Some Company',
  code: '9317821',
  hardHatNumber: '1829132',
  pictureUrl: null,
  defaultExpirationDate: null,
});

export const getConsentForm_1 = (): ConsentFormModel.IConsentForm => ({
  id: '65ccba24-f14e-daab-1ffc-7f7264c75444',
  firstName: 'Christian',
  middleName: 'Manuel',
  lastName: 'Ristango',
  mobilePhoneNumber: '+12133734253',
  email: 'some@email.test',
  dateOfBirth: getDate_1(),
  gender: 0,
  ethnicity: getEthnicity_1(),
  socialSecurityNumber: '123456789',
  isVeteran: false,
  primaryLanguage: getPrimaryLanguage_1(),
  phoneNumber: '+12133734253',
  otherProjectSkilledTrade: 'TEST',
  identificationNumber: '11223344',
  identificationType: getIdentificationType_1(),
  identificationGeographicLocation: getIdentificationGeographicLocation_1(),
  jobTitle: getJobTitle_1(),
  jobTitleId: getJobTitle_1().id,
  tradeStatus: getTradeStatus_1(),
  tradeStatusId: getTradeStatus_1().id,
  otherTrade: 'Plumbing',
  address: AddressModel.getFallbackAddress(),
  emergencyContactName: 'Jane',
  emergencyContactPhone: '+12133734253',
  emergencyContactRelationship: 'Wife',
  isSkilled: true,
  isSupervisor: false,
  company: { id: '2', name: 'Warren Brothers Construction' },
  allergies: null,
  paymentType: WorkerModel.PaymentType.HOURLY,
  isAffiliatedToLaborUnion: false,
  laborUnionNumber: '373425',
  yearsOfExperience: 1,
  socJobTitle: getSocJobTitle_1(),
  socJobTitleId: getSocJobTitle_1().id,
  licensePlate: null,
  invitationStatus: WorkerModel.WorkerProjectInvitationStatus.ACTIVE,
  trades: getTrades_1(),
  skilledTrades: getTrades_1(),
  signatureUrl: 'test',
  supervisorPhone: '+1 (213) 431-4343',
  hardHatNumber: '324123',
  supervisorName: 'supervisor name',
  section3Employee: 0,
  referredById: '1',
  projectId: '65ccba24-f14e-daab-1ffc-7f7264c75444',
  dateOfHire: 1594828379742 as any,
  consentFormFields: [
    {
      name: 'Job Title',
      code: 'JOB_TITLE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 0,
      id: '724aebdf-f8d4-4c26-89b4-b0c516eda107',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Trade Status',
      code: 'TRADE_STATUS',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 1,
      id: '679ade51-bb2a-4be4-b228-f9df58c68eab',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Last 4 SSN',
      code: 'LAST_4_SSN',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 1,
      order: 2,
      id: '52bcd3ec-9dfb-4250-833e-69165a09018a',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Supervisor Name',
      code: 'SUPERVISOR_NAME',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 1,
      order: 3,
      id: '25ee236e-e57d-462d-b738-29495a930ee1',
      createdAt: '2020-10-20T17:44:18.774064',
    },
    {
      name: 'Supervisor Phone',
      code: 'SUPERVISOR_PHONE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 3,
      order: 4,
      id: '577525c3-ce59-48d6-8237-3a50bbbff0b7',
      createdAt: '2020-10-20T17:44:18.774065',
    },
    {
      name: 'Section 3 Employee',
      code: 'SECTION_3_EMPLOYEE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 5,
      id: '20ad0c1a-3600-4344-bdb5-4b1e6741ee21',
      createdAt: '2020-10-20T17:44:18.774063',
    },
    {
      name: 'Section 3 Resident',
      code: 'SECTION_3_RESIDENT',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 6,
      id: 'b68defca-1b0b-40ad-9cc3-48ac7e6bd48c',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'STEP Status',
      code: 'STEP_STATUS',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 7,
      id: 'abee068b-e8bd-4ba0-bff3-5a74acac26cc',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Date of Hire',
      code: 'DATE_OF_HIRE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 4,
      order: 8,
      id: 'b2fa9f81-d2da-44a1-b33d-4de2cc4bc508',
      createdAt: '2020-10-20T17:44:18.774061',
    },
    {
      name: 'Eligible To Work In Us',
      code: 'ELIGIBLE_TO_WORK_IN_US',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 9,
      id: '42d4eaec-5777-46e0-b5f3-ef467cb69f5a',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'SOC Job Title',
      code: 'SOC_JOB_TITLE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 10,
      id: '569cf404-301f-49f9-907e-99da39d580bd',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Years of Experience',
      code: 'YEARS_OF_EXPERIENCE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 11,
      id: '65faf605-30bd-4ebc-82ba-d0688ce1be2f',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Payment Type',
      code: 'PAYMENT_TYPE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 12,
      id: '5f8d0f22-28d2-4a66-87df-0d1da32f5823',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Hourly Rate of Pay',
      code: 'HOURLY_RATE_PAY',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 1,
      order: 13,
      id: 'ca4c0101-a239-4232-90dd-cf618423274a',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Vehicle Information',
      code: 'VEHICLE_INFORMATION',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 14,
      id: '9aa33953-d0b1-430e-a8ac-7716787a3b04',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Language of Turner Protocol',
      code: 'LANGUAGE_TURNER_PROTOCOL',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 15,
      id: 'ce9817bf-e3e3-4f22-a7b7-50455f4f8a3d',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'LGBTQ',
      code: 'LGBTQ',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 2,
      order: 16,
      id: '76dd454a-62f1-4c95-b774-39ce0b856536',
      createdAt: '2021-06-02T18:43:28.92491',
    },
    {
      name: 'Project Trade',
      code: 'PROJECT_SKILLED_TRADE',
      options: [],
      defaultValue: null,
      isMandatory: true,
      dataType: 5,
      order: 17,
      id: '00000000-0000-0000-0000-000000000000',
      createdAt: '2021-06-02T18:43:28.92491',
    },
  ],
  createdAt: 1594828379742 as any,
  languageTurnerProtocol: getLanguageTurnerProtocol_1(),
  languageTurnerProtocolId: getLanguageTurnerProtocol_1().id,
  projectSkilledTrade: getSkilledTrade_1(),
  projectSkilledTradeId: getSkilledTrade_1().id,
  hourlyRatePay: 1234,
  section3Resident: 0,
  stepStatus: 0,
  eligibleToWorkInUs: 0,
  lgbtq: 0,
  legalInformation:
    'Lea atentamente la sección Consentimiento del usuario ("Consentimiento del usuario", "Consentimiento"). Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de este Consentimiento.\n\nSu empleador o contratista general controlador requiere Field Control Analytics ("nosotros", "nosotros" o "nuestro"). Recopilamos cierta información sobre cada individuo con acceso a esta aplicación móvil. Entiendo que mi foto digital se utilizará con fines de identificación. Entiendo y estoy de acuerdo con lo siguiente:\n\n1. Mi foto se puede utilizar con fines de identificación relacionados con esta aplicación móvil.\n\n2. Los datos capturados a través de esta aplicación móvil pueden compartirse con el contratista general o su agente autorizado.\n\n3. Entiendo y acepto que ciertos datos personales pueden ser compartidos con Contratistas Generales o su agente autorizado.\n\n4. Entiendo que se me puede solicitar que realice una encuesta de certificación COVID-19 todos los días antes de ingresar al lugar de trabajo para ayudar al contratista general o al gerente del lugar de trabajo en el trabajo en sus esfuerzos por prevenir la propagación del coronavirus en el lugar de trabajo.\n\n5. Entiendo que esta encuesta está disponible para mí electrónicamente a través de una aplicación móvil ofrecida por Field Control Analytics Inc. ("FCA"). Entiendo que el uso de la aplicación móvil para la encuesta es un requisito para mantener el estado de mi insignia activa. Entiendo que la información que proporcione a través de esta solicitud solo se compartirá con el contratista general y / o el administrador del lugar de trabajo, y no será almacenada, retenida ni utilizada por FCA para ningún otro propósito.',
  consentFormName: 'Términos y condiciones para la plataforma y aplicación móvil FCA Freedom',
});

export const getConsentForm_2 = (): ConsentFormModel.IConsentForm => ({
  id: 'bac88a24-e14e-daac-1ffa-ac7264c75314',
  firstName: 'Christian',
  middleName: 'Manuel',
  lastName: 'Ristango',
  mobilePhoneNumber: '+12133734253',
  email: 'some@email.test',
  dateOfBirth: getDate_1(),
  gender: 0,
  ethnicity: getEthnicity_1(),
  socialSecurityNumber: '123456789',
  isVeteran: false,
  primaryLanguage: getPrimaryLanguage_1(),
  phoneNumber: '+12133734253',
  identificationNumber: '11223344',
  identificationType: getIdentificationType_1(),
  identificationGeographicLocation: getIdentificationGeographicLocation_1(),
  jobTitle: getJobTitle_1(),
  jobTitleId: getJobTitle_1().id,
  tradeStatus: getTradeStatus_1(),
  tradeStatusId: getTradeStatus_1().id,
  otherTrade: 'Plumbing',
  address: AddressModel.getFallbackAddress(),
  emergencyContactName: 'Jane',
  emergencyContactPhone: '+12133734253',
  emergencyContactRelationship: 'Wife',
  isSkilled: true,
  isSupervisor: false,
  company: { id: '2', name: 'Warren Brothers Construction' },
  allergies: null,
  paymentType: WorkerModel.PaymentType.HOURLY,
  isAffiliatedToLaborUnion: false,
  laborUnionNumber: '373425',
  yearsOfExperience: 1,
  socJobTitle: getSocJobTitle_1(),
  socJobTitleId: getSocJobTitle_1().id,
  licensePlate: null,
  invitationStatus: WorkerModel.WorkerProjectInvitationStatus.ACTIVE,
  trades: getTrades_1(),
  skilledTrades: getTrades_1(),
  signatureUrl: 'test',
  supervisorPhone: '+1 (213) 431-4343',
  hardHatNumber: '324123',
  supervisorName: null,
  section3Employee: null,
  referredById: null,
  dateOfHire: null,
  consentFormFields: [
    {
      id: '1',
      name: 'supervisorName',
      code: 'SUPERVISOR_NAME',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 1,
    },
    {
      id: '2',
      name: 'section3Employee',
      code: 'SECTION_3_EMPLOYEE',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 2,
    },
    {
      id: '3',
      name: 'supervisorPhone',
      code: 'SUPERVISOR_PHONE',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 3,
    },
    {
      id: '4',
      name: 'hardHatNumber',
      code: 'HARD_HAT_NUMBER',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 4,
    },
    {
      id: '5',
      name: 'referredById',
      options: [
        { id: '1', name: 'referred 1' },
        { id: '2', name: 'referred 2' },
      ],
      code: 'REFERRED_BY',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 5,
    },
    {
      id: '6',
      name: 'dateOfHire',
      code: 'DATE_OF_HIRE',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 6,
    },
  ],
  createdAt: 1594828379742 as any,
  languageTurnerProtocol: getLanguageTurnerProtocol_1(),
  languageTurnerProtocolId: getLanguageTurnerProtocol_1().id,
  projectSkilledTrade: getSkilledTrade_1(),
  projectSkilledTradeId: getSkilledTrade_1().id,
  hourlyRatePay: 1234,
  section3Resident: 0,
  stepStatus: 0,
  eligibleToWorkInUs: 0,
  lgbtq: 0,
  legalInformation:
    'Lea atentamente la sección Consentimiento del usuario ("Consentimiento del usuario", "Consentimiento"). Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de este Consentimiento.\n\nSu empleador o contratista general controlador requiere Field Control Analytics ("nosotros", "nosotros" o "nuestro"). Recopilamos cierta información sobre cada individuo con acceso a esta aplicación móvil. Entiendo que mi foto digital se utilizará con fines de identificación. Entiendo y estoy de acuerdo con lo siguiente:\n\n1. Mi foto se puede utilizar con fines de identificación relacionados con esta aplicación móvil.\n\n2. Los datos capturados a través de esta aplicación móvil pueden compartirse con el contratista general o su agente autorizado.\n\n3. Entiendo y acepto que ciertos datos personales pueden ser compartidos con Contratistas Generales o su agente autorizado.\n\n4. Entiendo que se me puede solicitar que realice una encuesta de certificación COVID-19 todos los días antes de ingresar al lugar de trabajo para ayudar al contratista general o al gerente del lugar de trabajo en el trabajo en sus esfuerzos por prevenir la propagación del coronavirus en el lugar de trabajo.\n\n5. Entiendo que esta encuesta está disponible para mí electrónicamente a través de una aplicación móvil ofrecida por Field Control Analytics Inc. ("FCA"). Entiendo que el uso de la aplicación móvil para la encuesta es un requisito para mantener el estado de mi insignia activa. Entiendo que la información que proporcione a través de esta solicitud solo se compartirá con el contratista general y / o el administrador del lugar de trabajo, y no será almacenada, retenida ni utilizada por FCA para ningún otro propósito.',
  consentFormName: 'Términos y condiciones para la plataforma y aplicación móvil FCA Freedom',
});

export const getConsentForm_3 = (): ConsentFormModel.IConsentForm => ({
  id: 'c9912ab4-e14e-daac-1ffa-ccab64c75212',
  firstName: 'Christian',
  middleName: 'Manuel',
  lastName: 'Ristango',
  mobilePhoneNumber: '+12133734253',
  email: 'some@email.test',
  dateOfBirth: getDate_1(),
  gender: 0,
  ethnicity: getEthnicity_1(),
  socialSecurityNumber: '123456789',
  isVeteran: false,
  primaryLanguage: getPrimaryLanguage_1(),
  phoneNumber: '+12133734253',
  identificationNumber: '11223344',
  identificationType: getIdentificationType_1(),
  identificationGeographicLocation: getIdentificationGeographicLocation_1(),
  jobTitle: getJobTitle_1(),
  jobTitleId: getJobTitle_1().id,
  tradeStatus: getTradeStatus_1(),
  tradeStatusId: getTradeStatus_1().id,
  otherTrade: 'Plumbing',
  address: AddressModel.getFallbackAddress(),
  emergencyContactName: 'Jane',
  emergencyContactPhone: '+12133734253',
  emergencyContactRelationship: 'Wife',
  isSkilled: true,
  isSupervisor: false,
  company: { id: '2', name: 'Warren Brothers Construction' },
  allergies: null,
  paymentType: WorkerModel.PaymentType.HOURLY,
  isAffiliatedToLaborUnion: false,
  laborUnionNumber: '373425',
  yearsOfExperience: 1,
  socJobTitle: getSocJobTitle_1(),
  socJobTitleId: getSocJobTitle_1().id,
  licensePlate: null,
  invitationStatus: WorkerModel.WorkerProjectInvitationStatus.ACTIVE,
  trades: getTrades_1(),
  skilledTrades: getTrades_1(),
  signatureUrl: 'test',
  supervisorPhone: '+1 (213) 431-4343',
  hardHatNumber: '324123',
  supervisorName: 'supervisor name',
  section3Employee: null,
  referredById: '',
  dateOfHire: null,
  consentFormFields: [
    {
      id: '1',
      name: 'supervisorName',
      code: 'SUPERVISOR_NAME',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 1,
    },
    {
      id: '2',
      name: 'section3Employee',
      code: 'SECTION_3_EMPLOYEE',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 2,
    },
    {
      id: '4',
      name: 'hardHatNumber',
      code: 'HARD_HAT_NUMBER',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 3,
    },
    {
      id: '6',
      name: 'dateOfHire',
      code: 'DATE_OF_HIRE',
      createdAt: '',
      defaultValue: '',
      dataType: 1,
      isMandatory: true,
      order: 4,
    },
  ],
  createdAt: 1594828379742 as any,
  languageTurnerProtocol: getLanguageTurnerProtocol_1(),
  languageTurnerProtocolId: getLanguageTurnerProtocol_1().id,
  projectSkilledTrade: getSkilledTrade_1(),
  projectSkilledTradeId: getSkilledTrade_1().id,
  hourlyRatePay: 1234,
  section3Resident: 0,
  stepStatus: 0,
  eligibleToWorkInUs: 0,
  lgbtq: 0,
  legalInformation:
    'Lea atentamente la sección Consentimiento del usuario ("Consentimiento del usuario", "Consentimiento"). Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de este Consentimiento.\n\nSu empleador o contratista general controlador requiere Field Control Analytics ("nosotros", "nosotros" o "nuestro"). Recopilamos cierta información sobre cada individuo con acceso a esta aplicación móvil. Entiendo que mi foto digital se utilizará con fines de identificación. Entiendo y estoy de acuerdo con lo siguiente:\n\n1. Mi foto se puede utilizar con fines de identificación relacionados con esta aplicación móvil.\n\n2. Los datos capturados a través de esta aplicación móvil pueden compartirse con el contratista general o su agente autorizado.\n\n3. Entiendo y acepto que ciertos datos personales pueden ser compartidos con Contratistas Generales o su agente autorizado.\n\n4. Entiendo que se me puede solicitar que realice una encuesta de certificación COVID-19 todos los días antes de ingresar al lugar de trabajo para ayudar al contratista general o al gerente del lugar de trabajo en el trabajo en sus esfuerzos por prevenir la propagación del coronavirus en el lugar de trabajo.\n\n5. Entiendo que esta encuesta está disponible para mí electrónicamente a través de una aplicación móvil ofrecida por Field Control Analytics Inc. ("FCA"). Entiendo que el uso de la aplicación móvil para la encuesta es un requisito para mantener el estado de mi insignia activa. Entiendo que la información que proporcione a través de esta solicitud solo se compartirá con el contratista general y / o el administrador del lugar de trabajo, y no será almacenada, retenida ni utilizada por FCA para ningún otro propósito.',
  consentFormName: 'Términos y condiciones para la plataforma y aplicación móvil FCA Freedom',
});

export const getWorkerProject_1 = (): ProjectModel.IWorkerProject => ({
  id: 'f5e632f9-0be1-46ab-9a1a-897264c75d5b',
  project: { id: '1', name: 'Project Awesome' },
  jobSiteAddress: getAddress_1(),
  consentForm: getConsentForm_1(),
  workerProjectStatus: ProjectModel.WorkerProjectStatus.ACCEPTED,
  badgeStatus: BadgeModel.BadgeStatus.DEACTIVATE,
  badgeId: getBadge_1().id,
  category: getProjectCategory_1(),
  company: getClient_1(),
  startDate: '123190231221',
  endDate: '2139102930123',
  trades: getTrades_1(),
  scannedFileUrl: null,
  sourceType: 1,
});

export const getWorkerProject_2 = (): ProjectModel.IWorkerProject => ({
  id: 'aa21632f8-ca42-c6ab-251b-297264775d5c',
  project: { id: '2', name: 'Worker Project 2' },
  jobSiteAddress: getAddress_1(),
  consentForm: ConsentFormModel.getFallbackConsentForm(),
  workerProjectStatus: ProjectModel.WorkerProjectStatus.PENDING,
  badgeStatus: BadgeModel.BadgeStatus.ACTIVE,
  badgeId: getBadge_2().id,
  category: getProjectCategory_1(),
  company: getClient_1(),
  startDate: '123190231221',
  endDate: '2139102930123',
  trades: getTrades_1(),
  scannedFileUrl: 'https://www.picsum.com/',
  sourceType: 2,
});

export const getWorkerProject_3 = (): ProjectModel.IWorkerProject => ({
  id: 'aa21632f8-ca42-c6ab-251b-297264775d5c',
  project: { id: '2', name: 'Worker Project 2' },
  jobSiteAddress: getAddress_1(),
  consentForm: ConsentFormModel.getFallbackConsentForm(),
  workerProjectStatus: ProjectModel.workerProjectStatus[ProjectModel.workerProjectStatus[ProjectModel.WorkerProjectStatus.ACCEPTED]],
  badgeStatus: BadgeModel.BadgeStatus.ACTIVE,
  badgeId: getBadge_2().id,
  category: getProjectCategory_1(),
  company: getClient_1(),
  startDate: '123190231221',
  endDate: '2139102930123',
  trades: getTrades_1(),
  scannedFileUrl: null,
  sourceType: 2,
});

export const getWorkerActivity_1 = (): WorkerModel.IWorkerActivity => ({
  id: '1',
  type: 0,
  dateTime: '2020-12-16T00:00:00-03:00',
  location: null,
  project: { id: '1', name: 'prj1' },
});

export const getWorkerObservation_1 = (): WorkerModel.IWorkerObservation => ({
  id: '1',
  type: {
    id: '1',
    name: 'Ladder',
  },
  date: '2020-12-16T00:00:00-03:00',
  project: { id: '1', name: 'prj1' },
  files: [
    {
      displayName: 'test.png',
      fileSize: 123748,
      url: 's3://url/path/to/test.png',
    },
  ],
  standardDescription: { id: '1', name: 'Not using the ladder properly' },
});

export const getProjectBadgeResourceResponse_1 = () => ({
  generalContractorBadgeTemplateLogo: {
    fileId: '1',
    url: '/fake/path',
  },
  subcontractorBadgeTemplateLogo: {
    fileId: '2',
    url: '/fake/path2',
  },
  visitorBadgeTemplateLogo: null,
});

export const getVisitorProject_1 = (): BadgeModel.IBadgeVisitor => ({
  id: 'b04375d8-f122-4675-9a73-a969a5f028d3',
  number: 10,
  code: 'FD60IL',
  firstName: 'Visitor',
  lastName: 'Name 1',
  status: BadgeModel.BadgeStatus.REVOKED,
  availability: BadgeModel.VisitorAvailability.ASSIGNED,
  validFrom: null,
  validTo: null,
  companyId: null,
  entityName: null,
  description: 'description',
  visitorType: BadgeModel.VisitorType.REGULAR,
  visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.ASSIGNED,
});

export const getVisitorProject_2 = (): BadgeModel.IBadgeVisitor => ({
  id: 'ad4f5755-42ed-45b0-bfcb-4ebd232676c2',
  number: 5,
  code: 'QB81PG',
  firstName: 'Visitor',
  lastName: 'Name 2',
  status: BadgeModel.BadgeStatus.ACTIVE,
  availability: BadgeModel.VisitorAvailability.AVAILABLE,
  validFrom: null,
  validTo: null,
  companyId: null,
  entityName: null,
  description: null,
  visitorType: BadgeModel.VisitorType.VIP,
  visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.AVAILABLE,
});

export const getVisitorProject_3 = (): BadgeModel.IBadgeVisitor => ({
  id: 'a213af36-c1d7-41c3-a3c1-39be4c43160a',
  number: 18,
  code: 'WD78XZ',
  firstName: 'Visitor',
  lastName: 'Name 3',
  status: BadgeModel.BadgeStatus.ACTIVE,
  availability: BadgeModel.VisitorAvailability.AVAILABLE,
  validFrom: null,
  validTo: null,
  companyId: 'a213af36-c1d7-41c3-a3c1-39be4c43160a',
  company: { id: 'a213af36-c1d7-41c3-a3c1-39be4c43160a', name: 'company 1' },
  entityName: null,
  description: 'description',
  visitorType: BadgeModel.VisitorType.REGULAR,
  visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.ASSIGNED,
});

export const getVisitorProject_4 = (): BadgeModel.IBadgeVisitor => ({
  id: 'abb21f9f-8c89-4fe5-a466-95fbd7fce077',
  number: 32,
  code: 'EO14BW',
  firstName: 'Visitor',
  lastName: 'Name 4',
  status: BadgeModel.BadgeStatus.REVOKED,
  availability: BadgeModel.VisitorAvailability.ASSIGNED,
  validFrom: 123190231221 as any,
  validTo: 123190231221 as any,
  companyId: null,
  entityName: 'entity name',
  description: null,
  visitorType: BadgeModel.VisitorType.VIP,
  visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.AVAILABLE,
});

export const getVisitorProject_5 = (): BadgeModel.IBadgeVisitor => ({
  id: 'abb21f9f-8c89-4fe5-a466-95fbd7fce077',
  number: 33,
  code: '',
  firstName: null,
  lastName: null,
  status: BadgeModel.BadgeStatus.REVOKED,
  availability: BadgeModel.VisitorAvailability.ASSIGNED,
  validFrom: null,
  validTo: null,
  companyId: null,
  company: { id: null, name: 'company name' },
  entityName: null,
  description: null,
  visitorType: BadgeModel.VisitorType.VIP,
  visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.AVAILABLE,
});

export const getVisitorProject_6 = (): BadgeModel.IBadgeVisitor => ({
  id: 'ccc41f9f-8c89-4fe5-a466-95fbd7fce088',
  number: 34,
  code: '',
  firstName: null,
  lastName: null,
  status: BadgeModel.BadgeStatus.ACTIVE,
  availability: BadgeModel.VisitorAvailability.AVAILABLE,
  validFrom: null,
  validTo: null,
  companyId: null,
  company: { id: null, name: 'company name' },
  entityName: null,
  description: null,
  visitorType: BadgeModel.VisitorType.VIP,
  visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.AVAILABLE,
  isSynchronizing: true,
});

export const getExistingWorkerResponse = () => ({
  type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
  title: 'Already exists a user with the specified information',
  status: 409,
  errorCode: LANG.EN.ERROR_CODES.WORKER_ALREADY_EXISTS,
  matchedFields: ['firstName', 'lastName', 'dateOfBirth', 'mobilePhoneNumber'],
  worker: {
    ...getWorker_1(),
    companyName: 'Alpha Construction',
    stateCode: 'TX',
    pictureUrl: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
    mobilePhoneNumber: '1 (619) 123456',
  },
  isWorkerInformationAvailable: false,
});

export const getProjectWidgetRowItems_1 = () => [
  {
    name: 'Warren Brothers Constructions',
    startDate: '12/01/2019',
    endDate: '12/01/2021',
    clients: 5,
    workers: 1165,
    invoiced: 12547,
  },
  {
    name: 'Texas Stadium',
    startDate: '12/01/2019',
    endDate: '12/01/2021',
    clients: 4,
    workers: 875,
    invoiced: 12198,
  },
  {
    name: 'Florida International Airport',
    startDate: '12/01/2019',
    endDate: '12/01/2021',
    clients: 4,
    workers: 635,
    invoiced: 11894,
  },
  {
    name: 'Austin Spurs Project',
    startDate: '12/01/2019',
    endDate: '12/01/2021',
    clients: 1,
    workers: 2983,
    invoiced: 11435,
  },
];

export const getClientWidgetRowItems_1 = () => [
  {
    name: 'Landon & Brothers',
    projects: 35,
    workers: 1498,
    totalActiveBadges: 1978,
    invoiced: 12547.19,
  },
  {
    name: 'My Company LLC',
    projects: 23,
    workers: 1486,
    totalActiveBadges: 1486,
    invoiced: 8644.15,
  },
  {
    name: 'Keith Montgomery',
    projects: 11,
    workers: 2401,
    totalActiveBadges: 2401,
    invoiced: 3521.66,
  },
  {
    name: 'Gregory & Fox',
    projects: 21,
    workers: 2094,
    totalActiveBadges: 1301,
    invoiced: 1788.12,
  },
];

export const getBadgeVisitorEntity_1 = (): string[] => ['entity 1', 'entity 2', 'entity 3'];

export const getTodayWidgetStatistiscs_1 = (): StatisticsModel.ITodayWidgetStatistics => ({
  total: 284,
  lastActivity: '2020-11-27T14:09:07.030791+00:00',
});

export const getTodayWidgetStatistiscs_2 = (): StatisticsModel.ITodayWidgetStatistics => ({
  total: 2233.1,
  lastActivity: '2020-11-27T14:09:07.030791+00:00',
});

export const getTodayWidgetStatistiscs_3 = (): StatisticsModel.ITodayWidgetStatistics => ({
  total: 312321,
  lastActivity: '2020-11-27T14:09:07.030791+00:00',
});

export const getGrossRevenueWidgetStatistics_1 = (): StatisticsModel.ILineWidgetStatistics => ({
  lineChart: [
    { count: 190080, date: '2021-01-08T00:00:00-03:00' },
    { count: 0, date: '2021-01-09T00:00:00-03:00' },
    { count: 0, date: '2021-01-10T00:00:00-03:00' },
    { count: 15451.25, date: '2021-01-11T00:00:00-03:00' },
    { count: 1034, date: '2021-01-12T00:00:00-03:00' },
    { count: 0, date: '2021-01-13T00:00:00-03:00' },
    { count: 0, date: '2021-01-14T00:00:00-03:00' },
    { count: 0, date: '2021-01-15T00:00:00-03:00' },
  ],
  totalRevenue: 1232.22,
});

export const getWorkersActivityWidgetStatistics_1 = (): StatisticsModel.ILinePieWidgetStatistics => ({
  newProjects: 11,
  totalRecords: 11,
  pieChart: [
    { status: 2, total: 1, percentage: 0.5 },
    { status: 1, total: 0, percentage: 0 },
    { status: 0, total: 1, percentage: 0.5 },
  ],
  lineChart: [
    { count: 1, date: '2020-12-16T00:00:00-03:00' },
    { count: 2, date: '2020-12-15T00:00:00-03:00' },
    { count: 0, date: '2020-12-14T00:00:00-03:00' },
    { count: 5, date: '2020-12-13T00:00:00-03:00' },
    { count: 0, date: '2020-12-12T00:00:00-03:00' },
    { count: 2, date: '2020-12-11T00:00:00-03:00' },
    { count: 0, date: '2020-12-10T00:00:00-03:00' },
    { count: 1, date: '2020-12-09T00:00:00-03:00' },
  ],
});

export const getNewAssignedWorkers_1 = (): StatisticsModel.ILinePieWidgetStatistics => ({
  totalRecords: 762,
  pieChart: [
    { status: 2, total: 67, percentage: 8 },
    { status: 1, total: 183, percentage: 23 },
    { status: 0, total: 512, percentage: 69 },
  ],
  lineChart: [
    { count: 100, date: '2020-12-16T00:00:00-03:00' },
    { count: 230, date: '2020-12-15T00:00:00-03:00' },
    { count: 0, date: '2020-12-14T00:00:00-03:00' },
    { count: 762, date: '2020-12-13T00:00:00-03:00' },
    { count: 0, date: '2020-12-12T00:00:00-03:00' },
    { count: 563, date: '2020-12-11T00:00:00-03:00' },
    { count: 0, date: '2020-12-10T00:00:00-03:00' },
    { count: 240, date: '2020-12-09T00:00:00-03:00' },
  ],
});

export const getBadgeUpdateRequest_1 = (): BadgeModel.IBadgeUpdateRequest => ({
  hasExpiration: 0,
  expirationDate: null,
});

export const getDownloadedFileResponse = () => ({
  newFile: new Blob(),
  status: FileModel.FileStatus.SUCCESS,
});

export const getNamedEntity_1 = (): GeneralModel.INamedEntity => ({
  name: 'Named Entity',
  id: 'affcbb80-4da4-4b21-b29e-ddae769f2222',
});

export const getProjectWidgetStatistics_1 = (): StatisticsModel.ILinePieWidgetStatistics => ({
  newProjects: 2,
  pieChart: [
    { status: 2, total: 1, percentage: 0.5 },
    { status: 1, total: 0, percentage: 0 },
    { status: 0, total: 1, percentage: 0.5 },
  ],
  lineChart: [
    { count: 1, date: '2020-12-16T00:00:00-03:00' },
    { count: 2, date: '2020-12-15T00:00:00-03:00' },
    { count: 0, date: '2020-12-14T00:00:00-03:00' },
    { count: 5, date: '2020-12-13T00:00:00-03:00' },
    { count: 0, date: '2020-12-12T00:00:00-03:00' },
    { count: 2, date: '2020-12-11T00:00:00-03:00' },
    { count: 0, date: '2020-12-10T00:00:00-03:00' },
    { count: 1, date: '2020-12-09T00:00:00-03:00' },
    { count: 1400, date: '2020-12-09T00:00:00-03:00' },
  ],
});

export const getPaymentMethod_1 = (): PaymentModel.IPaymentMethod => ({
  paymentMethodId: 'pm_1IxH2iG4MY5WeilPihvXRyDa',
  brand: 'visa',
  country: 'USA',
  expirationYear: 2024,
  expirationMonth: 12,
  lastFourDigits: 4312,
  hasAssociatedProjects: false,
  nameOnCard: 'Rodolfo Perez',
});

export const getPaymentMethod_2 = (): PaymentModel.IPaymentMethod => ({
  paymentMethodId: 'e043ed03-1008-492a-ac40-4736713ee77f',
  brand: 'mastercard',
  country: 'USA',
  expirationYear: 2023,
  expirationMonth: 11,
  lastFourDigits: 6213,
  hasAssociatedProjects: true,
  nameOnCard: 'Lucas Marquez',
});

export const getPaymentMethod_3 = (): PaymentModel.IPaymentMethod => ({
  paymentMethodId: 'b67a5895-e6e6-4030-8711-9f22d4998616',
  brand: 'unknown',
  country: 'USA',
  expirationYear: 2023,
  expirationMonth: 11,
  lastFourDigits: 7468,
  hasAssociatedProjects: false,
  nameOnCard: 'Nico  Monetto',
});

export const getPaymentMethodInUseResponse = () => ({
  type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
  title: 'The card is assigned to a project.',
  status: 409,
  errorCode: LANG.EN.ERROR_CODES.PAYMENT_METHOD_ASSIGNED_TO_PROJECTS,
  matchedFields: ['firstName', 'lastName', 'dateOfBirth', 'mobilePhoneNumber'],
  errors: {
    paymentMethodId: [getPaymentMethod_1().paymentMethodId],
  },
});

export const getInvoice_1 = (): InvoiceModel.IInvoice => ({
  id: '1',
  invoiceNumber: 720909,
  projectId: '1',
  billingCompanyId: '1',
  billingCompany: {
    name: 'Company1',
    address: getAddress_1(),
  },
  clientUser: {
    name: 'Jessie Ball',
    email: 'jessie@email.com',
  },
  project: {
    id: '1',
    name: 'Las Vegas Casino',
    category: 'Stadium/Entertainment',
  },
  notes: 'Test',
  invoiceDate: '2020-12-10T00:00:00-03:00',
  items: [
    {
      amount: 1,
      detail: 'test',
      service: { id: '678150f6-c824-4a0d-b004-f4a46b7e97ac', name: 'service1' },
    },
    {
      amount: null,
      detail: null,
      service: null,
    },
  ],
  status: InvoiceModel.InvoiceStatus.PENDING,
  type: InvoiceModel.InvoiceType.MANUAL,
});

export const getInvoice_2 = (): InvoiceModel.IInvoice => ({
  id: '2',
  invoiceNumber: 720908,
  projectId: '1',
  billingCompanyId: '1',
  company: {
    id: getClient_1().id,
    name: 'Test Company',
  },
  project: {
    id: getProject_1().id,
    name: 'Test Project',
  },
  notes: 'Test',
  invoiceDate: null,
  paymentDate: '2020-12-10T00:00:00-03:00',
  items: [
    {
      amount: 1,
      detail: 'test',
      service: { id: '1', name: 'service1' },
    },
    {
      amount: null,
      detail: null,
      service: null,
    },
  ],
  status: InvoiceModel.InvoiceStatus.PENDING,
});

export const getProjectInvoiceList_1 = (): InvoiceModel.IInvoice[] => [getInvoice_1()];

export const getProjectInvoiceServiceList_1 = (): GeneralModel.INamedEntity[] => [
  {
    id: '678150f6-c824-4a0d-b004-f4a46b7e97ac',
    name: 'Handheld Equipment',
  },
];

export const getClientWidgetStatistics_1 = (): StatisticsModel.IPieWidgetStatistics => ({
  newClients: 2,
  chart: [
    { status: 2, total: 1, percentage: 0.5 },
    { status: 1, total: 0, percentage: 0 },
    { status: 0, total: 1, percentage: 0.5 },
  ],
});

export const getInvoiceStatistics_1 = (): StatisticsModel.IInvoiceStatistics => ({
  unpaid: 3,
  paid: 15,
  revenue: 12350.2,
});

export const getProjectsLocations_1 = () => [
  {
    latitude: 32.799089,
    longitude: -96.8112847,
  },
  {
    latitude: 32.795657,
    longitude: -96.7733597,
  },
  {
    latitude: 32.7933661,
    longitude: -96.8176242,
  },
  {
    latitude: 32.7914615,
    longitude: -96.808355,
  },
];

export const getInvoiceTaxesRequest_1 = (): InvoiceModel.IInvoiceTaxesRequest => ({
  billingCompanyId: 'abc150f6-c824-4a0d-b004-f4a46b7e9744',
  projectId: '150f6abc-1212-ac51-ff03-b4a46b7e2743',
  items: [
    {
      id: 'id-item',
      service: { id: 'service-id', name: 'service-name' },
      serviceId: 'service-id',
      detail: 'service detail',
      amount: 124,
    },
  ],
});

export const getProjectAccessControlSystem_1 = (): AccessControlSystemModel.IProjectAccessControlSystem => ({
  type: AccessControlSystemModel.AccessControlSystemType.PORTAL,
  accessControlSystemId: '778150f2-abc4-cfa3-1123-ccc4fb7e97ac',
  serialNumber: 'AFCH-3324',
  location: { id: 'locationId', name: 'Front gate' },
  deviceName: 'device Name',
  hasReverseInstallation: true,
  reader1: {
    serialNumber: 'MXT-NEKFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 4923',
    notes: 'Working properly as well.',
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
});

export const getProjectAccessControlSystem_2 = (): AccessControlSystemModel.IProjectAccessControlSystem => ({
  type: AccessControlSystemModel.AccessControlSystemType.PORTAL,
  accessControlSystemId: '778150f2-abc4-cfa3-1123-ccc4fb7e97ac',
  serialNumber: 'AFCH-3324',
  location: { id: 'locationId', name: 'Front gate' },
  deviceName: 'device Name',
  hasReverseInstallation: true,
  reader1: {
    serialNumber: 'MXT-NEKFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 4923',
    notes: 'Working properly as well.',
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
  reader2: {
    serialNumber: 'AFF-ZOFFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 7432',
    notes: '',
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
    directionType: 2,
  },
});

export const getProjectAccessControlSystem_3 = (): AccessControlSystemModel.IProjectAccessControlSystem => ({
  type: AccessControlSystemModel.AccessControlSystemType.PORTAL,
  accessControlSystemId: '778150f2-abc4-cfa3-1123-ccc4fb7e97ac',
  serialNumber: 'AFCH-3324',
  location: { id: 'locationId', name: 'Front gate' },
  deviceName: 'device Name',
  hasReverseInstallation: true,
  reader1: {
    serialNumber: 'MXT-NEKFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 4923',
    notes: 'Working properly as well.',
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
  },
  reader2: {
    serialNumber: 'AFF-ZOFFOEFJ31293',
    lastMaintenanceDate: 1589883810049 as any,
    inServiceDate: 1589883810049 as any,
    model: 'Model 7432',
    notes: '',
    hostAddress: null,
    telnetConnectionPort: null,
    sshConnectionPort: null,
    httpConnectionPort: null,
    tcpConnectionPort: null,
    directionType: 2,
  },
});

export const getBadgeHistory_1 = (): BadgeModel.IBadgeHistory => ({
  id: '678150f6-c824-4a0d-b004-f4a46b7e97ac',
  date: '2021-02-01T10:54:39.446Z',
  badgeAction: BadgeModel.BadgeAction.ADD_TO_ACS,
  tagId: '1273812391',
  description: 'description',
  user: {
    id: '777750f6-aaaa-bbbb-bccc-f4a46b7eddd',
    firstName: 'string',
    lastName: 'string',
    email: 'string',
  },
  projectAccessControlSystem: {
    id: '66666666-8888-7777-5555-ffffffffffff',
    deviceName: 'device-name',
  },
  reader: {
    id: '11111111-8888-7777-5555-ffffffffffff',
    hostname: 'host-name',
  },
});

export const getAccessControlSystemWidget_1 = (): StatisticsModel.IAcsSummaryStatistics => ({
  totalRecords: 430,
  totalFilter: 46,
  pieChart: [
    {
      segment: 0,
      total: 15,
      percentage: null,
    },
    {
      segment: 1,
      total: 12,
      percentage: null,
    },
    {
      segment: 2,
      total: 4,
      percentage: null,
    },
    {
      segment: 3,
      total: 15,
      percentage: null,
    },
  ],
});

export const getBadgePrintingSystemWidget_1 = (): StatisticsModel.IDeviceStatistics => ({
  totalRecords: 430,
  totalFilter: 120,
});

export const getProjectClientsWidget_1 = (): StatisticsModel.IPieWidgetStatistics => ({
  newClients: 100,
  totalRecords: 100,
  chart: [
    { segment: 2, total: 50, percentage: 50 },
    { segment: 1, total: 0, percentage: 0 },
    { segment: 0, total: 50, percentage: 50 },
  ],
  pieChart: [
    { segment: 2, total: 50, percentage: 50 },
    { segment: 1, total: 0, percentage: 0 },
    { segment: 0, total: 50, percentage: 50 },
  ],
});

export const getWorkerByDemographicDataWidget_1 = (): StatisticsModel.IPieWidgetStatistics => ({
  pieChart: [
    { segment: -1, total: 26, percentage: 63.4146341463415 },
    { segment: 0, total: 5, percentage: 12.1951219512195 },
    { segment: 1, total: 3, percentage: 7.31707317073171 },
  ],
  totalRecords: 6,
});

export const getProjectActiviesWidget_1 = (): StatisticsModel.ILocationStatistics => ({
  total: 2,
  pointList: [
    {
      entityName: {
        id: '7b5d286c-43ff-406c-a261-38a730bdf726',
        name: 'Entity Name',
      },
      latitude: 30.6013687,
      longitude: -87.9042679,
    },
    {
      entityName: {
        id: '7b5d286c-43ff-406c-a261-38a730bdf726',
        name: 'Entity Name',
      },
      latitude: 29.884323,
      longitude: -95.216832,
    },
  ],
});

export const getBadgeByProjectWidget_1 = (): StatisticsModel.ITopTenStatistics[] => [
  { description: 'Wirgley Fields', percentage: 85, total: 938 },
  { description: 'Orlando', percentage: 80, total: 839 },
  { description: '300 Lafayet', percentage: 78, total: 783 },
  { description: 'Tampa Inter...', percentage: 73, total: 762 },
  { description: 'Essex Crossi', percentage: 65, total: 684 },
  { description: 'Oceanwind', percentage: 60, total: 631 },
  { description: 'The Kent at', percentage: 50, total: 603 },
  { description: 'One Manhathan', percentage: 46, total: 589 },
  { description: 'Wirgley Fields', percentage: 41, total: 524 },
  { description: 'Orlando Station', percentage: 35, total: 389 },
];

export const getBadgeByLocationWidget_1 = (): StatisticsModel.ITopTenStatistics[] => [
  { description: 'Huston', percentage: 85, total: 938 },
  { description: 'Dallas', percentage: 80, total: 839 },
  { description: 'Austin', percentage: 78, total: 783 },
  { description: 'San Antonio', percentage: 73, total: 762 },
  { description: 'El Paso', percentage: 65, total: 684 },
  { description: 'Leage City', percentage: 60, total: 631 },
  { description: 'For Worth', percentage: 50, total: 603 },
  { description: 'Texas City', percentage: 46, total: 589 },
  { description: 'Amarillo', percentage: 41, total: 524 },
  { description: 'Waco', percentage: 35, total: 389 },
];

export const getProjectWorkersActivityStatistics_1 = (): StatisticsModel.ILinePieWidgetStatistics => ({
  totalRecords: 19,
  lineChart: [
    { date: '2021-01-03T00:00:00+00:00', count: 0 },
    { date: '2021-01-04T00:00:00+00:00', count: 0 },
    { date: '2021-01-05T00:00:00+00:00', count: 0 },
    { date: '2021-01-06T00:00:00+00:00', count: 0 },
    { date: '2021-01-07T00:00:00+00:00', count: 2 },
    { date: '2021-01-08T00:00:00+00:00', count: 2 },
    { date: '2021-01-09T00:00:00+00:00', count: 0 },
    { date: '2021-01-10T00:00:00+00:00', count: 0 },
    { date: '2021-01-11T00:00:00+00:00', count: 1 },
    { date: '2021-01-12T00:00:00+00:00', count: 0 },
    { date: '2021-01-13T00:00:00+00:00', count: 0 },
    { date: '2021-01-14T00:00:00+00:00', count: 0 },
    { date: '2021-01-15T00:00:00+00:00', count: 0 },
    { date: '2021-01-16T00:00:00+00:00', count: 0 },
    { date: '2021-01-17T00:00:00+00:00', count: 0 },
    { date: '2021-01-18T00:00:00+00:00', count: 3 },
    { date: '2021-01-19T00:00:00+00:00', count: 5 },
    { date: '2021-01-20T00:00:00+00:00', count: 1 },
    { date: '2021-01-21T00:00:00+00:00', count: 0 },
    { date: '2021-01-22T00:00:00+00:00', count: 0 },
    { date: '2021-01-23T00:00:00+00:00', count: 0 },
    { date: '2021-01-24T00:00:00+00:00', count: 0 },
    { date: '2021-01-25T00:00:00+00:00', count: 0 },
    { date: '2021-01-26T00:00:00+00:00', count: 1 },
    { date: '2021-01-27T00:00:00+00:00', count: 0 },
    { date: '2021-01-28T00:00:00+00:00', count: 1 },
    { date: '2021-01-29T00:00:00+00:00', count: 2 },
    { date: '2021-01-30T00:00:00+00:00', count: 0 },
    { date: '2021-01-31T00:00:00+00:00', count: 0 },
    { date: '2021-02-01T00:00:00+00:00', count: 1 },
    { date: '2021-02-02T00:00:00+00:00', count: 0 },
  ],
  pieChart: undefined,
});

export const getProjectRevenueProjectStatistics_1 = (): StatisticsModel.ILineWidgetStatistics => ({
  lineChart: [
    { count: 1300, date: '2021-01-08T00:00:00-03:00' },
    { count: 0, date: '2021-01-09T00:00:00-03:00' },
    { count: 0, date: '2021-01-10T00:00:00-03:00' },
    { count: 1243, date: '2021-01-11T00:00:00-03:00' },
    { count: 1215, date: '2021-01-12T00:00:00-03:00' },
    { count: 600, date: '2021-01-13T00:00:00-03:00' },
    { count: 900, date: '2021-01-14T00:00:00-03:00' },
    { count: 50, date: '2021-01-15T00:00:00-03:00' },
  ],
  totalRevenue: 5432.22,
});

export const getProjectTopTenStatistics_1 = (): StatisticsModel.IProjectTopTenStatistics[] => [
  {
    project: { id: 'project-uuid-1', name: 'Test Name 1' },
    creationDate: '2021-01-15T00:00:00-03:00',
    totalClients: 56,
    totalWorkers: 32,
    totalRevenue: 3200,
  },
  {
    project: { id: 'project-uuid-2', name: 'Test Name 2' },
    creationDate: '2021-01-15T00:00:00-03:00',
    totalClients: 20,
    totalWorkers: 18,
    totalRevenue: 1204,
  },
  {
    project: { id: 'project-uuid-3', name: 'Test Name 3' },
    creationDate: '2021-01-15T00:00:00-03:00',
    totalClients: 16,
    totalWorkers: 21,
    totalRevenue: 1400,
  },
  {
    project: { id: 'project-uuid-4', name: 'Test Name 4' },
    creationDate: '2021-01-15T00:00:00-03:00',
    totalClients: 32,
    totalWorkers: 32,
    totalRevenue: 32,
  },
];

export const getClientTopTenStatistics_1 = (): StatisticsModel.IClientTopTenStatistics[] => [
  {
    company: { id: 'client-uuid-1', name: 'Test Name 1' },
    projectsCount: 56,
    workersCount: 32,
    activeBadgesCount: 18,
    totalRevenue: 33,
  },
  {
    company: { id: 'client-uuid-2', name: 'Test Name 2' },
    projectsCount: 20,
    workersCount: 18,
    activeBadgesCount: 30,
    totalRevenue: 1204,
  },
  {
    company: { id: 'client-uuid-3', name: 'Test Name 3' },
    projectsCount: 16,
    workersCount: 21,
    activeBadgesCount: 30,
    totalRevenue: 1400,
  },
  {
    company: { id: 'client-uuid-4', name: 'Test Name 4' },
    projectsCount: 32,
    workersCount: 32,
    activeBadgesCount: 30,
    totalRevenue: 32,
  },
];

export const getDefaultLoading = (): GeneralModel.ILoadingStatus => ({
  isLoading: false,
  hasError: false,
  error: null,
});

export const getUserAccount_1 = () => ({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@mail.com',
  pictureUrl: 'test.com',
});

export const getClientProjectHirearchy_1 = (): ClientModel.IHirearchyClientProject => ({
  level: 0,
  sponsoredCompaniesIds: [getClientProject_4().id],
  ...getClientProject_2(),
});

export const getClientProjectHirearchy_2 = (): ClientModel.IHirearchyClientProject => ({
  level: 1,
  sponsoredCompaniesIds: ['22222222-6521-47bb-97fd-c75ac02b2cf5', '33333333-6521-47bb-97fd-c75ac02b2cf5'],
  ...getClientProject_4(),
});

export const getClientProjectHirearchy_3 = (): ClientModel.IHirearchyClientProject => ({
  level: 2,
  sponsoredCompaniesIds: [],
  ...getClientProject_1(),
  id: '22222222-6521-47bb-97fd-c75ac02b2cf5',
});

export const getClientProjectHirearchy_4 = (): ClientModel.IHirearchyClientProject => ({
  level: 2,
  sponsoredCompaniesIds: [],
  ...getClientProject_1(),
  id: '33333333-6521-47bb-97fd-c75ac02b2cf5',
});

export const getClientProjectHirearchyList_1 = (): ClientModel.IHirearchyClientProject[] => [
  getClientProjectHirearchy_1(),
  {
    level: 0,
    sponsoredCompaniesIds: [getClientProject_1().id],
    ...getClientProject_3(),
  },
  getClientProjectHirearchy_2(),
  {
    level: 1,
    sponsoredCompaniesIds: [],
    ...getClientProject_1(),
  },
  getClientProjectHirearchy_3(),
  getClientProjectHirearchy_4(),
];

export const getClientDetailStatistics_1 = (): StatisticsModel.IClientDetailStatistics => ({
  projects: 5,
  workers: 37,
  revenue: 23678,
});

export const getProjectDetailStatistics_1 = (): StatisticsModel.IProjectDetailStatistics => ({
  companiesCount: 10,
  activeWorkersCount: 35,
  totalBilling: 21546,
});

export const getSearchWoker = (): GeneralModel.IPagination<SearchModel.IWorker> => ({
  pageNumber: 1,
  pageSize: 2,
  totalResults: 2,
  items: [
    {
      id: getWorker_1().id,
      name: getWorker_1().firstName + ' ' + getWorker_1().lastName,
      status: null,
      address: getAddress_1(),
      entityType: SearchModel.SearchType.Worker,
      invitationStatus: 1,
      pictureUrl: getWorker_1().pictureUrl,
      lastUpdatedAt: null,
      company: getWorker_1().company,
      ...getAddress_1(),
    },
    {
      id: getWorker_2().id,
      name: getWorker_2().firstName + ' ' + getWorker_2().lastName,
      status: null,
      address: getAddress_2(),
      entityType: SearchModel.SearchType.Worker,
      invitationStatus: 2,
      pictureUrl: getWorker_2().pictureUrl,
      lastUpdatedAt: null,
      company: getWorker_2().company,
      ...getAddress_2(),
    },
  ],
});
