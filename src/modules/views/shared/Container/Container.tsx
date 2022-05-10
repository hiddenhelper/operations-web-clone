import React, { forwardRef, ReactNode } from 'react';

import styles from './style';

export interface IContainer {
  children: ReactNode;
  className?: string;
  id?: string;
  styles?: {};
}

function Container({ children, styles: customStyles = {}, ...rest }: IContainer, ref: any) {
  return (
    <div ref={ref} style={{ ...styles, ...customStyles }} {...rest}>
      {children}
    </div>
  );
}

export default forwardRef<HTMLElement, IContainer>(Container);
