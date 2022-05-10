import React, { memo, useCallback, useRef, useState } from 'react';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Popover, { IMenuItem } from '../../shared/Popover/Popover';
import ControlledButton from '../FormHandler/ControlledButton';

import { getConditionalDefaultValue, getDefaultValue } from '../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../assets/styles';

export interface IButtonMenuProps {
  text: string;
  showDivider?: boolean;
  showIconMargin?: boolean;
  stopPropagation?: boolean;
  styleClass?: string;
  disabled: boolean;
  optionList: IMenuItem[];
  buttonProps?: Object;
}

const ButtonMenu = ({ buttonProps, text, showDivider, showIconMargin, stopPropagation = false, styleClass, disabled, optionList }: IButtonMenuProps) => {
  const tableGlobalClasses = tableGlobalStyles();

  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef();

  const handleToggle = useCallback(
    event => {
      if (stopPropagation) event?.stopPropagation();
      setIsOpen(open => !open);
    },
    [stopPropagation]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Box className={`${tableGlobalClasses.filterStatusContainer} buttonMenuContainer`}>
      <div className={`${tableGlobalClasses.filterWrapper} buttonMenuWrapper`}>
        {showDivider && <Divider orientation="vertical" flexItem={true} className={tableGlobalClasses.dividerNoSpacing} />}
        <ControlledButton>
          <Button
            className={getDefaultValue(styleClass, '')}
            buttonRef={anchorRef}
            color="primary"
            variant="contained"
            onClick={handleToggle}
            disableRipple={true}
            aria-controls={isOpen && 'menu-list-grow'}
            aria-haspopup="true"
            data-testid="popover-button"
            disabled={disabled}
            {...buttonProps}
          >
            {getDefaultValue(text, '')}
          </Button>
        </ControlledButton>
        <span className={getConditionalDefaultValue(showIconMargin, tableGlobalClasses.dropdownIcon, '')}>
          <Popover isOpen={isOpen} buttonRef={anchorRef} onClose={handleClose} menuOptionList={optionList} placement={'bottom-end'} />
        </span>
      </div>
    </Box>
  );
};

export default memo(ButtonMenu);
