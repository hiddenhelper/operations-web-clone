import { GeneralModel, SearchModel } from '../../models';
import { ILoadingStatus, IRelationUiMap, ToastType, IEntityMap } from '../../models/general';

export interface IState {
  loadingMap: { [key: string]: ILoadingStatus };
  uiRelationMap: IRelationUiMap;
  toastList: { _id: string; message: string; type: ToastType }[];
  modalMap: IEntityMap<any>;
  isHeaderFixed: boolean;
  hideScroll: boolean;
  modalCount: number;
  countryList: GeneralModel.INamedEntity[];
  timeZoneList: GeneralModel.INamedEntity[];
  searchResults?: GeneralModel.IPagination<SearchModel.IResponse | SearchModel.IWorker>;
}

export const initialState: IState = {
  loadingMap: {},
  uiRelationMap: {},
  toastList: [],
  modalMap: {},
  isHeaderFixed: true,
  hideScroll: false,
  modalCount: null,
  countryList: [],
  timeZoneList: [],
  searchResults: undefined,
};
