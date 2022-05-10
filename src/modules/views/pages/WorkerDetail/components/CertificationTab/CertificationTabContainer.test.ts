import { getInitialState } from '../../../../../../test/rootState';
import { certificationState } from '../../../../../state-mgmt/certification';
import { workerState } from '../../../../../state-mgmt/worker';
import { generalState } from '../../../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './CertificationTabContainer';
import { getWorker_1, getWorkerCertification_1, getCertification_1 } from '../../../../../../test/entities';
import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { projectState } from '../../../../../state-mgmt/project';
import { fileState } from '../../../../../state-mgmt/file';

describe('CertificationTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      certificationMap: getInitialState().worker.certificationMap,
      fileMap: getInitialState().file.fileMap,
      defaultFilesToRemove: getInitialState().file.defaultFilesToRemove,
      projectWorkerMap: getInitialState().project.projectWorkerMap,
      count: getInitialState().worker.count,
      certificationList: getInitialState().certification.certificationList,
      projectList: getInitialState().worker.projectList,
      listLoading: undefined,
      saveLoading: undefined,
      detailLoading: undefined,
      loadingMap: getInitialState().general.loadingMap,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      addWorkerCertification: expect.any(Function),
      updateWorkerCertification: expect.any(Function),
      deleteWorkerCertification: expect.any(Function),
      fetchCertificationList: expect.any(Function),
      fetchWorkerCertificationList: expect.any(Function),
      fetchWorkerCertificationDetail: expect.any(Function),
      fetchProjectList: expect.any(Function),
      addCertificationSuccess: expect.any(Function),
      updateCertificationSuccess: expect.any(Function),
      clearLoading: expect.any(Function),
      fetchWorker: expect.any(Function),
      fetchWorkerProjectList: expect.any(Function),
      clearFileMap: expect.any(Function),
    });
  });

  it('should dispatch addWorkerCertification start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.addWorkerCertification(getWorker_1().id, getWorkerCertification_1(), 'uploadId');
    expect(dispatch).toBeCalledWith(certificationState.actions.addWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1(), 'uploadId'));
  });

  it('should dispatch updateWorkerCertification start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateWorkerCertification(getWorker_1().id, getWorkerCertification_1(), 'uploadId');
    expect(dispatch).toBeCalledWith(certificationState.actions.updateWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1(), 'uploadId'));
  });

  it('should dispatch deleteWorkerCertification start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deleteWorkerCertification(getWorker_1().id, getWorkerCertification_1().id);
    expect(dispatch).toBeCalledWith(certificationState.actions.deleteWorkerCertificationStart(getWorker_1().id, getWorkerCertification_1().id));
  });

  it('should dispatch fetchCertificationList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchCertificationList();
    expect(dispatch).toBeCalledWith(certificationState.actions.fetchCertificationListStart());
  });

  it('should dispatch fetchWorkerCertificationList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerCertificationList(getWorker_1().id, {} as any);
    expect(dispatch).toBeCalledWith(certificationState.actions.fetchWorkerCertificationListStart(getWorker_1().id, {} as any));
  });

  it('should dispatch fetchWorkerCertificationDetail start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerCertificationDetail(getWorker_1().id, getCertification_1().id);
    expect(dispatch).toBeCalledWith(certificationState.actions.fetchWorkerCertificationDetailStart(getWorker_1().id, getCertification_1().id));
  });

  it('should dispatch fetchProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectList(getWorker_1().id);
    expect(dispatch).toBeCalledWith(workerState.actions.fetchProjectListStart(getWorker_1().id));
  });

  it('should dispatch addCertificationSuccess start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.addCertificationSuccess();
    expect(dispatch).toBeCalledWith(generalState.actions.addToastStart('Certification added successfully!', GeneralModel.ToastType.SUCCESS));
  });

  it('should dispatch updateCertificationSuccess start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateCertificationSuccess();
    expect(dispatch).toBeCalledWith(generalState.actions.addToastStart('Certification updated successfully!', GeneralModel.ToastType.SUCCESS));
  });

  it('should dispatch fetchWorker start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorker('id');
    expect(dispatch).toBeCalledWith(workerState.actions.fetchWorkerStart('id'));
  });

  it('should dispatch clearLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_WORKER_CERTIFICATION));
  });

  it('should dispatch fetchWorkerProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerProjectList('id', {});
    expect(dispatch).toBeCalledWith(projectState.actions.fetchWorkerProjectListStart('id', {}));
  });

  it('should dispatch clearFileMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearFileMap('id');
    expect(dispatch).toBeCalledWith(fileState.actions.clearUploadMap('id'));
  });
});
