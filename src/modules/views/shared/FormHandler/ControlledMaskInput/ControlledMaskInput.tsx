import React, { memo } from 'react';
import MaskedInput from 'react-text-mask';

export interface IMaskInputProps {
  inputRef: (ref: any) => void;
  mask: any;
  placeholderChar: string;
  showMask: boolean;
}

const ControlledMaskInput = ({ inputRef, ...props }: IMaskInputProps) => {
  return (
    <MaskedInput
      {...props}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
};

export default memo(ControlledMaskInput);
