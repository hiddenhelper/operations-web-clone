import { CompanyRole } from 'modules/models/project-new';
import { IFormRules } from 'utils';
import { validateRules } from '../../utils/useValidator';
import { isEmpty, parseFloatNumber, sanitizeNumber } from '../../utils/generalUtils';
import { AddressModel, ProjectNewModel } from 'modules/models';
import { ILocation } from 'modules/models/address';
import { CompanyStatus } from 'modules/models/project-new';
import { ICertificationGroup, IProjectCertification } from 'modules/models/certification';
import { IProjectTraining, ITrainingGroup } from 'modules/models/training';
import { IConsentFormLegal } from 'modules/models/consentForm';

export const canadaRegex = new RegExp(/^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}-[0-9]{1}[a-zA-Z]{1}[0-9]{1}$/);
export const zipRegex = new RegExp(/^[0-9]{5}-[0-9]{4}$|^[0-9]{5}$/);

export const validateBadge = (value: number, total: number = 1000, isSanitze = false) =>
  value && (isSanitze ? sanitizeNumber(value) >= total : parseFloatNumber(value) >= total);

const validateZipCode = ({ value }) => {
  const sanitizedValue = value?.length === 6 ? value?.replace('-', '').replace(' ', '') : value;
  const isInvalid = !zipRegex.test(sanitizedValue) && !canadaRegex.test(sanitizedValue);
  return value && value.length > 0 && isInvalid && 'Zip Code format is invalid.';
};

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

export const validateBadgeBillingModel = ({ value: badgeModel }: { value: ProjectNewModel.IBadgesModel }, rules: IFormRules) => {
  const err = validateRules({ model: badgeModel, constraints: rules });
  const badgeErrorList = Object.keys(err).reduce((total: any, field, index) => ({ ...total, [field]: err[field] }), {});
  return Object.keys(err).length > 0 ? badgeErrorList : false;
};

export const validateSeatBillingModel = ({ value: seatModel }: { value: ProjectNewModel.ISeatsModel }, rules: IFormRules) => {
  const err = validateRules({ model: seatModel, constraints: rules });
  const seatErrorList = Object.keys(err).reduce((total: any, field, index) => ({ ...total, [field]: err[field] }), {});
  return Object.keys(err).length > 0 ? seatErrorList : false;
};

export const validateRequiredBadgeBillingModel = value =>
  validateBadgeBillingModel(value, getRequiredBadgeModelRules({ isBilledPerCompany: value.value?.isBilledPerCompany }));

export const validateRequiredSeatBillingModel = value =>
  validateSeatBillingModel(value, getRequiredSeatModelRules({ isFixedSeatPrice: value.value?.isFixedSeatPrice }));

export const validateAddress = ({ value: addressModel }: { value: AddressModel.IAddress }) => {
  const err = validateRules({ model: addressModel, constraints: addressRules });
  const addressModelList = Object.keys(err).reduce((total: any, field, index) => ({ ...total, [field]: err[field] }), {});
  return Object.keys(err).length > 0 ? addressModelList : false;
};

export const validateRequiredAddress = ({ value: addressModel }: { value: AddressModel.IAddress }) => {
  const err = validateRules({ model: addressModel, constraints: requiredAddressRules });
  const addressModelList = Object.keys(err).reduce((total: any, field, index) => ({ ...total, [field]: err[field] }), {});
  return Object.keys(err).length > 0 ? addressModelList : false;
};

const isDuplicatedLocation = (location: ILocation, locations: ILocation[]) => locations.filter(locationItem => locationItem.name === location.name).length > 0;

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

    if (aliasInUseList.includes(item.alias) && item.alias !== '' && !!item.alias) {
      errors[key + 'alias'] = `Alias is ad already in use.`;
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
};

