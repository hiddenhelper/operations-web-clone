import React, { memo, useEffect } from 'react';

import ButtonLoader from '../ButtonLoader';

export interface IButtonPrinterProps {
  isLoading: boolean;
  disabled?: boolean;
  styleClasses?: string;
  onPrint: () => void;
  destroyPrinter: () => void;
}

const ButtonPrinter = ({ isLoading, disabled = false, styleClasses = '', onPrint, destroyPrinter }: IButtonPrinterProps) => {
  useEffect(() => {
    return function unMount() {
      destroyPrinter();
    };
  }, [destroyPrinter]);
  return (
    <ButtonLoader
      disabled={disabled}
      isLoading={isLoading}
      className={styleClasses}
      fullWidth={true}
      data-testid="print-btn"
      color="primary"
      variant="contained"
      size="large"
      type="submit"
      text="Print"
      loadingText="Printing..."
      onClick={onPrint}
    />
  );
};

export default memo(ButtonPrinter);
