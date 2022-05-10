import React, { memo, ReactNode } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { CloseIcon } from '../../../../../constants';
import { useStyles } from './styles';

export interface IDrawerProps {
  title: string;
  height: number;
  isOpen: boolean;
  isLoading: boolean;
  dataTestId?: string;
  render: () => ReactNode;
  onClose: () => void;
}

const ControlledDrawer = ({ title, height, isOpen, isLoading, dataTestId = 'drawer', render, onClose }: IDrawerProps) => {
  const classes = useStyles({ height: height ?? '100%' });
  return (
    <Drawer
      data-testid={dataTestId}
      className={`${classes.drawer} ${isOpen ? 'open' : classes.close + ' closed'}`}
      variant="persistent"
      anchor="right"
      open={isOpen}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerButtonWrapper}>
        <div className={classes.drawerButton}>
          <Button style={{ outline: 'none' }} data-testid="drawer-close-btn" onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <div className={classes.drawerHeader}>
          <Typography className={classes.drawerTitle} color="primary" align="left">
            {title}
          </Typography>
        </div>
      </div>

      {isLoading ? <div>Loading...</div> : render()}
    </Drawer>
  );
};

export default memo(ControlledDrawer);
