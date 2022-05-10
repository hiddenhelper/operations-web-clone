import React, { memo, useCallback, useMemo } from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import ControlledInput from '../../FormHandler/ControlledInput/ControlledInput';
import ControlledMaskInput from '../../FormHandler/ControlledMaskInput/ControlledMaskInput';
import ControlledError from '../../FormHandler/ControlledError/ControlledError';

import { getDefaultValue, numberMask } from '../../../../../utils/generalUtils';
import { useStyles } from '../styles';
import { ProjectModel } from '../../../../models';
import { billingModelTypeMap, getFallbackBadgeBillingModel } from '../../../../models/project';

const VisitorBadgeBilling = ({ modelType, model, errors, onChange }) => {
  const classes = useStyles();
  const billingModel = useMemo(
    () =>
      modelType === billingModelTypeMap[ProjectModel.BillingModelType.BADGES]
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
          prevState.billingModelType === ProjectModel.BillingModelType.BADGES
            ? {
                ...getDefaultValue(prevState.badgeBillingModel, ProjectModel.getFallbackBadgeBillingModel()),
                [event.target.name]: event.target.value,
              }
            : null,
        seatBillingModel:
          prevState.billingModelType === ProjectModel.BillingModelType.SEATS
            ? {
                ...getDefaultValue(prevState.seatBillingModel, ProjectModel.getFallbackSeatBillingModel()),
                [event.target.name]: event.target.value,
              }
            : null,
      }));
    },
    [onChange]
  );

  return (
    <>
      <ControlledError
        show={!!getErrors('visitorBadgePrice')}
        error={getErrors('visitorBadgePrice') === 'is required' ? 'Visitor Badge Price is required.' : getErrors('visitorBadgePrice')}
      >
        <ControlledInput label="Visitor Badge Price" styleClass={classes.billingBadgePrice}>
          <TextField
            className={`${classes.billingTextField} ${classes.billingInputMarginBottom}`}
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
      <ControlledError
        show={!!getErrors('visitorReprintingCost')}
        error={getErrors('visitorReprintingCost') === 'is required' ? 'Visitor Reprint Price is required.' : getErrors('visitorReprintingCost')}
      >
        <ControlledInput label="Visitor Badge Reprint Price">
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
    </>
  );
};

export default memo(VisitorBadgeBilling);
