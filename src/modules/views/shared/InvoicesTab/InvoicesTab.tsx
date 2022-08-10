import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import DetailTab from '../DetailTab/DetailTab';
import CreateInvoiceModal from '../CreateInvoiceModal';
import InvoiceTable from '../InvoiceTable';
import AutocompleteFilter from '../AutocompleteFilter/AutocompleteFilter';
import SelectFilter from '../SelectFilter/SelectFilter';

import { getConditionalDefaultValue, getDefaultValue } from '../../../../utils/generalUtils';
import { ClientModel, GeneralModel, InvoiceModel, ProjectModel, ResourceModel } from '../../../models';
import { preloadInvoice, sanitizeInvoice } from '../../../../utils/invoiceUtils';
import { tableGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';
import { useTimeZone } from '../../../../utils/useTimeZone';

export interface IInvoicesTabProps {
  isFcAdmin: boolean;
  isCreateInvoiceDisabled: boolean;
  entity?: any;
  entityType: ResourceModel.Type;
  clientMap?: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ClientModel.IClientProject>>;
  projectMap?: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ProjectModel.IProject>>;
  listLoading: GeneralModel.ILoadingStatus;
  saveInvoiceLoading: GeneralModel.ILoadingStatus;
  editInvoiceLoading: GeneralModel.ILoadingStatus;
  confirmInvoiceLoading: GeneralModel.ILoadingStatus;
  listElement: React.ReactNode;
  queryParams: GeneralModel.IQueryParams;
  count: number;
  drawer: boolean;
  invoiceMap: GeneralModel.IEntityMap<InvoiceModel.IInvoice>;
  clientColumnVisible?: boolean;
  projectColumnVisible?: boolean;
  setDrawer: (open) => void;
  onPageChange: (page: number) => void;
  fetchProjectInvoiceList?: (id: string, params: any) => void;
  fetchClientInvoiceList?: (id: string, params: any) => void;
  fetchProjectClientList?: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchClientProjectList?: (id: string, query: GeneralModel.IQueryParams) => void;
  saveInvoice: (model: any, action: InvoiceModel.InvoiceStep, queryParams?: GeneralModel.IQueryParams) => void;
  clearLoading: () => void;
  clearConfirmLoading: () => void;
  navigate: (path: string) => void;
  setQueryParams: (params: GeneralModel.IQueryParams) => void;
  fetchStatistics: (id: string) => void;
}

const InvoicesTab = ({
  isFcAdmin,
  entity,
  entityType,
  clientMap,
  projectMap,
  invoiceMap,
  listElement,
  listLoading,
  count,
  drawer,
  queryParams,
  isCreateInvoiceDisabled,
  saveInvoiceLoading,
  editInvoiceLoading,
  clientColumnVisible,
  projectColumnVisible,
  confirmInvoiceLoading,
  setDrawer,
  onPageChange,
  setQueryParams,
  fetchProjectInvoiceList,
  fetchClientInvoiceList,
  fetchProjectClientList,
  fetchClientProjectList,
  saveInvoice,
  clearLoading,
  fetchStatistics,
  clearConfirmLoading,
}: IInvoicesTabProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const [invoiceModal, setInvoiceModal] = useState({ isOpen: false, action: InvoiceModel.InvoiceAction.CREATE });
  const [submitAction, setSubmitAction] = useState<InvoiceModel.InvoiceStep>(null);
  const [invoiceId, setInvoiceId] = useState<string>(null);
  const { timeZoneOffset } = useTimeZone();

  const isProjectDetail = useMemo(() => entityType === ResourceModel.Type.PROJECT, [entityType]);
  const tabMap = useMemo(() => getConditionalDefaultValue(isProjectDetail, clientMap, projectMap), [isProjectDetail, clientMap, projectMap]);
  const filterEntityLabel = useMemo(() => getConditionalDefaultValue(isProjectDetail, 'All Clients', 'All Projects'), [isProjectDetail]);

  /* istanbul ignore next */
  const entityTabList: GeneralModel.INamedEntity[] = useMemo(() => (tabMap[entity?.id] ? Object.values(tabMap[entity?.id]) : []), [tabMap, entity]);
  const tabList = entityTabList.reduce((tot, item) => [...tot, { id: item?.id, name: item?.name }], [{ id: '', name: filterEntityLabel }]);
  const tabEntityMap = entityTabList.reduce((tot, item) => ({ ...tot, [item?.id]: item?.name }), {});

  const entityQueryParam = useMemo(() => getConditionalDefaultValue(isProjectDetail, queryParams.clientId, queryParams.projectId), [
    isProjectDetail,
    queryParams,
  ]);

  const currentInvoice = useMemo(() => invoiceMap[invoiceId] || InvoiceModel.getFallbackInvoice(), [invoiceId, invoiceMap]);

  const onOpenModal = useCallback(() => {
    setInvoiceId(null);
    setInvoiceModal(prev => ({ ...prev, isOpen: true, action: InvoiceModel.InvoiceAction.CREATE }));
  }, [setInvoiceModal]);
  const onCloseModal = useCallback(() => setInvoiceModal(prev => ({ ...prev, isOpen: false })), [setInvoiceModal]);

  const onModalConfirm = useCallback(
    /* istanbul ignore next */ invoice => {
      saveInvoice(
        sanitizeInvoice(invoice, getConditionalDefaultValue(isProjectDetail, entity.id, null), getConditionalDefaultValue(!isProjectDetail, entity.id, null)),
        submitAction,
        getConditionalDefaultValue(isProjectDetail, { ...queryParams, projectId: entity.id }, { ...queryParams, clientId: entity.id })
      );
    },
    [entity, saveInvoice, submitAction, queryParams, isProjectDetail]
  );

  const handleSetDrawer = useCallback(open => setDrawer(/* istanbul ignore next */ prev => ({ ...prev, open })), [setDrawer]);
  const onCloseDrawer = useCallback(/* istanbul ignore next */ () => setDrawer({ open: false, id: null }), [setDrawer]);

  const onFilterPeriodChange = useCallback(
    (period: number) => {
      setQueryParams({ ...queryParams, period, timeZoneOffset });
    },
    [setQueryParams, queryParams, timeZoneOffset]
  );

  const onFilterEntityChange = useCallback(
    (entityId: string) => {
      setQueryParams(getConditionalDefaultValue(isProjectDetail, { ...queryParams, clientId: entityId }, { ...queryParams, projectId: entityId }));
    },
    [setQueryParams, queryParams, isProjectDetail]
  );

  useEffect(() => {
    if (isProjectDetail) {
      fetchProjectClientList(entity?.id, { ...queryParams, status: ResourceModel.Status.ACTIVE });
    } else {
      fetchClientProjectList(entity?.id, queryParams);
    }
  }, [isProjectDetail]); // eslint-disable-line

  useEffect(() => {
    /* istanbul ignore else */
    if ((saveInvoiceLoading && !saveInvoiceLoading.isLoading) || (editInvoiceLoading && !editInvoiceLoading.isLoading)) onCloseModal();
  }, [saveInvoiceLoading, editInvoiceLoading, onCloseModal]);

  useEffect(() => {
    /* istanbul ignore else */
    if (confirmInvoiceLoading && !confirmInvoiceLoading.isLoading) {
      fetchStatistics(entity?.id);
      clearConfirmLoading();
    }
  }, [confirmInvoiceLoading, fetchStatistics, entity, clearConfirmLoading]);

  useEffect(() => {
    return function unMount() {
      onCloseDrawer();
    };
  }, [onCloseDrawer]);
  return (
    <>
      <DetailTab
        buttonLabel="Create Invoice"
        buttonTestId="open-invoice-modal-btn"
        onButtonClick={onOpenModal}
        entityId={entity.id}
        listLoading={listLoading}
        queryParams={queryParams}
        onPageChange={onPageChange}
        fetchList={getConditionalDefaultValue(isProjectDetail, fetchProjectInvoiceList, fetchClientInvoiceList)}
        count={count}
        entityMap={invoiceMap}
        tableAriaLabel="invoice-list"
        clearLoading={clearLoading}
        isDisabledButton={isCreateInvoiceDisabled}
        renderCustomTable={() => (
          <InvoiceTable
            projectId={getConditionalDefaultValue(isProjectDetail, entity.id, null)}
            clientId={getConditionalDefaultValue(!isProjectDetail, entity.id, null)}
            currentInvoice={currentInvoice}
            invoiceListRef={listElement}
            queryParams={queryParams}
            isDrawerOpen={drawer}
            setInvoiceId={setInvoiceId}
            setInvoiceModal={setInvoiceModal}
            setDrawer={handleSetDrawer}
            setQueryParams={setQueryParams}
            clientColumnVisible={clientColumnVisible}
            projectColumnVisible={projectColumnVisible}
          />
        )}
        renderFilters={() => (
          <>
            <div className={`${tableGlobalClasses.filterActionsContainerLeft} ${classes.buttonSpacer}`}>
              <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus}`}>
                <AutocompleteFilter
                  value={entityQueryParam}
                  label={getConditionalDefaultValue(entityQueryParam, tabEntityMap[entityQueryParam], filterEntityLabel)}
                  optionList={tabList}
                  onChange={onFilterEntityChange}
                />
              </Box>
              <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
              <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer}`}>
                <SelectFilter
                  value={getDefaultValue(GeneralModel.timeFilterTypeMap[queryParams.period], 'All Times')}
                  optionList={GeneralModel.workerActivityPeriodList}
                  onChange={onFilterPeriodChange}
                />
              </Box>
            </div>
          </>
        )}
      />
      <CreateInvoiceModal
        project={getConditionalDefaultValue(isProjectDetail, entity, null)}
        client={getConditionalDefaultValue(!isProjectDetail, entity, null)}
        invoiceId={invoiceId}
        initValues={preloadInvoice(currentInvoice)}
        isCreateModalOpen={invoiceModal.isOpen}
        styleClass={classes.invoiceModal}
        isLoading={saveInvoiceLoading && saveInvoiceLoading.isLoading}
        submitAction={submitAction}
        setSubmitAction={setSubmitAction}
        closeModal={onCloseModal}
        onConfirm={onModalConfirm}
      />
    </>
  );
};

export default memo(InvoicesTab);
