import React, { memo, useMemo, useEffect, useState, useCallback } from 'react';
import { Prompt } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Modal from '../../shared/Modal';
import Alert from '../../shared/Modal/components/Alert';
import ProcessOverview from '../../shared/ResourceManagement/ProcessOverview';

import { GeneralModel } from '../../../models';
import { getConditionalDefaultValue, getDefaultValue, getNextObjectItem } from '../../../../utils/generalUtils';
import { useForm } from '../../../../utils/useForm';
import { IFormRules } from '../../../../utils/useValidator';
import { IUseNavigator } from '../../../../utils/useNavigator';
import { useScroll } from '../../../../utils/useScroll';
import { useStyles as modalStyles } from '../../shared/Modal/style';
import { useStyles } from './styles';
import { generalGlobalStyles } from '../../../../assets/styles';
import { useHideScroll } from '../../../../utils/useHideScroll';

export interface IWizardProps<T> {
  stepMap?: GeneralModel.IStepMap;
  completedFieldMap?: GeneralModel.IStepCompletedMap;
  formRuleMap: IFormRules;
  navigationProps: IUseNavigator<T>;
  route?: string;
  fallback: T;
  isValidForNavigation: boolean;
  allowNavigation?: boolean;
  isConfirmEnabled?: boolean;
  isLoadSuccess: boolean;
  isStepper?: boolean;
  isHeaderFixed?: boolean;
  loading: GeneralModel.ILoadingStatus;
  styles?: any;
  deps: any;
  renderForm: (data: any) => void;
  renderNavigator: (data: any) => void;
  onSave: (data: any) => void;
  onLoad: (data: any) => void;
  navigate: (path: string) => void;
  onDiscard?: () => void;
  onConfirm?: (data: any) => void;
  onLoadSuccess?: (data: any) => void;
  clearLoadingMap: () => void;
  clearErrors: () => void;
}

