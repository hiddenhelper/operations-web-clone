import { of } from 'rxjs';

import {
  getProject_1,
  getClient_1,
  getMwbeType_1,
  getTrades_1,
  getProjectCategory_1,
  getProjectRegion_1,
  getFcaNae_1,
  getCertification_1,
  getTraining_1,
  validateTokenResponse,
  getClientUserPagination_1,
  getClientProjectPagination_1,
  getBillingTierList_1,
  getProjectUserPagination_1,
  getProjectClientPagination_1,
  getUser_1,
  getUserRole_1,
  getAccessControlSystemDevice_1,
  getAccessControlSystemDevice_2,
  getWorker_1,
  getEthnicity_1,
  getPrimaryLanguage_1,
  getJobTitle_1,
  getSkilledTrade_1,
  getBadgePrinterSystem_1,
  getWorkerStatistics_1,
  getIdentificationType_1,
  getSocJobTitle_1,
  getWorkerCertification_1,
  getProjectStatistics_1,
  getClientStatistics_1,
  getInventoryStatistics_1,
  getClientWorkerPagination_1,
  getFileResource_1,
  getFileResource_2,
  getUploadFile_1,
  getConsentFormFields,
  getConsentForm_1,
  getProjectBadgeResourceResponse_1,
  getBadge_1,
  getVisitorProject_1,
  getBadgeVisitorEntity_1,
  getTodayWidgetStatistiscs_1,
  getDownloadedFileResponse,
  getProjectWidgetStatistics_1,
  getWorkerTraining_1,
  getPaymentMethod_1,
  getProjectInvoiceServiceList_1,
  getInvoice_1,
  getClientWidgetStatistics_1,
  getTodayWidgetStatistiscs_2,
  getTodayWidgetStatistiscs_3,
  getGrossRevenueWidgetStatistics_1,
  getWorkersActivityWidgetStatistics_1,
  getInvoiceStatistics_1,
  getProjectAccessControlSystem_1,
  getWorkerActivity_1,
  getBadgeHistory_1,
  getProjectWorkersActivityStatistics_1,
  getAccessControlSystemWidget_1,
  getBadgePrintingSystemWidget_1,
  getProjectClientsWidget_1,
  getProjectActiviesWidget_1,
  getBadgeByLocationWidget_1,
  getProjectRevenueProjectStatistics_1,
  getProjectTopTenStatistics_1,
  getUserAccount_1,
  getBadgeByProjectWidget_1,
  getClientProjectHirearchyList_1,
  getClientDetailStatistics_1,
  getWorkerObservation_1,
  getProjectDetailStatistics_1,
  getClientTopTenStatistics_1,
  getNamedEntity_1,
  getCountry_1,
  getCountry_2,
  getCountry_3,
  getCountry_4,
  getTimeZone_1,
  getGeographicLocation_1,
  getTradeStatus_1,
  getLanguageTurnerProtocol_1,
  getSearchWoker,
} from '../test/entities';

export class ApiServiceMock {
  public static AuthService = {
    getSession: jest.fn().mockReturnValue(
      of({
        getIdToken: () => ({ getJwtToken: () => 'token' }),
        getAccessToken: () => ({ getJwtToken: () => 'token' }),
      })
    ),
  };

