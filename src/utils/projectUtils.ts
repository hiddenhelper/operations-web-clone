import moment from 'moment';

import { ProjectModel, BadgeModel, AddressModel, ProjectNewModel } from '../modules/models';
import { isTempId, isEmpty, parseFloatNumber, roundNumber, sanitizeNumber } from './generalUtils';
import { sanitizeAddress } from './addressUtils';
import { sanitizeCertificationGroups } from './certificationGroupsUtils';
import { sanitizeTrainingsGroups } from './trainingGroupsUtils';

export const sanitizeCompanyList = list =>
  list
    .filter(company => !isTempId(company.id) && company.id !== null)
    .map(company => ({
      id: company.id,
      role: company.role,
      isTaxExempt: company.isTaxExempt,
    }));

export const sanitizeLocations = locations =>
  locations
    .filter(location => location.id !== null && location.name)
    .map(location => ({
      id: location.id,
      name: location.name,
    }));

export const sanitizeBadgeTemplate = (template: BadgeModel.IBadgeTemplate): BadgeModel.IBadgeTemplate => ({
  ...template,
  fontColor: template.layout !== BadgeModel.BadgeLayout.WHITE_HEADER ? '444444' : template.fontColor,
});

export const sanitizeProject = (project: Partial<ProjectModel.IProject>): Partial<ProjectModel.IProject> => ({
  ...project,
  ccv: project.ccv ? sanitizeNumber(project.ccv as any) : null,
  relatedCompanies: project.relatedCompanies ? sanitizeCompanyList(project.relatedCompanies) : null,
  naeId: isEmpty(project.naeId) ? null : /* istanbul ignore next */ project.naeId,
  regionId: isEmpty(project.regionId) ? null : project.regionId,
  categoryId: isEmpty(project.categoryId) ? null : project.categoryId,
  timeZoneId: isEmpty(project.timeZoneId) ? null : project.timeZoneId,
  billingModelType: project.billingModelType ? parseInt(String(project.billingModelType), 10) : ProjectModel.BillingModelType.BADGES,
  badgeBillingModel:
    project.badgeBillingModel && project.billingModelType === ProjectModel.BillingModelType.BADGES
      ? {
          ...project.badgeBillingModel,
          badgePrice: project.badgeBillingModel.badgePrice ? parseFloatNumber(project.badgeBillingModel.badgePrice) : null,
          reprintingCost: project.badgeBillingModel.reprintingCost
            ? /* istanbul ignore next */ parseFloatNumber(project.badgeBillingModel.reprintingCost)
            : null,
          visitorBadgePrice: project.badgeBillingModel.visitorBadgePrice ? parseFloatNumber(project.badgeBillingModel.visitorBadgePrice) : null,
          visitorReprintingCost: project.badgeBillingModel.visitorReprintingCost ? parseFloatNumber(project.badgeBillingModel.visitorReprintingCost) : null,
          billedCompanyId: project.badgeBillingModel.billedCompanyId || project.badgeBillingModel?.billedCompany?.id || null,
        }
      : null,
  seatBillingModel:
    project.seatBillingModel && project.billingModelType === ProjectModel.BillingModelType.SEATS
      ? {
          estimatedWorkersNumber: project.seatBillingModel.estimatedWorkersNumber,
          isFixedSeatPrice: project.seatBillingModel.isFixedSeatPrice,
          seatPrice: project.seatBillingModel.seatPrice ? parseFloatNumber(project.seatBillingModel.seatPrice) : null,
          billingTierId: project.seatBillingModel.billingTierId || project.seatBillingModel.billingTier?.id || null,
          billedCompanyId: project.seatBillingModel.billedCompanyId || project.seatBillingModel?.billedCompany?.id || null,
          reprintingCost: project.seatBillingModel.reprintingCost ? parseFloatNumber(project.seatBillingModel.reprintingCost) : null,
          visitorBadgePrice: project.seatBillingModel.visitorBadgePrice ? parseFloatNumber(project.seatBillingModel.visitorBadgePrice) : null,
          visitorReprintingCost: project.seatBillingModel.visitorReprintingCost ? parseFloatNumber(project.seatBillingModel.visitorReprintingCost) : null,
        }
      : !project.seatBillingModel && project.billingModelType === ProjectModel.BillingModelType.SEATS
      ? ProjectModel.getFallbackSeatBillingModel()
      : null,
  description: isEmpty(project.description) ? null : project.description,
  jobSiteAddress: project.jobSiteAddress ? sanitizeAddress(project.jobSiteAddress) : null,
  locations: project.locations ? sanitizeLocations(project.locations) : null,
  badgingSiteAddress: project.badgingSiteAddress ? sanitizeAddress(project.badgingSiteAddress) : null,
  mailingAddress: project.mailingAddress ? sanitizeAddress(project.mailingAddress) : null,
  certificationGroups: sanitizeCertificationGroups(project.certificationGroups),
  trainingGroups: sanitizeTrainingsGroups(project.trainingGroups),
  consentFormFields: project.consentFormFields,
  generalContractorBadgeTemplate: sanitizeBadgeTemplate(project.generalContractorBadgeTemplate),
  subcontractorBadgeTemplate: sanitizeBadgeTemplate(project.subcontractorBadgeTemplate),
  visitorBadgeTemplate: project.visitorBadgeTemplate,
});

