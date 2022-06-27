import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Wizard from '../containers/Wizard';
import { ROUTES, GENERAL } from '../../../../../constants';
import { ProjectNewModel, GeneralModel, AddressModel, FileModel, ConsentFormModel, ResourceModel } from 'modules/models';
import { sanitizeProject } from 'utils/projectUtils';
import { useNavigator } from 'utils/useNavigator';
import ProjectForm from './ProjectForm';
import Header from './Wizard/Header';
import { getCompletedStepFields } from 'utils/generalUtils';
import { getFallbackBadgeBillingModel, getFallbackSeatBillingModel } from 'modules/models/project-new';

export interface IProjectWizardProps {
  categoryList: GeneralModel.INamedEntity[];
  certificationList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  loading: GeneralModel.ILoadingStatus;
  loadingMap: GeneralModel.IEntityMap<GeneralModel.ILoadingStatus>;
  projectMap: GeneralModel.IEntityMap<ProjectNewModel.IProject>;
  regionList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  uploadBadgesLoading: GeneralModel.ILoadingStatus;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  consentFormFields: ConsentFormModel.IConsentFormField[];
  sendForApprovalLoading: GeneralModel.ILoadingStatus;
  approveLoading: GeneralModel.ILoadingStatus;
  fetchCategoryList: () => void;
  fetchCertificationList: () => void;
  fetchNaeList: () => void;
  fetchConsentFormFields: () => void;
  fetchProject: (id: string) => void;
  fetchRegionList: () => void;
  fetchTrainingList: () => void;
  saveProject: (project: Partial<ProjectNewModel.IProject>, stepKey: string) => void;
  updateDraftProject: (project: Partial<ProjectNewModel.IProject>) => void;
  addProjectBadges: (id: string, files: string[], restOfFiles: { [key: string]: string }) => void;
  clearFileMap: () => void;
  sendProjectForApproval: (id: string) => void;
  approveProject: (id: string) => void;
}

