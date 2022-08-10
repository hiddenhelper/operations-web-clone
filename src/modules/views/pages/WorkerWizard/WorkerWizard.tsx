import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Modal from '../../shared/Modal';
import Wizard from '../../shared/Wizard';
import Confirm from '../../shared/Modal/components/Confirm';
import WizardHeader from '../../shared/ResourceManagement/WizardHeader';
import DuplicatedWorkerModalContent from './components/DuplicatedWorkerModalContent';
import WorkerForm from './components/WorkerForm';

import { getConditionalDefaultValue, getDefaultValue } from '../../../../utils/generalUtils';
import { ClientModel, GeneralModel, WorkerModel } from '../../../models';
import { sanitizeWorker } from '../../../../utils/workerUtils';
import { useNavigator } from '../../../../utils/useNavigator';
import { ROUTES, LANG, FormRules } from '../../../../constants';
import { useStyles } from './styles';
import { WorkerStatus } from 'modules/models/worker';

export interface IWorkerWizardProps {
  company: ClientModel.IClient;
  workersMap: GeneralModel.IEntityMap<WorkerModel.IWorker>;
  loading: GeneralModel.ILoadingStatus;
  searchLoading: GeneralModel.ILoadingStatus;
  saveLoading: GeneralModel.ILoadingStatus;
  ethnicityList: WorkerModel.IEthnicity[];
  languageList: WorkerModel.ILanguage[];
  skilledTradeList: WorkerModel.ISkilledTrade[];
  uiRelationMap: GeneralModel.IRelationUiMap;
  identificationTypeList: WorkerModel.IIdentificationType[];
  saveWorker: (model: WorkerModel.IWorker) => void;
  updateWorker: (model: WorkerModel.IWorker) => void;
  fetchWorker: (id: string) => void;
  fetchCompany: () => void;
  fetchEthnicityList: () => void;
  fetchLanguageList: () => void;
  fetchSkilledTradeList: () => void;
  fetchIdentificationTypeList: () => void;
  clearErrors: () => void;
  clearWorkersMap: () => void;
  searchCompanies: (params: GeneralModel.IQueryParams, tempId) => void;
  navigate: (path: string) => void;
  countryList?: GeneralModel.INamedEntity[];
  fetchGeographicLocationsList: () => void;
  geographicLocationsList: WorkerModel.IGeographicLocation[];
  isFcaUser: boolean;
  isAdmin: boolean;
}

export interface IModalState {
  isOpen: boolean;
  isAllowed: WorkerModel.IsAllowed;
}

