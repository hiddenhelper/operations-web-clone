import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import ButtonLoader from '../../../ButtonLoader';
import ControlledButton from '../../../FormHandler/ControlledButton';

import { getConditionalDefaultValue, getDefaultValue } from '../../../../../../utils/generalUtils';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../../style';

export interface IConfirmProps {
  title: string;
  backgroundTitle?: boolean;
  content: React.ReactNode;
  backgroundContent?: string;
  secondaryActionText?: string;
  closeLabel: string;
  isLoading?: boolean;
  confirmLabel: string;
  backgroundButtonWrapper?: boolean;
  confirmLoadingText?: string;
  confirmButtonStyleClass?: string;
  disableConfirm?: boolean;
  onConfirm: () => void;
  onClose?: () => void;
  secondaryAction?: () => void;
}

const Confirm = ({
  title,
  backgroundTitle = false,
  content,
  backgroundContent,
  closeLabel,
  confirmLabel,
  confirmLoadingText = '',
  isLoading = false,
  backgroundButtonWrapper = false,
  confirmButtonStyleClass,
  disableConfirm = false,
  secondaryActionText,
  onClose,
  onConfirm,
  secondaryAction,
}: IConfirmProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  return (
    <>
      <DialogTitle
        data-testid="confirm-modal-title"
        id="confirm-dialog-title"
        className={`${getConditionalDefaultValue(backgroundTitle, classes.backgroundModal + ' ' + classes.backgroundTitle, '')} ${classes.title}`}
      >
        {title}
      </DialogTitle>
      <DialogContent className={getDefaultValue(backgroundContent, '')}>{content}</DialogContent>
      <DialogActions className={getConditionalDefaultValue(backgroundButtonWrapper, `${classes.backgroundModal} ${classes.buttonWrapper}`, '')}>
        <Grid container={true} justify="space-between">
          <Grid item={true}>
            <ControlledButton>
              <Button className={classes.closeButtonFont} data-testid="modal-close-btn" onClick={onClose} color="primary">
                {closeLabel}
              </Button>
            </ControlledButton>
          </Grid>
          <Grid item={true}>
            {secondaryAction && (
              <Button className={classes.secondaryButton} onClick={secondaryAction} color="primary" data-testid="form-dialog-secondary" disabled={isLoading}>
                {secondaryActionText}
              </Button>
            )}
            <ControlledButton>
              <ButtonLoader
                data-testid="modal-confirm-btn"
                className={`${getDefaultValue(confirmButtonStyleClass, '')} ${buttonClasses.saveButton}`}
                onClick={onConfirm}
                color="primary"
                variant="contained"
                text={confirmLabel}
                loadingText={confirmLoadingText}
                isLoading={isLoading}
                disabled={disableConfirm}
              />
            </ControlledButton>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default memo(Confirm);
