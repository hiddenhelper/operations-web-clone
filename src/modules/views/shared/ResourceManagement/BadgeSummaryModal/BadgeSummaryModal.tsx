import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Modal from '../../Modal';
import Confirm from '../../Modal/components/Confirm';
import FormModal from '../../Modal/components/FormModal';
import ControlledError from '../../FormHandler/ControlledError';
import ControlledInput from '../../FormHandler/ControlledInput';
import ButtonPrinter from '../../ButtonPrinter';
import BadgeTab from './components/BadgeTab';
import BadgeHistoryTab from './components/BadgeHistoryTab';
import ControlledMaskInput from '../../FormHandler/ControlledMaskInput';

import { BadgeModel, GeneralModel } from '../../../../models';
import { getConditionalDefaultValue, getDefaultValue, TAG_ID_MASK } from '../../../../../utils/generalUtils';
import { useForm } from '../../../../../utils/useForm';
import { useStyles as buttonStyles } from '../../FormHandler/ControlledButton/styles';
import { useStyles as inputStyles } from '../../FormHandler/ControlledInput/styles';
import { tableGlobalStyles } from '../../../../../assets/styles/Tables/styles';
import { modalGlobalStyles } from '../../../../../assets/styles/Modals/styles';
import { useStyles as modalStyles } from '../../Modal/style';
import { useStyles } from './styles';
import { validateBadgeTagId } from '../../../../../utils/projectUtils';
import { ruleMap } from 'utils/useValidator';

export interface IBadgeSummaryModalProps {
  title: string;
  currentBadge: BadgeModel.IBadge;
  modal: any;
  badgeModalContent: any;
  currentBadgeForm?: any;
  badgeStatusOptionList?: { key: BadgeModel.BadgeStatus; title: string; callback?: () => void }[];
  badgeLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  updateBadgeDataLoading?: GeneralModel.ILoadingStatus;
  printLoading: GeneralModel.ILoadingStatus;
  isDeactivated: boolean;
  isBadgePending: boolean;
  isReactivateAllowed?: boolean;
  isVisitor: boolean;
  clearUpdateLoading: () => void;
  clearUpdateBadgeLoading?: () => void;
  closeModal: () => void;
  clearBadge: () => void;
  onModalConfirm?: (reason: string, currentBadgeForm: any) => void;
  onModalClose?: () => void;
  onResetModal?: () => void;
  updateBadge?: (id: string, badge: BadgeModel.IBadgeUpdateRequest) => void;
  onPrint: () => void;
}

enum BadgeTabLink {
  PROJECT_BADGE = 'project-badge',
  BADGE_HISTORY = 'badge-history',
}

const badgeTabList = [
  { key: BadgeTabLink.PROJECT_BADGE, title: 'Project Badge' },
  { key: BadgeTabLink.BADGE_HISTORY, title: 'Badge History' },
];

