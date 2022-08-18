import React, { memo, useCallback, useMemo } from 'react';
import { IconButton, TableCell, TableRow, withStyles } from '@material-ui/core';

import ButtonMenu from 'modules/views/shared/ButtonMenu';
import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import ControlledTooltip from 'modules/views/shared/ResourceManagement/ControlledTooltip';
import PermissionGuard from '../PermissionGuard';
import StatusChip from 'modules/views/shared/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { InvoiceModel, UserModel, GeneralModel } from 'modules/models';
import { formatNumberWithCommas, getConditionalDefaultValue, getDefaultValue, getFormattedDate, getFormattedDecimalNumber } from 'utils';
import { InvoiceIcon, ThreeDotsIcon } from 'constants/index';
import { tableRowStyles } from 'assets/styles/Tables/styles';
import { listGlobalStyles } from 'assets/styles';
import { useStyles as statusChipStyles } from '../StatusChip/styles';
import { useStyles } from './styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IInvoiceRowProps {
  invoice: InvoiceModel.IInvoice;
  isFcaUser: boolean;
  showContextActions?: boolean;
  showStatus?: boolean;
  projectColumnVisible?: boolean;
  paymentColumnVisible?: boolean;
  navigate: (path: string) => void;
  onOpen?: (id: string) => void;
  handleSelectOption?: (action: InvoiceModel.InvoiceAction, invoice: InvoiceModel.IInvoice) => void;
  onInvoiceInformationClick: (id: string, status: InvoiceModel.InvoiceStatus) => void;
}

