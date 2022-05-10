import React, { memo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Card, DialogContent, DialogActions } from '@material-ui/core';
import { buttonsGlobalStyles } from 'assets/styles';
import { STYLE } from '../../../../../../../constants';
import { ControlledInput, ControlledError, ButtonLoader, NewModal } from 'modules/views/shared';
import { getConditionalDefaultValue, getDefaultValue, toREM, IFormRules } from 'utils';
import { IProcoreClientSecrets } from 'modules/models/user';

interface IConnectModal {
  show: boolean;
  model: IProcoreClientSecrets;
  formRules: IFormRules;
  errors: any;
  onChange: (model: any) => void;
  closeConnectModal: () => void;
  onSubmit: (model) => void;
  hasChanges: boolean;
  saveProcoreLoading: any;
}

const customStyles = makeStyles(theme =>
  createStyles({
    dialogContent: {
      '&.MuiDialogContent-root': {
        padding: `${toREM(32)} ${toREM(40)}`,
      },
    },
    cardContent: {
      maxWidth: toREM(960),
      margin: 'auto',
      height: toREM(317),
      padding: `1em ${toREM(40)}`,
      boxShadow: '0px 2px 6px 0px rgb(0 0 0 / 3%)',
      border: '1px solid #E5E5E5',
      borderRadius: '5px',
    },
    subTitle: {
      borderBottom: '1px solid #CCC',
      marginBottom: toREM(40),
      '& h1': {
        fontSize: toREM(24),
        fontWeight: 'bold',
        color: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPositionProcore: {
      bottom: 'unset',
    },
    secretInput: {
      marginTop: toREM(25),
    },
    inputLabel: {
      '& .MuiTypography-root': {
        height: toREM(24),
        color: STYLE.COLOR.SECONDARY_DARKER,
        fontFamily: 'Hind',
        fontSize: toREM(15),
        letterSpacing: 0,
        lineHeight: toREM(24),
        fontWeight: 'normal',
      },
    },
  })
);

const ProcoreConnectModal = ({ show, errors, model, formRules, onChange, onSubmit, closeConnectModal, hasChanges, saveProcoreLoading }: IConnectModal) => {
  const buttonStyles = buttonsGlobalStyles();
  const customModalStyles = customStyles();
  const handleCloseModal = () => {
    onSubmit(model);
  };

  const handlerCloseConnectModal = () => {
    closeConnectModal();
  };

  return (
    <NewModal show={show} title="Connect with Procore">
      <DialogContent className={customModalStyles.dialogContent}>
        <Card className={customModalStyles.cardContent}>
          <Grid>
            <Grid>
              <div className={customModalStyles.subTitle}>
                <h1>Service Accounts Information</h1>
              </div>
              <Grid item={true}>
                <div className={customModalStyles.errorInputWrapper}>
                  <ControlledError
                    show={!!errors.clientID}
                    error={getConditionalDefaultValue(errors.clientID === 'is required', 'ClientID is required.', errors.clientID)}
                    styleClass={customModalStyles.errorPositionProcore}
                  >
                    <ControlledInput label="Client ID" styleClass={`${customModalStyles.inputLabel}`}>
                      <TextField
                        variant="outlined"
                        type="text"
                        fullWidth={true}
                        autoComplete="off"
                        name="clientID"
                        error={!!errors.clientID}
                        value={getDefaultValue(model.clientID, '')}
                        onChange={onChange}
                        required={formRules.clientID.required}
                        inputProps={{
                          'data-testid': 'client-id-input',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
              </Grid>
              <Grid item={true}>
                <div className={customModalStyles.errorInputWrapper}>
                  <ControlledError
                    show={!!errors.clientSecret}
                    error={getConditionalDefaultValue(errors.clientSecret === 'is required', 'Client Secret is required.', errors.clientSecret)}
                    styleClass={customModalStyles.errorPositionProcore}
                  >
                    <ControlledInput label="Client Secret" styleClass={`${customModalStyles.secretInput} ${customModalStyles.inputLabel}`}>
                      <TextField
                        variant="outlined"
                        type="text"
                        fullWidth={true}
                        autoComplete="off"
                        name="clientSecret"
                        error={!!errors.clientSecret}
                        value={getDefaultValue(model.clientSecret, '')}
                        onChange={onChange}
                        required={formRules.clientSecret.required}
                        inputProps={{
                          'data-testid': 'client-secret-input',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </DialogContent>
      <DialogActions>
        <Grid container={true} justify="space-between">
          <Grid item={true}>
            <Button variant="contained" data-testid="close-procore" color="primary" className={`${buttonStyles.regular}`} onClick={handlerCloseConnectModal}>
              Close
            </Button>
          </Grid>
          <Grid item={true}>
            <ButtonLoader
              text={'Connect'}
              loadingText={'Connecting...'}
              isLoading={saveProcoreLoading?.isLoading}
              data-testid="connect-procore"
              className={`${buttonStyles.regular}`}
              color="primary"
              variant="contained"
              size="large"
              disabled={!hasChanges}
              onClick={handleCloseModal}
            />
          </Grid>
        </Grid>
      </DialogActions>
    </NewModal>
  );
};

export default memo(ProcoreConnectModal);
