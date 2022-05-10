import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import ControlledSelect from '../FormHandler/ControlledSelect';
import ControlledInput from '../FormHandler/ControlledInput';
import ControlledMaskInput from '../FormHandler/ControlledMaskInput';
import DeleteEntityButton from '../DeleteEntityButton';

import { GeneralModel, InvoiceModel } from '../../../models';
import { moneyMask, noop } from '../../../../utils/generalUtils';
import { useDebounce } from '../../../../utils/useDebounce';
import { useStyles } from './styles';

export interface IInvoiceServiceRowProps {
  serviceRow: InvoiceModel.IInvoiceService;
  serviceList: GeneralModel.INamedEntity[];
  index: number;
  onChange: (model: any) => void;
  onDelete: (index: number) => void;
}

const InvoiceServiceRow = ({ serviceRow, serviceList, index, onChange, onDelete }: IInvoiceServiceRowProps) => {
  const classes = useStyles();
  const [amount, setAmount] = useState(serviceRow.amount);
  const serviceOptionList = useMemo(() => serviceList.map(currentService => ({ value: currentService.id, label: currentService.name })), [serviceList]);
  const debouncedAmount = useDebounce(amount, 400);

  const onServiceChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(
        /* istanbul ignore next */ prevState => {
          const newServices = prevState.items;
          newServices[index] = { ...newServices[index], [event.target.name]: event.target.value };
          return {
            ...prevState,
            items: newServices,
          };
        }
      );
    },
    [index, onChange]
  );

  const onServiceTypeChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onServiceChangeHandler({
        persist: noop,
        target: {
          name: 'service',
          value: serviceList.find(currentService => currentService.id === event.target.value),
        },
      });
    },
    [serviceList, onServiceChangeHandler]
  );

  const onChangeAmount = useCallback(
    event => {
      event.persist();
      setAmount(event.target.value);
    },
    [setAmount]
  );

  const onDeleteHandler = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  useEffect(() => {
    if (debouncedAmount) {
      onServiceChangeHandler({
        persist: noop,
        target: {
          name: 'amount',
          value: debouncedAmount,
        },
      });
    }
  }, [debouncedAmount, onServiceChangeHandler]);
  return (
    <TableRow>
      <TableCell className={classes.serviceNameCell}>
        <ControlledSelect
          name="service"
          onChange={onServiceTypeChangeHandler}
          dataTestId="invoice-service-select"
          includeNone={true}
          value={serviceRow.service?.id || ''}
          options={serviceOptionList}
        />
      </TableCell>
      <TableCell className={classes.serviceNameCell}>
        <ControlledInput label="">
          <TextField
            autoComplete="off"
            variant="outlined"
            placeholder="Detail"
            type="text"
            fullWidth={true}
            name="detail"
            value={serviceRow.detail || ''}
            onChange={onServiceChangeHandler}
            error={false}
            required={false}
            inputProps={{
              'data-testid': 'service-detail',
              maxLength: 254,
            }}
          />
        </ControlledInput>
      </TableCell>
      <TableCell className={classes.serviceNameCell}>
        <div className={classes.deleteCell}>
          <ControlledInput label="" styleClass={classes.serviceAmount}>
            <TextField
              variant="outlined"
              placeholder="$ 0"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="amount"
              required={false}
              value={amount || ''}
              onChange={onChangeAmount}
              error={false}
              inputProps={{
                'data-testid': 'service-amount',
                mask: moneyMask,
                showMask: true,
                guide: false,
              }}
              InputProps={{
                inputComponent: ControlledMaskInput as any,
              }}
            />
          </ControlledInput>
          <DeleteEntityButton styleContainerClass={classes.deleteRowContainer} styleClass={classes.deleteRow} onClick={onDeleteHandler} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default memo(InvoiceServiceRow);
