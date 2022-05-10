import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, Grid, TextField } from '@material-ui/core';

import Card from '../../../shared/ResourceManagement/Card';
import ControlledError from '../../../shared/FormHandler/ControlledError';
import ControlledInput from '../../../shared/FormHandler/ControlledInput';
import ControlledSelect from '../../../shared/FormHandler/ControlledSelect';
import ControlledMultipleSelect from '../../../shared/FormHandler/ControlledMultipleSelect';

import { GeneralModel, WorkerModel } from '../../../../models';
import { IFormRules } from '../../../../../utils/useValidator';
import { inputGlobalStyles } from 'assets/styles';
import { useStyles } from '../styles';

export interface IWorkerTradesProps {
  model: WorkerModel.IWorker;
  errors: any;
  formRules: IFormRules;
  tradeList: WorkerModel.ISkilledTrade[];
  onChange: (model: any) => void;
  onChangeHandler: (model: any) => void;
  onBooleanChangeHandler: (model: any) => void;
  updateRules: (s: IFormRules | ((p: IFormRules) => IFormRules)) => void;
}

const WorkerTrades = ({ model, errors, formRules, tradeList, onChange, onChangeHandler, onBooleanChangeHandler, updateRules }: IWorkerTradesProps) => {
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const isAffiliatedToLaborUnion = useMemo(() => (model.isAffiliatedToLaborUnion === null ? '' : Number(model.isAffiliatedToLaborUnion)), [
    model.isAffiliatedToLaborUnion,
  ]);
  const isSupervisor = useMemo(() => (model.isSupervisor === null ? '' : Number(model.isSupervisor)), [model.isSupervisor]);
  const isSkilled = useMemo(() => (model.isSkilled === null ? '' : Number(model.isSkilled)), [model.isSkilled]);

  const tradeIds = useMemo(() => model.trades.map(trade => trade.id), [model.trades]);
  const otherTradeItemId = useMemo(() => tradeList?.find(item => item.name === 'Other')?.id, [tradeList]);
  const [showOtherTradeInput, setShowOtherTradeInput] = useState<boolean>(false);
  useEffect(() => {
    if (tradeIds.includes(otherTradeItemId)) {
      if (!showOtherTradeInput) {
        setShowOtherTradeInput(true);
        updateRules(prevRules => ({ ...prevRules, otherTrade: { ...prevRules.otherTrade, required: true } }));
      }
    } else {
      if (showOtherTradeInput) {
        updateRules(prevRules => ({ ...prevRules, otherTrade: { ...prevRules.otherTrade, required: false } }));
        onChangeHandler({ target: { name: 'otherTrade', value: null } });
        setShowOtherTradeInput(false);
      }
    }
  }, [onChangeHandler, otherTradeItemId, showOtherTradeInput, tradeIds, updateRules]);

  const onChangeUnionNumber = useCallback(
    event => {
      event.persist();
      onChangeHandler({ target: { name: 'laborUnionNumber', value: event.target.value.replace(/\D/, '') } });
    },
    [onChangeHandler]
  );

  return (
    <Card title="Worker Trades">
      <Grid container={true} className={classes.workerFormContainer}>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.isSupervisor} error={errors.isSupervisor} styleClass={classes.errorPosition}>
              <ControlledInput label="Role (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="isSupervisor"
                  includeNone={true}
                  value={isSupervisor}
                  options={WorkerModel.isSupervisorOptionList}
                  onChange={onBooleanChangeHandler}
                  error={!!errors.isSupervisor}
                  disabled={false}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.isSkilled} error={errors.isSkilled} styleClass={classes.errorPosition}>
              <ControlledInput label="Work Experience (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledSelect
                  name="isSkilled"
                  includeNone={true}
                  value={isSkilled}
                  options={WorkerModel.isSkilledOptionList}
                  onChange={onBooleanChangeHandler}
                  error={!!errors.isSkilled}
                  disabled={false}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledInput label="Labor Union (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
              <ControlledSelect
                name="isAffiliatedToLaborUnion"
                includeNone={true}
                value={isAffiliatedToLaborUnion}
                options={GeneralModel.booleanOptionList}
                onChange={onBooleanChangeHandler}
                inputProps={{
                  'data-testid': 'worker-isAffiliatedToLaborUnion',
                }}
              />
            </ControlledInput>
          </div>
        </Grid>
        <Grid item={true} xl={6} lg={6}>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.laborUnionNumber} error={errors.laborUnionNumber} styleClass={classes.errorPosition}>
              <ControlledInput label="Labor Union Number (Optional)" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <TextField
                  variant="outlined"
                  data-testid="worker-laborUnionNumber-wrapper"
                  placeholder="Labor Union"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="laborUnionNumber"
                  required={formRules.laborUnionNumber?.required}
                  value={model.laborUnionNumber || ''}
                  onChange={onChangeUnionNumber}
                  error={!!errors.laborUnionNumber}
                  disabled={!isAffiliatedToLaborUnion}
                  inputProps={{
                    'data-testid': 'worker-laborUnionNumber',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
        </Grid>
        <Grid item={true} xl={4} lg={4} />
        <Divider className={classes.divider} />
        <Grid item={true} xl={12} lg={12}>
          <div className={classes.workerTrades}>
            <ControlledError show={!!errors.tradesIds} error={errors.tradesIds} styleClass={classes.errorPosition}>
              <ControlledInput label="" styleClass={`${inputGlobalClasses.inputPaddingBottom}`}>
                <ControlledMultipleSelect items={tradeList} name="trades" value={model.trades} onChange={onChange} error={!!errors.tradesIds} />
              </ControlledInput>
            </ControlledError>
            <div className={classes.otherTradeWrapper}>
              {showOtherTradeInput && (
                <ControlledError show={!!errors.otherTrade} error={errors.otherTrade === 'is required' ? 'Please enter Other Trade.' : errors.otherTrade}>
                  <ControlledInput label="Other Trade">
                    <TextField
                      variant="outlined"
                      data-testid="worker-other-trade-wrapper"
                      placeholder="Custom Trade Name"
                      type="text"
                      autoComplete="off"
                      fullWidth={false}
                      name="otherTrade"
                      required={formRules.otherTrade?.required}
                      value={model.otherTrade || ''}
                      onChange={onChangeHandler}
                      error={!!errors.otherTrade}
                      inputProps={{ 'data-testid': 'worker-other-trade' }}
                    />
                  </ControlledInput>
                </ControlledError>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default memo(WorkerTrades);
