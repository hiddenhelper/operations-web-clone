import React, { memo, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Prompt, Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import ButtonTab from 'modules/views/shared/ButtonTab';
import ClientDrawer from 'modules/views/shared/ClientDrawer';
import Container from 'modules/views/shared/Container';
import PageTitle from 'modules/views/shared/PageTitle';
import Pagination from 'modules/views/shared/Pagination';
import StatusWidget from 'modules/views/shared/StatusWidget';

import ClientRow from './components/ClientRow';

import { ClientModel, GeneralModel, ResourceModel, StatisticsModel, UserModel } from 'modules/models';
import { getDrawerButton } from 'utils/clientUtils';
import { getConditionalDefaultValue, getDefaultValue, sortByOrder } from 'utils/generalUtils';
import { useQueryParamState } from 'utils/useQueryParamState';
import { listGlobalStyles, tableGlobalStyles } from 'assets/styles';
import { useStyles as buttonStyles } from 'modules/views/shared/FormHandler/ControlledButton/styles';

export interface IClientListProps {
  userRole: UserModel.Role;
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  mwbeList: GeneralModel.INamedEntity[];
  clientCount: number;
  listLoading: GeneralModel.ILoadingStatus;
  loading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  clientStatistics: StatisticsModel.IResourceStatistics;
  statisticsLoading: GeneralModel.ILoadingStatus;
  fetchClientList: (query: GeneralModel.IQueryParams) => void;
  fetchClientSummary: (id: string) => void;
  fetchMwbe: () => void;
  clearClientMap: () => void;
  deleteClient: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchClientStatistics: () => void;
  clearClientStatistics: () => void;
  navigate: (path: string) => void;
}

interface IQueryParams {
  filter: string;
  page: number;
  limit: number;
}

const ClientList = ({
  userRole,
  clientCount,
  clientMap,
  mwbeList,
  listLoading,
  loading,
  deleteLoading,
  clientStatistics,
  statisticsLoading,
  deleteClient,
  fetchClientSummary,
  fetchClientList,
  fetchMwbe,
  clearClientMap,
  fetchClientStatistics,
  clearClientStatistics,
  navigate,
}: IClientListProps) => {
  const listClasses = listGlobalStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();

  const clientListRef = useRef();
  const [queryParams, setQueryParams] = useQueryParamState<IQueryParams>({
    filter: ResourceModel.companyFilterMap[ResourceModel.CompanyStatus.DRAFT].key,
    page: 1,
    limit: 15,
  });
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<string>(null);
  const currentClient = useMemo(() => clientMap[companyId] || ClientModel.getFallbackClient(), [clientMap, companyId]);
  const clientList: ClientModel.IClient[] = useMemo(() => Object.values(clientMap), [clientMap]);
  const filterList = useMemo(
    () =>
      Object.values(ResourceModel.companyFilterMap)
        .filter(item => item.roleList.includes(userRole))
        .sort(sortByOrder),
    [userRole]
  );

  const pageCount = useMemo(() => Math.ceil(clientCount / queryParams.limit), [clientCount, queryParams.limit]);

  const { buttonText, linkTo } = useMemo(() => getDrawerButton(currentClient.status, currentClient.id), [currentClient.status, currentClient.id]);

  const showDetailsButton = useMemo(
    () => currentClient.status !== ResourceModel.CompanyStatus.ONBOARDING && currentClient.status !== ResourceModel.CompanyStatus.REJECTED,
    [currentClient]
  );
  const showDeleteButton = useMemo(
    () => currentClient.status !== ResourceModel.CompanyStatus.ACTIVE && currentClient.status !== ResourceModel.CompanyStatus.ARCHIVED && showDetailsButton,
    [currentClient, showDetailsButton]
  );

  const onPageChange = useCallback(
    newPage => {
      setQueryParams({ ...queryParams, page: newPage });
    },
    [setQueryParams, queryParams]
  );

  const openClient = useCallback(
    clientId => {
      fetchClientSummary(clientId);
      setCompanyId(clientId);
      setOpenDrawer(true);
    },
    [setOpenDrawer, setCompanyId, fetchClientSummary]
  );

  const closeClient = useCallback(() => setOpenDrawer(false), [setOpenDrawer]);
  const setFilter = useCallback(
    filter => {
      setQueryParams({ filter: ResourceModel.companyFilterMap[filter].key, page: 1 });
      setOpenDrawer(false);
    },
    [setOpenDrawer, setQueryParams]
  );

  const handleDeleteClient = useCallback(
    id => {
      const newPage = clientList.length === 1 && queryParams.page !== 1;

      deleteClient(id, {
        ...queryParams,
        status: ResourceModel.companyKeyFilterMap[queryParams.filter],
        newPage,
      });

      setOpenDrawer(false);
    },
    [deleteClient, clientList.length, queryParams]
  );

  const handleCreateClientClick = useCallback(() => {
    navigate('/clients/wizard/new');
  }, [navigate]);

  const handleInviteClientClick = useCallback(() => {
    navigate('/clients/invite/new');
  }, [navigate]);

  const onNavigateAway = useCallback(() => {
    setOpenDrawer(false);
    return true;
  }, [setOpenDrawer]);

  const handleDrawerButtonClick = useCallback(() => {
    navigate(linkTo);
  }, [navigate, linkTo]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!mwbeList.length) fetchMwbe();
  }, [mwbeList, fetchMwbe]);

  useEffect(() => {
    /* istanbul ignore else */
    if (mwbeList.length) {
      const isPendingApproval = queryParams.filter === ResourceModel.companyFilterMap[ResourceModel.CompanyStatus.PENDING_APPROVAL].key;
      fetchClientList({
        ...queryParams,
        companyStatuses: isPendingApproval
          ? [ResourceModel.CompanyStatus.PENDING_APPROVAL, ResourceModel.CompanyStatus.ONBOARDING_PENDING_APPROVAL]
          : [ResourceModel.companyKeyFilterMap[queryParams.filter]],
      });
    }
  }, [mwbeList, fetchClientList, queryParams]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!clientStatistics) fetchClientStatistics();
  }, [clientStatistics, fetchClientStatistics]);

  useEffect(() => {
    return function unMount() {
      clearClientMap();
      clearClientStatistics();
      setOpenDrawer(false);
    };
  }, [setOpenDrawer, clearClientMap, clearClientStatistics]);

  return (
    <Container id="client-list" ref={clientListRef}>
      <Prompt data-testid="prompt-navigate" message={onNavigateAway} />
      <div className={getConditionalDefaultValue(openDrawer, listClasses.generalListContent, '')}>
        <PageTitle
          title="Clients"
          right={
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge} ${buttonClasses.borderPrimaryButton}`}
                color="primary"
                variant="outlined"
                fullWidth={true}
                size="large"
                type="submit"
                onClick={handleCreateClientClick}
                data-testid="create-client-btn"
              >
                Create Client
              </Button>
              <Button
                className={`${buttonClasses.saveButton} ${buttonClasses.primaryButtonLarge}`}
                color="primary"
                variant="contained"
                fullWidth={true}
                size="large"
                type="submit"
                onClick={handleInviteClientClick}
                data-testid="invite-client-btn"
              >
                Invite Client
              </Button>
            </div>
          }
        />
        <div className={listClasses.widgetsWrapper} id="summary-widgets">
          <StatusWidget
            total={getDefaultValue(clientStatistics?.draft, 0)}
            status="Draft"
            content={<Link to="/clients/?filter=draft">Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getDefaultValue(clientStatistics?.pendingApproval, 0)}
            status="Pending Approval"
            content={<Link to="/clients/?filter=pending-approval">Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
          <StatusWidget
            total={getDefaultValue(clientStatistics?.active, 0)}
            status="Active"
            content={<Link to="/clients/?filter=active">Review</Link>}
            loading={statisticsLoading?.isLoading}
          />
        </div>
        <div className={tableGlobalClasses.tableWrapper}>
          <div className={tableGlobalClasses.filterContainer}>
            <div className={tableGlobalClasses.statusFilter}>
              {filterList.map(optFilter => (
                <ButtonTab key={optFilter.id} optFilter={optFilter} isActive={optFilter.key === queryParams.filter} setFilter={setFilter} />
              ))}
            </div>
          </div>
          {listLoading && !listLoading.isLoading ? (
            <>
              <Table aria-label="company-list">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Trades</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientList.map(company => (
                    <ClientRow key={company.id} company={company} onOpen={openClient} />
                  ))}
                </TableBody>
              </Table>
              <Pagination page={queryParams.page} count={pageCount} onChange={onPageChange} />
            </>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
      <ClientDrawer
        client={currentClient}
        clientListElement={clientListRef.current}
        mwbeList={mwbeList}
        isOpen={openDrawer}
        isLoading={loading && loading.isLoading}
        deleteLoading={deleteLoading}
        buttonText={buttonText}
        buttonTestId="drawerClientButton"
        showPrimaryButton={showDetailsButton}
        showSecondaryButton={showDeleteButton}
        onClose={closeClient}
        onDelete={handleDeleteClient}
        handleButtonClick={handleDrawerButtonClick}
      />
    </Container>
  );
};

export default memo(ClientList);
