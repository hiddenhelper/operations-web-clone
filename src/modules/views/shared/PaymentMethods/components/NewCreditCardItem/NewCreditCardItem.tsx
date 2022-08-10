import React, { memo, useCallback, useState } from 'react';
import { useStyles } from '../../../PaymentForm/styles';
import Button from '@material-ui/core/Button';
import PaymentForm from '../../../PaymentForm/PaymentForm';
import { CloseIcon, CreditCardIcon, LANG } from '../../../../../../constants';
import { useStyles as modalStyles } from '../../../Modal/style';
import Typography from '@material-ui/core/Typography';
import PermisssionGuard from 'modules/views/shared/PermissionGuard';
import { UserModel } from 'modules/models';

const NewCreditCardItem = () => {
  const classes = useStyles();
  const modalClasses = modalStyles();
  const [isNew, setIsNew] = useState(true);

  const addNewCreditCard = useCallback(() => {
    setIsNew(false);
  }, []);

  const handleNewCardAdded = useCallback(() => {
    setIsNew(true);
  }, []);

  return (
    <PermisssionGuard permissionsExpression={UserModel.PaymentMethodsPermission.MANAGE}>
      <div className={`${isNew && classes.emptyCardItem} ${!isNew && classes.formCardItem}`}>
        {isNew && (
          <Button className={`${classes.addNewCardButton}`} onClick={addNewCreditCard} color="primary" data-testid="add-card-btn">
            <CreditCardIcon />
            ADD NEW CREDIT CARD
          </Button>
        )}
        {!isNew && (
          <>
            <div className={classes.newCardContainer}>
              <Button
                disableRipple={true}
                className={`${modalClasses.closeButton} ${classes.closeButton}`}
                data-testid="close-credit-card-form"
                onClick={handleNewCardAdded}
              >
                <CloseIcon />
              </Button>
              <PermisssionGuard permissionsExpression={UserModel.PaymentMethodsPermission.MANAGE}>
                <Typography className={classes.cardFormTitle} color="primary" align="left" component="h1" variant="h5">
                  Enter Credit Card Information
                </Typography>
              </PermisssionGuard>
              <PermisssionGuard permissionsExpression={UserModel.PaymentMethodsPermission.MANAGE}>
                <Typography className={classes.cardFormSubtitle}>{LANG.EN.PAYMENT.CREDIT_CARD_FORM_DESCRIPTION}</Typography>
              </PermisssionGuard>
              <PermisssionGuard permissionsExpression={UserModel.PaymentMethodsPermission.MANAGE}>
                <div className={classes.newCardFormContainer}>
                  <div>
                    <PaymentForm onSuccessCallback={handleNewCardAdded} />
                  </div>
                </div>
              </PermisssionGuard>
            </div>
          </>
        )}
      </div>
    </PermisssionGuard>
  );
};

export default memo(NewCreditCardItem);
