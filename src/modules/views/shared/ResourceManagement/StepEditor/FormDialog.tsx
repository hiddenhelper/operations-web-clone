import React, { memo } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonLoader from '../../ButtonLoader';

import { useStyles } from './styles';
import { useStyles as buttonStyles } from '../../../shared/FormHandler/ControlledButton/styles';

export interface IFormDialogProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  hasChanges: boolean;
  isLoading: boolean;
  confirmLabel?: string;
  confirmLoadingLabel?: string;
  styleClasses?: Object;
  styleClass?: string;
  showHasChanges?: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
  handleDiscard: () => void;
}

const FormDialog = ({
  children,
  open,
  title,
  hasChanges,
  isLoading,
  confirmLabel = 'Save Changes',
  confirmLoadingLabel = 'Saving...',
  styleClasses = {},
  styleClass = '',
  showHasChanges = true,
  handleSubmit,
  handleClose,
  handleDiscard,
}: IFormDialogProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{ paper: classes.dialogPaper, ...styleClasses }}
      className={styleClass}
      style={{ zIndex: 1000 }}
      onClose={handleClose}
    >
      <DialogTitle id="scroll-dialog-title" className={classes.titleContainer} disableTypography={true}>
        <Typography className={classes.title} color="secondary" align="left" component="h1" variant="h6">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true} className={`${classes.contentContainer} contentContainer`}>
        {children}
      </DialogContent>
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
          disabled={showHasChanges && !hasChanges}
          data-testid="form-dialog-save"
          text={confirmLabel}
          loadingText={confirmLoadingLabel}
          isLoading={isLoading}
        />
      </DialogActions>
    </Dialog>
  );
};

export default memo(FormDialog);
