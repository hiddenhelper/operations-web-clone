import React from 'react';
import { Button, Typography, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Modal from '../../../../../shared/Modal';
import { modalStylesDisconnect } from '../styles';

interface IDisconnectModal {
  onClose: () => void;
  onDisconnect: () => void;
  show: boolean;
}

export default function DisconnectModal({ show, onClose, onDisconnect }: IDisconnectModal) {
  const styles = modalStylesDisconnect();
  return (
    show && (
      <Modal
        onClose={onClose}
        show={true}
        styleClass={`${styles.root}`}
        render={() => (
          <>
            <DialogTitle>
              <div className={`${styles.title}`}>Are you sure you want to disconnect?</div>
            </DialogTitle>
            <DialogContent>
              <Typography className={`${styles.body}`}>If you confirm this action, information in FC Analytics will not be sent to Procore.</Typography>
            </DialogContent>
            <DialogActions className={styles.actions}>
              <Button color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" data-testid="disconnect-button" onClick={onDisconnect}>
                Yes, Confirm
              </Button>
            </DialogActions>
          </>
        )}
      />
    )
  );
}
