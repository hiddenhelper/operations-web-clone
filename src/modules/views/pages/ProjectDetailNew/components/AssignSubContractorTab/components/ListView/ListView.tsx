import React, { memo, useMemo, useEffect, useRef, useCallback, useState } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead, withStyles } from '@material-ui/core';

import ClientDrawer from 'modules/views/shared/ClientDrawer';
import EditTaxesModal from 'modules/views/shared/ClientDrawer/EditTaxesModal';
import Modal from 'modules/views/shared/Modal';
import Pagination from 'modules/views/shared/Pagination';
import StatusChip from 'modules/views/shared/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

import { GeneralModel, ClientModel, ProjectModel, UserModel } from 'modules/models';
import { stateMap } from 'constants/index';
import { getTradesString } from 'utils/tradeUtils';
import { useStyles as statusChipStyles } from '../../../../../../shared/StatusChip/styles';
import { useStyles as modalStyles } from '../../../../../../shared/Modal/style';
import { useStyles, tableRowStyles } from '../../../../styles';
import { hasValidPermissions } from 'modules/models/user';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IListViewProps {
  projectId: string;
  queryParams: GeneralModel.IQueryParams;
  clientMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ClientModel.IClientProject>>;
  clientCount: number;
  mwbeList: GeneralModel.INamedEntity[];
  clientLoading: GeneralModel.ILoadingStatus;
  assignClientLoading: GeneralModel.ILoadingStatus;
  projectClientSummaryLoading: GeneralModel.ILoadingStatus;
  taxConditionLoading: GeneralModel.ILoadingStatus;
  drawer: { open: boolean; id: string };
  currentUserPermissions: UserModel.IPermission[];
  setDrawer: ({ open: boolean, id: string }) => void;
  closeModal: () => void;
  onPageChange: (page: number) => void;
  fetchProjectClientList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchProjectClientSummary: (projectId: string, companyId: string) => void;
  updateTaxCondition: (projectId: string, taxCondition: ProjectModel.IClientTaxCondition) => void;
  fetchMwbe: () => void;
  isFcaUser: boolean;
  isAdmin: boolean;
}

