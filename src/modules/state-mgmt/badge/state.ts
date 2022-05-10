import { GeneralModel, BadgeModel } from '../../models';

export interface IState {
  badgeMap: GeneralModel.IEntityMap<BadgeModel.IBadge>;
  badgeVisitorMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<BadgeModel.IBadgeVisitor>>;
  historyList: BadgeModel.IBadgeHistory[];
  count: number;
}

export const initialState: IState = {
  badgeMap: {},
  badgeVisitorMap: {},
  historyList: [],
  count: null,
};