export const preloadProject = (project: ProjectModel.IProject) => ({
  ...project,
  regionId: project.region?.id ? project.region.id : null,
  categoryId: project.category?.id ? project.category.id : null,
  naeId: project.nae?.id ? project.nae.id : null,
  timeZoneId: project.timeZone?.id ? project.timeZone.id : null,
  billingModelType: isEmpty(project.billingModelType) ? ProjectModel.BillingModelType.BADGES : project.billingModelType,
  jobSiteAddress: isEmpty(project.jobSiteAddress) ? AddressModel.getFallbackAddress() : project.jobSiteAddress,
  locations: isEmpty(project.locations) ? [] : project.locations,
  generalContractorBadgeTemplate: isEmpty(project.generalContractorBadgeTemplate)
    ? BadgeModel.getFallbackBadgeTemplate()
    : project.generalContractorBadgeTemplate,
  subcontractorBadgeTemplate: isEmpty(project.subcontractorBadgeTemplate) ? BadgeModel.getFallbackBadgeTemplate() : project.subcontractorBadgeTemplate,
  visitorBadgeTemplate: isEmpty(project.visitorBadgeTemplate) ? BadgeModel.getFallbackVisitorBadgeTemplate() : project.visitorBadgeTemplate,
  consentFormFields: isEmpty(project.consentFormFields) ? ProjectModel.getFallbackProject().consentFormFields : project.consentFormFields,
  certificationGroups: !isEmpty(project.certificationGroups) ? project.certificationGroups : [],
  trainingGroups: !isEmpty(project.trainingGroups) ? project.trainingGroups : [],
  consentFormLegals: !isEmpty(project.consentFormLegals) ? project.consentFormLegals : [],
});

export const getSeatPrice = (isFixed: boolean, seatPrice: number, tierPrice: number) => (isFixed ? seatPrice : tierPrice || 0);

export const getTotalPrice = (workers: number, seatPrice: number) => roundNumber(workers * seatPrice);

export const isBilledPerCompany = (project: ProjectModel.IProject) =>
  !!(project?.billingModelType === ProjectModel.BillingModelType.BADGES && project?.badgeBillingModel?.isBilledPerCompany);

export const getPlannedMonths = (startDate: string, endDate: string) => (endDate && startDate ? moment(endDate).diff(moment(startDate), 'months') : 0);

export const getProjectBadgeResourceRequest = (pendingBadges, fileMap) => ({
  generalContractorTemplate:
    pendingBadges.includes(ProjectModel.ProjectBadgeLogos.GENERAL_CONTRACTOR_BADGE_LOGO) ||
    pendingBadges.includes(ProjectNewModel.ProjectBadgeTemplates.GENERAL_CONTRACTOR_BADGE_TEMPLATE_FILE)
      ? {
          logoFileName: fileMap.generalContractorBadgeLogo ? (Object.values(fileMap.generalContractorBadgeLogo)[0] as any)?.file?.name : '',
          templateFileName: fileMap.generalContractorBadgeTemplate ? (Object.values(fileMap.generalContractorBadgeTemplate)[0] as any)?.file?.name : '',
        }
      : null,
  subContractorTemplate:
    pendingBadges.includes(ProjectModel.ProjectBadgeLogos.SUBCONTRACTOR_BADGE_LOGO) ||
    pendingBadges.includes(ProjectNewModel.ProjectBadgeTemplates.SUBCONTRACTOR_BADGE_TEMPLATE_FILE)
      ? {
          logoFileName: fileMap.subContractorBadgeLogo ? (Object.values(fileMap.subContractorBadgeLogo)[0] as any)?.file?.name : '',
          templateFileName: fileMap.subcontractorBadgeTemplate ? (Object.values(fileMap.subcontractorBadgeTemplate)[0] as any)?.file?.name : '',
        }
      : null,
  visitorTemplateTemplate:
    pendingBadges.includes(ProjectModel.ProjectBadgeLogos.VISITOR_BADGE_LOGO) ||
    pendingBadges.includes(ProjectNewModel.ProjectBadgeTemplates.VISITOR_BADGE_TEMPLATE_FILE)
      ? {
          logoFileName: fileMap.visitorBadgeLogo ? (Object.values(fileMap.visitorBadgeLogo)[0] as any)?.file?.name : '',
          templateFileName: fileMap.visitorBadgeTemplate ? (Object.values(fileMap.visitorBadgeTemplate)[0] as any)?.file?.name : '',
        }
      : null,
});

export const validateBadgeTagId = ({ value }) => value.length !== 12 && 'Please enter a valid Tag Id.';