const InvoiceRow = ({
  invoice,
  isFcaUser,
  showContextActions,
  showStatus,
  projectColumnVisible,
  paymentColumnVisible,
  navigate,
  onOpen,
  handleSelectOption,
  onInvoiceInformationClick,
}: IInvoiceRowProps) => {
  const classes = useStyles();
  const listClasses = listGlobalStyles();
  const statusChipClasses = statusChipStyles();
  const isDraft = useMemo(() => invoice.status === InvoiceModel.InvoiceStatus.DRAFT, [invoice.status]);
  const isPending = useMemo(() => invoice.status === InvoiceModel.InvoiceStatus.PENDING, [invoice.status]);
  const isDeclined = useMemo(() => invoice.status === InvoiceModel.InvoiceStatus.DECLINED, [invoice.status]);
  const isVoid = useMemo(() => invoice.status === InvoiceModel.InvoiceStatus.VOIDED, [invoice.status]);
  const isProcessing = useMemo(() => invoice.status === InvoiceModel.InvoiceStatus.PROCESSING, [invoice.status]);
  const isPaid = useMemo(() => invoice.status === InvoiceModel.InvoiceStatus.PAID, [invoice.status]);
  const contextActionsDisabled = useMemo(() => isVoid || isProcessing || isPaid, [isVoid, isProcessing, isPaid]);
  const isAutomatic = useMemo(() => invoice.type === InvoiceModel.InvoiceType.AUTOMATIC, [invoice.type]);

  const invoiceStatusMap = useMemo(
    () => ({
      [InvoiceModel.InvoiceStatus.DRAFT]: { label: 'Draft', class: statusChipClasses.assigned },
      [InvoiceModel.InvoiceStatus.PENDING]: { label: 'Pending', class: statusChipClasses.pending },
      [InvoiceModel.InvoiceStatus.PAID]: { label: 'Paid', class: statusChipClasses.active },
      [InvoiceModel.InvoiceStatus.DECLINED]: { label: 'Declined', class: statusChipClasses.expired },
      [InvoiceModel.InvoiceStatus.PROCESSING]: { label: 'Processing', class: statusChipClasses.active },
      [InvoiceModel.InvoiceStatus.VOIDED]: { label: 'Voided', class: statusChipClasses.Finished },
    }),
    [statusChipClasses]
  );

  const handleEdit = useCallback(() => {
    handleSelectOption(InvoiceModel.InvoiceAction.EDIT, invoice);
  }, [handleSelectOption, invoice]);

  const handlePay = useCallback(() => {
    handleSelectOption(InvoiceModel.InvoiceAction.PAY, invoice);
  }, [handleSelectOption, invoice]);

  const handleMarkAsPaid = useCallback(() => {
    handleSelectOption(InvoiceModel.InvoiceAction.MARK_AS_PAID, invoice);
  }, [handleSelectOption, invoice]);

  const handleDelete = useCallback(() => {
    handleSelectOption(InvoiceModel.InvoiceAction.DELETE, invoice);
  }, [handleSelectOption, invoice]);

  const handleConfirm = useCallback(() => {
    handleSelectOption(InvoiceModel.InvoiceAction.CONFIRM, invoice);
  }, [handleSelectOption, invoice]);

  const handleMarkAsVoid = useCallback(() => {
    handleSelectOption(InvoiceModel.InvoiceAction.MARK_AS_VOID, invoice);
  }, [handleSelectOption, invoice]);

  const invoiceOptionList = useMemo(() => {
    return [
      !isAutomatic && isDraft && { title: 'Edit', callback: handleEdit },
      isDraft && { title: 'Confirm', callback: handleConfirm },
      (isPending || isDeclined) && { title: 'Pay', callback: handlePay },
      (isPending || isDeclined) && { title: 'Mark as Paid', callback: handleMarkAsPaid },
      !isAutomatic && isDraft && { title: 'Delete', callback: handleDelete },
      !isAutomatic && isPending && { title: 'Void', callback: handleMarkAsVoid },
    ].filter(Boolean);
  }, [isDraft, isPending, isDeclined, isAutomatic, handlePay, handleMarkAsPaid, handleDelete, handleEdit, handleConfirm, handleMarkAsVoid]);

  const onInvoiceClick = useCallback(() => onOpen(invoice.id), [invoice, onOpen]);

  const handleInvoiceInformationClick = useCallback(
    event => {
      event?.stopPropagation();
      onInvoiceInformationClick(invoice.id, invoice.status);
    },
    [invoice.id, invoice.status, onInvoiceInformationClick]
  );
  return (
    <StyledTableRow data-testid="invoice-list-row" key={invoice.id} onClick={onInvoiceClick} className={listClasses.clickableRow}>
      <TableCell>{getDefaultValue(invoice.invoiceNumber)}</TableCell>
      {!!isFcaUser && (
        <TableCell className={listClasses.listNameFullWidth}>
          {isFcaUser && invoice.company?.id ? (
            <PermissionGuard permissionsExpression={UserModel.ClientsPermission.VIEWACCESS} fallback={<>{getDefaultValue(invoice.project.name)}</>}>
              <TableCellLink
                href={`/clients/detail/${invoice.company.id}`}
                testId="invoice-list-row-client-button"
                text={getDefaultValue(invoice.company.name)}
                title="View Client details"
              />
            </PermissionGuard>
          ) : (
            <span>{getDefaultValue(invoice.company?.name)}</span>
          )}
        </TableCell>
      )}
      {!!projectColumnVisible && (
        <TableCell className={`${listClasses.listName} ${listClasses.listNameFullWidth}`}>
          {invoice.project?.id ? (
            <TableCellLink
              href={`/projects/detail/${invoice.project.id}`}
              testId="invoice-list-row-project-button"
              text={getDefaultValue(invoice.project.name)}
              title="View Project details"
            />
          ) : (
            '-'
          )}
        </TableCell>
      )}
      <TableCell>{getDefaultValue(getFormattedDate(invoice.invoiceDate, GeneralModel.DateFormat.DATE))}</TableCell>
      {paymentColumnVisible && <TableCell>{getDefaultValue(getFormattedDate(invoice.paymentDate, GeneralModel.DateFormat.DATE))}</TableCell>}
      <TableCell className={classes.boldTableCell}>$ {getDefaultValue(formatNumberWithCommas(getFormattedDecimalNumber(invoice.total)), 0)}</TableCell>
      <TableCell>
        <div className={getConditionalDefaultValue(showStatus, classes.invoiceRowLastCell, classes.invoiceRowWithoutStatus)}>
          {showStatus && (
            <span className={classes.invoiceRowStatusCell}>
              <StatusChip
                styleClasses={`${invoiceStatusMap[invoice.status]?.class} ${classes.invoiceStatusChip}`}
                label={invoiceStatusMap[invoice.status]?.label}
              />
            </span>
          )}
          <span className={classes.invoiceRowIconsWrapper}>
            <PermissionGuard permissionsExpression={UserModel.InvoicesPermission.VIEWACCESS}>
              <ControlledButton styleClass={classes.invoiceRowButton}>
                <ControlledTooltip title={getConditionalDefaultValue(isDraft, 'Edit Invoice', 'Invoice Information')} placement="left">
                  <IconButton
                    data-testid="open-invoice-information"
                    onClick={handleInvoiceInformationClick}
                    disableRipple={true}
                    aria-label="invoice-information"
                    color="default"
                  >
                    <InvoiceIcon className={classes.invoiceIcon} />
                  </IconButton>
                </ControlledTooltip>
              </ControlledButton>
            </PermissionGuard>
            {showContextActions && (
              <PermissionGuard permissionsExpression={UserModel.InvoicesPermission.MANAGE}>
                <ControlledButton styleClass={classes.invoiceRowButton}>
                  <ButtonMenu
                    buttonProps={{
                      endIcon: (
                        <ThreeDotsIcon className={getConditionalDefaultValue(contextActionsDisabled, classes.invoiceIconDisabled, classes.invoiceIcon)} />
                      ),
                    }}
                    showDivider={false}
                    text=""
                    optionList={invoiceOptionList}
                    showIconMargin={false}
                    stopPropagation={true}
                    styleClass={classes.invoiceActionsButton}
                    disabled={contextActionsDisabled}
                  />
                </ControlledButton>
              </PermissionGuard>
            )}
          </span>
        </div>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(InvoiceRow);
