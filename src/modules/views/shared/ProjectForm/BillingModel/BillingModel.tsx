import React, { memo, useCallback, useMemo } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

import Card from '../../ResourceManagement/Card';
import ControlledRadio from '../../FormHandler/ControlledRadio';
import BadgesModel from './BadgesModel';
import SeatsModel from './SeatsModel';
import VisitorBadgeBilling from './VisitorBadgeBilling';

import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { ProjectModel } from '../../../../models';
import { useStyles } from '../styles';
import { billingModelTypeMap, getFallbackBadgeBillingModel, getFallbackSeatBillingModel } from '../../../../models/project';

export interface IBillingModelProps {
  model: ProjectModel.IProject;
  billingTiers: ProjectModel.IBillingTier[];
  errors: any;
  isActiveProject?: boolean;
  onChange: (event: any) => void;
  resetErrors: () => void;
}

const BillingModel = ({ model, billingTiers, errors, resetErrors, onChange, isActiveProject = false }: IBillingModelProps) => {
  const classes = useStyles();
  const billingModelType = useMemo(() => model.billingModelType ?? ProjectModel.BillingModelType.BADGES, [model.billingModelType]);
  const badgeBillingModel = useMemo(() => model.badgeBillingModel ?? ProjectModel.getFallbackBadgeBillingModel(), [model.badgeBillingModel]);

  const onBillingTypeChangeHandler = useCallback(
    event => {
      const value = parseInt(event.target.value, 10);
      event.persist();
      resetErrors();
      onChange(prevState => ({
        ...prevState,
        badgeBillingModel:
          value === ProjectModel.BillingModelType.BADGES && prevState.badgeBillingModel ? prevState.badgeBillingModel : getFallbackBadgeBillingModel(),
        seatBillingModel:
          value === ProjectModel.BillingModelType.SEATS && prevState.seatBillingModel ? prevState.seatBillingModel : getFallbackSeatBillingModel(),
        billingModelType: value,
      }));
    },
    [onChange, resetErrors]
  );

  return (
    <Card title="Billing Model">
      <Grid container={true}>
        <ControlledRadio
          containerStyleClass={classes.billingRadioContainer}
          row={true}
          disabled={isActiveProject}
          radioItems={[
            {
              value: ProjectModel.BillingModelType.BADGES,
              label: 'Badge Model',
            },
            {
              value: ProjectModel.BillingModelType.SEATS,
              label: 'Seat Model',
            },
          ]}
          formControlProps={{
            name: 'billingModelType',
            label: '',
            value: parseInt((model[ProjectModel.ProjectFields.BILLING_MODEL_TYPE] || 0) as any, 10),
            onChange: onBillingTypeChangeHandler,
          }}
        />
        <div className={classes.billingModelsWrapper}>
          {billingModelType === ProjectModel.BillingModelType.BADGES && (
            <Grid item={true} className={classes.billingModelFirstItem}>
              <Typography className={`${classes.billingModelTitle} ${classes.billingModelTitleMarginBottom}`}>Worker Badge</Typography>
              <BadgesModel
                badgeBillingModel={badgeBillingModel}
                relatedCompanies={model.relatedCompanies}
                disableFields={billingModelType !== ProjectModel.BillingModelType.BADGES}
                disableBilledCompany={isActiveProject}
                onChange={onChange}
                errors={errors}
              />
            </Grid>
          )}
          {billingModelType === ProjectModel.BillingModelType.SEATS && (
            <Grid item={true} className={classes.billingModelFirstItem}>
              <Typography className={`${classes.billingModelTitle} ${classes.billingModelTitleMarginBottom}`}>Worker Badge</Typography>
              <SeatsModel
                model={model}
                disableFields={billingModelType !== ProjectModel.BillingModelType.SEATS}
                disableBilledCompany={isActiveProject}
                billingTiers={billingTiers}
                relatedCompanies={model.relatedCompanies}
                onChange={onChange}
                errors={errors}
              />
            </Grid>
          )}
          <Divider
            className={getConditionalDefaultValue(billingModelType === ProjectModel.BillingModelType.BADGES, classes.badgesDivider, classes.seatsDivider)}
            orientation="vertical"
            flexItem={true}
          />
          <Grid item={true} className={classes.billingModelSecondItem}>
            <Typography className={`${classes.billingModelTitle} ${classes.billingModelTitleMarginBottom}`}>Visitor Badge</Typography>
            <VisitorBadgeBilling modelType={billingModelTypeMap[billingModelType]} model={model} errors={errors} onChange={onChange} />
          </Grid>
        </div>
      </Grid>
    </Card>
  );
};

export default memo(BillingModel);
