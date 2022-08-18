import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import Container from '../../shared/Container';
import StatusWidget from '../../shared/StatusWidget';
import Review from '../../shared/ClientForm/Review';
import Modal from '../../shared/Modal';
import Confirm from '../../shared/Modal/components/Confirm';
import Card from '../../shared/ResourceManagement/Card';
import GeneralInformation from '../../shared/ClientForm/GeneralInformation';
import Addresses from '../../shared/ClientForm/Addresses';
import StepEditor from '../../shared/ResourceManagement/StepEditor';
import InvoicesTab from '../../shared/InvoicesTab';

import WorkersTab from './components/WorkersTab';
import ProjectsTab from './components/ProjectsTab';
import UsersTab from './components/UsersTab';

import { ClientModel, GeneralModel, ResourceModel, StatisticsModel, UserModel } from '../../../models';
import { FormRules } from '../../../../constants';
import {
  isUUID,
  isEmpty,
  getConditionalDefaultValue,
  getDefaultValue,
  getFormattedDecimalNumber,
  formatNumberWithCommas,
} from '../../../../utils/generalUtils';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { sanitizeClient } from '../../../../utils/clientUtils';
import { tableGlobalStyles, listGlobalStyles } from '../../../../assets/styles';
import { useStyles as modalStyles } from '../../shared/Modal/style';
import { useStyles } from './styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IClientDetailProps {
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  mwbeList: GeneralModel.INamedEntity[];
  tradeList: GeneralModel.INamedEntity[];
  clientStatistics: StatisticsModel.IClientDetailStatistics;
  updateClientLoading: GeneralModel.ILoadingStatus;
  clientLoading: GeneralModel.ILoadingStatus;
  statisticsLoading: GeneralModel.ILoadingStatus;
  isFcaUser: boolean;
  isAdmin: boolean;
  fetchClient: (id: string) => void;
  clearClientMap: () => void;
  fetchMwbe: () => void;
  fetchTradeList: () => void;
  saveClient: (client: ClientModel.IClient) => void;
  archiveClient: (id: string) => void;
  unarchiveClient: (id: string) => void;
  fetchClientStatistics: (id: string) => void;
  clearErrors: () => void;
  clearLoadingMap: () => void;
  clearClientStatistics: () => void;
}

