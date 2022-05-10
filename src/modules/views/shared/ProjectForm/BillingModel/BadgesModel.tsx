import React, { memo, useCallback, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import ControlledInput from '../../FormHandler/ControlledInput/ControlledInput';
import ControlledMaskInput from '../../FormHandler/ControlledMaskInput/ControlledMaskInput';
import Checkbox from '../../FormHandler/Checkbox/Checkbox';
import ControlledSelect from '../../FormHandler/ControlledSelect/ControlledSelect';
import ControlledError from '../../FormHandler/ControlledError/ControlledError';

import { LANG, InfoIcon } from '../../../../../constants';
import { numberMask } from '../../../../../utils/generalUtils';
import { ProjectModel } from '../../../../models';
import { useStyles } from '../styles';

export interface IBadgesModelProps {
  badgeBillingModel: ProjectModel.IBadgesModel;
  relatedCompanies: ProjectModel.IProjectCompany[];
  disableFields: boolean;
  disableBilledCompany?: boolean;
  errors: any;
  onChange: (event: any) => void;
}

const BadgesModel = ({ badgeBillingModel, relatedCompanies, disableFields, disableBilledCompany, onChange, errors }: IBadgesModelProps) => {
  const classes = useStyles();
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
          ...(prevState.badgeBillingModel ?? ProjectModel.getFallbackBadgeBillingModel()),
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
            ...(prevState.badgeBillingModel ?? ProjectModel.getFallbackBadgeBillingModel()),
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
    <>
      <ControlledError
        show={!!getErrors('badgePrice')}
        error={getErrors('badgePrice') === 'is required' ? 'Badge Price is required.' : getErrors('badgePrice')}
      >
        <ControlledInput label="Worker Badge Price" styleClass={classes.billingBadgePrice}>
          <TextField
            className={`${classes.billingTextField} ${classes.billingInputMarginBottom}`}
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
      <ControlledError
        show={!!getErrors('reprintingCost')}
        error={getErrors('reprintingCost') === 'is required' ? 'Reprint Price is required.' : getErrors('reprintingCost')}
      >
        <ControlledInput label="Worker Badge Reprint Price">
          <TextField
            className={`${classes.billingTextField} ${classes.badgeModelReprintPrice}`}
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

      {!badgeBillingModel.isBilledPerCompany && (
        <div className={classes.editFieldWrapper}>
          <ControlledError show={!!getErrors('billedCompanyId')} error={getErrors('billedCompanyId')} styleClass={classes.fieldError}>
            <ControlledSelect
              label="Responsible for billing"
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
          </ControlledError>
        </div>
      )}
      <div className={classes.billingReprintingInfoLabel}>
        <InfoIcon />
        <Typography className={classes.billingInfoText}>{LANG.EN.PROJECT.RESPONSIBLE_FOR_BILLING_LABEL}</Typography>
      </div>
    </>
  );
};

export default memo(BadgesModel);
