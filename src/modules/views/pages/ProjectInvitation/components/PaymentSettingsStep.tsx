import React, { memo } from 'react';
import Card from '../../../shared/ResourceManagement/Card';
import PaymentMethods from '../../../shared/PaymentMethods';

export interface IPaymentSettingsStepProps {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (id: string) => void;
}

const PaymentSettingsStep = ({ selectedPaymentMethod, setSelectedPaymentMethod }: IPaymentSettingsStepProps) => {
  return (
    <Card title="Select Credit Card">
      <PaymentMethods isProjectDetail={false} selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />
    </Card>
  );
};

export default memo(PaymentSettingsStep);