export const GeneralInformationLabelRules: IFormRules = {
  name: {
    required: true,
  },
  description: {
    required: false,
  },
  categoryId: {
    required: true,
  },
  ccv: {
    required: false,
  },
  regionId: {
    required: true,
  },
  naeId: {
    required: true,
  },
  startDate: {
    required: true,
  },
  endDate: {
    required: true,
  },
  plannedMonths: {
    required: false,
  },
  timeZoneId: {
    required: true,
  },
  mustComplyWithNycLL196: {
    required: false,
  },
  permitHolder: {
    required: false,
  },
  permitNumber: {
    required: false,
  },
  licenseNumber: {
    required: false,
  },
};

export const GeneralInformationDraftRules: IFormRules = {
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
  naeId: {
    required: false,
    rules: [],
  },
  startDate: {
    required: false,
    rules: [],
  },
  endDate: {
    required: false,
    rules: [],
  },
  plannedMonths: {
    required: false,
    rules: [],
  },
  timeZoneId: {
    required: false,
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
};

export const GeneralInformationApprovalRules: IFormRules = {
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
    required: false,
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
};

export const getBillingModelDraftRules = () => ({
  ...fieldRules,
  billingModelType: {
    required: false,
    rules: [],
  },
  badgeBillingModel: {
    required: false,
    rules: [],
  },
  seatBillingModel: {
    required: false,
    rules: [],
  },
});

export const getBillingModelApprovalRules = ({ billingModelType }) => ({
  ...fieldRules,
  billingModelType: {
    required: true,
    rules: [],
  },
  badgeBillingModel: {
    required: billingModelType === ProjectNewModel.BillingModelType.BADGES,
    rules: billingModelType === ProjectNewModel.BillingModelType.BADGES ? [validateRequiredBadgeBillingModel] : [],
  },
  seatBillingModel: {
    required: billingModelType === ProjectNewModel.BillingModelType.SEATS,
    rules: billingModelType === ProjectNewModel.BillingModelType.SEATS ? [validateRequiredSeatBillingModel] : [],
  },
});

export const BadgeBillingModelLabelRules: IFormRules = {
  badgePrice: {
    required: true,
  },
  reprintingCost: {
    required: true,
  },
  billedCompanyId: {
    required: false,
  },
  visitorBadgePrice: {
    required: true,
  },
  visitorReprintingCost: {
    required: true,
  },
};

export const SeatBillingModelLabelRules: IFormRules = {
  estimatedWorkersNumber: {
    required: true,
  },
  seatPrice: {
    required: false,
  },
  billedCompanyId: {
    required: false,
  },
  reprintingCost: {
    required: true,
  },
  visitorBadgePrice: {
    required: true,
  },
  visitorReprintingCost: {
    required: true,
  },
};

const validateProjectOwner = value => {
  const hasDeveloperProjectOwner = !!value?.find(
    company => company.role === CompanyRole.DEVELOPER_PROJECT_OWNER && company.name && company.status === CompanyStatus.ACTIVE
  );
  return hasDeveloperProjectOwner;
};

const validateGeneralContractor = value => {
  const hasGeneralContractor = !!value?.find(
    company => company.role === CompanyRole.GENERAL_CONTRACTOR && company.name && company.status === CompanyStatus.ACTIVE
  );
  return hasGeneralContractor;
};

export const AssignClientLabelRules: IFormRules = {
  relatedCompanies: {
    required: true,
  },
};

export const AssignClientDraftRules: IFormRules = {
  ...fieldRules,
  relatedCompanies: {
    required: false,
  },
};

export const AssignClientApprovalRules: IFormRules = {
  ...fieldRules,
  relatedCompanies: {
    required: true,
    rules: [
      ({ value }) => {
        const hasProjectOwner = validateProjectOwner(value);
        const hasGeneralContractor = validateGeneralContractor(value);
        const errors = [];
        if (!hasProjectOwner) {
          errors[CompanyRole.DEVELOPER_PROJECT_OWNER] = 'is required';
        }
        if (!hasGeneralContractor) {
          errors[CompanyRole.GENERAL_CONTRACTOR] = 'is required';
        }
        return errors.length > 0 ? errors : (false as false);
      },
    ],
  },
};

export const getAddressesDraftRules = () => ({
  ...fieldRules,
  jobSiteAddress: {
    required: false,
    rules: [],
  },
  badgingSiteAddress: {
    required: false,
    rules: [],
  },
  mailingAddress: {
    required: false,
    rules: [],
  },
  locations: {
    required: false,
    rules: [validateLocationList],
  },
});

export const getAddressesRules = ({
  badgingMatchesJobSite,
  mailingMatchingType,
}: {
  badgingMatchesJobSite: boolean;
  mailingMatchingType: ProjectNewModel.MailingAddressMatchingType;
}) => {
  return {
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
      required: mailingMatchingType === ProjectNewModel.MailingAddressMatchingType.NONE,
      rules: [mailingMatchingType === ProjectNewModel.MailingAddressMatchingType.NONE ? validateRequiredAddress : validateAddress],
    },
    locations: {
      required: true,
      rules: [validateLocationList],
    },
  };
};

