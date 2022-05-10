import React, { memo, useState, useCallback, useEffect } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import procoreLogo from '../../../../../../assets/images/procore.logo.png';
import { useStyles } from './styles';
import DisconnectModal from './components/DisconnectModal';
import ProcoreWatchTutorialModal from './components/ProcoreWatchTutorialModal';
import ProcoreConnectModal from './components/ProcoreConnectModal';
import { FormRules } from '../../../../../../constants';
import { useForm } from '../../../../../../utils/useForm';

interface IIntegrationsTab {
  status: { isConnected: boolean };
  getStatusProcore: () => void;
  connectProcore: (data) => void;
  disconnectProcore: () => void;
  saveProcoreLoading: any;
}

const IntegrationsTab = ({ status, getStatusProcore, connectProcore, saveProcoreLoading, disconnectProcore }: IIntegrationsTab) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenWatchTutorial, setModalOpenWatchTutorial] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);

  const handleConnectButton = (isOpen: boolean) => {
    if (status.isConnected) {
      setIsDisconnectModalOpen(true);
    } else {
      model.clientID = '';
      model.clientSecret = '';
      setModalOpen(isOpen);
    }
  };

  const handleWatchTutorial = (isOpen: boolean) => setModalOpenWatchTutorial(isOpen);

  const closeConnectModal = () => setModalOpen(false);

  const closeDisconnectModal = () => setIsDisconnectModalOpen(false);

  const { model, formRules, errors, onChange, onSubmit, resetErrors, hasChanges } = useForm({
    initValues: FormRules.account.getProcoreInitialData(),
    formRules: FormRules.account.connectProcoreRules,
    onSubmitCallback: () => {
      resetErrors();
    },
  });

  useEffect(() => {
    getStatusProcore();
  }, [getStatusProcore]);

  useEffect(() => {
    if (status.isConnected) {
      setModalOpen(false);
    } else {
      setIsDisconnectModalOpen(false);
    }
  }, [status.isConnected]);

  const onSubmitHandler = useCallback(
    modelSubmitted => {
      onSubmit();
      if (model.clientID === '' || model.clientSecret === '') {
        return;
      }
      resetErrors();
      connectProcore(modelSubmitted);
    },
    [onSubmit, connectProcore, resetErrors, model.clientID, model.clientSecret]
  );

  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prev => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );
  const colorClassesButton = !status.isConnected ? `${classes.primaryColor}` : `${classes.deleteColor}`;
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div className={`${classes.containerLogo}`}>
            <img src={procoreLogo} className={`${classes.logo}`} alt="logo-procore" />
          </div>
          <Typography className={classes.title}>Procore</Typography>
          <Typography className={classes.body}>
            This Integration allows you to <br />
            Synchronize information between Procore and <br />
            FC Analytics in an Easy way.
          </Typography>
        </CardContent>
        <CardActions>
          <div className={classes.containerButtons}>
            <Button
              disableRipple={true}
              variant="outlined"
              data-testid="watch-tutorial-button"
              color="primary"
              onClick={() => handleWatchTutorial(true)}
              className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge} ${classes.marginButtons}`}
            >
              Watch Tutorial
            </Button>
            <Button
              variant="contained"
              data-testid="connect-button"
              className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge} ${classes.marginButtons} ${buttonClasses.primaryButtonDisableHover} ${colorClassesButton}`}
              onClick={() => handleConnectButton(true)}
            >
              {status.isConnected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        </CardActions>
      </Card>
      <ProcoreConnectModal
        closeConnectModal={closeConnectModal}
        show={isModalOpen}
        model={model}
        formRules={formRules}
        errors={errors}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        hasChanges={hasChanges}
        saveProcoreLoading={saveProcoreLoading}
      />
      <DisconnectModal show={isDisconnectModalOpen} onClose={closeDisconnectModal} onDisconnect={disconnectProcore} />
      <ProcoreWatchTutorialModal show={isModalOpenWatchTutorial} handleWatchTutorial={handleWatchTutorial} />
    </>
  );
};
export default memo(IntegrationsTab);
