import React, { memo, useCallback, useMemo, useState } from 'react';

import { Button, FormControlLabel, Grid, TextField } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';
import ControlledRadio from 'modules/views/shared/FormHandler/ControlledRadio';
import ControlledMaskInput from 'modules/views/shared/FormHandler/ControlledMaskInput';
import ControlledMultipleSelect from 'modules/views/shared/FormHandler/ControlledMultipleSelect';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledCheckbox from 'modules/views/shared/FormHandler/Checkbox';

import TaxpayerIdHelperModal from './TaxpayerIdHelperModal';

import { GeneralModel, ResourceModel, ClientModel } from 'modules/models';
import { getConditionalDefaultValue, isNull, moneyMask, IFormRules } from 'utils';
import { formGlobalStyles, inputGlobalStyles } from 'assets/styles';

export interface IGeneralInformationProps {
  model: ClientModel.IClient;
  formRules: IFormRules;
  errors: any;
  mwbeList: GeneralModel.INamedEntity[];
  tradeList: GeneralModel.INamedEntity[];
  onChange: (event: any) => void;
  updateRules: (rules: IFormRules) => void;
}

const GeneralInformation = ({ formRules, model, errors, mwbeList, tradeList, onChange, updateRules }: IGeneralInformationProps) => {
  const inputGlobalClasses = inputGlobalStyles();
  const formClasses = formGlobalStyles();

  const [showTaxpayerHint, setShowTaxpayerHint] = useState<boolean>(false);
  const togglesShowTaxpayerHint = () => setShowTaxpayerHint(prevVal => !prevVal);

  const isOtherTradeChecked = useMemo(() => !isNull(model.otherTrade), [model.otherTrade]);
  const mwbeOptionList = useMemo(() => mwbeList.map(option => ({ label: option.name, value: option.id })).sort((a, b) => (a.label === 'None' ? -1 : 1)), [
    mwbeList,
  ]);
  const isActive = useMemo(() => model.status === ResourceModel.CompanyStatus.ACTIVE, [model]);
  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );
  const handleOtherTradeCheckboxChange = useCallback(
    e => {
      onChangeHandler({
        target: { name: 'otherTrade', value: !e.target.checked ? null : '' },
      });
      updateRules({
        ...formRules,
        otherTrade: {
          ...formRules.otherTrade,
          required: e.target.checked,
        },
      });
    },
    [formRules, onChangeHandler, updateRules]
  );
  const handleDeveloperChange = useCallback(
    event => {
      onChangeHandler({
        target: { name: 'isDeveloper', value: event.target.checked },
      });
    },
    [onChangeHandler]
  );
  const onBooleanChangeHandler = useCallback(
    event => {
      onChangeHandler({
        target: { name: event.target.name, value: !!Number(event.target.value) },
      });
    },
    [onChangeHandler]
  );
  return (
    <>
      <Card title="Client Name">
        <ControlledError show={!!errors.name} error={getConditionalDefaultValue(errors.name === 'is required', 'Please enter Client Name.', errors.name)}>
          <ControlledInput label="Client Name">
            <TextField
              variant="outlined"
              data-testid="client-name-wrapper"
              placeholder="Client name"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="name"
              required={formRules.name.required}
              value={model.name || ''}
              onChange={onChangeHandler}
              error={!!errors.name}
              inputProps={{
                'data-testid': 'client-name',
              }}
            />
          </ControlledInput>
        </ControlledError>
        <FormControlLabel
          control={
            <ControlledCheckbox
              isChecked={model?.isDeveloper || false}
              name="isDeveloper"
              value="isDeveloper"
              onChange={handleDeveloperChange}
              disabled={isActive}
              inputProps={{ 'data-testid': 'developer-checkbox' }}
            />
          }
          label="Developer"
          classes={{ root: `${formClasses.selectLabelGeneral}`, label: formClasses.selectLabel }}
        />
      </Card>
      <Card
        title="Legal Information"
        showAttentionIcon={true}
        actionStyleClass={formClasses.infoSecondaryAction}
        secondaryAction={
          <>
            Taxpayer ID Number depends on the Client’s country.
            <Button color="primary" onClick={togglesShowTaxpayerHint} size="small">
              More info
            </Button>
          </>
        }
      >
        <Grid container={true}>
          <Grid item={true} xs={6}>
            <ControlledError
              show={!!errors.taxpayerIdentificationNumber}
              error={getConditionalDefaultValue(
                errors.taxpayerIdentificationNumber === 'is required',
                'Please enter Taxpayer Identification Number.',
                errors.taxpayerIdentificationNumber
              )}
            >
              <ControlledInput styleClass={inputGlobalClasses.middleInput} label="Taxpayer Identification Number">
                <TextField
                  variant="outlined"
                  data-testid="client-taxpayerIdentificationNumber-wrapper"
                  placeholder="Taxpayer Identification Number"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="taxpayerIdentificationNumber"
                  required={formRules.taxpayerIdentificationNumber.required}
                  value={model.taxpayerIdentificationNumber || ''}
                  onChange={onChangeHandler}
                  error={!!errors.taxpayerIdentificationNumber}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
          <Grid item={true} xs={6} className={inputGlobalClasses.lastMiddleInput}>
            <ControlledSelect
              label="MBE/WBE"
              name="mwbeTypeId"
              value={model.mwbeTypeId}
              options={mwbeOptionList}
              error={!!errors.mwbeTypeId}
              onChange={onChangeHandler}
            />
          </Grid>
        </Grid>
      </Card>
      <Card title="Trades">
        <div className={formClasses.tradesWrapper}>
          <ControlledError
            show={!!errors.trades}
            error={getConditionalDefaultValue(errors.trades === 'is required', 'Please select at least one trade.', errors.trades)}
          >
            <ControlledMultipleSelect items={tradeList} name="trades" value={model.trades} onChange={onChange} error={!!errors.trades} />
            {tradeList.length > 1 && (
              <div className={formClasses.otherTradeWrapper}>
                <FormControlLabel
                  control={
                    <ControlledCheckbox
                      isChecked={isOtherTradeChecked}
                      name="otherTradeCheck"
                      value="hasOtherTrade"
                      onChange={handleOtherTradeCheckboxChange}
                      inputProps={{ 'data-testid': 'other-trade-check' }}
                      error={!!errors.otherTrade || !!errors.trades}
                    />
                  }
                  label="Other"
                  classes={{ label: formClasses.selectLabel }}
                />
                {isOtherTradeChecked && (
                  <ControlledError
                    show={!!errors.otherTrade}
                    error={getConditionalDefaultValue(errors.otherTrade === 'is required', 'Please enter a trade.', errors.otherTrade)}
                  >
                    <ControlledInput label="Type a Trade">
                      <TextField
                        variant="outlined"
                        data-testid="client-other-trade-wrapper"
                        placeholder="Trade"
                        type="text"
                        autoComplete="off"
                        fullWidth={false}
                        name="otherTrade"
                        required={formRules.otherTrade.required}
                        value={model.otherTrade || ''}
                        disabled={!isOtherTradeChecked}
                        onChange={onChangeHandler}
                        error={!!errors.otherTrade}
                        inputProps={{
                          'data-testid': 'client-other-trade',
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                )}
              </div>
            )}
          </ControlledError>
        </div>
      </Card>
      <Card title="Universal Badge">
        <ControlledRadio
          row={true}
          radioItems={[
            { value: 0, label: 'No' },
            { value: 1, label: 'Yes' },
          ]}
          formControlProps={{
            name: 'hasUniversalBadge',
            label: '',
            value: Number(model.hasUniversalBadge),
            onChange: onBooleanChangeHandler,
          }}
        />
        {model.hasUniversalBadge && (
          <ControlledError
            show={!!errors.universalBadgePrice}
            error={getConditionalDefaultValue(
              errors.universalBadgePrice === 'is required',
              'Please enter a Universal Badge Price.',
              errors.universalBadgePrice
            )}
          >
            <ControlledInput label="Price">
              <TextField
                variant="outlined"
                data-testid="client-other-trade-wrapper"
                placeholder="$0"
                type="text"
                autoComplete="off"
                fullWidth={true}
                name="universalBadgePrice"
                required={formRules.universalBadgePrice.required}
                value={model.universalBadgePrice || ''}
                error={!!errors.universalBadgePrice}
                onChange={onChangeHandler}
                inputProps={{
                  'data-testid': 'project-universalBadgePrice',
                  mask: moneyMask,
                  showMask: true,
                  guide: false,
                  maxLength: 14,
                }}
                InputProps={{
                  inputComponent: ControlledMaskInput as any,
                }}
              />
            </ControlledInput>
          </ControlledError>
        )}
      </Card>
      <TaxpayerIdHelperModal show={showTaxpayerHint} onClose={togglesShowTaxpayerHint} />
    </>
  );
};

export default memo(GeneralInformation);
