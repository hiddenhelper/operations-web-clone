import { InvoiceModel } from '../modules/models';
import { getConditionalDefaultValue, getDefaultValue, sanitizeNumber } from './generalUtils';

export const sanitizeService = (service: InvoiceModel.IInvoiceService) => ({
  amount: service.amount ? sanitizeNumber(service.amount as any) : null,
  detail: getDefaultValue(service.detail, null),
  serviceId: getDefaultValue(service.service?.id, null),
});

export const sanitizeInvoice = (invoice: InvoiceModel.IInvoice, projectId?: string, companyId?: string) => ({
  billingCompanyId: getConditionalDefaultValue(companyId, getDefaultValue(companyId, null), getDefaultValue(invoice.company?.id, null)),
  notes: getDefaultValue(invoice.notes, null),
  projectId: getConditionalDefaultValue(projectId, getDefaultValue(projectId, null), getDefaultValue(invoice.project?.id, null)),
  items: invoice.items.map(service => sanitizeService(service)),
});

export const preloadInvoice = (invoice: InvoiceModel.IInvoice) => ({
  project: invoice.project,
  company: invoice.company,
  notes: getDefaultValue(invoice.notes, ''),
  items: getDefaultValue(invoice.items, []),
  convenienceFeeAmount: invoice.convenienceFeeAmount,
});
