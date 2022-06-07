import React, { memo } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ButtonLoader from '../../../ButtonLoader';
import Modal from '../../Modal';

import { tableGlobalStyles } from '../../../../../../assets/styles/Tables/styles';
import { modalGlobalStyles } from '../../../../../../assets/styles/Modals/styles';
import { useStyles } from './styles';
import { InfoIcon } from '../../../../../../constants';

export interface IAssignModal {
  title: string;
  loading: boolean;
  confirmLabel: string;
  confirmLoadingLabel: string;
  isConfirmEnabled: boolean;
  modalRef?: any;
  hideOverflow?: string;
  closeLabel?: string;
  styleClass?: string;
  titleAdditionalText?: string;
  onClose: () => void;
  onSubmit: (event?: any) => void;
  render: () => React.ReactNode;
}

const AssignModal = ({
  title,
  loading,
  closeLabel = 'Close',
  confirmLabel,
  confirmLoadingLabel,
  modalRef,
  isConfirmEnabled,
  hideOverflow = '',
  styleClass = '',
  titleAdditionalText,
  render,
  onClose,
  onSubmit,
}: IAssignModal) => {
  const tableGlobalClasses = tableGlobalStyles();
  const modalGlobalClasses = modalGlobalStyles();
  const classes = useStyles();
  return (
    <Modal
      show={true}
      classes={{ root: `${classes.modalWrapper} ${styleClass}`, paper: classes.dialogPaper }}
      onClose={onClose}
      render={() => (
        <>
          <DialogTitle className={classes.titleContainer} disableTypography={true} id="alert-dialog-title">
            <Typography className={modalGlobalClasses.title} color="secondary" align="left" component="h1" variant="h6">
              {title}
            </Typography>
            {titleAdditionalText && (
              <Typography className={modalGlobalClasses.headerAdditionalInfo} color="secondary" align="left">
                <InfoIcon /> <span className={modalGlobalClasses.headerAdditionalInfoLabel}>{titleAdditionalText}</span>
              </Typography>
            )}
          </DialogTitle>
          <DialogContent
            ref={modalRef}
            dividers={true}
            className={`${tableGlobalClasses.tableWrapper} ${hideOverflow} ${tableGlobalClasses.tableBackground} ${classes.assignTableSpacing}`}
          >
            {render()}
          </DialogContent>
          <DialogActions className={classes.buttonsContainer}>
            <Button className={`${classes.closeButton} ${classes.boldButton}`} onClick={onClose} color="primary" data-testid="assign-btn-close">
              {closeLabel}
            </Button>
            {confirmLabel && (
              <ButtonLoader
                className={`${classes.saveButton} ${classes.assignButtonWidth} ${classes.assignButtonRightSpace}`}
                onClick={onSubmit}
                color="primary"
                variant="contained"
                disabled={!isConfirmEnabled}
                data-testid="assign-btn-confirm"
                text={confirmLabel}
                loadingText={confirmLoadingLabel}
                isLoading={loading}
              />
            )}
          </DialogActions>
        </>
      )}
    />
  );
};

export default memo(AssignModal);
