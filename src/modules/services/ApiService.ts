import { Observable, of, throwError, Subject } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, retryWhen, mergeMap, switchMap, take, delay } from 'rxjs/operators';

import {
  GeneralModel,
  ClientModel,
  ProjectModel,
  UserModel,
  AccessControlSystemModel,
  WorkerModel,
  BadgePrintingSystemModel,
  CertificationModel,
  FileModel,
  ConsentFormModel,
  BadgeModel,
  StatisticsModel,
  TrainingModel,
  PaymentModel,
  InvoiceModel,
  ProcoreModel,
  SearchModel,
} from '../models';
import { ENV, LANG } from '../../constants';
import { parseQuery, sanitizePaginationQuery } from '../../utils/generalUtils';
import { AuthService } from './AuthService';
import { IProcoreSaveProjectMapping, IProcoreSaveVendorMapping } from '../models/procore';

interface IOptionRequest {
  method: string;
  body?: any;
  headers?: { [key: string]: any };
}

interface IMock {
  isError: boolean;
  response: Object;
}

export class ApiService {
  public static AuthService = AuthService;
  private http = ajax;
  private apiUrl: string = ENV.API.URL;
  private securityApiUrl: string = ENV.API.SECURITY_URL;
  private maxRetries: number = ENV.API.MAX_RETRIES;
  private retryTimeout: number = ENV.API.RETRY_TIMEOUT;

  // Projects
  public getProject(id: string): Observable<ProjectModel.IProject> {
    return this.protectedRequest(`projects/${id}`, { method: 'GET' });
  }

  public getProjectSummary(id: string): Observable<ProjectModel.IProject> {
    return this.protectedRequest(`projects/${id}/summary`, { method: 'GET' });
  }

