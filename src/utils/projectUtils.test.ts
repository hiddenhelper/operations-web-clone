import { sanitizeProject, preloadProject, getPlannedMonths, getProjectBadgeResourceRequest, validateBadgeTagId, sanitizeLocations } from './projectUtils';
import {
  getCertification_1,
  getConsentFormFieldConfigs,
  getFcaNae_1,
  getProject_1,
  getProject_2,
  getProjectCategory_1,
  getProjectRegion_1,
  getTimeZone_1,
  getTraining_1,
} from '../test/entities';
import { AddressModel, ProjectModel, BadgeModel } from '../modules/models';

describe('Project Utils', () => {
  it('should sanitizeProject', () => {
    const sanitizedProject = sanitizeProject({
      ...getProject_1(),
      badgeBillingModel: { ...getProject_1().badgeBillingModel, visitorBadgePrice: 12, visitorReprintingCost: 5 },
      generalContractorBadgeTemplate: { ...BadgeModel.getFallbackBadgeTemplate(), layout: 3, fontColor: '132431' },
      subcontractorBadgeTemplate: { ...BadgeModel.getFallbackBadgeTemplate(), layout: 0, fontColor: '132431' },
      visitorBadgeTemplate: { ...BadgeModel.getFallbackVisitorBadgeTemplate(), layout: 4, fontColor: '132431' },
      relatedCompanies: [{ id: '1', name: 'Test', isTaxExempt: true }],
    });
    const sanitizedProjectTwo = sanitizeProject({
      ...getProject_2(),
      relatedCompanies: null,
      billingModelType: ProjectModel.BillingModelType.SEATS,
      seatBillingModel: null,
      consentFormFields: getConsentFormFieldConfigs(),
      generalContractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      subcontractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      visitorBadgeTemplate: BadgeModel.getFallbackVisitorBadgeTemplate(),
    });
    expect(sanitizedProject).toEqual({
      categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
      category: getProjectCategory_1(),
      ccv: null,
      consentFormLegals: [
        { languageId: 'enId', languageCode: 'en', body: 'Consent from' },
        { languageId: 'esId', languageCode: 'es', body: 'Formulario de consentimiento' },
      ],
      consentFormFields: [],
      description: 'description',
      id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf2',
      naeId: null,
      timeZoneId: null,
      name: 'Project Name',
      plannedMonths: '',
      regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
      region: getProjectRegion_1(),
      relatedCompanies: [{ id: '1', isTaxExempt: true, role: undefined }],
      jobSiteAddress: getProject_1().jobSiteAddress,
      badgingSiteAddressMatchesJobSiteAddress: true,
      badgingSiteAddress: null,
      mailingAddressMatchingType: 1,
      mailingAddress: null,
      locations: [],
      startDate: 1594828379742,
      endDate: 1594828379742,
      badgeBillingModel: {
        badgePrice: null,
        isBilledPerCompany: true,
        reprintingCost: null,
        billedCompanyId: null,
        visitorBadgePrice: 12,
        visitorReprintingCost: 5,
      },
      seatBillingModel: null,
      billingModelType: 0,
      certificationGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          certifications: [
            {
              id: 'cert-1',
              name: 'test certification-g',
              alias: 'test certification-g',
            },
          ],
        },
      ],
      trainingGroups: [],
      status: 0,
      generalContractorBadgeTemplate: { ...BadgeModel.getFallbackBadgeTemplate(), layout: 3, fontColor: '132431' },
      subcontractorBadgeTemplate: { ...BadgeModel.getFallbackBadgeTemplate(), layout: 0 },
      visitorBadgeTemplate: { ...BadgeModel.getFallbackVisitorBadgeTemplate(), layout: 4, fontColor: '132431' },
      subcontractorBadgeTemplateMatchesGeneralContractor: false,
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
    expect(sanitizedProjectTwo).toEqual({
      categoryId: '8acce4c4-6521-47bb-97fd-c75ac02b2211',
      ccv: 213192324.12,
      consentFormFields: getConsentFormFieldConfigs(),
      consentFormLegals: [],
      description: 'description',
      id: '8aa1c4c4-6521-47bb-27fd-af5ac02b2cd8',
      naeId: null,
      timeZoneId: '155dc3dc-98d5-11eb-a8b3-0242ac130003',
      name: 'Project Name 2',
      plannedMonths: '',
      regionId: '8acce4c4-6521-47bb-97fd-c75ac02b2214',
      relatedCompanies: null,
      jobSiteAddress: null,
      badgingSiteAddressMatchesJobSiteAddress: true,
      badgingSiteAddress: null,
      mailingAddressMatchingType: 1,
      mailingAddress: null,
      locations: null,
      startDate: 1594828379742,
      endDate: 1594828379742,
      badgeBillingModel: null,
      seatBillingModel: ProjectModel.getFallbackSeatBillingModel(),
      billingModelType: 1,
      certificationGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          certifications: [
            {
              id: 'cert-1',
              name: 'test certification-g',
              alias: 'test certification-g',
            },
          ],
        },
      ],
      trainingGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          trainings: [
            {
              id: 'train-1',
              name: 'test training',
              alias: 'test training',
            },
          ],
        },
      ],
      status: 1,
      category: { id: 'category-id', name: 'category-name' },
      region: { id: 'region-id', name: 'region-name' },
      generalContractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      subcontractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      visitorBadgeTemplate: BadgeModel.getFallbackVisitorBadgeTemplate(),
    });
  });
  it.skip('should preloadProject', () => {
    const sanitizedProject = preloadProject(ProjectModel.getFallbackProject());
    expect(sanitizedProject).toEqual({
      badgeBillingModel: null,
      badgingSiteAddress: null,
      badgingSiteAddressMatchesJobSiteAddress: true,
      billingModelType: 0,
      categoryId: null,
      ccv: null,
      certificationGroups: [],
      consentFormFields: [],
      consentFormLegals: [],
      description: null,
      endDate: null,
      id: undefined,
      jobSiteAddress: AddressModel.getFallbackAddress(),
      mailingAddress: null,
      mailingAddressMatchingType: 1,
      locations: [],
      naeId: null,
      name: null,
      timeZoneId: null,
      plannedMonths: null,
      regionId: null,
      relatedCompanies: [],
      seatBillingModel: null,
      startDate: null,
      status: 0,
      trainingGroups: [],
      generalContractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      subcontractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      visitorBadgeTemplate: BadgeModel.getFallbackVisitorBadgeTemplate(),
      subcontractorBadgeTemplateMatchesGeneralContractor: false,
    });
  });

  it.skip('should preloadProject 2', () => {
    const sanitizedProject = preloadProject({
      ...ProjectModel.getFallbackProject(),
      nae: getFcaNae_1(),
      billingModelType: null,
      jobSiteAddress: null,
      generalContractorBadgeTemplate: null,
      subcontractorBadgeTemplate: null,
      visitorBadgeTemplate: null,
      timeZone: getTimeZone_1(),
      consentFormFields: getConsentFormFieldConfigs(),
      locations: [{ id: 'locationTestId', name: 'Location Name', isUsed: true }],
      trainingGroups: getProject_2().trainingGroups,
    });
    expect(sanitizedProject).toEqual({
      badgeBillingModel: null,
      badgingSiteAddress: null,
      badgingSiteAddressMatchesJobSiteAddress: true,
      categoryId: null,
      ccv: null,
      timeZone: getTimeZone_1(),
      timeZoneId: getTimeZone_1().id,
      certificationGroups: [],
      consentFormFields: getConsentFormFieldConfigs(),
      consentFormLegals: [],
      description: null,
      endDate: null,
      id: undefined,
      mailingAddress: null,
      mailingAddressMatchingType: 1,
      locations: [{ id: 'locationTestId', name: 'Location Name', isUsed: true }],
      name: null,
      plannedMonths: null,
      regionId: null,
      relatedCompanies: [],
      seatBillingModel: null,
      startDate: null,
      status: 0,
      trainingGroups: [
        {
          id: 'groupId',
          name: 'Group Name',
          validationType: 1,
          trainings: [{ ...getTraining_1(), alias: getTraining_1().name }],
        },
      ],
      nae: getFcaNae_1(),
      naeId: getFcaNae_1().id,
      billingModelType: 0,
      jobSiteAddress: AddressModel.getFallbackAddress(),
      generalContractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      subcontractorBadgeTemplate: BadgeModel.getFallbackBadgeTemplate(),
      visitorBadgeTemplate: BadgeModel.getFallbackVisitorBadgeTemplate(),
      subcontractorBadgeTemplateMatchesGeneralContractor: false,
    });
  });

  it('should getPlannedMonths', () => {
    expect(getPlannedMonths('2000-01-01', '2000-03-01')).toEqual(2);
  });

  it.skip('should get badge request', () => {
    const file = { file: { name: 'test' } };
    expect(
      getProjectBadgeResourceRequest(['subcontractorBadgeLogo', 'visitorBadgeLogo'], {
        generalContractorBadgeLogo: { logo1: file },
        subcontractorBadgeLogo: { logo1: file },
        visitorBadgeLogo: { logo1: file },
      })
    );
  });

  it('should validateBadgeTagId', () => {
    expect(validateBadgeTagId({ value: '123' })).toEqual('Please enter a valid Tag Id.');
    expect(validateBadgeTagId({ value: '123456789112' })).toEqual(false);
  });

  it('should sanitizeLocation', () => {
    const locations = [
      {
        id: 'locID',
        name: 'location name',
      },
    ];

    expect(sanitizeLocations(locations)).toEqual(locations);
  });
});
