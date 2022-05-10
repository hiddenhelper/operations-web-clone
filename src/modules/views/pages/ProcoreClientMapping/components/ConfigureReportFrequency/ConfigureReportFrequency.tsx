import React, { useState, memo, useEffect, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { toREM } from 'utils/generalUtils';
import { GeneralModel } from 'modules/models';
import Modal from 'modules/views/shared/Modal';
import Confirm from 'modules/views/shared/Modal/components/Confirm';
import { useStylesModalCards } from 'modules/views/shared/PaymentMethods/styles';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    text: {
      fontSize: toREM(15),
      fontWeight: 600,
      color: '#444444',
      lineHeight: toREM(24),
      paddingRight: toREM(14),
      textTransform: 'capitalize',
    },
    icon: {
      color: '#878787',
    },
  })
);

const useCustomModalStyles = makeStyles(theme =>
  // TODO: those styles needs to be migrated to a shared compoennt. Shared comoponent needs a refactor soon.
  createStyles({
    title: {
      '& .MuiPaper-root': {
        padding: '20px 20px 16px 20px',
      },
      '& .MuiDialogTitle-root > .MuiTypography-root': {
        height: toREM(32),
        color: 'rgba(0,0,0,0.9)',
        fontFamily: 'Hind',
        fontSize: toREM(20),
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: toREM(32),
        marginBottom: '8px',
      },
      '& .MuiDialogTitle-root': {
        padding: 0,
      },
      '& .MuiDialogContent-root': {
        padding: 0,
      },
      '& .MuiDialogActions-root .MuiGrid-root .MuiGrid-root:last-child .MuiButtonBase-root': {
        width: '120px',
      },
      '& .MuiDialogActions-root': {
        padding: 0,
      },
    },
    subTitle: {
      height: toREM(46),
      color: '#999999',
      fontFamily: 'Hind',
      fontSize: toREM(15),
      letterSpacing: 0,
      lineHeight: toREM(23),
      marginBotton: toREM(20),
    },
    selectLabel: {
      '& .MuiTypography-root': {
        height: toREM(24),
        color: '#444444',
        fontFamily: 'Hind',
        fontSize: toREM(15),
        letterSpacing: 0,
        lineHeight: toREM(24),
      },
    },
  })
);

export interface IConfigureReportFrequencyProps {
  procoreReportFrequency?: number;
  handleSaveProcoreReportFrequency: (frequency: number) => void;
  procoreSaveReportFrequencyLoading: GeneralModel.ILoadingStatus;
  className?: string;
}

const ConfigureReportFrequency = ({
  procoreReportFrequency,
  handleSaveProcoreReportFrequency,
  procoreSaveReportFrequencyLoading,
  className,
}: IConfigureReportFrequencyProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [frequencySelected, setFrequencySelected] = useState(1);

  const classes = useStyles();
  const modalClasses = useStylesModalCards();
  const customModalClasses = useCustomModalStyles();

  const frequencies = [
    { value: 0, label: 'Daily' },
    { value: 1, label: 'Daily / Hourly' },
  ];

  const frequencySelectedName = frequencies.find(frequency => frequency.value === procoreReportFrequency);

  useEffect(() => {
    setFrequencySelected(procoreReportFrequency);
  }, [procoreReportFrequency]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = useCallback(() => setShowModal(() => false), [setShowModal]);

  const handleChangeReportFrequency = /* istanbul ignore next */ e => {
    setFrequencySelected(e.target.value);
  };

  const handleSubmitReportFrequency = () => {
    handleSaveProcoreReportFrequency(frequencySelected);
    handleCloseModal();
  };

  return (
    <>
      <div data-testid="action-configure-report-frequency-container" className={`${classes.container} ${className}`} onClick={handleOpenModal}>
        <span className={classes.text}>
          {procoreSaveReportFrequencyLoading?.isLoading && 'Saving...'}
          {procoreSaveReportFrequencyLoading?.hasError && 'Error Saving'}
          {!procoreSaveReportFrequencyLoading?.isLoading && frequencySelectedName?.label}
        </span>
        <CreateIcon height="18px" className={classes.icon} />
      </div>
      <Modal
        show={showModal}
        styleClass={customModalClasses.title}
        onClose={handleCloseModal}
        render={() => (
          <Confirm
            title="Change Frequency"
            closeLabel="Close"
            confirmLabel="Save"
            onConfirm={handleSubmitReportFrequency}
            onClose={handleCloseModal}
            isLoading={procoreSaveReportFrequencyLoading?.isLoading || false}
            confirmLoadingText="Saving..."
            content={
              <div className={`${modalClasses.replaceModal}`}>
                <Typography className={`${modalClasses.replaceModalText} ${customModalClasses.subTitle}`}>
                  Select the Timeframe in which the Manpower information is sent to Procore.
                </Typography>
                <ControlledInput label="Frequency" styleClass={customModalClasses.selectLabel}>
                  <ControlledSelect
                    name="select-report-frequency"
                    inputProps={{
                      'data-testid': 'select-report-frequency',
                    }}
                    options={frequencies}
                    onChange={handleChangeReportFrequency}
                    disabled={false}
                    value={frequencySelected}
                  />
                </ControlledInput>
              </div>
            }
          />
        )}
      />
    </>
  );
};

export default memo(ConfigureReportFrequency);
