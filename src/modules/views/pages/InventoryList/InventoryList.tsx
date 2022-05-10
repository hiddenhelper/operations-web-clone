import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Link, Prompt } from 'react-router-dom';

import Container from 'modules/views/shared/Container';
import ButtonTab from 'modules/views/shared/ButtonTab';
import PageTitle from 'modules/views/shared/PageTitle';
import StatusWidget from 'modules/views/shared/StatusWidget';

import AccessControlSystemTab from './components/AccessControlSystemTab';
import BadgePrinterSystemTab from './components/BadgePrinterSystemTab';

import { UserModel, DeviceModel, InventoryModel, GeneralModel, StatisticsModel } from '../../../models';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { getDefaultValue } from '../../../../utils/generalUtils';
import { tableGlobalStyles, listGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';

export interface IInventoryListProps {
  userRole: UserModel.Role;
  inventoryStatistics: StatisticsModel.IInventoryStatistics;
  statisticsLoading: GeneralModel.ILoadingStatus;
  fetchInventoryStatistics: () => void;
  clearInventoryStatistics: () => void;
}

const InventoryList = ({ userRole, inventoryStatistics, statisticsLoading, fetchInventoryStatistics, clearInventoryStatistics }: IInventoryListProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const listClasses = listGlobalStyles();
  const deviceListRef = useRef();
  const [queryParams, setQueryParams] = useQueryParamState<GeneralModel.IQueryParams>({
    page: 1,
    limit: 15,
    deviceType: DeviceModel.DeviceType.ACCESS_CONTROL_SYSTEM,
  });

  const filterList = useMemo(() => Object.values(InventoryModel.filterMap).filter(item => item.roleList.includes(userRole)), [userRole]);

  const [isDrawerOpen, setDrawer] = useState<boolean>(false);

  const onPageChange = useCallback(
    /* istanbul ignore next */
    newPage => {
      setQueryParams({ ...queryParams, page: newPage });
    },
    [setQueryParams, queryParams]
  );

  const onNavigateAway = useCallback(() => {
    setDrawer(false);
    return true;
  }, [setDrawer]);

  const setFilter = useCallback(filter => setQueryParams({ deviceType: filter, page: 1, type: '' as any, available: '' as any }), [setQueryParams]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!inventoryStatistics) fetchInventoryStatistics();
  }, [inventoryStatistics, fetchInventoryStatistics]);

  useEffect(() => {
    return function unMount() {
      clearInventoryStatistics();
    };
  }, [clearInventoryStatistics]);

  return (
    <Container ref={deviceListRef}>
      <Prompt data-testid="prompt-navigate" message={onNavigateAway} />
      <div className={isDrawerOpen ? classes.deviceListContent : ''}>
        <PageTitle title="Inventory" />
        <div className={listClasses.widgetsWrapper} id="summary-widgets">
          <StatusWidget
            total={getDefaultValue(inventoryStatistics?.availableAccessControlSystems, 0)}
            status="Available ACS"
            content={<Link to="/inventory/?deviceType=access-control-system">Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getDefaultValue(inventoryStatistics?.availableBadgePrintingSystems, 0)}
            status="Available BPS"
            content={<Link to="/inventory/?deviceType=badge-printing-system">Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getDefaultValue(inventoryStatistics?.assignedDevices, 0)}
            status="Devices Assigned"
            content={null}
            loading={statisticsLoading?.isLoading}
          />
        </div>
        <div className={tableGlobalClasses.tableWrapper}>
          <div className={tableGlobalClasses.filterContainer}>
            <div className={tableGlobalClasses.statusFilter}>
              {filterList.map(optFilter => (
                <ButtonTab key={optFilter.id} optFilter={optFilter} isActive={optFilter.key === queryParams.deviceType} setFilter={setFilter} />
              ))}
            </div>
          </div>
          <div>
            {queryParams.deviceType === DeviceModel.DeviceType.ACCESS_CONTROL_SYSTEM && (
              <AccessControlSystemTab
                deviceListElement={deviceListRef.current}
                queryParams={queryParams}
                onPageChange={onPageChange}
                setDrawer={setDrawer}
                isDrawerOpen={isDrawerOpen}
                setQueryParams={setQueryParams}
              />
            )}
            {queryParams.deviceType === DeviceModel.DeviceType.BADGE_PRINTER_SYSTEM && (
              <BadgePrinterSystemTab
                deviceListElement={deviceListRef.current}
                queryParams={queryParams}
                onPageChange={onPageChange}
                setDrawer={setDrawer}
                isDrawerOpen={isDrawerOpen}
                setQueryParams={setQueryParams}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default memo(InventoryList);
