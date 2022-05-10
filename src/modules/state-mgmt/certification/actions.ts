import { CertificationModel, GeneralModel, FileModel } from '../../models';

export enum ActionType {
  FETCH_CERTIFICATION_START = '[certification] fetch certification list start',
  FETCH_CERTIFICATION_SUCCESS = '[certification] fetch certification list success',
  FETCH_WORKER_CERTIFICATION_DETAIL_START = '[certification] fetch worker certification detail start',
  FETCH_WORKER_CERTIFICATION_DETAIL_SUCCESS = '[certification] fetch worker certification detail success',
  FETCH_WORKER_CERTIFICATION_LIST_START = '[certification] fetch worker certification list start',
  FETCH_WORKER_CERTIFICATION_LIST_SUCCESS = '[certification] fetch worker certification list success',
  ADD_WORKER_CERTIFICATION_START = '[certification] add worker certification start',
  ADD_WORKER_CERTIFICATION_SUCCESS = '[certification] add worker certification success',
  UPDATE_WORKER_CERTIFICATION_START = '[certification] update worker certification start',
  UPDATE_WORKER_CERTIFICATION_SUCCESS = '[certification] update worker certification success',
  DELETE_WORKER_CERTIFICATION_START = '[certification] delete worker certification start',
  DELETE_WORKER_CERTIFICATION_SUCCESS = '[certification] delete worker certification success',
  UPLOAD_WORKER_CERTIFICATION_LIST_START = '[certification] upload worker certification list start',
  CLEAR_WORKER_MAP = '[certification] clear worker map',
}

export const actions = {
  fetchCertificationListStart: () => ({ type: ActionType.FETCH_CERTIFICATION_START, payload: {} }),
  fetchCertificationListSuccess: (list: GeneralModel.INamedEntity[]) => ({ type: ActionType.FETCH_CERTIFICATION_SUCCESS, payload: { list } }),
  fetchWorkerCertificationListStart: (id: string, query: GeneralModel.IQueryParams) => ({
    type: ActionType.FETCH_WORKER_CERTIFICATION_LIST_START,
    payload: { id, query },
  }),
  fetchWorkerCertificationListSuccess: (list: CertificationModel.IWorkerCertification[], count: number) => ({
    type: ActionType.FETCH_WORKER_CERTIFICATION_LIST_SUCCESS,
    payload: { list, count },
  }),
  fetchWorkerCertificationDetailStart: (id: string, certId: string) => ({ type: ActionType.FETCH_WORKER_CERTIFICATION_DETAIL_START, payload: { id, certId } }),
  fetchWorkerCertificationDetailSuccess: (certification: CertificationModel.IWorkerCertification) => ({
    type: ActionType.FETCH_WORKER_CERTIFICATION_DETAIL_SUCCESS,
    payload: { certification },
  }),
  addWorkerCertificationStart: (id: string, certification: CertificationModel.IWorkerCertification, uploadId: string) => ({
    type: ActionType.ADD_WORKER_CERTIFICATION_START,
    payload: { id, certification, uploadId },
  }),
  addWorkerCertificationSuccess: (certification: CertificationModel.IWorkerCertification) => ({
    type: ActionType.ADD_WORKER_CERTIFICATION_SUCCESS,
    payload: { certification },
  }),
  updateWorkerCertificationStart: (id: string, certification: CertificationModel.IWorkerCertification, uploadId: string) => ({
    type: ActionType.UPDATE_WORKER_CERTIFICATION_START,
    payload: { id, certification, uploadId },
  }),
  updateWorkerCertificationSuccess: (certification: CertificationModel.IWorkerCertification) => ({
    type: ActionType.UPDATE_WORKER_CERTIFICATION_SUCCESS,
    payload: { certification },
  }),
  deleteWorkerCertificationStart: (workerId: string, certificationId: string) => ({
    type: ActionType.DELETE_WORKER_CERTIFICATION_START,
    payload: { workerId, certificationId },
  }),
  deleteWorkerCertificationSuccess: (certification: CertificationModel.IWorkerCertification) => ({
    type: ActionType.DELETE_WORKER_CERTIFICATION_SUCCESS,
    payload: { certification },
  }),
  uploadWorkerCertificationListStart: (workerId: string, certificationId: string, list: FileModel.IFile[]) => ({
    type: ActionType.UPLOAD_WORKER_CERTIFICATION_LIST_START,
    payload: { workerId, certificationId, list },
  }),
  clearWorkerMap: () => ({ type: ActionType.CLEAR_WORKER_MAP, payload: {} }),
};