export const addressRules = {
  line1: {
    required: false,
    rules: [],
  },
  line2: {
    required: false,
    rules: [],
  },
  city: {
    required: false,
    rules: [],
  },
  countryId: {
    required: false,
    rules: [],
  },
  stateCode: {
    required: false,
    rules: [],
  },
  zipCode: {
    required: false,
    rules: [validateZipCode],
  },
  latitude: {
    required: false,
    rules: [],
  },
  longitude: {
    required: false,
    rules: [],
  },
  attention1: {
    required: false,
    rules: [],
  },
  attention2: {
    required: false,
    rules: [],
  },
};

export const requiredAddressRules = {
  line1: {
    required: true,
    rules: [],
  },
  line2: {
    required: false,
    rules: [],
  },
  city: {
    required: true,
    rules: [],
  },
  countryId: {
    required: true,
    rules: [],
  },
  stateCode: {
    required: true,
    rules: [],
  },
  zipCode: {
    required: true,
    rules: [validateZipCode],
  },
  latitude: {
    required: true,
    rules: [],
  },
  longitude: {
    required: true,
    rules: [],
  },
};

export const AddressesLabelRules: IFormRules = {
  line1: { required: true },
  line2: { required: false },
  country: { required: true },
  countryId: { required: true },
  city: { required: true },
  stateCode: { required: true },
  stateName: { required: false },
  zipCode: { required: true },
  county: { required: false },
  borough: { required: false },
  latitude: { required: false },
  longitude: { required: false },
  attention1: { required: false },
  attention2: { required: false },
  locations: { required: true },
};

export const CertificationDraftRules = {
  ...fieldRules,
  certificationGroups: {
    required: false,
    rules: [validateCertificationGroupsList],
  },
  trainingGroups: {
    required: false,
    rules: [validateTrainingGroupsList],
  },
};

export const CertificationApprovalRules = {
  ...fieldRules,
  certificationGroups: {
    required: false,
    rules: [validateCertificationGroupsList],
  },
  trainingGroups: {
    required: false,
    rules: [validateTrainingGroupsList],
  },
};

export const BadgeTemplateDraftRules = {
  ...fieldRules,
};

export const BadgeTemplateApprovalRules = {
  ...fieldRules,
};

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

export const getConsentFormDraftRules = () => ({
  ...fieldRules,
  consentFormFields: {
    required: false,
    rules: [],
  },
  consentFormLegals: {
    required: false,
    rules: [],
  },
});

export const getConsentFormApprovalRules = () => ({
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

export const getReviewDraftRules = () => ({
  ...GeneralInformationDraftRules,
  ...AssignClientDraftRules,
  ...getBillingModelDraftRules(),
  ...getAddressesDraftRules(),
  ...CertificationDraftRules,
});

export const getReviewApprovalRules = ({ billingModelType, badgingMatchesJobSite, mailingMatchingType }) => ({
  ...GeneralInformationApprovalRules,
  ...AssignClientApprovalRules,
  ...getBillingModelApprovalRules({ billingModelType }),
  ...getAddressesRules({ badgingMatchesJobSite, mailingMatchingType }),
  ...CertificationApprovalRules,
});
