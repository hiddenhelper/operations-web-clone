import React, { memo, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import { useStyles } from './style';
import { useHideScroll } from '../../../../utils/useHideScroll';

export interface IModalProps {
  show: boolean;
  fullScreen?: boolean;
  styleClass?: string;
  classes?: any;
  onClose?: () => void;
  render: () => React.ReactNode;
}

const Modal = ({ show, styleClass = '', classes = {}, fullScreen = false, render, onClose }: IModalProps) => {
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
      classes={{ ...classes, root: `${modalClasses.root} ${classes.root ? classes.root : ''}` }}
      className={styleClass}
      style={{ zIndex: 1000 }}
      onClose={onClose}
    >
      {render()}
    </Dialog>
  );
};

export default memo(Modal);
