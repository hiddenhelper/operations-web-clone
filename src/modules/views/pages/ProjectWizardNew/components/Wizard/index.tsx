import React, { memo, useMemo, useEffect, useCallback, useState } from 'react';
import { Grid, Drawer } from '@material-ui/core';
import { Prompt } from 'react-router-dom';
import { GeneralModel, ProjectNewModel, UserModel } from 'modules/models';
import { useForm } from 'utils/useForm';
import { IUseNavigator } from 'utils/useNavigator';
import { getNextObjectItem, getPrevObjectItem } from 'utils';
import Modal from 'modules/views/shared/Modal';
import Alert from 'modules/views/shared/Modal/components/Alert';
import { useStyles } from '../../wizardStyles';
import { useStyles as modalStyles } from 'modules/views/shared/Modal/style';
import ProcessOverview from './ProcessOverview';
import StatusChip from 'modules/views/shared/StatusChip';
import { ButtonLoader } from 'modules/views/shared';
import { useStyles as statusChipStyles } from 'modules/views/shared/StatusChip/styles';
import { LANG } from 'constants/locales';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

const initialBadgesType = {
  generalContractorBadgeType: ProjectNewModel.BadgeType.TEMPLATE,
  subcontractorBadgeType: ProjectNewModel.BadgeType.TEMPLATE,
  visitorBadgeType: ProjectNewModel.BadgeType.TEMPLATE,
};

