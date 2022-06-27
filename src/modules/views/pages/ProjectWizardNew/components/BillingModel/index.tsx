import React, { memo, useCallback, useMemo } from 'react';

import { Grid, Typography } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledRadio from 'modules/views/shared/FormHandler/ControlledRadio';
import BadgesModel from './BadgesModel';
import SeatsModel from './SeatsModel';
import VisitorBadgeBilling from './VisitorBadgeBilling';

import { ProjectNewModel } from 'modules/models';
import { useStyles } from '../../styles';
import { billingModelTypeMap, getFallbackBadgeBillingModel, getFallbackSeatBillingModel } from 'modules/models/project-new';

export interface IBillingModelProps {
  model: ProjectNewModel.IProject;
  billingTierList: ProjectNewModel.IBillingTier[];
  errors: any;
  isActiveProject?: boolean;
  onChange: (event: any) => void;
  resetErrors: () => void;
}

const BillingModel = ({ model, billingTierList, errors, resetErrors, onChange, isActiveProject = false }: IBillingModelProps) => {
  const classes = useStyles();
  const billingModelType = useMemo(() => model.billingModelType ?? ProjectNewModel.BillingModelType.BADGES, [model.billingModelType]);
  const badgeBillingModel = useMemo(() => model.badgeBillingModel ?? ProjectNewModel.getFallbackBadgeBillingModel(), [model.badgeBillingModel]);
  const onBillingTypeChangeHandler = useCallback(
    event => {
      const value = parseInt(event.target.value, 10);
      event.persist();
      resetErrors();
      onChange(prevState => ({
        ...prevState,
        badgeBillingModel:
          value === ProjectNewModel.BillingModelType.BADGES && prevState.badgeBillingModel ? prevState.badgeBillingModel : getFallbackBadgeBillingModel(),
        seatBillingModel:
          value === ProjectNewModel.BillingModelType.SEATS && prevState.seatBillingModel ? prevState.seatBillingModel : getFallbackSeatBillingModel(),
        billingModelType: value,
      }));
    },
    [onChange, resetErrors]
  );

  return (
    <Card title="Billing Model">
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <ControlledRadio
            containerStyleClass={classes.billingRadioContainer}
            row={true}
            disabled={isActiveProject}
            radioItems={[
              {
                value: ProjectNewModel.BillingModelType.BADGES,
                label: 'Badge Model',
              },
              {
                value: ProjectNewModel.BillingModelType.SEATS,
                label: 'Seat Model',
              },
            ]}
            formControlProps={{
              name: 'billingModelType',
              label: '',
              value: parseInt((model[ProjectNewModel.ProjectFields.BILLING_MODEL_TYPE] || 0) as any, 10),
              onChange: onBillingTypeChangeHandler,
            }}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <Grid container={true} spacing={4}>
            {billingModelType === ProjectNewModel.BillingModelType.BADGES && (
              <Grid item={true} xs={12} md={6}>
                <Typography className={`${classes.billingModelTitle} ${classes.billingModelTitleMarginBottom}`}>Worker Badge</Typography>
                <BadgesModel
                  badgeBillingModel={badgeBillingModel}
                  relatedCompanies={(model.relatedCompanies || []).filter(item => item.id)}
                  disableFields={billingModelType !== ProjectNewModel.BillingModelType.BADGES}
                  disableBilledCompany={isActiveProject}
                  onChange={onChange}
                  errors={errors}
                />
              </Grid>
            )}
            {billingModelType === ProjectNewModel.BillingModelType.SEATS && (
              <Grid item={true} xs={12} md={6}>
                <Typography className={`${classes.billingModelTitle} ${classes.billingModelTitleMarginBottom}`}>Worker Badge</Typography>
                <SeatsModel
                  model={model}
                  disableFields={billingModelType !== ProjectNewModel.BillingModelType.SEATS}
                  disableBilledCompany={isActiveProject}
                  billingTierList={billingTierList}
                  relatedCompanies={model.relatedCompanies}
                  onChange={onChange}
                  errors={errors}
                />
              </Grid>
            )}

            <Grid item={true} xs={12} md={6}>
              <Typography className={`${classes.billingModelTitle} ${classes.billingModelTitleMarginBottom}`}>Visitor Badge</Typography>
              <VisitorBadgeBilling modelType={billingModelTypeMap[billingModelType]} model={model} errors={errors} onChange={onChange} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default memo(BillingModel);
