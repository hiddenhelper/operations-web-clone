import { GeneralModel, StatisticsModel } from '../../models';

export interface IState {
  newBadges: StatisticsModel.ITodayWidgetStatistics;
  grossRevenue: StatisticsModel.ITodayWidgetStatistics;
  workersActivity: StatisticsModel.ITodayWidgetStatistics;
  projectStatistics: StatisticsModel.IProjectStatistics;
  clientStatistics: StatisticsModel.IResourceStatistics;
  inventoryStatistics: StatisticsModel.IInventoryStatistics;
  workerStatistics: StatisticsModel.IWorkerStatistics;
  invoiceStatistics: StatisticsModel.IInvoiceStatistics;
  locationStatistics: StatisticsModel.ILocationStatistics;
  acsProjectStatistics: StatisticsModel.IAcsSummaryStatistics;
  bpsProjectStatistics: StatisticsModel.IDeviceStatistics;
  projectTopTenStatistics: StatisticsModel.IProjectTopTenStatistics[];
  clientTopTenStatistics: StatisticsModel.IClientTopTenStatistics[];
  grossRevenueWidgetStatistics: StatisticsModel.ILineWidgetStatistics;
  linePieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ILinePieWidgetStatistics>;
  pieStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.IPieWidgetStatistics>;
  topTenStatisticsMap: GeneralModel.IEntityMap<StatisticsModel.ITopTenStatistics[]>;
  clientDetailStatistics: StatisticsModel.IClientDetailStatistics;
  projectDetailStatistics: StatisticsModel.IProjectDetailStatistics;
}

export const initialState: IState = {
  newBadges: null,
  projectStatistics: null,
  clientStatistics: null,
  inventoryStatistics: null,
  workerStatistics: null,
  grossRevenue: null,
  workersActivity: null,
  grossRevenueWidgetStatistics: null,
  invoiceStatistics: null,
  locationStatistics: null,
  acsProjectStatistics: null,
  bpsProjectStatistics: null,
  projectTopTenStatistics: null,
  clientTopTenStatistics: null,
  clientDetailStatistics: null,
  projectDetailStatistics: null,
  linePieStatisticsMap: {},
  topTenStatisticsMap: {},
  pieStatisticsMap: {},
};