const BadgeSummaryModal = ({
  title,
  currentBadge,
  modal,
  badgeModalContent,
  badgeStatusOptionList,
  badgeLoading,
  printLoading,
  updateLoading,
  updateBadgeDataLoading,
  isDeactivated,
  isReactivateAllowed = true,
  isBadgePending,
  isVisitor,
  currentBadgeForm,
  updateBadge,
  onModalClose,
  onModalConfirm,
  clearUpdateLoading,
  clearUpdateBadgeLoading,
  closeModal,
  clearBadge,
  onResetModal,
  onPrint,
}: IBadgeSummaryModalProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const modalGlobalClasses = modalGlobalStyles();
  const modalClasses = modalStyles();
  const buttonClasses = buttonStyles();
  const inputClasses = inputStyles();
  const classes = useStyles();

  const [tab, setTab] = useState<string>(BadgeTabLink.PROJECT_BADGE);
  const [data, setData] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorTagId, setError] = useState(null);

  const serverErrors = useMemo(() => updateBadgeDataLoading?.error?.errors, [updateBadgeDataLoading]);

  const isNotActive: boolean = useMemo(() => modal.status !== BadgeModel.BadgeStatus.ACTIVE, [modal.status]);
  const isBadgeLoading: boolean = useMemo(() => badgeLoading && badgeLoading.isLoading, [badgeLoading]);
  const isRequiredDocumentationCompleted: boolean = useMemo(
    () => (!!currentBadge.workerProjectStatus && currentBadge?.trainingsCompleted && currentBadge?.certificationsCompleted) || isVisitor,
    [currentBadge, isVisitor]
  );

  const dataInputProps = useMemo(
    () => ({
      [BadgeModel.BadgeModalAction.ACTIVE]: {
        className: modalClasses.inputField,
        placeholder: 'Enter Tag Id',
        multiline: false,
        rows: 1,
        dataTestId: 'badge-tagid',
        maxLength: 12,
        mask: TAG_ID_MASK,
        placeholderChar: '0',
        showMask: true,
        guide: false,
        inputComponent: ControlledMaskInput as any,
      },
      [BadgeModel.BadgeModalAction.NOT_ACTIVE]: {
        className: modalClasses.descriptionField,
        placeholder: 'Reason',
        multiline: true,
        rows: 2,
        dataTestId: 'badge-reason',
        maxLength: 2048,
      },
    }),
    [modalClasses]
  );

  const onSubmitHandler = useCallback(
    (badgeUpdate: BadgeModel.IBadgeUpdateRequest) => {
      updateBadge(currentBadge.id, {
        ...badgeUpdate,
        expirationDate: getConditionalDefaultValue(!!badgeUpdate.hasExpiration, badgeUpdate.expirationDate, null),
      });
    },
    [currentBadge.id, updateBadge]
  );

  const { model, errors, hasChanges, onSubmit, onChange, update, setHasChanges, discardChanges, updateRules, resetErrors } = useForm<
    BadgeModel.IBadgeUpdateRequest
  >({
    initValues: {
      hasExpiration: 0,
      expirationDate: null,
      tagId: null,
    },
    formRules: {
      expirationDate: {
        required: false,
        rules: [ruleMap.isInvalidDate],
      },
      tagId: {
        required: isVisitor,
        rules: [validateBadgeTagId],
      },
    },
    onSubmitCallback: onSubmitHandler,
  });

  const onDiscard = useCallback(() => {
    discardChanges({
      hasExpiration: Number(!!currentBadge.expirationDate),
      expirationDate: getConditionalDefaultValue(
        currentBadge.expirationDate,
        currentBadge.expirationDate,
        getDefaultValue(currentBadge.defaultExpirationDate, null)
      ),
      tagId: getDefaultValue(currentBadge?.tagId, null),
    });
    resetErrors();
    clearUpdateBadgeLoading();
    onResetModal();
  }, [currentBadge, discardChanges, onResetModal, resetErrors, clearUpdateBadgeLoading]);

  const onChangeData = useCallback(
    event => {
      event.persist();
      setData(getConditionalDefaultValue(isNotActive, event.target.value, event.target.value.toUpperCase()));
      setError(null);
    },
    [setData, setError, isNotActive]
  );

  const onCloseModal = useCallback(() => {
    onModalClose();
    setData('');
    setError(null);
  }, [onModalClose, setData, setError]);

  const validateTagId = useCallback(
    /* istanbul ignore next */ () => {
      if (!data.length) {
        setError('Please enter Tag Id.');
      } else if (data.length < 12) setError('Please enter a valid Tag Id.');
    },
    [data, setError]
  );

  const onConfirmModal = useCallback(() => {
    if (!isNotActive && data.length < 12) {
      validateTagId();
    } else {
      onModalConfirm(data, { ...model, hasChanges });
      setLoading(true);
    }
  }, [isNotActive, data, model, hasChanges, validateTagId, setLoading, onModalConfirm]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!modal.open) setData('');
    if (modal.open && modal.status === BadgeModel.BadgeStatus.ACTIVE) setData(getDefaultValue(currentBadge.tagId, ''));
  }, [modal.open, modal.status, currentBadge.tagId, setData]);

  useEffect(() => {
    if (currentBadgeForm !== null && currentBadgeForm?.hasChanges) {
      update(currentBadgeForm);
      setHasChanges(true);
    } else {
      update({
        hasExpiration: Number(!!currentBadge.expirationDate),
        expirationDate: getConditionalDefaultValue(
          Number(!!currentBadge.expirationDate),
          currentBadge.expirationDate,
          getDefaultValue(currentBadge.defaultExpirationDate, null)
        ),
        tagId: getDefaultValue(currentBadge?.tagId, null),
      });
      setHasChanges(false);
      onResetModal();
    }
  }, [currentBadge, currentBadgeForm, setHasChanges, update, onResetModal]);

  useEffect(() => {
    /* istanbul ignore else */
    if (badgeLoading && !badgeLoading.isLoading) setLoading(false);
  }, [badgeLoading, setLoading]);

  useEffect(() => {
    /* istanbul ignore else */
    if (updateLoading && !updateLoading.isLoading && !updateLoading.hasError) {
      onCloseModal();
      clearUpdateLoading();
      clearBadge();
      setHasChanges(false);
    }
    if (updateLoading?.error?.errors?.tagId) setError(updateLoading.error.errors.tagId[0]);
  }, [updateLoading, clearBadge, onCloseModal, clearUpdateLoading, setHasChanges]);

  useEffect(() => {
    /* istanbul ignore else */
    if (updateBadgeDataLoading && !updateBadgeDataLoading.isLoading && !updateBadgeDataLoading.hasError) {
      onCloseModal();
      closeModal();
      clearUpdateLoading();
      clearUpdateBadgeLoading();
      clearBadge();
    }
  }, [updateBadgeDataLoading, clearBadge, closeModal, onCloseModal, clearUpdateLoading, clearUpdateBadgeLoading]);
  return (
    <>
      <FormModal
        open={true}
        hasChanges={hasChanges}
        isLoading={updateBadgeDataLoading && updateBadgeDataLoading.isLoading}
        handleSubmit={onSubmit}
        handleClose={closeModal}
        handleDiscard={onDiscard}
        styleClass={classes.modalContainer}
        renderHeader={() => (
          <DialogTitle className={classes.modalTitleContainer} disableTypography={true} data-testid="badge-title">
            <Typography className={modalGlobalClasses.title} color="secondary" align="left" component="h1" variant="h6">
              {title}
            </Typography>
            <div className={classes.modalButtonWrapper}>
              <ButtonPrinter
                styleClasses={`${classes.printButton} ${buttonClasses.badgeButtonContainer}`}
                isLoading={printLoading && printLoading.isLoading}
                disabled={!isRequiredDocumentationCompleted}
                onPrint={onPrint}
              />
            </div>
          </DialogTitle>
        )}
        renderContent={() => (
          <DialogContent dividers={true} className={`${tableGlobalClasses.tableWrapper} ${tableGlobalClasses.tableBackground} ${classes.modalWrapper}`}>
            <div className={`${classes.modalStatusFilterPosition} ${modalGlobalClasses.modalFilterDivider} ${tableGlobalClasses.statusFilter}`}>
              {badgeTabList.map(optFilter => (
                <Button
                  key={optFilter.key}
                  data-testid="badge-modal-tab-opt"
                  className={optFilter.key === tab ? tableGlobalClasses.activeFilter : ''}
                  onClick={() => setTab(optFilter.key)}
                >
                  {optFilter.title}
                </Button>
              ))}
            </div>
            {(isBadgeLoading || isLoading) && (
              <div className={classes.modalBadgeSkeleton}>
                <span>Loading...</span>
              </div>
            )}
            {!isBadgeLoading && !isLoading && tab === BadgeTabLink.PROJECT_BADGE && (
              <BadgeTab
                model={model}
                errors={errors}
                serverErrors={serverErrors}
                badge={currentBadge}
                isDeactivated={isDeactivated}
                isBadgePending={isBadgePending}
                isRequiredDocumentationCompleted={isRequiredDocumentationCompleted}
                isVisitor={isVisitor}
                isReactivateAllowed={isReactivateAllowed}
                badgeStatusOptionList={badgeStatusOptionList}
                updateRules={updateRules}
                onChange={onChange}
              />
            )}
            {!isBadgeLoading && tab === BadgeTabLink.BADGE_HISTORY && <BadgeHistoryTab badgeId={currentBadge.id} />}
          </DialogContent>
        )}
      />
      <Modal
        onClose={onCloseModal}
        show={modal.open}
        styleClass={`${modalClasses.dialogContainer} ${modalClasses.dialogTitleSmallBottomMargin}`}
        render={() => (
          <Confirm
            title={badgeModalContent?.title}
            confirmLoadingText={badgeModalContent?.loadingText}
            isLoading={updateLoading && updateLoading.isLoading}
            content={
              <>
                <Typography className={modalClasses.modalContentText}>{badgeModalContent?.text}</Typography>
                <div className={inputClasses.formControl} style={{ paddingBottom: '18px' }}>
                  <ControlledError error={errorTagId} show={!!errorTagId}>
                    <ControlledInput label="">
                      <TextField
                        className={dataInputProps[Number(isNotActive)].className}
                        type="text"
                        onChange={onChangeData}
                        placeholder={dataInputProps[Number(isNotActive)].placeholder}
                        name="data"
                        value={data}
                        variant="outlined"
                        multiline={dataInputProps[Number(isNotActive)].multiline}
                        rows={dataInputProps[Number(isNotActive)].rows}
                        autoComplete="off"
                        fullWidth={true}
                        error={!!errorTagId}
                        inputProps={{
                          'data-testid': dataInputProps[Number(isNotActive)].dataTestId,
                          maxLength: dataInputProps[Number(isNotActive)].maxLength,
                          mask: dataInputProps[Number(isNotActive)].mask,
                          placeholderChar: dataInputProps[Number(isNotActive)].placeholderChar,
                          showMask: dataInputProps[Number(isNotActive)].showMask,
                          guide: dataInputProps[Number(isNotActive)].guide,
                        }}
                        InputProps={{
                          inputComponent: dataInputProps[Number(isNotActive)].inputComponent,
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
              </>
            }
            confirmLabel={badgeModalContent?.confirmLabel}
            confirmButtonStyleClass={modalClasses.smallConfirmButton}
            closeLabel="Cancel"
            onClose={onCloseModal}
            onConfirm={onConfirmModal}
          />
        )}
      />
    </>
  );
};

export default memo(BadgeSummaryModal);
