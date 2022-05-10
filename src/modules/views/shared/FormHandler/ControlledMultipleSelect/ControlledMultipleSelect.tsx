import React, { memo, useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ControlledCheckbox from '../Checkbox';
import { useStyles } from './styles';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';

export interface IControlledMultipleSelectProps {
  name: string;
  items: { id: string; name: string }[];
  value: { id: string; name: string }[];
  styleClasses?: any;
  verticalRows?: boolean;
  onChange: (data: any) => void;
  error?: boolean;
}

const ControlledMultipleSelect = ({ items, name, value, styleClasses = {}, verticalRows = false, onChange, error = false }: IControlledMultipleSelectProps) => {
  const styles = useStyles();
  const onChangeHandler = useCallback(
    event => {
      let optList = [...value];
      const item = items.find(v => v.id === event.target.value);
      if (!!value.find(v => v.id === item.id)) {
        optList = [...optList.filter(optItem => optItem.id !== item.id)];
      } else {
        optList = [...optList, item];
      }
      onChange(/* istanbul ignore next */ prevState => ({ ...prevState, [name]: optList }));
    },
    [name, value, items, onChange]
  );
  return (
    <div>
      <FormControl component="fieldset" classes={{ root: styleClasses.formControlRoot ?? styles.formControlRoot }}>
        <FormGroup
          className={getConditionalDefaultValue(verticalRows, styles.verticalRows, '')}
          classes={{ root: styleClasses.formGroupRoot ?? styles.formGroupRoot }}
        >
          {items.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <ControlledCheckbox isChecked={!!value?.find(v => v.id === item.id)} name={name} value={item.id} onChange={onChangeHandler} error={error} />
              }
              label={item.name}
              classes={{ label: styles.selectLabel }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default memo(ControlledMultipleSelect);
