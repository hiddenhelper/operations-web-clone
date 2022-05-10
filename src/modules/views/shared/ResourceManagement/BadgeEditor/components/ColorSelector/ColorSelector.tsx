import React, { memo, useCallback } from 'react';

import Radio from '@material-ui/core/Radio';

import ControlledButton from '../../../../FormHandler/ControlledButton';

import { wrapperStyles, colorSelectorStyles, colorSelectorRadio } from '../../style';
import { badgeEditorColorMap } from '../../../../../../../constants';

export interface IColorSelector {
  value: string;
  onChange: (data: any) => void;
}

const ColorSelector = ({ value, onChange }: IColorSelector) => {
  const wrapperClasses = wrapperStyles();
  const colorSelectorClasses = colorSelectorStyles();
  const colorSelectorRadios = colorSelectorRadio();

  const onClick = useCallback(
    event => {
      event.persist();
      onChange({ color: event.target.getAttribute('color'), fontColor: event.target.getAttribute('fontcolor') });
    },
    [onChange]
  );

  return (
    <div
      role="radiogroup"
      arial-labelledby="group-label-colors"
      className={`${wrapperClasses.container} ${wrapperClasses.formRow} ${colorSelectorClasses.container}`}
    >
      {Object.values(badgeEditorColorMap).map((color, index) => (
        <ControlledButton key={index} styleClass={colorSelectorRadios.focus}>
          <Radio
            className={`${colorSelectorRadios.root}`}
            checkedIcon={
              <span style={{ backgroundColor: `#${color.backgroundColor}` }} className={`${colorSelectorRadios.icon}, ${colorSelectorRadios.checkedIcon}`} />
            }
            disableRipple={false}
            style={{ backgroundColor: `#${color.backgroundColor}`, color: `#${color.backgroundColor}` }}
            key={color.backgroundColor}
            value={color.backgroundColor}
            name="color"
            onChange={onClick}
            checked={value === color.backgroundColor}
            inputProps={
              {
                'data-testid': 'color-item',
                color: color.backgroundColor,
                fontcolor: color.fontColor,
              } as any
            }
          />
        </ControlledButton>
      ))}
    </div>
  );
};

export default memo(ColorSelector);
