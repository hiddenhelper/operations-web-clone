import React, { useState, useRef, useCallback, memo } from 'react';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';

import ControlledButton from '../FormHandler/ControlledButton';

import { ExpandIcon } from '../../../../constants';
import { useStyles } from './styles';

export interface IMenuItem {
  title: string;
  callback?: () => void;
}
export interface IMenuPopoverProps {
  menuOptionList: IMenuItem[];
  popoverText?: string;
  placement: PopperPlacementType;
  divider?: boolean;
  styleClass?: string;
  disabled?: boolean;
}

const MenuPopover = ({ menuOptionList, popoverText = '', placement, disabled = false, divider = false, styleClass = '' }: IMenuPopoverProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className={isOpen ? classes.iconActive : classes.iconInactive} data-testid="popover-wrapper">
      <ControlledButton>
        <IconButton
          ref={anchorRef}
          color="primary"
          onClick={handleToggle}
          disabled={disabled}
          disableRipple={true}
          aria-controls={isOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          data-testid="popover-button"
        >
          <ExpandIcon />
        </IconButton>
      </ControlledButton>
      <Popper
        style={{ zIndex: 999999 }}
        className={styleClass}
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={placement}
        transition={false}
        disablePortal={false}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={isOpen} id="menu-list-grow">
              {menuOptionList.map((node, index) => (
                <div key={index}>
                  {divider && index === menuOptionList.length - 1 && <Divider className={classes.itemDivider} />}
                  <MenuItem
                    data-testid="popover-menu-button"
                    className={classes.buttonWrapper}
                    onClick={() => {
                      node.callback();
                      handleClose();
                    }}
                    disableRipple={true}
                  >
                    {node.title}
                  </MenuItem>
                </div>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
      {popoverText}
    </div>
  );
};

export default memo(MenuPopover);
