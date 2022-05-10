import React, { memo, useCallback, useMemo } from 'react';

import { TextField, InputAdornment, FormControlLabel, Typography, Grid } from '@material-ui/core';

import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput/ControlledInput';
import ControlledMaskInput from 'modules/views/shared/FormHandler/ControlledMaskInput/ControlledMaskInput';
import Checkbox from 'modules/views/shared/FormHandler/Checkbox/Checkbox';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect/ControlledSelect';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError/ControlledError';

import { LANG, InfoIcon } from 'constants/index';
import { isEmpty, numberMask, parseFloatNumber, parseNumber, formatNumberWithCommas } from 'utils/generalUtils';
import { useStyles } from '../../styles';
import { ProjectNewModel } from 'modules/models';
import { getSeatPrice, getTotalPrice } from 'utils/projectUtils';
import { FormRules } from 'constants/form';

export interface ISeatsModelProps {
  model: ProjectNewModel.IProject;
  disableFields: boolean;
  disableBilledCompany?: boolean;
  billingTierList: ProjectNewModel.IBillingTier[];
  relatedCompanies: ProjectNewModel.IProjectCompany[];
  errors: any;
  onChange: (event: any) => void;
}

const SeatsModel = ({ disableFields, disableBilledCompany, billingTierList, relatedCompanies, onChange, model, errors }: ISeatsModelProps) => {
  const classes = useStyles();
  const labelRules = FormRules.projectNew.SeatBillingModelLabelRules;
  const seatBillingModel = useMemo(() => model.seatBillingModel ?? ProjectNewModel.getFallbackSeatBillingModel(), [model.seatBillingModel]);
  const billedCompanyOptions = useMemo(
    () =>
      disableBilledCompany
        ? [{ value: seatBillingModel?.billedCompany?.id, label: seatBillingModel?.billedCompany?.name }]
        : relatedCompanies?.map(company => ({ value: company.id, label: company.name })),
    [relatedCompanies, seatBillingModel, disableBilledCompany]
  );
  const billingTierId = useMemo(() => (seatBillingModel.billingTierId ? seatBillingModel.billingTierId : seatBillingModel.billingTier?.id || null), [
    seatBillingModel.billingTierId,
    seatBillingModel.billingTier,
  ]);
  const billingTier = useMemo(() => billingTierList.find(tier => tier.id === seatBillingModel.billingTierId) || seatBillingModel.billingTier || null, [
    seatBillingModel.billingTierId,
    seatBillingModel.billingTier,
    billingTierList,
  ]);
  const seatPrice = useMemo(() => getSeatPrice(seatBillingModel.isFixedSeatPrice, seatBillingModel.seatPrice, billingTier?.price), [
    seatBillingModel.isFixedSeatPrice,
    seatBillingModel.seatPrice,
    billingTier,
  ]);
  const totalPrice = useMemo(() => getTotalPrice(seatBillingModel.estimatedWorkersNumber || 0, parseFloatNumber(seatPrice) || 0), [
    seatBillingModel.estimatedWorkersNumber,
    seatPrice,
  ]);
  const getErrors = field => {
    return (errors.seatBillingModel && errors.seatBillingModel[field]) || errors[`seatBillingModel.${field}`];
  };

  const onSeatsChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        seatBillingModel: {
          ...prevState.seatBillingModel,
          [event.target.name]: event.target.value,
        },
      }));
    },
    [onChange]
  );

  const onEstimatedWorkersChangeHandler = useCallback(
    event => {
      event.persist();
      const estimatedWorkers = isEmpty(event.target.value) ? null : parseNumber(event.target.value);
      const newBillingTier = billingTierList.find(tier => (!tier.top || tier.top >= estimatedWorkers) && tier.bottom <= estimatedWorkers);
      onChange(prevState => ({
        ...prevState,
        seatBillingModel: {
          ...prevState.seatBillingModel,
          estimatedWorkersNumber: estimatedWorkers,
          billingTierId: newBillingTier?.id || null,
          billingTier: newBillingTier || null,
          seatPrice: prevState.seatBillingModel?.isFixedSeatPrice ? prevState.seatBillingModel.seatPrice : newBillingTier?.price || null,
        },
      }));
    },
    [billingTierList, onChange]
  );

  const onIsFixedSeatPriceChange = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        seatBillingModel: {
          ...prevState.seatBillingModel,
          isFixedSeatPrice: event.target.checked,
          seatPrice: prevState.seatBillingModel?.billingTier?.price || prevState.seatBillingModel?.seatPrice,
        },
      }));
    },
    [onChange]
  );

  const onBilledCompanyChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        seatBillingModel: {
          ...(prevState.seatBillingModel ?? ProjectNewModel.getFallbackSeatBillingModel()),
          billedCompanyId: event.target.value,
          billedCompany: relatedCompanies.find(company => company.id === event.target.value),
        },
      }));
    },
    [relatedCompanies, onChange]
  );

  return (
    <Grid container={true} spacing={2}>
      <Grid item={true} xs={12} md={8}>
        <ControlledError
          show={!!getErrors('estimatedWorkersNumber')}
          error={getErrors('estimatedWorkersNumber') === 'is required' ? 'Estimated Workers is required.' : getErrors('estimatedWorkersNumber')}
        >
          <ControlledInput
            label="Workers Estimated"
            styleClass={classes.billingWorkersEstimated}
            required={labelRules.estimatedWorkersNumber.required}
            showMark={labelRules.estimatedWorkersNumber.required}
          >
            <TextField
              className={classes.numberTextField}
              variant="outlined"
              data-testid="project-seats-estimatedWorkersNumber-wrapper"
              placeholder="0"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="estimatedWorkersNumber"
              required={false}
              value={seatBillingModel.estimatedWorkersNumber || ''}
              onChange={onEstimatedWorkersChangeHandler}
              error={!!getErrors('estimatedWorkersNumber')}
              disabled={disableFields}
              inputProps={{
                'data-testid': 'project-seats-estimatedWorkersNumber',
                mask: numberMask,
                showMask: true,
                guide: false,
              }}
              InputProps={{
                inputComponent: ControlledMaskInput as any,
              }}
            />
          </ControlledInput>
        </ControlledError>
      </Grid>
      <Grid item={true} xs={12} md={4}>
        <ControlledInput label="Tier">
          <ControlledSelect
            label=""
            name="billingTierId"
            includeNone={true}
            value={billingTierId || ''}
            styleClass={billingTierId ? classes.activeSelectOption : ''}
            options={billingTierList.map(tier => ({
              value: tier.id,
              label: tier.top ? `${tier.bottom}-${tier.top}` : `> ${tier.bottom - 1}`,
            }))}
            error={!!getErrors('billingTierId')}
            disabled={true}
          />
        </ControlledInput>
      </Grid>
      <Grid item={true} xs={12}>
        <FormControlLabel
          className={classes.fixedSeatPriceCheckbox}
          label="Edit price per seat per year"
          disabled={disableFields}
          control={
            <Checkbox
              name="isFixedSeatPrice"
              value="isFixedSeatPrice"
              isChecked={seatBillingModel.isFixedSeatPrice}
              onChange={onIsFixedSeatPriceChange}
              inputProps={{ 'data-testid': 'seat-isFixed' }}
              disabled={disableFields}
            />
          }
        />
      </Grid>
      <Grid item={true} xs={12}>
        <div className={classes.errorInputWrapper}>
          <ControlledError
            show={!!getErrors('seatPrice')}
            error={getErrors('seatPrice') === 'is required' ? 'Seat Price is required.' : getErrors('seatPrice')}
          >
            <ControlledInput label="Price Per Seat Per Year" required={seatBillingModel.isFixedSeatPrice} showMark={seatBillingModel.isFixedSeatPrice}>
              <TextField
                className={`${classes.billingTextField}`}
                variant="outlined"
                data-testid="project-fixedSeatPrice-wrapper"
                placeholder="0"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="seatPrice"
                required={false}
                value={seatPrice}
                onChange={onSeatsChangeHandler}
                error={!!getErrors('seatPrice')}
                disabled={disableFields || !seatBillingModel.isFixedSeatPrice}
                inputProps={{
                  'data-testid': 'project-seatPrice',
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
        </div>
      </Grid>
      <Grid item={true} xs={12}>
        <div className={classes.errorInputWrapper}>
          <ControlledError
            show={!!getErrors('reprintingCost')}
            error={getErrors('reprintingCost') === 'is required' ? 'Reprint Price is required.' : getErrors('reprintingCost')}
          >
            <ControlledInput label="Worker Badge Reprint Price" required={labelRules.reprintingCost.required} showMark={labelRules.reprintingCost.required}>
              <TextField
                className={`${classes.billingTextField}`}
                variant="outlined"
                data-testid="project-seats-reprintingCost-wrapper"
                placeholder="0"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="reprintingCost"
                required={true}
                value={seatBillingModel.reprintingCost || ''}
                onChange={onSeatsChangeHandler}
                error={!!getErrors('reprintingCost')}
                disabled={disableFields}
                inputProps={{
                  'data-testid': 'project-seats-reprintingCost',
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
        </div>
      </Grid>
      <span className={classes.totalPrice}>
        Total price per year: <span className={classes.totalPriceValue}>$ {formatNumberWithCommas(totalPrice)}</span>
      </span>
      <Grid item={true} xs={12}>
        <div className={`${classes.editFieldWrapper} ${classes.billedCompanyWrapper}`}>
          <Typography className={`${classes.billingModelTitle} ${classes.billingModelTitleMarginBottom}`}>Responsible for Billing</Typography>
          <ControlledError show={!!getErrors('billedCompanyId')} error={getErrors('billedCompanyId')} styleClass={classes.fieldError}>
            <ControlledInput label="Responsible for billing" required={labelRules.billedCompanyId.required} showMark={labelRules.billedCompanyId.required}>
              <ControlledSelect
                styleClass={classes.billingResponsible}
                options={billedCompanyOptions}
                value={seatBillingModel.billedCompanyId || seatBillingModel.billedCompany?.id || ''}
                name="billedCompanyId"
                error={!!getErrors('billedCompanyId')}
                includeNone={true}
                noneLabel="Select Client"
                onChange={onBilledCompanyChangeHandler}
                disabled={disableFields || disableBilledCompany}
              />
            </ControlledInput>
          </ControlledError>
        </div>
      </Grid>

      <Grid item={true} xs={12}>
        <div className={classes.billingReprintingInfoLabel}>
          <InfoIcon />
          <Typography className={classes.billingInfoText}>{LANG.EN.PROJECT.RESPONSIBLE_FOR_BILLING_LABEL}</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(SeatsModel);
