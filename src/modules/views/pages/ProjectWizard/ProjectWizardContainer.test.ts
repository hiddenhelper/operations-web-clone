import { getInitialState, getAdminInitialState } from '../../../../test/rootState';
import { generalState } from '../../../state-mgmt/general';
import { projectState } from '../../../state-mgmt/project';
import { certificationState } from '../../../state-mgmt/certification';
import { clientState } from '../../../state-mgmt/client';
import { fileState } from '../../../state-mgmt/file';
import { trainingState } from '../../../state-mgmt/training';

import { mapStateToProps, mapDispatchToProps } from './ProjectWizardContainer';

import { GENERAL } from '../../../../constants';
import { UserModel } from 'modules/models';

describe('ProjectWizardContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getAdminInitialState())).toEqual({
      clientMap: getInitialState().client.clientMap,
      mwbeList: getInitialState().client.mwbeList,
      projectMap: getInitialState().project.projectMap,
      categoryList: getInitialState().project.categoryList,
      regionList: getInitialState().project.regionList,
      fcaNaeList: getInitialState().project.fcaNaeList,
      timeZoneList: getInitialState().general.timeZoneList,
      trainingList: getInitialState().training.trainingList,
      certificationList: getInitialState().certification.certificationList,
      consentFormFields: getInitialState().project.consentFormFields,
      loading: undefined,
      searchLoading: undefined,
      approveLoading: undefined,
      billingTierList: [],
      sendForApprovalLoading: undefined,
      uploadBadgesLoading: undefined,
      loadingMap: getInitialState().general.loadingMap,
      fileMap: getInitialState().file.fileMap,
      userRole: UserModel.Role.FCA_ADMIN,
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProject: expect.any(Function),
      saveProject: expect.any(Function),
      updateDraftProject: expect.any(Function),
      clearErrors: expect.any(Function),
      clearRelationMap: expect.any(Function),
      fetchCategoryList: expect.any(Function),
      fetchRegionList: expect.any(Function),
      fetchNaeList: expect.any(Function),
      fetchCertificationList: expect.any(Function),
      fetchTrainingList: expect.any(Function),
      fetchMwbeList: expect.any(Function),
      searchCompanies: expect.any(Function),
      createCompany: expect.any(Function),
      sendProjectForApproval: expect.any(Function),
      approveProject: expect.any(Function),
      fetchBillingTierList: expect.any(Function),
      fetchConsentFormFields: expect.any(Function),
      addProjectBadges: expect.any(Function),
      fetchTimeZoneList: expect.any(Function),
      clearFileMap: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.fetchProject(id);
    expect(dispatch).toBeCalledWith(projectState.actions.fetchDraftProjectStart(id));
  });

  it('should dispatch saveProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const project = { name: 'project name' } as any;
    const step = { key: 'step' } as any;
    props.saveProject(project, step);
    expect(dispatch).toBeCalledWith(projectState.actions.saveProjectStart(project, step));
  });

  it('should dispatch updateDraftProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const project = { name: 'project name' } as any;
    props.updateDraftProject(project);
    expect(dispatch).toBeCalledWith(projectState.actions.updateDraftProjectStart(project));
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_PROJECT));
  });

  it('should dispatch fetchCertificationList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchCertificationList();
    expect(dispatch).toBeCalledWith(certificationState.actions.fetchCertificationListStart());
  });

  it('should dispatch fetchTrainingList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchTrainingList();
    expect(dispatch).toBeCalledWith(trainingState.actions.fetchTrainingListStart());
  });

  it('should dispatch fetchBillingTierList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBillingTierList();
    expect(dispatch).toBeCalledWith(projectState.actions.fetchBillingTierListStart());
  });

  it('should dispatch fetchCategoryList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchCategoryList();
    expect(dispatch).toBeCalledWith(projectState.actions.fetchCategoryListStart());
  });

  it('should dispatch fetchRegionList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchRegionList();
    expect(dispatch).toBeCalledWith(projectState.actions.fetchRegionListStart());
  });

  it('should dispatch fetchNaeList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchNaeList();
    expect(dispatch).toBeCalledWith(projectState.actions.fetchNaeListStart());
  });

  it('should dispatch clearRelationMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearRelationMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearRelationMap());
  });

  it('should dispatch fetchMwbeList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchMwbeList();
    expect(dispatch).toBeCalledWith(clientState.actions.fetchMWbeListStart());
  });

  it('should dispatch searchCompanies start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    const tempId = 'temp-1';
    props.searchCompanies(query, tempId);
    expect(dispatch).toBeCalledWith(clientState.actions.searchClientStart(query, tempId));
  });

  it('should dispatch createCompany start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const client = {} as any;
    const step = {} as any;
    const tempId = 'temp-0';
    props.createCompany(client, step, tempId);
    expect(dispatch).toBeCalledWith(clientState.actions.saveClientStart(client, step, false, tempId));
  });

  it('should dispatch sendProjectForApproval start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.sendProjectForApproval(id);
    expect(dispatch).toBeCalledWith(projectState.actions.sendApproveProjectStart(id));
  });

  it('should dispatch approveProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.approveProject(id);
    expect(dispatch).toBeCalledWith(projectState.actions.approveProjectStart(id));
  });

  it('should dispatch fetchConsentFormFields start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchConsentFormFields();
    expect(dispatch).toBeCalledWith(projectState.actions.fetchConsentFormFieldsStart());
  });

  it('should dispatch addProjectBadges start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.addProjectBadges(id, []);
    expect(dispatch).toBeCalledWith(projectState.actions.addProjectBadgesStart(id, []));
  });

  it('should dispatch clearFileMap action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearFileMap();
    expect(dispatch).toBeCalledWith(fileState.actions.clearMap());
  });

  it('should dispatch fetchTimeZoneList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchTimeZoneList();
    expect(dispatch).toBeCalledWith(generalState.actions.fetchTimeZoneListStart());
  });
});