export interface IWizardProps<T> {
  breadCrumb: { route: string; title: string; pluralTitle: string };
  navigationProps: IUseNavigator<T>;
  reviewMode: boolean;
  route?: string;
  fallback: ProjectNewModel.IProject;
  isValidForNavigation: boolean;
  deps: any;
  completedFieldMap: GeneralModel.IStepCompletedMap;
  status: string;
  isConfirmEnabled: boolean;
  isLoading: boolean;
  setReviewMode: (reviewMode: boolean) => void;
  onLoad: (data: any) => void;
  renderForm: (data: any) => void;
  renderNavigator: (data: any) => void;
  navigate: (path: string) => void;
  handleSave: (projectData: ProjectNewModel.IProject) => void;
  onConfirm: () => void;
  clearFileMap: () => void;
}
// tslint:disable-next-line:whitespace
const Wizard = <T,>({
  breadCrumb,
  navigationProps,
  route,
  reviewMode,
  isValidForNavigation,
  fallback,
  deps,
  completedFieldMap,
  status,
  isConfirmEnabled,
  isLoading,
  setReviewMode,
  onLoad,
  renderForm,
  renderNavigator,
  handleSave,
  navigate,
  onConfirm,
  clearFileMap,
}: IWizardProps<T>) => {
  const classes = useStyles();
  const modalClasses = modalStyles();
  const statusChipClasses = statusChipStyles();
  const stepMap = ProjectNewModel.projectStepMap;

  const resourceStatus = useMemo(() => status.replace(/ /g, '').toLowerCase(), [status]);
  const buttonLoaderTextMap = useMemo(
    () => ({
      draft: {
        text: LANG.EN.NAVIGATION_TOP.ACTIONS.SEND_APPROVE,
        loadingText: LANG.EN.NAVIGATION_TOP.ACTIONS.SEND_APPROVE_LOADING,
      },
      pendingapproval: {
        text: `${LANG.EN.NAVIGATION_TOP.ACTIONS.APPROVE} ${breadCrumb.title}`,
        loadingText: `${LANG.EN.NAVIGATION_TOP.ACTIONS.APPROVE_LOADING} ${breadCrumb.title}`,
      },
    }),
    [breadCrumb]
  );

  const { id, currentStepKey, currentStep, setStep } = navigationProps;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [validatingFields, setValidatingFields] = useState([]);
  const [badgesType, setBadgesType] = React.useState(initialBadgesType);
  const [prevBadgesType, setPrevBadgesType] = React.useState(initialBadgesType);
  const step = useMemo(() => stepMap[currentStepKey], [stepMap, currentStepKey]);

  const updateBadgesStates = useCallback((updatedBadges, setAsPrev?) => {
    setBadgesType(() => {
      if (setAsPrev) setPrevBadgesType(updatedBadges);
      return updatedBadges;
    });
  }, []);

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
    (newStepIndex, shouldValidate?) => {
      setIsDrawerOpen(false);
      resetErrors();

      const currentReviewMode = newStepIndex === ProjectNewModel.ProjectStep.REVIEW;
      if (!shouldValidate) {
        setReviewMode(currentReviewMode);
      }

      const updateRulesCallback = rules => {
        updateRules(rules);
        if (shouldValidate) {
          Object.keys(rules).forEach(key => {
            onValidate(key);
          });
        }
      };

      updateRulesForCurrentStep(model, updateRulesCallback, shouldValidate || currentReviewMode, stepMap[newStepIndex]);
      onPreNavigate(stepMap[newStepIndex]);
    },
    [stepMap, model, resetErrors, updateRulesForCurrentStep, onPreNavigate, onValidate, updateRules, setReviewMode]
  );

  useEffect(() => {
    if (validatingFields.length > 0 && reviewMode) {
      validatingFields.forEach(key => {
        if (!['badgingSiteAddressMatchesJobSiteAddress', 'mailingAddressMatchingType', 'billingModelType'].includes(key)) onValidate(key);
        if (key === 'billingModelType') {
          onValidate('badgeBillingModel');
          onValidate('seatBillingModel');
        }
      });
      setValidatingFields([]);
    }
  }, [formRules, reviewMode, validatingFields, onValidate]);

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
    clearFileMap();
    setBadgesType(prevBadgesType);
  }, [model, prevBadgesType, discardChanges, resetErrors, setReviewMode, updateRulesForCurrentStep, updateRules, clearFileMap]);

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

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  const validateOnChange = useCallback(
    states => {
      if (reviewMode) {
        let changedValues = [];
        Object.keys(states.prev).forEach((key, i) => {
          if (states.current[key] !== states.prev[key]) {
            changedValues.push(key);
          }
        });
        updateRulesForCurrentStep(states.current, updateRules, true);
        if (changedValues.length > 0) {
          setValidatingFields(changedValues);
        }
      }
    },
    [reviewMode, updateRules, updateRulesForCurrentStep]
  );

  const debounceValidateOnChange = useCallback(debounce(validateOnChange, 1000), [validateOnChange]);

  const onChangeCallback = s => {
    if (typeof s === 'function') {
      const states = {
        current: {},
        prev: {},
      };
      const callbackMethod = prevState => {
        states.current = { ...s(prevState) };
        states.prev = prevState;
        debounceValidateOnChange(states);
        return states.current;
      };
      onChange(callbackMethod);
    } else {
      onChange(s);
    }
  };

  const onConfirmHandler = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  const sideNavigation = (
    <>
      <div className={classes.rightSidebar}>
        <div className={classes.rightSidebarStatus}>
          Status: <StatusChip styleClasses={statusChipClasses[resourceStatus]} label={status} />
        </div>
        <PermissionGuard
          permissionsExpression={resourceStatus === 'draft' ? UserModel.DraftProjectsPermission.MANAGE : UserModel.DraftProjectsPermission.APPROVE}
        >
          <ButtonLoader
            data-testid="approve-btn"
            className={classes.approveButton}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            disabled={!(!hasChanges && isConfirmEnabled)}
            isLoading={isLoading}
            text={buttonLoaderTextMap[resourceStatus].text}
            loadingText={buttonLoaderTextMap[resourceStatus].loadingText}
            onClick={onConfirmHandler}
          />
        </PermissionGuard>
      </div>
      <ProcessOverview completedFields={completedFieldMap} currentStep={currentStep} onChangeStep={onChangeStep} />
    </>
  );

  return (
    <>
      <Prompt message={onNavigateAway} when={!isValidForNavigation || navigateAwayWhen} />
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className={classes.sideNavigationWrapper}>{sideNavigation}</div>
      </Drawer>
      <Grid container={true}>
        <Grid item={true} xs={12} md={9}>
          <>
            {renderNavigator({
              hasChanges,
              onNextStep: () => onStepChange(),
              onPrevStep: () => onStepChange('back'),
              onDiscard: onDiscardHandler,
              onSave: onSubmit,
              openDrawer: () => setIsDrawerOpen(true),
            })}
            {renderForm({
              formRules,
              model,
              errors: { ...errors },
              currentStep,
              badgesType,
              setReviewMode,
              onChangeStep: newStepIndex => onChangeStep(newStepIndex, true),
              onChange: onChangeCallback,
              resetErrors,
              updateRules,
              update,
              setHasChanges,
              setBadgesType: updateBadgesStates,
            })}
          </>
        </Grid>
        <Grid item={true} xs={false} md={3} className={classes.processWrapper}>
          {sideNavigation}
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
