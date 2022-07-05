import React, { memo, useMemo, useEffect, useState, useCallback } from 'react';

import Wizard from '../../shared/Wizard';
import NavigationTop from '../../shared/ResourceManagement/NavigationTop';
import ProjectForm from './ProjectForm';

import { GeneralModel, AddressModel, ProjectModel, ResourceModel, ConsentFormModel, FileModel, UserModel } from '../../../models';
import { GENERAL, ROUTES, FormRules } from '../../../../constants';
import { useNavigator } from '../../../../utils/useNavigator';
import { sanitizeProject } from '../../../../utils/projectUtils';
import { getCompletedStepFields } from '../../../../utils/generalUtils';
import { useStyles } from '../../shared/Wizard/styles';

export interface IProjectWizardProps {
  projectMap: GeneralModel.IEntityMap<ProjectModel.IProject>;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  certificationList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  mwbeList: GeneralModel.INamedEntity[];
  timeZoneList: GeneralModel.INamedEntity[];
  billingTierList: ProjectModel.IBillingTier[];
  consentFormFields: ConsentFormModel.IConsentFormField[];
  searchLoading: GeneralModel.ILoadingStatus;
  loading: GeneralModel.ILoadingStatus;
  uploadBadgesLoading: GeneralModel.ILoadingStatus;
  sendForApprovalLoading: GeneralModel.ILoadingStatus;
  approveLoading: GeneralModel.ILoadingStatus;
  loadingMap: GeneralModel.IEntityMap<GeneralModel.ILoadingStatus>;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  userRole: UserModel.Role;
  fetchProject: (id: string) => void;
  fetchCategoryList: () => void;
  fetchRegionList: () => void;
  fetchNaeList: () => void;
  fetchCertificationList: () => void;
  fetchTrainingList: () => void;
  fetchMwbeList: () => void;
  fetchBillingTierList: () => void;
  fetchConsentFormFields: () => void;
  fetchTimeZoneList: () => void;
  saveProject: (project: Partial<ProjectModel.IProject>, stepKey: string) => void;
  updateDraftProject: (project: Partial<ProjectModel.IProject>) => void;
  clearErrors: () => void;
  clearRelationMap: () => void;
  sendProjectForApproval: (id: string) => void;
  approveProject: (id: string) => void;
  addProjectBadges: (id: string, files: string[]) => void;
  clearFileMap: () => void;
}

