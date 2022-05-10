import { GENERAL } from '../../../../constants';
import { getInitialState } from '../../../../test/rootState';
import { projectState } from '../../../state-mgmt/project';
import { certificationState } from '../../../state-mgmt/certification';
import { generalState } from '../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './ProjectDetailContainer';
import { getProject_1 } from '../../../../test/entities';
import { trainingState } from '../../../state-mgmt/training';
import { statisticsState } from '../../../state-mgmt/statistics';

describe('ProjectDetailContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      projectMap: getInitialState().project.projectMap,
      categoryList: getInitialState().project.categoryList,
      regionList: getInitialState().project.regionList,
      fcaNaeList: getInitialState().project.fcaNaeList,
      billingTierList: getInitialState().project.billingTierList,
      certificationList: getInitialState().certification.certificationList,
      timeZoneList: getInitialState().general.timeZoneList,
      trainingList: getInitialState().training.trainingList,
      consentFormFields: getInitialState().project.consentFormFields,
      projectStatistics: getInitialState().statistics.projectDetailStatistics,
      projectLoading: undefined,
      updateProjectLoading: undefined,
      projectStatisticsLoading: undefined,
      updatePaymentMethodLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProject: expect.any(Function),
      updateProject: expect.any(Function),
      fetchCategoryList: expect.any(Function),
      fetchRegionList: expect.any(Function),
      fetchNaeList: expect.any(Function),
      fetchBillingTierList: expect.any(Function),
      fetchCertificationList: expect.any(Function),
      fetchTrainingList: expect.any(Function),
      fetchProjectStatistics: expect.any(Function),
      archiveProject: expect.any(Function),
      unarchiveProject: expect.any(Function),
      clearProjectMap: expect.any(Function),
      clearLoadingMap: expect.any(Function),
      clearLoading: expect.any(Function),
      clearErrors: expect.any(Function),
      clearModalMap: expect.any(Function),
      clearProjectStatistics: expect.any(Function),
      fetchConsentFormFields: expect.any(Function),
      fetchTimeZoneList: expect.any(Function),
      updateProjectPaymentMethod: expect.any(Function),
    });
  });

  it('should dispatch fetchProjectStart start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const id = '1';
    props.fetchProject(id);
    expect(dispatch).toBeCalledWith(projectState.actions.fetchProjectStart(id));
  });

  it('should dispatch clearProjectMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearProjectMap();
    expect(dispatch).toBeCalledWith(projectState.actions.clearProjectMap());
  });

  it('should dispatch clearLoadingMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoadingMap();
    expect(dispatch).toBeCalledWith(generalState.actions.clearLoadingMap());
  });

  it('should dispatch clearLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoading('key');
    expect(dispatch).toBeCalledWith(generalState.actions.clear('key'));
  });

  it('should dispatch clearModalMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearModalMap();
    expect(dispatch).toBeCalledWith(generalState.actions.setModalMap([], 0));
  });

  it('should dispatch updateProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateProject(getProject_1() as any);
    expect(dispatch).toBeCalledWith(projectState.actions.updateProjectStart(getProject_1() as any));
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

  it('should dispatch fetchBillingTierList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBillingTierList();
    expect(dispatch).toBeCalledWith(projectState.actions.fetchBillingTierListStart());
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

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_PROJECT));
  });

  it('should dispatch archiveProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.archiveProject(getProject_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.archiveProjectStart(getProject_1().id));
  });

  it('should dispatch unarchiveProject start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.unarchiveProject(getProject_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.unarchiveProjectStart(getProject_1().id));
  });

  it('should dispatch fetchConsentFormFields start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchConsentFormFields();
    expect(dispatch).toBeCalledWith(projectState.actions.fetchConsentFormFieldsStart());
  });

  it('should dispatch fetchProjectStatistics start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectStatistics('id');
    expect(dispatch).toBeCalledWith(statisticsState.actions.fetchProjectDetailStatisticsStart('id'));
  });

  it('should dispatch clearProjectStatistics start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearProjectStatistics();
    expect(dispatch).toBeCalledWith(statisticsState.actions.clearProjectDetailStatistics());
  });

  it('should dispatch fetchTimeZoneList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchTimeZoneList();
    expect(dispatch).toBeCalledWith(generalState.actions.fetchTimeZoneListStart());
  });

  it('should dispatch updateProjectPaymentMethod start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateProjectPaymentMethod('pId', 'pmId');
    expect(dispatch).toBeCalledWith(projectState.actions.updateProjectPaymentMethodStart('pId', 'pmId'));
  });
});
