import React from 'react';
import { Button, Typography } from '@material-ui/core';

import Modal from 'modules/views/shared/Modal/NewModal';

import { useStyles } from './styles';

interface IProps {
  onClose: () => void;
  show: boolean;
}

const TaxpayerIdHelperModal = ({ onClose, show }: IProps) => {
  const classes = useStyles();
  return (
    <Modal show={show} styleClass={classes.taxpayerFormatDialog} onClose={onClose} title="Taxpayer ID Number format">
      <Typography className={classes.subtitle}>Taxpayer ID Number formats allowed:</Typography>
      <div className={classes.formatsWrapper}>
        <Typography>United States: 99-9999999 or 999-99-9999</Typography>
        <Typography>Canada: 99-9999999 or 999-99-9999</Typography>
        <Typography>Mexico: AAAA-999999-999</Typography>
        <Typography>Puerto Rico: 99-9999999 or 999-99-9999</Typography>
      </div>
      <Button className={classes.closeDialogButton} onClick={onClose} variant="contained" color="primary">
        Close
      </Button>
    </Modal>
  );
};

export default TaxpayerIdHelperModal;
