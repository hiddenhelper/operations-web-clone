import React, { memo, useCallback, useRef, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ControlledButton from '../FormHandler/ControlledButton';

import { ExpandIcon } from '../../../../constants';
import { getConditionalDefaultValue, getDefaultValue } from '../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../assets/styles';

export interface IButtonFilterProps {
  text: string;
  disabled?: boolean;
  showDivider?: boolean;
  transparentButton?: boolean;
  showIconMargin?: boolean;
  styleClass?: string;
  containerStyleClass?: string;
  buttonProps?: Object;
  render: (data?: any, other?: any) => React.ReactNode;
}

const ButtonFilter = ({
  buttonProps,
  text,
  showDivider,
  transparentButton = false,
  styleClass,
  containerStyleClass,
  disabled = false,
  render,
}: IButtonFilterProps) => {
  const tableGlobalClasses = tableGlobalStyles();

  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef();

  const handleToggle = useCallback(() => {
    setIsOpen(open => !open);
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div
      className={`${tableGlobalClasses.floatingFilterWrapper} ${tableGlobalClasses.filterWrapper} ${getDefaultValue(
        containerStyleClass,
        ''
      )} floatingFilterWrapper`}
    >
      {showDivider && <Divider orientation="vertical" flexItem={true} className={tableGlobalClasses.dividerNoSpacing} />}
      <ControlledButton styleClass={tableGlobalClasses.floatingFilterButton}>
        <Button
          className={getDefaultValue(styleClass, tableGlobalClasses.buttonFilter)}
          variant={getConditionalDefaultValue(transparentButton, 'text', 'contained')}
          onClick={handleToggle}
          disableRipple={true}
          aria-controls={isOpen && 'menu-list-grow'}
          aria-haspopup="true"
          disabled={disabled}
          endIcon={<ExpandIcon className={tableGlobalClasses.dropdownIcon} />}
          data-testid="button-filter-open"
          {...buttonProps}
        >
          {getDefaultValue(text, '')}
        </Button>
      </ControlledButton>
      {render({ isOpen, anchorRef, handleClose })}
    </div>
  );
};

export default memo(ButtonFilter);
