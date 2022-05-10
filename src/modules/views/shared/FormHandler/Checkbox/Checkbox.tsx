import React, { memo } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { useStyles } from './styles';

export interface ICheckboxProps {
  name: string;
  value: string | boolean;
  isChecked: boolean;
  inputProps?: any;
  disabled?: boolean;
  error?: boolean;
  onChange: (data: any) => void;
  testId?: string;
}

const ControlledCheckbox = ({ name, value, isChecked, onChange, inputProps = {}, error = false, disabled = false, testId }: ICheckboxProps) => {
  const styles = useStyles();
  return (
    <Checkbox
      icon={<CheckBoxOutlineBlankIcon classes={{ root: `${styles.iconRoot} ${error ? styles.iconRootError : ''}` }} />}
      checkedIcon={<CheckBoxIcon />}
      checked={isChecked}
      onChange={onChange}
      name={name}
      value={value}
      data-testid={testId ?? 'multiple-checkbox'}
      inputProps={{ ...inputProps }}
      disabled={disabled}
    />
  );
};

export default memo(ControlledCheckbox);
