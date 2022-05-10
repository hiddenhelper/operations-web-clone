import { CertificationModel } from 'modules/models';
import { IProjectCertification } from 'modules/models/certification';

export const sanitizeCertificationGroups = (certificationGroups: CertificationModel.ICertificationGroup[]): CertificationModel.ICertificationGroup[] => {
  return certificationGroups.map((certificationGroup: CertificationModel.ICertificationGroup) => ({
    ...certificationGroup,
    certifications: certificationGroup.certifications.map((certification: IProjectCertification) => ({
      ...certification,
      alias: certification.alias?.trim() || null,
    })),
  }));
};
