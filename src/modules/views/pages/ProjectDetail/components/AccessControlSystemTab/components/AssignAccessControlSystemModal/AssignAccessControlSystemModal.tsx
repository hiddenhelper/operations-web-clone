import React, { memo, useEffect, useCallback, useMemo, useState } from 'react';

import { DialogContent, DialogTitle, Typography } from '@material-ui/core';

import FormModal from 'modules/views/shared/Modal/components/FormModal';
import AssignStep from './components/AssignStep';
import DeviceStep from './components/DeviceStep';

import { GeneralModel, AccessControlSystemModel, AddressModel } from 'modules/models';
import { FormRules, GENERAL } from 'constants/index';
import { getConditionalDefaultValue } from 'utils/generalUtils';
import { sanitizeAssignAcs } from 'utils/accessControlSystemUtils';
import { useForm } from 'utils/useForm';
import { tableGlobalStyles } from 'assets/styles/Tables/styles';
import { modalGlobalStyles } from 'assets/styles/Modals/styles';

export interface IAssignAccessControlSystemModalProps {
  count: number;
  acsId: string;
  projectId: string;
  projectLocations: AddressModel.ILocation[];
  isEditable: boolean;
  projectAccessControlSystem: AccessControlSystemModel.IProjectAccessControlSystem;
  accessControlSystemMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  modalMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  loading: GeneralModel.ILoadingStatus;
  assignLoading: GeneralModel.ILoadingStatus;
  accessControlSystemAssignProjectLoading: GeneralModel.ILoadingStatus;
  unassignAccessControlSystemAssignProjectLoading: GeneralModel.ILoadingStatus;
  updateProjectAccessControlSystemLoading: GeneralModel.ILoadingStatus;
  fetchProjectAccessControlSystem: (projectId: string, acsId: string) => void;
  fetchAccessControlSystemList: (query: GeneralModel.IQueryParams) => void;
  assignAccessControlSystem: (projectId: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) => void;
  updateAccessControlSystem: (projectId: string, acsId: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) => void;
  fetchAccessControlSystemSummary: (acsId: string) => void;
  closeModal: () => void;
  clearLoading: (key: string) => void;
}

