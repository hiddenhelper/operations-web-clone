import React, { memo, useState, useMemo, useCallback, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import Pagination from '../../../../shared/Pagination';
import AccessControlSystemRow from './AccessControlSystemRow';
import AccessControlSystemDrawer from './AccessControlSystemDrawer';
import SelectFilter from '../../../../shared/SelectFilter';

import { GeneralModel, AccessControlSystemModel, DeviceModel, UserModel } from '../../../../../models';
import { getDefaultValue, isEmpty } from '../../../../../../utils/generalUtils';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useHistory } from 'react-router';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IAccessControlSystemTabProps {
  queryParams: GeneralModel.IQueryParams;
  accessControlSystemMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  deviceCount: number;
  loading: GeneralModel.ILoadingStatus;
  summaryLoading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  isDrawerOpen: boolean;
  deviceListElement: React.ReactNode;
  onPageChange: (page: number) => void;
  setDrawer: (open: boolean) => void;
  fetchAccessControlSystemList: (query: GeneralModel.IQueryParams) => void;
  fetchAccessControlSystemSummary: (id: string) => void;
  deleteAccessControlSystem: (id: string, query: GeneralModel.IQueryParams) => void;
  setQueryParams: (params: any) => void;
  navigate: (path: string) => void;
}

const AccessControlSystemTab = ({
  queryParams,
  accessControlSystemMap,
  deviceCount,
  loading,
  summaryLoading,
  deleteLoading,
  isDrawerOpen,
  deviceListElement,
  setDrawer,
  onPageChange,
  fetchAccessControlSystemList,
  fetchAccessControlSystemSummary,
  deleteAccessControlSystem,
  setQueryParams,
  navigate,
}: IAccessControlSystemTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();
  const history = useHistory();

  const deviceList: AccessControlSystemModel.IAccessControlSystem[] = useMemo(() => Object.values(accessControlSystemMap), [accessControlSystemMap]);

  const [deviceId, setDeviceId] = useState<string>(null);

  const currentDevice = useMemo(() => accessControlSystemMap[deviceId] || AccessControlSystemModel.getFallbackAccessControlSystem(), [
    deviceId,
    accessControlSystemMap,
  ]);

  const pageCount = useMemo(() => Math.ceil(deviceCount / queryParams.limit), [deviceCount, queryParams.limit]);

  const aclOptionTypeList = useMemo(() => [{ value: '', label: 'All Types' }, ...AccessControlSystemModel.typeOptionList], []);
  const statusOptionList = useMemo(() => [{ value: '', label: 'All Status' }, ...DeviceModel.deviceStatusOptionList], []);
  const statusFilterValue = useMemo(() => (isEmpty(queryParams.available) ? 'All Status' : DeviceModel.deviceStatusMap[Number(!queryParams.available)]), [
    queryParams.available,
  ]);

  const onDeviceTypeChange = useCallback(
    (type: AccessControlSystemModel.AccessControlSystemType) => {
      setQueryParams({ ...queryParams, type, page: 1 });
    },
    [setQueryParams, queryParams]
  );

  const onDeviceStatusChange = useCallback(
    (status: DeviceModel.DeviceStatus) => {
      setQueryParams({ ...queryParams, available: isEmpty(status) ? '' : DeviceModel.deviceStatusAvailableMap[status], page: 1 });
    },
    [setQueryParams, queryParams]
  );

  const openACSDevice = useCallback(
    (deviceIdValue, redirect) => {
      fetchAccessControlSystemSummary(deviceIdValue);
      if (redirect) {
        history.push(`/inventory/access-control-system/wizard/${deviceIdValue}`);
      } else {
        setDeviceId(deviceIdValue);
        setDrawer(true);
      }
    },
    [setDrawer, fetchAccessControlSystemSummary, history]
  );

  const handleDeleteAccessControlSystem = useCallback(
    id => {
      const newPage = deviceList.length === 1 && queryParams.page !== 1;
      deleteAccessControlSystem(id, {
        ...queryParams,
        newPage,
      });
      setDrawer(false);
    },
    [setDrawer, deleteAccessControlSystem, deviceList.length, queryParams]
  );

  const closeAcsDrawer = useCallback(() => {
    setDrawer(false);
  }, [setDrawer]);

  const handleCreateACSDeviceClick = useCallback(() => {
    navigate('/inventory/access-control-system/wizard/new');
  }, [navigate]);

  useEffect(() => {
    fetchAccessControlSystemList(queryParams);
  }, [fetchAccessControlSystemList, queryParams]);

  useEffect(() => {
    return function unMount() {
      setDrawer(false);
    };
  }, [setDrawer]);
  return (
    <>
      <div className={tableGlobalClasses.tableWrapper}>
        <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
          <div className={tableGlobalClasses.filterActionsContainerLeft}>
            <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer}`}>
              <SelectFilter
                value={getDefaultValue(AccessControlSystemModel.accessControlSystemTypeMap[queryParams.type], 'All Types')}
                optionList={aclOptionTypeList}
                onChange={onDeviceTypeChange}
              />
            </Box>
            <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
            <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer}`}>
              <SelectFilter value={statusFilterValue} optionList={statusOptionList} onChange={onDeviceStatusChange} />
            </Box>
          </div>
          <PermissionGuard permissionsExpression={UserModel.AccessControlSystemsPermission.MANAGE}>
            <Button
              className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonExtraLarge} ${buttonClasses.noPadding}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              size="large"
              data-testid="create-acs-btn"
              onClick={handleCreateACSDeviceClick}
            >
              Create New ACS
            </Button>
          </PermissionGuard>
        </div>
        {loading && !loading.isLoading ? (
          <>
            <Table aria-label="device-list">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Serial</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deviceList.map((accessControlSystem, index) => (
                  <AccessControlSystemRow accessControlSystem={accessControlSystem} key={index} openDevice={openACSDevice} />
                ))}
              </TableBody>
            </Table>
            <Pagination page={queryParams.page} count={pageCount} onChange={onPageChange} />
          </>
        ) : (
          'Loading...'
        )}
      </div>
      <AccessControlSystemDrawer
        deviceListElement={deviceListElement}
        device={currentDevice}
        isOpen={isDrawerOpen}
        isLoading={summaryLoading && summaryLoading.isLoading}
        deleteLoading={deleteLoading}
        onClose={closeAcsDrawer}
        onDelete={handleDeleteAccessControlSystem}
      />
    </>
  );
};

export default memo(AccessControlSystemTab);
