import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ReviewButton from 'modules/views/shared/ResourceManagement/ReviewButton';

import { AutocompleteService } from '../../../../services/AutocompleteService';

import { GeneralModel, ResourceModel, UserModel, PaymentModel, ProjectNewModel, ProjectModel, ConsentFormModel } from '../../../../models';
import { LANG } from '../../../../../constants';
import {
  getDefaultValue,
  getConditionalDefaultValue,
  formatNumberWithCommas,
  getFormattedDate,
  getListWithCommas,
  noop,
} from '../../../../../utils/generalUtils';
import { getPlannedMonths, getTotalPrice } from '../../../../../utils/projectUtils';
import { cardGlobalStyles, formGlobalStyles } from '../../../../../assets/styles';
import { useStyles as buttonStyles } from '../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../styles';
import Address from 'modules/views/shared/Address';
import { useParams } from 'react-router-dom';
import CreditCardItem from 'modules/views/shared/PaymentMethods/components/CreditCardItem';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

export interface IReviewProps {
  model: ProjectNewModel.IProject;
  userCompanyId: string;
  isFcaUser: boolean;
  completedFields?: GeneralModel.IStepCompletedMap;
  showAssignClient?: boolean;
  categoryList?: GeneralModel.INamedEntity[];
  regionList?: GeneralModel.INamedEntity[];
  fcaNaeList?: GeneralModel.INamedEntity[];
  edit?: boolean;
  onChangeStep?: (key: string) => void;
  editAction?: (step: ProjectModel.ProjectStep) => void;
  editPayment?: () => void;
  paymentMethods?: PaymentModel.IPaymentMethod[];
  selectedPaymentMethod?: string;
  projectMap: any;
  isReviewStep?: boolean;
}

