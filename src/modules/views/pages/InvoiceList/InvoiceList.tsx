import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Prompt } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import StatusWidget from '../../shared/StatusWidget';
import ButtonTab from '../../shared/ButtonTab';
import Container from '../../shared/Container';
import SelectFilter from '../../shared/SelectFilter';
import PermissionGuard from 'modules/views/shared/PermissionGuard';
import InvoiceTable from '../../shared/InvoiceTable';
import CreateInvoiceModal from '../../shared/CreateInvoiceModal';
import PageTitle from '../../shared/PageTitle';

import { GeneralModel, InvoiceModel, StatisticsModel, UserModel } from '../../../models';
import { formatNumberWithCommas, getConditionalDefaultValue, getDefaultValue, getFormattedDecimalNumber } from '../../../../utils/generalUtils';
import { preloadInvoice, sanitizeInvoice } from '../../../../utils/invoiceUtils';
import { useQueryParamState } from '../../../../utils/useQueryParamState';
import { useStyles as buttonStyles } from '../../shared/FormHandler/ControlledButton/styles';
import { listGlobalStyles, tableGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';
import { useTimeZone } from '../../../../utils/useTimeZone';

export interface IInvoiceListProps {
  invoiceMap: GeneralModel.IEntityMap<InvoiceModel.IInvoice>;
  saveInvoiceLoading: GeneralModel.ILoadingStatus;
  editInvoiceLoading: GeneralModel.ILoadingStatus;
  invoiceStatisticsLoading: GeneralModel.ILoadingStatus;
  invoiceStatistics: StatisticsModel.IInvoiceStatistics;
  fetchInvoiceLoading: GeneralModel.ILoadingStatus;
  payInvoiceLoading: GeneralModel.ILoadingStatus;
  isFcaUser: boolean;
  isAdmin: boolean;
  saveInvoice: (invoice: InvoiceModel.IInvoice, action: InvoiceModel.InvoiceStep) => void;
  editInvoice: (id: string, invoice: InvoiceModel.IInvoice, action: InvoiceModel.InvoiceStep) => void;
  fetchInvoiceList: (params: GeneralModel.IQueryParams) => void;
  fetchInvoiceStatistics: () => void;
  clearInvoiceMap: () => void;
  clearInvoiceStatistics: () => void;
}

const InvoiceList = ({
  invoiceMap,
  saveInvoiceLoading,
  editInvoiceLoading,
  invoiceStatistics,
  invoiceStatisticsLoading,
  fetchInvoiceLoading,
  payInvoiceLoading,
  isFcaUser,
  isAdmin,
  saveInvoice,
  editInvoice,
  fetchInvoiceList,
  fetchInvoiceStatistics,
  clearInvoiceMap,
  clearInvoiceStatistics,
}: IInvoiceListProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();
  const listClasses = listGlobalStyles();
  const classes = useStyles();
  const invoiceListRef = useRef();
  const { timeZoneOffset } = useTimeZone();

  const [queryParams, setQueryParams] = useQueryParamState<GeneralModel.IQueryParams>(InvoiceModel.defaultInvoiceSearch);

  const [invoiceId, setInvoiceId] = useState<string>(null);
  const [invoiceModal, setInvoiceModal] = useState({ isOpen: false, action: InvoiceModel.InvoiceAction.CREATE });
  const [isDrawerOpen, setDrawer] = useState<boolean>(false);
  const [submitAction, setSubmitAction] = useState<InvoiceModel.InvoiceStep>(null);

  const currentInvoice = useMemo(() => invoiceMap[invoiceId] || InvoiceModel.getFallbackInvoice(), [invoiceId, invoiceMap]);
  const isFcAdmin = useMemo(() => isFcaUser && isAdmin, [isFcaUser, isAdmin]);
  const filterList = useMemo(() => Object.values(InvoiceModel.filterMap).sort((a, b) => a.order - b.order), []);

  const onConfirm = useCallback(
    (invoice: InvoiceModel.IInvoice) => {
      const sanitizedInvoice = sanitizeInvoice(invoice);
      if (invoiceModal.action === InvoiceModel.InvoiceAction.CREATE) {
        saveInvoice(sanitizedInvoice, submitAction);
      } else {
        editInvoice(invoiceId, sanitizedInvoice, submitAction);
      }
    },
    [saveInvoice, editInvoice, invoiceModal.action, invoiceId, submitAction]
  );

  const onCloseModal = useCallback(() => setInvoiceModal(prev => ({ ...prev, isOpen: false })), [setInvoiceModal]);
  const onOpenModal = useCallback(() => {
    setInvoiceId(null);
    setInvoiceModal(prev => ({ ...prev, isOpen: true, action: InvoiceModel.InvoiceAction.CREATE }));
  }, [setInvoiceModal]);

  const setFilter = useCallback(
    filter => {
      setQueryParams({
        isPaid: InvoiceModel.filterMap[filter].value,
        pageNumber: 1,
        sortingName: InvoiceModel.filterMap[filter].value ? InvoiceModel.InvoiceSortingName.PAYMENT_DATE : undefined,
      });
      setDrawer(false);
    },
    [setQueryParams, setDrawer]
  );

  const handleCreateInvoiceClick = useCallback(() => onOpenModal(), [onOpenModal]);

  const onFilterPeriodChange = useCallback((period: number) => setQueryParams({ ...queryParams, period, pageNumber: 1, timeZoneOffset }), [
    setQueryParams,
    queryParams,
    timeZoneOffset,
  ]);

  const onNavigateAway = useCallback(() => {
    setDrawer(false);
    return true;
  }, [setDrawer]);

  useEffect(() => {
    if (!!payInvoiceLoading?.hasError) {
      fetchInvoiceList({ ...queryParams });
    }
  }, [payInvoiceLoading, queryParams, fetchInvoiceList]);

  useEffect(() => {
    /* istanbul ignore else */
    if ((saveInvoiceLoading && !saveInvoiceLoading.isLoading) || (editInvoiceLoading && !editInvoiceLoading.isLoading)) onCloseModal();
  }, [saveInvoiceLoading, editInvoiceLoading, onCloseModal]);

  useEffect(() => {
    fetchInvoiceList({ ...queryParams });
    fetchInvoiceStatistics();
  }, [fetchInvoiceList, fetchInvoiceStatistics, queryParams]);

  useEffect(() => {
    return function unMount() {
      clearInvoiceMap();
      clearInvoiceStatistics();
      setDrawer(false);
    };
  }, [clearInvoiceMap, clearInvoiceStatistics]);
  return (
    <>
      <Container ref={invoiceListRef}>
        <Prompt data-testid="prompt-navigate" message={onNavigateAway} />
        <div className={getConditionalDefaultValue(isDrawerOpen, classes.deviceListContent, '')}>
          <PageTitle
            title="Invoices"
            right={
              <PermissionGuard
                permissionsExpression={`
                  ${UserModel.InvoicesPermission.MANAGE} AND
                  ${UserModel.ClientsPermission.VIEWACCESS}
                `}
              >
                <Button
                  className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge}`}
                  color="primary"
                  variant="contained"
                  fullWidth={true}
                  size="large"
                  data-testid="create-invoice-btn"
                  onClick={handleCreateInvoiceClick}
                >
                  Create Invoice
                </Button>
              </PermissionGuard>
            }
          />
          <div className={listClasses.widgetsWrapper} id="summary-widgets">
            <StatusWidget
              total={getDefaultValue(formatNumberWithCommas(invoiceStatistics?.unpaid), 0)}
              status="Unpaid"
              content={<Link to="#">Review</Link>}
              loading={invoiceStatisticsLoading?.isLoading}
            />
            <StatusWidget
              total={getDefaultValue(formatNumberWithCommas(invoiceStatistics?.paid), 0)}
              status="Paid"
              content={<Link to="/invoices?isPaid=true">Review</Link>}
              loading={invoiceStatisticsLoading?.isLoading}
            />
            <StatusWidget
              total={`$ ${getDefaultValue(formatNumberWithCommas(getFormattedDecimalNumber(invoiceStatistics?.revenue)), 0)}`}
              status={getConditionalDefaultValue(isFcAdmin, 'Revenue', 'Invoices')}
              content={null}
              loading={invoiceStatisticsLoading?.isLoading}
            />
          </div>
          <div className={tableGlobalClasses.tableWrapper}>
            <div className={tableGlobalClasses.filterContainer}>
              <div className={tableGlobalClasses.statusFilter}>
                {filterList.map(optFilter => (
                  <ButtonTab key={optFilter.id} optFilter={optFilter} isActive={queryParams.isPaid === optFilter.value} setFilter={setFilter} />
                ))}
              </div>
              <div className={tableGlobalClasses.filterActionsContainer}>
                <Box className={tableGlobalClasses.filterStatusContainer}>
                  <SelectFilter
                    value={getDefaultValue(GeneralModel.timeFilterTypeMap[queryParams.period], 'All')}
                    optionList={GeneralModel.timeFilterOptionList}
                    onChange={onFilterPeriodChange}
                  />
                </Box>
              </div>
            </div>
            <InvoiceTable
              currentInvoice={currentInvoice}
              invoiceListRef={invoiceListRef}
              queryParams={queryParams}
              isDrawerOpen={isDrawerOpen}
              paymentColumnVisible={queryParams.isPaid}
              clientColumnVisible={isFcAdmin}
              setDrawer={setDrawer}
              setInvoiceId={setInvoiceId}
              setInvoiceModal={setInvoiceModal}
              setQueryParams={setQueryParams}
            />
          </div>
        </div>
      </Container>
      <CreateInvoiceModal
        isCreateModalOpen={invoiceModal.isOpen}
        invoiceId={invoiceId}
        submitAction={submitAction}
        loadingValues={fetchInvoiceLoading && fetchInvoiceLoading.isLoading}
        styleClass={classes.invoiceModal}
        isLoading={(saveInvoiceLoading && saveInvoiceLoading.isLoading) || (editInvoiceLoading && editInvoiceLoading.isLoading)}
        setSubmitAction={setSubmitAction}
        initValues={preloadInvoice(currentInvoice)}
        closeModal={onCloseModal}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default memo(InvoiceList);
