import React, { memo, useState, useCallback } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import ButtonFilter from '../ButtonFilter';
import { getDefaultValue } from '../../../../utils/generalUtils';

export interface ISelectFilterProps {
  optionList: { value: any; label: string }[];
  value: any;
  menuStyleClass?: string;
  onChange: (period: number) => void;
}

const SelectFilter = ({ optionList, menuStyleClass, value, onChange }: ISelectFilterProps) => {
  const [filter, setFilter] = useState(value);
  const onSelect = useCallback(
    option => {
      setFilter(option.label);
      onChange(option.value);
    },
    [onChange]
  );
  return (
    <ButtonFilter
      text={filter}
      transparentButton={true}
      render={({ isOpen, handleClose }) =>
        isOpen && (
          <ClickAwayListener disableReactTree={true} onClickAway={handleClose}>
            <MenuList className={getDefaultValue(menuStyleClass, '')} data-testid="select-filter-list" id="select-filter-list">
              {optionList.map((option, index) => (
                <MenuItem
                  disableRipple={true}
                  data-testid="select-filter-option"
                  onClick={event => {
                    onSelect(option);
                    handleClose();
                  }}
                  key={index}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        )
      }
    />
  );
};

export default memo(SelectFilter);
