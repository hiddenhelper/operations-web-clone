import { INamedEntity } from './general';
import { Status } from './resource';

export interface ITodayWidgetStatistics {
  total: number;
  lastActivity: string;
}

export interface IWorkerStatistics {
  sent: number;
  expired: number;
  active: number;
  migrated: number;
  pendingRegistration: number;
}

export interface IInventoryStatistics {
  assignedDevices: number;
  availableAccessControlSystems: number;
  availableBadgePrintingSystems: number;
}

export interface IResourceStatistics {
  draft: number;
  pendingApproval: number;
  active: number;
}

export interface IProjectStatistics extends IResourceStatistics {
  pending?: number;
  billing?: number;
  accepted?: number;
}

export interface IClientDetailStatistics {
  projects?: number;
  workers?: number;
  revenue?: number;
}

export interface IProjectDetailStatistics {
  companiesCount?: number;
  activeWorkersCount?: number;
  totalBilling?: number;
}

export interface IPieChartData {
  status?: Status;
  segment?: number;
  total: number;
  percentage: number;
  color?: string;
}

export interface ILineChartData {
  date: string;
  count: number;
}

export interface ILinePieWidgetStatistics {
  newProjects?: number;
  totalRecords?: number;
  lineChart: ILineChartData[];
  pieChart: IPieChartData[];
}

export interface IPieWidgetStatistics {
  newClients?: number;
  totalRecords?: number;
  chart?: IPieChartData[];
  pieChart?: IPieChartData[];
}

export interface ILineWidgetStatistics {
  totalRevenue?: number;
  totalRecords?: number;
  lineChart: ILineChartData[];
}

export interface IInvoiceStatistics {
  unpaid: number;
  paid: number;
  revenue: number;
}

export interface IPoint {
  entityName?: INamedEntity;
  latitude: number;
  longitude: number;
}

export interface ILocationStatistics {
  total: number;
  pointList: IPoint[];
}

export interface ITopTenStatistics {
  description: string;
  percentage: number;
  total: number;
}

export interface IDeviceStatistics {
  totalRecords: number;
  totalFilter: number;
}

export interface IProjectTopTenStatistics {
  project: INamedEntity;
  totalClients: number;
  totalWorkers: number;
  totalRevenue: number;
  creationDate: string;
}

export interface IClientTopTenStatistics {
  company: INamedEntity;
  projectsCount: number;
  workersCount: number;
  activeBadgesCount: number;
  totalRevenue: number;
}

export interface IAcsSummaryStatistics extends IDeviceStatistics {
  pieChart: IPieChartData[];
}

export const getLinePieWidgetFallback = (): ILinePieWidgetStatistics => ({
  newProjects: 0,
  totalRecords: 0,
  lineChart: [],
  pieChart: [],
});

export const getLineWidgetFallback = (): ILineWidgetStatistics => ({
  totalRevenue: 0,
  totalRecords: 0,
  lineChart: [],
});

export const getPieWidgetStatisticsFallback = (): IPieWidgetStatistics => ({
  newClients: 0,
  totalRecords: 0,
  chart: [],
  pieChart: [],
});

export const getAcsSummaryFallback = (): IAcsSummaryStatistics => ({
  totalRecords: 0,
  totalFilter: 0,
  pieChart: [],
});

export const getLocationFallback = (): ILocationStatistics => ({
  total: 0,
  pointList: [],
});
