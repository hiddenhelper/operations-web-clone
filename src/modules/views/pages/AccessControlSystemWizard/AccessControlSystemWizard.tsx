import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Wizard from '../../shared/Wizard';
import WizardHeader from '../../shared/ResourceManagement/WizardHeader';
import AccessControlSystemForm from './AccessControlSystemForm';

import { GeneralModel, AccessControlSystemModel } from '../../../models';
import { fieldRules } from '../../../../constants/form/accessControlSystemRules';
import { useNavigator } from '../../../../utils/useNavigator';
import { useStyles } from '../../shared/Wizard/styles';
import { sanitizeACS } from '../../../../utils/accessControlSystemUtils';

export interface IAccessControlSystemWizardProps {
  accessControlSystemMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  loading: GeneralModel.ILoadingStatus;
  saveAccessControlSystem: (model: AccessControlSystemModel.IAccessControlSystem) => void;
  updateAccessControlSystem: (model: AccessControlSystemModel.IAccessControlSystem) => void;
  fetchAccessControlSystem: (id: string) => void;
  clearAccessControlSystemMap: () => void;
  clearErrors: () => void;
}

const AccessControlSystemWizard = ({
  accessControlSystemMap,
  loading,
  saveAccessControlSystem,
  updateAccessControlSystem,
  fetchAccessControlSystem,
  clearAccessControlSystemMap,
  clearErrors,
}: IAccessControlSystemWizardProps) => {
  const classes = useStyles();
  const { id, step, entityId, currentEntity } = useNavigator<AccessControlSystemModel.IAccessControlSystem>({
    entityMap: accessControlSystemMap,
    fallback: AccessControlSystemModel.getFallbackAccessControlSystem,
  });

  const loadedSuccessful: boolean = useMemo(() => loading && !loading.isLoading && !loading.hasError, [loading]);
  const isLoading: boolean = useMemo(() => loading && loading.isLoading, [loading]);
  const isValidForNavigation = useMemo(() => !loading || (loading && !loading.isLoading), [loading]);
  const buttonLabel = useMemo(() => (entityId ? null : 'Create'), [entityId]);
  const onLoadDeps = useMemo(() => ({ currentEntity }), [currentEntity]);

  const onSaveHandler = useCallback(
    (accessControlSystemData: AccessControlSystemModel.IAccessControlSystem) => {
      if (!entityId) saveAccessControlSystem(sanitizeACS(accessControlSystemData));
      if (entityId) updateAccessControlSystem(sanitizeACS(accessControlSystemData));
    },
    [entityId, saveAccessControlSystem, updateAccessControlSystem]
  );

  const onLoadHandler = useCallback(
    /* istanbul ignore next */ onChange => {
      if (currentEntity) onChange(currentEntity);
    },
    [currentEntity]
  );

  useEffect(() => {
    if (entityId && !accessControlSystemMap[entityId]) fetchAccessControlSystem(entityId);
  }, [entityId, accessControlSystemMap, fetchAccessControlSystem]);

  useEffect(() => {
    return function unMount() {
      clearErrors();
      clearAccessControlSystemMap();
    };
  }, [clearErrors, clearAccessControlSystemMap]);
  return (
    <Wizard
      isStepper={false}
      formRuleMap={fieldRules}
      navigationProps={{ id, step, entityId, currentEntity }}
      fallback={AccessControlSystemModel.getFallbackAccessControlSystem()}
      loading={loading}
      isLoadSuccess={false}
      isValidForNavigation={isValidForNavigation}
      styles={{ formContainer: classes.formContainerPadding }}
      deps={onLoadDeps}
      onLoad={onLoadHandler}
      onSave={onSaveHandler}
      clearErrors={clearErrors}
      renderNavigator={({ toggleClass, hasChanged, onDiscard, onSave }) => (
        <WizardHeader
          isFixed={toggleClass}
          fullWidth={true}
          title="Device Information"
          subtitle="Create New ACS Device"
          breadCrumb={{ route: '/inventory', title: 'Inventory', pluralTitle: 'Inventory' }}
          entityName={currentEntity.serialNumber}
          hasChanges={hasChanged}
          onDiscard={onDiscard}
          onSave={onSave}
          isSaveLoading={isLoading}
          loadSuccess={loadedSuccessful}
          stepped={false}
          customLabel={buttonLabel}
          customLoadingLabel={entityId ? null : 'Creating...'}
        />
      )}
      renderForm={({ model, formRules, errors, onChange, resetErrors }) => (
        <AccessControlSystemForm model={model} formRules={formRules} errors={errors} onChange={onChange} edit={!!entityId} clearErrors={resetErrors} />
      )}
    />
  );
};

export default memo(AccessControlSystemWizard);