const ProjectWizard = ({
  projectMap,
  categoryList,
  regionList,
  fcaNaeList,
  certificationList,
  trainingList,
  mwbeList,
  billingTierList,
  consentFormFields,
  loading,
  loadingMap,
  fileMap,
  sendForApprovalLoading,
  approveLoading,
  uploadBadgesLoading,
  userRole,
  saveProject,
  updateDraftProject,
  fetchProject,
  fetchCategoryList,
  fetchRegionList,
  fetchNaeList,
  timeZoneList,
  fetchCertificationList,
  fetchTrainingList,
  fetchBillingTierList,
  fetchMwbeList,
  fetchTimeZoneList,
  fetchConsentFormFields,
  clearErrors,
  clearRelationMap,
  sendProjectForApproval,
  approveProject,
  addProjectBadges,
  clearFileMap,
}: IProjectWizardProps) => {
  const classes = useStyles();
  const { id, step, entityId, currentEntity, currentStepKey, currentStep, setStep } = useNavigator<ProjectModel.IProject>({
    entityMap: projectMap,
    stepMap: ProjectModel.projectStepMap,
    defaultStep: ProjectModel.ProjectStep.GENERAL_INFORMATION,
    fallback: ProjectModel.getFallbackProject,
  });
  const [inProgress, setInProgress] = useState<boolean>(false);
  const onLoadDeps = useMemo(() => ({ currentEntity }), [currentEntity]);

  const loadingError = useMemo(() => loading && loading.error && loading.error.errors, [loading]);
  const isValidForNavigation = useMemo(() => !loading || (loading && !loading.isLoading && !inProgress), [loading, inProgress]);
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
            ProjectModel.projectBadgeKeys.includes(currentFileKey as any) &&
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
            ProjectModel.projectBadgeKeys.includes(currentFileKey as any) &&
            Object.values(currentFileValue)[0].status === FileModel.FileStatus.SUCCESS &&
            currentFileKey,
        ].filter(Boolean);
      }, []),
    [fileMap]
  );

  const onSaveHandler = useCallback(
    (projectData: ProjectModel.IProject) => {
      const project = sanitizeProject(projectData);
      if (!entityId) saveProject(project, currentStepKey);
      if (entityId) updateDraftProject(project);
      if (pendingFiles.length) {
        setInProgress(true);
        addProjectBadges(entityId, pendingFiles);
      }
    },
    [saveProject, updateDraftProject, addProjectBadges, currentStepKey, entityId, pendingFiles]
  );

  const onSendForApprovalHandler = useCallback(() => {
    if (currentEntity.status === ResourceModel.Status.DRAFT) {
      sendProjectForApproval(currentEntity.id);
    } else {
      approveProject(currentEntity.id);
    }
  }, [sendProjectForApproval, approveProject, currentEntity]);

  const completedFields = useMemo(() => {
    const badgeBillingModel = (currentEntity.billingModelType || 0) === ProjectModel.BillingModelType.BADGES;
    const seatBillingModel = (currentEntity.billingModelType || 0) === ProjectModel.BillingModelType.SEATS;
    const fixedSeatPrice = currentEntity.seatBillingModel !== null && currentEntity.seatBillingModel?.isFixedSeatPrice;
    const billedPerCompany = badgeBillingModel && currentEntity.badgeBillingModel?.isBilledPerCompany;
    const updatedProjectStepMap = {
      ...ProjectModel.projectStepMap,
      [ProjectModel.ProjectStep.ADDRESSES]: {
        ...ProjectModel.projectStepMap[ProjectModel.ProjectStep.ADDRESSES],
        fields: [
          ProjectModel.projectStepMap[ProjectModel.ProjectStep.ADDRESSES].fields[0],
          ProjectModel.projectStepMap[ProjectModel.ProjectStep.ADDRESSES].fields[1],
          ProjectModel.projectStepMap[ProjectModel.ProjectStep.ADDRESSES].fields[2],
          ProjectModel.projectStepMap[ProjectModel.ProjectStep.ADDRESSES].fields[3],
          {
            name: ProjectModel.ProjectFields.BADGING_ADDRESS,
            required: !currentEntity.badgingSiteAddressMatchesJobSiteAddress,
            fields: currentEntity.badgingSiteAddressMatchesJobSiteAddress
              ? AddressModel.addressFieldRules.notRequired
              : AddressModel.addressFieldRules.required,
          },
          {
            name: ProjectModel.ProjectFields.MAILING_ADDRESS,
            required: currentEntity.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.NONE,
            fields:
              currentEntity.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.NONE
                ? AddressModel.addressFieldRules.required
                : AddressModel.addressFieldRules.notRequired,
          },
        ],
      },
      [ProjectModel.ProjectStep.BILLING_MODEL]: {
        ...ProjectModel.projectStepMap[ProjectModel.ProjectStep.BILLING_MODEL],
        fields: [
          { name: ProjectModel.ProjectFields.BILLING_MODEL_TYPE, required: true },
          {
            name: ProjectModel.ProjectFields.BADGES_MODEL,
            required: badgeBillingModel,
            fields: [
              { name: ProjectModel.BadgesModelFields.BADGE_PRICE, required: badgeBillingModel },
              { name: ProjectModel.BadgesModelFields.CLIENT_PAYS, required: !!(badgeBillingModel && billedPerCompany) },
              { name: ProjectModel.BadgesModelFields.BADGE_REPRINTING_COST, required: badgeBillingModel },
              { name: ProjectModel.BadgesModelFields.BILLED_COMPANY, required: badgeBillingModel && !billedPerCompany },
              { name: ProjectModel.BadgesModelFields.VISITOR_BADGE_PRICE, required: badgeBillingModel },
              { name: ProjectModel.BadgesModelFields.VISITOR_REPRINTING_COST, required: badgeBillingModel },
            ],
          },
          {
            name: ProjectModel.ProjectFields.SEATS_MODEL,
            required: seatBillingModel,
            fields: [
              { name: ProjectModel.SeatsModelFields.WORKERS_NUMBER, required: seatBillingModel },
              { name: ProjectModel.SeatsModelFields.IS_FIXED_SEAT_PRICE, required: false },
              { name: ProjectModel.SeatsModelFields.SEAT_PRICE, required: seatBillingModel && fixedSeatPrice },
              { name: ProjectModel.SeatsModelFields.BILLING_TIER, required: false },
              { name: ProjectModel.SeatsModelFields.BILLED_COMPANY, required: seatBillingModel },
              { name: ProjectModel.SeatsModelFields.REPRINTING_COST, required: seatBillingModel },
              { name: ProjectModel.SeatsModelFields.VISITOR_BADGE_PRICE, required: seatBillingModel },
              { name: ProjectModel.SeatsModelFields.VISITOR_REPRINTING_COST, required: seatBillingModel },
            ],
          },
        ],
      },
    };

    return getCompletedStepFields(updatedProjectStepMap, currentEntity);
  }, [currentEntity]);

  const onLoadHandler = useCallback(
    /* istanbul ignore next */ onChange => {
      if (currentEntity) onChange(currentEntity);
    },
    [currentEntity]
  );

  const onDiscardHandler = useCallback(() => {
    clearErrors();
    clearRelationMap();
    clearFileMap();
  }, [clearErrors, clearRelationMap, clearFileMap]);

  const readyForApprove = useMemo(() => {
    return !inProgress && !Object.keys(completedFields).some(stepFields => completedFields[stepFields].required > completedFields[stepFields].completed);
  }, [completedFields, inProgress]);

  useEffect(() => {
    if (completedFiles.length) fetchProject(entityId);
  }, [completedFiles, entityId, fetchProject]);

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
    /* istanbul ignore else */
    if (!billingTierList.length) fetchBillingTierList();
  }, [billingTierList, fetchBillingTierList]);

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
    /* istanbul ignore else */
    if (!fcaNaeList.length) fetchNaeList();
  }, [fcaNaeList, fetchNaeList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!mwbeList.length) fetchMwbeList();
  }, [mwbeList, fetchMwbeList]);

  useEffect(() => {
    if (!consentFormFields.length) fetchConsentFormFields();
  }, [consentFormFields, fetchConsentFormFields]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!timeZoneList.length) fetchTimeZoneList();
  }, [timeZoneList, fetchTimeZoneList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (entityId && !projectMap[entityId] && categoryList.length && regionList.length && fcaNaeList.length && consentFormFields.length) {
      fetchProject(entityId);
    }
  }, [entityId, categoryList, regionList, fcaNaeList, projectMap, consentFormFields, fetchProject]);

  useEffect(() => {
    return function unMount() {
      clearErrors();
      clearRelationMap();
      clearFileMap();
    };
  }, [clearErrors, clearRelationMap, clearFileMap]);

  return (
    <Wizard
      route="/projects/wizard-old"
      stepMap={ProjectModel.projectStepMap}
      formRuleMap={FormRules.project.fieldRules}
      completedFieldMap={completedFields}
      navigationProps={{ id, step, entityId, currentEntity, currentStepKey, currentStep, setStep }}
      fallback={ProjectModel.getFallbackProject()}
      isConfirmEnabled={readyForApprove}
      isLoadSuccess={loadedSuccessful}
      isValidForNavigation={isValidForNavigation}
      styles={{ formContainer: classes.formContainerPadding }}
      loading={loading}
      deps={onLoadDeps}
      onLoad={onLoadHandler}
      onConfirm={onSendForApprovalHandler}
      onSave={onSaveHandler}
      clearErrors={clearErrors}
      onDiscard={onDiscardHandler}
      renderNavigator={({ toggleClass, activeStep, hasChanged, isConfirmEnabled, onNextStep, onDiscard, onSave, onConfirm }) => (
        <NavigationTop
          isFixed={toggleClass}
          breadCrumb={{
            route: ROUTES.PROJECT_LIST.path,
            title: 'Project',
            pluralTitle: 'Projects',
          }}
          step={currentStep}
          stepIndex={activeStep}
          status={ResourceModel.statusMap[currentEntity.status]}
          entityName={currentEntity.name}
          hasChanges={hasChanged}
          loadSuccess={loadedSuccessful}
          isSaveLoading={(loading && loading.isLoading) || inProgress}
          isLoading={isNavigationTopLoading}
          isConfirmEnabled={isConfirmEnabled}
          onNextStep={onNextStep}
          onDiscard={onDiscard}
          onSave={onSave}
          onConfirm={onConfirm}
        />
      )}
      renderForm={({ model, formRules, errors, onChangeStep, onChange, update, setHasChanged, resetErrors }) => (
        <ProjectForm
          model={model}
          formRules={formRules}
          errors={{ ...errors, ...loadingError }}
          userRole={userRole}
          currentStep={currentStep}
          categoryList={categoryList}
          regionList={regionList}
          fcaNaeList={fcaNaeList}
          timeZoneList={timeZoneList}
          certificationList={certificationList}
          trainingList={trainingList}
          billingTierList={billingTierList}
          consentFormFields={consentFormFields}
          completedFields={completedFields}
          fileMap={fileMap}
          update={update}
          onChangeStep={onChangeStep}
          onChange={onChange}
          resetErrors={resetErrors}
          setHasChanged={setHasChanged}
        />
      )}
    />
  );
};

export default memo(ProjectWizard);
