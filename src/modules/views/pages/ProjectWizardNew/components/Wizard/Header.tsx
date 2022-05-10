import React, { memo, useEffect, useCallback, useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import { ButtonLoader } from 'modules/views/shared';
import { LANG, CheckmarkIcon } from '../../../../../../constants';
import { useStyles } from '../../wizardStyles';
import { GeneralModel } from 'modules/models';

enum ActionType {
  SAVE = 'save',
  DISCARD = 'discard',
}

interface INavigationTopState {
  show: boolean;
  action: string;
}

export interface IHeaderProps {
  breadCrumb: { route: string; title: string };
  entityName?: string;
  hasChanges: boolean;
  isSaveLoading: boolean;
  loadSuccess: boolean;
  step?: GeneralModel.IStep;
  onDiscard: () => void;
  onSave: () => void;
  onNextStep?: () => void;
}

const Header = ({ hasChanges, breadCrumb, entityName, step, isSaveLoading, loadSuccess, onSave, onDiscard, onNextStep }: IHeaderProps) => {
  const classes = useStyles();
  const [state, setState] = useState<INavigationTopState>({ show: false, action: null });

  const onSaveHandler = useCallback(() => onSave(), [onSave]);

  const onDiscardHandler = useCallback(() => {
    setState({ show: true, action: ActionType.DISCARD });
    onDiscard();
  }, [onDiscard]);

  const onNextHandler = useCallback(() => {
    setState(prevState => ({ ...prevState, show: false }));
    onNextStep();
  }, [onNextStep]);

  useEffect(() => {
    /* istanbul ignore else */
    if (hasChanges && state.show) setState({ show: false, action: null });
  }, [hasChanges, state.show, setState]);

  useEffect(() => {
    /* istanbul ignore else */
    if (loadSuccess) setState({ show: true, action: ActionType.SAVE });
  }, [loadSuccess]);

  return (
    <Grid container={true} className={`${classes.panelContainer}`}>
      <Grid item={true} xs={12} md={6} className={classes.step}>
        <div className={classes.stepWrapper}>
          <Link className={classes.stepLink} to={breadCrumb.route}>
            {breadCrumb.title}
          </Link>
          <span className={classes.stepLinkSeparator}>{'>'}</span>
          {entityName || step.subtitle}
        </div>
        <Typography className={classes.title} color="primary" align="left" component="h1" variant="h5">
          {`${step.order + 1}. ${step?.title}`}
        </Typography>
      </Grid>
      <Grid item={true} xs={12} md={6} className={classes.actionButtons}>
        {!step.hideControls && (
          <>
            {(hasChanges || isSaveLoading) && (
              <Grid container={true} spacing={1} className={classes.actionButtons}>
                <Grid item={true}>
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
                </Grid>
                <Grid item={true}>
                  <ControlledButton>
                    <ButtonLoader
                      data-testid="save-changes-btn"
                      color="primary"
                      className={classes.saveButton}
                      variant={'outlined'}
                      isLoading={isSaveLoading}
                      text={LANG.EN.NAVIGATION_TOP.ACTIONS.SAVE}
                      loadingText={LANG.EN.NAVIGATION_TOP.ACTIONS.SAVING}
                      onClick={onSaveHandler}
                      disabled={isSaveLoading}
                    />
                  </ControlledButton>
                </Grid>
              </Grid>
            )}
            {!hasChanges && state.show && !isSaveLoading && (
              <Typography variant="caption" className={classes.savedAt}>
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
            {!hasChanges && !isSaveLoading && (
              <ControlledButton>
                <Button
                  data-testid="next-changes-btn"
                  className={classes.nextButton}
                  color="primary"
                  variant="contained"
                  fullWidth={true}
                  size="large"
                  onClick={onNextHandler}
                >
                  {LANG.EN.NAVIGATION_TOP.ACTIONS.NEXT}
                </Button>
              </ControlledButton>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(Header);