const ClientDetail = ({
  clientMap,
  mwbeList,
  tradeList,
  clientStatistics,
  updateClientLoading,
  clientLoading,
  statisticsLoading,
  isFcaUser,
  isAdmin,
  fetchClient,
  clearClientMap,
  fetchMwbe,
  fetchTradeList,
  fetchClientStatistics,
  saveClient,
  archiveClient,
  unarchiveClient,
  clearErrors,
  clearClientStatistics,
  clearLoadingMap,
}: IClientDetailProps) => {
  const classes = useStyles();
  const modalClasses = modalStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const listClasses = listGlobalStyles();
  const clientListRef = useRef();

  const [drawer, setDrawer] = useState({ open: false, id: null });

  const { id, step } = useParams<{ id: string; step: string }>();
  const [queryParams, setQueryParams] = useQueryParamState<GeneralModel.IQueryParams>({ pageNumber: 1, pageSize: 15 });
  const [editDialogStep, setEditDialogStep] = useState<{ isOpen: boolean; step: ClientModel.ClientStep }>({
    isOpen: false,
    step: ClientModel.ClientStep.GENERAL_INFORMATION,
  });
  const [archiveDialogOpen, setArchiveDialogOpen] = useState<boolean>(false);

  const noneOption = useMemo(() => mwbeList.find(option => option.name === 'None'), [mwbeList]);
  const clientId = useMemo(() => getConditionalDefaultValue(isUUID(id), id, null), [id]);
  const currentTab = useMemo(() => getDefaultValue(step, 'projects'), [step]);
  const currentClient = useMemo(() => (clientMap[clientId] ? clientMap[clientId] : ClientModel.getFallbackClient()), [clientMap, clientId]);

  const { archiveTitle, archiveText, archiveButtonLabel, archiveCardTitle } = ResourceModel.statusClientArchiveMap[
    getConditionalDefaultValue(currentClient.status === ResourceModel.CompanyStatus.ARCHIVED, 1, 0)
  ](currentClient.name);

  const isClientLoaded = useMemo(() => !!(currentClient.id !== null && clientLoading && !clientLoading.isLoading && !clientLoading.hasError), [
    currentClient,
    clientLoading,
  ]);

  const isArchived = useMemo(() => currentClient.status === ResourceModel.CompanyStatus.ARCHIVED, [currentClient.status]);

  const onPageChange = useCallback(
    newPage => {
      setQueryParams({ ...queryParams, pageNumber: newPage });
    },
    [setQueryParams, queryParams]
  );

  const handleEditDialogOpen = useCallback((editStep: ClientModel.ClientStep) => {
    setEditDialogStep({ isOpen: true, step: editStep });
  }, []);

  const onSave = useCallback(
    (clientData: ClientModel.IClient) => {
      saveClient(sanitizeClient(clientData, noneOption.id));
    },
    [saveClient, noneOption]
  );

  const handleArchiveStatusChange = () => {
    if (currentClient.status === ResourceModel.CompanyStatus.ACTIVE) {
      archiveClient(currentClient.id);
    } else {
      unarchiveClient(currentClient.id);
    }
    setArchiveDialogOpen(false);
  };

  const getRuleMap = (model: ClientModel.IClient) => ({
    [ClientModel.ClientStep.GENERAL_INFORMATION]: FormRules.client.getGeneralInformationRules(
      model.trades?.length > 0 || !isEmpty(model.otherTrade),
      model.otherTrade,
      model.isDeveloper,
      model.hasUniversalBadge
    ),
    [ClientModel.ClientStep.ADDRESSES]: FormRules.client.getAddressesRules(model.mailingAddressMatchesBillingAddress, model.isDeveloper),
  });

  const stepToEditMap = useMemo(
    () => ({
      [ClientModel.ClientStep.GENERAL_INFORMATION]: GeneralInformation,
      [ClientModel.ClientStep.ADDRESSES]: Addresses,
    }),
    []
  );

  const formDepsMap = useMemo(
    () => ({
      [ClientModel.ClientStep.GENERAL_INFORMATION]: {
        mwbeList: mwbeList,
        tradeList: tradeList,
      },
      [ClientModel.ClientStep.ADDRESSES]: {},
    }),
    [mwbeList, tradeList]
  );

  const closeFormDialog = useCallback(() => {
    setEditDialogStep(prevState => ({ isOpen: false, step: prevState.step }));
  }, []);

  const handleArchiveClientDialogOpen = useCallback(() => {
    setArchiveDialogOpen(true);
  }, []);

  const handleArchiveDialogClose = useCallback(() => {
    setArchiveDialogOpen(false);
  }, []);

  useEffect(() => {
    /* istanbul ignore else */
    if (!clientStatistics) fetchClientStatistics(clientId);
  }, [clientStatistics, fetchClientStatistics, clientId]);

  useEffect(() => {
    /* istanbul ignore else */
    if (updateClientLoading && !updateClientLoading.isLoading && !updateClientLoading.hasError) {
      setEditDialogStep(prevState => ({ isOpen: false, step: prevState.step }));
    }
  }, [updateClientLoading]);

  useEffect(() => {
    /* istanbul ignore else */
    setDrawer({ open: false, id: null });
  }, [currentTab]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!mwbeList.length) fetchMwbe();
  }, [mwbeList, fetchMwbe]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!tradeList.length) fetchTradeList();
  }, [tradeList, fetchTradeList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (mwbeList.length && tradeList.length && !clientMap[clientId]) fetchClient(clientId);
  }, [clientMap[clientId], fetchClient, mwbeList.length, tradeList.length]); // eslint-disable-line

  useEffect(() => {
    return function unMount() {
      clearClientMap();
      clearLoadingMap();
      clearClientStatistics();
    };
  }, [clearClientMap, clearLoadingMap, clearClientStatistics]);
  return (
    <Container id="client-list" ref={clientListRef}>
      <div className={getConditionalDefaultValue(drawer.open, listClasses.generalListContent, '')}>
        <div className="client-list-header">
          <Typography className={classes.stepWrapper} color="primary" align="left">
            <Link to="/clients">Client List</Link> {'>'} Client Detail
          </Typography>
          <Typography className={listClasses.title} color="primary" align="left" component="h1" variant="h5">
            {currentClient.name}
            {isArchived && <Chip className={`${classes.statusChip}`} color="primary" label="Archived" />}
          </Typography>
        </div>
        <div className={listClasses.widgetsWrapper} id="summary-widgets">
          <PermissionGuard
            permissionsExpression={`
            ${UserModel.ClientsPermission.VIEWACCESS} AND
            ${UserModel.ClientProjectsPermission.VIEWACCESS}
            `}
          >
            <StatusWidget
              total={getDefaultValue(clientStatistics?.projects, 0)}
              status="Projects"
              content={<Link to={`/clients/detail/${clientId}/projects`}>Review</Link>}
              loading={statisticsLoading?.isLoading}
            />
          </PermissionGuard>
          <PermissionGuard
            permissionsExpression={`
            ${UserModel.ClientsPermission.VIEWACCESS} AND
            ${UserModel.ClientProjectsPermission.VIEWACCESS}
            `}
          >
            <StatusWidget
              total={getDefaultValue(clientStatistics?.workers, 0)}
              status="Workers"
              content={<Link to={`/clients/detail/${clientId}/workers`}>Review</Link>}
              loading={statisticsLoading?.isLoading}
            />
          </PermissionGuard>
          <PermissionGuard
            permissionsExpression={`
            ${UserModel.ClientsPermission.VIEWACCESS} AND
            ${UserModel.ClientProjectsPermission.VIEWACCESS}
            `}
          >
            <StatusWidget
              total={`$ ${getDefaultValue(formatNumberWithCommas(getFormattedDecimalNumber(clientStatistics?.revenue)), 0)}`}
              status="Revenue"
              content={null}
              loading={statisticsLoading?.isLoading}
            />
          </PermissionGuard>
        </div>
        <div className={tableGlobalClasses.tableWrapper}>
          <div className={tableGlobalClasses.filterContainer}>
            <div className={tableGlobalClasses.statusFilter}>
              {ClientModel.tabList.map(optFilter => (
                <Link tabIndex={-1} key={optFilter.id} to={`/clients/detail/${clientId}/${optFilter.key}`} data-testid="filter-status-opt">
                  <Button className={getConditionalDefaultValue(optFilter.key === currentTab, tableGlobalClasses.activeFilter, '')}>{optFilter.title}</Button>
                </Link>
              ))}
            </div>
          </div>
          {!isClientLoaded && 'Loading...'}
          {isClientLoaded && currentTab === 'projects' && (
            <PermissionGuard
              permissionsExpression={`
                ${UserModel.ClientsPermission.MANAGE} AND
                ${UserModel.ClientsPermission.VIEWACCESS}
              `}
            >
              <ProjectsTab
                clientId={currentClient.id}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                onPageChange={onPageChange}
                drawer={drawer.open}
                setDrawer={setDrawer}
              />
            </PermissionGuard>
          )}
          {isClientLoaded && currentTab === 'users' && <UsersTab clientId={currentClient.id} queryParams={queryParams} onPageChange={onPageChange} />}
          {isClientLoaded && currentTab === 'workers' && (
            <WorkersTab
              setQueryParams={setQueryParams}
              currentClient={currentClient}
              queryParams={queryParams}
              onPageChange={onPageChange}
              drawer={drawer.open}
              setDrawer={setDrawer}
            />
          )}
          {isClientLoaded && currentTab === 'invoices' && (
            <InvoicesTab
              entity={currentClient}
              entityType={ResourceModel.Type.CLIENT}
              queryParams={queryParams}
              onPageChange={onPageChange}
              setQueryParams={setQueryParams}
              isCreateInvoiceDisabled={isArchived}
              listElement={clientListRef.current}
              drawer={drawer.open}
              setDrawer={setDrawer}
              clientColumnVisible={false}
              fetchStatistics={fetchClientStatistics}
            />
          )}
          {isClientLoaded && currentTab === 'information' && (
            <>
              <Review model={currentClient} edit={true} editAction={handleEditDialogOpen} mwbeList={mwbeList} />
              <Card title={archiveCardTitle}>
                <PermissionGuard permissionsExpression={UserModel.ClientsPermission.MANAGE}>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.archiveButton}
                    onClick={handleArchiveClientDialogOpen}
                    data-testid="archive-btn"
                  >
                    {archiveButtonLabel}
                  </Button>
                </PermissionGuard>
              </Card>
            </>
          )}
        </div>
      </div>
      <StepEditor
        open={editDialogStep.isOpen}
        onClose={closeFormDialog}
        step={editDialogStep.step}
        Component={stepToEditMap[editDialogStep.step]}
        deps={formDepsMap[editDialogStep.step]}
        onSave={onSave}
        getRules={getRuleMap}
        currentEntity={currentClient}
        initValues={ClientModel.getFallbackClient()}
        initFieldRules={FormRules.client.draftFieldRules}
        loading={updateClientLoading}
        clearErrors={clearErrors}
        serverErrors={clientLoading && clientLoading.error}
        stepMap={ClientModel.clientStepMap}
      />
      <Modal
        show={archiveDialogOpen}
        styleClass={`${modalClasses.dialogContainer} ${classes.archiveDialog} ${getConditionalDefaultValue(archiveDialogOpen, 'open', 'closed')}`}
        onClose={handleArchiveDialogClose}
        render={() => (
          <Confirm
            title={archiveTitle}
            content={archiveText}
            confirmLabel={getConditionalDefaultValue(currentClient.status === ResourceModel.CompanyStatus.ACTIVE, 'Yes, Archive', 'Yes, Unarchive')}
            closeLabel="Close"
            onClose={handleArchiveDialogClose}
            onConfirm={handleArchiveStatusChange}
          />
        )}
      />
    </Container>
  );
};

export default memo(ClientDetail);
