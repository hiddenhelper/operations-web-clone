import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Wizard from '../../shared/Wizard';
import WizardHeader from '../../shared/ResourceManagement/WizardHeader';
import BadgePrinterSystemForm from './BadgePrinterSystemForm';

import { GeneralModel, BadgePrintingSystemModel } from '../../../models';
import { badgePrinterSystemRules } from '../../../../constants/form/badgePrinterSystemRules';
import { useNavigator } from '../../../../utils/useNavigator';
import { sanitize } from '../../../../utils/badgePrinterSystemUtils';
import { useStyles } from '../../shared/Wizard/styles';

export interface IBadgePrintingSystemWizardProps {
  badgePrinterSystemMap: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
  loading: GeneralModel.ILoadingStatus;
  saveBadgePrinterSystem: (model: BadgePrintingSystemModel.IBadgePrintingSystem) => void;
  updateBadgePrinterSystem: (model: BadgePrintingSystemModel.IBadgePrintingSystem) => void;
  fetchBadgePrinterSystem: (id: string) => void;
  clearBadgePrinterSystemMap: () => void;
  clearErrors: () => void;
}

const BadgePrinterSystemWizard = ({
  badgePrinterSystemMap,
  loading,
  saveBadgePrinterSystem,
  updateBadgePrinterSystem,
  fetchBadgePrinterSystem,
  clearBadgePrinterSystemMap,
  clearErrors,
}: IBadgePrintingSystemWizardProps) => {
  const classes = useStyles();
  const { id, step, entityId, currentEntity } = useNavigator<BadgePrintingSystemModel.IBadgePrintingSystem>({
    entityMap: badgePrinterSystemMap,
    fallback: BadgePrintingSystemModel.getFallbackBadgePrinterSystem,
  });
  const loadingError = useMemo(() => loading && loading.error && loading.error.errors, [loading]);
  const loadedSuccessful: boolean = useMemo(() => loading && !loading.isLoading && !loading.hasError, [loading]);
  const isValidForNavigation = useMemo(() => !loading || (loading && !loading.isLoading), [loading]);
  const isLoading = useMemo(() => loading && loading.isLoading, [loading]);
  const buttonLabel = useMemo(() => (entityId ? null : 'Create'), [entityId]);
  const onLoadDeps = useMemo(() => ({ currentEntity }), [currentEntity]);

  const onSaveHandler = useCallback(
    (badgePrinterSystemData: BadgePrintingSystemModel.IBadgePrintingSystem) => {
      const data = sanitize(badgePrinterSystemData);
      if (!entityId) saveBadgePrinterSystem(data);
      if (entityId) updateBadgePrinterSystem(data);
    },
    [entityId, saveBadgePrinterSystem, updateBadgePrinterSystem]
  );

  const onLoadHandler = useCallback(
    /* istanbul ignore next */ onChange => {
      if (currentEntity) onChange(currentEntity);
    },
    [currentEntity]
  );

  useEffect(() => {
    if (entityId && !badgePrinterSystemMap[entityId]) fetchBadgePrinterSystem(entityId);
  }, [entityId, fetchBadgePrinterSystem, badgePrinterSystemMap]);

  useEffect(() => {
    return function unMount() {
      clearErrors();
      clearBadgePrinterSystemMap();
    };
  }, [clearErrors, clearBadgePrinterSystemMap]);

  return (
    <Wizard
      isStepper={false}
      formRuleMap={badgePrinterSystemRules}
      navigationProps={{ id, step, entityId, currentEntity }}
      fallback={BadgePrintingSystemModel.getFallbackBadgePrinterSystem()}
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
          title="BPS Information"
          subtitle="Create New BPS"
          breadCrumb={{ route: '/inventory', title: 'Inventory', pluralTitle: 'Inventory' }}
          entityName={currentEntity.name}
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
      renderForm={({ model, formRules, errors, onChange }) => (
        <BadgePrinterSystemForm model={model} formRules={formRules} onChange={onChange} errors={{ ...loadingError, ...errors }} />
      )}
    />
  );
};

export default memo(BadgePrinterSystemWizard);
