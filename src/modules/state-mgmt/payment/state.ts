import { PaymentModel } from '../../models';

export interface IState {
  paymentMethod: PaymentModel.IPaymentMethod[];
}

export const initialState: IState = {
  paymentMethod: [],
};
