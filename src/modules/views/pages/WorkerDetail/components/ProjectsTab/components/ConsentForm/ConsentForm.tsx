import React, { memo, useEffect, useMemo, useState, useCallback } from 'react';
import moment from 'moment';

import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

import Modal from '../../../../../../shared/Modal';
import Card from '../../../../../../shared/ResourceManagement/Card';
import Logo from '../../../../../../shared/Logo/Logo';
import StepEditor from '../../../../../../shared/ResourceManagement/StepEditor';
import ConsentFormCell from './components/ConsentFormCell';
import ProjectInformationForm from './components/ProjectInformationForm';

import { GeneralModel, ConsentFormModel, WorkerModel, UserModel } from '../../../../../../../models';
import { CloseIcon, DownloadIcon } from '../../../../../../../../constants';
import {
  getConditionalDefaultValue,
  getDefaultValue,
  getListWithCommas,
  formatPhoneNumber,
  getFormattedDate,
  sanitizePhoneNumber,
  sanitizeNumber,
  formatNumberWithCommas,
  getDashIfNull,
} from '../../../../../../../../utils/generalUtils';
import { ruleMap } from '../../../../../../../../utils/useValidator';

import { isValidNumber } from 'libphonenumber-js';
import { useStyles as buttonStyles } from '../../../../../../shared/FormHandler/ControlledButton/styles';
import { fullScreenModalGlobalStyles } from '../../../../../../../../assets/styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IConsentFormProps {
  workerId: string;
  projectId: string;
  projectName: string;
  consentForm: ConsentFormModel.IConsentForm;
  loading: GeneralModel.ILoadingStatus;
  saveLoading: GeneralModel.ILoadingStatus;
  isEditable: boolean;
  fetchConsentForm: (workerId: string, projectId: string, isEditable: boolean) => void;
  saveConsentForm: (workerId: string, projectId: string, data: ConsentFormModel.IProjectInformationForm) => void;
  onClose: () => void;
  clearErrors: () => void;
  downloadConsentForm: (id: string, projectId: string, name: string) => void;
  countryList: GeneralModel.INamedEntity[];
  fetchJobTitles: () => void;
  jobTitlesList: WorkerModel.IJobTitle[];
  fetchSocJobTitles: () => void;
  socJobTitlesList: WorkerModel.ISocJobTitle[];
  fetchTradeStatuses: () => void;
  tradeStatusesList: WorkerModel.ITradeStatus[];
  fetchLanguageTurnerProtocols: () => void;
  languageTurnerProtocolsList: WorkerModel.ILanguageTurnerProtocol[];
  fetchSkilledTrades: () => void;
  skilledTradeList: WorkerModel.ISkilledTrade[];
}

