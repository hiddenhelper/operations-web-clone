import React, { memo, useCallback, useEffect, useMemo } from 'react';

import FormDialog from './FormDialog';

import { ClientModel, GeneralModel, WorkerModel } from '../../../../models';
import { useForm } from '../../../../../utils/useForm';
import { IFormRules } from '../../../../../utils/useValidator';
import { isEmpty } from '../../../../../utils/generalUtils';

export interface IStepEditorProps {
  open: boolean;
  step: string;
  Component: any;
  deps: object;
  currentEntity: any;
  initValues: any;
  initFieldRules: IFormRules;
  serverErrors: any;
  stepMap: GeneralModel.IStepMap;
  loading: GeneralModel.ILoadingStatus;
  styleClass?: string;
  onClose: () => void;
  onSave: (model: any) => void;
  getRules: (model: any) => object;
  clearErrors: () => void;
  countryList?: GeneralModel.INamedEntity[];
  jobTitlesList?: WorkerModel.IJobTitle[];
  socJobTitlesList?: WorkerModel.ISocJobTitle[];
  tradeStatusesList?: WorkerModel.ITradeStatus[];
  languageTurnerProtocolsList?: WorkerModel.ILanguageTurnerProtocol[];
  skilledTradeList?: WorkerModel.ISkilledTrade[];
}

const StepEditor = ({
  open,
  step,
  Component,
  deps,
  currentEntity,
  initValues,
  initFieldRules,
  serverErrors,
  stepMap,
  loading,
  styleClass = '',
  clearErrors,
  onClose,
  onSave,
  getRules,
  countryList,
  jobTitlesList,
  socJobTitlesList,
  tradeStatusesList,
  languageTurnerProtocolsList,
  skilledTradeList,
}: IStepEditorProps) => {
  const { model, formRules, errors, hasChanges, onChange, update, setHasChanges, discardChanges, updateRules, onSubmit, resetErrors } = useForm<
    ClientModel.IClient
  >({
    initValues: initValues,
    formRules: initFieldRules,
    onSubmitCallback: onSave,
  });

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const onDiscard = useCallback(() => {
    discardChanges(currentEntity);
    resetErrors();
    clearErrors();
  }, [currentEntity, discardChanges, resetErrors, clearErrors]);

  const handleClose = useCallback(() => {
    onDiscard();
    onClose();
  }, [onDiscard, onClose]);

  const totalErrors = useMemo(() => {
    if (isEmpty(errors))
      return serverErrors?.errors
        ? Object.keys(serverErrors.errors).reduce((total, current) => {
            return {
              ...total,
              [current]: serverErrors.errors[current][0],
            };
          }, {})
        : {};
    return errors;
  }, [errors, serverErrors]);

  const componentDeps = useMemo(
    () => ({
      ...deps,
      model,
      formRules,
      errors: totalErrors,
      updateRules,
      onChange,
      resetErrors,
      countryList,
      jobTitlesList,
      socJobTitlesList,
      tradeStatusesList,
      languageTurnerProtocolsList,
      skilledTradeList,
    }),
    [
      deps,
      model,
      formRules,
      totalErrors,
      updateRules,
      onChange,
      resetErrors,
      countryList,
      jobTitlesList,
      socJobTitlesList,
      tradeStatusesList,
      languageTurnerProtocolsList,
      skilledTradeList,
    ]
  );

  useEffect(() => {
    if (currentEntity.id) update(currentEntity);
  }, [currentEntity.id, update]); // eslint-disable-line

  // Removed "model" from the deps array, other way, updateRules won't work on child components
  // If model is a dep, on every model update, the rules will be re-initialized to te value of "getRules(model)[step]" overriding any custom value
  useEffect(() => {
    updateRules(getRules(model)[step]);
  }, [step, updateRules, getRules]); // eslint-disable-line

  useEffect(() => {
    if (Object.keys(totalErrors).length > 0) setHasChanges(true);
  }, [totalErrors, setHasChanges]);

  useEffect(() => {
    return function unMount() {
      clearErrors();
    };
  }, [clearErrors]);

  return (
    <FormDialog
      open={open}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      handleDiscard={onDiscard}
      title={`Edit ${stepMap[step]?.title}`}
      isLoading={loading?.isLoading}
      hasChanges={hasChanges}
      styleClass={styleClass}
    >
      <Component {...(componentDeps as any)} />
    </FormDialog>
  );
};

export default memo(StepEditor);
