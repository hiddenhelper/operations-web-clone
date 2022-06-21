import React, { memo } from 'react';

import GeneralInformation from '../containers/GeneralInformation';
import Client from '../containers/Client';
import BillingModel from '../containers/BillingModel';

import { ConsentFormModel, FileModel, GeneralModel, ProjectModel } from 'modules/models';
import Addresses from '../containers/Addresses';
import Review from '../containers/Review';
import CertificationsAndTrainings from './CertificationsAndTrainings';
import BadgeConfiguration from './BadgeConfiguration';
import WorkerConsentForm from './WorkerConsentForm';
import { IFormRules } from 'utils/useValidator';
import { useStyles } from '../wizardStyles';

export interface IProjectFormProps {
  model: ProjectModel.IProject;
  errors: any;
  formRules: IFormRules;
  currentStep: GeneralModel.IStep;
  completedFields: any;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  certificationList: GeneralModel.INamedEntity[];
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  consentFormFields: ConsentFormModel.IConsentFormField[];
  badgesType: any;
  onChangeStep: (key: string) => void;
  onChange: (model: ProjectModel.IProject) => void;
  update: (model: ProjectModel.IProject) => void;
  resetErrors: () => void;
  setHasChanges: (hasChanged: boolean) => void;
  setBadgesType: (badgesType: any, setAsPrev?: boolean) => void;
}

const ProjectForm = ({
  model,
  errors,
  formRules,
  currentStep,
  completedFields,
  categoryList,
  regionList,
  fcaNaeList,
  trainingList,
  certificationList,
  fileMap,
  consentFormFields,
  badgesType,
  onChangeStep,
  update,
  onChange,
  resetErrors,
  setHasChanges,
  setBadgesType,
}: IProjectFormProps) => {
  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      {currentStep.key === ProjectModel.ProjectStep.GENERAL_INFORMATION && <GeneralInformation model={model} errors={errors} onChange={onChange} />}
      {currentStep.key === ProjectModel.ProjectStep.ASSIGN_CLIENTS && (
        <Client currentStep={currentStep} errors={errors} relatedCompanies={model.relatedCompanies} onChange={onChange} update={update} />
      )}

      {currentStep.key === ProjectModel.ProjectStep.BILLING_MODEL && (
        <BillingModel model={model} onChange={onChange} errors={errors} resetErrors={resetErrors} />
      )}
      {currentStep.key === ProjectModel.ProjectStep.ADDRESSES && <Addresses model={model} onChange={onChange} errors={errors} />}
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
        <BadgeConfiguration
          model={model}
          errors={errors}
          fileMap={fileMap}
          badgesType={badgesType}
          onChange={onChange}
          setHasChanged={setHasChanges}
          setBadgesType={setBadgesType}
        />
      )}
      {currentStep.key === ProjectModel.ProjectStep.WORKER_CONSENT_FORM && (
        <WorkerConsentForm consentFormFields={consentFormFields} errors={errors} formRules={formRules} model={model} onChange={onChange} />
      )}
      {currentStep.key === ProjectModel.ProjectStep.REVIEW && (
        <Review
          model={model}
          categoryList={categoryList}
          regionList={regionList}
          fcaNaeList={fcaNaeList}
          completedFields={completedFields}
          onChangeStep={onChangeStep}
        />
      )}
    </div>
  );
};

export default memo(ProjectForm);
