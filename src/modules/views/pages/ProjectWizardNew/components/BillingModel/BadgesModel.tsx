import React, { memo, useCallback, useMemo } from 'react';
import { TextField, InputAdornment, FormControlLabel, Typography, Grid } from '@material-ui/core';

import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput/ControlledInput';
import ControlledMaskInput from 'modules/views/shared/FormHandler/ControlledMaskInput/ControlledMaskInput';
import Checkbox from 'modules/views/shared/FormHandler/Checkbox/Checkbox';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect/ControlledSelect';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError/ControlledError';

import { LANG, InfoIcon } from 'constants/index';
import { numberMask } from 'utils/generalUtils';
import { useStyles } from '../../styles';
import { ProjectNewModel } from 'modules/models';
import { FormRules } from 'constants/form';

export interface IBadgesModelProps {
  badgeBillingModel: ProjectNewModel.IBadgesModel;
  relatedCompanies: ProjectNewModel.IProjectCompany[];
  disableFields: boolean;
  disableBilledCompany?: boolean;
  errors: any;
  onChange: (event: any) => void;
}

const BadgesModel = ({ badgeBillingModel, relatedCompanies, disableFields, disableBilledCompany, onChange, errors }: IBadgesModelProps) => {
  const classes = useStyles();
  const labelRules = FormRules.projectNew.BadgeBillingModelLabelRules;
  const billedCompanyOptions = useMemo(
    () =>
      disableBilledCompany
        ? [{ value: badgeBillingModel?.billedCompany?.id, label: badgeBillingModel?.billedCompany?.name }]
        : relatedCompanies.map(company => ({ value: company.id, label: company.name })),
    [relatedCompanies, badgeBillingModel, disableBilledCompany]
  );
  const getErrors = field => {
    return (errors.badgeBillingModel && errors.badgeBillingModel[field]) || errors[`badgeBillingModel.${field}`];
  };

  const onBadgesChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        billingModelType: prevState.billingModelType ?? 0,
        badgeBillingModel: {
          ...(prevState.badgeBillingModel ?? ProjectNewModel.getFallbackBadgeBillingModel()),
          [event.target.name]: event.target.value,
        },
      }));
    },
    [onChange]
  );

  const onIsBilledCompanyChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => {
        return {
          ...prevState,
          billingModelType: prevState.billingModelType ?? 0,
          badgeBillingModel: {
            ...(prevState.badgeBillingModel ?? ProjectNewModel.getFallbackBadgeBillingModel()),
            isBilledPerCompany: event.target.checked,
            billedCompanyId: event.target.checked ? null : prevState.badgeBillingModel?.billedCompanyId,
            billedCompany: event.target.checked ? null : prevState.badgeBillingModel?.billedCompany,
          },
        };
      });
    },
    [onChange]
  );

  const onBilledCompanyChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        badgeBillingModel: {
          ...prevState.badgeBillingModel,
          billedCompanyId: event.target.value,
          billedCompany: relatedCompanies.find(company => company.id === event.target.value),
        },
      }));
    },
    [relatedCompanies, onChange]
  );

  return (
    <Grid container={true} spacing={4}>
      <Grid item={true} xs={12}>
        <ControlledError
          show={!!getErrors('badgePrice')}
          error={getErrors('badgePrice') === 'is required' ? 'Badge Price is required.' : getErrors('badgePrice')}
        >
          <ControlledInput label="Worker Badge Price" required={labelRules.badgePrice.required} showMark={labelRules.badgePrice.required}>
            <TextField
              className={`${classes.billingTextField}`}
              variant="outlined"
              data-testid="project-badgePrice-wrapper"
              placeholder="0"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="badgePrice"
              required={true}
              value={badgeBillingModel.badgePrice || ''}
              onChange={onBadgesChangeHandler}
              error={!!getErrors('badgePrice')}
              disabled={disableFields}
              inputProps={{
                'data-testid': 'project-badgePrice',
                mask: numberMask,
                showMask: true,
                guide: false,
              }}
              InputProps={{
                inputComponent: ControlledMaskInput as any,
                startAdornment: (
                  <InputAdornment position="start" className={classes.billingDollarSign}>
                    $
                  </InputAdornment>
                ),
              }}
            />
          </ControlledInput>
        </ControlledError>
      </Grid>
      <Grid item={true} xs={12}>
        <ControlledError
          show={!!getErrors('reprintingCost')}
          error={getErrors('reprintingCost') === 'is required' ? 'Reprint Price is required.' : getErrors('reprintingCost')}
        >
          <ControlledInput label="Worker Badge Reprint Price" required={labelRules.reprintingCost.required} showMark={labelRules.reprintingCost.required}>
            <TextField
              className={`${classes.billingTextField}`}
              variant="outlined"
              data-testid="project-reprintingCost-wrapper"
              placeholder="0"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="reprintingCost"
              required={true}
              value={badgeBillingModel.reprintingCost || ''}
              onChange={onBadgesChangeHandler}
              error={!!getErrors('reprintingCost')}
              disabled={disableFields}
              inputProps={{
                'data-testid': 'project-reprintingCost',
                mask: numberMask,
                showMask: true,
                guide: false,
              }}
              InputProps={{
                inputComponent: ControlledMaskInput as any,
                startAdornment: (
                  <InputAdornment position="start" className={classes.billingDollarSign}>
                    $
                  </InputAdornment>
                ),
              }}
            />
          </ControlledInput>
        </ControlledError>
      </Grid>
      <Grid item={true} xs={12}>
        <Typography className={`${classes.billingModelTitle}`}>Responsible for Billing</Typography>
        <FormControlLabel
          className={classes.billableClientCheckbox}
          label={LANG.EN.PROJECT.CLIENT_PAY_LABEL}
          disabled={disableFields || disableBilledCompany}
          control={
            <Checkbox
              name="isBilledPerCompany"
              value="isBilledPerCompany"
              isChecked={badgeBillingModel.isBilledPerCompany}
              onChange={onIsBilledCompanyChangeHandler}
              inputProps={{ 'data-testid': 'badge-isBilled' }}
              disabled={disableFields || disableBilledCompany}
            />
          }
        />
      </Grid>
      {!badgeBillingModel.isBilledPerCompany && (
        <Grid item={true} xs={12}>
          <div className={classes.editFieldWrapper}>
            <ControlledError show={!!getErrors('billedCompanyId')} error={getErrors('billedCompanyId')} styleClass={classes.fieldError}>
              <ControlledInput label="Responsible for billing" required={labelRules.billedCompanyId.required} showMark={labelRules.billedCompanyId.required}>
                <ControlledSelect
                  styleClass={classes.billingResponsible}
                  options={billedCompanyOptions}
                  value={badgeBillingModel.billedCompanyId || badgeBillingModel.billedCompany?.id || ''}
                  name="billedCompanyId"
                  error={!!getErrors('billedCompanyId')}
                  includeNone={true}
                  noneLabel="Select Client"
                  onChange={onBilledCompanyChangeHandler}
                  disabled={disableFields || disableBilledCompany}
                  dataTestId="badge-billedCompany-container"
                  inputProps={{ 'data-testid': 'badge-billedCompany' }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
      )}
      <Grid item={true} xs={12}>
        <div className={classes.billingReprintingInfoLabel}>
          <InfoIcon />
          <Typography className={classes.billingInfoText}>{LANG.EN.PROJECT.RESPONSIBLE_FOR_BILLING_LABEL}</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(BadgesModel);
