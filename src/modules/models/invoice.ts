import { INamedEntity, TimeFilterType, SortingType } from './general';
import { IAddress } from './address';

export interface IInvoiceService {
  id?: string;
  service?: INamedEntity;
  serviceId?: string;
  detail?: string;
  amount: number;
}

export interface IInvoiceProject extends INamedEntity {
  taxRate?: number;
  category?: string;
  address?: IAddress;
}

export interface IInvoiceCompany extends INamedEntity {
  isTaxExempt?: boolean;
  billingAddress?: IAddress;
  user?: IClientUser;
  hasPaymentMethod?: boolean;
}

export interface IBilledCompany {
  name?: string;
  address?: IAddress;
}

export interface IClientUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  name?: string;
}

export enum InvoiceStatus {
  DRAFT,
  PENDING,
  PROCESSING,
  PAID,
  DECLINED,
  VOIDED,
}

export enum InvoiceAction {
  CREATE,
  CONFIRM,
  EDIT,
  PAY,
  MARK_AS_PAID,
  MARK_AS_VOID,
  DELETE,
}

export enum InvoiceType {
  MANUAL,
  AUTOMATIC,
}

export enum InvoiceStep {
  DRAFT,
  CONFIRM,
}

export interface IInvoice {
  id?: string;
  invoiceNumber?: number;
  projectId?: string;
  billingCompanyId?: string;
  company?: IInvoiceCompany;
  billingCompany?: IBilledCompany;
  clientUser?: IClientUser;
  invoice?: INamedEntity;
  notes?: string;
  invoiceDate?: string;
  paymentDate?: string;
  dueDate?: string;
  project?: IInvoiceProject;
  items?: IInvoiceService[];
  status?: InvoiceStatus;
  total?: number;
  subtotal?: number;
  taxRate?: number;
  convenienceFeeRate?: number;
  convenienceFeeAmount?: number;
  taxAmount?: number;
  type?: InvoiceType;
}

export interface IInvoiceTaxesRequest {
  billingCompanyId: string;
  projectId: string;
  items: IInvoiceService[];
}

export const filterMap = {
  [InvoiceStatus.PENDING]: {
    id: InvoiceStatus.PENDING,
    key: 'unpaid',
    title: 'Unpaid',
    value: false,
    order: 0,
  },
  [InvoiceStatus.PAID]: {
    id: InvoiceStatus.PAID,
    key: 'paid',
    title: 'Paid',
    value: true,
    order: 1,
  },
};

export const defaultInvoiceSearch = {
  isPaid: filterMap[InvoiceStatus.PENDING].value,
  pageNumber: 1,
  pageSize: 15,
  period: TimeFilterType.ALL_TIMES,
  sortType: SortingType.DESCENDING,
};

export const invoiceStatusMap = {
  [InvoiceStatus.DECLINED]: 'Declined',
  [InvoiceStatus.PENDING]: 'Pending',
  [InvoiceStatus.PAID]: 'Paid',
  [InvoiceStatus.PROCESSING]: 'Processing',
};

export enum InvoiceTabType {
  PAID = 'paid',
  UNPAID = 'unpaid',
}

export enum InvoiceSortingName {
  CREATION_DATE = 'createdAt',
  PAYMENT_DATE = 'paymentDate',
}

export const getFallbackInvoiceService = (): IInvoiceService => ({
  service: {
    id: null,
    name: '',
  },
  detail: '',
  amount: 0,
});

export const getFallbackInvoice = (): IInvoice => ({
  id: null,
  invoiceNumber: null,
  projectId: null,
  billingCompanyId: null,
  company: null,
  invoice: null,
  notes: null,
  invoiceDate: null,
  paymentDate: null,
  project: null,
  items: [getFallbackInvoiceService()],
  status: null,
  total: null,
});
