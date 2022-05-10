import React, { memo, useCallback, useMemo } from 'react';

import { TextField, InputAdornment, Grid } from '@material-ui/core';

import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput/ControlledInput';
import ControlledMaskInput from 'modules/views/shared/FormHandler/ControlledMaskInput/ControlledMaskInput';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError/ControlledError';

import { getDefaultValue, numberMask } from 'utils/generalUtils';
import { useStyles } from '../../styles';
import { ProjectNewModel } from 'modules/models';
import { billingModelTypeMap, getFallbackBadgeBillingModel } from 'modules/models/project-new';
import { FormRules } from 'constants/form';

const VisitorBadgeBilling = ({ modelType, model, errors, onChange }) => {
  const classes = useStyles();
  const labelRules = useMemo(
    () =>
      modelType === billingModelTypeMap[ProjectNewModel.BillingModelType.BADGES]
        ? FormRules.projectNew.BadgeBillingModelLabelRules
        : FormRules.projectNew.SeatBillingModelLabelRules,
    [modelType]
  );
  const billingModel = useMemo(
    () =>
      modelType === billingModelTypeMap[ProjectNewModel.BillingModelType.BADGES]
        ? model.badgeBillingModel || getFallbackBadgeBillingModel()
        : model.seatBillingModel,
    [modelType, model.badgeBillingModel, model.seatBillingModel]
  );

  const getErrors = field => {
    return (errors[modelType] && errors[modelType][field]) || errors[`badgeBillingModel.${field}`];
  };

  const onVisitorChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        billingModelType: getDefaultValue(prevState.billingModelType, 0),
        badgeBillingModel:
          prevState.billingModelType === ProjectNewModel.BillingModelType.BADGES
            ? {
                ...getDefaultValue(prevState.badgeBillingModel, ProjectNewModel.getFallbackBadgeBillingModel()),
                [event.target.name]: event.target.value,
              }
            : null,
        seatBillingModel:
          prevState.billingModelType === ProjectNewModel.BillingModelType.SEATS
            ? {
                ...getDefaultValue(prevState.seatBillingModel, ProjectNewModel.getFallbackSeatBillingModel()),
                [event.target.name]: event.target.value,
              }
            : null,
      }));
    },
    [onChange]
  );

  return (
    <Grid container={true} spacing={4}>
      <Grid item={true} xs={12}>
        <ControlledError
          show={!!getErrors('visitorBadgePrice')}
          error={getErrors('visitorBadgePrice') === 'is required' ? 'Visitor Badge Price is required.' : getErrors('visitorBadgePrice')}
        >
          <ControlledInput label="Visitor Badge Price" required={labelRules.visitorBadgePrice.required} showMark={labelRules.visitorBadgePrice.required}>
            <TextField
              className={`${classes.billingTextField}`}
              variant="outlined"
              data-testid="project-visitorBadgePrice-wrapper"
              placeholder="0"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="visitorBadgePrice"
              required={true}
              value={billingModel?.visitorBadgePrice || ''}
              onChange={onVisitorChangeHandler}
              error={!!getErrors('visitorBadgePrice')}
              disabled={false}
              inputProps={{
                'data-testid': 'project-visitorBadgePrice',
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
          show={!!getErrors('visitorReprintingCost')}
          error={getErrors('visitorReprintingCost') === 'is required' ? 'Visitor Reprint Price is required.' : getErrors('visitorReprintingCost')}
        >
          <ControlledInput
            label="Visitor Badge Reprint Price"
            required={labelRules.visitorReprintingCost.required}
            showMark={labelRules.visitorReprintingCost.required}
          >
            <TextField
              className={`${classes.billingTextField}`}
              variant="outlined"
              data-testid="project-visitorReprintingCost-wrapper"
              placeholder="0"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="visitorReprintingCost"
              required={true}
              value={billingModel?.visitorReprintingCost || ''}
              onChange={onVisitorChangeHandler}
              error={!!getErrors('visitorReprintingCost')}
              disabled={false}
              inputProps={{
                'data-testid': 'project-visitorReprintingCost',
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
    </Grid>
  );
};

export default memo(VisitorBadgeBilling);
