import { WorkerModel, CertificationModel, ConsentFormModel, TrainingModel } from '../modules/models';
import { isEmpty, sanitizePhoneNumber } from './generalUtils';
import { isNYCity } from './addressUtils';

export const idNumberMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export const preloadWorker = (worker: WorkerModel.IWorker) => ({
  ...worker,
  ethnicityId: worker.ethnicity ? worker.ethnicity.id : null,
  primaryLanguageId: worker.primaryLanguage ? worker.primaryLanguage.id : null,
  tradesIds: isEmpty(worker.trades) ? [] : worker.trades.map(trade => trade.id),
  identificationTypeId: worker.identificationType ? worker.identificationType.id : null,
  identificationGeographicLocationId: worker.identificationGeographicLocation ? worker.identificationGeographicLocation.id : null,
});

export const sanitizeWorker = (worker: WorkerModel.IWorker) => ({
  ...worker,
  companyId: worker.company?.id ?? null,
  phoneNumber: worker.phoneNumber ? sanitizePhoneNumber(worker.phoneNumber) : null,
  mobilePhoneNumber: worker.mobilePhoneNumber ? sanitizePhoneNumber(worker.mobilePhoneNumber) : null,
  emergencyContactPhone: worker.emergencyContactPhone ? sanitizePhoneNumber(worker.emergencyContactPhone) : null,
  socialSecurityNumber: worker.socialSecurityNumber ? worker.socialSecurityNumber.replace(/-/g, '') : null,
  tradesIds: isEmpty(worker.trades) ? [] : worker.trades.map(trade => trade.id),
  trades: isEmpty(worker.trades) ? [] : worker.trades.map(trade => trade.id as any),
  gender: isEmpty(worker.gender) ? null : worker.gender,
  email: isEmpty(worker.email) ? null : worker.email,
  identificationNumber: worker.identificationNumber ? worker.identificationNumber.replace(/-/g, '') : null,
  identificationGeographicLocationId: worker.identificationGeographicLocationId ?? null,
  identificationTypeId: worker.identificationTypeId ?? null,
  ethnicityId: worker.ethnicityId ?? null,
  primaryLanguageId: worker.primaryLanguageId ?? null,
  address: worker.address ? { ...worker.address, borough: isNYCity(worker.address.city) ? worker.address.borough : null } : null,
});

export const sanitizeCertification = (certification: CertificationModel.IWorkerCertification): CertificationModel.IWorkerCertification => ({
  ...certification,
  projectId: isEmpty(certification.projectId) ? null : certification.projectId,
});

export const sanitizeTraining = (training: TrainingModel.IWorkerTraining): TrainingModel.IWorkerTraining => ({
  ...training,
  projectId: isEmpty(training.projectId) ? null : training.projectId,
});

export const getWorkerAssignQuery = query => ({
  ...query,
  excludeFromProjectId: query.id,
  id: undefined,
});

export const preloadConsentForm = (consentForm: ConsentFormModel.IConsentForm) => ({
  ...consentForm,
  jobTitleId: consentForm.jobTitle ? consentForm.jobTitle.id : null,
  socJobTitleId: consentForm.socJobTitle ? consentForm.socJobTitle.id : null,
  tradeStatusId: consentForm.tradeStatus ? consentForm.tradeStatus.id : null,
  languageTurnerProtocolId: consentForm.languageTurnerProtocol ? consentForm.languageTurnerProtocol.id : null,
  projectSkilledTradeId: consentForm.projectSkilledTrade ? consentForm.projectSkilledTrade.id : null,
});
