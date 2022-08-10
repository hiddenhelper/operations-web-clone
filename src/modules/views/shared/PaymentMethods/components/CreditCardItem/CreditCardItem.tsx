import React, { memo } from 'react';
import { useStyles } from '../../../PaymentForm/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { AcceptedIcon, CreditCardIcon, TrashCan } from '../../../../../../constants';
import { PaymentModel, UserModel } from '../../../../../models';

import visaLogo from '../../../../../../assets/images/credit-card/card-logo-visa.png';
import mastercardLogo from '../../../../../../assets/images/credit-card/card-logo-mastercard.png';
import jcbLogo from '../../../../../../assets/images/credit-card/card-logo-jcb.png';
import discoverLogo from '../../../../../../assets/images/credit-card/card-logo-discover.png';
import amexLogo from '../../../../../../assets/images/credit-card/card-logo-american-express.png';
import dinersLogo from '../../../../../../assets/images/credit-card/card-logo-dinners-club.png';
import unionpayLogo from '../../../../../../assets/images/credit-card/card-logo-union-pay.png';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface ICreditCardItemProps {
  isSelected?: boolean;
  admin?: boolean;
  compact?: boolean;
  paymentMethod: PaymentModel.IPaymentMethod | undefined;
  setSelected?: (id: string) => void;
  deleteCard?: (id: string) => void;
}

const CreditCardItem = ({ compact = false, isSelected, admin, deleteCard, paymentMethod, setSelected }: ICreditCardItemProps) => {
  const classes = useStyles();

  const renderCardLogo = (brand: string) => {
    const creditCardLogoMap = {
      visa: visaLogo,
      mastercard: mastercardLogo,
      amex: amexLogo,
      discover: discoverLogo,
      jcb: jcbLogo,
      diners: dinersLogo,
      unionpay: unionpayLogo,
    };
    const currentLogo = creditCardLogoMap[brand];

    if (!currentLogo) return <CreditCardIcon className={classes.creditCardIconImage} />;

    return <img src={currentLogo} alt="Credit Card Logo" className={classes.creditCardIconImage} />;
  };

  const handleSelectPayment = () => {
    setSelected(paymentMethod?.paymentMethodId);
  };

  const handleDeletePayment = () => {
    deleteCard(paymentMethod?.paymentMethodId);
  };

  const renderAdmin = () => (
    <Card className={`${classes.cardItem}`} data-testid="card-item">
      <Typography className={classes.creditCardTitle}>CREDIT CARD</Typography>
      <div className={classes.cardNumberWrapper}>
        <Typography className={classes.creditCardNumber}>{`**** **** **** ${paymentMethod?.lastFourDigits}`}</Typography>
        <div className={classes.creditCardLogoContainer}>
          <div className={classes.creditCardLogo}>{renderCardLogo(paymentMethod?.brand)}</div>
        </div>
      </div>
      <div>
        <Typography className={classes.creditCardHolder}>{paymentMethod?.nameOnCard}</Typography>
        <Typography className={classes.creditCardHolder}>{paymentMethod?.country}</Typography>
      </div>
      <span
        role="button"
        data-testid="credit-card-item-delete"
        className={`${classes.cardSelectedIcon} ${classes.cardItemClickable}`}
        onClick={handleDeletePayment}
      >
        <PermissionGuard permissionsExpression={UserModel.PaymentMethodsPermission.MANAGE}>
          <TrashCan title="Delete Card" className={classes.trashCanDeleteSVG} />
        </PermissionGuard>
      </span>
    </Card>
  );

  const renderSelectable = () => (
    <Card
      className={`${compact ? classes.compactCardItem : ''} ${classes.cardItem} ${classes.cardItemClickable} ${isSelected ? classes.cardItemSelected : ''}`}
      onClick={handleSelectPayment}
      role="button"
      data-testid="card-item"
    >
      <Typography className={classes.creditCardTitle}>CREDIT CARD</Typography>
      <div className={classes.cardNumberWrapper}>
        <Typography className={classes.creditCardNumber}>{`**** **** **** ${paymentMethod?.lastFourDigits}`}</Typography>
        <div className={classes.creditCardLogoContainer}>
          <div className={classes.creditCardLogo}>{renderCardLogo(paymentMethod?.brand)}</div>
          {compact && <span className={`${classes.icon} ${classes.activeIcon} ${isSelected ? classes.checkedIcon : ''}`} />}
        </div>
      </div>
      <div>
        <Typography className={classes.creditCardHolder}>
          {paymentMethod?.nameOnCard}
          {compact ? ` - ${paymentMethod?.country}` : ''}
        </Typography>
        {!compact && <Typography className={classes.creditCardHolder}>{paymentMethod?.country}</Typography>}
      </div>
      {isSelected && !compact && (
        <span className={classes.cardSelectedIcon}>
          <AcceptedIcon />
        </span>
      )}
    </Card>
  );

  return admin ? renderAdmin() : renderSelectable();
};

export default memo(CreditCardItem);
