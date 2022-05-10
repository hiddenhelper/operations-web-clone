import React, { memo, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import InvoiceInformation from '../../shared/InvoiceInformation';
import { ROUTES } from '../../../../constants';

export interface IInvoiceDetailProps {
  navigate: (path: string) => void;
}

const InvoiceDetail = ({ navigate }: IInvoiceDetailProps) => {
  const { id } = useParams<{ id: string }>();

  /* istanbul ignore next */
  const onClose = useCallback(() => navigate(ROUTES.INVOICE_LIST.path), [navigate]);

  return <InvoiceInformation invoiceId={id} onClose={onClose} />;
};

export default memo(InvoiceDetail);
