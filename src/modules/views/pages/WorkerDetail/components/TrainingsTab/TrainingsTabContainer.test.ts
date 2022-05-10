import { getInitialState } from '../../../../../../test/rootState';
import { trainingState } from '../../../../../state-mgmt/training';
import { workerState } from '../../../../../state-mgmt/worker';
import { generalState } from '../../../../../state-mgmt/general';
import { mapStateToProps, mapDispatchToProps } from './TrainingsTabContainer';
import { getWorker_1, getWorkerTraining_1, getTraining_1 } from '../../../../../../test/entities';
import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { projectState } from '../../../../../state-mgmt/project';
import { fileState } from '../../../../../state-mgmt/file';

describe('TrainingsTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      trainingMap: getInitialState().training.workerMap,
      fileMap: getInitialState().file.fileMap,
      defaultFilesToRemove: getInitialState().file.defaultFilesToRemove,
      count: getInitialState().worker.count,
      projectMap: getInitialState().project.projectWorkerMap,
      trainingList: getInitialState().training.trainingList,
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
      addWorkerTraining: expect.any(Function),
      updateWorkerTraining: expect.any(Function),
      deleteWorkerTraining: expect.any(Function),
      fetchTrainingList: expect.any(Function),
      fetchWorkerTrainingList: expect.any(Function),
      fetchWorkerTrainingDetail: expect.any(Function),
      fetchProjectList: expect.any(Function),
      addTrainingSuccess: expect.any(Function),
      updateTrainingSuccess: expect.any(Function),
      clearLoading: expect.any(Function),
      fetchWorker: expect.any(Function),
      fetchWorkerProjectList: expect.any(Function),
      clearFileMap: expect.any(Function),
    });
  });

  it('should dispatch addWorkerTraining start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.addWorkerTraining(getWorker_1().id, getWorkerTraining_1(), 'uploadId');
    expect(dispatch).toBeCalledWith(trainingState.actions.addWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1(), 'uploadId'));
  });

  it('should dispatch updateWorkerTraining start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateWorkerTraining(getWorker_1().id, getWorkerTraining_1(), 'uploadId');
    expect(dispatch).toBeCalledWith(trainingState.actions.updateWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1(), 'uploadId'));
  });

  it('should dispatch deleteWorkerTraining start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deleteWorkerTraining(getWorker_1().id, getWorkerTraining_1().id);
    expect(dispatch).toBeCalledWith(trainingState.actions.deleteWorkerTrainingStart(getWorker_1().id, getWorkerTraining_1().id));
  });

  it('should dispatch fetchTrainingList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchTrainingList();
    expect(dispatch).toBeCalledWith(trainingState.actions.fetchTrainingListStart());
  });

  it('should dispatch fetchWorkerTrainingList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerTrainingList(getWorker_1().id, {} as any);
    expect(dispatch).toBeCalledWith(trainingState.actions.fetchWorkerTrainingListStart(getWorker_1().id, {} as any));
  });

  it('should dispatch fetchWorkerTrainingDetail start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchWorkerTrainingDetail(getWorker_1().id, getTraining_1().id);
    expect(dispatch).toBeCalledWith(trainingState.actions.fetchWorkerTrainingDetailStart(getWorker_1().id, getTraining_1().id));
  });

  it('should dispatch fetchProjectList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectList(getWorker_1().id);
    expect(dispatch).toBeCalledWith(workerState.actions.fetchProjectListStart(getWorker_1().id));
  });

  it('should dispatch addTrainingSuccess start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.addTrainingSuccess();
    expect(dispatch).toBeCalledWith(generalState.actions.addToastStart('Training added successfully!', GeneralModel.ToastType.SUCCESS));
  });

  it('should dispatch updateTrainingSuccess start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateTrainingSuccess();
    expect(dispatch).toBeCalledWith(generalState.actions.addToastStart('Training updated successfully!', GeneralModel.ToastType.SUCCESS));
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
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_WORKER_TRAINING));
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
