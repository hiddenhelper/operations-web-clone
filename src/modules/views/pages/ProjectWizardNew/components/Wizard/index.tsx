import React, { memo, useMemo, useEffect, useCallback, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Prompt } from 'react-router-dom';
import { ProjectNewModel } from 'modules/models';
import { useForm } from 'utils/useForm';
import { IUseNavigator } from 'utils/useNavigator';
import { getNextObjectItem, getPrevObjectItem } from 'utils';
import Modal from 'modules/views/shared/Modal';
import Alert from 'modules/views/shared/Modal/components/Alert';
import { useStyles } from '../../wizardStyles';
import { useStyles as modalStyles } from 'modules/views/shared/Modal/style';

export interface IWizardProps<T> {
  navigationProps: IUseNavigator<T>;
  reviewMode: boolean;
  route?: string;
  fallback: ProjectNewModel.IProject;
  isValidForNavigation: boolean;
  deps: any;
  setReviewMode: (reviewMode: boolean) => void;
  onLoad: (data: any) => void;
  renderForm: (data: any) => void;
  renderNavigator: (data: any) => void;
  navigate: (path: string) => void;
  handleSave: (projectData: ProjectNewModel.IProject) => void;
}
// tslint:disable-next-line:whitespace
const Wizard = <T,>({
  navigationProps,
  route,
  reviewMode,
  isValidForNavigation,
  fallback,
  deps,
  setReviewMode,
  onLoad,
  renderForm,
  renderNavigator,
  handleSave,
  navigate,
}: IWizardProps<T>) => {
  const classes = useStyles();
  const modalClasses = modalStyles();
  const stepMap = ProjectNewModel.projectStepMap;

  const { id, currentStepKey, currentStep, setStep } = navigationProps;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [validatingField, setValidatingField] = useState('');
  const step = useMemo(() => stepMap[currentStepKey], [stepMap, currentStepKey]);

  const updateRulesForCurrentStep = useCallback(
    (currentModel, updateRulesCallback, currentReviewMode, updatedStep?) => {
      const { billingModelType, mailingAddressMatchingType, badgingSiteAddressMatchesJobSiteAddress } = currentModel;
      const selectedStep = updatedStep || step;
      const rules = currentReviewMode
        ? selectedStep.approvalFormRules ||
          selectedStep.getApprovalFormRules({
            billingModelType: billingModelType,
            mailingMatchingType: mailingAddressMatchingType,
            badgingMatchesJobSite: badgingSiteAddressMatchesJobSiteAddress,
          })
        : selectedStep.draftFormRules || selectedStep.getDraftFormRules();
      updateRulesCallback(rules);
    },
    [step]
  );

  const onDiscardChangesCallback = useCallback(
    (prevModel, updateRulesCallback) => {
      updateRulesForCurrentStep(prevModel, updateRulesCallback, reviewMode);
    },
    [updateRulesForCurrentStep, reviewMode]
  );

  const { model, formRules, errors, hasChanges, update, onSubmit, onChange, discardChanges, onValidate, resetErrors, updateRules, setHasChanges } = useForm<
    any
  >({
    initValues: fallback,
    formRules: reviewMode
      ? step.approvalFormRules ||
        step.getApprovalFormRules({
          billingModelType: ProjectNewModel.BillingModelType.BADGES,
          mailingMatchingType: ProjectNewModel.MailingAddressMatchingType.JOB_SITE_ADDRESS,
          badgingMatchesJobSite: false,
        })
      : step.draftFormRules ||
        step.getDraftFormRules({
          mailingMatchingType: ProjectNewModel.MailingAddressMatchingType.JOB_SITE_ADDRESS,
          badgingMatchesJobSite: false,
        }),
    onSubmitCallback: handleSave,
    onDiscardChangesCallback: prevModel => onDiscardChangesCallback(prevModel, updateRules),
  });

  const navigateAwayWhen = useMemo(() => hasChanges && isValidForNavigation, [hasChanges, isValidForNavigation]);

  const onLoadDeps = useMemo(() => deps, [deps]);

  const onNavigate = useCallback(
    nextStep => {
      navigate(`${route}/${id}/${nextStep.key}`);
      setStep(nextStep);
    },
    [navigate, setStep, route, id]
  );

  const onPreNavigate = useCallback(
    nextStep => {
      const onNavigateError = onValidate('name');

      /* istanbul ignore else */
      if (isValidForNavigation && !onNavigateError) {
        //   /* istanbul ignore else */
        if (hasChanges) setShowModal(true);
        /* istanbul ignore else */
        if (!hasChanges && nextStep) onNavigate(nextStep);
      }
    },
    [hasChanges, isValidForNavigation, onValidate, onNavigate, setShowModal]
  );

  const onChangeStep = useCallback(
    newStepIndex => {
      onPreNavigate(stepMap[newStepIndex]);

      const updateRulesCallback = rules => {
        Object.keys(rules).forEach(key => {
          onValidate(key);
        });
        updateRules(rules);
      };
      updateRulesForCurrentStep(model, updateRulesCallback, true, stepMap[newStepIndex]);
    },
    [stepMap, model, updateRulesForCurrentStep, onPreNavigate, onValidate, updateRules]
  );

  useEffect(() => {
    if (validatingField && reviewMode) {
      onValidate(validatingField);
      setValidatingField('');
    }
  }, [formRules, reviewMode, validatingField, onValidate]);

  useEffect(() => {
    return () => {
      setReviewMode(false);
    };
  }, [setReviewMode]);

  useEffect(() => {
    onLoad(update);
  }, [onLoadDeps]); // eslint-disable-line

  const onDiscardHandler = useCallback(() => {
    discardChanges();
    resetErrors();
    setReviewMode(false);
    updateRulesForCurrentStep(model, updateRules, false);
  }, [model, discardChanges, resetErrors, setReviewMode, updateRulesForCurrentStep, updateRules]);

  const onStepChange = useCallback(
    (direction?: string) => {
      let item = getNextObjectItem(stepMap, currentStepKey);
      if (direction === 'back') {
        item = getPrevObjectItem(stepMap, currentStepKey);
      }
      const currentReviewMode = item.key === ProjectNewModel.ProjectStep.REVIEW;
      setReviewMode(currentReviewMode);
      updateRulesForCurrentStep(model, updateRules, currentReviewMode, item);
      resetErrors();
      onPreNavigate(item);
    },
    [onPreNavigate, updateRulesForCurrentStep, setReviewMode, updateRules, resetErrors, model, stepMap, currentStepKey]
  );

  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);

  const onNavigateAway = useCallback(
    (location: any) => {
      if (isValidForNavigation) setShowModal(true);
      return !!(location.state && location.state.success);
    },
    [setShowModal, isValidForNavigation]
  );

  const validateOnChange = (value, updatedState) => {
    if (reviewMode) {
      updateRulesForCurrentStep(updatedState, updateRules, true);
      if (value.badgingSiteAddressMatchesJobSiteAddress !== undefined) {
        setValidatingField('badgingSiteAddress');
      }
      if (value.mailingAddressMatchingType !== undefined) {
        setValidatingField('mailingAddress');
      }
    }
  };

  const onChangeCallback = s => {
    if (typeof s === 'function') {
      let changedValues = {};
      let newState = {};
      const callbackMethod = prevState => {
        newState = { ...s(prevState) };
        Object.keys(prevState).forEach(key => {
          if (newState[key] !== prevState[key]) {
            changedValues[key] = newState[key];
          }
        });
        return newState;
      };
      onChange(callbackMethod);
      if (Object.keys(changedValues).length > 0) {
        validateOnChange(changedValues, newState);
      }
    } else {
      onChange(s);
    }
  };

  return (
    <>
      <Prompt message={onNavigateAway} when={!isValidForNavigation || navigateAwayWhen} />
      <Grid container={true}>
        <Grid item={true} xs={12} md={9}>
          <Grid container={true}>
            <Grid item={true} xs={12}>
              <>
                {renderNavigator({
                  hasChanges,
                  onNextStep: () => onStepChange(),
                  onPrevStep: () => onStepChange('back'),
                  onDiscard: onDiscardHandler,
                  onSave: onSubmit,
                })}
              </>
            </Grid>
          </Grid>
          <Grid container={true}>
            <Grid item={true} xs={12} style={{ padding: 30 }}>
              <>
                {renderForm({
                  formRules,
                  model,
                  errors: { ...errors },
                  currentStep,
                  setReviewMode,
                  onChangeStep,
                  onChange: onChangeCallback,
                  resetErrors,
                  updateRules,
                  update,
                  setHasChanges,
                })}
              </>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={false} md={3}>
          <div className={classes.processOverviewContainer}>
            <div />
          </div>
        </Grid>
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
