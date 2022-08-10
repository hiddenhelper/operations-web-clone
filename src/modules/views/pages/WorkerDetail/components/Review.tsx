import React, { memo, useCallback } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

import Card from '../../../shared/ResourceManagement/Card';

import { GeneralModel, WorkerModel, UserModel } from '../../../../models';
import {
  getConditionalDefaultValue,
  getDefaultValue,
  getFormattedDate,
  getListWithCommas,
  getBooleanDefaultValue,
  formatPhoneNumber,
} from '../../../../../utils/generalUtils';

import { useStyles } from '../styles';
import { useStyles as buttonStyles } from '../../../shared/FormHandler/ControlledButton/styles';
import { cardGlobalStyles, formGlobalStyles } from '../../../../../assets/styles';
import { AddressFields } from '../../../../models/address';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IReviewProps {
  model: WorkerModel.IWorker;
  edit?: boolean;
  onPageChange?: (key: string) => void;
}

const Review = ({ model, edit, onPageChange }: IReviewProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const cardGlobalClasses = cardGlobalStyles();
  const formGlobalClasses = formGlobalStyles();

  const handleEditReview = useCallback(() => {
    onPageChange(`/workers/wizard/${model.id}`);
  }, [model, onPageChange]);

  return (
    <>
      <Card
        title={'Worker Information'}
        hideSecondaryAction={false}
        actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
        secondaryAction={
          <PermissionGuard permissionsExpression={UserModel.WorkersPermission.MANAGE}>
            <IconButton className={buttonClasses.editButton} disableRipple={true} onClick={handleEditReview} data-testid="review-info-edit-button">
              <CreateIcon />
            </IconButton>
          </PermissionGuard>
        }
      >
        <div className={classes.reviewCardBody}>
          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Information
              </Typography>
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>First Name:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.firstName)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Middle Name:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.middleName)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Last Name:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.lastName)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Date of Birth:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(getFormattedDate(model.dateOfBirth, GeneralModel.DateFormat.DATE))}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Gender:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(GeneralModel.genderMap[model.gender])}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <span className={`${cardGlobalClasses.cardSpacer}`} />
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Ethnicity:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.ethnicity?.name)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Primary Language:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.primaryLanguage?.name)}
                    {model.otherPrimaryLanguage ? `. ${model.otherPrimaryLanguage}` : ''}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Veteran:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getBooleanDefaultValue(model.isVeteran, 'Veteran', 'Non-Veteran')}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Allergies (Optional):</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.allergies)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Last 4 SNN (Optional):</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.socialSecurityNumber)}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Contact Information
              </Typography>
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>{`Email ${
                    model.inviteMethod === WorkerModel.InviteMethod.MOBILE_PHONE ? '(Optional)' : ''
                  }:`}</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={cardGlobalClasses.cardFontAccent}>{getDefaultValue(model.email)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>{`Mobile Phone ${
                    model.inviteMethod === WorkerModel.InviteMethod.EMAIL ? '(Optional)' : ''
                  }:`}</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={cardGlobalClasses.cardFontAccent}>{formatPhoneNumber(model.mobilePhoneNumber)}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <span className={`${cardGlobalClasses.cardSpacer}`} />
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Alternate Phone (Optional):</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{formatPhoneNumber(model.phoneNumber)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Invite Method:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(WorkerModel.InviteMethodMap[model.inviteMethod])}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Home Address
              </Typography>
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Address Line 1:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.address?.[AddressFields.LINE_1])}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Address Line 2 (Optional):</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.address?.[AddressFields.LINE_2])}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Country:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.address?.[AddressFields.COUNTRY]?.name)}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>State:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.address?.[AddressFields.STATE_NAME])}
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <span className={`${cardGlobalClasses.cardSpacer}`} />
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>County:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.address?.[AddressFields.COUNTY])}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>City:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.address?.[AddressFields.CITY])}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Zip Code:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.address?.[AddressFields.ZIP_CODE])}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Borough:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.address?.[AddressFields.BOROUGH])}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Emergency Contact
              </Typography>
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Emergency Contact Name:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.emergencyContactName)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Emergency Contact Phone:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{formatPhoneNumber(model.emergencyContactPhone)}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <span className={`${cardGlobalClasses.cardSpacer}`} />
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Relationship:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.emergencyContactRelationship)}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Government Issued ID
              </Typography>
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>ID Type:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.identificationType?.name)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>ID Number:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.identificationNumber)}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <span className={`${cardGlobalClasses.cardSpacer}`} />
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Issued By:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.identificationGeographicLocation?.name)}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Worker Trades
              </Typography>
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Role:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getBooleanDefaultValue(model.isSupervisor, 'Supervisor', 'Non Supervisor')}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Work Experience:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getBooleanDefaultValue(model.isSkilled, 'Skilled', 'Non-Skilled')}
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item={true} xs={6} className={'cardBody-item'}>
              <span className={`${cardGlobalClasses.cardSpacer}`} />
              <Grid container={true}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Labor Union:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {getBooleanDefaultValue(model.isAffiliatedToLaborUnion, 'Yes', 'No')}
                  </span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Labor Union Number:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.laborUnionNumber)}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={12} className={'cardBody-item'} style={{ marginRight: '40px' }}>
              <Grid container={true} className={classes.noDivider}>
                <Grid item={true} xs={3} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Trades:</Typography>
                </Grid>
                <Grid item={true} xs={9} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis} ${classes.noBreakWord}`}>
                    {getListWithCommas(model.trades)}
                    {model.otherTrade ? ` Other: ${model.otherTrade}.` : ''}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
    </>
  );
};

export default memo(Review);
