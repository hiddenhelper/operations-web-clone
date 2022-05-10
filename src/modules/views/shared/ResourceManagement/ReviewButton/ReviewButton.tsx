import React, { memo, useCallback } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';

import ControlledButton from '../../FormHandler/ControlledButton';

import { LANG } from '../../../../../constants';
import { useStyles } from './styles';

export interface IReviewActionButtonProps {
  stepKey: string;
  completedFields?: any;
  alternativeLabel?: string;
  onChangeStep: (key: string) => void;
}

const ReviewActionButton = ({ stepKey, completedFields, alternativeLabel, onChangeStep }: IReviewActionButtonProps) => {
  const classes = useStyles();
  let missingLabel = '';
  let missingFieldsButtonClassname = '';
  if (completedFields) {
    const { required, completed } = completedFields;
    const hasMissingFields = required > completed;
    missingLabel = hasMissingFields ? LANG.EN.FIELDS.INCOMPLETE + (alternativeLabel ? `. ${alternativeLabel}` : '') : LANG.EN.FIELDS.COMPLETE;
    missingFieldsButtonClassname = hasMissingFields ? `${classes.fieldWrapper} ${classes.fieldsMissing}` : `${classes.fieldWrapper} ${classes.fieldsCompleted}`;
  }

  const onClick = useCallback(() => {
    onChangeStep(stepKey);
  }, [onChangeStep, stepKey]);

  return (
    <ControlledButton>
      <Button className={missingFieldsButtonClassname} disableRipple={true} onClick={onClick} data-testid="missing-fields-btn" endIcon={<CreateIcon />}>
        {missingLabel}
      </Button>
    </ControlledButton>
  );
};

export default memo(ReviewActionButton);