const ConsentForm = ({
  consentForm,
  workerId,
  projectId,
  projectName,
  loading,
  saveLoading,
  isEditable,
  fetchConsentForm,
  saveConsentForm,
  clearErrors,
  onClose,
  downloadConsentForm,
  countryList,
  fetchJobTitles,
  jobTitlesList,
  fetchSocJobTitles,
  socJobTitlesList,
  fetchTradeStatuses,
  tradeStatusesList,
  fetchLanguageTurnerProtocols,
  languageTurnerProtocolsList,
  fetchSkilledTrades,
  skilledTradeList,
}: IConsentFormProps) => {
  const modalClasses = fullScreenModalGlobalStyles();
  const buttonClasses = buttonStyles();
  const currentConsentForm = useMemo(() => (consentForm ? { ...consentForm, id: consentForm?.projectId } : ConsentFormModel.getFallbackConsentForm()), [
    consentForm,
  ]);
  const [isEditorOpen, setEditor] = useState<boolean>(false);

  const projectInformationData: { [key: string]: ConsentFormModel.IWorkerConsentFormField } = useMemo(
    () => currentConsentForm?.consentFormFields?.reduce((acc, field) => ({ ...acc, [field.code]: field }), {}),
    [currentConsentForm]
  );

  const showProjectInformationEdit = useMemo(() => !!(projectInformationData && Object.keys(projectInformationData)?.length > 0), [projectInformationData]);

  const openEditor = useCallback(() => setEditor(true), [setEditor]);
  const closeEditor = useCallback(() => setEditor(false), [setEditor]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!jobTitlesList.length) fetchJobTitles();
  }, [jobTitlesList, fetchJobTitles]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!socJobTitlesList.length) fetchSocJobTitles();
  }, [socJobTitlesList, fetchSocJobTitles]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!tradeStatusesList.length) fetchTradeStatuses();
  }, [tradeStatusesList, fetchTradeStatuses]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!languageTurnerProtocolsList.length) fetchLanguageTurnerProtocols();
  }, [languageTurnerProtocolsList, fetchLanguageTurnerProtocols]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!skilledTradeList.length) fetchSkilledTrades();
  }, [skilledTradeList, fetchSkilledTrades]);

  const onConfirm = useCallback(
    (data: ConsentFormModel.IProjectInformationForm) => {
      saveConsentForm(workerId, projectId, {
        ...data,
        supervisorPhone: getConditionalDefaultValue(data.supervisorPhone, sanitizePhoneNumber(data.supervisorPhone), null),
        hourlyRatePay: getConditionalDefaultValue(data.hourlyRatePay, sanitizeNumber(data.hourlyRatePay), null),
        yearsOfExperience: getDefaultValue(data.yearsOfExperience, 0),
        paymentType: getDefaultValue(data.paymentType, 0),
      });
    },
    [workerId, projectId, saveConsentForm]
  );

  const getRuleMap = useCallback(
    () => ({
      'project-information': {
        supervisorName: {
          required: !!projectInformationData?.SUPERVISOR_NAME?.isMandatory,
          rules: [],
        },
        hardHatNumber: {
          required: !!projectInformationData?.HARD_HAT_NUMBER?.isMandatory,
          rules: [],
        },
        supervisorPhone: {
          required: !!projectInformationData?.SUPERVISOR_PHONE?.isMandatory,
          rules: [({ value }) => value && !isValidNumber(value) && 'Please enter a valid Supervisor Phone Number.'],
        },
        section3Employee: {
          required: !!projectInformationData?.SECTION_3_EMPLOYEE?.isMandatory,
          rules: [],
        },
        referredById: {
          required: !!projectInformationData?.REFERRED_BY?.isMandatory,
          rules: [],
        },
        dateOfHire: {
          required: !!projectInformationData?.DATE_OF_HIRE?.isMandatory,
          rules: [ruleMap.isInvalidDate],
        },
        eligibleToWorkInUs: {
          required: !!projectInformationData?.ELIGIBLE_TO_WORK_IN_US?.isMandatory,
          rules: [],
        },
        lgbtq: {
          required: !!projectInformationData?.LGBTQ?.isMandatory,
          rules: [],
        },
        socJobTitleId: {
          required: !!projectInformationData?.SOC_JOB_TITLE?.isMandatory,
          rules: [],
        },
        tradeStatusId: {
          required: !!projectInformationData?.TRADE_STATUS?.isMandatory,
          rules: [],
        },
        jobTitleId: {
          required: !!projectInformationData?.JOB_TITLE?.isMandatory,
          rules: [],
        },
        languageTurnerProtocolId: {
          required: !!projectInformationData?.LANGUAGE_TURNER_PROTOCOL?.isMandatory,
          rules: [],
        },
        projectSkilledTradeId: {
          required: !!projectInformationData?.PROJECT_SKILLED_TRADE?.isMandatory,
          rules: [],
        },
        otherProjectSkilledTrade: { required: false, rules: [] },
        hourlyRatePay: {
          required: !!projectInformationData?.HOURLY_RATE_PAY?.isMandatory,
          rules: [],
        },
        stepStatus: {
          required: !!projectInformationData?.STEP_STATUS?.isMandatory,
          rules: [],
        },
        section3Resident: {
          required: !!projectInformationData?.SECTION_3_RESIDENT?.isMandatory,
          rules: [],
        },
        paymentType: {
          required: !!projectInformationData?.PAYMENT_TYPE?.isMandatory,
          rules: [],
        },
        yearsOfExperience: {
          required: !!projectInformationData?.YEARS_OF_EXPERIENCE?.isMandatory,
          rules: [],
        },
      },
    }),
    [projectInformationData]
  );

  const onDownloadConsentForm = useCallback(() => {
    const consentFormDate = getFormattedDate(currentConsentForm?.createdAt, GeneralModel.DateFormat.DASHED_NUMERIC);
    downloadConsentForm(workerId, projectId, `Consent Form ${consentFormDate} ${projectName}-${currentConsentForm.firstName} ${currentConsentForm.lastName}`);
  }, [downloadConsentForm, currentConsentForm, projectName, workerId, projectId]);

  useEffect(() => {
    if (saveLoading && !saveLoading.isLoading && !saveLoading.hasError) {
      closeEditor();
    }
  }, [saveLoading, closeEditor]);

  useEffect(() => {
    fetchConsentForm(workerId, projectId, isEditable);
  }, [isEditable, workerId, projectId, fetchConsentForm]);

  return (
    <>
      <Modal
        onClose={onClose}
        show={true}
        fullScreen={true}
        render={() => (
          <>
            {loading && loading.isLoading ? (
              <div className={modalClasses.loadingSkeleton}>Loading...</div>
            ) : (
              <>
                <div className={modalClasses.headerWrapper}>
                  <div className={modalClasses.headerData}>
                    <Logo styleClass={modalClasses.logoWrapper} />
                  </div>
                  <div className={modalClasses.headerMainContent}>
                    <div className={modalClasses.titleWrapper}>
                      <Typography className={modalClasses.title} data-testid="confirm-modal-title" id="confirm-dialog-title">
                        {consentForm?.company?.name}
                      </Typography>
                      <Typography className={modalClasses.title} data-testid="confirm-modal-title" id="confirm-dialog-title">
                        {projectName}
                      </Typography>
                      <Typography className={modalClasses.subTitle}>{currentConsentForm.consentFormName}</Typography>
                    </div>
                    {!isEditable && (
                      <div className={modalClasses.actionButtons}>
                        <IconButton disableRipple={true} onClick={onDownloadConsentForm} data-testid="download-consent-form">
                          <DownloadIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  <div className={modalClasses.buttonsWrapper}>
                    <Button disableRipple={true} className={modalClasses.closeButton} data-testid="close-consent-form" onClick={onClose}>
                      <CloseIcon />
                    </Button>
                  </div>
                </div>
                <DialogContent className={`${modalClasses.cardDividerMargin} ${modalClasses.dialogContentWrapper}`}>
                  {!isEditable && (
                    <>
                      <Card title="Personal Information">
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'First Name'} data={currentConsentForm.firstName} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Middle Name'} data={currentConsentForm.middleName} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Last Name'} data={currentConsentForm.lastName} />
                          </Grid>
                        </Grid>
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Date of Birth'} data={moment(currentConsentForm.dateOfBirth).format('DD MMM YYYY')} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Gender'} data={GeneralModel.genderMap[currentConsentForm.gender]} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Ethnicity'} data={currentConsentForm.ethnicity?.name} />
                          </Grid>
                        </Grid>
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Primary Language'} data={currentConsentForm.primaryLanguage?.name} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Veteran'} data={getConditionalDefaultValue(currentConsentForm.isVeteran, 'Yes', 'No')} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Allergies (Optional)'} data={currentConsentForm.allergies} />
                          </Grid>
                        </Grid>
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Last 4 SSN (Optional)'} data={currentConsentForm.socialSecurityNumber} />
                          </Grid>
                        </Grid>
                      </Card>
                      <Card title="Contact Information">
                        <Grid container={true}>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell title={'Email'} data={currentConsentForm.email} />
                          </Grid>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell title={'Mobile Phone'} data={formatPhoneNumber(currentConsentForm.mobilePhoneNumber)} />
                          </Grid>
                        </Grid>
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Alternate Phone'} data={formatPhoneNumber(currentConsentForm.phoneNumber)} />
                          </Grid>
                        </Grid>
                      </Card>
                      <Card title="Home Address">
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Address Line 1'} data={currentConsentForm.address?.line1} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Address Line 2 (Optional)'} data={currentConsentForm.address?.line2} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Country'} data={currentConsentForm.address?.country?.name} />
                          </Grid>
                        </Grid>
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'State'} data={currentConsentForm.address?.stateName} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'County'} data={currentConsentForm.address?.county} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'City'} data={currentConsentForm.address?.city} />
                          </Grid>
                        </Grid>
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Zip Code'} data={currentConsentForm.address?.zipCode} />
                          </Grid>
                        </Grid>
                      </Card>
                      <Card title="Emergency Contact">
                        <Grid container={true}>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Emergency Contact Name'} data={currentConsentForm.emergencyContactName} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Emergency Contact Phone'} data={formatPhoneNumber(currentConsentForm.emergencyContactPhone)} />
                          </Grid>
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={'Relationship'} data={currentConsentForm.emergencyContactRelationship} />
                          </Grid>
                        </Grid>
                      </Card>
                      <Card title="Government Issued ID">
                        <Grid container={true}>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell title={'ID Type'} data={currentConsentForm.identificationType?.name} />
                          </Grid>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell title={'ID Number'} data={currentConsentForm.identificationNumber} />
                          </Grid>
                        </Grid>
                        <Grid container={true}>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell title={'Issued By'} data={currentConsentForm.identificationGeographicLocation?.name} />
                          </Grid>
                        </Grid>
                      </Card>
                      <Card title="Worker Trades">
                        <Grid container={true}>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell
                              title={'Role'}
                              data={getConditionalDefaultValue(currentConsentForm.isSupervisor, 'Supervisor', 'Non Supervisor')}
                            />
                          </Grid>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell
                              title={'Work Experience'}
                              data={getConditionalDefaultValue(currentConsentForm.isSkilled, 'Skilled', 'Non Skilled')}
                            />
                          </Grid>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell
                              title={'Labor Union'}
                              data={getConditionalDefaultValue(currentConsentForm.isAffiliatedToLaborUnion, 'Yes', 'No')}
                            />
                          </Grid>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell title={'Labor Union Number'} data={currentConsentForm.laborUnionNumber} />
                          </Grid>
                          <Grid item={true} xl={6} lg={6}>
                            <ConsentFormCell title={'Trades'} data={currentConsentForm.trades && getListWithCommas(currentConsentForm.trades)} />
                          </Grid>
                        </Grid>
                      </Card>
                    </>
                  )}
                  {(showProjectInformationEdit || isEditable) && (
                    <Card
                      title="Project Information"
                      secondaryAction={
                        isEditable && (
                          <PermissionGuard permissionsExpression={UserModel.WorkersPermission.MANAGE}>
                            <IconButton
                              className={buttonClasses.editButton}
                              disableRipple={true}
                              onClick={openEditor}
                              data-testid="project-information-edit-btn"
                            >
                              <CreateIcon />
                            </IconButton>
                          </PermissionGuard>
                        )
                      }
                    >
                      <Grid container={true}>
                        {projectInformationData.PROJECT_SKILLED_TRADE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={projectInformationData.PROJECT_SKILLED_TRADE.name} data={currentConsentForm.projectSkilledTrade?.name} />
                          </Grid>
                        )}
                        {currentConsentForm.otherProjectSkilledTrade && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title="Other Project Trade" data={currentConsentForm.otherProjectSkilledTrade} />
                          </Grid>
                        )}
                        {projectInformationData.HARD_HAT_NUMBER && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={projectInformationData.HARD_HAT_NUMBER.name} data={currentConsentForm.hardHatNumber} />
                          </Grid>
                        )}
                        {projectInformationData.JOB_TITLE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={projectInformationData.JOB_TITLE.name} data={currentConsentForm.jobTitle?.name} />
                          </Grid>
                        )}
                        {projectInformationData.TRADE_STATUS && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={projectInformationData.TRADE_STATUS.name} data={currentConsentForm.tradeStatus?.name} />
                          </Grid>
                        )}
                        {projectInformationData.LAST_4_SSN && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={projectInformationData.LAST_4_SSN.name} data={currentConsentForm.socialSecurityNumber} />
                          </Grid>
                        )}
                        {projectInformationData.SUPERVISOR_NAME && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={projectInformationData.SUPERVISOR_NAME.name} data={currentConsentForm.supervisorName} />
                          </Grid>
                        )}
                        {projectInformationData.SUPERVISOR_PHONE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.SUPERVISOR_PHONE.name}
                              data={formatPhoneNumber(currentConsentForm.supervisorPhone)}
                            />
                          </Grid>
                        )}
                        {projectInformationData.SECTION_3_EMPLOYEE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.SECTION_3_EMPLOYEE.name}
                              data={getDashIfNull(
                                currentConsentForm.section3Employee,
                                getConditionalDefaultValue(currentConsentForm.section3Employee, 'Yes', 'No')
                              )}
                            />
                          </Grid>
                        )}
                        {projectInformationData.SECTION_3_RESIDENT && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.SECTION_3_RESIDENT.name}
                              data={getDashIfNull(
                                currentConsentForm.section3Resident,
                                getConditionalDefaultValue(currentConsentForm.section3Resident, 'Yes', 'No')
                              )}
                            />
                          </Grid>
                        )}
                        {projectInformationData.STEP_STATUS && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.STEP_STATUS.name}
                              data={getDashIfNull(currentConsentForm.stepStatus, getConditionalDefaultValue(currentConsentForm.stepStatus, 'Yes', 'No'))}
                            />
                          </Grid>
                        )}
                        {projectInformationData.DATE_OF_HIRE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.DATE_OF_HIRE.name}
                              data={getDashIfNull(currentConsentForm?.dateOfHire, moment(currentConsentForm?.dateOfHire).format('MMM DD, YYYY'))}
                            />
                          </Grid>
                        )}
                        {projectInformationData.ELIGIBLE_TO_WORK_IN_US && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.ELIGIBLE_TO_WORK_IN_US.name}
                              data={getDashIfNull(
                                currentConsentForm.eligibleToWorkInUs,
                                getConditionalDefaultValue(currentConsentForm.eligibleToWorkInUs, 'Yes', 'No')
                              )}
                            />
                          </Grid>
                        )}
                        {projectInformationData.SOC_JOB_TITLE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell title={projectInformationData.SOC_JOB_TITLE.name} data={currentConsentForm.socJobTitle?.name} />
                          </Grid>
                        )}
                        {projectInformationData.YEARS_OF_EXPERIENCE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.YEARS_OF_EXPERIENCE.name}
                              data={ConsentFormModel.yearsOfExperienceMap[currentConsentForm.yearsOfExperience]}
                            />
                          </Grid>
                        )}
                        {projectInformationData.PAYMENT_TYPE && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.PAYMENT_TYPE.name}
                              data={WorkerModel.paymentTypeMap[currentConsentForm.paymentType]}
                            />
                          </Grid>
                        )}
                        {projectInformationData.HOURLY_RATE_PAY && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.HOURLY_RATE_PAY.name}
                              data={getConditionalDefaultValue(
                                currentConsentForm.hourlyRatePay,
                                `$ ${formatNumberWithCommas(currentConsentForm.hourlyRatePay)}`
                              )}
                            />
                          </Grid>
                        )}
                        {projectInformationData.LANGUAGE_TURNER_PROTOCOL && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.LANGUAGE_TURNER_PROTOCOL.name}
                              data={currentConsentForm.languageTurnerProtocol?.name}
                            />
                          </Grid>
                        )}
                        {projectInformationData.LGBTQ && (
                          <Grid item={true} xl={4} lg={4}>
                            <ConsentFormCell
                              title={projectInformationData.LGBTQ.name}
                              data={getDashIfNull(currentConsentForm.lgbtq, getConditionalDefaultValue(currentConsentForm.lgbtq, 'Yes', 'No'))}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Card>
                  )}
                  {!isEditable && (
                    <>
                      <Card title="Legal">
                        <div className={`${modalClasses.legalWrapper}`}>
                          <div className={modalClasses.legalMargin}>
                            <Typography className={`${modalClasses.legalParagraph}`} style={{ whiteSpace: 'pre-line' }}>
                              {currentConsentForm.legalInformation}
                            </Typography>
                          </div>
                        </div>
                      </Card>
                      <Card title="Signature">
                        <div>
                          {currentConsentForm.signatureUrl && (
                            <img className={modalClasses.signatureImage} src={currentConsentForm.signatureUrl} alt={'Signature'} />
                          )}
                          <div className={modalClasses.signatureWrapper}>
                            <Typography className={modalClasses.workerName}>
                              {currentConsentForm.firstName} {currentConsentForm.lastName}
                            </Typography>
                            <Typography className={modalClasses.signatureDate}>
                              {currentConsentForm?.createdAt ? moment(currentConsentForm?.createdAt).format('MMM DD, YYYY - hh:mm a') : '-'}
                            </Typography>
                          </div>
                        </div>
                      </Card>
                    </>
                  )}
                </DialogContent>
              </>
            )}
          </>
        )}
      />
      <StepEditor
        jobTitlesList={jobTitlesList}
        socJobTitlesList={socJobTitlesList}
        tradeStatusesList={tradeStatusesList}
        languageTurnerProtocolsList={languageTurnerProtocolsList}
        skilledTradeList={skilledTradeList}
        countryList={countryList}
        open={isEditorOpen}
        onClose={closeEditor}
        step={'project-information'}
        Component={ProjectInformationForm}
        onSave={onConfirm}
        getRules={getRuleMap}
        deps={{ projectInformationData }}
        loading={saveLoading}
        currentEntity={currentConsentForm}
        initValues={ConsentFormModel.getFallbackProjectInformationForm()}
        initFieldRules={{}}
        clearErrors={clearErrors}
        serverErrors={saveLoading?.error}
        styleClass={modalClasses.workerConsentFormEditModal}
        stepMap={{ 'project-information': { title: 'Project Information' } } as any}
      />
    </>
  );
};

export default memo(ConsentForm);