const AssignAccessControlSystemModal = ({
  acsId,
  count,
  loading,
  projectId,
  projectLocations,
  isEditable,
  assignLoading,
  accessControlSystemMap,
  modalMap,
  projectAccessControlSystem,
  accessControlSystemAssignProjectLoading,
  unassignAccessControlSystemAssignProjectLoading,
  updateProjectAccessControlSystemLoading,
  fetchProjectAccessControlSystem,
  fetchAccessControlSystemList,
  assignAccessControlSystem,
  updateAccessControlSystem,
  fetchAccessControlSystemSummary,
  closeModal,
  clearLoading,
}: IAssignAccessControlSystemModalProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const modalGlobalClasses = modalGlobalStyles();

  const [assignStep, setStep] = useState(getConditionalDefaultValue(isEditable, 1, 0));
  const [selectedAcs, selectAcs] = useState<string>(null);

  const isAssignStep = useMemo(() => assignStep === 0, [assignStep]);
  const isDeviceStep = useMemo(() => assignStep === 1, [assignStep]);

  const isButtonDisabled = useMemo(() => isAssignStep && !selectedAcs, [isAssignStep, selectedAcs]);

  const deviceId = useMemo(() => getConditionalDefaultValue(isEditable, acsId, selectedAcs), [isEditable, acsId, selectedAcs]);

  const [acsDevice, setAcsDevice] = useState(AccessControlSystemModel.getFallbackProjectAccessControlSystem());

  const isFormLoading: boolean = useMemo(
    () => !!((assignLoading && assignLoading.isLoading) || (updateProjectAccessControlSystemLoading && updateProjectAccessControlSystemLoading.isLoading)),
    [assignLoading, updateProjectAccessControlSystemLoading]
  );

  const onSelect = useCallback(
    (id: string) => {
      selectAcs(id);
    },
    [selectAcs]
  );

  const onNextStep = useCallback(() => setStep(1), [setStep]);

  const onConfirm = useCallback(
    (data: AccessControlSystemModel.IProjectAccessControlSystem) => {
      if (!isEditable) {
        assignAccessControlSystem(projectId, sanitizeAssignAcs({ ...data, accessControlSystemId: deviceId }));
      } else {
        updateAccessControlSystem(projectId, deviceId, sanitizeAssignAcs(data));
      }
    },
    [projectId, deviceId, isEditable, assignAccessControlSystem, updateAccessControlSystem]
  );

  const { model, errors, formRules, hasChanges, onSubmit, onChange, update, discardChanges, resetErrors, updateRules } = useForm<
    AccessControlSystemModel.IProjectAccessControlSystem
  >({
    initValues: acsDevice,
    formRules: FormRules.accessControlSystem.getAssignAcsToProjectFieldRules(!!acsDevice.reader2),
    onSubmitCallback: onConfirm,
  });

  const onDiscard = useCallback(() => {
    discardChanges();
    resetErrors();
  }, [resetErrors, discardChanges]);

  useEffect(() => {
    update(acsDevice);
    if (acsDevice.type === AccessControlSystemModel.AccessControlSystemType.HANDHELD) {
      updateRules({
        deviceName: {
          required: true,
          rules: [],
        },
      });
    }
  }, [acsDevice, updateRules, update]);

  useEffect(() => {
    const device = getConditionalDefaultValue(isEditable, projectAccessControlSystem, accessControlSystemMap[deviceId]);
    setAcsDevice({ ...device, locationId: device?.location?.id });
  }, [projectAccessControlSystem, accessControlSystemMap, deviceId, isEditable, setAcsDevice]);

  useEffect(() => {
    if (isDeviceStep && deviceId) {
      if (!isEditable) {
        fetchAccessControlSystemSummary(deviceId);
      } else {
        fetchProjectAccessControlSystem(projectId, deviceId);
      }
    }
  }, [deviceId, assignStep, projectId, isEditable, isDeviceStep, fetchProjectAccessControlSystem, fetchAccessControlSystemSummary]);

  useEffect(() => {
    return function unMount() {
      update(AccessControlSystemModel.getFallbackProjectAccessControlSystem());
      setAcsDevice(AccessControlSystemModel.getFallbackProjectAccessControlSystem());
      clearLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT);
      clearLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT);
    };
  }, [update, setAcsDevice, clearLoading]);

  return (
    <FormModal
      open={true}
      hasChanges={hasChanges}
      isLoading={isFormLoading}
      isButtonDisabled={isButtonDisabled}
      showHasChanges={getConditionalDefaultValue(isAssignStep, false, true)}
      confirmLabel={getConditionalDefaultValue(isAssignStep, 'Next Step', getConditionalDefaultValue(isEditable, 'Save', 'Assign'))}
      handleSubmit={getConditionalDefaultValue(isAssignStep, onNextStep, onSubmit)}
      confirmLoadingLabel={getConditionalDefaultValue(isEditable, 'Saving...', 'Assigning...')}
      handleClose={closeModal}
      handleDiscard={onDiscard}
      styleClass={modalGlobalClasses.modalContainer}
      renderHeader={() => (
        <DialogTitle disableTypography={true} data-testid="acs-assign-modal-title">
          <Typography className={modalGlobalClasses.title} color="secondary" align="left" component="h1" variant="h6">
            {getConditionalDefaultValue(isEditable, 'Edit', 'Assign')} ACS
          </Typography>
        </DialogTitle>
      )}
      renderContent={() => (
        <DialogContent dividers={true} className={`${tableGlobalClasses.tableWrapper} ${tableGlobalClasses.tableBackground}`} style={{ position: 'relative' }}>
          {isAssignStep && (
            <AssignStep
              count={count}
              loading={loading}
              selectAcs={onSelect}
              accessControlSystemMap={modalMap}
              fetchAccessControlSystemList={fetchAccessControlSystemList}
            />
          )}
          {isDeviceStep && (
            <DeviceStep
              accessControlSystemAssignProjectLoading={accessControlSystemAssignProjectLoading}
              unassignAccessControlSystemAssignProjectLoading={unassignAccessControlSystemAssignProjectLoading}
              model={model}
              errors={{
                ...errors,
                ...assignLoading?.error?.errors,
                ...updateProjectAccessControlSystemLoading?.error?.errors,
              }}
              formRules={formRules}
              accessControlSystem={acsDevice}
              onChange={onChange}
              locations={projectLocations}
            />
          )}
        </DialogContent>
      )}
    />
  );
};

export default memo(AssignAccessControlSystemModal);
