import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

import ReviewButton from '../ResourceManagement/ReviewButton';
import Card from '../ResourceManagement/Card';
import Address from '../Address';

import { GeneralModel, UserModel, ClientModel, ResourceModel } from '../../../models';
import { LANG } from '../../../../constants';
import { getConditionalDefaultValue, getDefaultValue, getListWithCommas, formatPhoneNumber } from '../../../../utils/generalUtils';
import { AutocompleteService } from '../../../services/AutocompleteService';
import { useStyles as buttonStyles } from '../../shared/FormHandler/ControlledButton/styles';
import { cardGlobalStyles, formGlobalStyles } from '../../../../assets/styles';
import { tableRowStyles } from './styles';

export interface IReviewProps {
  model: ClientModel.IClient;
  userList?: UserModel.IUser[];
  mwbeList?: GeneralModel.INamedEntity[];
  completedFields?: GeneralModel.IStepCompletedMap;
  edit?: boolean;
  editAction?: (step: ClientModel.ClientStep) => void;
  onChangeStep?: (key: string) => void;
}

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const Review = ({ model, completedFields, userList = [], mwbeList = [], edit = false, editAction, onChangeStep }: IReviewProps) => {
  const buttonClasses = buttonStyles();
  const cardGlobalClasses = cardGlobalStyles();
  const formClasses = formGlobalStyles();
  const billingMapInputRef = useMemo(() => React.createRef(), []);
  const mailingMapInputRef = useMemo(() => React.createRef(), []);
  const autocompleteService = useMemo(() => new AutocompleteService(), []);
  const currentMwbe = useMemo(() => mwbeList && mwbeList.find(mwbe => mwbe.id === model.mwbeTypeId), [mwbeList, model]);
  const isBillingMapAvailable = useMemo(() => model.billingAddress && model.billingAddress.latitude && model.billingAddress.longitude, [model.billingAddress]);
  const isMailingMapAvailable = useMemo(() => model.mailingAddress && model.mailingAddress.latitude && model.mailingAddress.longitude, [model.mailingAddress]);
  const trades = useMemo(() => [...model.trades, model.otherTrade && ({ name: model.otherTrade } as any)].filter(Boolean), [model]);
  const handleEditGeneralInformation = useCallback(() => {
    editAction(ClientModel.ClientStep.GENERAL_INFORMATION as any);
  }, [editAction]);
  const handleEditAddresses = useCallback(() => {
    editAction(ClientModel.ClientStep.ADDRESSES as any);
  }, [editAction]);
  useEffect(() => {
    autocompleteService.init({}).then(() => {
      if (isBillingMapAvailable && billingMapInputRef.current)
        autocompleteService.initMap(billingMapInputRef.current, model.billingAddress.latitude, model.billingAddress.longitude);
      if (isMailingMapAvailable && mailingMapInputRef.current)
        autocompleteService.initMap(mailingMapInputRef.current, model.mailingAddress.latitude, model.mailingAddress.longitude);
    });
  }, [billingMapInputRef, mailingMapInputRef, model, autocompleteService, isBillingMapAvailable, isMailingMapAvailable]);
  return (
    <>
      <Card
        title={ClientModel.clientStepMap[ClientModel.ClientStep.GENERAL_INFORMATION].title}
        actionStyleClass={getConditionalDefaultValue(edit, formClasses.secondaryActionsIcon, '')}
        secondaryAction={
          edit ? (
            <IconButton
              className={buttonClasses.editButton}
              disableRipple={true}
              onClick={handleEditGeneralInformation}
              data-testid="gen-info-edit-button"
              disabled={model.status === ResourceModel.CompanyStatus.ARCHIVED}
            >
              <CreateIcon />
            </IconButton>
          ) : (
            <ReviewButton
              stepKey={ClientModel.ClientStep.GENERAL_INFORMATION}
              completedFields={completedFields && completedFields[ClientModel.ClientStep.GENERAL_INFORMATION]}
              onChangeStep={onChangeStep}
            />
          )
        }
      >
        <div className={`${formClasses.reviewGeneralInformation} ${formClasses.reviewGeneralInformationDirection}`}>
          <div className={formClasses.informationBlocksWrapper}>
            <div className={formClasses.informationBlock}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle}`}>
                Client Name
              </Typography>
              <Typography className={cardGlobalClasses.cardFont}>{model.name || '-'}</Typography>
              {model.isDeveloper && <Typography className={cardGlobalClasses.cardFont}>Developer</Typography>}
            </div>
            <div className={`${formClasses.informationBlock} ${formClasses.informationMiddleBlock}`}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle}`}>
                Legal Information
              </Typography>
              <div className={cardGlobalClasses.cardData}>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardDataTitle}`}>Taxpayer Identification Number:</Typography>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>
                  {model.taxpayerIdentificationNumber ? model.taxpayerIdentificationNumber : '-'}
                </Typography>
              </div>
              <div className={cardGlobalClasses.cardData}>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardDataTitle}`}>MBE/WBE:</Typography>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>{getDefaultValue(currentMwbe?.name)}</Typography>
              </div>
            </div>
          </div>
          <div className={`${formClasses.informationBlock} ${formClasses.lastInformationBlock}`} data-testid="trade-names">
            <Typography
              className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle} ${formClasses.lastInformationTitle}`}
            >
              Trades
            </Typography>
            <span className={cardGlobalClasses.cardTrades}>
              <span>{getListWithCommas(trades)}</span>
            </span>
          </div>
          <div className={`${formClasses.informationBlocksWrapper} ${formClasses.lastInformationBlock}`}>
            <div className={`${formClasses.informationBlock} ${formClasses.lastInformationTitle}`}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle}`}>
                Universal Badge
              </Typography>
              <div className={cardGlobalClasses.cardData}>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardDataTitle}`}>Universal Badge:</Typography>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>
                  {getConditionalDefaultValue(model.hasUniversalBadge, 'Yes', 'No')}
                </Typography>
              </div>
              {model.universalBadgePrice && (
                <div className={cardGlobalClasses.cardData}>
                  <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardDataTitle}`}>Price:</Typography>
                  <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>
                    {getConditionalDefaultValue(model.universalBadgePrice, `$ ${model.universalBadgePrice}`, '')}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      <Card
        title={ClientModel.clientStepMap[ClientModel.ClientStep.ADDRESSES].title}
        actionStyleClass={getConditionalDefaultValue(edit, formClasses.secondaryActionsIcon, '')}
        secondaryAction={
          edit ? (
            <IconButton
              className={buttonClasses.editButton}
              disableRipple={true}
              onClick={handleEditAddresses}
              data-testid="addr-edit-button"
              disabled={model.status === ResourceModel.CompanyStatus.ARCHIVED}
            >
              <CreateIcon />
            </IconButton>
          ) : (
            <ReviewButton
              stepKey={ClientModel.ClientStep.ADDRESSES}
              completedFields={completedFields && completedFields[ClientModel.ClientStep.ADDRESSES]}
              onChangeStep={onChangeStep}
            />
          )
        }
      >
        <Grid container={true} className={formClasses.addressesWrapper}>
          <Grid item={true} xs={4} className={formClasses.addressItem}>
            <div className={`${formClasses.informationBlock} ${formClasses.addressInformationBlock}`}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardAddressTitle}`}>
                Billing Address
              </Typography>
              <Address address={model.billingAddress} />
            </div>
            {isBillingMapAvailable && <div id="review-billing-map" className={formClasses.mapWrapper} ref={billingMapInputRef as any} />}
          </Grid>
          <Divider className={formClasses.dividerColor} orientation="vertical" flexItem={true} />
          <Grid item={true} xs={4} className={formClasses.addressItem}>
            {model.mailingAddressMatchesBillingAddress ? (
              <div>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardAddressTitle}`}>
                  Mailing Address
                </Typography>
                <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardAddressTitle}`}>
                  {getConditionalDefaultValue(model.billingAddress && model.mailingAddressMatchesBillingAddress, 'Same as Billing Address', '-')}
                </Typography>
              </div>
            ) : (
              <>
                <div className={`${formClasses.informationBlock} ${formClasses.addressInformationBlock}`}>
                  <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardAddressTitle}`}>
                    Mailing Address
                  </Typography>
                  <Address address={model.mailingAddress} />
                </div>
                <div>{isMailingMapAvailable && <div id="review-mailing-map" className={formClasses.mapWrapper} ref={mailingMapInputRef as any} />}</div>
              </>
            )}
          </Grid>
        </Grid>
      </Card>
      {!edit && (
        <Card
          title={ClientModel.clientStepMap[ClientModel.ClientStep.USERS].title}
          actionStyleClass={getConditionalDefaultValue(edit, formClasses.secondaryActionsIcon, '')}
          secondaryAction={
            <ReviewButton
              stepKey={ClientModel.ClientStep.USERS}
              completedFields={
                completedFields && {
                  ...completedFields[ClientModel.ClientStep.USERS],
                  required: completedFields[ClientModel.ClientStep.USERS].required,
                }
              }
              onChangeStep={onChangeStep}
            />
          }
        >
          <div className={formClasses.tableWrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Office Number</TableCell>
                  <TableCell>Preferred</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="left">
                      {getConditionalDefaultValue(
                        user.firstName && user.lastName,
                        `${user.firstName} ${user.lastName}`,
                        user.firstName || user.lastName || '-'
                      )}
                    </TableCell>
                    <TableCell className={formClasses.emailParentAccent} align="left">
                      {<a href={user.email && `mailto:${user.email}`}>{getDefaultValue(user.email)}</a>}
                    </TableCell>
                    <TableCell align="left">
                      <a data-testid="user-phone-label" href={getConditionalDefaultValue(user.mobilePhoneNumber, `tel:${user.mobilePhoneNumber}`, null)}>
                        {getConditionalDefaultValue(user.mobilePhoneNumber, formatPhoneNumber(user.mobilePhoneNumber), '-')}
                      </a>
                    </TableCell>
                    <TableCell align="left">
                      {user.officePhoneNumber ? (
                        <a data-testid="user-phone-label" href={user.officePhoneNumber && `tel:${user.officePhoneNumber}`}>
                          {getConditionalDefaultValue(user.officePhoneNumber, formatPhoneNumber(user.officePhoneNumber), '-')}
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {getConditionalDefaultValue(
                        user.preferredContactMethod === UserModel.PreferredContactMethod.EMAIL,
                        LANG.EN.CONTACT_METHOD.EMAIL,
                        LANG.EN.CONTACT_METHOD.PHONE
                      )}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </>
  );
};

export default memo(Review);
