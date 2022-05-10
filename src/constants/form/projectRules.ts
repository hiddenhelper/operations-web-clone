import { ProjectModel } from '../../modules/models';
import { validateAddress, validateRequiredAddress } from '../../utils/addressUtils';
import { IFormRules, ruleMap, validateRules } from '../../utils/useValidator';
import { parseFloatNumber, sanitizeNumber, isEmpty } from '../../utils/generalUtils';
import { ILocation } from 'modules/models/address';
import { ICertificationGroup, IProjectCertification } from 'modules/models/certification';
import { IConsentFormLegal } from 'modules/models/consentForm';
import { ITrainingGroup, IProjectTraining } from 'modules/models/training';

export const validateBadge = (value: number, total: number = 1000, isSanitze = false) =>
  value && (isSanitze ? sanitizeNumber(value) >= total : parseFloatNumber(value) >= total);

const validateBadgePrice = value => validateBadge(value) && 'Badge price should be less than $1,000.';
const validateReprintingCost = value => validateBadge(value) && 'Badge reprint price should be less than $1,000.';
const validateSeatPrice = value => validateBadge(value) && 'Seat price should be less than $1,000.';

const getRequiredBadgeModelRules = ({ isBilledPerCompany }: { isBilledPerCompany: boolean }) => ({
  badgePrice: {
    required: true,
    rules: [({ value }) => validateBadgePrice(value)],
  },
  reprintingCost: {
    required: true,
    rules: [({ value }) => validateReprintingCost(value)],
  },
  billedCompanyId: {
    required: false,
    rules: [],
  },
  visitorBadgePrice: {
    required: true,
    rules: [],
  },
  visitorReprintingCost: {
    required: true,
    rules: [],
  },
});

const getRequiredSeatModelRules = ({ isFixedSeatPrice }: { isFixedSeatPrice: boolean }) => ({
  estimatedWorkersNumber: {
    required: true,
    rules: [],
  },
  seatPrice: {
    required: isFixedSeatPrice,
    rules: [({ value }) => validateSeatPrice(value)],
  },
  billedCompanyId: {
    required: false,
    rules: [],
  },
  reprintingCost: {
    required: true,
    rules: [({ value }) => validateReprintingCost(value)],
  },
  visitorBadgePrice: {
    required: true,
    rules: [],
  },
  visitorReprintingCost: {
    required: true,
    rules: [],
  },
});

export const draftBadgeBillingModelRules: IFormRules = {
  badgePrice: {
    required: false,
    rules: [({ value }) => validateBadgePrice(value)],
  },
  isBilledPerCompany: {
    required: false,
    rules: [],
  },
  reprintingCost: {
    required: false,
    rules: [({ value }) => validateReprintingCost(value)],
  },
  billedCompany: {
    required: false,
    rules: [],
  },
  billedCompanyId: {
    required: false,
    rules: [],
  },
};

export const draftSeatBillingModelRules: IFormRules = {
  estimatedWorkersNumber: {
    required: false,
    rules: [],
  },
  isFixedSeatPrice: {
    required: false,
    rules: [],
  },
  seatPrice: {
    required: false,
    rules: [({ value }) => validateSeatPrice(value)],
  },
  billingTier: {
    required: false,
    rules: [],
  },
  billingTierId: {
    required: false,
    rules: [],
  },
  billedCompany: {
    required: false,
    rules: [],
  },
  billedCompanyId: {
    required: false,
    rules: [],
  },
  reprintingCost: {
    required: false,
    rules: [({ value }) => validateReprintingCost(value)],
  },
};

export const validateBadgeBillingModel = ({ value: badgeModel }: { value: ProjectModel.IBadgesModel }, rules: IFormRules) => {
  const err = validateRules({ model: badgeModel, constraints: rules });
  const badgeErrorList = Object.keys(err).reduce((total: any, field, index) => ({ ...total, [field]: err[field] }), {});
  return Object.keys(err).length > 0 ? badgeErrorList : false;
};

export const validateSeatBillingModel = ({ value: seatModel }: { value: ProjectModel.ISeatsModel }, rules: IFormRules) => {
  const err = validateRules({ model: seatModel, constraints: rules });
  const seatErrorList = Object.keys(err).reduce((total: any, field, index) => ({ ...total, [field]: err[field] }), {});
  return Object.keys(err).length > 0 ? seatErrorList : false;
};

export const validateDraftBadgeBillingModel = value => validateBadgeBillingModel(value, draftBadgeBillingModelRules);
export const validateRequiredBadgeBillingModel = value =>
  validateBadgeBillingModel(value, getRequiredBadgeModelRules({ isBilledPerCompany: value.value.isBilledPerCompany }));

export const validateDraftSeatBillingModel = value => validateSeatBillingModel(value, draftSeatBillingModelRules);
export const validateRequiredSeatBillingModel = value =>
  validateSeatBillingModel(value, getRequiredSeatModelRules({ isFixedSeatPrice: value.value.isFixedSeatPrice }));

