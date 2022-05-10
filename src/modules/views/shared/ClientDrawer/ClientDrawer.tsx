import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';

import ControlledButton from '../FormHandler/ControlledButton';
import Drawer from '../ResourceManagement/Drawer';
import Modal from '../Modal';
import DeleteModal from '../Modal/components/Delete';
import Address from '../Address';

import { LocationIcon } from '../../../../constants';
import { ClientModel, GeneralModel } from '../../../models';
import { useStyles as modalStyles } from '../Modal/style';
import { useStyles as buttonStyles } from '../FormHandler/ControlledButton/styles';
import { getTradesString } from '../../../../utils/tradeUtils';
import { useStyles as drawerStyles } from '../ResourceManagement/Drawer/styles';
import { listGlobalStyles } from '../../../../assets/styles';
import { formatPhoneNumber, getConditionalDefaultValue, getDefaultValue } from '../../../../utils/generalUtils';

export interface IClientDrawerProps {
  client: ClientModel.IClient;
  mwbeList: GeneralModel.INamedEntity[];
  clientListElement: React.ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  showTaxExempt?: boolean;
  buttonText?: string;
  buttonTestId?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  deleteLoading?: GeneralModel.ILoadingStatus;
  onClose: () => void;
  onDelete?: (id: string) => void;
  handleButtonClick?: () => void;
}

const ClientDrawer = ({
  isOpen,
  isLoading,
  showTaxExempt,
  deleteLoading,
  client,
  mwbeList,
  clientListElement,
  buttonText,
  buttonTestId,
  showPrimaryButton,
  showSecondaryButton,
  onClose,
  onDelete,
  handleButtonClick,
}: IClientDrawerProps) => {
  const clientListHeight = (clientListElement as any)?.offsetHeight;
  const drawerClasses = drawerStyles();
  const listClasses = listGlobalStyles();
  const modalClasses = modalStyles();
  const buttonClasses = buttonStyles();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onDeleteOpen = useCallback(() => {
    setShowDeleteModal(true);
  }, []);
  const currentMwbe = useMemo(() => mwbeList && mwbeList.find(option => option.id === client.mwbeTypeId), [mwbeList, client]);
  const tradeList = useMemo(() => getTradesString(client.trades, client.otherTrade), [client.trades, client.otherTrade]);

  const closeModal = useCallback(/* istanbul ignore next */ () => setShowDeleteModal(false), [setShowDeleteModal]);

  const handleDeleteAccepted = useCallback(() => {
    onDelete(client.id);
  }, [onDelete, client.id]);

  useEffect(() => {
    if (deleteLoading && !deleteLoading.isLoading) {
      setShowDeleteModal(false);
    }
  }, [deleteLoading]);

  return (
    <>
      <Drawer
        title="Client Information"
        dataTestId="client-drawer-detail"
        height={clientListHeight}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        render={() => (
          <div className={listClasses.listDetail}>
            <div className={listClasses.company}>
              <div className={drawerClasses.drawerText}>
                <Typography className={`${listClasses.listAccent} ${listClasses.entityTitle}`}>{client.name}</Typography>
                <div className={drawerClasses.drawerMainText}>
                  <span>{tradeList}</span>
                  <span>{client.taxpayerIdentificationNumber ? client.taxpayerIdentificationNumber : '-'}</span>
                  <span>{currentMwbe?.name}</span>
                  {showTaxExempt && client.isTaxExempt && <span>Tax Exempt</span>}
                </div>
              </div>

              <div className={drawerClasses.drawerSection}>
                <LocationIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  {getConditionalDefaultValue(client.billingAddress, <Address address={client.billingAddress} />)}
                </div>
              </div>
              <div className={drawerClasses.drawerSection}>
                <EmailIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  {getConditionalDefaultValue(client.mailingAddress, <Address address={client.mailingAddress} />)}
                </div>
              </div>
              <div className={drawerClasses.drawerSection}>
                <PersonIcon />
                <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
                  <span className={listClasses.listAccent}>
                    {getConditionalDefaultValue(client.user, `${client?.user?.firstName} ${client?.user?.lastName}`)}
                  </span>
                  {<span>{getDefaultValue(client?.user?.email)}</span>}
                  {<span>{formatPhoneNumber(client?.user?.mobilePhoneNumber)}</span>}
                </div>
              </div>
            </div>
            {(showPrimaryButton || showSecondaryButton) && <Divider className={drawerClasses.drawerDivider} />}
            <div className={listClasses.ctaWrapper}>
              {showPrimaryButton && (
                <ControlledButton>
                  <Button
                    disableRipple={true}
                    className={`${buttonClasses.drawerCTA} ${buttonClasses.borderPrimaryButton}`}
                    variant="outlined"
                    onClick={handleButtonClick}
                    data-testid={buttonTestId}
                  >
                    {buttonText}
                  </Button>
                </ControlledButton>
              )}
              {showSecondaryButton && (
                <ControlledButton>
                  <Button
                    disableRipple={true}
                    className={`${buttonClasses.drawerCTA} ${buttonClasses.warningButton}`}
                    variant="outlined"
                    onClick={onDeleteOpen}
                    data-testid="deleteClientButton"
                  >
                    Delete
                  </Button>
                </ControlledButton>
              )}
            </div>
          </div>
        )}
      />
      <Modal
        show={showDeleteModal}
        styleClass={`${modalClasses.dialogContainer} ${modalClasses.deleteModal}`}
        render={() => <DeleteModal title={`Delete ${client.name}?`} onCancel={closeModal} onConfirm={handleDeleteAccepted} />}
      />
    </>
  );
};

export default memo(ClientDrawer);