const Review = ({
  model,
  userCompanyId,
  isFcaUser,
  completedFields = {},
  categoryList = [],
  regionList = [],
  fcaNaeList = [],
  edit = false,
  showAssignClient = true,
  onChangeStep,
  editAction,
  editPayment,
  paymentMethods,
  selectedPaymentMethod,
  projectMap,
  isReviewStep = false,
}: IReviewProps) => {
  const { id: clientId } = useParams<{ id: string }>();

  const initialCard = projectMap?.[clientId]?.paymentMethod;
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const cardGlobalClasses = cardGlobalStyles();
  const formGlobalClasses = formGlobalStyles();
  const paymentSelected = useMemo(() => paymentMethods?.filter(item => item.paymentMethodId === selectedPaymentMethod), [
    paymentMethods,
    selectedPaymentMethod,
  ]);

  const hideEditAction = isReviewStep;

  const jobSiteMapRef = useMemo(() => React.createRef(), []);
  const badgingSiteMapRef = useMemo(() => React.createRef(), []);
  const mailingSiteMapRef = useMemo(() => React.createRef(), []);
  const plannedMonths = useMemo(() => getPlannedMonths(model.startDate, model.endDate), [model.startDate, model.endDate]);
  const projectOwnerList = useMemo(
    () => (model.relatedCompanies ? model.relatedCompanies.filter(company => company.role === ProjectModel.CompanyRole.DEVELOPER_PROJECT_OWNER) : []),
    [model.relatedCompanies]
  );
  const devFilterList = useMemo(
    () => (model.relatedCompanies ? model.relatedCompanies.filter(company => company.role === ProjectModel.CompanyRole.DEVELOPER) : []),
    [model.relatedCompanies]
  );
  const gcFilterList = useMemo(
    () => (model.relatedCompanies ? model.relatedCompanies.filter(company => company.role === ProjectModel.CompanyRole.GENERAL_CONTRACTOR) : []),
    [model.relatedCompanies]
  );
  const trainingList = useMemo(() => model?.trainingGroups.map(group => ({ id: group.id, name: group.name })), [model]);
  const certificationList = useMemo(() => model?.certificationGroups.map(group => ({ id: group.id, name: group.name })), [model]);
  const activeConsentFormFields = useMemo(
    () => model.consentFormFields.filter(field => field.isVisible).map(item => ({ id: item.consentFormFieldId, name: item.consentFormFieldName })),
    [model]
  );
  const consentFormLegals = useMemo(
    () =>
      model.consentFormLegals.map(item => ({
        id: item.languageCode,
        language: `${ConsentFormModel.ConsentFormLanguageNames?.[item.languageCode]} Version:`,
        name: item.name,
        body: item.body,
      })),
    [model]
  );

  const getResponsible = useCallback(
    (type: string) => {
      if (model[type].billedCompany) return model[type].billedCompany?.name;
      return model.relatedCompanies
        ? model.relatedCompanies.find(company => company.id === (model[type].billedCompanyId || model[type].billedCompany?.id))?.name
        : null;
    },
    [model]
  );

  const responsibleForBilling = useMemo(() => {
    if (model.badgeBillingModel && model.billingModelType === ProjectModel.BillingModelType.BADGES && !model.badgeBillingModel.isBilledPerCompany) {
      return getResponsible(ProjectModel.ProjectFields.BADGES_MODEL);
    }
    if (model.seatBillingModel && model.billingModelType === ProjectModel.BillingModelType.SEATS) {
      return getResponsible(ProjectModel.ProjectFields.SEATS_MODEL);
    }
    return '';
  }, [model, getResponsible]);

  const region = useMemo(() => (model.region ? model.region : regionList.find(item => item.id === model.regionId)), [model, regionList]);
  const category = useMemo(() => (model.category ? model.category : categoryList.find(item => item.id === model.categoryId)), [model, categoryList]);
  const fcaNae = useMemo(() => (model.nae ? model.nae : fcaNaeList.find(item => item.id === model.naeId)), [model, fcaNaeList]);
  const isJobSiteMapAvailable = useMemo(() => !!(model.jobSiteAddress && model.jobSiteAddress.latitude && model.jobSiteAddress.longitude), [
    model.jobSiteAddress,
  ]);
  const isBadgingSiteMapAvailable = useMemo(() => !!(model.badgingSiteAddress && model.badgingSiteAddress.latitude && model.badgingSiteAddress.longitude), [
    model.badgingSiteAddress,
  ]);
  const isMailingSiteMapAvailable = useMemo(() => !!(model.mailingAddress && model.mailingAddress.latitude && model.mailingAddress.longitude), [
    model.mailingAddress,
  ]);
  const totalPrice = useMemo(() => getTotalPrice(model.seatBillingModel?.estimatedWorkersNumber || 0, model.seatBillingModel?.seatPrice || 0), [
    model.seatBillingModel,
  ]);
  const autocompleteService = useMemo(() => new AutocompleteService(), []);

  const locations = projectMap?.[clientId]?.locations.map(location => location.name).join(', ');

  const handleEditGeneralInformation = useCallback(() => {
    editAction(ProjectNewModel.ProjectStep.GENERAL_INFORMATION);
  }, [editAction]);

  const handleEditBillingModel = useCallback(() => {
    editAction(ProjectModel.ProjectStep.BILLING_MODEL);
  }, [editAction]);

  const handleEditAddresses = useCallback(() => {
    editAction(ProjectModel.ProjectStep.ADDRESSES);
  }, [editAction]);

  const handleEditCertifications = useCallback(() => {
    editAction(ProjectModel.ProjectStep.CERTIFICATIONS_TRAININGS);
  }, [editAction]);

  const handleEditWorkerConsentForm = useCallback(() => {
    editAction(ProjectModel.ProjectStep.WORKER_CONSENT_FORM);
  }, [editAction]);

  const handleEditPayment = useCallback(() => {
    editPayment();
  }, [editPayment]);

  const getCompanyList = useCallback(
    list =>
      list.map(company => (
        <Typography key={company.id} className={cardGlobalClasses.cardFont}>
          {company.name}. <span className={cardGlobalClasses.cardFontAccent}>{`${getConditionalDefaultValue(company.isTaxExempt, 'Tax Exempt', '')}`}</span>
        </Typography>
      )),
    [cardGlobalClasses]
  );

  const consentFormLegalsBody = useCallback(
    list =>
      list.map(item => (
        <Grid key={item.id} container={true} spacing={1} className="cardBody-row">
          <Grid item={true} xs={2} className={'cardBody-item'}>
            <Typography className={`${cardGlobalClasses.cardFont}`}>{item.language}</Typography>
          </Grid>
          <Grid item={true} xs={10} className={'cardBody-item'}>
            <Typography className={cardGlobalClasses.cardFont}>
              <strong>{item.body}</strong>
            </Typography>
          </Grid>
        </Grid>
      )),
    [cardGlobalClasses]
  );

  const consentFormLegalsName = useCallback(
    list =>
      list.map(item => (
        <Grid key={item.id} container={true} spacing={1} className="cardBody-row">
          <Grid item={true} xs={2} className={'cardBody-item'}>
            <Typography className={`${cardGlobalClasses.cardFont}`}>{item.language}</Typography>
          </Grid>
          <Grid item={true} xs={10} className={'cardBody-item'}>
            <Typography className={cardGlobalClasses.cardFont}>
              <strong>{item.name}</strong>
            </Typography>
          </Grid>
        </Grid>
      )),
    [cardGlobalClasses]
  );

  useEffect(() => {
    autocompleteService.init({}).then(() => {
      if (isJobSiteMapAvailable && jobSiteMapRef.current)
        autocompleteService.initMap(jobSiteMapRef.current, model.jobSiteAddress.latitude, model.jobSiteAddress.longitude);
      if (isBadgingSiteMapAvailable && badgingSiteMapRef.current)
        autocompleteService.initMap(badgingSiteMapRef.current, model.badgingSiteAddress.latitude, model.badgingSiteAddress.longitude);
      if (isMailingSiteMapAvailable && mailingSiteMapRef.current)
        autocompleteService.initMap(mailingSiteMapRef.current, model.mailingAddress.latitude, model.mailingAddress.longitude);
    });
  }, [
    model,
    isJobSiteMapAvailable,
    isBadgingSiteMapAvailable,
    isMailingSiteMapAvailable,
    mailingSiteMapRef,
    jobSiteMapRef,
    badgingSiteMapRef,
    autocompleteService,
  ]);

  return (
    <>
      <Card
        title={ProjectNewModel.projectStepMap[ProjectNewModel.ProjectStep.GENERAL_INFORMATION].title}
        hideSecondaryAction={hideEditAction}
        actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
        styleClass={classes.boxShadow}
        secondaryAction={
          edit ? (
            <PermissionGuard permissionsExpression={UserModel.ProjectsPermission.MANAGE}>
              <IconButton
                className={buttonClasses.editButton}
                disableRipple={true}
                onClick={handleEditGeneralInformation}
                data-testid="gen-info-edit-button"
                disabled={model.status === ResourceModel.Status.ARCHIVED}
              >
                <CreateIcon />
              </IconButton>
            </PermissionGuard>
          ) : (
            <ReviewButton
              stepKey={ProjectNewModel.ProjectStep.GENERAL_INFORMATION}
              completedFields={completedFields[ProjectNewModel.ProjectStep.GENERAL_INFORMATION]}
              onChangeStep={onChangeStep}
            />
          )
        }
      >
        <div className={classes.reviewCardBody}>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Project Name
              </Typography>

              <Typography className={`${cardGlobalClasses.cardFont} ${classes.descriptionTitle}`}>{getDefaultValue(model.name)}</Typography>

              <Typography className={`${cardGlobalClasses.cardFont} ${classes.descriptionFont}`}>{getDefaultValue(model.description)}</Typography>
            </Grid>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Information
              </Typography>
              <Grid container={true} spacing={1}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Category:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(category?.name)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Commercial Construction Value: </Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>
                    {model.ccv ? `$ ${formatNumberWithCommas(model.ccv)}` : '-'}
                  </span>
                </Grid>

                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>FCA Region:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(region?.name)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>FCA NAE:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(fcaNae?.name)}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Setup Notes:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${classes.spanEllipsis}`}>{getDefaultValue(model.setupNotes)}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>Duration</Typography>
              <Grid container={true} spacing={1}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Start Date:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={cardGlobalClasses.cardFontAccent}>{getDefaultValue(getFormattedDate(model.startDate, GeneralModel.DateFormat.DATE))}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>End Date:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={cardGlobalClasses.cardFontAccent}>{getDefaultValue(getFormattedDate(model.endDate, GeneralModel.DateFormat.DATE))}</span>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Planned Months:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={cardGlobalClasses.cardFontAccent}>{plannedMonths}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>Time Zone</Typography>
              <Grid container={true} spacing={1}>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>Project Time Zone:</Typography>
                </Grid>
                <Grid item={true} xs={6} className={'cardBody-item'}>
                  <span className={`${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.noWrap} ${classes.spanEllipsis}`}>
                    {getDefaultValue(model.timeZone?.name)}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>NYC LL196</Typography>
              <Grid container={true}>
                <Grid item={true} xs={12} className={'cardBody-item'}>
                  <Typography className={cardGlobalClasses.cardFont}>{getConditionalDefaultValue(model.mustComplyWithNycLL196, 'Yes:', 'No')}</Typography>
                </Grid>
                {model.mustComplyWithNycLL196 && (
                  <>
                    <hr />
                    <Grid container={true} spacing={1}>
                      <Grid item={true} xs={6} className={'cardBody-item'}>
                        Permit Holder:
                      </Grid>
                      <Grid item={true} xs={6} className={'cardBody-item'}>
                        <span className={`${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.noWrap} ${classes.spanEllipsis}`}>
                          {getDefaultValue(model.permitHolder)}
                        </span>
                      </Grid>
                      <Grid item={true} xs={6} className={'cardBody-item'}>
                        Permit Number:
                      </Grid>
                      <Grid item={true} xs={6} className={'cardBody-item'}>
                        <span className={`${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.noWrap} ${classes.spanEllipsis}`}>
                          {getDefaultValue(model.permitNumber)}
                        </span>
                      </Grid>
                      <Grid item={true} xs={6} className={'cardBody-item'}>
                        Licence Number:
                      </Grid>
                      <Grid item={true} xs={6} className={'cardBody-item'}>
                        <span className={`${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.noWrap} ${classes.spanEllipsis}`}>
                          {getDefaultValue(model.licenseNumber)}
                        </span>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
      {showAssignClient && (
        <Card
          title={ProjectModel.projectStepMap[ProjectModel.ProjectStep.ASSIGN_CLIENTS].title}
          hideSecondaryAction={hideEditAction}
          actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
          styleClass={classes.boxShadow}
          secondaryAction={
            <ReviewButton
              stepKey={ProjectModel.ProjectStep.ASSIGN_CLIENTS}
              completedFields={completedFields[ProjectModel.ProjectStep.ASSIGN_CLIENTS]}
              onChangeStep={onChangeStep}
            />
          }
        >
          <div className={classes.reviewCardBody}>
            <Grid container={true} spacing={3} className={'cardBody-row'}>
              <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
                <Typography
                  className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardTitle}`}
                >
                  Project Owner
                </Typography>

                {getCompanyList(projectOwnerList)}
              </Grid>
              <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
                <Typography
                  className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardTitle}`}
                >
                  Developer/s
                </Typography>

                {getCompanyList(devFilterList)}
              </Grid>
            </Grid>
            <Grid container={true} spacing={3} className={'cardBody-row'}>
              <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
                <Typography
                  className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardTitle}`}
                >
                  General Contractor/s
                </Typography>

                {getCompanyList(gcFilterList)}
              </Grid>
            </Grid>
          </div>
        </Card>
      )}
      <Card
        title={ProjectModel.projectStepMap[ProjectModel.ProjectStep.BILLING_MODEL].title}
        hideSecondaryAction={hideEditAction}
        actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
        styleClass={classes.boxShadow}
        secondaryAction={
          edit ? (
            isFcaUser && (
              <IconButton
                className={buttonClasses.editButton}
                disableRipple={true}
                onClick={handleEditBillingModel}
                data-testid="billing-edit-button"
                disabled={model.status === ResourceModel.Status.ARCHIVED}
              >
                <CreateIcon />
              </IconButton>
            )
          ) : (
            <ReviewButton
              stepKey={ProjectModel.ProjectStep.BILLING_MODEL}
              completedFields={completedFields[ProjectModel.ProjectStep.BILLING_MODEL]}
              onChangeStep={onChangeStep}
            />
          )
        }
      >
        <div className={classes.reviewCardBody}>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              {model.billingModelType === ProjectModel.BillingModelType.BADGES ? (
                <>
                  <Typography
                    className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardHeavyAccent}`}
                  >
                    Badge Model
                  </Typography>
                  <Grid container={true} spacing={1}>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Worker Badge Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>
                        <strong>
                          {model.badgeBillingModel && model.badgeBillingModel.badgePrice
                            ? `$ ${formatNumberWithCommas(model.badgeBillingModel.badgePrice)}`
                            : '-'}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Worker Badge Reprint Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>
                        <strong>
                          {getConditionalDefaultValue(
                            model?.badgeBillingModel?.reprintingCost,
                            `$ ${getDefaultValue(formatNumberWithCommas(model?.badgeBillingModel?.reprintingCost))}`
                          )}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Visitor Badge Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>
                        <strong>
                          {getConditionalDefaultValue(
                            model?.badgeBillingModel?.visitorBadgePrice,
                            `$ ${getDefaultValue(formatNumberWithCommas(model?.badgeBillingModel?.visitorBadgePrice))}`
                          )}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Visitor Badge Reprint Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>
                        <strong>
                          {getConditionalDefaultValue(
                            model?.badgeBillingModel?.visitorReprintingCost,
                            `$ ${getDefaultValue(formatNumberWithCommas(model?.badgeBillingModel?.visitorReprintingCost))}`
                          )}
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Typography
                    className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardHeavyAccent}`}
                  >
                    Seat Model
                  </Typography>
                  <Grid container={true} spacing={1}>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Estimated Number of Seats:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>
                        {getConditionalDefaultValue(
                          model?.seatBillingModel?.estimatedWorkersNumber,
                          formatNumberWithCommas(model?.seatBillingModel?.estimatedWorkersNumber)
                        )}
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Price Per Seat:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>
                        $ {getConditionalDefaultValue(model?.seatBillingModel?.seatPrice, formatNumberWithCommas(model?.seatBillingModel?.seatPrice))}
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Total Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>
                        $ {totalPrice ? formatNumberWithCommas(totalPrice) : '-'}
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Worker Badge Reprint Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent}`}>
                        {getConditionalDefaultValue(
                          model?.seatBillingModel?.reprintingCost,
                          `$ ${formatNumberWithCommas(model?.seatBillingModel?.reprintingCost)}`
                        )}
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Visitor Badge Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>
                        <strong>
                          {getConditionalDefaultValue(
                            model?.seatBillingModel?.visitorBadgePrice,
                            `$ ${getDefaultValue(formatNumberWithCommas(model?.seatBillingModel?.visitorBadgePrice))}`
                          )}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>Visitor Badge Reprint Price:</Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={'cardBody-item'}>
                      <Typography className={cardGlobalClasses.cardFont}>
                        <strong>
                          {getConditionalDefaultValue(
                            model?.seatBillingModel?.visitorReprintingCost,
                            `$ ${getDefaultValue(formatNumberWithCommas(model?.seatBillingModel?.visitorReprintingCost))}`
                          )}
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography
                className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardHeavyAccent}`}
              >
                Responsible for billing
              </Typography>
              {model.billingModelType === ProjectModel.BillingModelType.BADGES ? (
                <Typography className={cardGlobalClasses.cardFont}>
                  {model.badgeBillingModel && model.badgeBillingModel.isBilledPerCompany ? LANG.EN.PROJECT.CLIENT_PAY_LABEL : responsibleForBilling}
                </Typography>
              ) : (
                <Typography className={cardGlobalClasses.cardFont}>
                  {model.seatBillingModel?.billedCompanyId || model.seatBillingModel?.billedCompany ? responsibleForBilling : '-'}
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </Card>

      <Card
        title={ProjectModel.projectStepMap[ProjectModel.ProjectStep.ADDRESSES].title}
        hideSecondaryAction={hideEditAction}
        actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
        styleClass={classes.boxShadow}
        secondaryAction={
          edit ? (
            isFcaUser && (
              <IconButton
                className={buttonClasses.editButton}
                disableRipple={true}
                onClick={handleEditAddresses}
                data-testid="addr-edit-button"
                disabled={model.status === ResourceModel.Status.ARCHIVED}
              >
                <CreateIcon />
              </IconButton>
            )
          ) : (
            <ReviewButton
              stepKey={ProjectModel.ProjectStep.ADDRESSES}
              completedFields={completedFields[ProjectModel.ProjectStep.ADDRESSES]}
              onChangeStep={onChangeStep}
            />
          )
        }
      >
        <div className={classes.reviewCardBody}>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Job Site Address
              </Typography>
              <Address address={model?.jobSiteAddress} />
              <div>
                {isJobSiteMapAvailable && <div id="job-site-map" className={`${classes.fullWidth} ${classes.mapWrapper}`} ref={jobSiteMapRef as any} />}
              </div>
            </Grid>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Badging Site Address
              </Typography>

              {model.badgingSiteAddressMatchesJobSiteAddress ? (
                <Typography className={cardGlobalClasses.cardFont}>Same as Job Site Address</Typography>
              ) : (
                <>
                  <Address address={model?.badgingSiteAddress} />
                  <div>
                    {isBadgingSiteMapAvailable && (
                      <div id="badging-site-map" className={`${classes.fullWidth} ${classes.mapWrapper}`} ref={badgingSiteMapRef as any} />
                    )}
                  </div>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>Locations</Typography>
              {locations && <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} `}>{locations}</Typography>}
            </Grid>
          </Grid>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Mailing Address
              </Typography>

              {model.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS ||
              model.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.BADGING_SITE_ADDRESS ? (
                <Typography className={cardGlobalClasses.cardFont}>
                  Same as{' '}
                  {model.mailingAddressMatchingType === ProjectModel.MailingAddressMatchingType.JOB_SITE_ADDRESS ? 'Job Site Address' : 'Badging Site Address'}
                </Typography>
              ) : (
                <>
                  <Address address={model?.mailingAddress} />
                  <div>{isMailingSiteMapAvailable && <div id="mailing-site-map" className={`${classes.mapWrapper}`} ref={mailingSiteMapRef as any} />}</div>
                </>
              )}
            </Grid>
          </Grid>
        </div>
      </Card>
      <Card
        title={ProjectModel.projectStepMap[ProjectModel.ProjectStep.CERTIFICATIONS_TRAININGS].title}
        hideSecondaryAction={hideEditAction}
        actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
        styleClass={classes.boxShadow}
        secondaryAction={
          edit ? (
            isFcaUser && (
              <IconButton
                className={buttonClasses.editButton}
                disableRipple={true}
                onClick={handleEditCertifications}
                data-testid="certs-edit-button"
                disabled={model.status === ResourceModel.Status.ARCHIVED}
              >
                <CreateIcon />
              </IconButton>
            )
          ) : (
            <ReviewButton
              stepKey={ProjectModel.ProjectStep.CERTIFICATIONS_TRAININGS}
              completedFields={completedFields[ProjectModel.ProjectStep.CERTIFICATIONS_TRAININGS]}
              onChangeStep={onChangeStep}
            />
          )
        }
      >
        <div className={classes.reviewCardBody}>
          <Grid container={true} spacing={3} className={'cardBody-row'}>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography
                className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardHeavyAccent}`}
              >
                Certifications
              </Typography>
              <Typography className={`${cardGlobalClasses.cardFontNoEllipsis} ${cardGlobalClasses.cardFont}`}>
                {getListWithCommas(certificationList)}
              </Typography>
            </Grid>
            <Grid item={true} xs={12} md={6} className={'cardBody-item'}>
              <Typography
                className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardHeavyAccent}`}
              >
                Trainings
              </Typography>
              <Typography className={`${cardGlobalClasses.cardFontNoEllipsis} ${cardGlobalClasses.cardFont}`}>{getListWithCommas(trainingList)}</Typography>
            </Grid>
          </Grid>
        </div>
      </Card>
      <Card
        title={ProjectModel.projectStepMap[ProjectModel.ProjectStep.WORKER_CONSENT_FORM].title}
        hideSecondaryAction={hideEditAction}
        actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
        styleClass={classes.boxShadow}
        secondaryAction={
          edit ? (
            isFcaUser && (
              <IconButton
                className={buttonClasses.editButton}
                disableRipple={true}
                onClick={handleEditWorkerConsentForm}
                data-testid="consent-form-edit-button"
                disabled={model.status === ResourceModel.Status.ARCHIVED}
              >
                <CreateIcon />
              </IconButton>
            )
          ) : (
            <ReviewButton
              stepKey={ProjectModel.ProjectStep.WORKER_CONSENT_FORM}
              completedFields={completedFields[ProjectModel.ProjectStep.WORKER_CONSENT_FORM]}
              onChangeStep={onChangeStep}
            />
          )
        }
      >
        <div className={classes.reviewCardBody}>
          <Grid container={true} spacing={0} className="cardBody-row">
            <Grid item={true} xs={12} className="cardBody-item">
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>
                Consent Form Name
              </Typography>
              {consentFormLegalsName(consentFormLegals)}
            </Grid>
          </Grid>

          <Grid container={true} spacing={0} className={'cardBody-row'}>
            <Grid item={true} xs={12} className={'cardBody-item'}>
              <Typography
                className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontAccent} ${cardGlobalClasses.cardTitle} ${cardGlobalClasses.cardHeavyAccent}`}
              >
                Predefined Inputs
              </Typography>
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardFontNoEllipsis}`}>
                <span>{getListWithCommas(activeConsentFormFields)}</span>
              </Typography>
            </Grid>
          </Grid>

          <Grid container={true} spacing={0} className="cardBody-row">
            <Grid item={true} xs={12} className="cardBody-item">
              <Typography className={`${cardGlobalClasses.cardFont} ${cardGlobalClasses.cardHeavyAccent} ${cardGlobalClasses.cardTitle}`}>Legal</Typography>
              {consentFormLegalsBody(consentFormLegals)}
            </Grid>
          </Grid>
        </div>
      </Card>
      {!isFcaUser ? (
        <Card
          title="Credit Card"
          hideSecondaryAction={!edit}
          actionStyleClass={getConditionalDefaultValue(edit, formGlobalClasses.secondaryActionsIcon, '')}
          styleClass={classes.boxShadow}
          secondaryAction={
            edit && (
              <PermissionGuard permissionsExpression={UserModel.PaymentMethodsPermission.MANAGE}>
                <IconButton
                  className={buttonClasses.editButton}
                  disableRipple={true}
                  onClick={handleEditPayment}
                  data-testid="payment-edit-button"
                  disabled={model.status === ResourceModel.Status.ARCHIVED}
                >
                  <CreateIcon />
                </IconButton>
              </PermissionGuard>
            )
          }
        >
          <div className={classes.cardContainer}>
            <CreditCardItem isSelected={true} paymentMethod={paymentSelected?.[0] === undefined ? initialCard : paymentSelected[0]} setSelected={noop} />
          </div>
        </Card>
      ) : null}
    </>
  );
};

export default memo(Review);
