import React, { memo, useMemo } from 'react';

import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';

import Drawer from '../../ResourceManagement/Drawer';

import { InvoiceModel, GeneralModel } from '../../../../models';
import { CalendarIcon, LocationIcon, MonetizationIcon, NotesIcon, ProjectIcon } from '../../../../../constants';
import { formatNumberWithCommas, getDefaultValue, getFormattedDate } from '../../../../../utils/generalUtils';
import { getLocationString } from '../../../../../utils/addressUtils';
import { listGlobalStyles } from '../../../../../assets/styles';
import { useStyles as drawerStyles } from '../../ResourceManagement/Drawer/styles';
import { useStyles } from '../../../pages/InvoiceList/styles';

export interface IInvoiceDrawerProps {
  currentInvoice: InvoiceModel.IInvoice;
  invoiceListElement: React.ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

const InvoiceDrawer = ({ currentInvoice, invoiceListElement, isOpen, isLoading, onClose }: IInvoiceDrawerProps) => {
  const invoiceListHeight = (invoiceListElement as any)?.offsetHeight;
  const classes = useStyles();
  const listClasses = listGlobalStyles();
  const drawerClasses = drawerStyles();
  const isManual = useMemo(() => currentInvoice.type === InvoiceModel.InvoiceType.MANUAL, [currentInvoice.type]);
  return (
    <Drawer
      title="Invoice Information"
      dataTestId="invoice-drawer-detail"
      height={invoiceListHeight}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      render={() => (
        <div className={listClasses.listDetail}>
          <div className={listClasses.company}>
            <div className={drawerClasses.drawerText}>
              <Typography className={`${listClasses.listAccent} ${listClasses.entityTitle}`}>{currentInvoice.invoiceNumber ?? 'Draft Invoice'}</Typography>
              <div className={drawerClasses.drawerMainText}>{isManual && <span>Manual Invoice</span>}</div>
            </div>
            <div className={drawerClasses.drawerSection}>
              <div className={drawerClasses.drawerColumnDirection}>
                <div className={drawerClasses.drawerRowDirection}>
                  <MonetizationIcon />
                  <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                    <span className={`${listClasses.listAccent} ${classes.listIconLabel}`}>
                      $ {formatNumberWithCommas(getDefaultValue(currentInvoice.total, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
              <div className={drawerClasses.projectWrapper}>
                <LocationIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  <span className={listClasses.listAccent}>{getDefaultValue(currentInvoice.company?.name)}</span>
                  <span>{getDefaultValue(currentInvoice.company?.billingAddress?.line1)}</span>
                  <span>{getLocationString(currentInvoice.company?.billingAddress?.city, currentInvoice.company?.billingAddress?.stateName)}</span>
                </div>
              </div>
            </div>
            <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
              <div className={drawerClasses.projectWrapper}>
                <PersonIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  <span className={listClasses.listAccent}>{`${getDefaultValue(currentInvoice.company?.user?.firstName)} ${getDefaultValue(
                    currentInvoice.company?.user?.lastName
                  )}`}</span>
                  <span>{getDefaultValue(currentInvoice.company?.user?.email)}</span>
                </div>
              </div>
            </div>
            <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
              <div className={drawerClasses.projectWrapper}>
                <ProjectIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  <span className={listClasses.listAccent}>{getDefaultValue(currentInvoice.project?.name)}</span>
                  <span>{getDefaultValue(currentInvoice.project?.category)}</span>
                </div>
              </div>
            </div>
            <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
              <div className={drawerClasses.projectWrapper}>
                <CalendarIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  <span>Creation Date: {getDefaultValue(getFormattedDate(currentInvoice.invoiceDate, GeneralModel.DateFormat.DATE))}</span>
                  <span>Payment Date: {getDefaultValue(getFormattedDate(currentInvoice.paymentDate, GeneralModel.DateFormat.DATE))}</span>
                </div>
              </div>
            </div>
            <div className={`${drawerClasses.drawerSection} ${drawerClasses.drawerProjectColumn}`}>
              <div className={drawerClasses.projectWrapper}>
                <NotesIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  <span>{getDefaultValue(currentInvoice.notes)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default memo(InvoiceDrawer);