  public getClient = jest.fn().mockReturnValue(of(getClient_1()));
  public getDraftClient = jest.fn().mockReturnValue(of(getClient_1()));
  public getClientList = jest.fn().mockReturnValue(
    of({
      items: [getClient_1()],
      pageNumber: 1,
      totalResults: 1,
    })
  );
  public getMwbeTypes = jest.fn().mockReturnValue(of(getMwbeType_1()));
  public getTrades = jest.fn().mockReturnValue(of(getTrades_1()));
  public saveClient = jest.fn().mockReturnValue(of(getClient_1()));
  public inviteDraftClient = jest.fn().mockReturnValue(of(getClient_1()));
  public updateDraftClient = jest.fn().mockReturnValue(of(getClient_1()));
  public getProject = jest.fn().mockReturnValue(of(getProject_1()));
  public getDraftProject = jest.fn().mockReturnValue(of(getProject_1()));
  public getProjectClientList = jest.fn().mockReturnValue(of(getProjectClientPagination_1()));
  public getProjectUserList = jest.fn().mockReturnValue(of(getProjectUserPagination_1()));
  public getSelfProjectList = jest.fn().mockReturnValue(
    of({
      items: [getProject_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getProjectList = jest.fn().mockReturnValue(
    of({
      items: [getProject_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getProjectSummary = jest.fn().mockReturnValue(of(getProject_1()));
  public getSelfProjectSummary = jest.fn().mockReturnValue(of(getProject_1()));
  public getUserList = jest.fn().mockReturnValue(
    of({
      items: [getUser_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public saveProject = jest.fn().mockReturnValue(of(getProject_1()));
  public updateDraftProject = jest.fn().mockReturnValue(of(getProject_1()));
  public updateProject = jest.fn().mockReturnValue(of(getProject_1()));
  public sendApproveClient = jest.fn().mockReturnValue(of(undefined));
  public approveClient = jest.fn().mockReturnValue(of(undefined));
  public getProjectCategories = jest.fn().mockReturnValue(of([getProjectCategory_1()]));
  public getFcaNae = jest.fn().mockReturnValue(of([getFcaNae_1()]));
  public getFcaRegion = jest.fn().mockReturnValue(of([getProjectRegion_1()]));
  public searchClient = jest.fn().mockReturnValue(of([]));
  public searchProject = jest.fn().mockReturnValue(of([]));
  public getClientSummary = jest.fn().mockReturnValue(of(getClient_1()));
  public getClientDetail = jest.fn().mockReturnValue(of(getClient_1()));
  public getCertifications = jest.fn().mockReturnValue(of([getCertification_1()]));
  public getTrainings = jest.fn().mockReturnValue(of([getTraining_1()]));
  public createAccount = jest.fn().mockReturnValue(of(undefined));
  public validateToken = jest.fn().mockReturnValue(of(validateTokenResponse()));
  public deleteClient = jest.fn().mockReturnValue(of(undefined));
  public deleteProject = jest.fn().mockReturnValue(of(undefined));
  public getClientUserList = jest.fn().mockReturnValue(of(getClientUserPagination_1()));
  public getClientProjectList = jest.fn().mockReturnValue(of(getClientProjectPagination_1()));
  public sendApproveProject = jest.fn().mockReturnValue(of(undefined));
  public approveProject = jest.fn().mockReturnValue(of(undefined));
  public updateClient = jest.fn().mockReturnValue(of(getClient_1()));
  public archiveClient = jest.fn().mockReturnValue(of(undefined));
  public unarchiveClient = jest.fn().mockReturnValue(of(undefined));
  public archiveProject = jest.fn().mockReturnValue(of(undefined));
  public unarchiveProject = jest.fn().mockReturnValue(of(undefined));
  public getBillingTiers = jest.fn().mockReturnValue(of(getBillingTierList_1()));
  public assignClientProject = jest.fn().mockReturnValue(of(undefined));
  public assignUserProject = jest.fn().mockReturnValue(of(undefined));
  public assignAcsProject = jest.fn().mockReturnValue(of(undefined));
  public assignBadgePrintingSystemProject = jest.fn().mockReturnValue(of(undefined));
  public unAssignAccessControlSystemProject = jest.fn().mockReturnValue(of(undefined));
  public unAssignBadgePrintingSystemProject = jest.fn().mockReturnValue(of(undefined));
  public getUserRoles = jest.fn().mockReturnValue(of([getUserRole_1()]));
  public saveUser = jest.fn().mockReturnValue(of(getUser_1()));
  public getAccessControlSystemList = jest.fn().mockReturnValue(
    of({
      items: [getAccessControlSystemDevice_1()],
      pageNumber: 1,
      totalResults: 1,
    })
  );
  public getProjectAccessControlSystemList = jest.fn().mockReturnValue(
    of([
      {
        location: getAccessControlSystemDevice_1().location,
        accessControlSystems: [getAccessControlSystemDevice_1()],
      },
    ])
  );
  public getProjectBadgePrintingSystemList = jest.fn().mockReturnValue(
    of({
      items: [getBadgePrinterSystem_1()],
      pageNumber: 1,
      totalResults: 1,
    })
  );
  public getBadgePrinterSystemList = jest.fn().mockReturnValue(
    of({
      items: [getBadgePrinterSystem_1()],
      pageNumber: 1,
      totalResults: 1,
    })
  );
  public getAccessControlSystemSummary = jest.fn().mockReturnValue(of(getAccessControlSystemDevice_1()));
  public deleteAccessControlSystem = jest.fn().mockReturnValue(of(undefined));
  public deleteBadgePrinterSystem = jest.fn().mockReturnValue(of(undefined));
  public saveAccessControlSystemAccessPoint = jest.fn().mockReturnValue(of(getAccessControlSystemDevice_1()));
  public saveAccessControlSystemHandheld = jest.fn().mockReturnValue(of(getAccessControlSystemDevice_2()));
  public updateAccessControlSystemAccessPoint = jest.fn().mockReturnValue(of(getAccessControlSystemDevice_1()));
  public updateAccessControlSystemHandheld = jest.fn().mockReturnValue(of(getAccessControlSystemDevice_2()));
  public getAccessControlSystem = jest.fn().mockReturnValue(of(getAccessControlSystemDevice_1()));
  public saveWorker = jest.fn().mockReturnValue(of(getWorker_1()));
  public updateWorker = jest.fn().mockReturnValue(of(getWorker_1()));
  public getWorker = jest.fn().mockReturnValue(of(getWorker_1()));
  public getEthnicities = jest.fn().mockReturnValue(of([getEthnicity_1()]));
  public getLanguages = jest.fn().mockReturnValue(of([getPrimaryLanguage_1()]));
  public getJobTitles = jest.fn().mockReturnValue(of([getJobTitle_1()]));
  public getSkilledTrades = jest.fn().mockReturnValue(of([getSkilledTrade_1()]));
  public getIdentificationTypes = jest.fn().mockReturnValue(of([getIdentificationType_1()]));
  public getSocJobTitles = jest.fn().mockReturnValue(of([getSocJobTitle_1()]));
  public getSelfProject = jest.fn().mockReturnValue(of(getProject_1()));
  public acceptProjectInvitation = jest.fn().mockReturnValue(of({ companyHasCreditCard: true }));
  public getBadgePrinterSystem = jest.fn().mockReturnValue(of(getBadgePrinterSystem_1()));
  public saveBadgePrinterSystem = jest.fn().mockReturnValue(of(getBadgePrinterSystem_1()));
  public updateBadgePrinterSystem = jest.fn().mockReturnValue(of(getBadgePrinterSystem_1()));
  public updateProjectAccessControlSystem = jest.fn().mockReturnValue(of(getProjectAccessControlSystem_1()));
  public updateBadgePrintingSystemProjectDate = jest.fn().mockReturnValue(of(getBadgePrinterSystem_1()));
  public getWorkerStatistics = jest.fn().mockReturnValue(of(getWorkerStatistics_1()));
  public getSelfWorkerStatistics = jest.fn().mockReturnValue(of(getWorkerStatistics_1()));
  public getWorkerList = jest.fn().mockReturnValue(
    of({
      items: [getWorker_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getSelfWorkerList = jest.fn().mockReturnValue(
    of({
      items: [getWorker_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getWorkerCertificationList = jest.fn().mockReturnValue(
    of({
      items: [getWorkerCertification_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getWorkerTrainingList = jest.fn().mockReturnValue(
    of({
      items: [getWorkerTraining_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getVisitorBadgeList = jest.fn().mockReturnValue(
    of({
      items: [getVisitorProject_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getBadgeHistory = jest.fn().mockReturnValue(
    of({
      items: [getBadgeHistory_1()],
      pageNumber: 1,
      totalResults: 1,
      pageSize: 1,
    })
  );
  public getVisitorBadge = jest.fn().mockReturnValue(of(getBadge_1()));
  public createBadgeVisitors = jest.fn().mockReturnValue(of(undefined));
  public getWorkerCertification = jest.fn().mockReturnValue(of(getWorkerCertification_1()));
  public getWorkerTraining = jest.fn().mockReturnValue(of(getWorkerTraining_1()));
  public getWorkerProjectNameList = jest.fn().mockReturnValue(of([{ id: getProject_1().id, name: getProject_1().name }]));
  public addWorkerCertification = jest.fn().mockReturnValue(of(getWorkerCertification_1()));
  public updateWorkerCertification = jest.fn().mockReturnValue(of(getWorkerCertification_1()));
  public deleteWorkerCertification = jest.fn().mockReturnValue(of(getWorkerCertification_1()));
  public deleteWorkerCertificationFiles = jest.fn().mockReturnValue(of({}));
  public addWorkerTraining = jest.fn().mockReturnValue(of([{ workerId: getWorker_1().id, workerTrainingId: getWorkerTraining_1().id }]));
  public updateWorkerTraining = jest.fn().mockReturnValue(of(getWorkerTraining_1()));
  public deleteWorkerTraining = jest.fn().mockReturnValue(of(getWorkerTraining_1()));
  public deleteWorkerTrainingFiles = jest.fn().mockReturnValue(of({}));
  public saveSelfWorker = jest.fn().mockReturnValue(of(getWorker_1()));
  public getProjectStatistics = jest.fn().mockReturnValue(of(getProjectStatistics_1()));
  public getCompanyProjectStatistics = jest.fn().mockReturnValue(of(getProjectStatistics_1()));
  public getClientStatistics = jest.fn().mockReturnValue(of(getClientStatistics_1()));
  public getInventoryStatistics = jest.fn().mockReturnValue(of(getInventoryStatistics_1()));
  public getProjectWorkerList = jest.fn().mockReturnValue(of({ items: [getWorker_1()], pageNumber: 1, totalResults: 1, pageSize: 1 }));
  public getClientWorkerList = jest.fn().mockReturnValue(of(getClientWorkerPagination_1()));
  public assignWorkerProject = jest.fn().mockReturnValue(of([getWorker_1()]));
  public getWorkerCertificationResource = jest.fn().mockReturnValue(of([getFileResource_1(), getFileResource_2()]));
  public getWorkerTrainingResource = jest.fn().mockReturnValue(of([getFileResource_1(), getFileResource_2()]));
  public uploadFile = jest.fn().mockReturnValue(of(getUploadFile_1()));
  public uploadConfirm = jest.fn().mockReturnValue(of(undefined));
  public getWorkerProjectList = jest.fn().mockReturnValue(of({ items: [getProject_1()], pageNumber: 1, totalResults: 1, pageSize: 1 }));
  public getConsentFormFields = jest.fn().mockReturnValue(of(getConsentFormFields()));
  public getConsentForm = jest.fn().mockReturnValue(of(getConsentForm_1()));
  public getEditableConsentForm = jest.fn().mockReturnValue(of(getConsentForm_1()));
  public getProjectBadgeResources = jest.fn().mockReturnValue(of(getProjectBadgeResourceResponse_1()));
  public getBadge = jest.fn().mockReturnValue(of(getBadge_1()));
  public activateBadge = jest.fn().mockReturnValue(of(getBadge_1()));
  public deactivateBadge = jest.fn().mockReturnValue(of(getBadge_1()));
  public revokeBadge = jest.fn().mockReturnValue(of(getBadge_1()));
  public saveConsentForm = jest.fn().mockReturnValue(of(getConsentForm_1()));
  public getBadgeVisitorEntity = jest.fn().mockReturnValue(of(getBadgeVisitorEntity_1()));
  public updateBadgeVisitor = jest.fn().mockReturnValue(of(undefined));
  public updateBadge = jest.fn().mockReturnValue(of(undefined));
  public getNewBadges = jest.fn().mockReturnValue(of(getTodayWidgetStatistiscs_1()));
  public getGrossRevenueStatistics = jest.fn().mockReturnValue(of(getTodayWidgetStatistiscs_2()));
  public getWorkersActivityStatistics = jest.fn().mockReturnValue(of(getTodayWidgetStatistiscs_3()));
  public getGrossRevenueWidgetStatistics = jest.fn().mockReturnValue(of(getGrossRevenueWidgetStatistics_1()));
  public getWorkersActivityWidgetStatistics = jest.fn().mockReturnValue(of(getWorkersActivityWidgetStatistics_1()));
  public getClientWorkersActivityWidgetStatistics = jest.fn().mockReturnValue(of(getWorkersActivityWidgetStatistics_1()));
  public getPrintableWorkerBadge = jest.fn().mockReturnValue(of(getDownloadedFileResponse()));
  public getPrintableVisitorBadge = jest.fn().mockReturnValue(of(getDownloadedFileResponse()));
  public resetPassword = jest.fn().mockReturnValue(of(undefined));
  public confirmResetPassword = jest.fn().mockReturnValue(of(undefined));
  public getProjectWidgetStatistics = jest.fn().mockReturnValue(of(getProjectWidgetStatistics_1()));
  public getPaymentMethods = jest.fn().mockReturnValue(of([getPaymentMethod_1()]));
  public createPayment = jest.fn().mockReturnValue(of(getPaymentMethod_1()));
  public deletePayment = jest.fn().mockReturnValue(of(undefined));
  public replacePayment = jest.fn().mockReturnValue(of(undefined));
  public getServiceTypeList = jest.fn().mockReturnValue(of(getProjectInvoiceServiceList_1()));
  public getInvoiceList = jest.fn().mockReturnValue(of({ items: [getInvoice_1()], totalResults: 1, pageNumber: 1, pageSize: 1 }));
  public saveInvoice = jest.fn().mockReturnValue(of(getInvoice_1()));
  public getClientWidgetStatistics = jest.fn().mockReturnValue(of(getClientWidgetStatistics_1()));
  public getInvoiceStatistics = jest.fn().mockReturnValue(of(getInvoiceStatistics_1()));
  public getInvoiceSummary = jest.fn().mockReturnValue(of(getInvoice_1()));
  public deleteInvoice = jest.fn().mockReturnValue(of(undefined));
  public markInvoiceAsPaid = jest.fn().mockReturnValue(of(undefined));
  public markInvoiceAsVoid = jest.fn().mockReturnValue(of(undefined));
  public editInvoice = jest.fn().mockReturnValue(of(getInvoice_1()));
  public getInvoice = jest.fn().mockReturnValue(of(getInvoice_1()));
  public payInvoice = jest.fn().mockReturnValue(of(undefined));
  public confirmInvoice = jest.fn().mockReturnValue(of(undefined));
  public downloadInvoice = jest.fn().mockReturnValue(of(getInvoice_1()));
  public getWorkerActivityList = jest.fn().mockReturnValue(
    of({
      items: [getWorkerActivity_1()],
      pageSize: 10,
      pageNumber: 1,
      totalResults: 1,
    })
  );
  public getProjectAccessControlSystem = jest.fn().mockReturnValue(of(getProjectAccessControlSystem_1()));
  public getProjectWorkersActivityStatistics = jest.fn().mockReturnValue(of(getProjectWorkersActivityStatistics_1()));
  public getProjectAccessControlSystemStatistics = jest.fn().mockReturnValue(of(getAccessControlSystemWidget_1()));
  public getProjectBadgePrintingSystemStatistics = jest.fn().mockReturnValue(of(getBadgePrintingSystemWidget_1()));
  public getProjectClientsStatistics = jest.fn().mockReturnValue(of(getProjectClientsWidget_1()));
  public getProjectActivesStatistics = jest.fn().mockReturnValue(of(getProjectActiviesWidget_1()));
  public getProjectBadgeLocationStatistics = jest.fn().mockReturnValue(of(getBadgeByLocationWidget_1()));
  public getProjectBadgeProjectStatistics = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getProjectRevenueProjectStatistics = jest.fn().mockReturnValue(of(getProjectRevenueProjectStatistics_1()));
  public getProjectTopTenStatistics = jest.fn().mockReturnValue(of(getProjectTopTenStatistics_1()));
  public changePassword = jest.fn().mockReturnValue(of(undefined));
  public getWorkersByProject = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByClient = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByLocation = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByJobData = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByJobDataByTrades = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByJobDataByExperience = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByTradesMinority = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByTradesNonMinority = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersCertifications = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersObservations = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByDemographicDataByLanguage = jest.fn().mockReturnValue(of(getProjectClientsWidget_1()));
  public getWorkersByDemographicDataByEthnicity = jest.fn().mockReturnValue(of(getBadgeByProjectWidget_1()));
  public getWorkersByDemographicDataByGender = jest.fn().mockReturnValue(of(getProjectClientsWidget_1()));
  public getWorkersTrainings = jest.fn().mockReturnValue(of(getProjectClientsWidget_1()));
  public getWorkersNewWorkers = jest.fn().mockReturnValue(of(getWorkersActivityWidgetStatistics_1()));
  public getProfilePhotoResource = jest.fn().mockReturnValue(of(getFileResource_1()));
  public updateProfile = jest.fn().mockReturnValue(of(undefined));
  public updateCompanyUserProfile = jest.fn().mockReturnValue(of(undefined));
  public getAccount = jest.fn().mockReturnValue(of(getUserAccount_1()));
  public getCompanyUserAccount = jest.fn().mockReturnValue(of(getUserAccount_1()));
  public getProjectClientHirearchyList = jest.fn().mockReturnValue(
    of({
      items: getClientProjectHirearchyList_1(),
      pageSize: 10,
      pageNumber: 1,
      totalResults: 1,
    })
  );
  public getWorkerObservation = jest.fn().mockReturnValue(of(getWorkerObservation_1()));
  public getWorkerObservationList = jest.fn().mockReturnValue(
    of({
      items: [getWorkerObservation_1()],
      pageSize: 10,
      pageNumber: 1,
      totalResults: 1,
    })
  );
  public getClientDetailStatistics = jest.fn().mockReturnValue(of(getClientDetailStatistics_1()));
  public getProjectDetailStatistics = jest.fn().mockReturnValue(of(getProjectDetailStatistics_1()));
  public getClientTopTenStatistics = jest.fn().mockReturnValue(of(getClientTopTenStatistics_1()));
  public getClientActivesStatistics = jest.fn().mockReturnValue(of(getProjectActiviesWidget_1()));
  public getClientsByTrades = jest.fn().mockReturnValue(of(getBadgeByLocationWidget_1()));
  public getClientRevenueWidgetStatistics = jest.fn().mockReturnValue(of(getGrossRevenueWidgetStatistics_1()));
  public getNewAssignedWorkersWidgetStatistics = jest.fn().mockReturnValue(of(getWorkersActivityWidgetStatistics_1()));
  public getWorkerProjectByCompany = jest.fn().mockReturnValue(of([getNamedEntity_1()]));
  public downloadConsentForm = jest.fn().mockReturnValue(of(getConsentForm_1()));
  public getCountryList = jest.fn().mockReturnValue(of([getCountry_1(), getCountry_2(), getCountry_3(), getCountry_4()]));
  public getProjectClientSummary = jest.fn().mockReturnValue(of(getClient_1()));
  public updateClientProjectTaxCondition = jest.fn().mockReturnValue(of(undefined));
  public updateProjectPaymentMethod = jest.fn().mockReturnValue(of(undefined));
  public getTimeZones = jest.fn().mockReturnValue(of([getTimeZone_1()]));
  public getStatusProcore = jest.fn().mockReturnValue(of({ status: { isConnected: false } }));
  public connectProcore = jest.fn().mockReturnValue(of(undefined));
  public disconnectProcore = jest.fn().mockReturnValue(of(undefined));
  public getProcoreClients = jest.fn().mockReturnValue(of(undefined));
  public getProcoreProjects = jest.fn().mockReturnValue(of(undefined));
  public getProcoreProjectMappings = jest.fn().mockReturnValue(of(undefined));
  public getProcoreVendors = jest.fn().mockReturnValue(of(undefined));
  public getProcoreVendorMappings = jest.fn().mockReturnValue(of(undefined));
  public saveProcoreProjectMappings = jest.fn().mockReturnValue(of(undefined));
  public saveProcoreVendorMappings = jest.fn().mockReturnValue(of(undefined));
  public getReportFrequency = jest.fn().mockReturnValue(of(undefined));
  public saveReportFrequency = jest.fn().mockReturnValue(of(undefined));
  public getGeographicLocationsList = jest.fn().mockReturnValue(of([getGeographicLocation_1()]));
  public getTradeStatuses = jest.fn().mockReturnValue(of([getTradeStatus_1()]));
  public getLanguageTurnerProtocols = jest.fn().mockReturnValue(of([getLanguageTurnerProtocol_1()]));
  public quickSearch = jest.fn().mockReturnValue(of(getSearchWoker()));
}
