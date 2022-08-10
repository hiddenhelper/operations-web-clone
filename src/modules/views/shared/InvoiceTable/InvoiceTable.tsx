import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import InvoiceRow from '../InvoiceForm/InvoiceRow';
import Pagination from '../Pagination/Pagination';
import InvoiceDrawer from './components/InvoiceDrawer';
import Modal from '../Modal';
import Confirm from '../Modal/components/Confirm';
import InvoiceInformation from '../InvoiceInformation';
import EmptyList from '../EmptyList';

import { GeneralModel, InvoiceModel, UserModel } from '../../../models';
import { formatNumberWithCommas, getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { InvoiceIcon } from '../../../../constants';
import { useStyles as modalStyles } from '../Modal/style';
import { useStyles } from './styles';

export interface IInvoiceTableProps {
  invoiceMap: GeneralModel.IEntityMap<InvoiceModel.IInvoice>;
  invoiceCount: number;
  currentInvoice: InvoiceModel.IInvoice;
  invoiceListRef: any;
  isDrawerOpen: boolean;
  projectId?: string;
  clientId?: string;
  queryParams: GeneralModel.IQueryParams;
  listLoading: GeneralModel.ILoadingStatus;
  invoiceDetailLoading: GeneralModel.ILoadingStatus;
  deleteLoading: GeneralModel.ILoadingStatus;
  markAsPaidLoading: GeneralModel.ILoadingStatus;
  payLoading: GeneralModel.ILoadingStatus;
  voidLoading: GeneralModel.ILoadingStatus;
  confirmInvoiceLoading: GeneralModel.ILoadingStatus;
  clientColumnVisible?: boolean;
  projectColumnVisible?: boolean;
  paymentColumnVisible?: boolean;
  currentUserPermissions?: UserModel.IPermission[];
  isFcaUser: boolean;
  isAdmin: boolean;
  setInvoiceId: (id) => void;
  setDrawer: (isOpen: boolean) => void;
  setQueryParams: (params: GeneralModel.IQueryParams) => void;
  setInvoiceModal: (modal: any) => void;
  fetchInvoice: (id: string) => void;
  payInvoice: (id: string, params: GeneralModel.IQueryParams) => void;
  deleteInvoice: (id: string, params: GeneralModel.IQueryParams) => void;
  markAsVoidInvoice: (id: string, params: GeneralModel.IQueryParams) => void;
  confirmInvoice: (id: string, params: GeneralModel.IQueryParams) => void;
  markAsPaidInvoice: (id: string, params: GeneralModel.IQueryParams) => void;
  fetchInvoiceSummary: (id: string) => void;
  navigate: (path: string) => void;
}

const InvoiceTable = ({
  invoiceMap,
  currentInvoice,
  invoiceListRef,
  invoiceCount,
  queryParams,
  isDrawerOpen,
  projectId,
  clientId,
  listLoading,
  invoiceDetailLoading,
  deleteLoading,
  markAsPaidLoading,
  payLoading,
  voidLoading,
  confirmInvoiceLoading,
  clientColumnVisible = true,
  projectColumnVisible = true,
  paymentColumnVisible = false,
  currentUserPermissions,
  isFcaUser,
  isAdmin,
  setInvoiceId,
  setInvoiceModal,
  setDrawer,
  fetchInvoice,
  payInvoice,
  deleteInvoice,
  markAsVoidInvoice,
  confirmInvoice,
  markAsPaidInvoice,
  fetchInvoiceSummary,
  setQueryParams,
  navigate,
}: IInvoiceTableProps) => {
  const modalClasses = modalStyles();
  const classes = useStyles();

  const [invoiceInformationModal, setInvoiceInformationModal] = useState<{ id: string; open: boolean }>({ id: null, open: false });

  const [invoiceToConfirm, setConfirmInvoice] = useState<{ invoice: InvoiceModel.IInvoice; action: InvoiceModel.InvoiceAction }>({
    invoice: null,
    action: null,
  });

  const newQueryParams = useMemo(() => {
    if (projectId) return { ...queryParams, projectId };
    if (clientId) return { ...queryParams, clientId };
    return queryParams;
  }, [projectId, clientId, queryParams]);

  const invoiceList: InvoiceModel.IInvoice[] = useMemo(() => Object.values(invoiceMap), [invoiceMap]);
  const isConfirmLoading = useMemo(
    () => deleteLoading?.isLoading || markAsPaidLoading?.isLoading || payLoading?.isLoading || voidLoading?.isLoading || confirmInvoiceLoading?.isLoading,
    [deleteLoading, markAsPaidLoading, payLoading, voidLoading, confirmInvoiceLoading]
  );

  const onMarkAsPaid = useCallback(() => markAsPaidInvoice(invoiceToConfirm.invoice?.id, newQueryParams), [
    invoiceToConfirm,
    markAsPaidInvoice,
    newQueryParams,
  ]);

  const onDeleteInvoice = useCallback(() => deleteInvoice(invoiceToConfirm.invoice?.id, newQueryParams), [invoiceToConfirm, deleteInvoice, newQueryParams]);

  const onPay = useCallback(() => payInvoice(invoiceToConfirm.invoice?.id, newQueryParams), [invoiceToConfirm, payInvoice, newQueryParams]);

  const onConfirmInvoice = useCallback(() => confirmInvoice(invoiceToConfirm.invoice?.id, newQueryParams), [confirmInvoice, invoiceToConfirm, newQueryParams]);

  const onMarkAsVoid = useCallback(() => markAsVoidInvoice(invoiceToConfirm.invoice?.id, newQueryParams), [
    markAsVoidInvoice,
    invoiceToConfirm,
    newQueryParams,
  ]);

  const modalContentMap = useMemo(
    () => ({
      [InvoiceModel.InvoiceAction.CONFIRM]: {
        title: `Confirm Invoice Draft?`,
        text: 'An already confirmed invoice cannot be edited or deleted.',
        label: 'Yes, Confirm',
        loadingText: 'Confirming...',
        callback: onConfirmInvoice,
      },
      [InvoiceModel.InvoiceAction.PAY]: {
        title: `Pay Invoice #${invoiceToConfirm.invoice?.invoiceNumber} for $${formatNumberWithCommas(invoiceToConfirm.invoice?.total)}?`,
        text: 'If the payment is successful, the invoice will be moved to Paid.',
        label: 'Yes, Pay',
        loadingText: 'Paying...',
        callback: onPay,
      },
      [InvoiceModel.InvoiceAction.MARK_AS_PAID]: {
        title: `Mark as Paid Invoice #${invoiceToConfirm.invoice?.invoiceNumber} for $${formatNumberWithCommas(invoiceToConfirm.invoice?.total)}?`,
        text: 'The invoice will be moved to Paid.',
        label: 'Yes, Mark as Paid',
        loadingText: 'Marking as paid...',
        callback: onMarkAsPaid,
      },
      [InvoiceModel.InvoiceAction.MARK_AS_VOID]: {
        title: `Void Invoice #${invoiceToConfirm.invoice?.invoiceNumber}?`,
        text: 'A voided invoice cannot be edited or paid.',
        label: 'Yes, Void',
        loadingText: 'Voiding...',
        callback: onMarkAsVoid,
      },
      [InvoiceModel.InvoiceAction.DELETE]: {
        title: `Delete Invoice Draft?`,
        text: 'If you do it, all the information entered will be lost.',
        label: 'Yes, Delete',
        loadingText: 'Deleting...',
        callback: onDeleteInvoice,
      },
    }),
    [onDeleteInvoice, onMarkAsPaid, onPay, onConfirmInvoice, onMarkAsVoid, invoiceToConfirm]
  );

  const [confirmActionModal, setConfirmActionModal] = useState({
    isOpen: false,
    content: modalContentMap[InvoiceModel.InvoiceAction.PAY],
  });

  const handleConfirmActionClose = useCallback(() => {
    setConfirmActionModal(prev => ({ ...prev, isOpen: false }));
    setConfirmInvoice({ invoice: null, action: null });
  }, [setConfirmActionModal, setConfirmInvoice]);

  const handleSelectOption = useCallback(
    (action: InvoiceModel.InvoiceAction, invoice: InvoiceModel.IInvoice) => {
      if (action === InvoiceModel.InvoiceAction.EDIT) {
        fetchInvoice(invoice.id);
        setInvoiceId(invoice.id);
        setInvoiceModal(prev => ({ ...prev, isOpen: true, action }));
      } else {
        setConfirmInvoice({ invoice, action });
      }
    },
    [setConfirmInvoice, fetchInvoice, setInvoiceId, setInvoiceModal]
  );

  const pageCount = useMemo(() => Math.ceil(invoiceCount / (queryParams.pageSize || queryParams.limit)), [invoiceCount, queryParams]);

  const currentPage = useMemo(() => queryParams.pageNumber || queryParams.page, [queryParams]);

  const onPageChange = useCallback(newPage => setQueryParams({ ...queryParams, pageNumber: newPage }), [setQueryParams, queryParams]);

  const openInvoice = useCallback(
    (id: string) => {
      const currentUserPermissionNames = currentUserPermissions.map(({ name }) => name);
      const hasRequiredPermissions = currentUserPermissionNames.includes(UserModel.InvoicesPermission.VIEWACCESS);
      if (hasRequiredPermissions) {
        fetchInvoiceSummary(id);
        setInvoiceId(id);
        setDrawer(true);
      }
    },
    [currentUserPermissions, fetchInvoiceSummary, setDrawer, setInvoiceId]
  );

  const closeInvoice = useCallback(() => setDrawer(false), [setDrawer]);

  const onOpenInvoiceInformation = useCallback(
    (id: string, status: InvoiceModel.InvoiceStatus) => {
      if (status === InvoiceModel.InvoiceStatus.DRAFT) {
        fetchInvoice(id);
        setInvoiceId(id);
        setInvoiceModal(prev => ({ ...prev, isOpen: true, action: InvoiceModel.InvoiceAction.EDIT }));
      } else {
        setInvoiceInformationModal({ id, open: true });
      }
    },
    [setInvoiceInformationModal, fetchInvoice, setInvoiceId, setInvoiceModal]
  );

  const onCloseInvoiceInformation = useCallback(() => setInvoiceInformationModal(prevState => ({ ...prevState, open: false })), [setInvoiceInformationModal]);

  useEffect(() => {
    /* istanbul ignore next */
    if (
      (deleteLoading && !deleteLoading.isLoading) ||
      (markAsPaidLoading && !markAsPaidLoading.isLoading) ||
      (payLoading && !payLoading.isLoading) ||
      (voidLoading && !voidLoading.isLoading)
    ) {
      handleConfirmActionClose();
    }
  }, [handleConfirmActionClose, deleteLoading, markAsPaidLoading, payLoading, voidLoading]);

  useEffect(() => {
    if (confirmInvoiceLoading && !confirmInvoiceLoading.isLoading) handleConfirmActionClose();
  }, [confirmInvoiceLoading, handleConfirmActionClose]);

  useEffect(() => {
    if (invoiceToConfirm.invoice) setConfirmActionModal({ isOpen: true, content: modalContentMap[invoiceToConfirm.action] });
  }, [invoiceToConfirm, modalContentMap]);
  const isFcAdmin: boolean = useMemo(() => isFcaUser && isAdmin, [isFcaUser, isAdmin]);

  useEffect(() => {
    setQueryParams({ ...queryParams });
    setInvoiceInformationModal(prevState => ({ ...prevState, open: false }));
  }, [onPageChange, queryParams, setQueryParams]);

  return (
    <>
      {listLoading && !listLoading.isLoading ? (
        <>
          {invoiceList.length ? (
            <>
              <Table aria-label="invoice-list">
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    {clientColumnVisible ? <TableCell>Client</TableCell> : null}
                    {projectColumnVisible ? <TableCell>Project</TableCell> : null}
                    <TableCell>Creation Date</TableCell>
                    {paymentColumnVisible ? <TableCell>Payment Date</TableCell> : null}
                    <TableCell>Amount</TableCell>
                    <TableCell>{getConditionalDefaultValue(!queryParams.isPaid, 'Status', '')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceList.map(invoice => (
                    <InvoiceRow
                      key={invoice.id}
                      invoice={invoice}
                      showContextActions={!queryParams.isPaid}
                      navigate={navigate}
                      showStatus={!queryParams.isPaid}
                      onOpen={openInvoice}
                      handleSelectOption={handleSelectOption}
                      onInvoiceInformationClick={onOpenInvoiceInformation}
                      isFcAdmin={isFcAdmin}
                      clientColumnVisible={clientColumnVisible}
                      projectColumnVisible={projectColumnVisible}
                      paymentColumnVisible={paymentColumnVisible}
                    />
                  ))}
                </TableBody>
              </Table>
              <Pagination data-testid="pagination" page={currentPage} count={pageCount} onChange={onPageChange} />
            </>
          ) : (
            <EmptyList icon={<InvoiceIcon />} text="There are no Invoices created" />
          )}
        </>
      ) : (
        'Loading...'
      )}
      <InvoiceDrawer
        currentInvoice={currentInvoice}
        invoiceListElement={invoiceListRef}
        isOpen={isDrawerOpen}
        isLoading={invoiceDetailLoading?.isLoading}
        onClose={closeInvoice}
      />
      <Modal
        show={confirmActionModal.isOpen}
        styleClass={`${modalClasses.dialogContainer} ${classes.confirmDialog} ${confirmActionModal.isOpen ? 'open' : 'closed'}`}
        onClose={handleConfirmActionClose}
        render={() => (
          <Confirm
            title={confirmActionModal.content.title}
            content={confirmActionModal.content.text}
            confirmLabel={confirmActionModal.content.label}
            isLoading={isConfirmLoading}
            confirmLoadingText={confirmActionModal.content.loadingText}
            closeLabel="Close"
            confirmButtonStyleClass={classes.confirmButton}
            onClose={handleConfirmActionClose}
            onConfirm={confirmActionModal.content.callback}
          />
        )}
      />
      {invoiceInformationModal.open && <InvoiceInformation invoiceId={invoiceInformationModal.id} onClose={onCloseInvoiceInformation} />}
    </>
  );
};

export default memo(InvoiceTable);
