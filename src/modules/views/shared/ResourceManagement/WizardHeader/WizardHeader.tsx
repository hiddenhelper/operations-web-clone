import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ControlledButton from '../../FormHandler/ControlledButton';
import ButtonLoader from '../../ButtonLoader';

import { GeneralModel } from '../../../../models';
import { LANG, CheckmarkIcon } from '../../../../../constants';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from './styles';
import { generalGlobalStyles } from '../../../../../assets/styles';
import { useHideScroll } from '../../../../../utils/useHideScroll';

enum ActionType {
  SAVE = 'save',
  DISCARD = 'discard',
}

interface INavigationTopState {
  show: boolean;
  action: string;
}

export interface IWizardHeaderProps {
  title?: string;
  subtitle?: string;
  breadCrumb: { route: string; title: string; pluralTitle: string };
  entityName?: string;
  hasChanges: boolean;
  loadSuccess: boolean;
  stepped?: boolean;
  isFixed?: boolean;
  isNotMigratedStatus?: boolean;
  fullWidth?: boolean;
  isSaveLoading: boolean;
  step?: GeneralModel.IStep;
  customLabel?: string;
  customLabelStyle?: React.CSSProperties;
  customLoadingLabel?: string;
  stepIndex?: number;
  onDiscard: () => void;
  onSave: () => void;
  onNextStep?: () => void;
}

const WizardHeader = ({
  title,
  subtitle,
  breadCrumb,
  entityName,
  hasChanges,
  loadSuccess,
  isSaveLoading,
  stepped,
  isFixed,
  fullWidth = false,
  step,
  customLabel,
  customLabelStyle,
  customLoadingLabel,
  stepIndex,
  onDiscard,
  onSave,
  onNextStep,
  isNotMigratedStatus = true,
}: IWizardHeaderProps) => {
  const classes = useStyles();
  const { isScrollHided, scrollWidth } = useHideScroll();
  const generalStyles = generalGlobalStyles({ scrollWidth });
  const [state, setState] = useState<INavigationTopState>({ show: false, action: null });
  const [currentStep, setStep] = useState<number>(stepIndex);
  const stepHasChanged = useMemo(() => stepped && currentStep !== stepIndex, [stepIndex, currentStep, stepped]);

  const onSaveHandler = useCallback(() => onSave(), [onSave]);
  const onDiscardHandler = useCallback(() => {
    setState({ show: true, action: ActionType.DISCARD });
    onDiscard();
  }, [onDiscard]);

  const onNext = useCallback(() => {
    setState(prevState => ({ ...prevState, show: false }));
    onNextStep();
  }, [onNextStep]);

  useEffect(() => {
    /* istanbul ignore else */
    if (loadSuccess && stepped) setState({ show: true, action: ActionType.SAVE });
  }, [loadSuccess, stepped]);

  useEffect(() => {
    /* istanbul ignore else */
    if (hasChanges && state.show) setState({ show: false, action: null });
  }, [hasChanges, state.show, setState]);

  useEffect(() => {
    if (stepHasChanged) setStep(stepIndex);
    /* istanbul ignore next line */
    if (stepHasChanged && state.show) setState({ show: false, action: null });
  }, [state.show, stepIndex, stepHasChanged, setStep, setState]);

  return (
    <Grid
      item={true}
      className={`${classes.panelContainer} ${getConditionalDefaultValue(isFixed, classes.fixedHeader, '')} ${getConditionalDefaultValue(
        fullWidth,
        classes.fullWidth,
        ''
      )} ${getConditionalDefaultValue(isScrollHided && isFixed, generalStyles.scrollHided, '')}`}
    >
      <Grid container={true} className={classes.leftPanel}>
        <Grid item={true} xs={6} className={classes.step}>
          <div className={classes.stepWrapper}>
            <Link className={classes.stepLink} to={breadCrumb.route}>
              {breadCrumb.pluralTitle}
            </Link>
            <span className={classes.stepLinkSeparator}>{'>'}</span>
            {entityName || (stepped ? step.subtitle : subtitle)}
          </div>
          <Typography className={classes.title} color="primary" align="left" component="h1" variant="h5">
            {stepped ? `${stepIndex + 1}. ${step?.title}` : `${title}`}
          </Typography>
        </Grid>
        {(!stepped || (stepped && !step.hideControls)) && (
          <Grid item={true} xs={6} className={classes.actionButtons}>
            {!hasChanges && state.show && !isSaveLoading && (
              <Typography data-testid="action-message-wrapper" variant="caption" className={classes.savedAt}>
                {state.action === ActionType.SAVE && (
                  <>
                    <span className={classes.checkmark}>
                      <CheckmarkIcon />
                    </span>
                    {LANG.EN.NAVIGATION_TOP.MESSAGE.SAVE}
                  </>
                )}
                {state.action === ActionType.DISCARD && LANG.EN.NAVIGATION_TOP.MESSAGE.DISCARD}
              </Typography>
            )}
            {(!stepped || (stepped && hasChanges) || isSaveLoading) && (
              <div className={classes.actionButtonsWrapper}>
                {(hasChanges || isSaveLoading) && (
                  <ControlledButton>
                    <Button
                      data-testid="discard-changes-btn"
                      color="primary"
                      className={classes.discardButton}
                      onClick={onDiscardHandler}
                      disabled={isSaveLoading}
                    >
                      {LANG.EN.NAVIGATION_TOP.ACTIONS.DISCARD}
                    </Button>
                  </ControlledButton>
                )}
                <ControlledButton>
                  <ButtonLoader
                    data-testid="save-changes-btn"
                    color="primary"
                    className={stepped ? classes.saveButton : classes.updateSaveButton}
                    style={customLabelStyle}
                    variant={stepped ? 'outlined' : 'contained'}
                    isLoading={isSaveLoading}
                    text={customLabel || LANG.EN.NAVIGATION_TOP.ACTIONS.SAVE}
                    loadingText={customLoadingLabel || LANG.EN.NAVIGATION_TOP.ACTIONS.SAVING}
                    onClick={onSaveHandler}
                    disabled={isSaveLoading || (!stepped && !hasChanges && isNotMigratedStatus)}
                  />
                </ControlledButton>
              </div>
            )}
            {stepped && !hasChanges && !isSaveLoading && (
              <ControlledButton>
                <Button
                  data-testid="next-changes-btn"
                  className={classes.nextButton}
                  color="primary"
                  variant="contained"
                  fullWidth={true}
                  size="large"
                  onClick={onNext}
                >
                  {LANG.EN.NAVIGATION_TOP.ACTIONS.NEXT}
                </Button>
              </ControlledButton>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(WizardHeader);
