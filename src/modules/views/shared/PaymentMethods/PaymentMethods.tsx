import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import CreditCardItem from './components/CreditCardItem/CreditCardItem';
import NewCreditCardItem from './components/NewCreditCardItem/NewCreditCardItem';
import { GeneralModel, PaymentModel } from '../../../models';
import { GENERAL, LANG } from '../../../../constants';
import { useStylesModalCards } from './styles';
import Typography from '@material-ui/core/Typography';
import Modal from '../Modal';
import Confirm from '../Modal/components/Confirm';
import DeleteModal from '../Modal/components/Delete/Delete';

import ControlledInput from '../FormHandler/ControlledInput';
import ControlledSelect from '../FormHandler/ControlledSelect';
import { getDefaultValue } from '../../../../utils/generalUtils';
import { useStyles as modalStyles } from '../Modal/style';
import Alert from '../Modal/components/Alert';

export interface IPaymentMethodsProps {
  compact?: boolean;
  showNote?: boolean;
  admin?: boolean;
  paymentMethods: PaymentModel.IPaymentMethod[];
  selectedPaymentMethod?: string;
  createLoading: GeneralModel.ILoadingStatus;
  fetchPaymentLoading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  setSelectedPaymentMethod?: (id: string) => void;
  fetchPaymentMethods: () => void;
  deletePaymentMethod: (id: string) => void;
  replaceAndDeletePaymentMethod: (toDelete: string, toReplaceWith: string) => void;
  clearLoading: (key: string) => void;
  isProjectDetail?: boolean;
}
interface IReplaceModalState {
  isOpen: boolean;
  paymentMethodInUse: PaymentModel.IPaymentMethod;
  selectedPaymentMethod: string;
  paymentMethodsOptions: any[];
}

interface IDeletePaymentMethodModal {
  isOpen: boolean;
  paymentMethod: PaymentModel.IPaymentMethod;
}

const deletePaymentMethodModalInitialState: IDeletePaymentMethodModal = {
  isOpen: false,
  paymentMethod: null,
};

const replaceModalInitialState: IReplaceModalState = {
  isOpen: false,
  paymentMethodInUse: null,
  paymentMethodsOptions: [],
  selectedPaymentMethod: 'none',
};