  public getProjectList(query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<ProjectModel.IProject>> {
    return this.protectedRequest(`projects?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public updateProject(project: Partial<ProjectModel.IProject>): Observable<ProjectModel.IProject> {
    return this.protectedRequest(`projects/${project.id}`, { method: 'PUT', body: project });
  }

  public getProjectClientList(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<ClientModel.IClientProject>> {
    return this.protectedRequest(`projects/${id}/companies?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getProjectUserList({ id, query }: { id: string; query: GeneralModel.IQueryParams }): Observable<GeneralModel.IPagination<Partial<UserModel.IUser>>> {
    return this.protectedRequest(`projects/${id}/users?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getProjectAccessControlSystemList({
    id,
    query,
  }: {
    id: string;
    query?: GeneralModel.IQueryParams;
  }): Observable<AccessControlSystemModel.IProjectAccessControlSystemByLocation[]> {
    return this.protectedRequest(`projects/${id}/accessControlSystems?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getProjectBadgePrintingSystemList({
    id,
    page = 1,
    limit = 30,
  }: {
    id: string;
    page?: number;
    limit?: number;
  }): Observable<GeneralModel.IPagination<BadgePrintingSystemModel.IBadgePrintingSystem>> {
    return this.protectedRequest(`projects/${id}/badgePrintingSystems?pageNumber=${page}&pageSize=${limit}`, { method: 'GET' });
  }

  public assignClientProject(id: string, list: { id: string; role: ProjectModel.CompanyRole }[], sponsorId: string): Observable<ClientModel.IClient[]> {
    return this.protectedRequest(`projects/${id}/companies/assign`, { method: 'POST', body: { companies: list, sponsorId } });
  }

  public assignUserProject(id: string, list: ProjectModel.IProjectAssignUser[]): Observable<UserModel.IUser[]> {
    return this.protectedRequest(`projects/${id}/users/assign`, { method: 'POST', body: list });
  }

  public assignAcsProject(
    projectId: string,
    acs: AccessControlSystemModel.IProjectAccessControlSystem
  ): Observable<AccessControlSystemModel.IAccessControlSystem[]> {
    return this.protectedRequest(`projects/${projectId}/accessControlSystems`, { method: 'POST', body: acs });
  }

  public assignBadgePrintingSystemProject(
    projectId: string,
    list: BadgePrintingSystemModel.IBadgePrintingSystemUpdateDate[]
  ): Observable<BadgePrintingSystemModel.IBadgePrintingSystem[]> {
    return this.protectedRequest(`projects/${projectId}/badgePrintingSystems/assign`, { method: 'POST', body: list });
  }

  public unAssignAccessControlSystemProject(projectId: string, acsId: string): Observable<any> {
    return this.protectedRequest(`projects/${projectId}/accessControlSystems/${acsId}`, { method: 'DELETE' });
  }

  public unAssignBadgePrintingSystemProject(projectId: string, bpsId: string): Observable<BadgePrintingSystemModel.IBadgePrintingSystem> {
    return this.protectedRequest(`projects/${projectId}/badgePrintingSystems/${bpsId}/unassign`, { method: 'POST' });
  }

  public getProjectAccessControlSystem(projectId: string, acsId: string): Observable<AccessControlSystemModel.IProjectAccessControlSystem> {
    return this.protectedRequest(`projects/${projectId}/accessControlSystems/${acsId}`, { method: 'GET' });
  }

  public updateProjectAccessControlSystem(
    projectId: string,
    acsId: string,
    acs: AccessControlSystemModel.IProjectAccessControlSystem
  ): Observable<AccessControlSystemModel.IProjectAccessControlSystem> {
    return this.protectedRequest(`projects/${projectId}/accessControlSystems/${acsId}`, { method: 'PUT', body: acs });
  }

  public updateBadgePrintingSystemProjectDate(
    projectId: string,
    bpsId: string,
    shippingDate: string
  ): Observable<BadgePrintingSystemModel.IBadgePrintingSystem> {
    return this.protectedRequest(`projects/${projectId}/badgePrintingSystems/${bpsId}`, { method: 'PUT', body: { shippingDate } });
  }

  public archiveProject(id: string): Observable<any> {
    return this.protectedRequest(`projects/${id}/archive`, { method: 'POST' });
  }

  public unarchiveProject(id: string): Observable<any> {
    return this.protectedRequest(`projects/${id}/unarchive`, { method: 'POST' });
  }

  public getProjectClientHirearchyList(id: string): Observable<GeneralModel.IPagination<ClientModel.IHirearchyClientProject>> {
    return this.protectedRequest(`projects/${id}/companies/hierarchy`, { method: 'GET' });
  }

  public getDraftProject(id: string): Observable<ProjectModel.IProject> {
    return this.protectedRequest(`draftProjects/${id}`, { method: 'GET' });
  }

  public saveProject(project: Partial<ProjectModel.IProject>): Observable<ProjectModel.IProject> {
    return this.protectedRequest('draftProjects', { method: 'POST', body: project });
  }

  public updateDraftProject(project: Partial<ProjectModel.IProject>): Observable<ProjectModel.IProject> {
    return this.protectedRequest(`draftProjects/${project.id}`, { method: 'PUT', body: project });
  }

  public sendApproveProject(id: string): Observable<any> {
    return this.protectedRequest(`draftProjects/${id}/sendForApproval`, { method: 'POST' });
  }

  public approveProject(id: string): Observable<any> {
    return this.protectedRequest(`draftProjects/${id}/approve`, { method: 'POST' });
  }

  public deleteProject(id: string): Observable<any> {
    return this.protectedRequest(`draftProjects/${id}`, { method: 'DELETE' });
  }

  public getProjectCategories(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('categories', { method: 'GET' });
  }

  public getFcaNae(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('naes', { method: 'GET' });
  }

  public getFcaRegion(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('regions', { method: 'GET' });
  }

  public getSizeCategories(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('sizeCategories', { method: 'GET' });
  }

  public getCertifications(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('certifications', { method: 'GET' });
  }

  public getTrainings(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('trainings', { method: 'GET' });
  }

  public getBillingTiers(): Observable<ProjectModel.IBillingTier[]> {
    return this.protectedRequest('billingTiers', { method: 'GET' });
  }

  public getProjectWorkerList({
    id,
    query,
  }: {
    id: string;
    query: GeneralModel.IQueryParams;
  }): Observable<GeneralModel.IPagination<WorkerModel.IWorkerProject>> {
    return this.protectedRequest(`projects/${id}/workers?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public assignWorkerProject(projectId: string, list: { id: string; location: string }[]): Observable<WorkerModel.IWorker[]> {
    return this.protectedRequest(`projects/${projectId}/workers/assign`, { method: 'POST', body: list });
  }

  public getProjectBadgeResources(projectId: string, fileNames: object): Observable<ProjectModel.IProjectBadgeFilesResource> {
    return this.protectedRequest(`draftProjects/${projectId}/uploadBadgeTemplateLogos`, { method: 'POST', body: fileNames });
  }

  public getVisitorBadgeList({ id, query }: { id: string; query: GeneralModel.IQueryParams }): Observable<GeneralModel.IPagination<BadgeModel.IBadgeVisitor>> {
    return this.protectedRequest(`projects/${id}/visitorbadges?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public createBadgeVisitors(projectId: string, number: number): Observable<any> {
    return this.protectedRequest(`projects/${projectId}/visitorbadges/create`, { method: 'POST', body: { badgeCount: number } });
  }

  public getBadgeVisitorEntity(projectId: string): Observable<string[]> {
    return this.protectedRequest(`projects/${projectId}/visitorbadges/entities`, { method: 'GET' });
  }

  public searchProject(query: GeneralModel.IQueryParams): Observable<ProjectModel.IProject[]> {
    return this.protectedRequest(`projects/search?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectClientSummary(projectId: string, clientId: string): Observable<ClientModel.IClient> {
    return this.protectedRequest(`projects/${projectId}/companies/${clientId}/summary`, { method: 'GET' });
  }

  public updateClientProjectTaxCondition(projectId: string, taxCondition: ProjectModel.IClientTaxCondition): Observable<any> {
    return this.protectedRequest(`projects/${projectId}/companies/updateTaxExemptionStatus`, { method: 'PUT', body: taxCondition });
  }

  public getTimeZones(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('timeZones', { method: 'GET' });
  }

  public updateProjectPaymentMethod(projectId: string, paymentMethodId: string): Observable<any> {
    return this.protectedRequest(`projects/${projectId}/changeCreditCard`, { method: 'PUT', body: { paymentMethodId } });
  }

  // Invoice
  public getInvoiceList(query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<InvoiceModel.IInvoice>> {
    return this.protectedRequest(`invoices?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getServiceTypeList(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest(`billableServices`, { method: 'GET' });
  }

  public saveInvoice(invoice: InvoiceModel.IInvoice): Observable<InvoiceModel.IInvoice> {
    return this.protectedRequest(`invoices`, { method: 'POST', body: invoice });
  }

  public editInvoice(id: string, invoice: InvoiceModel.IInvoice): Observable<any> {
    return this.protectedRequest(`invoices/${id}`, { method: 'PUT', body: invoice });
  }

  public getInvoiceSummary(id: string): Observable<InvoiceModel.IInvoice> {
    return this.protectedRequest(`invoices/${id}/summary`, { method: 'GET' });
  }

  public getInvoice(id: string): Observable<InvoiceModel.IInvoice> {
    return this.protectedRequest(`invoices/${id}`, { method: 'GET' });
  }

  public deleteInvoice(id: string): Observable<any> {
    return this.protectedRequest(`invoices/${id}`, { method: 'DELETE' });
  }

  public markInvoiceAsPaid(id: string): Observable<any> {
    return this.protectedRequest(`invoices/${id}/markAsPaid`, { method: 'POST' });
  }

  public markInvoiceAsVoid(id: string): Observable<any> {
    return this.protectedRequest(`invoices/${id}/markAsVoid`, { method: 'POST' });
  }

  public payInvoice(id: string): Observable<any> {
    return this.protectedRequest(`invoices/${id}/pay`, { method: 'POST' });
  }

  public confirmInvoice(id: string): Observable<any> {
    return this.protectedRequest(`invoices/${id}/confirm`, { method: 'POST' });
  }

  public downloadInvoice(id: string): Observable<FileModel.IDownloadFile> {
    return ApiService.AuthService.getSession().pipe(mergeMap(token => this.downloadFile(`invoices/${id}/download`, 'pdf', token.getIdToken().getJwtToken())));
  }

  // Company
  public getClient(id: string): Observable<ClientModel.IClient> {
    return this.protectedRequest(`companies/${id}`, { method: 'GET' });
  }

  public getClientList(query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<ClientModel.IClient>> {
    return this.protectedRequest(`companies?${parseQuery(sanitizePaginationQuery(query))}`, {
      method: 'GET',
    });
  }

  public getClientUserList({
    id,
    page = 1,
    limit = 30,
  }: {
    id: string;
    page?: number;
    limit?: number;
  }): Observable<GeneralModel.IPagination<Partial<UserModel.IUser>>> {
    return this.protectedRequest(`companies/${id}/users?pageNumber=${page}&pageSize=${limit}`, { method: 'GET' });
  }

  public getClientProjectList(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<Partial<ProjectModel.IProject>>> {
    return this.protectedRequest(`companies/${id}/projects?${parseQuery(query)}`, { method: 'GET' });
  }

  public getClientWorkerList(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<Partial<WorkerModel.IWorker>>> {
    return this.protectedRequest(`companies/${id}/workers?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getClientDetail(id: string): Observable<ClientModel.IClient> {
    return this.protectedRequest(`companies/${id}`, { method: 'GET' });
  }

  public getClientSummary(id: string): Observable<ClientModel.IClient> {
    return this.protectedRequest(`companies/${id}/summary`, { method: 'GET' });
  }

  public saveUser(companyId: string, user: UserModel.IUser): Observable<UserModel.IUser> {
    return this.protectedRequest(`companies/${companyId}/users`, { method: 'POST', body: user });
  }

  public updateClient(client: ClientModel.IClient): Observable<ClientModel.IClient> {
    return this.protectedRequest(`companies/${client.id}`, { method: 'PUT', body: client });
  }

  public archiveClient(id: string): Observable<any> {
    return this.protectedRequest(`companies/${id}/archive`, { method: 'POST' });
  }

  public unarchiveClient(id: string): Observable<any> {
    return this.protectedRequest(`companies/${id}/unarchive`, { method: 'POST' });
  }

  public searchClient(query: GeneralModel.IQueryParams): Observable<ClientModel.IClient[]> {
    return this.protectedRequest(`companies/search?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkerProjectByCompany(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest(`companies/${id}/workers/projectNames?${parseQuery(query)}`);
  }

  public getDraftClient(id: string): Observable<ClientModel.IClient> {
    return this.protectedRequest(`draftCompanies/${id}`, { method: 'GET' });
  }

  public saveClient(client: ClientModel.IClient): Observable<ClientModel.IClient> {
    return this.protectedRequest('draftCompanies', { method: 'POST', body: client });
  }

  public sendApproveClient(id: string): Observable<any> {
    return this.protectedRequest(`draftCompanies/${id}/sendForApproval`, { method: 'POST' });
  }

  public approveClient(id: string): Observable<any> {
    return this.protectedRequest(`draftCompanies/${id}/approve`, { method: 'POST' });
  }

  public inviteDraftClient(client: ClientModel.IClient): Observable<ClientModel.IClient> {
    return this.protectedRequest(`draftCompanies/invite`, { method: 'POST', body: client });
  }

  public updateDraftClient(client: ClientModel.IClient): Observable<ClientModel.IClient> {
    return this.protectedRequest(`draftCompanies/${client.id}`, { method: 'PUT', body: client });
  }

  public deleteClient(id: string): Observable<any> {
    return this.protectedRequest(`draftCompanies/${id}`, { method: 'DELETE' });
  }

  public getMwbeTypes(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('MwbeTypes', { method: 'GET' });
  }

  public getTrades(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('Trades', { method: 'GET' });
  }

  public getConsentFormFields(): Observable<ConsentFormModel.IConsentFormField[]> {
    return this.protectedRequest('consentFormFields', { method: 'GET' });
  }

  // Workers
  public getWorker(id: string): Observable<WorkerModel.IWorker> {
    return this.protectedRequest(`workers/${id}`, { method: 'GET' });
  }

  public getWorkerActivityList(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<Partial<WorkerModel.IWorkerActivity>>> {
    return this.protectedRequest(
      `workers/${id}/activities?${parseQuery(
        sanitizePaginationQuery({ ...query, sortType: 'DESC', sortingName: 'EventTimestamp', period: query?.period, projectId: query.projectId || undefined })
      )}`
    );
  }

  public getWorkerObservationList(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<Partial<WorkerModel.IWorkerObservation>>> {
    return this.protectedRequest(
      `workers/${id}/observations?${parseQuery(sanitizePaginationQuery({ ...query, period: query?.period, projectId: query.projectId || undefined }))}`
    );
  }

  public getWorkerList(query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<WorkerModel.IWorker>> {
    return this.protectedRequest(`workers?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public saveWorker(worker: WorkerModel.IWorker): Observable<WorkerModel.IWorker> {
    return this.protectedRequest('workers', { method: 'POST', body: worker });
  }

  public updateWorker(worker: WorkerModel.IWorker): Observable<WorkerModel.IWorker> {
    return this.protectedRequest(`workers/${worker.id}`, { method: 'PUT', body: worker });
  }

  public getWorkerCertificationList(
    id: string,
    query: GeneralModel.IQueryParams
  ): Observable<GeneralModel.IPagination<CertificationModel.IWorkerCertification>> {
    return this.protectedRequest(`workers/${id}/certifications?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getWorkerTrainingList(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<TrainingModel.IWorkerTraining>> {
    return this.protectedRequest(`workers/${id}/trainings?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getWorkerProjectList(
    id: string,
    query: GeneralModel.IQueryParams = { page: 1, limit: 30 }
  ): Observable<GeneralModel.IPagination<ProjectModel.IWorkerProject>> {
    return this.protectedRequest(`workers/${id}/projects?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getWorkerCertification(id: string, certId: string): Observable<CertificationModel.IWorkerCertification> {
    return this.protectedRequest(`workers/${id}/certifications/${certId}`, { method: 'GET' });
  }

  public getWorkerTraining(id: string, trainingId: string): Observable<TrainingModel.IWorkerTraining> {
    return this.protectedRequest(`workers/${id}/trainings/${trainingId}`, { method: 'GET' });
  }

  public getWorkerProjectNameList(id: string): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest(`workers/${id}/projectnames`, { method: 'GET' });
  }

  public addWorkerCertification(id: string, certification: CertificationModel.IWorkerCertification): Observable<CertificationModel.IWorkerCertification> {
    return this.protectedRequest(`workers/${id}/certifications`, { method: 'POST', body: certification });
  }

  public updateWorkerCertification(
    workerId: string,
    certification: CertificationModel.IWorkerCertification
  ): Observable<CertificationModel.IWorkerCertification> {
    return this.protectedRequest(`workers/${workerId}/certifications/${certification.id}`, { method: 'PUT', body: certification });
  }

  public deleteWorkerCertification(workerId: string, certificationId: string): Observable<CertificationModel.IWorkerCertification> {
    return this.protectedRequest(`workers/${workerId}/certifications/${certificationId}`, { method: 'DELETE' });
  }

  public deleteWorkerCertificationFiles(workerId: string, certificationId: string, files: string[]): Observable<any> {
    return this.protectedRequest(`workers/${workerId}/certifications/${certificationId}/files`, { method: 'DELETE', body: { fileIds: files } });
  }

  public addWorkerTraining(id: string, training: TrainingModel.IWorkerTraining): Observable<TrainingModel.IWorkerTraining> {
    return this.protectedRequest(`workers/trainings/create`, { method: 'POST', body: { ...training, workers: [id] } });
  }

  public updateWorkerTraining(workerId: string, training: TrainingModel.IWorkerTraining): Observable<TrainingModel.IWorkerTraining> {
    return this.protectedRequest(`workers/${workerId}/trainings/${training.id}`, { method: 'PUT', body: training });
  }

  public deleteWorkerTraining(workerId: string, trainingId: string): Observable<TrainingModel.IWorkerTraining> {
    return this.protectedRequest(`workers/${workerId}/trainings/${trainingId}`, { method: 'DELETE' });
  }

  public deleteWorkerTrainingFiles(workerId: string, trainingId: string, files: string[]): Observable<any> {
    return this.protectedRequest(`workers/${workerId}/trainings/${trainingId}/files`, { method: 'DELETE', body: { fileIds: files } });
  }

  public getWorkerCertificationResource(workerId: string, certId: string, list: string[]): Observable<any> {
    return this.protectedRequest(`workers/${workerId}/certifications/${certId}/upload`, { method: 'POST', body: { fileNames: list } });
  }

  public getWorkerTrainingResource(workerId: string, trainingId: string, list: string[]): Observable<any> {
    return this.protectedRequest(`workers/${workerId}/trainings/${trainingId}/upload`, { method: 'POST', body: { fileNames: list } });
  }

  public getConsentForm(workerId: string, projectId: string): Observable<ConsentFormModel.IConsentForm> {
    return this.protectedRequest(`workers/${workerId}/projects/${projectId}/consentForm`, { method: 'GET' });
  }

  public getEditableConsentForm(workerId: string, projectId: string): Observable<ConsentFormModel.IConsentForm> {
    return this.protectedRequest(`workers/${workerId}/projects/${projectId}/projectForm`, { method: 'GET' });
  }

  public saveConsentForm(workerId: string, projectId: string, data: ConsentFormModel.IProjectInformationForm): Observable<ConsentFormModel.IConsentForm> {
    return this.protectedRequest(`workers/${workerId}/projects/${projectId}/projectForm`, { method: 'PUT', body: data });
  }

  public getEthnicities(): Observable<WorkerModel.IEthnicity[]> {
    return this.protectedRequest('ethnicities', { method: 'GET' });
  }

  public getLanguages(): Observable<WorkerModel.ILanguage[]> {
    return this.protectedRequest('languages', { method: 'GET' });
  }

  public getJobTitles(): Observable<WorkerModel.IJobTitle[]> {
    return this.protectedRequest('jobTitles', { method: 'GET' });
  }

  public getSkilledTrades(): Observable<WorkerModel.ISkilledTrade[]> {
    return this.protectedRequest('skilledTrades', { method: 'GET' });
  }

  public getIdentificationTypes(): Observable<WorkerModel.IIdentificationType[]> {
    return this.protectedRequest('identificationTypes', { method: 'GET' });
  }

  public getSocJobTitles(): Observable<WorkerModel.ISOCJobTitle[]> {
    return this.protectedRequest('socJobTitles', { method: 'GET' });
  }

  public getWorkerObservation(workerId: string, id: string): Observable<WorkerModel.IWorkerObservation> {
    return this.protectedRequest(`workers/${workerId}/observations/${id}`, { method: 'GET' });
  }

  public downloadConsentForm(id: string, projectId: string): Observable<FileModel.IDownloadFile> {
    return ApiService.AuthService.getSession().pipe(
      mergeMap(token => this.downloadFile(`workers/${id}/projects/${projectId}/consentForm/pdf`, 'pdf', token.getIdToken().getJwtToken()))
    );
  }

  public getGeographicLocationsList(): Observable<WorkerModel.IGeographicLocation[]> {
    return this.protectedRequest('geographicLocations', { method: 'GET' });
  }

  public getTradeStatuses(): Observable<WorkerModel.ITradeStatus[]> {
    return this.protectedRequest('tradeStatus', { method: 'GET' });
  }

  public getLanguageTurnerProtocols(): Observable<WorkerModel.ILanguageTurnerProtocol[]> {
    return this.protectedRequest('languageTurnerProtocol', { method: 'GET' });
  }

  // User
  public validateToken(token: string): Observable<GeneralModel.ITokenResponse> {
    return this.publicRequest('users/validateToken', { method: 'POST', body: { token } });
  }

  public createAccount(token: string, password: string): Observable<UserModel.IUser> {
    return this.publicRequest('users/register', { method: 'POST', body: { token, password } });
  }

  public getUserList(query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<Partial<UserModel.IUser>>> {
    return this.protectedRequest(`users?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getGroupList(query: any): Observable<any> {
    return this.securityRequest('groups/search', { method: 'POST', body: query });
  }

  public getUserRoles(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('projectRoles', { method: 'GET' });
  }

  public resetPassword(email: string): Observable<any> {
    return this.publicRequest('users/resetPassword', { method: 'POST', body: { email } });
  }

  public confirmResetPassword(token: string, email: string, password: string): Observable<any> {
    return this.publicRequest('users/confirmResetPassword', { method: 'POST', body: { email, token, password } });
  }

  public changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return ApiService.AuthService.getSession().pipe(
      mergeMap(token =>
        this.protectedRequest(`users/self/changePassword`, {
          method: 'PUT',
          body: { accessToken: token.getAccessToken().getJwtToken(), currentPassword, newPassword },
        })
      )
    );
  }

  public updateProfile(data): Observable<any> {
    return this.protectedRequest('users/self', { method: 'PUT', body: data });
  }

  public getStatusProcore(): Observable<any> {
    return this.protectedRequest('integrations/proCore/status', { method: 'GET' });
  }

  public getReportFrequency(clientId: string): Observable<any> {
    return this.protectedRequest(`integrations/procore/companies/${clientId}/settings`, { method: 'GET' });
  }

  public saveReportFrequency(clientId: string, frequency: number): Observable<any> {
    const data = {
      reportingFrequency: frequency,
    };
    return this.protectedRequest(`integrations/procore/companies/${clientId}/settings`, { method: 'PUT', body: data });
  }

  public connectProcore(data): Observable<any> {
    return this.protectedRequest('integrations/proCore/connect', {
      method: 'POST',
      body: { clientId: data.data.clientID, clientSecret: data.data.clientSecret },
    });
  }

  public disconnectProcore(): Observable<any> {
    return this.protectedRequest('integrations/proCore/disconnect', { method: 'DELETE' });
  }

  public getProcoreProjects(clientId: string): Observable<ProcoreModel.IProcoreProjects> {
    return this.protectedRequest(`integrations/procore/companies/${clientId}/projects`, { method: 'GET' });
  }

  public getProcoreProjectMappings(clientId: string): Observable<ProcoreModel.IProcoreProjectMappings> {
    return this.protectedRequest(`integrations/procore/companies/${clientId}/projectMappings`, { method: 'GET' });
  }

  public getProcoreVendors(clientId: string): Observable<ProcoreModel.IProcoreVendors> {
    return this.protectedRequest(`integrations/procore/companies/${clientId}/vendors`, { method: 'GET' });
  }

  public getProcoreVendorMappings(clientId: string): Observable<ProcoreModel.IProcoreVendorMappings> {
    return this.protectedRequest(`integrations/procore/companies/${clientId}/vendorMappings`, { method: 'GET' });
  }

  public saveProcoreProjectMappings(clientId: string, mappings: IProcoreSaveProjectMapping[]): Observable<any> {
    return this.protectedRequest(`integrations/procore/companies/${clientId}/projectMappings`, { method: 'PUT', body: { projectMappings: mappings } });
  }

  public saveProcoreVendorMappings(clientId: string, mappings: IProcoreSaveVendorMapping[]): Observable<any> {
    return this.protectedRequest(`integrations/procore/companies/${clientId}/vendorMappings`, { method: 'PUT', body: { vendorMappings: mappings } });
  }

  public getProcoreClients(): Observable<any> {
    return this.protectedRequest('integrations/procore/companies', { method: 'GET' });
  }

  public getAccount(): Observable<UserModel.IAccount> {
    return this.protectedRequest('users/self', { method: 'GET' });
  }

  public getProfilePhotoResource(fileName: string): Observable<FileModel.IS3FileResponse> {
    return this.protectedRequest(`users/self/uploadPicture`, { method: 'POST', body: { fileName } });
  }

  // CompanyUsers
  public saveSelfWorker(worker: WorkerModel.IWorker): Observable<WorkerModel.IWorker> {
    return this.protectedRequest('companyUsers/self/workers', { method: 'POST', body: worker });
  }

  public acceptProjectInvitation(id: string, paymentMethodId: string): Observable<any> {
    return this.protectedRequest(`projects/${id}/accept`, { method: 'POST', body: { paymentMethodId } });
  }

  public getSelfWorkerList(query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<WorkerModel.IWorker>> {
    return this.protectedRequest(`companyUsers/self/workers?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getSelfWorkerStatistics(): Observable<StatisticsModel.IWorkerStatistics> {
    return this.protectedRequest('companyUsers/self/statistics/worker', { method: 'GET' });
  }

  public updateCompanyUserProfile(data): Observable<any> {
    return this.protectedRequest('companyUsers/self', { method: 'PUT', body: data });
  }

  public getCompanyUserAccount(): Observable<UserModel.IAccount> {
    return this.protectedRequest('companyUsers/self', { method: 'GET' });
  }

  // Access Control Systems
  public getAccessControlSystem(id: string): Observable<AccessControlSystemModel.IAccessControlSystem> {
    return this.protectedRequest(`accessControlSystems/${id}`, { method: 'GET' });
  }

  public getAccessControlSystemList(
    query: GeneralModel.IQueryParams
  ): Observable<GeneralModel.IPagination<Partial<AccessControlSystemModel.IAccessControlSystem>>> {
    return this.protectedRequest(`accessControlSystems?${parseQuery(sanitizePaginationQuery(query))}`, {
      method: 'GET',
    });
  }

  public getAccessControlSystemSummary(id: string): Observable<AccessControlSystemModel.IAccessControlSystem> {
    return this.protectedRequest(`accessControlSystems/${id}/summary`, { method: 'GET' });
  }

  public deleteAccessControlSystem(id: string): Observable<any> {
    return this.protectedRequest(`accessControlSystems/${id}`, { method: 'DELETE' });
  }

  public saveAccessControlSystemAccessPoint(
    accessControlSystem: AccessControlSystemModel.IAccessControlSystem
  ): Observable<AccessControlSystemModel.IAccessControlSystem> {
    return this.protectedRequest('accessControlSystems/accessPoint', { method: 'POST', body: accessControlSystem });
  }

  public saveAccessControlSystemHandheld(
    accessControlSystem: AccessControlSystemModel.IAccessControlSystem
  ): Observable<AccessControlSystemModel.IAccessControlSystem> {
    return this.protectedRequest('accessControlSystems/handheld', { method: 'POST', body: accessControlSystem });
  }

  public updateAccessControlSystemAccessPoint(
    accessControlSystem: AccessControlSystemModel.IAccessControlSystem
  ): Observable<AccessControlSystemModel.IAccessControlSystem> {
    return this.protectedRequest(`accessControlSystems/accessPoint/${accessControlSystem.id}`, { method: 'PUT', body: accessControlSystem });
  }

  public updateAccessControlSystemHandheld(
    accessControlSystem: AccessControlSystemModel.IAccessControlSystem
  ): Observable<AccessControlSystemModel.IAccessControlSystem> {
    return this.protectedRequest(`accessControlSystems/handheld/${accessControlSystem.id}`, { method: 'PUT', body: accessControlSystem });
  }

  // Badge Printing Systems
  public getBadgePrinterSystemList(query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<BadgePrintingSystemModel.IBadgePrintingSystem>> {
    return this.protectedRequest(`badgePrintingSystems?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getBadgePrinterSystem(id: string): Observable<BadgePrintingSystemModel.IBadgePrintingSystem> {
    return this.protectedRequest(`badgePrintingSystems/${id}`, { method: 'GET' });
  }

  public deleteBadgePrinterSystem(id: string): Observable<BadgePrintingSystemModel.IBadgePrintingSystem> {
    return this.protectedRequest(`badgePrintingSystems/${id}`, { method: 'DELETE' });
  }

  public saveBadgePrinterSystem(badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem): Observable<BadgePrintingSystemModel.IBadgePrintingSystem> {
    return this.protectedRequest('badgePrintingSystems', { method: 'POST', body: badgePrinterSystem });
  }

  public updateBadgePrinterSystem(
    badgePrinterSystem: BadgePrintingSystemModel.IBadgePrintingSystem
  ): Observable<BadgePrintingSystemModel.IBadgePrintingSystem> {
    return this.protectedRequest(`badgePrintingSystems/${badgePrinterSystem.id}`, { method: 'PUT', body: badgePrinterSystem });
  }

  // Statistics
  public getProjectStatistics(): Observable<StatisticsModel.IProjectStatistics> {
    return this.protectedRequest('statistics/projects', { method: 'GET' });
  }

  public getCompanyProjectStatistics(): Observable<StatisticsModel.IProjectStatistics> {
    return this.protectedRequest('statistics/companyprojects', { method: 'GET' });
  }

  public getClientStatistics(): Observable<StatisticsModel.IResourceStatistics> {
    return this.protectedRequest('statistics/companies', { method: 'GET' });
  }

  public getInventoryStatistics(): Observable<StatisticsModel.IInventoryStatistics> {
    return this.protectedRequest('statistics/inventory', { method: 'GET' });
  }

  public getInvoiceStatistics(): Observable<StatisticsModel.IInvoiceStatistics> {
    return this.protectedRequest('statistics/invoices', { method: 'GET' });
  }

  public getWorkerStatistics(): Observable<StatisticsModel.IWorkerStatistics> {
    return this.protectedRequest('statistics/workers', { method: 'GET' });
  }

  public getNewBadges(): Observable<StatisticsModel.ITodayWidgetStatistics> {
    return this.protectedRequest(`statistics/newBadges`, { method: 'GET' });
  }

  public getProjectWidgetStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILinePieWidgetStatistics> {
    return this.protectedRequest(`statistics/projects/widget?${parseQuery(query)}`, { method: 'GET' });
  }

  public getClientWidgetStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IPieWidgetStatistics> {
    return this.protectedRequest(`statistics/companies/widget?${parseQuery(query)}`, { method: 'GET' });
  }

  public getGrossRevenueStatistics(): Observable<StatisticsModel.ITodayWidgetStatistics> {
    return this.protectedRequest('statistics/grossRevenue', { method: 'GET' });
  }

  public getProjectDetailStatistics(id: string): Observable<StatisticsModel.IProjectDetailStatistics> {
    return this.protectedRequest(`statistics/projects/${id}`, { method: 'GET' });
  }

  public getWorkersActivityStatistics(): Observable<StatisticsModel.ITodayWidgetStatistics> {
    return this.protectedRequest('statistics/workersActivity', { method: 'GET' });
  }

  public getClientDetailStatistics(id: string): Observable<StatisticsModel.IClientDetailStatistics> {
    return this.protectedRequest(`statistics/companies/${id}`, { method: 'GET' });
  }

  public getGrossRevenueWidgetStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILineWidgetStatistics> {
    return this.protectedRequest(`statistics/revenue/widget?${parseQuery(query)}`, { method: 'GET' });
  }

  public getClientRevenueWidgetStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILineWidgetStatistics> {
    return this.protectedRequest(`companiesStatistics/revenue/widget?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersActivityWidgetStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILinePieWidgetStatistics> {
    return this.protectedRequest(`statistics/workers/widget?${parseQuery(query)}`, { method: 'GET' });
  }

  public getClientWorkersActivityWidgetStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILinePieWidgetStatistics> {
    return this.protectedRequest(`companiesStatistics/workers/widget?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectWorkersActivityStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILinePieWidgetStatistics> {
    return this.protectedRequest(`projectStatistics/workersActivity?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectAccessControlSystemStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IAcsSummaryStatistics> {
    return this.protectedRequest(`projectStatistics/acs?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectBadgePrintingSystemStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IDeviceStatistics> {
    return this.protectedRequest(`projectStatistics/bps?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectClientsStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IPieWidgetStatistics> {
    return this.protectedRequest(`projectStatistics/clients?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectActivesStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILocationStatistics> {
    return this.protectedRequest(`projectStatistics/activeProjects/maps?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectBadgeLocationStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`projectStatistics/newBadgesByLocations?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectBadgeProjectStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`projectStatistics/newBadgesByProject?${parseQuery(query)}`, { method: 'GET' });
  }

  public getProjectRevenueProjectStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILineWidgetStatistics> {
    return this.getGrossRevenueWidgetStatistics(query);
  }

  public getProjectTopTenStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IProjectTopTenStatistics[]> {
    return this.protectedRequest(`projectStatistics/topTenProjects?${parseQuery(query)}`, { method: 'GET' });
  }

  public getClientTopTenStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IClientTopTenStatistics[]> {
    return this.protectedRequest(`companiesStatistics/topTenCompanies?${parseQuery(query)}`, { method: 'GET' });
  }

  public getClientActivesStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILocationStatistics> {
    return this.protectedRequest(`companiesStatistics/activeCompanies/maps?${parseQuery(query)}`, { method: 'GET' });
  }

  public getClientsByTrades(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`companiesStatistics/byTrades?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByProject(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByProjects?${parseQuery(query)}`, { method: 'GET' });
  }

  public getNewAssignedWorkersWidgetStatistics(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILinePieWidgetStatistics> {
    return this.protectedRequest(`workersStatistics/newAssigned?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByClient(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByClients?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByLocation(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByLocations?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByJobData(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByJobData?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByJobDataByTrades(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByTrades?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByJobDataByExperience(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByExperience?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByTradesMinority(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByTradesEthnicity?IsMinority=true&${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByTradesNonMinority(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByTradesEthnicity?IsMinority=false&${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersCertifications(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByCertifications?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersObservations(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByObservations?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByDemographicDataByLanguage(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IPieWidgetStatistics> {
    return this.protectedRequest(`workersStatistics/primaryLanguage?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByDemographicDataByEthnicity(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ITopTenStatistics[]> {
    return this.protectedRequest(`workersStatistics/topTenWorkersByEthnicity?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersByDemographicDataByGender(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IPieWidgetStatistics> {
    return this.protectedRequest(`workersStatistics/gender?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersTrainings(query: GeneralModel.IQueryParams): Observable<StatisticsModel.IPieWidgetStatistics> {
    return this.protectedRequest(`workersStatistics/training?${parseQuery(query)}`, { method: 'GET' });
  }

  public getWorkersNewWorkers(query: GeneralModel.IQueryParams): Observable<StatisticsModel.ILinePieWidgetStatistics> {
    return this.getWorkersActivityWidgetStatistics(query);
  }

  // Badge
  public getBadge(id: string): Observable<BadgeModel.IBadge> {
    return this.protectedRequest(`badges/${id}`, { method: 'GET' });
  }

  public updateBadge(id: string, badge: BadgeModel.IBadgeUpdateRequest): Observable<any> {
    return this.protectedRequest(`badges/${id}`, { method: 'PUT', body: badge });
  }

  public activateBadge(id: string, tagId: string): Observable<BadgeModel.IBadge> {
    return this.protectedRequest(`badges/${id}/activate`, { method: 'POST', body: { tagId, id } });
  }
  public revokeBadge(id: string, reason: string): Observable<BadgeModel.IBadge> {
    return this.protectedRequest(`badges/${id}/revoke`, { method: 'POST', body: { statusChangeReason: reason } });
  }

  public deactivateBadge(id: string, reason: string): Observable<BadgeModel.IBadge> {
    return this.protectedRequest(`badges/${id}/deactivate`, { method: 'POST', body: { statusChangeReason: reason } });
  }

  public getVisitorBadge(badgeId: string): Observable<BadgeModel.IBadge> {
    return this.protectedRequest(`badges/visitors/${badgeId}`, { method: 'GET' });
  }

  public updateBadgeVisitor(id: string, badgeVisitor: BadgeModel.IBadgeVisitor): Observable<any> {
    return this.protectedRequest(`badges/visitors/${id}`, { method: 'PUT', body: { ...badgeVisitor, id } });
  }

  public getBadgeHistory(id: string, query: GeneralModel.IQueryParams): Observable<GeneralModel.IPagination<BadgeModel.IBadgeHistory>> {
    return this.protectedRequest(`badges/${id}/history?${parseQuery(sanitizePaginationQuery(query))}`, { method: 'GET' });
  }

  public getPrintableWorkerBadge(badgeId: string): Observable<FileModel.IDownloadFile> {
    return ApiService.AuthService.getSession().pipe(mergeMap(token => this.downloadFile(`badges/${badgeId}/pdf`, 'pdf', token.getIdToken().getJwtToken())));
  }

  public getPrintableVisitorBadge(badgeId: string): Observable<FileModel.IDownloadFile> {
    return ApiService.AuthService.getSession().pipe(
      mergeMap(token => this.downloadFile(`badges/visitors/${badgeId}/pdf`, 'pdf', token.getIdToken().getJwtToken()))
    );
  }

  // Payment
  public getPaymentMethods(): Observable<PaymentModel.IPaymentMethod[]> {
    return this.protectedRequest('paymentMethod/self', { method: 'GET' });
  }

  public createPayment(id: string): Observable<PaymentModel.IPaymentMethod> {
    return this.protectedRequest('paymentMethod/self', { method: 'POST', body: { paymentMethodId: id } });
  }

  public deletePayment(id: string): Observable<PaymentModel.IPaymentMethod> {
    return this.protectedRequest(`paymentMethod/self/${id}`, { method: 'DELETE' });
  }

  public replacePayment(toDeleteId: string, toReplaceWithId: string): Observable<PaymentModel.IPaymentMethod> {
    return this.protectedRequest('paymentMethod/self/replace', {
      method: 'PUT',
      body: { oldPaymentMethodId: toDeleteId, newPaymentMethodId: toReplaceWithId },
    });
  }

  // General
  public getCountryList(): Observable<GeneralModel.INamedEntity[]> {
    return this.protectedRequest('countries', { method: 'GET' });
  }

  public quickSearch(search: SearchModel.ISearchParams): Observable<GeneralModel.IPagination<SearchModel.IResponse | SearchModel.IWorker>> {
    return this.protectedRequest(`quickSearch/?${parseQuery(sanitizePaginationQuery(search))}`, { method: 'GET' });
  }

  // Files
  public uploadFile(file: FileModel.IFile, url: string): Observable<Partial<FileModel.IFile>> {
    const subject = new Subject<Partial<FileModel.IFile>>();
    const xhr = new XMLHttpRequest(); // rxjs ajax does not support multipart
    xhr.open('PUT', url);
    xhr.upload.onprogress = e => {
      let progress = Math.floor((e.loaded / e.total) * 100);
      progress = Math.min(progress, 99);
      progress = Math.max(progress, 0);
      subject.next({
        uploadId: file.uploadId,
        id: file.id,
        progress,
        status: FileModel.FileStatus.PROGRESS,
      });
    };

    xhr.onload = () => {
      if (xhr.status === 200)
        subject.next({
          uploadId: file.uploadId,
          id: file.id,
          progress: 100,
          status: FileModel.FileStatus.SUCCESS,
        });
      else
        subject.error({
          uploadId: file.uploadId,
          id: file.id,
          progress: null,
          status: FileModel.FileStatus.FAIL,
          error: 'Server Error',
        });
      subject.complete();
    };

    xhr.onerror = () => {
      subject.error({
        uploadId: file.uploadId,
        id: file.id,
        progress: null,
        status: FileModel.FileStatus.FAIL,
        error: 'Server Error',
      });
      subject.complete();
    };

    xhr.send(file.file as any);
    return subject;
  }

  public uploadConfirm(id: string): Observable<any> {
    return this.protectedRequest(`files/${id}/confirm`, { method: 'POST' });
  }

  public downloadFile(path: string, type: string, token?: string): Observable<FileModel.IDownloadFile> {
    const subject = new Subject<FileModel.IDownloadFile>();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.apiUrl}/${path}`);

    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    xhr.onload = e => {
      const newFile = new Blob([(e.target as any).response], { type: `application/${type}` });

      if (xhr.status === 200)
        subject.next({
          newFile,
          status: FileModel.FileStatus.SUCCESS,
        });
      else
        subject.error({
          response: {
            title: LANG.EN.ERRORS.DEFAULT,
          },
        });
      subject.complete();
    };

    xhr.onerror = () => {
      subject.error({
        response: {
          title: LANG.EN.ERRORS.DEFAULT,
        },
      });
      subject.complete();
    };

    xhr.responseType = 'blob';

    xhr.send();
    return subject;
  }

  // ApiService
  public protectedRequest<T = any>(path: string, options: IOptionRequest = { method: 'GET' }, mock?: IMock): Observable<T> {
    return ApiService.AuthService.getSession().pipe(mergeMap(token => this.createRequest(path, options, token.getIdToken().getJwtToken(), mock)));
  }

  public publicRequest<T = any>(path: string, options: IOptionRequest = { method: 'GET' }): Observable<T> {
    return this.createRequest(path, options);
  }

  public securityRequest<T = any>(path: string, options: IOptionRequest = { method: 'GET' }, mock?: IMock): Observable<T> {
    return ApiService.AuthService.getSession().pipe(mergeMap(token => this.createRequest(path, options, token.getIdToken().getJwtToken(), mock, "security")));
  }

  public mockedResponse<T = any>(mock) {
    return new Observable(observer => {
      if (mock.isError) return observer.error(mock);
      return observer.next(mock);
    }).pipe(
      map((data: Partial<IMock>) => data.response as T),
      retryWhen(
        /* istanbul ignore next */ error =>
          error.pipe(
            switchMap(e => {
              e = this.errorFormatter(e);
              if (e.status >= 500 || e.status === 408) return of(e).pipe(delay(this.retryTimeout));
              else return throwError(e);
            })
          )
      )
    );
  }

  public createRequest<T = any>(path: string, options: IOptionRequest, token?: string, mock?: IMock, type?: string): Observable<T> {
    if (token) options.headers = { ...options.headers, Authorization: `Bearer ${token}` };

    if (!!mock) return this.mockedResponse(mock);

    return this.http({
      ...options,
      url: `${type && type === "security" ? this.securityApiUrl : this.apiUrl}/${path}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      body: options.body ? this.parseBody(options.body) : undefined,
    }).pipe(
      map(data => data.response as T),
      retryWhen(
        /* istanbul ignore next */ (error: Observable<AjaxResponse>) =>
          error.pipe(
            switchMap((e: AjaxResponse) => {
              e = this.errorFormatter(e);
              if (e.status >= 500 || e.status === 408) return of(e).pipe(delay(this.retryTimeout));
              else return throwError(e);
            }),
            take(this.maxRetries),
            mergeMap(e => throwError(e))
          )
      )
    );
  }

  private parseBody(body: { [key: string]: any }): string {
    try {
      return JSON.stringify(body);
    } catch {
      /* istanbul ignore next line */
      return '';
    }
  }

  private errorFormatter(error: AjaxResponse) {
    return {
      ...error,
      title: error.response?.title ? error.response.title : LANG.EN.ERRORS.DEFAULT,
      errors: error.response?.errors ? error.response.errors : {},
      response: {
        ...error.response,
        title: error.response?.title ? error.response.title : LANG.EN.ERRORS.DEFAULT,
        errors: error.response?.errors ? error.response.errors : {},
      },
    };
  }
}
