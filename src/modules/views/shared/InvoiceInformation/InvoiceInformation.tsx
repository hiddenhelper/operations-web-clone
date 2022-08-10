import React, { memo, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import Card from '../ResourceManagement/Card';
import Modal from '../Modal';
import Logo from '../Logo';
import StatusChip from '../StatusChip';
import InformationNote from '../InformationNote';
import Address from '../Address';

import { GeneralModel, InvoiceModel } from '../../../models';
import { LANG, CloseIcon, DownloadIcon } from '../../../../constants';
import {
  formatNumberWithCommas,
  getConditionalDefaultValue,
  getDefaultValue,
  getFormattedDate,
  getFormattedDecimalNumber,
} from '../../../../utils/generalUtils';
import { fullScreenModalGlobalStyles, invoiceFormGlobalStyles, tableGlobalStyles } from '../../../../assets/styles';
import { useStyles as statusChipStyles } from '../StatusChip/styles';
import { useStyles } from './styles';

export interface IInvoiceInformationProps {
  invoiceId: string;
  invoiceMap: GeneralModel.IEntityMap<InvoiceModel.IInvoice>;
  loading: GeneralModel.ILoadingStatus;
  downloadLoading: GeneralModel.ILoadingStatus;
  onClose: () => void;
  fetchInvoiceInformation: (id: string) => void;
  downloadInvoice: (id: string, name: string) => void;
}

const InvoiceInformation = ({ invoiceId, invoiceMap, loading, onClose, downloadInvoice, fetchInvoiceInformation }: IInvoiceInformationProps) => {
  const modalClasses = fullScreenModalGlobalStyles();
  const statusChipClasses = statusChipStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const invoiceStyles = invoiceFormGlobalStyles();
  const classes = useStyles();

  const invoice = useMemo(() => invoiceMap[invoiceId], [invoiceMap, invoiceId]);

  const isDraft = useMemo(() => invoice?.status === InvoiceModel.InvoiceStatus.DRAFT, [invoice]);
  const isManual = useMemo(() => invoice?.type === InvoiceModel.InvoiceType.MANUAL, [invoice]);

  const invoiceStatusMap = useMemo(
    () => ({
      [InvoiceModel.InvoiceStatus.PENDING]: { label: 'Pending', class: statusChipClasses.pending },
      [InvoiceModel.InvoiceStatus.PAID]: { label: 'Paid', class: statusChipClasses.active },
      [InvoiceModel.InvoiceStatus.DECLINED]: { label: 'Declined', class: statusChipClasses.expired },
      [InvoiceModel.InvoiceStatus.PROCESSING]: { label: 'Processing', class: statusChipClasses.active },
      [InvoiceModel.InvoiceStatus.VOIDED]: { label: 'Voided', class: statusChipClasses.Finished },
    }),
    [statusChipClasses]
  );

  const invoiceList = useMemo(() => invoice?.items || [], [invoice]);

  const onDownloadInvoice = useCallback(() => {
    const invoiceCreationDate = moment(invoice.invoiceDate).format('YYYY-MM-DD');
    downloadInvoice(invoice.id, `${invoiceCreationDate} ${invoice.invoiceNumber}`);
  }, [invoice, downloadInvoice]);

  useEffect(() => {
    fetchInvoiceInformation(invoiceId);
  }, [invoiceId, fetchInvoiceInformation]);

  return (
    <Modal
      onClose={onClose}
      show={true}
      fullScreen={true}
      render={() => (
        <>
          {loading && loading.isLoading ? (
            <div className={modalClasses.loadingSkeleton}>Loading...</div>
          ) : (
            <>
              <div className={modalClasses.headerWrapper}>
                <div className={modalClasses.headerData}>
                  <Logo styleClass={modalClasses.logoWrapper} />
                </div>
                <div className={classes.invoiceWrapper}>
                  <div className={`${classes.titleCenter}`}>
                    <Typography className={`${modalClasses.title} ${modalClasses.smallDevice}`}>{getDefaultValue(invoice?.company?.name)}</Typography>
                    <Typography className={`${modalClasses.title} ${modalClasses.smallDevice}`}>{getDefaultValue(invoice?.project.name)}</Typography>
                    <Typography className={`${modalClasses.subTitle} ${modalClasses.smallDevice}`}>
                      {getFormattedDate(invoice?.invoiceDate, GeneralModel.DateFormat.MONTH_YEAR)}.{isManual && ' Manual Invoice.'}
                    </Typography>
                  </div>
                  {!isDraft && (
                    <div className={modalClasses.actionButtons}>
                      <IconButton disableRipple={true} onClick={onDownloadInvoice} data-testid="download-invoice">
                        <DownloadIcon />
                      </IconButton>
                    </div>
                  )}
                  <div>
                    <Button disableRipple={true} className={modalClasses.closeButton} data-testid="close-invoice-info" onClick={onClose}>
                      <CloseIcon />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogContent className={`${modalClasses.cardDividerMargin} ${classes.dialogContent}`}>
                <Card
                  title={`Invoice #${invoice?.invoiceNumber}`}
                  actionStyleClass={classes.invoiceStatusWrapper}
                  secondaryAction={
                    <>
                      <span className={classes.invoiceTitleDate}>{getFormattedDate(invoice?.invoiceDate, GeneralModel.DateFormat.DATE)}</span>
                      <StatusChip
                        styleClasses={`${invoiceStatusMap[invoice?.status]?.class} ${classes.invoiceStatusChip}`}
                        label={invoiceStatusMap[invoice?.status]?.label}
                      />
                      <br />
                      <span className={`${classes.infoWrapper} ${classes.textColor}`}>Project: {getDefaultValue(invoice?.project.name)}</span>
                    </>
                  }
                >
                  <Grid container={true} className={`${classes.infoWrapper} ${classes.textColor}`}>
                    <Grid item={true} xl={1} lg={1} className={classes.infoAccent}>
                      From
                    </Grid>
                    <Grid item={true} xl={5} lg={5} className={`${classes.infoDivider}`}>
                      <div className={classes.infoAccent}>Field Control Analytics</div>
                      <div>
                        Suite 300, <span style={{ fontWeight: 'bold' }}>8350 North Central Expressway</span>
                      </div>
                      <div>Dallas, Texas, 75206, USA</div>
                    </Grid>
                    <Grid item={true} xl={1} lg={1} className={`${classes.infoAccent} ${classes.infoSecondItem}`}>
                      To
                    </Grid>
                    <Grid item={true} xl={5} lg={5} className={`${classes.infoSecondItem}`}>
                      <div className={classes.infoAccent}>{invoice?.company?.name}</div>
                      <Address address={invoice?.company?.billingAddress} bigFont={true} />
                      <div className={classes.breakWord}>
                        {`${invoice?.company?.user?.firstName} ${invoice?.company?.user?.lastName}`}: {invoice?.company?.user?.email}
                      </div>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <Typography className={`${classes.subtitle} ${classes.textColor}`}>Invoice Detail</Typography>
                  <Grid item={true} xl={12} lg={12} className={`${tableGlobalClasses.tableWrapper}`}>
                    <Table aria-label="invoice-services">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Service</TableCell>
                          <TableCell>Detail</TableCell>
                          <TableCell>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoiceList.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className={classes.serviceNameCell}>{getFormattedDate(invoice.invoiceDate, GeneralModel.DateFormat.DATE)}</TableCell>
                            <TableCell className={classes.serviceNameCell}>{item.service?.name}</TableCell>
                            <TableCell className={classes.serviceNameCell}>{item.detail}</TableCell>
                            <TableCell className={`${classes.serviceNameCell} ${classes.infoAccent}`}>
                              $ {formatNumberWithCommas(getFormattedDecimalNumber(item.amount))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                  {invoice?.notes && (
                    <div className={classes.textColor}>
                      <div className={classes.secondarySubtitle}>Notes:</div>
                      <div>{invoice.notes}</div>
                    </div>
                  )}
                  <InformationNote
                    style={{ infoContainer: { marginTop: 20 } }}
                    note={
                      <>
                        <Typography>{LANG.EN.INVOICE.PAYMENT_POLICY}</Typography>
                        <Typography>{LANG.EN.INVOICE.TAXES_CALCULTAED}</Typography>
                      </>
                    }
                  />
                  <div className={invoiceStyles.invoiceTotalsContainer}>
                    <Typography className={invoiceStyles.subTotView} align="right">
                      Subtotal: $ {formatNumberWithCommas(getFormattedDecimalNumber(invoice?.subtotal))}
                    </Typography>
                    <Typography className={invoiceStyles.subTotView} align="right">
                      Convenience Fee ({invoice?.convenienceFeeRate}%): $ {formatNumberWithCommas(getFormattedDecimalNumber(invoice?.convenienceFeeAmount))}
                    </Typography>
                    <Typography
                      className={getConditionalDefaultValue(invoice?.company?.isTaxExempt, invoiceStyles.taxExemptLabel, invoiceStyles.subTotView)}
                      style={{ marginTop: 0 }}
                      align="right"
                    >
                      {getConditionalDefaultValue(
                        invoice?.company?.isTaxExempt,
                        'This client is exempt from paying taxes.',
                        `Taxes (${invoice?.taxRate}%): $ ${formatNumberWithCommas(getFormattedDecimalNumber(invoice?.taxAmount))}`
                      )}
                    </Typography>
                    <Typography className={invoiceStyles.totalLine} align="right" component="h1" variant="h6">
                      Total: $ {formatNumberWithCommas(getFormattedDecimalNumber(invoice?.total))}
                    </Typography>
                  </div>
                </Card>
              </DialogContent>
            </>
          )}
        </>
      )}
    />
  );
};

export default memo(InvoiceInformation);