const PaymentMethods = ({
  compact = false,
  admin = false,
  fetchPaymentLoading,
  paymentMethods,
  selectedPaymentMethod,
  createLoading,
  deleteLoading,
  setSelectedPaymentMethod,
  fetchPaymentMethods,
  deletePaymentMethod,
  replaceAndDeletePaymentMethod,
  clearLoading,
  isProjectDetail,
}: IPaymentMethodsProps) => {
  const classes = useStylesModalCards();
  const modalClasses = modalStyles();

  const cardInUseError = useMemo(() => deleteLoading && deleteLoading.error?.errorCode === LANG.EN.ERROR_CODES.PAYMENT_METHOD_ASSIGNED_TO_PROJECTS, [
    deleteLoading,
  ]);
  const cardInUseInformation = useMemo(() => deleteLoading?.error, [deleteLoading]);

  const [replaceCardInUseModal, setReplaceCardInUseModal] = useState<IReplaceModalState>(replaceModalInitialState);
  const [canNotDeleteCardModal, setCanNotDeleteCardModal] = useState<boolean>(false);
  const [deleteCardModalDisclaimer, setDeleteCardModalDisclaimer] = useState<IDeletePaymentMethodModal>(deletePaymentMethodModalInitialState);
  const closeModal = useCallback(() => setCanNotDeleteCardModal(false), [setCanNotDeleteCardModal]);
  const onCloseReplaceCardInUseModal = useCallback(() => setReplaceCardInUseModal(() => replaceModalInitialState), [setReplaceCardInUseModal]);
  const onCloseDeleteModalDisclaimer = useCallback(() => setDeleteCardModalDisclaimer(() => deletePaymentMethodModalInitialState), [
    setDeleteCardModalDisclaimer,
  ]);

  const onConfirmReplaceCardInUseModal = useCallback(() => {
    const toDeleteId = replaceCardInUseModal.paymentMethodInUse.paymentMethodId;
    replaceAndDeletePaymentMethod(toDeleteId, replaceCardInUseModal.selectedPaymentMethod);
    setReplaceCardInUseModal(replaceModalInitialState);
  }, [replaceCardInUseModal, replaceAndDeletePaymentMethod]);

  const onConfirmDeleteCard = useCallback(() => {
    const toDeleteId = deleteCardModalDisclaimer.paymentMethod?.paymentMethodId;
    deletePaymentMethod(toDeleteId);
    setDeleteCardModalDisclaimer(deletePaymentMethodModalInitialState);
  }, [deleteCardModalDisclaimer, deletePaymentMethod]);

  const onSelectReplacementChange = useCallback((ev: any) => {
    setReplaceCardInUseModal(prev => ({
      ...prev,
      selectedPaymentMethod: ev.target.value,
    }));
  }, []);

  const onDeletePaymentMethod = useCallback(
    (paymentMethodId: string) => {
      if (paymentMethods.length <= 1) return setCanNotDeleteCardModal(true);
      const paymentMethod = paymentMethods.find(paymentMehtod => paymentMehtod.paymentMethodId === paymentMethodId);
      const hasAssociatedProjects = paymentMethod.hasAssociatedProjects;
      if (hasAssociatedProjects) {
        const paymentMethodsOptions = paymentMethods
          .filter(card => card.paymentMethodId !== paymentMethodId)
          .map(card => ({
            value: card.paymentMethodId,
            label: `${card.brand.charAt(0).toUpperCase() + card.brand.slice(1)}: **** **** **** ${card.lastFourDigits}`,
          }));
        setReplaceCardInUseModal({
          isOpen: true,
          paymentMethodInUse: paymentMethod,
          paymentMethodsOptions,
          selectedPaymentMethod: replaceModalInitialState.selectedPaymentMethod,
        });
      } else {
        setDeleteCardModalDisclaimer({
          isOpen: true,
          paymentMethod: paymentMethod,
        });
        setReplaceCardInUseModal(() => replaceModalInitialState);
      }
    },
    [paymentMethods]
  );

  useEffect(() => {
    if (cardInUseError) {
      const toDeleteId = cardInUseInformation.errors.paymentMethodId[0];
      const paymentMethodInUse = paymentMethods.find(card => card.paymentMethodId === toDeleteId);
      if (!paymentMethodInUse) return;
      const paymentMethodsOptions = paymentMethods
        .filter(card => card.paymentMethodId !== toDeleteId)
        .map(card => ({
          value: card.paymentMethodId,
          label: `${card.brand.charAt(0).toUpperCase() + card.brand.slice(1)}: **** **** **** ${card.lastFourDigits}`,
        }));
      setReplaceCardInUseModal({
        isOpen: true,
        paymentMethodInUse,
        paymentMethodsOptions,
        selectedPaymentMethod: replaceModalInitialState.selectedPaymentMethod,
      });
    } else {
      setReplaceCardInUseModal(() => replaceModalInitialState);
    }
  }, [cardInUseError, cardInUseInformation, paymentMethods, setReplaceCardInUseModal]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  useEffect(() => {
    /* istanbul ignore else */
    if (createLoading && !createLoading.isLoading) {
      fetchPaymentMethods();
    }
  }, [createLoading, fetchPaymentMethods]);

  useEffect(() => {
    return function unMount() {
      clearLoading(GENERAL.LOADING_KEY.CREATE_PAYMENT);
    };
  }, [clearLoading]);

  const renderCantDeleteModal = () => (
    <Modal
      show={canNotDeleteCardModal}
      onClose={closeModal}
      styleClass={`${modalClasses.dialogContainer}`}
      render={() => (
        <Alert
          title="This Credit Card can't be deleted"
          btnLabel="I Understand"
          onClick={closeModal}
          content="You must have at least one credit card associated with your company. If you want to delete this credit card, please add a new one."
        />
      )}
    />
  );

  const renderDeleteModalDisclaimer = () => (
    <Modal
      show={deleteCardModalDisclaimer.isOpen}
      styleClass={`${modalClasses.dialogContainer} ${modalClasses.deleteModal}`}
      render={() => (
        <DeleteModal
          title={`Delete Credit Card **** **** **** ${getDefaultValue(deleteCardModalDisclaimer.paymentMethod?.lastFourDigits, '****')}?`}
          onCancel={onCloseDeleteModalDisclaimer}
          onConfirm={onConfirmDeleteCard}
          text="If you do it, this credit card will be removed from your company."
          confirmLoadingText="Deleting..."
          isLoading={deleteLoading?.isLoading}
        />
      )}
    />
  );

  const renderReplaceCardModal = () => (
    <Modal
      show={replaceCardInUseModal.isOpen}
      onClose={onCloseReplaceCardInUseModal}
      styleClass={`${modalClasses.dialogContainer}`}
      render={() => (
        <Confirm
          title={`Delete Credit Card **** **** **** ${getDefaultValue(replaceCardInUseModal.paymentMethodInUse?.lastFourDigits, '****')}?`}
          closeLabel="Cancel"
          confirmLabel="Delete and Replace"
          onConfirm={onConfirmReplaceCardInUseModal}
          onClose={onCloseReplaceCardInUseModal}
          disableConfirm={replaceCardInUseModal.selectedPaymentMethod === replaceModalInitialState.selectedPaymentMethod}
          confirmButtonStyleClass={`${classes.replaceModalButton}`}
          confirmLoadingText="Replacing..."
          isLoading={deleteLoading?.isLoading}
          content={
            <div className={`${classes.replaceModal}`}>
              <Typography className={`${classes.replaceModalText}`}>
                There are projects associated with this Credit Card, Please select the credit card you want to use as replacement.
              </Typography>
              <ControlledInput label="Replacement Credit Card">
                <ControlledSelect
                  name="replace-credit-card-select"
                  includeNone={true}
                  noneLabel={'Select a Credit Card'}
                  inputProps={{
                    'data-testid': 'replace-credit-card-select',
                  }}
                  noneValue={replaceModalInitialState.selectedPaymentMethod}
                  options={replaceCardInUseModal.paymentMethodsOptions}
                  onChange={onSelectReplacementChange}
                  disabled={!replaceCardInUseModal.paymentMethodsOptions.length}
                  value={replaceCardInUseModal.selectedPaymentMethod}
                />
              </ControlledInput>
            </div>
          }
        />
      )}
    />
  );

  const renderAdmin = () => (
    <>
      {!fetchPaymentLoading?.isLoading ? (
        <Grid container={true} className={classes.adminCards}>
          {paymentMethods.map(paymentMethod => (
            <Grid key={paymentMethod.paymentMethodId} item={true} xl={12} lg={12}>
              <CreditCardItem admin={admin} paymentMethod={paymentMethod} deleteCard={onDeletePaymentMethod} />
            </Grid>
          ))}
          {!compact && (
            <Grid item={true} xl={12} lg={12}>
              <NewCreditCardItem />
            </Grid>
          )}
        </Grid>
      ) : (
        'Loading...'
      )}
      {renderCantDeleteModal()}
      {renderReplaceCardModal()}
      {renderDeleteModalDisclaimer()}
    </>
  );

  const renderSelectable = () => (
    <>
      <Typography className={`${classes.note}`}>
        Select or add a new Credit Card. The selected card will be charged every payment cycle as long as it is associated with current Project.
      </Typography>
      {!fetchPaymentLoading?.isLoading ? (
        <Grid container={true} className={isProjectDetail ? `${classes.modalCards}` : `${classes.selectedCards}`}>
          {paymentMethods.map(paymentMethod => (
            <Grid key={paymentMethod.paymentMethodId} className={isProjectDetail && `${classes.cardItemModal}`} item={true} xl={12} lg={12}>
              <CreditCardItem
                compact={compact}
                paymentMethod={paymentMethod}
                isSelected={selectedPaymentMethod === paymentMethod.paymentMethodId}
                setSelected={setSelectedPaymentMethod}
              />
            </Grid>
          ))}
          {!compact && (
            <Grid item={true} xl={12} lg={12}>
              <NewCreditCardItem />
            </Grid>
          )}
        </Grid>
      ) : (
        'Loading...'
      )}
    </>
  );

  return admin ? renderAdmin() : renderSelectable();
};

export default memo(PaymentMethods);