const ListView = ({
  projectId,
  queryParams,
  clientMap,
  clientCount,
  mwbeList,
  clientLoading,
  assignClientLoading,
  projectClientSummaryLoading,
  taxConditionLoading,
  drawer,
  currentUserPermissions,
  isFcaUser,
  isAdmin,
  setDrawer,
  closeModal,
  onPageChange,
  fetchProjectClientList,
  fetchProjectClientSummary,
  updateTaxCondition,
  fetchMwbe,
}: IListViewProps) => {
  const classes = useStyles();
  const statusChipClasses = statusChipStyles();
  const modalClasses = modalStyles();
  const clientListRef = useRef();
  const [showEditTaxModal, setShowEditTaxModal] = useState(false);

  const countClients = useMemo(() => Math.ceil(clientCount / queryParams.limit), [clientCount, queryParams.limit]);
  const clientList = useMemo(() => (projectId && Object.keys(clientMap).length && clientMap[projectId] ? Object.values(clientMap[projectId]) : []), [
    clientMap,
    projectId,
  ]);

  const currentClient = useMemo(
    /* istanbul ignore next */ () =>
      projectId && Object.keys(clientMap).length && clientMap[projectId] && clientMap[projectId][drawer?.id]
        ? clientMap[projectId][drawer?.id]
        : { ...ClientModel.getFallbackClient(), isTaxExempt: false },
    [projectId, clientMap, drawer]
  );

  const clientProjectStatusMap = useMemo(
    () => ({
      [ProjectModel.CompanyProjectStatus.PENDING]: { label: 'Pending', class: statusChipClasses.pending },
      [ProjectModel.CompanyProjectStatus.ACCEPTED]: { label: 'Accepted', class: statusChipClasses.active },
      [ProjectModel.CompanyProjectStatus.REJECTED]: { label: 'Rejected', class: statusChipClasses.expired },
    }),
    [statusChipClasses]
  );

  const onOpenDrawer = useCallback(
    (clientId: string) => {
      fetchProjectClientSummary(projectId, clientId);
      setDrawer({ open: true, id: clientId });
    },
    [setDrawer, fetchProjectClientSummary, projectId]
  );
  const onCloseDrawer = useCallback(/* istanbul ignore next */ () => setDrawer({ open: false, id: null }), [setDrawer]);

  const closeTaxesModal = useCallback(/* istanbul ignore next */ () => setShowEditTaxModal(false), [setShowEditTaxModal]);

  const handleEditTaxButtonClick = useCallback(() => {
    setShowEditTaxModal(true);
  }, [setShowEditTaxModal]);

  const handleEditTaxConfirm = useCallback(
    condition => {
      updateTaxCondition(projectId, { companyId: currentClient.id, isTaxExempt: condition });
    },
    [updateTaxCondition, projectId, currentClient.id]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (!mwbeList.length) fetchMwbe();
  }, [mwbeList, fetchMwbe]);

  useEffect(() => {
    /* istanbul ignore else */
    if (projectId) fetchProjectClientList(projectId, queryParams);
  }, [projectId, queryParams, fetchProjectClientList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (assignClientLoading && !assignClientLoading.isLoading) {
      closeModal();
      fetchProjectClientList(projectId, queryParams);
    }
  }, [assignClientLoading, projectId, queryParams, closeModal, fetchProjectClientList]);

  useEffect(() => {
    if (taxConditionLoading && !taxConditionLoading.isLoading) {
      setShowEditTaxModal(false);
    }
  }, [taxConditionLoading]);

  useEffect(() => {
    return function unMount() {
      onCloseDrawer();
    };
  }, [onCloseDrawer]);

  if (clientLoading && clientLoading.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Table aria-label="client-list">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role in Project</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Trades</TableCell>
            <TableCell>Status in Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientList.map(client => (
            <StyledTableRow
              data-testid="client-list-row"
              key={client.id}
              onClick={() => (hasValidPermissions(UserModel.ClientsPermission.VIEWACCESS, currentUserPermissions) ? onOpenDrawer(client.id) : '')}
              className={classes.pointer}
            >
              <TableCell data-testid="project-client-row">
                <PermissionGuard shouldbeFCAUser={true} permissionsExpression={UserModel.ClientsPermission.VIEWACCESS} fallback={<>{client.name}</>}>
                  <TableCellLink href={`/clients/detail/${client.id}`} text={client.name} title="View Client details" />
                </PermissionGuard>
              </TableCell>
              <TableCell>{ProjectModel.roleMap[client.role]}</TableCell>
              <TableCell>
                {client?.jobSiteAddress?.city ? (
                  <>
                    {client.jobSiteAddress.city}, {stateMap[client.jobSiteAddress.stateCode]}
                  </>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>{getTradesString(client.trades, client.otherTrade)}</TableCell>
              <TableCell>
                <StatusChip
                  styleClasses={`${clientProjectStatusMap[client.companyProjectStatus].class} `}
                  label={clientProjectStatusMap[client.companyProjectStatus].label}
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={queryParams.page} count={countClients} onChange={onPageChange} />
      <PermissionGuard permissionsExpression={UserModel.ClientsPermission.VIEWACCESS}>
        <ClientDrawer
          isOpen={drawer?.open}
          isLoading={projectClientSummaryLoading?.isLoading}
          showTaxExempt={true}
          showPrimaryButton={isFcaUser}
          showSecondaryButton={false}
          buttonText="Edit Taxes"
          buttonTestId="drawerEditTaxButton"
          client={currentClient}
          clientListElement={clientListRef.current}
          mwbeList={mwbeList}
          onClose={onCloseDrawer}
          handleButtonClick={handleEditTaxButtonClick}
        />
      </PermissionGuard>
      <PermissionGuard permissionsExpression={UserModel.ClientProjectsPermission.MANAGE}>
        <Modal
          show={showEditTaxModal}
          styleClass={`${modalClasses.dialogContainer} ${modalClasses.deleteModal} ${classes.taxPopUpContainer}`}
          render={() => (
            <EditTaxesModal
              taxCondition={currentClient.isTaxExempt}
              loading={taxConditionLoading?.isLoading}
              onCancel={closeTaxesModal}
              onConfirm={handleEditTaxConfirm}
            />
          )}
        />
      </PermissionGuard>
    </>
  );
};

export default memo(ListView);