const ProjectWizard = ({
  categoryList,
  certificationList,
  fcaNaeList,
  loading,
  loadingMap,
  projectMap,
  regionList,
  trainingList,
  fileMap,
  consentFormFields,
  uploadBadgesLoading,
  sendForApprovalLoading,
  approveLoading,
  fetchCategoryList,
  fetchCertificationList,
  fetchNaeList,
  fetchProject,
  fetchRegionList,
  fetchTrainingList,
  saveProject,
  fetchConsentFormFields,
  updateDraftProject,
  addProjectBadges,
  clearFileMap,
  sendProjectForApproval,
  approveProject,
}: IProjectWizardProps) => {
  const { id, step, entityId, currentEntity, currentStepKey, currentStep, setStep } = useNavigator<ProjectNewModel.IProject>({
    entityMap: projectMap,
    stepMap: ProjectNewModel.projectStepMap,
    defaultStep: ProjectNewModel.ProjectStep.GENERAL_INFORMATION,
    fallback: ProjectNewModel.getFallbackProject,
  });

  const loadedSuccessful: boolean = useMemo(
    () =>
      loading &&
      !loading.isLoading &&
      !loading.hasError &&
      ((uploadBadgesLoading && !uploadBadgesLoading.isLoading && !uploadBadgesLoading.hasError) || !uploadBadgesLoading),
    [loading, uploadBadgesLoading]
  );
  const isNavigationTopLoading = useMemo(() => (sendForApprovalLoading && sendForApprovalLoading.isLoading) || (approveLoading && approveLoading.isLoading), [
    approveLoading,
    sendForApprovalLoading,
  ]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const loadingError = useMemo(() => loading && loading.error && loading.error.errors, [loading]);
  const isValidForNavigation = useMemo(() => !loading || (loading && !loading.isLoading && !inProgress), [loading, inProgress]);
  const onLoadDeps = useMemo(() => ({ currentEntity }), [currentEntity]);

  const completedFields = useMemo(() => {
    const badgeBillingModel = (currentEntity.billingModelType || 0) === ProjectNewModel.BillingModelType.BADGES;
    const seatBillingModel = (currentEntity.billingModelType || 0) === ProjectNewModel.BillingModelType.SEATS;
    const fixedSeatPrice = currentEntity.seatBillingModel !== null && currentEntity.seatBillingModel?.isFixedSeatPrice;
    const billedPerCompany = badgeBillingModel && currentEntity.badgeBillingModel?.isBilledPerCompany;
    const updatedProjectStepMap = {
      ...ProjectNewModel.projectStepMap,
      [ProjectNewModel.ProjectStep.ADDRESSES]: {
        ...ProjectNewModel.projectStepMap[ProjectNewModel.ProjectStep.ADDRESSES],
        fields: [
          ProjectNewModel.projectStepMap[ProjectNewModel.ProjectStep.ADDRESSES].fields[0],
          ProjectNewModel.projectStepMap[ProjectNewModel.ProjectStep.ADDRESSES].fields[1],
          ProjectNewModel.projectStepMap[ProjectNewModel.ProjectStep.ADDRESSES].fields[2],
          ProjectNewModel.projectStepMap[ProjectNewModel.ProjectStep.ADDRESSES].fields[3],
          {
            name: ProjectNewModel.ProjectFields.BADGING_ADDRESS,
            required: !currentEntity.badgingSiteAddressMatchesJobSiteAddress,
            fields: currentEntity.badgingSiteAddressMatchesJobSiteAddress
              ? AddressModel.addressFieldRules.notRequired
              : AddressModel.addressFieldRules.required,
          },
          {
            name: ProjectNewModel.ProjectFields.MAILING_ADDRESS,
            required: currentEntity.mailingAddressMatchingType === ProjectNewModel.MailingAddressMatchingType.NONE,
            fields:
              currentEntity.mailingAddressMatchingType === ProjectNewModel.MailingAddressMatchingType.NONE
                ? AddressModel.addressFieldRules.required
                : AddressModel.addressFieldRules.notRequired,
          },
        ],
      },
      [ProjectNewModel.ProjectStep.BILLING_MODEL]: {
        ...ProjectNewModel.projectStepMap[ProjectNewModel.ProjectStep.BILLING_MODEL],
        fields: [
          { name: ProjectNewModel.ProjectFields.BILLING_MODEL_TYPE, required: true },
          {
            name: ProjectNewModel.ProjectFields.BADGES_MODEL,
            required: badgeBillingModel,
            fields: [
              { name: ProjectNewModel.BadgesModelFields.BADGE_PRICE, required: badgeBillingModel },
              { name: ProjectNewModel.BadgesModelFields.CLIENT_PAYS, required: !!(badgeBillingModel && billedPerCompany) },
              { name: ProjectNewModel.BadgesModelFields.BADGE_REPRINTING_COST, required: badgeBillingModel },
              { name: ProjectNewModel.BadgesModelFields.BILLED_COMPANY, required: badgeBillingModel && !billedPerCompany },
              { name: ProjectNewModel.BadgesModelFields.VISITOR_BADGE_PRICE, required: badgeBillingModel },
              { name: ProjectNewModel.BadgesModelFields.VISITOR_REPRINTING_COST, required: badgeBillingModel },
            ],
          },
          {
            name: ProjectNewModel.ProjectFields.SEATS_MODEL,
            required: seatBillingModel,
            fields: [
              { name: ProjectNewModel.SeatsModelFields.WORKERS_NUMBER, required: seatBillingModel },
              { name: ProjectNewModel.SeatsModelFields.IS_FIXED_SEAT_PRICE, required: false },
              { name: ProjectNewModel.SeatsModelFields.SEAT_PRICE, required: seatBillingModel && fixedSeatPrice },
              { name: ProjectNewModel.SeatsModelFields.BILLING_TIER, required: false },
              { name: ProjectNewModel.SeatsModelFields.BILLED_COMPANY, required: seatBillingModel },
              { name: ProjectNewModel.SeatsModelFields.REPRINTING_COST, required: seatBillingModel },
              { name: ProjectNewModel.SeatsModelFields.VISITOR_BADGE_PRICE, required: seatBillingModel },
              { name: ProjectNewModel.SeatsModelFields.VISITOR_REPRINTING_COST, required: seatBillingModel },
            ],
          },
        ],
      },
    };
    return getCompletedStepFields(updatedProjectStepMap, currentEntity);
  }, [currentEntity]);

  const readyForApprove = useMemo(() => {
    return !inProgress && !Object.keys(completedFields).some(stepFields => completedFields[stepFields].required > completedFields[stepFields].completed);
  }, [completedFields, inProgress]);

  useEffect(() => {
    /* istanbul ignore else */
    if (entityId && !projectMap[entityId]) {
      fetchProject(entityId);
    }
  }, [entityId, projectMap, fetchProject]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!certificationList.length) fetchCertificationList();
  }, [certificationList, fetchCertificationList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!trainingList.length) fetchTrainingList();
  }, [trainingList, fetchTrainingList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!categoryList.length) fetchCategoryList();
  }, [categoryList, fetchCategoryList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!regionList.length) fetchRegionList();
  }, [regionList, fetchRegionList]);

  useEffect(() => {
    if (!consentFormFields.length) fetchConsentFormFields();
  }, [consentFormFields, fetchConsentFormFields]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!fcaNaeList.length) fetchNaeList();
  }, [fcaNaeList, fetchNaeList]);

  const pendingFiles = useMemo(
    () =>
      Object.entries(fileMap).reduce((totalPendingFiles, [currentFileKey, currentFileValue]) => {
        return [
          ...totalPendingFiles,
          currentFileValue &&
            Object.values(currentFileValue)[0] &&
            !Object.values(currentFileValue)[0].error &&
            (Object.values(currentFileValue)[0].status === FileModel.FileStatus.INACTIVE ||
              Object.values(currentFileValue)[0].status === FileModel.FileStatus.PROGRESS) &&
            ProjectNewModel.projectBadgeKeys.includes(currentFileKey as any) &&
            currentFileKey,
        ].filter(Boolean);
      }, []),
    [fileMap]
  );

  const completedFiles = useMemo(
    () =>
      Object.entries(fileMap).reduce((totalPendingFiles, [currentFileKey, currentFileValue]) => {
        return [
          ...totalPendingFiles,
          currentFileValue &&
            Object.keys(currentFileValue).length &&
            ProjectNewModel.projectBadgeKeys.includes(currentFileKey as any) &&
            Object.values(currentFileValue)[0].status === FileModel.FileStatus.SUCCESS &&
            currentFileKey,
        ].filter(Boolean);
      }, []),
    [fileMap]
  );

  const handleSave = useCallback(
    (projectData: ProjectNewModel.IProject) => {
      const project = sanitizeProject(projectData);
      if (!entityId) saveProject(project, currentStepKey);
      if (entityId) updateDraftProject(project);
      if (pendingFiles.length) {
        setInProgress(true);
        const restOfFiles = {
          generalContractorBadgeLogo: projectData.generalContractorBadgeTemplate.logoFileName,
          generalContractorBadgeTemplate: projectData.generalContractorBadgeTemplate.templateFileName,
          subcontractorBadgeLogo: projectData.subcontractorBadgeTemplate.logoFileName,
          subcontractorBadgeTemplate: projectData.subcontractorBadgeTemplate.templateFileName,
          visitorBadgeLogo: projectData.visitorBadgeTemplate.logoFileName,
          visitorBadgeTemplate: projectData.visitorBadgeTemplate.templateFileName,
        };
        addProjectBadges(entityId, pendingFiles, restOfFiles);
      }
    },
    [saveProject, updateDraftProject, addProjectBadges, currentStepKey, entityId, pendingFiles]
  );

  const onLoadHandler = useCallback(
    /* istanbul ignore next */ onChange => {
      const modifiedCurrentEntity = {
        ...currentEntity,
        badgeBillingModel:
          currentEntity.billingModelType === ProjectNewModel.BillingModelType.BADGES && !currentEntity.badgeBillingModel
            ? getFallbackBadgeBillingModel()
            : currentEntity.badgeBillingModel,
        seatBillingModel:
          currentEntity.billingModelType === ProjectNewModel.BillingModelType.SEATS && !currentEntity.seatBillingModel
            ? getFallbackSeatBillingModel()
            : currentEntity.seatBillingModel,
      };
      if (currentEntity) onChange(modifiedCurrentEntity);
    },
    [currentEntity]
  );

  const onSendForApprovalHandler = useCallback(() => {
    if (currentEntity.status === ResourceModel.Status.DRAFT) {
      sendProjectForApproval(currentEntity.id);
    } else {
      approveProject(currentEntity.id);
    }
  }, [sendProjectForApproval, approveProject, currentEntity]);

  useEffect(() => {
    if (
      inProgress &&
      loading &&
      !loading.isLoading &&
      loadingMap &&
      !Object.values(loadingMap).find(
        /* istanbul ignore next */ (item: any) => item && item?.traceId && item.traceId === GENERAL.TRACE_KEY.SAVE_UPLOAD_PROJECT_BADGE
      )
    ) {
      setInProgress(false);
    }
  }, [loadingMap, loading, inProgress, setInProgress]);

  useEffect(() => {
    if (completedFiles.length) {
      fetchProject(entityId);
      setTimeout(() => clearFileMap(), 1000);
    }
  }, [completedFiles, entityId, fetchProject, clearFileMap]);

  return (
    <Wizard
      route="/projects/wizard-new"
      isValidForNavigation={isValidForNavigation}
      completedFieldMap={completedFields}
      navigationProps={{ id, step, entityId, currentEntity, currentStepKey, currentStep, setStep }}
      handleSave={handleSave}
      deps={onLoadDeps}
      status={ResourceModel.statusMap[currentEntity.status]}
      isConfirmEnabled={readyForApprove}
      onLoad={onLoadHandler}
      fallback={ProjectNewModel.getFallbackProject()}
      isLoading={isNavigationTopLoading}
      breadCrumb={{
        route: ROUTES.PROJECT_LIST.path,
        title: 'Project',
        pluralTitle: 'Projects',
      }}
      onConfirm={onSendForApprovalHandler}
      clearFileMap={clearFileMap}
      renderNavigator={({ hasChanges, onNextStep, onPrevStep, onDiscard, onSave, openDrawer }) => {
        return (
          <Header
            entityName={currentEntity.name}
            hasChanges={hasChanges}
            breadCrumb={{
              route: ROUTES.PROJECT_LIST.path,
              title: 'Projects',
            }}
            isSaveLoading={(loading && loading.isLoading) || inProgress}
            step={currentStep}
            onDiscard={onDiscard}
            onSave={onSave}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
            loadSuccess={loadedSuccessful}
            openDrawer={openDrawer}
          />
        );
      }}
      renderForm={({ model, formRules, errors, onChangeStep, onChange, update, resetErrors, setHasChanges, badgesType, setBadgesType }) => {
        return (
          <ProjectForm
            model={model}
            formRules={formRules}
            errors={{ ...errors, ...loadingError }}
            currentStep={currentStep}
            completedFields={completedFields}
            categoryList={categoryList}
            regionList={regionList}
            fcaNaeList={fcaNaeList}
            trainingList={trainingList}
            certificationList={certificationList}
            fileMap={fileMap}
            consentFormFields={consentFormFields}
            onChangeStep={onChangeStep}
            update={update}
            onChange={onChange}
            resetErrors={resetErrors}
            setHasChanges={setHasChanges}
            badgesType={badgesType}
            setBadgesType={setBadgesType}
          />
        );
      }}
    />
  );
};

export default memo(ProjectWizard);
