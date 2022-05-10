import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { useStyles } from '../../style';

export interface IDeleteProps {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  text?: string;
  confirmLoadingText?: string;
  isLoading?: boolean;
}

const Delete = ({ title, onConfirm, onCancel, text, confirmLoadingText, isLoading }: IDeleteProps) => {
  const classes = useStyles();
  return (
    <>
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text && `${text}`}
          {!text && 'If you do it, all the information entered will be lost.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container={true}>
          <Grid item={true} xs={3} className={classes.cancelButtonWrapper}>
            <Button className={classes.closeButton} data-testid="cancel-button" onClick={onCancel} color="primary" disabled={!!isLoading}>
              Close
            </Button>
          </Grid>
          <Grid item={true} xs={9} className={classes.buttonsWrapper}>
            <Button
              className={classes.primaryButton}
              data-testid="confirm-button"
              onClick={onConfirm}
              color="primary"
              variant="contained"
              disabled={!!isLoading}
            >
              {!isLoading && 'Yes, Delete'}
              {isLoading && confirmLoadingText}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default memo(Delete);
