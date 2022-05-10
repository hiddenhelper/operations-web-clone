import React, { memo } from 'react';

import Button from '@material-ui/core/Button';
import { STYLE } from '../../../../constants';
import { useStyles } from './styles';
import LoadingIndicator from 'react-loading-indicator';

export interface IButtonLoaderProps {
  text: string;
  loadingText?: string;
  isLoading?: boolean;
  disabled?: boolean;
  [props: string]: any;
}

const ButtonLoader = ({ text, loadingText, isLoading = false, disabled = false, ...props }: IButtonLoaderProps) => {
  const classes = useStyles();

  return (
    <Button {...props} disabled={isLoading || disabled} className={`${isLoading && classes.loading} ${props.className}`}>
      {isLoading && (
        <span className={classes.spinnerWrapper} data-testid="button-spinner">
          <LoadingIndicator segmentWidth={STYLE.SPINNER.SEGMENT_WIDTH} segmentHeight={STYLE.SPINNER.SEGMENT_HEIGHT} />
        </span>
      )}
      <span className={classes.textWrapper}>{isLoading ? loadingText : text}</span>
    </Button>
  );
};

export default memo(ButtonLoader);
