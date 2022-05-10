import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { useStyles } from '../../style';

export interface IAlertProps {
  title: string;
  content: string;
  btnLabel: string;
  onClick: () => void;
}

const Alert = ({ title, content, btnLabel, onClick }: IAlertProps) => {
  const classes = useStyles();
  return (
    <>
      <DialogTitle data-testid="alert-dialog" id="alert-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container={true} className={classes.buttonsWrapper}>
          <Grid item={true}>
            <Button className={classes.primaryButton} data-testid="confirm-button" onClick={onClick} color="primary" variant="contained">
              {btnLabel}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default memo(Alert);
