import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';

import { useStyles } from '../MenuPopover/styles';

export interface IMenuItem {
  title: string;
  callback?: (e: React.MouseEvent<HTMLLIElement>) => void;
}
export interface IPopoverProps {
  menuOptionList: IMenuItem[];
  popoverText?: string;
  placement: PopperPlacementType;
  divider?: boolean;
  isOpen?: boolean;
  buttonRef?: any;
  styleClass?: string;
  onClose?: () => void;
}

const Popover = ({ menuOptionList, popoverText = '', placement, divider = false, styleClass = '', isOpen, onClose, buttonRef }: IPopoverProps) => {
  const classes = useStyles();

  return (
    <div className={isOpen ? classes.iconActive : classes.iconInactive} data-testid="popover-wrapper">
      <Popper
        style={{ zIndex: 999999 }}
        className={styleClass}
        open={isOpen}
        anchorEl={buttonRef?.current}
        role={undefined}
        placement={placement}
        transition={false}
        disablePortal={false}
      >
        <Paper>
          <ClickAwayListener onClickAway={onClose}>
            <MenuList autoFocusItem={isOpen} id="menu-list-grow">
              {menuOptionList.map((node, index) => (
                <div key={index}>
                  {divider && index === menuOptionList.length - 1 && <Divider className={classes.itemDivider} />}
                  <MenuItem
                    data-testid="popover-menu-button"
                    className={classes.buttonWrapper}
                    onClick={e => {
                      node.callback(e);
                      onClose();
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

export default memo(Popover);