const WorkerWizard = ({
  company,
  workersMap,
  loading,
  ethnicityList,
  languageList,
  skilledTradeList,
  identificationTypeList,
  uiRelationMap,
  saveLoading,
  searchLoading,
  saveWorker,
  fetchCompany,
  updateWorker,
  fetchEthnicityList,
  fetchLanguageList,
  fetchSkilledTradeList,
  fetchIdentificationTypeList,
  clearErrors,
  fetchWorker,
  clearWorkersMap,
  searchCompanies,
  navigate,
  countryList,
  fetchGeographicLocationsList,
  geographicLocationsList,
  isFcaUser,
  isAdmin,
}: IWorkerWizardProps) => {
  const classes = useStyles();

  const { id, step, entityId, currentEntity } = useNavigator<WorkerModel.IWorker>({
    entityMap: workersMap,
    fallback: WorkerModel.getFallbackWorker,
  });

  const [existingWorkerModal, setExistingWorkerModal] = useState<IModalState>({
    isOpen: false,
    isAllowed: WorkerModel.IsAllowed.NOT_ALLOWED,
  });
  const saveLoadingError = useMemo(() => saveLoading && saveLoading.error && saveLoading.error.errors, [saveLoading]);
  const loadedSuccessful: boolean = useMemo(() => loading && !loading.isLoading && !loading.hasError, [loading]);
  const duplicatedWorker = useMemo(() => saveLoading && saveLoading.error?.errorCode === LANG.EN.ERROR_CODES.WORKER_ALREADY_EXISTS, [saveLoading]);
  const onLoadDeps = useMemo(() => ({ currentEntity }), [currentEntity]);
  const createWorkerLabel = entity => (entity ? null : 'Create Worker');
  const headerButtonSaveLabel = currentEntity.invitationStatus === WorkerStatus.MIGRATED ? 'Confirm and Invite' : createWorkerLabel(entityId);
  const isValidForNavigation = useMemo(() => !loading || (loading && !loading.isLoading), [loading]);
  const fullName = useMemo(() => (currentEntity.firstName && currentEntity.lastName ? `${currentEntity.firstName} ${currentEntity.lastName}` : null), [
    currentEntity.firstName,
    currentEntity.lastName,
  ]);
  const duplicatedWorkerInformation = useMemo(() => saveLoading?.error, [saveLoading]);

  const onCloseWorkerExistingModal = useCallback(() => setExistingWorkerModal(prev => ({ ...prev, isOpen: false })), [setExistingWorkerModal]);

  const onLoadHandler = useCallback(
    /* istanbul ignore next */ onChange => {
      if (currentEntity) onChange(currentEntity);
    },
    [currentEntity]
  );

  const onSaveHandler = useCallback(
    (workerData: WorkerModel.IWorker) => {
      if (!entityId) saveWorker(sanitizeWorker(workerData));
      if (entityId) updateWorker(sanitizeWorker(workerData));
    },
    [entityId, saveWorker, updateWorker]
  );

  const redirectToProfile = useCallback(() => {
    navigate(`/workers/detail/${saveLoading?.error?.worker?.id}`);
  }, [saveLoading, navigate]);

  const handleContactFCAAdmin = useCallback(
    /* istanbul ignore next */ () => {
      onCloseWorkerExistingModal();
    },
    [onCloseWorkerExistingModal]
  );

  const getDuplicatedWorkerModalPropsMap = useCallback(
    (model, key) => {
      const duplicatedMap = {
        [WorkerModel.IsAllowed.ALLOWED]: {
          content: (
            <DuplicatedWorkerModalContent
              matchedFields={getDefaultValue(duplicatedWorkerInformation?.matchedFields, [])}
              existingWorker={getDefaultValue(duplicatedWorkerInformation?.worker, {})}
              currentWorker={model}
              isFcaUser={isFcaUser}
            />
          ),
          onConfirm: redirectToProfile,
        },
        [WorkerModel.IsAllowed.NOT_ALLOWED]: {
          content: 'This information matches with an existing worker. Please contact FCA Admin to resolve this conflict.',
          onConfirm: handleContactFCAAdmin,
        },
      };
      return duplicatedMap[key];
    },
    [isFcaUser, duplicatedWorkerInformation, redirectToProfile, handleContactFCAAdmin]
  );

  const onLoadSuccessHandler = useCallback(
    ({ updateRules }) => {
      updateRules(prev => ({ ...FormRules.worker.workerFieldRulesMap(isFcaUser, isAdmin), ...prev }));
    },
    [isFcaUser, isAdmin]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (!ethnicityList.length) fetchEthnicityList();
  }, [ethnicityList, fetchEthnicityList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!languageList.length) fetchLanguageList();
  }, [languageList, fetchLanguageList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!skilledTradeList.length) fetchSkilledTradeList();
  }, [skilledTradeList, fetchSkilledTradeList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!identificationTypeList.length) fetchIdentificationTypeList();
  }, [identificationTypeList, fetchIdentificationTypeList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!geographicLocationsList.length) fetchGeographicLocationsList();
  }, [geographicLocationsList, fetchGeographicLocationsList]);

  useEffect(() => {
    if (entityId && !workersMap[entityId]) fetchWorker(entityId);
  }, [entityId, fetchWorker, workersMap]);

  useEffect(() => {
    return function unMount() {
      clearErrors();
      clearWorkersMap();
    };
  }, [clearErrors, clearWorkersMap]);

  useEffect(() => {
    if (duplicatedWorker) {
      const isInformationAllowed =
        !isFcaUser && !duplicatedWorkerInformation?.isWorkerInformationAvailable ? WorkerModel.IsAllowed.NOT_ALLOWED : WorkerModel.IsAllowed.ALLOWED;
      setExistingWorkerModal(prev => ({ ...prev, isOpen: true, isAllowed: isInformationAllowed }));
    }
  }, [saveLoading, isFcaUser, duplicatedWorkerInformation, setExistingWorkerModal, duplicatedWorker]);
  return (
    <Wizard
      isStepper={false}
      formRuleMap={FormRules.worker.workerFieldRulesMap(isFcaUser, isAdmin)}
      navigationProps={{ id, step, entityId, currentEntity }}
      fallback={WorkerModel.getFallbackWorker()}
      isLoadSuccess={loadedSuccessful}
      isValidForNavigation={isValidForNavigation}
      allowNavigation={!duplicatedWorker}
      loading={loading}
      deps={onLoadDeps}
      onLoadSuccess={onLoadSuccessHandler}
      onLoad={onLoadHandler}
      onSave={onSaveHandler}
      clearErrors={clearErrors}
      renderNavigator={({ toggleClass, hasChanged, onDiscard, onSave }) => (
        <WizardHeader
          isFixed={toggleClass}
          fullWidth={true}
          title="Worker Information"
          subtitle="Create New Worker"
          breadCrumb={{ route: ROUTES.WORKER_LIST.path, title: 'Workers', pluralTitle: 'Workers' }}
          entityName={fullName}
          hasChanges={hasChanged}
          customLabel={headerButtonSaveLabel}
          isNotMigratedStatus={currentEntity.invitationStatus !== WorkerStatus.MIGRATED}
          customLoadingLabel={entityId ? null : 'Creating...'}
          onDiscard={onDiscard}
          onSave={onSave}
          isSaveLoading={saveLoading?.isLoading}
          loadSuccess={loadedSuccessful}
          stepped={false}
        />
      )}
      renderForm={({ model, formRules, errors, onChange, updateRules }) => (
        <>
          <WorkerForm
            isFcaUser={isFcaUser}
            model={model}
            company={company}
            formRules={formRules}
            errors={{ ...saveLoadingError, ...errors }}
            ethnicityList={ethnicityList}
            languageList={languageList}
            skilledTradeList={skilledTradeList}
            identificationTypeList={identificationTypeList}
            uiRelationMap={uiRelationMap}
            searchLoading={searchLoading}
            fetchCompany={fetchCompany}
            onChange={onChange}
            searchCompanies={searchCompanies}
            updateRules={updateRules}
            isEdit={!!entityId}
            countryList={countryList}
            geographicLocationsList={geographicLocationsList}
          />
          <Modal
            show={existingWorkerModal.isOpen}
            onClose={onCloseWorkerExistingModal}
            render={() => (
              <div
                className={getConditionalDefaultValue(
                  existingWorkerModal.isAllowed === WorkerModel.IsAllowed.NOT_ALLOWED,
                  classes.existingWorkerModal,
                  classes.workerModal
                )}
              >
                <Confirm
                  {...WorkerModel.confirmModalPropsMap[existingWorkerModal.isAllowed]({
                    onClose: onCloseWorkerExistingModal,
                    ...getDuplicatedWorkerModalPropsMap(model, existingWorkerModal.isAllowed),
                  })}
                />
              </div>
            )}
          />
        </>
      )}
    />
  );
};

export default memo(WorkerWizard);