const validateLocationList = ({ value: locationList, model }: { value: ILocation[]; model: any }) => {
  const userErrorList = locationList.reduce((acc: any, locations, index) => {
    const isDuplicated =
      !isEmpty(locations.name) &&
      isDuplicatedLocation(
        locations,
        model.locations.filter((u, i) => i !== index)
      );
    if (isDuplicated) {
      acc[`locations[${index}].name`] = 'The same Location Address cannot be used.';
    }

    if (isEmpty(locations.name)) {
      acc[`locations[${index}].name`] = 'Location Name cannot be empty.';
    }

    return acc;
  }, {});
  return Object.keys(userErrorList).length > 0 ? userErrorList : false;
};

const validateCertificationAndTrainingGroupName = (name: string, groupNameList: string[]) => {
  if (!isEmpty(name)) {
    if (groupNameList.includes(name)) {
      return 'Group Name is already in use.';
    } else {
      groupNameList.push(name);
      return false;
    }
  }
  return 'Please enter a Group Name';
};

const validateCertificationAndTrainingGroupItems = (
  items: IProjectCertification[] | IProjectTraining[],
  entity: 'Certification' | 'Training',
  getErrorKeyFn: (index: number) => string,
  itemsInUseList: string[],
  aliasInUseList: string[]
) => {
  const errors = {};
  items.forEach((item, itemIndex) => {
    const key = getErrorKeyFn(itemIndex);
    if (itemsInUseList.includes(item.id)) {
      errors[key + 'id'] = `${entity} is already in use`;
    } else {
      itemsInUseList.push(item.id);
    }

    if (aliasInUseList.includes(item.alias) && item.alias !== '') {
      errors[key + 'alias'] = `Alias is already in use.`;
    } else {
      aliasInUseList.push(item.alias);
    }
  });
  return errors;
};

const validateCertificationGroupsList = ({ value: groupsList }: { value: ICertificationGroup[] }) => {
  const groupNameList = [];
  const certificationsInUseList = [];
  const aliasInUseList = [];

  const errorList = groupsList.reduce((errors: any, group, groupIndex) => {
    const nameError = validateCertificationAndTrainingGroupName(group.name, groupNameList);
    if (nameError) {
      errors[`certificationGroups[${groupIndex}].name`] = nameError;
    }

    if (isEmpty(group.validationType)) {
      errors[`certificationGroups[${groupIndex}].validationType`] = 'Please select a Validation Type';
    }

    if (isEmpty(group.certifications)) {
      errors[`certificationGroups[${groupIndex}].certifications`] = 'Please select at least one Certification';
    } else {
      const getErrorKey = (itemIndex: number) => `certificationGroups[${groupIndex}].certifications[${itemIndex}].`;
      const certificationErrors = validateCertificationAndTrainingGroupItems(
        group.certifications,
        'Certification',
        getErrorKey,
        certificationsInUseList,
        aliasInUseList
      );
      if (Object.keys(certificationErrors).length > 0) {
        errors = { ...errors, ...certificationErrors };
      }
    }
    return errors;
  }, {});
  return Object.keys(errorList).length > 0 ? errorList : false;
};

const validateTrainingGroupsList = ({ value: groupsList }: { value: ITrainingGroup[] }) => {
  const groupNameList = [];
  const trainingsInUseList = [];
  const aliasInUseList = [];

  const errorList = groupsList.reduce((errors: any, group, groupIndex) => {
    const nameError = validateCertificationAndTrainingGroupName(group.name, groupNameList);
    if (nameError) {
      errors[`trainingGroups[${groupIndex}].name`] = nameError;
    }

    if (isEmpty(group.validationType)) {
      errors[`trainingGroups[${groupIndex}].validationType`] = 'Please select a Validation Type';
    }

    if (isEmpty(group.trainings)) {
      errors[`trainingGroups[${groupIndex}].trainings`] = 'Please select at least one Training';
    } else {
      const getErrorKey = (itemIndex: number) => `trainingGroups[${groupIndex}].trainings[${itemIndex}].`;
      const trainingsErrors = validateCertificationAndTrainingGroupItems(group.trainings, 'Training', getErrorKey, trainingsInUseList, aliasInUseList);
      if (Object.keys(trainingsErrors).length > 0) {
        errors = { ...errors, ...trainingsErrors };
      }
    }
    return errors;
  }, {});
  return Object.keys(errorList).length > 0 ? errorList : false;
};

