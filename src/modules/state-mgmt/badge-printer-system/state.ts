import { BadgePrintingSystemModel, GeneralModel } from '../../models';

export interface IState {
  badgePrinterSystemMap: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
  count: number;
}

export const initialState: IState = {
  badgePrinterSystemMap: {},
  count: null,
};
