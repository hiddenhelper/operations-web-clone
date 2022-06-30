import { ClientModel, GeneralModel } from '../../models';

export interface IState {
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  clientProjectMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ClientModel.IClientProject>>;
  clientProjectHirearchyMap: GeneralModel.IEntityMap<ClientModel.IHirearchyClientProject>;
  mwbeList: GeneralModel.INamedEntity[];
  tradeList: GeneralModel.INamedEntity[];
  selfCompany: ClientModel.IClient;
  count: number;
  isGeneralAdmin: boolean;
}

export const initialState: IState = {
  clientMap: {},
  clientProjectMap: {},
  clientProjectHirearchyMap: {},
  mwbeList: [],
  tradeList: [],
  selfCompany: null,
  count: null,
  isGeneralAdmin: false,
};
