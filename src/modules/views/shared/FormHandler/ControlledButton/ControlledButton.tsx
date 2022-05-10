import React, { memo, useCallback } from 'react';
import { disableFocus, enableFocusOnTab } from '../../../../../utils/generalUtils';

export interface IControlledInput {
  children: React.ReactNode;
  styleClass?: any;
}

const ControlledButton = ({ children, styleClass = '' }: IControlledInput) => {
  const disableFocusHandler = useCallback(() => disableFocus(), []);
  const enableFocusHandler = useCallback(event => enableFocusOnTab(event), []);

  return (
    <span data-testid="controlled-button" tabIndex={-1} className={styleClass} onMouseDown={disableFocusHandler} onKeyDown={enableFocusHandler}>
      {children}
    </span>
  );
};

export default memo(ControlledButton);