export const fieldRules: IFormRules = {
  name: {
    required: true,
    rules: [],
  },
  description: {
    required: false,
    rules: [],
  },
  categoryId: {
    required: false,
    rules: [],
  },
  ccv: {
    required: false,
    rules: [],
  },
  regionId: {
    required: false,
    rules: [],
  },
  nae: {
    required: false,
    rules: [],
  },
  startDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  endDate: {
    required: false,
    rules: [ruleMap.isInvalidDate],
  },
  plannedMonths: {
    required: false,
    rules: [],
  },
  billingModelType: {
    required: false,
    rules: [],
  },
  badgeBillingModel: {
    required: false,
    rules: [validateDraftBadgeBillingModel],
  },
  seatBillingModel: {
    required: false,
    rules: [validateDraftSeatBillingModel],
  },
  locations: {
    required: false,
    rules: [validateLocationList],
  },
  [ProjectModel.ProjectFields.CERTIFICATION_GROUPS]: {
    required: false,
    rules: [validateCertificationGroupsList],
  },
  [ProjectModel.ProjectFields.TRAINING_GROUPS]: {
    required: false,
    rules: [validateTrainingGroupsList],
  },
  [ProjectModel.ProjectFields.MUST_COMPLY_WITH_NYC_LL_196]: {
    required: false,
    rules: [],
  },
  [ProjectModel.ProjectFields.PERMIT_HOLDER]: {
    required: false,
    rules: [],
  },
  [ProjectModel.ProjectFields.PERMIT_NUMBER]: {
    required: false,
    rules: [],
  },
  [ProjectModel.ProjectFields.LICENCE_NUMBER]: {
    required: false,
    rules: [],
  },
};

const isDuplicatedLocation = (location: ILocation, locations: ILocation[]) => locations.filter(locationItem => locationItem.name === location.name).length > 0;

export const getGeneralInformationRules = () => ({
  ...fieldRules,
  name: {
    required: true,
    rules: [],
  },
  description: {
    required: false,
    rules: [],
  },
  categoryId: {
    required: true,
    rules: [],
  },
  ccv: {
    required: true,
    rules: [],
  },
  regionId: {
    required: true,
    rules: [],
  },
  naeId: {
    required: true,
    rules: [],
  },
  startDate: {
    required: true,
    rules: [],
  },
  endDate: {
    required: true,
    rules: [],
  },
  plannedMonths: {
    required: false,
    rules: [],
  },
  timeZoneId: {
    required: true,
    rules: [],
  },
  mustComplyWithNycLL196: {
    required: false,
    rules: [],
  },
  permitHolder: {
    required: false,
    rules: [],
  },
  permitNumber: {
    required: false,
    rules: [],
  },
  licenseNumber: {
    required: false,
    rules: [],
  },
});

export const getBillingModelRules = ({ billingModelType }) => ({
  ...fieldRules,
  billingModelType: {
    required: true,
    rules: [],
  },
  badgeBillingModel: {
    required: billingModelType === ProjectModel.BillingModelType.BADGES,
    rules: billingModelType === ProjectModel.BillingModelType.BADGES ? [validateRequiredBadgeBillingModel] : [],
  },
  seatBillingModel: {
    required: billingModelType === ProjectModel.BillingModelType.SEATS,
    rules: billingModelType === ProjectModel.BillingModelType.SEATS ? [validateRequiredSeatBillingModel] : [],
  },
});

export const getAddressesRules = ({
  badgingMatchesJobSite,
  mailingMatchingType,
}: {
  badgingMatchesJobSite: boolean;
  mailingMatchingType: ProjectModel.MailingAddressMatchingType;
}) => ({
  ...fieldRules,
  jobSiteAddress: {
    required: true,
    rules: [validateRequiredAddress],
  },
  badgingSiteAddress: {
    required: !badgingMatchesJobSite,
    rules: [badgingMatchesJobSite ? validateAddress : validateRequiredAddress],
  },
  mailingAddress: {
    required: mailingMatchingType === ProjectModel.MailingAddressMatchingType.NONE,
    rules: [mailingMatchingType === ProjectModel.MailingAddressMatchingType.NONE ? validateRequiredAddress : validateAddress],
  },
});

const validateConsentFormLegals = ({ value: consentFormLegals }: { value: IConsentFormLegal[] }) => {
  const errorList = consentFormLegals.reduce((acc: any, legal, index) => {
    if (isEmpty(legal.body)) {
      acc[`consentFormLegals[${index}].body`] =
        legal.languageCode === 'en' ? 'Please enter English Consent Form Legal' : 'Please enter Spanish Consent Form Legal';
    } else if (isEmpty(legal.name)) {
      acc[`consentFormLegals[${index}].name`] =
        legal.languageCode === 'en' ? 'Please enter English Consent Form Name' : 'Please enter Spanish Consent Form Name';
    }
    return acc;
  }, {});
  return Object.keys(errorList).length > 0 ? errorList : false;
};

export const getConsentFormRules = () => ({
  ...fieldRules,
  consentFormFields: {
    required: false,
    rules: [],
  },
  consentFormLegals: {
    required: true,
    rules: [validateConsentFormLegals],
  },
});
