import React, { memo, useCallback, useMemo } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import StepLabel from '@material-ui/core/StepLabel';
import withStyles from '@material-ui/core/styles/withStyles';

import ControlledButton from '../../FormHandler/ControlledButton';
import StepIcon from './StepIcon';

import { IStep } from '../../../../models/general';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { stepperConnectorStyles, useStepStyles } from './styles';

export interface IProcessOverviewProps {
  completedFields: object;
  currentStep: IStep;
  onChangeStep: (key: string) => void;
}

const StepperConnector = withStyles(stepperConnectorStyles)(StepConnector);

const ProcessOverview = ({ completedFields, currentStep, onChangeStep }: IProcessOverviewProps) => {
  const classes = useStepStyles();
  const completedFieldList = useMemo(() => Object.entries(completedFields).sort((a, b) => a[1].order - b[1].order), [completedFields]);
  const onStepClick = useCallback((key: string) => onChangeStep(key), [onChangeStep]);

  return (
    <div className={classes.processOverviewContainer}>
      <Typography className={classes.processOverviewTitle}>Progress:</Typography>
      <Stepper nonLinear={true} orientation="vertical" connector={<StepperConnector />} className={classes.stepperContainer}>
        {completedFieldList.map(([key, step]) => {
          const active = key === currentStep.key;
          const hasRequired = step.required > 0;
          const completed = hasRequired && step.required === step.completed;
          const started = hasRequired && step.completed > 0;
          return (
            <Step key={key} className={classes.step}>
              <ControlledButton>
                <StepButton
                  data-testid="step-button"
                  onClick={() => onStepClick(key)}
                  icon={<StepIcon active={active} completed={completed} started={started} />}
                  className={classes.stepButton}
                >
                  <StepLabel className={classes.label} classes={{ iconContainer: classes.iconContainer }}>
                    <Typography
                      className={`${classes.typography} ${getConditionalDefaultValue(completed, classes.completed, '')} ${getConditionalDefaultValue(
                        active,
                        classes.active,
                        ''
                      )}`}
                    >
                      <span>{step.title}</span>
                      {hasRequired && <span>{hasRequired && `${step.completed}/${step.required}`}</span>}
                    </Typography>
                  </StepLabel>
                </StepButton>
              </ControlledButton>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default memo(ProcessOverview);
