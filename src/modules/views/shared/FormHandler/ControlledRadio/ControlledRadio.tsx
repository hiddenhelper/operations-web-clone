import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from './styles';

type RadioItem = {
  value: number | string;
  label: string;
};

export interface IControlledRadioProps {
  radioItems: RadioItem[];
  row?: boolean;
  styleClass?: any;
  containerStyleClass?: any;
  disabled?: boolean;
  formControlProps: {
    name: string;
    label: string;
    value: number | string;
    onChange: (data: any) => void;
  };
}

const ControlledRadio = ({ radioItems, row = false, styleClass, disabled = false, containerStyleClass, formControlProps }: IControlledRadioProps) => {
  const classes = useStyles();
  const labelId = `radio-label-${formControlProps.name}`;

  return (
    <div className={`${getDefaultValue(containerStyleClass, '')} ${classes.controlledRadioContainer} controlledRadioContainer`} data-testid="controlled-radio">
      <FormControl component="fieldset" className={styleClass}>
        <FormLabel component="legend" id={labelId} className={classes.controlledRadioLabel}>
          {formControlProps.label}
        </FormLabel>
        <RadioGroup
          aria-labelledby={labelId}
          name={formControlProps.name}
          value={formControlProps.value}
          onChange={formControlProps.onChange}
          row={row}
          data-testid="controlled-radio-group"
        >
          {radioItems.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.value}
              control={
                <Radio
                  className={classes.root}
                  disableRipple={true}
                  color="default"
                  checkedIcon={<span className={`${classes.icon} ${classes.checkedIcon} ${disabled ? classes.disabledIcon : ''}`} />}
                  icon={<span className={`${classes.icon} ${formControlProps.value === item.value ? classes.activeIcon : classes.unactiveIcon}`} />}
                  inputProps={{ 'data-testid': 'controlled-radio-button' } as any}
                  disabled={disabled}
                />
              }
              label={item.label}
              disabled={disabled}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ControlledRadio;
