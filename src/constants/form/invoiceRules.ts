import { validateRules } from '../../utils/useValidator';
import { InvoiceModel } from '../../modules/models';
import { getFallbackInvoiceService } from '../../modules/models/invoice';

const invoiceServiceRules = {
  service: {
    required: true,
    rules: [],
  },
  detail: {
    required: true,
    rules: [],
  },
  amount: {
    required: true,
    rules: [],
  },
};

const validateItemList = ({ value: itemList }: { value: InvoiceModel.IInvoiceService[] }) => {
  const invoiceErrorList = itemList.reduce((acc: any, invoice) => {
    const err = validateRules({ model: invoice, constraints: invoiceServiceRules });
    if (Object.keys(err).length > 0) {
      acc = 'All fields are required.';
    }
    return acc;
  }, {});
  return Object.keys(invoiceErrorList).length > 0 ? invoiceErrorList : false;
};

export const invoiceRules = {
  company: { required: false, rules: [] },
  project: { required: false, rules: [] },
  items: { required: true, rules: [validateItemList] },
};

export const initValues = {
  company: null,
  project: null,
  notes: '',
  items: [getFallbackInvoiceService()],
  convenienceFeeAmount: 0,
};
