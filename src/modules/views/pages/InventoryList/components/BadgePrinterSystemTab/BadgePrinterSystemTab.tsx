import React, { memo, useState, useMemo, useCallback, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Pagination from '../../../../shared/Pagination';
import BadgePrinterSystemRow from './BadgePrinterSystemRow';
import BadgePrinterSystemDrawer from './BadgePrinterSystemDrawer';
import SelectFilter from '../../../../shared/SelectFilter';

import { GeneralModel, BadgePrintingSystemModel, DeviceModel, UserModel } from '../../../../../models';
import { isEmpty } from '../../../../../../utils/generalUtils';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useHistory } from 'react-router';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IBadgePrintingSystemTabProps {
  queryParams: GeneralModel.IQueryParams;
  badgePrinterSystemMap: GeneralModel.IEntityMap<BadgePrintingSystemModel.IBadgePrintingSystem>;
  deviceCount: number;
  loading: GeneralModel.ILoadingStatus;
  summaryLoading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  isDrawerOpen: boolean;
  deviceListElement: React.ReactNode;
  onPageChange: (page: number) => void;
  setDrawer: (open: boolean) => void;
  fetchBadgePrinterSystemList: (query: GeneralModel.IQueryParams) => void;
  fetchBadgePrinterSystemSummary: (id: string) => void;
  deleteBadgePrinterSystem: (id: string, query: GeneralModel.IQueryParams) => void;
  setQueryParams: (params: any) => void;
  navigate: (path: string) => void;
}

const BadgePrinterSystemTab = ({
  queryParams,
  badgePrinterSystemMap,
  deviceCount,
  loading,
  summaryLoading,
  deleteLoading,
  isDrawerOpen,
  deviceListElement,
  setDrawer,
  onPageChange,
  fetchBadgePrinterSystemList,
  fetchBadgePrinterSystemSummary,
  deleteBadgePrinterSystem,
  setQueryParams,
  navigate,
}: IBadgePrintingSystemTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();
  const history = useHistory();

  const deviceList: BadgePrintingSystemModel.IBadgePrintingSystem[] = useMemo(() => Object.values(badgePrinterSystemMap), [badgePrinterSystemMap]);

  const [deviceId, setDeviceId] = useState<string>(null);

  const currentDevice = useMemo(() => badgePrinterSystemMap[deviceId] || BadgePrintingSystemModel.getFallbackBadgePrinterSystem(), [
    deviceId,
    badgePrinterSystemMap,
  ]);

  const pageCount = useMemo(() => Math.ceil(deviceCount / queryParams.limit), [deviceCount, queryParams.limit]);

  const statusOptionList = useMemo(() => [{ value: '', label: 'All Status' }, ...DeviceModel.deviceStatusOptionList], []);

  const statusFilterValue = useMemo(() => (isEmpty(queryParams.available) ? 'All Status' : DeviceModel.deviceStatusMap[Number(!queryParams.available)]), [
    queryParams.available,
  ]);

  const onDeviceStatusChange = useCallback(
    (status: DeviceModel.DeviceStatus) => {
      setQueryParams({ ...queryParams, available: isEmpty(status) ? '' : !Boolean(status), page: 1 });
    },
    [setQueryParams, queryParams]
  );

  const openDrawer = useCallback(
    (id: string, redirect: boolean) => {
      fetchBadgePrinterSystemSummary(id);
      if (redirect) {
        history.push(`/inventory/badge-printing-system/wizard/${id}`);
      } else {
        setDeviceId(id);
        setDrawer(true);
      }
    },
    [setDrawer, fetchBadgePrinterSystemSummary, history]
  );

  const onDelete = useCallback(
    (id: string) => {
      const newPage = deviceList.length === 1 && queryParams.page !== 1;
      deleteBadgePrinterSystem(id, {
        ...queryParams,
        newPage,
      });
      setDrawer(false);
    },
    [deviceList.length, queryParams, deleteBadgePrinterSystem, setDrawer]
  );

  const closeDrawer = useCallback(() => {
    setDrawer(false);
  }, [setDrawer]);

  const onCreateClick = useCallback(() => {
    navigate('/inventory/badge-printing-system/wizard/new');
  }, [navigate]);

  useEffect(() => {
    fetchBadgePrinterSystemList(queryParams);
  }, [fetchBadgePrinterSystemList, queryParams]);

  useEffect(() => {
    return function unMount() {
      setDrawer(false);
    };
  }, [setDrawer]);

  return (
    <>
      <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
        <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer}`}>
          <SelectFilter value={statusFilterValue} optionList={statusOptionList} onChange={onDeviceStatusChange} />
        </Box>
        <PermissionGuard permissionsExpression={UserModel.BadgePrintingSystemsPermission.MANAGE}>
          <Button
            className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonExtraLarge}`}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            data-testid="create-bps-btn"
            onClick={onCreateClick}
          >
            Create New BPS
          </Button>
        </PermissionGuard>
      </div>
      {loading && !loading.isLoading ? (
        <>
          <Table aria-label="device-list">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Shipping Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deviceList.map((badgePrinterSystem, index) => {
                return <BadgePrinterSystemRow badgePrinterSystem={badgePrinterSystem} key={index} openDevice={openDrawer} />;
              })}
            </TableBody>
          </Table>
          <Pagination page={queryParams.page} count={pageCount} onChange={onPageChange} />
        </>
      ) : (
        'Loading...'
      )}
      <BadgePrinterSystemDrawer
        deviceListElement={deviceListElement}
        device={currentDevice}
        isOpen={isDrawerOpen}
        isLoading={summaryLoading && summaryLoading.isLoading}
        deleteLoading={deleteLoading}
        onClose={closeDrawer}
        onDelete={onDelete}
      />
    </>
  );
};

export default memo(BadgePrinterSystemTab);
