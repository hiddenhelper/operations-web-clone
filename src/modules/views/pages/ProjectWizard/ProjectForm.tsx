import React, { memo } from 'react';

import GeneralInformation from '../../shared/ProjectForm/GeneralInformation';
import AssignClient from '../../shared/ProjectForm/AssignClient';
import Addresses from '../../shared/ProjectForm/Addresses';
import BillingModel from '../../shared/ProjectForm/BillingModel';
import BadgeConfiguration from '../../shared/ProjectForm/BadgeConfiguration';
import CertificationsAndTrainings from '../../shared/ProjectForm/CertificationsAndTrainings/CertificationsAndTrainings';
import WorkerConsentForm from '../../shared/ProjectForm/WorkerConsentForm';
import Review from '../../shared/ProjectForm/Review';

import { GeneralModel, ProjectModel, ConsentFormModel, FileModel, UserModel } from '../../../models';
import { IFormRules } from '../../../../utils/useValidator';

export interface IProjectFormProps {
  model: ProjectModel.IProject;
  errors: any;
  completedFields: any;
  formRules: IFormRules;
  currentStep: GeneralModel.IStep;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  timeZoneList: GeneralModel.INamedEntity[];
  certificationList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  billingTierList: ProjectModel.IBillingTier[];
  consentFormFields: ConsentFormModel.IConsentFormField[];
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  userRole: UserModel.Role;
  onChangeStep: (key: string) => void;
  onChange: (model: ProjectModel.IProject) => void;
  update: (model: ProjectModel.IProject) => void;
  resetErrors: () => void;
  setHasChanged: (hasChanged: boolean) => void;
}

const ProjectForm = ({
  currentStep,
  model,
  errors,
  formRules,
  categoryList,
  regionList,
  fcaNaeList,
  timeZoneList,
  certificationList,
  trainingList,
  completedFields,
  billingTierList,
  consentFormFields,
  fileMap,
  userRole,
  update,
  onChangeStep,
  onChange,
  resetErrors,
  setHasChanged,
}: IProjectFormProps) => {
  return (
    <>
      {currentStep.key === ProjectModel.ProjectStep.GENERAL_INFORMATION && (
        <GeneralInformation
          categoryList={categoryList}
          regionList={regionList}
          fcaNaeList={fcaNaeList}
          timeZoneList={timeZoneList}
          formRules={formRules}
          model={model}
          errors={errors}
          onChange={onChange}
          userRole={userRole}
        />
      )}
      {currentStep.key === ProjectModel.ProjectStep.ASSIGN_CLIENTS && (
        <AssignClient currentStep={currentStep} relatedCompanies={model.relatedCompanies} onChange={onChange} update={update} />
      )}
      {currentStep.key === ProjectModel.ProjectStep.ADDRESSES && <Addresses model={model} onChange={onChange} errors={errors} />}
      {currentStep.key === ProjectModel.ProjectStep.BILLING_MODEL && (
        <BillingModel model={model} onChange={onChange} billingTiers={billingTierList} errors={errors} resetErrors={resetErrors} />
      )}
      {currentStep.key === ProjectModel.ProjectStep.CERTIFICATIONS_TRAININGS && (
        <CertificationsAndTrainings
          certificationList={certificationList}
          errors={errors}
          model={model}
          onChange={onChange}
          trainingList={trainingList}
          resetErrors={resetErrors}
        />
      )}
      {currentStep.key === ProjectModel.ProjectStep.BADGE_TEMPLATES && (
        <BadgeConfiguration model={model} errors={errors} fileMap={fileMap} onChange={onChange} setHasChanged={setHasChanged} />
      )}
      {currentStep.key === ProjectModel.ProjectStep.WORKER_CONSENT_FORM && (
        <WorkerConsentForm consentFormFields={consentFormFields} errors={errors} formRules={formRules} model={model} onChange={onChange} />
      )}
      {currentStep.key === ProjectModel.ProjectStep.REVIEW && (
        <Review
          model={model}
          completedFields={completedFields}
          categoryList={categoryList}
          regionList={regionList}
          fcaNaeList={fcaNaeList}
          onChangeStep={onChangeStep}
        />
      )}
    </>
  );
};

export default memo(ProjectForm);
