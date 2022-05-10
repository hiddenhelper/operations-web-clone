import { GeneralModel, InvoiceModel } from '../../models';

export interface IState {
  invoiceMap: GeneralModel.IEntityMap<InvoiceModel.IInvoice>;
  serviceList: GeneralModel.INamedEntity[];
  count: number;
}

export const initialState: IState = {
  invoiceMap: {},
  serviceList: [],
  count: null,
};
