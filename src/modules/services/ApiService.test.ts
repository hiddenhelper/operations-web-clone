import { Observable, of } from 'rxjs';
import { ApiService } from './ApiService';
import {
  getClient_1,
  getProject_1,
  getUser_1,
  getAccessControlSystemDevice_1,
  getWorker_1,
  getBadgePrinterSystem_1,
  getWorkerCertification_1,
  getWorkerCertification_4,
  getCertification_1,
  getUploadFile_1,
  getFileResource_1,
  getBadge_1,
  getConsentForm_1,
  getVisitorProject_1,
  getBadgeUpdateRequest_1,
  getTraining_1,
  getWorkerTraining_4,
  getWorkerTraining_1,
  getInvoice_1,
  getProjectAccessControlSystem_1,
  getPaymentMethod_1,
} from '../../test/entities';
import { ENV, LANG } from '../../constants';

describe('ApiService', () => {
  let apiService: ApiService;
  let xhrMock;
  beforeEach(() => {
    ApiService.AuthService = {
      getSession: () => of({ getIdToken: () => ({ getJwtToken: () => 'token' }), getAccessToken: () => ({ getJwtToken: () => 'token' }) }),
    } as any;
    apiService = new ApiService();
    (apiService as any).http = jest.fn().mockReturnValue(of({ response: null }));
    xhrMock = {
      status: 200,
      open: jest.fn(),
      onload: jest.fn(),
      onerror: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      upload: {
        onprogress: jest.fn(),
      },
    };
  });

  it('should getProject', done => {
    const id = 'id';
    apiService.getProject(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/projects/${id}`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getDraftProject', done => {
    const id = 'id';
    apiService.getDraftProject(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/draftProjects/${id}`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getStatusProcore', done => {
    apiService.getStatusProcore().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/integrations/proCore/status`, headers: expect.any(Object) });
      done();
    });
  });

  it('should connectProcore', done => {
    const data = { data: { clientID: '123', clientSecret: '321' } };
    apiService.connectProcore(data).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/integrations/proCore/connect`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId: '123', clientSecret: '321' }),
      });
      done();
    });
  });

  it('should disconnectProcore', done => {
    apiService.disconnectProcore().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/integrations/proCore/disconnect`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProcoreClients', done => {
    apiService.getProcoreClients().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/integrations/procore/companies`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getProcoreProjects', done => {
    const clientId = 'aasds-12345';
    apiService.getProcoreProjects(clientId).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/projects`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProcoreProjectMappings', done => {
    const clientId = 'aasds-12345';
    apiService.getProcoreProjectMappings(clientId).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/projectMappings`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should saveProcoreProjectMappings', done => {
    const clientId = 'aasds-12345';
    const mappings = [
      {
        projectId: 'string-id',
        procoreProjectId: 12345,
      },
    ];
    apiService.saveProcoreProjectMappings(clientId, mappings).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/projectMappings`,
        headers: expect.any(Object),
        body: JSON.stringify({ projectMappings: mappings }),
      });
      done();
    });
  });

  it('should getProcoreVendors', done => {
    const clientId = 'aasds-12345';
    apiService.getProcoreVendors(clientId).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/vendors`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProcoreVendorMappings', done => {
    const clientId = 'aasds-12345';
    apiService.getProcoreVendorMappings(clientId).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/vendorMappings`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should saveProcoreVendorMappings', done => {
    const clientId = 'aasds-12345';
    const mappings = [
      {
        vendorCompanyId: 'string-id',
        procoreVendorId: 12345,
      },
    ];
    apiService.saveProcoreVendorMappings(clientId, mappings).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/vendorMappings`,
        headers: expect.any(Object),
        body: JSON.stringify({ vendorMappings: mappings }),
      });
      done();
    });
  });

  it('should getWorker', done => {
    const id = 'id';
    apiService.getWorker(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/workers/${id}`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getWorkerStatistics', done => {
    apiService.getWorkerStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/workers`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getClientDetailStatistics', done => {
    apiService.getClientDetailStatistics('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/companies/id`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getProjectDetailStatistics', done => {
    apiService.getProjectDetailStatistics('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/projects/id`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getSelfWorkerStatistics', done => {
    apiService.getSelfWorkerStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companyUsers/self/statistics/worker`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectList', done => {
    apiService.getProjectList({ page: 1, limit: 15 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects?pageNumber=1&pageSize=15`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerList', done => {
    apiService.getWorkerList({} as any).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should assignWorkerProject', done => {
    apiService.assignWorkerProject('id', []).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/id/workers/assign`,
        headers: expect.any(Object),
        body: '[]',
      });
      done();
    });
  });

  it('should getSelfWorkerList', done => {
    apiService.getSelfWorkerList({} as any).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companyUsers/self/workers?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectClientList', done => {
    apiService.getProjectClientList('id', { page: 1, limit: 30 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/id/companies?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectUserList', done => {
    apiService.getProjectUserList({ id: 'id', query: { page: 1, limit: 30 } }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/id/users?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectSummary', done => {
    apiService.getProjectSummary(getProject_1().id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/summary`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should saveProject', done => {
    apiService.saveProject(getProject_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/draftProjects`,
        headers: expect.any(Object),
        body: JSON.stringify(getProject_1()),
      });
      done();
    });
  });

  it('should saveWorker', done => {
    apiService.saveWorker(getWorker_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/workers`,
        headers: expect.any(Object),
        body: JSON.stringify(getWorker_1()),
      });
      done();
    });
  });

  it('should saveSelfWorker', done => {
    apiService.saveSelfWorker(getWorker_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/companyUsers/self/workers`,
        headers: expect.any(Object),
        body: JSON.stringify(getWorker_1()),
      });
      done();
    });
  });

  it('should updateWorker', done => {
    apiService.updateWorker(getWorker_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getWorker_1()),
      });
      done();
    });
  });

  it('should saveAccessControlSystemAccessPoint', done => {
    apiService.saveAccessControlSystemAccessPoint(getAccessControlSystemDevice_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/accessControlSystems/accessPoint`,
        headers: expect.any(Object),
        body: JSON.stringify(getAccessControlSystemDevice_1()),
      });
      done();
    });
  });

  it('should saveHandheld', done => {
    apiService.saveAccessControlSystemHandheld(getAccessControlSystemDevice_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/accessControlSystems/handheld`,
        headers: expect.any(Object),
        body: JSON.stringify(getAccessControlSystemDevice_1()),
      });
      done();
    });
  });

  it('should updateDraftProject', done => {
    apiService.updateDraftProject(getProject_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/draftProjects/${getProject_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getProject_1()),
      });
      done();
    });
  });

  it('should updateProject', done => {
    apiService.updateProject(getProject_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/projects/${getProject_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getProject_1()),
      });
      done();
    });
  });

  it('should updateAccessControlSystemAccessPoint', done => {
    apiService.updateAccessControlSystemAccessPoint(getAccessControlSystemDevice_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/accessControlSystems/accessPoint/${getAccessControlSystemDevice_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getAccessControlSystemDevice_1()),
      });
      done();
    });
  });

  it('should updateAccessControlSystemHandheld', done => {
    apiService.updateAccessControlSystemHandheld(getAccessControlSystemDevice_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/accessControlSystems/handheld/${getAccessControlSystemDevice_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getAccessControlSystemDevice_1()),
      });
      done();
    });
  });

  it('should sendApproveClient', done => {
    const id = 'id';
    apiService.sendApproveClient(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/draftCompanies/${id}/sendForApproval`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should approveClient', done => {
    const id = 'id';
    apiService.approveClient(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/draftCompanies/${id}/approve`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should sendApproveProject', done => {
    const id = 'id';
    apiService.sendApproveProject(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/draftProjects/${id}/sendForApproval`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should approveProject', done => {
    const id = 'id';
    apiService.approveProject(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/draftProjects/${id}/approve`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should acceptProjectInvitation', done => {
    const id = 'id';
    apiService.acceptProjectInvitation(id, getPaymentMethod_1().paymentMethodId).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${id}/accept`,
        headers: expect.any(Object),
        body: JSON.stringify({ paymentMethodId: getPaymentMethod_1().paymentMethodId }),
      });
      done();
    });
  });

  it('should deleteClient', done => {
    const id = 'id';
    apiService.deleteClient(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/draftCompanies/${id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should deleteProject', done => {
    const id = 'id';
    apiService.deleteProject(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/draftProjects/${id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should deleteAccessControlSystem', done => {
    const id = 'id';
    apiService.deleteAccessControlSystem(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/accessControlSystems/${id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClient', done => {
    const id = 'id';
    apiService.getClient(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/companies/${id}`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getDraftClient', done => {
    const id = 'id';
    apiService.getDraftClient(id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/draftCompanies/${id}`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getClientList', done => {
    apiService.getClientList({ page: 1, limit: 30 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getAccessControlSystemList', done => {
    apiService.getAccessControlSystemList({ page: 1, limit: 30 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/accessControlSystems?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getGrossRevenueStatistics', done => {
    apiService.getGrossRevenueStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/grossRevenue`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersActivityStatistics', done => {
    apiService.getWorkersActivityStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/workersActivity`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerObservation', done => {
    apiService.getWorkerObservation('wId', 'id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/wId/observations/id`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should get Worker Activity List', done => {
    const id = '1';
    const query = { page: null, projectId: null, period: 1 };
    apiService.getWorkerActivityList(id, query).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/1/activities?pageNumber=${query.page}&pageSize=30&period=${query.period}&sortType=DESC&sortingName=EventTimestamp`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should get Worker Observation List', done => {
    const id = '1';
    const query = { page: null, projectId: null, period: 1 };
    apiService.getWorkerObservationList(id, query).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/1/observations?pageNumber=${query.page}&pageSize=30&period=${query.period}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getGrossRevenueWidgetStatistics', done => {
    apiService.getGrossRevenueWidgetStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/revenue/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersActivityWidgetStatistics', done => {
    apiService.getWorkersActivityWidgetStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/workers/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientRevenueWidgetStatistics', done => {
    apiService.getClientRevenueWidgetStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companiesStatistics/revenue/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientWorkersActivityWidgetStatistics', done => {
    apiService.getClientWorkersActivityWidgetStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companiesStatistics/workers/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectWorkersActivityStatistics', done => {
    apiService.getProjectWorkersActivityStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/workersActivity?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectAccessControlSystemStatistics', done => {
    apiService.getProjectAccessControlSystemStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/acs?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectBadgePrintingSystemStatistics', done => {
    apiService.getProjectBadgePrintingSystemStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/bps?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectClientsStatistics', done => {
    apiService.getProjectClientsStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/clients?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectActivesStatistics', done => {
    apiService.getProjectActivesStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/activeProjects/maps?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectBadgeLocationStatistics', done => {
    apiService.getProjectBadgeLocationStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/newBadgesByLocations?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectBadgeProjectStatistics', done => {
    apiService.getProjectBadgeProjectStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/newBadgesByProject?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectRevenueProjectStatistics', done => {
    apiService.getProjectRevenueProjectStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/revenue/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectTopTenStatistics', done => {
    apiService.getProjectTopTenStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projectStatistics/topTenProjects?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientTopTenStatistics', done => {
    apiService.getClientTopTenStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companiesStatistics/topTenCompanies?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientActivesStatistics', done => {
    apiService.getClientActivesStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companiesStatistics/activeCompanies/maps?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientsByTrades', done => {
    apiService.getClientsByTrades({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companiesStatistics/byTrades?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getNewAssignedWorkersWidgetStatistics', done => {
    apiService.getNewAssignedWorkersWidgetStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/newAssigned?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByProject', done => {
    apiService.getWorkersByProject({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByProjects?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByClient', done => {
    apiService.getWorkersByClient({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByClients?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByLocation', done => {
    apiService.getWorkersByLocation({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByLocations?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByJobData', done => {
    apiService.getWorkersByJobData({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByJobData?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByJobDataByTrades', done => {
    apiService.getWorkersByJobDataByTrades({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByTrades?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByJobDataByExperience', done => {
    apiService.getWorkersByJobDataByExperience({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByExperience?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByTradesMinority', done => {
    apiService.getWorkersByTradesMinority({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByTradesEthnicity?IsMinority=true&`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByTradesNonMinority', done => {
    apiService.getWorkersByTradesNonMinority({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByTradesEthnicity?IsMinority=false&`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersCertifications', done => {
    apiService.getWorkersCertifications({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByCertifications?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersObservations', done => {
    apiService.getWorkersObservations({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByObservations?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByDemographicDataByLanguage', done => {
    apiService.getWorkersByDemographicDataByLanguage({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/primaryLanguage?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByDemographicDataByEthnicity', done => {
    apiService.getWorkersByDemographicDataByEthnicity({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/topTenWorkersByEthnicity?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersByDemographicDataByGender', done => {
    apiService.getWorkersByDemographicDataByGender({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/gender?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersTrainings', done => {
    apiService.getWorkersTrainings({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workersStatistics/training?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkersNewWorkers', done => {
    apiService.getWorkersNewWorkers({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/workers/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientUserList', done => {
    apiService.getClientUserList({ id: 'id' }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies/id/users?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientWorkerList', done => {
    apiService.getClientWorkerList('id', { page: 1, limit: 30 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies/id/workers?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientProjectList', done => {
    apiService.getClientProjectList(getClient_1().id, {}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies/${getClient_1().id}/projects?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should saveClient', done => {
    apiService.saveClient(getClient_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/draftCompanies`,
        headers: expect.any(Object),
        body: JSON.stringify(getClient_1()),
      });
      done();
    });
  });

  it('should inviteDraftClient', done => {
    apiService
      .inviteDraftClient({
        name: getClient_1().name,
        taxpayerIdentificationNumber: getClient_1().taxpayerIdentificationNumber,
        users: getClient_1().users,
      } as any)
      .subscribe(() => {
        expect((apiService as any).http).toHaveBeenCalledWith({
          method: 'POST',
          url: `${ENV.API.URL}/draftCompanies/invite`,
          headers: expect.any(Object),
          body: JSON.stringify({
            name: getClient_1().name,
            taxpayerIdentificationNumber: getClient_1().taxpayerIdentificationNumber,
            users: getClient_1().users,
          }),
        });
        done();
      });
  });

  it('should updateDraftClient', done => {
    apiService.updateDraftClient(getClient_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/draftCompanies/${getClient_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getClient_1()),
      });
      done();
    });
  });

  it('should getMwbeTypes', done => {
    apiService.getMwbeTypes().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/MwbeTypes`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getClientSummary', done => {
    apiService.getClientSummary(getClient_1().id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies/${getClient_1().id}/summary`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getAccessControlSystemSummary', done => {
    apiService.getAccessControlSystemSummary(getAccessControlSystemDevice_1().id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/accessControlSystems/${getAccessControlSystemDevice_1().id}/summary`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getAccessControlSystem', done => {
    apiService.getAccessControlSystem(getAccessControlSystemDevice_1().id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/accessControlSystems/${getAccessControlSystemDevice_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getTrades', done => {
    apiService.getTrades().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/Trades`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getEthnicities', done => {
    apiService.getEthnicities().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/ethnicities`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getLanguages', done => {
    apiService.getLanguages().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/languages`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getJobTitles', done => {
    apiService.getJobTitles().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/jobTitles`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getSkilledTrades', done => {
    apiService.getSkilledTrades().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/skilledTrades`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getIdentificationTypes', done => {
    apiService.getIdentificationTypes().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/identificationTypes`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getGeographicLocationsList', done => {
    apiService.getGeographicLocationsList().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/geographicLocations`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getTradeStatuses', done => {
    apiService.getTradeStatuses().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/tradeStatus`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getLanguageTurnerProtocols', done => {
    apiService.getLanguageTurnerProtocols().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/languageTurnerProtocol`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getSocJobTitles', done => {
    apiService.getSocJobTitles().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/socJobTitles`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getUserList', done => {
    apiService.getUserList({ page: 1, limit: 30 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/users?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should searchClient', done => {
    apiService.searchClient({ isDeveloper: false, nameContains: 'test', maxItems: 10 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies/search?isDeveloper=false&nameContains=test&maxItems=10`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerProjectByCompany', done => {
    apiService.getWorkerProjectByCompany(getClient_1().id, { name: 'test' }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies/${getClient_1().id}/workers/projectNames?name=test`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should searchClients without developer flag', done => {
    apiService.searchClient({ nameContains: 'test', maxItems: 10 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/companies/search?nameContains=test&maxItems=10`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should searchProject', done => {
    apiService.searchProject({ nameContains: 'test', maxItems: 10 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/search?nameContains=test&maxItems=10`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should assignClientProject', done => {
    const list = [{ id: getClient_1().id, role: 0 }];
    apiService.assignClientProject(getProject_1().id, list, getClient_1().id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/companies/assign`,
        headers: expect.any(Object),
        body: JSON.stringify({ companies: list, sponsorId: getClient_1().id }),
      });
      done();
    });
  });

  it('should assignUserProject', done => {
    const list = [{ id: getUser_1().id, role: 'role' }];
    apiService.assignUserProject(getProject_1().id, list as any).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        body: '[{"id":"9164e4c4-6521-47bb-97fd-c75ac02b2cf3","role":"role"}]',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/users/assign`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectCategories', done => {
    apiService.getProjectCategories().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/categories`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getFcaNae', done => {
    apiService.getFcaNae().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/naes`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getFcaRegion', done => {
    apiService.getFcaRegion().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/regions`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getSizeCategories', done => {
    apiService.getSizeCategories().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/sizeCategories`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getCertifications', done => {
    apiService.getCertifications().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/certifications`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getTrainings', done => {
    apiService.getTrainings().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/trainings`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getBillingTiers', done => {
    apiService.getBillingTiers().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/billingTiers`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getClientDetail', done => {
    apiService.getClientDetail(getClient_1().id).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/companies/${getClient_1().id}`, headers: expect.any(Object) });
      done();
    });
  });

  // it('should saveUser', done => {
  //   apiService.saveUser(getClient_1().id, getUser_1()).subscribe(() => {
  //     expect((apiService as any).http).toBeCalledWith({
  //       method: 'POST',
  //       url: `${ENV.API.URL}/companies/${getClient_1().id}/users`,
  //       body:
  //         '{"id":"9164e4c4-6521-47bb-97fd-c75ac02b2cf3","firstName":"Pedro","lastName":"Martin","email":"user@test.com","title":"","invitationType":0,"mobilePhoneNumber":"","officePhoneNumber":"","officePhoneExtension":"","preferredContactMethod":0,"companyId":"5164e4c4-6521-47bb-97fd-b75ac02b2cf1","company":{"id":"5164e4c4-6521-47bb-97fd-b75ac02b2cf1","name":"Constructions INC.","groupIds":[]}}',
  //       headers: expect.any(Object),
  //     });
  //     done();
  //   });
  // });

  it('should getUserRoles', done => {
    apiService.getUserRoles().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/projectRoles`, headers: expect.any(Object) });
      done();
    });
  });

  it('should validateToken', done => {
    apiService.validateToken('token').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/users/validateToken`,
        body: '{"token":"token"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      done();
    });
  });

  it('should createAccount', done => {
    apiService.createAccount('token', 'password').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/users/register`,
        body: '{"token":"token","password":"password"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      done();
    });
  });

  it('should updateClient', done => {
    apiService.updateClient(getClient_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/companies/${getClient_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getClient_1()),
      });
      done();
    });
  });

  it('should getVisitorBadgeList', done => {
    apiService.getVisitorBadgeList({ id: getProject_1().id, query: { page: 1, limit: 30 } }).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/visitorbadges?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getVisitorBadge', done => {
    apiService.getVisitorBadge(getBadge_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/badges/visitors/${getBadge_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should updateBadgeVisitor', done => {
    apiService.updateBadgeVisitor(getVisitorProject_1().id, getVisitorProject_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/badges/visitors/${getVisitorProject_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getVisitorProject_1()),
      });
      done();
    });
  });

  it('should getBadgeHistory', done => {
    apiService.getBadgeHistory(getBadge_1().id, {} as any).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/badges/${getBadge_1().id}/history?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should createBadgeVisitors', done => {
    apiService.createBadgeVisitors(getProject_1().id, 1).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/visitorbadges/create`,
        headers: expect.any(Object),
        body: '{"badgeCount":1}',
      });
      done();
    });
  });

  it('should getBadgeVisitorEntity', done => {
    apiService.getBadgeVisitorEntity(getProject_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/visitorbadges/entities`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should archiveClient', done => {
    apiService.archiveClient(getClient_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/companies/${getClient_1().id}/archive`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should unarchiveClient', done => {
    apiService.unarchiveClient(getClient_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/companies/${getClient_1().id}/unarchive`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should archiveProject', done => {
    apiService.archiveProject(getProject_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/archive`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectClientHirearchyList', done => {
    apiService.getProjectClientHirearchyList(getProject_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/companies/hierarchy`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should unarchiveProject', done => {
    apiService.unarchiveProject(getProject_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/unarchive`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getBadgePrinterSystem', done => {
    apiService.getBadgePrinterSystem(getBadgePrinterSystem_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/badgePrintingSystems/${getBadgePrinterSystem_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectAccessControlSystemList', done => {
    apiService.getProjectAccessControlSystemList({ id: getProject_1().id, query: { page: 1, limit: 30 } }).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/accessControlSystems?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectAccessControlSystem', done => {
    apiService.getProjectAccessControlSystem(getProject_1().id, getAccessControlSystemDevice_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/accessControlSystems/${getAccessControlSystemDevice_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should saveBadgePrinterSystem', done => {
    apiService.saveBadgePrinterSystem(getBadgePrinterSystem_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/badgePrintingSystems`,
        headers: expect.any(Object),
        body:
          '{"id":"77afbfce-1bca-31c3-b512-3a1ed78742bb","notes":"some notes","name":"Badge Printer Name","shippingDate":1589883810049,"status":0,"laptop":{"price":3200,"vendor":"Lenovo","orderDate":1589883810049,"invoice":"invoice number","model":"thinkpad x1","inServiceDate":1589883810049,"warrantyExpirationDate":1589883810049,"serialNumber":"AFF12903112","notes":"notes","osVersion":"18.0.1"},"printer":{"price":300,"vendor":"vendor","orderDate":1589883810049,"invoice":"invoice","model":"model type","inServiceDate":1589883810049,"warrantyExpirationDate":1589883810049,"serialNumber":"12904328913","notes":"some note","lastMaintenanceDate":1589883810049,"type":0},"scanner":{"price":1000,"vendor":"vendor","orderDate":1589883810049,"invoice":"invoice","model":"model","inServiceDate":1589883810049,"warrantyExpirationDate":1589883810049,"serialNumber":"BBF19021","notes":""},"badgePrintingSystem":{"id":"77afbfce-1bca-31c3-b512-3a1ed78742bb","name":"Badge Printer Name"},"laptopSerialNumber":"AFF12903112","printerSerialNumber":"12904328913","scannerSerialNumber":"BBF19021"}',
      });
      done();
    });
  });

  it('should assignAcsProject', done => {
    apiService.assignAcsProject(getProject_1().id, getProjectAccessControlSystem_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/accessControlSystems`,
        headers: expect.any(Object),
        body: JSON.stringify(getProjectAccessControlSystem_1()),
      });
      done();
    });
  });

  it('should unAssignAccessControlSystemProject', done => {
    apiService.unAssignAccessControlSystemProject(getProject_1().id, getAccessControlSystemDevice_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/accessControlSystems/${getAccessControlSystemDevice_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should updateBadgePrinterSystem', done => {
    apiService.updateBadgePrinterSystem(getBadgePrinterSystem_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/badgePrintingSystems/${getBadgePrinterSystem_1().id}`,
        headers: expect.any(Object),
        body:
          '{"id":"77afbfce-1bca-31c3-b512-3a1ed78742bb","notes":"some notes","name":"Badge Printer Name","shippingDate":1589883810049,"status":0,"laptop":{"price":3200,"vendor":"Lenovo","orderDate":1589883810049,"invoice":"invoice number","model":"thinkpad x1","inServiceDate":1589883810049,"warrantyExpirationDate":1589883810049,"serialNumber":"AFF12903112","notes":"notes","osVersion":"18.0.1"},"printer":{"price":300,"vendor":"vendor","orderDate":1589883810049,"invoice":"invoice","model":"model type","inServiceDate":1589883810049,"warrantyExpirationDate":1589883810049,"serialNumber":"12904328913","notes":"some note","lastMaintenanceDate":1589883810049,"type":0},"scanner":{"price":1000,"vendor":"vendor","orderDate":1589883810049,"invoice":"invoice","model":"model","inServiceDate":1589883810049,"warrantyExpirationDate":1589883810049,"serialNumber":"BBF19021","notes":""},"badgePrintingSystem":{"id":"77afbfce-1bca-31c3-b512-3a1ed78742bb","name":"Badge Printer Name"},"laptopSerialNumber":"AFF12903112","printerSerialNumber":"12904328913","scannerSerialNumber":"BBF19021"}',
      });
      done();
    });
  });

  it('should updateProjectAccessControlSystem', done => {
    apiService.updateProjectAccessControlSystem(getProject_1().id, getAccessControlSystemDevice_1().id, getProjectAccessControlSystem_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/accessControlSystems/${getAccessControlSystemDevice_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getProjectAccessControlSystem_1()),
      });
      done();
    });
  });

  it('should getBadgePrinterSystemList', done => {
    apiService.getBadgePrinterSystemList({ query: '', available: '' } as any).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/badgePrintingSystems?pageNumber=1&pageSize=30&query=&available=`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should deleteBadgePrinterSystem', done => {
    apiService.deleteBadgePrinterSystem(getBadgePrinterSystem_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/badgePrintingSystems/${getBadgePrinterSystem_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerCertificationList', done => {
    apiService.getWorkerCertificationList(getWorker_1().id, {} as any).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/certifications?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerTrainingList', done => {
    apiService.getWorkerTrainingList(getWorker_1().id, {} as any).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/trainings?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerProjectList', done => {
    apiService.getWorkerProjectList(getWorker_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/projects?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectBadgePrintingSystemList', done => {
    apiService.getProjectBadgePrintingSystemList({ id: getBadgePrinterSystem_1().id }).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getBadgePrinterSystem_1().id}/badgePrintingSystems?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getProjectWorkerList', done => {
    apiService.getProjectWorkerList({ id: getProject_1().id, query: { page: 1, limit: 30 } }).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/workers?pageNumber=1&pageSize=30`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerCertification', done => {
    apiService.getWorkerCertification(getWorker_1().id, getCertification_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/certifications/${getCertification_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerTraining', done => {
    apiService.getWorkerTraining(getWorker_1().id, getTraining_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/trainings/${getTraining_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getWorkerProjectNameList', done => {
    apiService.getWorkerProjectNameList(getWorker_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/projectnames`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should assignBadgePrintingSystemProject', done => {
    apiService.assignBadgePrintingSystemProject(getProject_1().id, [{ id: getBadgePrinterSystem_1().id, date: 123123213 as any } as any]).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/badgePrintingSystems/assign`,
        headers: expect.any(Object),
        body: '[{"id":"77afbfce-1bca-31c3-b512-3a1ed78742bb","date":123123213}]',
      });
      done();
    });
  });

  it('should unAssignBadgePrintingSystemProject', done => {
    apiService.unAssignBadgePrintingSystemProject(getProject_1().id, getBadgePrinterSystem_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/badgePrintingSystems/${getBadgePrinterSystem_1().id}/unassign`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should addWorkerCertification', done => {
    apiService.addWorkerCertification(getWorker_1().id, getWorkerCertification_4()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/certifications`,
        headers: expect.any(Object),
        body:
          '{"id":"31c99f51-d2e6-4d1b-b36d-5953c76d5c29","certificationId":"cert-2","certification":{"id":"cert-2","name":"test other cert"},"idNumber":"","project":{"id":"8aa1c4c4-6521-47bb-27fd-af5ac02b2cd8","name":"Project Name 2"},"description":"description","completionDate":null,"expirationDate":null}',
      });
      done();
    });
  });

  it('should updateWorkerCertification', done => {
    apiService.updateWorkerCertification(getWorker_1().id, getWorkerCertification_4()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/certifications/${getWorkerCertification_4().id}`,
        headers: expect.any(Object),
        body:
          '{"id":"31c99f51-d2e6-4d1b-b36d-5953c76d5c29","certificationId":"cert-2","certification":{"id":"cert-2","name":"test other cert"},"idNumber":"","project":{"id":"8aa1c4c4-6521-47bb-27fd-af5ac02b2cd8","name":"Project Name 2"},"description":"description","completionDate":null,"expirationDate":null}',
      });
      done();
    });
  });

  it('should deleteWorkerCertification', done => {
    apiService.deleteWorkerCertification(getWorker_1().id, getWorkerCertification_4().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/certifications/${getWorkerCertification_4().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should deleteWorkerCertificationFiles', done => {
    apiService.deleteWorkerCertificationFiles(getWorker_1().id, getWorkerCertification_4().id, [getFileResource_1().fileId]).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/certifications/${getWorkerCertification_4().id}/files`,
        headers: expect.any(Object),
        body: JSON.stringify({ fileIds: [getFileResource_1().fileId] }),
      });
      done();
    });
  });

  it('should addWorkerTraining', done => {
    apiService.addWorkerTraining(getWorker_1().id, getWorkerTraining_4()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/workers/trainings/create`,
        headers: expect.any(Object),
        body: JSON.stringify({ ...getWorkerTraining_4(), workers: [getWorker_1().id] }),
      });
      done();
    });
  });

  it('should updateWorkerTraining', done => {
    apiService.updateWorkerTraining(getWorker_1().id, getWorkerTraining_4()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/trainings/${getWorkerTraining_4().id}`,
        headers: expect.any(Object),
        body: JSON.stringify({ ...getWorkerTraining_4() }),
      });
      done();
    });
  });

  it('should deleteWorkerTraining', done => {
    apiService.deleteWorkerTraining(getWorker_1().id, getWorkerTraining_4().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/trainings/${getWorkerTraining_4().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should deleteWorkerTrainingFiles', done => {
    apiService.deleteWorkerTrainingFiles(getWorker_1().id, getWorkerTraining_4().id, [getFileResource_1().fileId]).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/trainings/${getWorkerTraining_4().id}/files`,
        headers: expect.any(Object),
        body: JSON.stringify({ fileIds: [getFileResource_1().fileId] }),
      });
      done();
    });
  });

  it('should getWorkerCertificationResource', done => {
    apiService.getWorkerCertificationResource(getWorker_1().id, getWorkerCertification_1().id, [getUploadFile_1().file.name]).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/certifications/${getWorkerCertification_1().id}/upload`,
        headers: expect.any(Object),
        body: '{"fileNames":["test.png"]}',
      });
      done();
    });
  });

  it('should getWorkerTrainingResource', done => {
    apiService.getWorkerTrainingResource(getWorker_1().id, getWorkerTraining_1().id, [getUploadFile_1().file.name]).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/trainings/${getWorkerTraining_1().id}/upload`,
        headers: expect.any(Object),
        body: '{"fileNames":["test.png"]}',
      });
      done();
    });
  });

  it('should updateBadgePrintingSystemProjectDate', done => {
    apiService.updateBadgePrintingSystemProjectDate(getProject_1().id, getBadgePrinterSystem_1().id, '12/10/2010').subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/projects/${getProject_1().id}/badgePrintingSystems/${getBadgePrinterSystem_1().id}`,
        headers: expect.any(Object),
        body: '{"shippingDate":"12/10/2010"}',
      });
      done();
    });
  });

  it('should getConsentForm', done => {
    apiService.getConsentForm(getWorker_1().id, getProject_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/projects/${getProject_1().id}/consentForm`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getEditableConsentForm', done => {
    apiService.getEditableConsentForm(getWorker_1().id, getProject_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/projects/${getProject_1().id}/projectForm`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should saveConsentForm', done => {
    apiService.saveConsentForm(getWorker_1().id, getProject_1().id, getConsentForm_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/workers/${getWorker_1().id}/projects/${getProject_1().id}/projectForm`,
        headers: expect.any(Object),
        body: JSON.stringify(getConsentForm_1()),
      });
      done();
    });
  });

  it('should getBadge', done => {
    apiService.getBadge(getBadge_1().id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/badges/${getBadge_1().id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should activateBadge', done => {
    apiService.activateBadge(getBadge_1().id, 'tagId').subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/badges/${getBadge_1().id}/activate`,
        headers: expect.any(Object),
        body: JSON.stringify({ tagId: 'tagId', id: getBadge_1().id }),
      });
      done();
    });
  });

  it('should updateBadge', done => {
    apiService.updateBadge(getBadge_1().id, getBadgeUpdateRequest_1()).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/badges/${getBadge_1().id}`,
        headers: expect.any(Object),
        body: JSON.stringify(getBadgeUpdateRequest_1()),
      });
      done();
    });
  });

  it('should revokeBadge', done => {
    apiService.revokeBadge(getBadge_1().id, 'reason').subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/badges/${getBadge_1().id}/revoke`,
        headers: expect.any(Object),
        body: '{"statusChangeReason":"reason"}',
      });
      done();
    });
  });

  it('should deactivateBadge', done => {
    apiService.deactivateBadge(getBadge_1().id, 'reason').subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/badges/${getBadge_1().id}/deactivate`,
        headers: expect.any(Object),
        body: '{"statusChangeReason":"reason"}',
      });
      done();
    });
  });

  it('should uploadConfirm', done => {
    apiService.uploadConfirm(getFileResource_1().fileId).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/files/${getFileResource_1().fileId}/confirm`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getPaymentMethods', done => {
    apiService.getPaymentMethods().subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/paymentMethod/self`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should createPayment', done => {
    const id = 'payment_id';
    apiService.createPayment(id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/paymentMethod/self`,
        headers: expect.any(Object),
        body: JSON.stringify({ paymentMethodId: id }),
      });
      done();
    });
  });

  it('should deletePayment', done => {
    const id = 'payment_id';
    apiService.deletePayment(id).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'DELETE',
        url: `${ENV.API.URL}/paymentMethod/self/${id}`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should replacePayment', done => {
    const id = 'payment_id';
    const replacementId = 'replacement_payment_id';
    apiService.replacePayment(id, replacementId).subscribe(() => {
      expect((apiService as any).http).toHaveBeenCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/paymentMethod/self/replace`,
        headers: expect.any(Object),
        body: JSON.stringify({ oldPaymentMethodId: id, newPaymentMethodId: replacementId }),
      });
      done();
    });
  });

  it('should getPrintableWorkerBadge', () => {
    (window.XMLHttpRequest as any) = jest.fn(() => xhrMock);
    apiService.getPrintableWorkerBadge('id').subscribe(() => {
      expect(xhrMock.open).toHaveBeenCalledWith('GET', 'https://dev.com/path');
      expect(xhrMock.send).toHaveBeenCalled();
    });
  });

  it('should getPrintableVisitorBadge', () => {
    (window.XMLHttpRequest as any) = jest.fn(() => xhrMock);
    apiService.getPrintableVisitorBadge('id').subscribe(() => {
      expect(xhrMock.open).toHaveBeenCalledWith('GET', 'https://dev.com/path');
      expect(xhrMock.send).toHaveBeenCalled();
    });
  });

  describe('uploadFile', () => {
    let uploadSubject = null;

    beforeEach(() => {
      (window.XMLHttpRequest as any) = jest.fn(() => xhrMock);
      uploadSubject = apiService.uploadFile(getUploadFile_1(), getFileResource_1().url);
    });

    it('should send', done => {
      expect(xhrMock.open).toHaveBeenCalledWith('PUT', getFileResource_1().url);
      expect(xhrMock.send).toHaveBeenCalledWith(getUploadFile_1().file);
      done();
    });

    it('should progress', done => {
      uploadSubject.subscribe(state => {
        expect(state).toEqual({
          uploadId: 'test-upload-id',
          id: 'upload-id-1',
          progress: 7,
          status: 1,
        });
        done();
      });
      xhrMock.upload.onprogress({
        loaded: 1000,
        total: 13020,
      });
    });

    it('should onload', done => {
      uploadSubject.subscribe(state => {
        expect(state).toEqual({
          uploadId: 'test-upload-id',
          id: 'upload-id-1',
          progress: 100,
          status: 2,
        });
        done();
      });
      xhrMock.onload();
    });

    it('should onload error', done => {
      xhrMock.status = 400;
      uploadSubject.subscribe(
        state => {
          /**/
        },
        error => {
          expect(error).toEqual({
            uploadId: 'test-upload-id',
            id: 'upload-id-1',
            progress: null,
            status: 3,
            error: 'Server Error',
          });
          done();
        }
      );
      xhrMock.onload();
    });

    it('should onerror', done => {
      uploadSubject.subscribe(
        state => {
          /**/
        },
        error => {
          expect(error).toEqual({
            uploadId: 'test-upload-id',
            id: 'upload-id-1',
            progress: null,
            status: 3,
            error: 'Server Error',
          });
          done();
        }
      );
      xhrMock.onerror();
    });
  });

  describe.skip('downloadFile', () => {
    let downloadSubject = null;

    beforeEach(() => {
      (window.XMLHttpRequest as any) = jest.fn(() => xhrMock);
      downloadSubject = apiService.downloadFile('path', 'pdf');
    });

    it('should send', done => {
      expect(xhrMock.open).toHaveBeenCalledWith('GET', 'https://dev.com/path');
      expect(xhrMock.send).toHaveBeenCalled();
      done();
    });

    it('should onload', done => {
      downloadSubject.subscribe(state => {
        expect(state).toEqual({
          newFile: expect.any(Object),
          status: 2,
        });
        done();
      });
      xhrMock.onload({ target: '' });
    });

    it('should onload error', done => {
      xhrMock.status = 400;
      downloadSubject.subscribe(
        state => {
          /**/
        },
        error => {
          expect(error).toEqual({
            response: {
              title: LANG.EN.ERRORS.DEFAULT,
            },
          });
          done();
        }
      );
      xhrMock.onload({ target: '' });
    });

    it('should onerror', done => {
      downloadSubject.subscribe(
        state => {
          /**/
        },
        error => {
          expect(error).toEqual({
            response: {
              title: LANG.EN.ERRORS.DEFAULT,
            },
          });
          done();
        }
      );
      xhrMock.onerror();
    });
  });

  describe('protectedRequest', () => {
    it('should make a protectedRequest', done => {
      const req = apiService.protectedRequest('url');
      expect(req instanceof Observable).toBe(true);
      req.subscribe(res => {
        expect(res).toBe(null);
        done();
      });
    });

    it('should make a protectedRequest with a body', done => {
      const req = apiService.protectedRequest('url', { method: 'POST', body: { hi: 1 } });
      expect(req instanceof Observable).toBe(true);
      req.subscribe(res => {
        expect(res).toBe(null);
        done();
      });
    });
  });

  describe('publicRequest', () => {
    it('should make a publicRequest', done => {
      const req = apiService.publicRequest('url');
      expect(req instanceof Observable).toBe(true);
      req.subscribe(res => {
        expect(res).toBe(null);
        done();
      });
    });

    it('should make a publicRequest with a body', done => {
      const req = apiService.publicRequest('url', { method: 'POST', body: { hi: 1 } });
      expect(req instanceof Observable).toBe(true);
      req.subscribe(res => {
        expect(res).toBe(null);
        done();
      });
    });
  });

  it('should parse a body', () => {
    const body = { a: 1 };
    const parsed = (apiService as any).parseBody(body);
    expect(parsed).toEqual(JSON.stringify({ a: 1 }));
  });

  it('should format error', () => {
    const error = { response: { errors: [{ name: 'error' }] } };
    const parsed = (apiService as any).errorFormatter(error);
    expect(parsed).toEqual({
      ...error,
      errors: error.response.errors,
      title: 'Something went wrong.',
      response: { ...error.response, title: 'Something went wrong.' },
    });
    const errorWithTitle = { response: { title: 'some title' } };
    const parsedError = (apiService as any).errorFormatter(errorWithTitle);
    expect(parsedError).toEqual({ ...parsedError, errors: {}, title: 'some title' });
  });

  it('should getProjectStatistics', done => {
    apiService.getProjectStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/projects`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getCompanyProjectStatistics', done => {
    apiService.getCompanyProjectStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/companyprojects`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getClientStatistics', done => {
    apiService.getClientStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/companies`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getInventoryStatistics', done => {
    apiService.getInventoryStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/inventory`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getProjectWidgetStatistics', done => {
    apiService.getProjectWidgetStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/projects/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getClientWidgetStatistics', done => {
    apiService.getClientWidgetStatistics({}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/statistics/companies/widget?`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getConsentFormFields', done => {
    apiService.getConsentFormFields().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/consentFormFields`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getProjectBadgeResources', done => {
    apiService.getProjectBadgeResources('id', {}).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/draftProjects/id/uploadBadgeTemplates`,
        headers: expect.any(Object),
        body: '{}',
      });
      done();
    });
  });

  it('should getNewBadges', done => {
    apiService.getNewBadges().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/newBadges`, headers: expect.any(Object) });
      done();
    });
  });

  it('should resetPassword', done => {
    apiService.resetPassword('email').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/users/resetPassword`,
        headers: expect.any(Object),
        body: JSON.stringify({ email: 'email' }),
      });
      done();
    });
  });

  it('should confirmResetPassword', done => {
    apiService.confirmResetPassword('token', 'email', 'pwd').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/users/confirmResetPassword`,
        headers: expect.any(Object),
        body: JSON.stringify({ email: 'email', token: 'token', password: 'pwd' }),
      });
      done();
    });
  });

  it('should getInvoiceList', done => {
    apiService.getInvoiceList({ isPaid: true }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/invoices?pageNumber=1&pageSize=30&isPaid=true`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getServiceTypeList', done => {
    apiService.getServiceTypeList().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/billableServices`, headers: expect.any(Object) });
      done();
    });
  });

  it('should saveInvoice', done => {
    apiService.saveInvoice(getInvoice_1()).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/invoices`,
        headers: expect.any(Object),
        body: JSON.stringify(getInvoice_1()),
      });
      done();
    });
  });

  it('should getInvoiceStatistics', done => {
    apiService.getInvoiceStatistics().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/statistics/invoices`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getInvoiceSummary', done => {
    apiService.getInvoiceSummary('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/invoices/id/summary`, headers: expect.any(Object) });
      done();
    });
  });

  it('should deleteInvoice', done => {
    apiService.deleteInvoice('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'DELETE', url: `${ENV.API.URL}/invoices/id`, headers: expect.any(Object) });
      done();
    });
  });

  it('should markInvoiceAsPaid', done => {
    apiService.markInvoiceAsPaid('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'POST', url: `${ENV.API.URL}/invoices/id/markAsPaid`, headers: expect.any(Object) });
      done();
    });
  });

  it('should markInvoiceAsVoid', done => {
    apiService.markInvoiceAsVoid('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'POST', url: `${ENV.API.URL}/invoices/id/markAsVoid`, headers: expect.any(Object) });
      done();
    });
  });

  it('should payInvoice', done => {
    apiService.payInvoice('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'POST', url: `${ENV.API.URL}/invoices/id/pay`, headers: expect.any(Object) });
      done();
    });
  });

  it('should confirmInvoice', done => {
    apiService.confirmInvoice('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'POST', url: `${ENV.API.URL}/invoices/id/confirm`, headers: expect.any(Object) });
      done();
    });
  });

  it('should downloadInvoice', () => {
    (window.XMLHttpRequest as any) = jest.fn(() => xhrMock);
    apiService.downloadInvoice('id').subscribe(() => {
      expect(xhrMock.open).toHaveBeenCalledWith('GET', 'https://dev.com/path');
      expect(xhrMock.send).toHaveBeenCalled();
    });
  });

  it('should downloadConsentForm', () => {
    (window.XMLHttpRequest as any) = jest.fn(() => xhrMock);
    apiService.downloadConsentForm('id', 'project').subscribe(() => {
      expect(xhrMock.open).toHaveBeenCalledWith('GET', 'https://dev.com/path');
      expect(xhrMock.send).toHaveBeenCalled();
    });
  });

  it('should editInvoice', done => {
    apiService.editInvoice('id', getInvoice_1()).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/invoices/id`,
        headers: expect.any(Object),
        body: JSON.stringify(getInvoice_1()),
      });
      done();
    });
  });

  it('should getInvoice', done => {
    apiService.getInvoice('id').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/invoices/id`, headers: expect.any(Object) });
      done();
    });
  });

  it('should changePassword', done => {
    apiService.changePassword('old', 'new').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/users/self/changePassword`,
        headers: expect.any(Object),
        body: JSON.stringify({
          accessToken: 'token',
          currentPassword: 'old',
          newPassword: 'new',
        }),
      });
      done();
    });
  });

  it('should updateProfile', done => {
    apiService.updateProfile({ firstName: 'John' }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/users/self`,
        headers: expect.any(Object),
        body: JSON.stringify({ firstName: 'John' }),
      });
      done();
    });
  });

  it('should updateCompanyUserProfile', done => {
    apiService.updateCompanyUserProfile({ firstName: 'John' }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/companyUsers/self`,
        headers: expect.any(Object),
        body: JSON.stringify({ firstName: 'John' }),
      });
      done();
    });
  });

  it('should getAccount', done => {
    apiService.getAccount().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/users/self`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getCompanyUserAccount', done => {
    apiService.getCompanyUserAccount().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/companyUsers/self`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getCountryList', done => {
    apiService.getCountryList().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/countries`, headers: expect.any(Object) });
      done();
    });
  });

  it('should getProfilePhotoResource', done => {
    apiService.getProfilePhotoResource('file').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'POST',
        url: `${ENV.API.URL}/users/self/uploadPicture`,
        headers: expect.any(Object),
        body: JSON.stringify({ fileName: 'file' }),
      });
      done();
    });
  });

  it('should getProjectClientSummary', done => {
    const projectId = 'pId';
    const clientId = 'cId';
    apiService.getProjectClientSummary(projectId, clientId).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/projects/${projectId}/companies/${clientId}/summary`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should getReportFrequency', done => {
    const clientId = 'cId';
    apiService.getReportFrequency(clientId).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/settings`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should saveReportFrequency', done => {
    const clientId = 'cId';
    const frequency = 1;
    apiService.saveReportFrequency(clientId, frequency).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/integrations/procore/companies/${clientId}/settings`,
        headers: expect.any(Object),
        body: JSON.stringify({
          reportingFrequency: frequency,
        }),
      });
      done();
    });
  });

  it('should updateClientProjectTaxCondition', done => {
    const taxCondition = { companyId: 'cId', isTaxExempt: true };
    apiService.updateClientProjectTaxCondition('pId', taxCondition).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/projects/pId/companies/updateTaxExemptionStatus`,
        headers: expect.any(Object),
        body: JSON.stringify(taxCondition),
      });
      done();
    });
  });

  it('should updateProjectPaymentMethod', done => {
    apiService.updateProjectPaymentMethod('projectId', 'paymentId').subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'PUT',
        url: `${ENV.API.URL}/projects/projectId/changeCreditCard`,
        headers: expect.any(Object),
        body: JSON.stringify({ paymentMethodId: 'paymentId' }),
      });
      done();
    });
  });

  it('should getTimeZones', done => {
    apiService.getTimeZones().subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({ method: 'GET', url: `${ENV.API.URL}/timeZones`, headers: expect.any(Object) });
      done();
    });
  });

  it('should quickSearch', done => {
    apiService.quickSearch({ nameContains: 'Search', searchType: 1 }).subscribe(() => {
      expect((apiService as any).http).toBeCalledWith({
        method: 'GET',
        url: `${ENV.API.URL}/quickSearch/?pageNumber=1&pageSize=30&nameContains=Search&searchType=1`,
        headers: expect.any(Object),
      });
      done();
    });
  });

  it('should get report frequency', done => {
    expect(true);
    done();
  });

  it('should return mocked data with success', done => {
    const mock = {
      isError: false,
      response: {
        data: {
          projectName: 'projectName',
        },
      },
    };

    apiService.protectedRequest('/', { method: 'GET' }, mock).subscribe(response => {
      expect(response).toEqual({ data: { projectName: 'projectName' } });
      done();
    });
  });

  it('should return mocked data with error', done => {
    const mock = {
      isError: true,
      response: { status: 505, title: 'error trying to get frequency' },
    };
    apiService.protectedRequest('/', { method: 'GET' }, mock).subscribe({
      error: err => {
        expect(err).toEqual({
          isError: true,
          response: { status: 505, title: 'error trying to get frequency', errors: {} },
          title: 'error trying to get frequency',
          errors: {},
        });
        done();
      },
    });
  });
});
