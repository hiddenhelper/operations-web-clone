import React, { memo, useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Chip, DialogTitle, DialogContent, Typography } from '@material-ui/core';

// import Addresses from 'modules/views/shared/ProjectForm/Addresses';
// import BillingModel from 'modules/views/shared/ProjectForm/BillingModel';
import Card from 'modules/views/shared/ResourceManagement/Card';
// import CertificationsAndTrainings from 'modules/views/shared/ProjectForm/CertificationsAndTrainings/CertificationsAndTrainings';
import Confirm from 'modules/views/shared/Modal/components/Confirm';
import Container from 'modules/views/shared/Container';
import FormModal from 'modules/views/shared/Modal/components/FormModal/FormModal';
// import GeneralInformation from 'modules/views/shared/ProjectForm/GeneralInformation';
import InvoicesTab from 'modules/views/shared/InvoicesTab';
import Modal from 'modules/views/shared/Modal';
import PaymentMethods from 'modules/views/shared/PaymentMethods';
// import Review from 'modules/views/shared/ProjectForm/Review';
import StatusWidget from 'modules/views/shared/StatusWidget';
// import StepEditor from 'modules/views/shared/ResourceManagement/StepEditor';
// import WorkerConsentForm from 'modules/views/shared/ProjectForm/WorkerConsentForm';

import AccessControlSystemTab from './components/AccessControlSystemTab';
import AssignSubContractorTab from './components/AssignSubContractorTab';
import BadgePrintingSystemTab from './components/BadgePrintingSystemTab';
import UsersTab from './components/UsersTab';
import VisitorsTab from './components/VisitorsTab';
import WorkersTab from './components/WorkersTab';

import { GeneralModel, ProjectNewModel, ResourceModel, UserModel, StatisticsModel } from 'modules/models';
import { FormRules, GENERAL } from 'constants/index';
import { sanitizeProject } from 'utils/projectUtils';
import { useQueryParamState } from 'utils/useQueryParamState';
import { isUUID, getConditionalDefaultValue, getDefaultValue, formatNumberWithCommas, getFormattedDecimalNumber, noop } from 'utils/generalUtils';
import { tableGlobalStyles, listGlobalStyles, modalGlobalStyles } from 'assets/styles';
import { useStyles as modalStyles } from 'modules/views/shared/Modal/style';
import { useStyles as projectFormStyles } from 'modules/views/shared/ProjectForm/styles';
import { useStyles } from './styles';
import GeneralInformation from '../ProjectWizardNew/components/GeneralInformation';
import BillingModel from '../ProjectWizardNew/components/BillingModel';
import Addresses from '../ProjectWizardNew/components/Addresses';
import CertificationsAndTrainings from '../ProjectWizardNew/components/CertificationsAndTrainings';
import WorkerConsentForm from '../ProjectWizardNew/components/WorkerConsentForm';
import Review from '../ProjectWizardNew/containers/Review';
import StepEditor from './components/StepEditor';
import { hasValidPermissions } from 'modules/models/user';

interface IQueryParams {
  page: number;
  limit: number;
  status?: ResourceModel.Status;
}

export interface IProjectDetailProps {
  userRole: UserModel.Role;
  isFcaUser: boolean;
  projectMap: GeneralModel.IEntityMap<ProjectNewModel.IProject>;
  categoryList: GeneralModel.INamedEntity[];
  regionList: GeneralModel.INamedEntity[];
  fcaNaeList: GeneralModel.INamedEntity[];
  currentUserPermissions: UserModel.IPermission[];
  billingTierList: ProjectNewModel.IBillingTier[];
  certificationList: GeneralModel.INamedEntity[];
  timeZoneList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  consentFormFields: GeneralModel.INamedEntity[];
  projectLoading: GeneralModel.ILoadingStatus;
  updateProjectLoading: GeneralModel.ILoadingStatus;
  saveBadgeVisitorLoading: GeneralModel.ILoadingStatus;
  updateBadgeVisitorLoading: GeneralModel.ILoadingStatus;
  updatePaymentMethodLoading: GeneralModel.ILoadingStatus;
  statisticsLoading: GeneralModel.ILoadingStatus;
  projectStatistics: StatisticsModel.IProjectDetailStatistics;
  isAdmin: boolean;
  updateProject: (project: Partial<ProjectNewModel.IProject>) => void;
  fetchCategoryList: () => void;
  fetchRegionList: () => void;
  fetchNaeList: () => void;
  fetchBillingTierList: () => void;
  fetchCertificationList: () => void;
  fetchTrainingList: () => void;
  fetchProject: (id: string) => void;
  fetchProjectStatistics: (id: string) => void;
  archiveProject: (id: string) => void;
  unarchiveProject: (id: string) => void;
  updateProjectPaymentMethod: (projectId: string, paymentMethodId: string) => void;
  clearProjectMap: () => void;
  clearErrors: () => void;
  clearModalMap: () => void;
  fetchConsentFormFields: () => void;
  fetchTimeZoneList: () => void;
  clearLoadingMap: () => void;
  clearLoading: (key: string) => void;
  clearProjectStatistics: () => void;
}

