import { INamedEntity, GroupValidationType } from './general';

export interface ICertification {
  id: string;
  name: string;
}

export interface IProjectCertification extends ICertification {
  alias: string;
}

export interface ICertificationGroup {
  id: string;
  name: string;
  validationType: GroupValidationType;
  certifications: IProjectCertification[];
}

export interface IWorkerCertificationFile {
  id?: string;
  displayName: string;
  url: string;
  fileSize: number;
}

export interface IWorkerCertification {
  id?: string;
  certificationId?: string;
  idNumber: string;
  projectId?: string;
  certification?: INamedEntity;
  description: string;
  completionDate: string;
  expirationDate: string;
  project?: INamedEntity;
  files?: IWorkerCertificationFile[];
  index?: number;
}

export const getCertificationFallback = (): IWorkerCertification => ({
  id: null,
  certificationId: '',
  idNumber: null,
  projectId: '',
  description: null,
  completionDate: null,
  expirationDate: null,
});
