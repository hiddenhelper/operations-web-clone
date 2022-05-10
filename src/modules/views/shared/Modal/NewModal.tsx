import React, { memo, useEffect, FunctionComponent } from 'react';
import { Dialog, DialogTitle, Typography } from '@material-ui/core';
import { useStyles } from './newModalStyles';
import { useHideScroll } from '../../../../utils/useHideScroll';

export interface IModalProps {
  show: boolean;
  fullScreen?: boolean;
  styleClass?: string;
  classes?: any;
  onClose?: () => void;
  title?: string;
  children?: React.ReactChild | React.ReactChild[];
}

const NewModal: FunctionComponent<IModalProps> = ({ show, styleClass = '', classes = {}, fullScreen = false, onClose, title, children }) => {
  const modalClasses = useStyles();
  const { setHideScroll } = useHideScroll();

  useEffect(() => {
    setHideScroll(show);
  }, [show, setHideScroll]);

  return (
    <Dialog
      open={show}
      fullScreen={fullScreen}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      data-testid="modal-dialog"
      classes={{ ...classes, ...modalClasses }}
      className={styleClass}
      style={{ zIndex: 1000 }}
      onClose={onClose}
    >
      {title && (
        <DialogTitle disableTypography={true} data-testid="modal-title" id="alert-dialog-title">
          <Typography color="secondary" align="left" component="h1" variant="h6">
            {title}
          </Typography>
        </DialogTitle>
      )}
      {children}
    </Dialog>
  );
};

export default memo(NewModal);