// tslint:disable-next-line:whitespace
const Wizard = <T,>({
  formRuleMap,
  navigationProps,
  stepMap = {},
  completedFieldMap = {},
  fallback,
  isValidForNavigation,
  allowNavigation = true,
  isConfirmEnabled = true,
  isLoadSuccess,
  loading,
  route = '',
  isStepper = true,
  styles = {},
  deps,
  onSave,
  onLoad,
  onDiscard = () => {
    /* */
  },
  onConfirm,
  onLoadSuccess = () => {
    /* */
  },
  navigate,
  renderForm,
  renderNavigator,
  clearErrors,
  clearLoadingMap,
}: IWizardProps<T>) => {
  const modalClasses = modalStyles();
  const wizardClasses = useStyles();
  const { isScrollHided, scrollWidth } = useHideScroll();
  const generalStyles = generalGlobalStyles({ scrollWidth });

  const { id, currentEntity, currentStepKey, currentStep, setStep } = navigationProps;
  const { toggleClass } = useScroll({ scrollPosition: 80 });

  const loadSuccess = useMemo(() => isLoadSuccess, [isLoadSuccess]);
  const loadingError = useMemo(() => loading && loading.error && loading.error.errors, [loading]);
  const onLoadDeps = useMemo(() => deps, [deps]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const activeStep = useMemo(() => Object.keys(stepMap).indexOf(currentStepKey), [stepMap, currentStepKey]);

  const onSubmitHandler = useCallback(data => onSave(data), [onSave]);
  const onConfirmHandler = useCallback(() => onConfirm(currentEntity), [currentEntity, onConfirm]);

  const { model, formRules, errors, hasChanges, update, onSubmit, onChange, setHasChanges, discardChanges, onValidate, resetErrors, updateRules } = useForm<T>({
    initValues: fallback,
    formRules: formRuleMap,
    onSubmitCallback: onSubmitHandler,
  });

  const navigateAwayWhen = useMemo(() => hasChanges && isValidForNavigation && allowNavigation, [hasChanges, isValidForNavigation, allowNavigation]);

  const onDiscardHandler = useCallback(() => {
    discardChanges();
    onDiscard();
    resetErrors();
    clearLoadingMap();
    clearErrors();
    updateRules(formRuleMap);
  }, [discardChanges, onDiscard, resetErrors, clearLoadingMap, clearErrors, updateRules, formRuleMap]);

  const onNavigate = useCallback(
    nextStep => {
      navigate(`${route}/${id}/${nextStep.key}`);
      setStep(nextStep);
    },
    [navigate, setStep, route, id]
  );

  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);

  const onPreNavigate = useCallback(
    nextStep => {
      const onNavigateError = onValidate('name');

      /* istanbul ignore else */
      if (isValidForNavigation && !onNavigateError) {
        /* istanbul ignore else */
        if (hasChanges) setShowModal(true);
        /* istanbul ignore else */
        if (!hasChanges && nextStep) onNavigate(nextStep);
      }
    },
    [hasChanges, isValidForNavigation, onValidate, setShowModal, onNavigate]
  );

  const onNavigateAway = useCallback(
    (location: any) => {
      if (isValidForNavigation) setShowModal(true);
      return !!(location.state && location.state.success);
    },
    [setShowModal, isValidForNavigation]
  );

  const onNextStep = useCallback(() => {
    const nextItem = getNextObjectItem(stepMap, currentStepKey);
    onPreNavigate(nextItem);
  }, [onPreNavigate, stepMap, currentStepKey]);

  const onChangeStep = useCallback(newStepIndex => onPreNavigate(stepMap[newStepIndex]), [stepMap, onPreNavigate]);

  useEffect(() => {
    /* istanbul ignore else */
    if (loadSuccess) {
      setHasChanges(false);
      setDone(true);
      onLoadSuccess({ updateRules });
    }
  }, [loadSuccess, setHasChanges]); // eslint-disable-line

  useEffect(() => {
    /* istanbul ignore else */
    if (done && hasChanges) setDone(false);
  }, [done, hasChanges, setDone]);

  useEffect(() => {
    /* istanbul ignore else */
    if (currentStepKey !== currentStep?.key) setStep(stepMap[currentStepKey]);
  }, [stepMap, currentStep, currentStepKey, setStep]);

  useEffect(() => {
    onLoad(update);
  }, [onLoadDeps]); // eslint-disable-line

  useEffect(() => {
    return function unMount() {
      clearErrors();
      clearLoadingMap();
    };
  }, [clearErrors, clearLoadingMap]);
  return (
    <>
      <Prompt data-testid="prompt-navigate" message={onNavigateAway} when={!isValidForNavigation || navigateAwayWhen} />
      <Grid key="WizardContainer" id="wizard-stepper" className={wizardClasses.container}>
        <form noValidate={true} onSubmit={/* istanbul ignore next */ event => event.preventDefault()}>
          {renderNavigator({
            toggleClass,
            currentStep,
            activeStep,
            hasChanged: hasChanges,
            isConfirmEnabled: !(!hasChanges && isConfirmEnabled),
            onNextStep,
            onDiscard: onDiscardHandler,
            onSave: onSubmit,
            onConfirm: onConfirmHandler,
          })}
          <Grid id="manager-content" container={true} className={`${wizardClasses.contentContainer}`}>
            <Grid
              item={true}
              className={`${wizardClasses.wizardContainer} ${getConditionalDefaultValue(
                toggleClass,
                wizardClasses.fixedContainer,
                ''
              )} ${getConditionalDefaultValue(!isStepper, wizardClasses.wizardContainerFullWidth, '')}`}
            >
              <Grid className={`${wizardClasses.formContainer} ${getDefaultValue(styles?.formContainer, '')}`}>
                <>
                  {renderForm({
                    model,
                    formRules,
                    errors: { ...errors, ...loadingError },
                    currentStep,
                    onChangeStep,
                    onChange,
                    resetErrors,
                    updateRules,
                    update,
                    setHasChanged: setHasChanges,
                  })}
                </>
              </Grid>
            </Grid>
            {isStepper && (
              <Grid
                item={true}
                className={`${wizardClasses.processWrapper} ${getConditionalDefaultValue(
                  toggleClass,
                  wizardClasses.fixedStepper,
                  ''
                )} ${getConditionalDefaultValue(isScrollHided && toggleClass, generalStyles.scrollHided, '')}`}
              >
                <ProcessOverview completedFields={completedFieldMap} currentStep={currentStep} onChangeStep={onChangeStep} />
              </Grid>
            )}
          </Grid>
        </form>
      </Grid>
      <Modal
        show={showModal}
        styleClass={`${modalClasses.dialogContainer} ${showModal ? 'open' : 'closed'}`}
        onClose={closeModal}
        render={() => (
          <Alert title="Unsaved changes" content="Save or discard your changes before moving to another step." btnLabel="Got it" onClick={closeModal} />
        )}
      />
    </>
  );
};

export default memo(Wizard);
