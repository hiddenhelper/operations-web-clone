import React, { memo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { ENV } from '../../../../constants';

import CreditCard from './components/CreditCard';

export interface IPaymentFormProps {
  onSuccessCallback?: () => void;
}

const PaymentForm = ({ onSuccessCallback }: IPaymentFormProps) => {
  const stripePromise = loadStripe(ENV.STRIPE_API.API_KEY, { locale: 'en' });

  return (
    <Elements stripe={stripePromise}>
      <CreditCard onSuccessCallback={onSuccessCallback} />
    </Elements>
  );
};

export default memo(PaymentForm);
