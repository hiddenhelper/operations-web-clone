import React, { memo } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Modal from '../../Modal';
import ButtonLoader from '../../../ButtonLoader';

import { useStyles } from '../../../ResourceManagement/StepEditor/styles';
import { useStyles as buttonStyles } from '../../../FormHandler/ControlledButton/styles';

export interface IFormModalProps {
  open: boolean;
  isLoading: boolean;
  hasChanges: boolean;
  confirmLabel?: string;
  confirmLoadingLabel?: string;
  styleClass: string;
  showHasChanges?: boolean;
  isButtonDisabled?: boolean;
  fullScreen?: boolean;
  renderHeader: (data: any) => void;
  renderContent: (data: any) => void;
  handleSubmit: (data: any) => void;
  handleClose: () => void;
  handleDiscard?: () => void;
}

const FormDialog = ({
  open,
  hasChanges,
  isLoading,
  confirmLabel = 'Save Changes',
  confirmLoadingLabel = 'Saving...',
  showHasChanges = true,
  isButtonDisabled = false,
  fullScreen = false,
  styleClass,
  renderHeader,
  renderContent,
  handleSubmit,
  handleClose,
  handleDiscard,
}: IFormModalProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  return (
    <Modal
      show={open}
      fullScreen={fullScreen}
      styleClass={styleClass}
      onClose={handleClose}
      render={() => (
        <>
          {renderHeader({ handleClose, handleSubmit, handleDiscard })}
          {renderContent({ handleClose, handleSubmit, handleDiscard })}
          <DialogActions className={classes.buttonsContainer}>
            <Button className={classes.closeButton} onClick={handleClose} color="primary" data-testid="form-dialog-close">
              Close
            </Button>
            {showHasChanges && (hasChanges || isLoading) && (
              <Button className={classes.discardButton} onClick={handleDiscard} color="primary" data-testid="form-dialog-discard" disabled={isLoading}>
                Discard Changes
              </Button>
            )}
            <ButtonLoader
              className={`${buttonClasses.saveButton} saveButton`}
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              disabled={isButtonDisabled || (showHasChanges && !hasChanges)}
              data-testid="form-dialog-save"
              text={confirmLabel}
              loadingText={confirmLoadingLabel}
              isLoading={isLoading}
            />
          </DialogActions>
        </>
      )}
    />
  );
};

export default memo(FormDialog);
