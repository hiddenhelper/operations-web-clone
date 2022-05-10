import { GeneralModel, WorkerModel, CertificationModel, ConsentFormModel } from '../../models';

export interface IState {
  workerMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  workerClientMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<WorkerModel.IWorker>>;
  workerProjectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<WorkerModel.IWorkerProject>>;
  certificationMap: GeneralModel.IEntityMap<CertificationModel.IWorkerCertification>;
  ethnicityList: WorkerModel.IEthnicity[];
  languageList: WorkerModel.ILanguage[];
  skilledTradeList: WorkerModel.ISkilledTrade[];
  identificationTypeList: WorkerModel.IIdentificationType[];
  projectList: WorkerModel.IProjectList[];
  count: number;
  consentForm: ConsentFormModel.IConsentForm;
  workerActivityList: WorkerModel.IWorkerActivity[];
  workerActivityCount: number;
  workerObservationList: WorkerModel.IWorkerObservation[];
  workerObservationCount: number;
  observation: WorkerModel.IWorkerObservation;
  geographicLocationsList: WorkerModel.IGeographicLocation[];
  jobTitlesList: WorkerModel.IJobTitle[];
  socJobTitlesList: WorkerModel.ISocJobTitle[];
  tradeStatusesList: WorkerModel.ITradeStatus[];
  languageTurnerProtocolsList: WorkerModel.ILanguageTurnerProtocol[];
}

export const initialState: IState = {
  workerMap: {},
  workerClientMap: {},
  workerProjectMap: {},
  certificationMap: {},
  ethnicityList: [],
  languageList: [],
  skilledTradeList: [],
  identificationTypeList: [],
  projectList: [],
  count: null,
  consentForm: null,
  workerActivityList: [],
  workerActivityCount: null,
  workerObservationList: [],
  workerObservationCount: null,
  observation: null,
  geographicLocationsList: [],
  jobTitlesList: [],
  socJobTitlesList: [],
  tradeStatusesList: [],
  languageTurnerProtocolsList: [],
};