const ProjectDetail = ({
  userRole,
  isFcaUser,
  projectMap,
  projectLoading,
  updateProjectLoading,
  updatePaymentMethodLoading,
  categoryList,
  regionList,
  fcaNaeList,
  billingTierList,
  certificationList,
  trainingList,
  timeZoneList,
  consentFormFields,
  projectStatistics,
  statisticsLoading,
  currentUserPermissions,
  isAdmin,
  updateProject,
  fetchProject,
  clearProjectMap,
  clearErrors,
  fetchCategoryList,
  fetchRegionList,
  fetchNaeList,
  fetchBillingTierList,
  fetchCertificationList,
  fetchTrainingList,
  fetchTimeZoneList,
  fetchProjectStatistics,
  archiveProject,
  unarchiveProject,
  clearModalMap,
  fetchConsentFormFields,
  updateProjectPaymentMethod,
  clearLoading,
  clearLoadingMap,
  clearProjectStatistics,
}: IProjectDetailProps) => {
  const classes = useStyles();
  const projectFormClasses = projectFormStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const modalClasses = modalStyles();
  const listClasses = listGlobalStyles();
  const modalGlobalClasses = modalGlobalStyles();

  const { id, step } = useParams<{ id?: string; step?: string }>();
  const [queryParams, setQueryParams] = useQueryParamState<IQueryParams>({ page: 1, limit: 15, status: '' as any });
  const [editDialogStep, setEditDialogStep] = useState<{ isOpen: boolean; step: ProjectNewModel.ProjectStep }>({
    isOpen: false,
    step: ProjectNewModel.ProjectStep.GENERAL_INFORMATION,
  });
  const [archiveDialogOpen, setArchiveDialogOpen] = useState<boolean>(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [isModalOpen, setModal] = useState<boolean>(false);
  const [drawer, setDrawer] = useState({ open: false, id: null });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [modalSelectedPaymentMethod, setModalSelectedPaymentMethod] = useState(null);

  const projectListRef = useRef();

  const projectId = useMemo(() => (/* istanbul ignore next */ isUUID(id) ? id : null), [id]);

  const currentProject = useMemo(() => (projectMap[projectId] ? projectMap[projectId] : ProjectNewModel.getFallbackProject()), [projectMap, projectId]);
  const isProjectLoaded = useMemo(() => !!(currentProject.id !== null && projectLoading && !projectLoading.isLoading && !projectLoading.hasError), [
    currentProject,
    projectLoading,
  ]);

  const tabList = useMemo(
    () =>
      Object.values(ProjectNewModel.tabMap)
        .filter(item => {
          if (isFcaUser) {
            return item.key === ProjectNewModel.DetailTabType.COMPANIES ? false : true;
          } else {
            return item.key === ProjectNewModel.DetailTabType.CLIENTS ? false : true;
          }
        })
        .filter(item => {
          return hasValidPermissions(item.permissionsExpression, currentUserPermissions);
        }),
    [isFcaUser, currentUserPermissions]
  );

  const currentTab = useMemo(() => {
    return step ? step : tabList[0].key;
  }, [step, tabList]);

  const prevTab = useRef(currentTab);

  const { archiveTitle, archiveText, archiveButtonLabel, archiveCardTitle } = ResourceModel.statusProjectArchiveMap[
    getConditionalDefaultValue(currentProject.status === ResourceModel.Status.ARCHIVED, 1, 0)
  ](currentProject.name);

  const getRuleMap = (model: ProjectNewModel.IProject) => ({
    [ProjectNewModel.ProjectStep.GENERAL_INFORMATION]: FormRules.projectNew.GeneralInformationApprovalRules,
    [ProjectNewModel.ProjectStep.BILLING_MODEL]: FormRules.projectNew.getBillingModelApprovalRules({ billingModelType: model.billingModelType }),
    [ProjectNewModel.ProjectStep.ADDRESSES]: FormRules.projectNew.getAddressesRules({
      badgingMatchesJobSite: model.badgingSiteAddressMatchesJobSiteAddress,
      mailingMatchingType: model.mailingAddressMatchingType,
    }),
    [ProjectNewModel.ProjectStep.CERTIFICATIONS_TRAININGS]: FormRules.projectNew.CertificationApprovalRules,
    [ProjectNewModel.ProjectStep.WORKER_CONSENT_FORM]: FormRules.projectNew.ConsentFormApprovalRules,
  });

  const stepToEditMap = useMemo(
    () => ({
      [ProjectNewModel.ProjectStep.GENERAL_INFORMATION]: GeneralInformation,
      [ProjectNewModel.ProjectStep.BILLING_MODEL]: BillingModel,
      [ProjectNewModel.ProjectStep.ADDRESSES]: Addresses,
      [ProjectNewModel.ProjectStep.CERTIFICATIONS_TRAININGS]: CertificationsAndTrainings,
      [ProjectNewModel.ProjectStep.WORKER_CONSENT_FORM]: WorkerConsentForm,
    }),
    []
  );

  const formDepsMap = useMemo(
    () => ({
      [ProjectNewModel.ProjectStep.GENERAL_INFORMATION]: {
        categoryList: categoryList,
        regionList: regionList,
        fcaNaeList: fcaNaeList,
        timeZoneList: timeZoneList,
        userRole,
      },
      [ProjectNewModel.ProjectStep.BILLING_MODEL]: {
        billingTiers: billingTierList,
        isActiveProject: currentProject.status === ResourceModel.Status.ACTIVE,
      },
      [ProjectNewModel.ProjectStep.ADDRESSES]: {},
      [ProjectNewModel.ProjectStep.CERTIFICATIONS_TRAININGS]: {
        certificationList: certificationList,
        trainingList: trainingList,
      },
      [ProjectNewModel.ProjectStep.WORKER_CONSENT_FORM]: {
        consentFormFields: consentFormFields,
      },
    }),
    [categoryList, regionList, fcaNaeList, billingTierList, certificationList, trainingList, consentFormFields, timeZoneList, currentProject.status, userRole]
  );

  const isCtaDisabled = useMemo(() => currentProject.status === ResourceModel.Status.ARCHIVED, [currentProject]);

  const openModal = useCallback(() => setModal(true), [setModal]);
  const closeModal = useCallback(() => {
    setModal(false);
    clearModalMap();
  }, [setModal, clearModalMap]);

  const onSave = useCallback(
    (projectData: ProjectNewModel.IProject) => {
      updateProject(sanitizeProject(projectData));
    },
    [updateProject]
  );

  const handleEditDialogOpen = useCallback((editStep: ProjectNewModel.ProjectStep) => {
    setEditDialogStep({ isOpen: true, step: editStep });
  }, []);

  const handleEditPayment = useCallback(() => {
    setPaymentModalOpen(true);
  }, []);

  const closeFormDialog = useCallback(() => {
    setEditDialogStep(prevState => ({ isOpen: false, step: prevState.step }));
  }, []);

  const onPageChange = useCallback((newPage: number) => setQueryParams({ ...queryParams, page: newPage }), [setQueryParams, queryParams]);

  const handleArchiveStatusChange = useCallback(() => {
    if (currentProject.status === ResourceModel.Status.ACTIVE) {
      archiveProject(currentProject.id);
    } else {
      unarchiveProject(currentProject.id);
    }
    setArchiveDialogOpen(false);
  }, [archiveProject, unarchiveProject, currentProject.id, currentProject.status]);

  const handleArchiveClientDialogOpen = useCallback(() => {
    setArchiveDialogOpen(true);
  }, []);

  const handleArchiveDialogClose = useCallback(() => {
    setArchiveDialogOpen(false);
  }, []);

  const handlePaymentDialogClose = useCallback(() => {
    setPaymentModalOpen(false);
    setModalSelectedPaymentMethod(selectedPaymentMethod);
  }, [selectedPaymentMethod, setModalSelectedPaymentMethod]);

  const handleConfirmPaymentMethod = useCallback(
    /* istanbul ignore next */ () => {
      updateProjectPaymentMethod(projectId, modalSelectedPaymentMethod);
      setPaymentModalOpen(false);
    },
    [updateProjectPaymentMethod, projectId, modalSelectedPaymentMethod]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (updateProjectLoading && !updateProjectLoading.isLoading && !updateProjectLoading.hasError) {
      setEditDialogStep(prevState => ({ isOpen: false, step: prevState.step }));
    }
  }, [updateProjectLoading]);

  useEffect(() => {
    /* istanbul ignore else */
    if (isFcaUser && !categoryList.length) fetchCategoryList();
  }, [categoryList, isFcaUser, fetchCategoryList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (isFcaUser && !regionList.length) fetchRegionList();
  }, [regionList, isFcaUser, fetchRegionList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (isFcaUser && !fcaNaeList.length) fetchNaeList();
  }, [fcaNaeList, isFcaUser, fetchNaeList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (isFcaUser && !timeZoneList.length) fetchTimeZoneList();
  }, [timeZoneList, isFcaUser, fetchTimeZoneList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (isFcaUser && !billingTierList.length) fetchBillingTierList();
  }, [billingTierList, isFcaUser, fetchBillingTierList]);

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
    if (isFcaUser && !consentFormFields.length) fetchConsentFormFields();
  }, [consentFormFields, isFcaUser, fetchConsentFormFields]);

  useEffect(() => {
    /* istanbul ignore else */
    if (updatePaymentMethodLoading && !updatePaymentMethodLoading.isLoading) fetchProject(projectId);
  }, [projectId, updatePaymentMethodLoading, fetchProject]); // eslint-disable-line

  useEffect(() => {
    /* istanbul ignore else */
    if (!!projectMap[projectId]?.paymentMethod) {
      setSelectedPaymentMethod(projectMap[projectId]?.paymentMethod?.paymentMethodId);
      setModalSelectedPaymentMethod(projectMap[projectId]?.paymentMethod?.paymentMethodId);
    }
  }, [projectMap[projectId], setModalSelectedPaymentMethod, setSelectedPaymentMethod]); // eslint-disable-line

  useEffect(() => {
    /* istanbul ignore else */
    if (!projectMap[projectId]) fetchProject(projectId);
  }, [projectMap[projectId], fetchProject]); // eslint-disable-line

  useEffect(() => {
    /* istanbul ignore else */
    if (prevTab.current !== ProjectNewModel.DetailTabType.INFORMATION && currentTab === ProjectNewModel.DetailTabType.INFORMATION) {
      fetchProject(projectId);
    }
    prevTab.current = currentTab;
  }, [projectId, fetchProject, currentTab]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!projectStatistics) fetchProjectStatistics(projectId);
  }, [projectStatistics, fetchProjectStatistics, projectId]);

  useEffect(() => {
    return function unMount() {
      clearProjectMap();
      clearLoadingMap();
      clearProjectStatistics();
      clearLoading(GENERAL.LOADING_KEY.FETCH_PROJECT_DETAIL_STATISTICS);
      clearLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_PAYMENT_METHOD);
    };
  }, [clearProjectMap, clearLoadingMap, clearProjectStatistics, clearLoading]);

  return (
    <Container id="project-detail" ref={projectListRef}>
      <div className={getConditionalDefaultValue(drawer.open, listClasses.generalListContent, '')}>
        <div>
          <Typography className={classes.stepWrapper} color="primary" align="left">
            <Link to="/projects">Project List</Link> {'>'} Project Detail
          </Typography>
          <Typography className={listClasses.title} color="primary" align="left" component="h1" variant="h5">
            {currentProject.name}
            {currentProject.status === ResourceModel.Status.ARCHIVED && <Chip className={`${classes.statusChip}`} color="primary" label="Archived" />}
          </Typography>
        </div>
        <div className={listClasses.widgetsWrapper} id="summary-widgets">
          <StatusWidget
            total={getDefaultValue(projectStatistics?.companiesCount, 0)}
            status={getConditionalDefaultValue(isFcaUser, 'Clients', 'Companies')}
            content={<Link to={`/projects/detail/${projectId}/clients`}>Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getDefaultValue(projectStatistics?.activeWorkersCount, 0)}
            status="Active Workers"
            content={<Link to={`/projects/detail/${projectId}/workers`}>Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={`$ ${getDefaultValue(formatNumberWithCommas(getFormattedDecimalNumber(projectStatistics?.totalBilling)), 0)}`}
            status={getConditionalDefaultValue(isFcaUser, 'Revenue', 'Invoices')}
            content={null}
            loading={statisticsLoading?.isLoading}
          />
        </div>
        <div className={classes.filterContainer}>
          <div className={classes.statusFilter}>
            {tabList.map(optFilter => (
              <Link tabIndex={-1} key={optFilter.id} to={`/projects/detail/${projectId}/${optFilter.key}`} data-testid="filter-status-opt">
                <Button className={getConditionalDefaultValue(optFilter.key === currentTab, classes.activeFilter, '')}>{optFilter.title}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div className={tableGlobalClasses.tableWrapper}>
          {isProjectLoaded && (currentTab === ProjectNewModel.DetailTabType.CLIENTS || currentTab === ProjectNewModel.DetailTabType.COMPANIES) && (
            <AssignSubContractorTab
              queryParams={queryParams}
              currentProject={currentProject}
              isModalOpen={isModalOpen}
              ctaDisabled={isCtaDisabled}
              drawer={drawer}
              setDrawer={setDrawer}
              openModal={openModal}
              closeModal={closeModal}
              onPageChange={onPageChange}
              setQueryParams={setQueryParams}
            />
          )}
          {isProjectLoaded && currentTab === ProjectNewModel.DetailTabType.USERS && (
            <UsersTab
              queryParams={queryParams}
              isModalOpen={isModalOpen}
              projectId={projectId}
              ctaDisabled={isCtaDisabled}
              openModal={openModal}
              closeModal={closeModal}
              onPageChange={onPageChange}
              setQueryParams={setQueryParams}
            />
          )}
          {isProjectLoaded && currentTab === ProjectNewModel.DetailTabType.WORKERS && (
            <WorkersTab
              queryParams={queryParams}
              projectId={projectId}
              currentProject={currentProject}
              isModalOpen={isModalOpen}
              ctaDisabled={isCtaDisabled}
              drawer={drawer}
              setDrawer={setDrawer}
              openModal={openModal}
              closeModal={closeModal}
              onPageChange={onPageChange}
              setQueryParams={setQueryParams}
            />
          )}
          {isProjectLoaded && currentTab === ProjectNewModel.DetailTabType.VISITORS && (
            <VisitorsTab
              projectId={projectId}
              queryParams={queryParams}
              currentProject={currentProject}
              ctaDisabled={isCtaDisabled}
              drawer={drawer}
              projectListElement={projectListRef.current}
              onPageChange={onPageChange}
              setDrawer={setDrawer}
              setQueryParams={setQueryParams}
            />
          )}
          {isProjectLoaded && currentTab === ProjectNewModel.DetailTabType.ACS && (
            <AccessControlSystemTab
              queryParams={queryParams}
              currentProject={currentProject}
              projectListElement={projectListRef.current}
              onPageChange={onPageChange}
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
              drawer={drawer}
              setDrawer={setDrawer}
              ctaDisabled={isCtaDisabled}
              setQueryParams={setQueryParams}
            />
          )}
          {isProjectLoaded && currentTab === ProjectNewModel.DetailTabType.BPS && (
            <BadgePrintingSystemTab
              queryParams={queryParams}
              currentProject={currentProject}
              projectListElement={projectListRef.current}
              onPageChange={onPageChange}
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
              drawer={drawer}
              setDrawer={setDrawer}
              ctaDisabled={isCtaDisabled}
            />
          )}
          {isProjectLoaded && currentTab === ProjectNewModel.DetailTabType.INVOICES && (
            <InvoicesTab
              entity={currentProject}
              entityType={ResourceModel.Type.PROJECT}
              queryParams={queryParams}
              onPageChange={onPageChange}
              setQueryParams={setQueryParams}
              isCreateInvoiceDisabled={isCtaDisabled}
              listElement={projectListRef.current}
              drawer={drawer.open}
              setDrawer={setDrawer}
              projectColumnVisible={false}
              fetchStatistics={fetchProjectStatistics}
            />
          )}
          {isProjectLoaded && currentTab === ProjectNewModel.DetailTabType.INFORMATION && (
            <>
              <Review
                model={currentProject}
                showAssignClient={false}
                edit={true}
                editAction={handleEditDialogOpen}
                editPayment={handleEditPayment}
                selectedPaymentMethod={selectedPaymentMethod}
              />
              {isFcaUser && (
                <Card title={archiveCardTitle} styleClass={projectFormClasses.boxShadow}>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.archiveButton}
                    onClick={handleArchiveClientDialogOpen}
                    data-testid="archive-btn"
                  >
                    {archiveButtonLabel}
                  </Button>
                </Card>
              )}
              <StepEditor
                open={editDialogStep.isOpen}
                step={editDialogStep.step}
                Component={stepToEditMap[editDialogStep.step]}
                deps={formDepsMap[editDialogStep.step]}
                currentEntity={currentProject}
                initValues={ProjectNewModel.getFallbackProject()}
                initFieldRules={FormRules.projectNew.fieldRules}
                serverErrors={projectLoading && projectLoading.error}
                stepMap={ProjectNewModel.projectStepMap}
                loading={updateProjectLoading}
                onSave={onSave}
                onClose={closeFormDialog}
                getRules={getRuleMap}
                clearErrors={clearErrors}
              />
            </>
          )}
        </div>
      </div>
      <Modal
        show={archiveDialogOpen}
        styleClass={`${modalClasses.dialogContainer} ${classes.archiveDialog} ${getConditionalDefaultValue(archiveDialogOpen, 'open', 'closed')}`}
        onClose={handleArchiveDialogClose}
        render={() => (
          <Confirm
            title={archiveTitle}
            content={archiveText}
            confirmLabel={getConditionalDefaultValue(currentProject.status === ResourceModel.Status.ACTIVE, 'Yes, Archive', 'Yes, Unarchive')}
            closeLabel="Close"
            onClose={handleArchiveDialogClose}
            onConfirm={handleArchiveStatusChange}
          />
        )}
      />
      {paymentModalOpen && (
        <FormModal
          open={paymentModalOpen}
          hasChanges={true}
          isLoading={updatePaymentMethodLoading?.isLoading}
          handleSubmit={handleConfirmPaymentMethod}
          handleClose={handlePaymentDialogClose}
          handleDiscard={noop}
          styleClass={classes.paymentModalWrapper}
          showHasChanges={false}
          isButtonDisabled={!modalSelectedPaymentMethod}
          renderHeader={() => (
            <DialogTitle disableTypography={true} data-testid="badge-title">
              <Typography className={modalGlobalClasses.title} color="secondary" align="left" component="h1" variant="h6">
                Edit Credit Card
              </Typography>
            </DialogTitle>
          )}
          renderContent={() => (
            <DialogContent dividers={true} className={`${tableGlobalClasses.tableWrapper} ${tableGlobalClasses.tableBackground} ${classes.modalWrapper}`}>
              <PaymentMethods
                compact={true}
                isProjectDetail={true}
                selectedPaymentMethod={modalSelectedPaymentMethod}
                setSelectedPaymentMethod={setModalSelectedPaymentMethod}
              />
            </DialogContent>
          )}
          confirmLabel="Save Changes"
        />
      )}
    </Container>
  );
};

export default memo(ProjectDetail);
