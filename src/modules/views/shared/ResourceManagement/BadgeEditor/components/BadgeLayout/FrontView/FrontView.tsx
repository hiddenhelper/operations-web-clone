import React, { memo, useMemo } from 'react';

import { badgeEditorColorMap } from '../../../../../../../../constants';
import { BadgeModel } from '../../../../../../../models';
export interface IFrontView {
  badge: BadgeModel.IBadge;
  template: BadgeModel.IBadgeTemplate;
  layoutClassSelector?: object | string;
  visitorMode: boolean;
  nameWithBackground?: string;
  nameColor?: string;
  badgeSize?: string;
  barcodePosition?: string;
  avatarPosition?: string;
  avatarBorder?: string;
  toggleClass: string;
  showLogo?: boolean;
  currentFontColor?: string;
  logo?: string;
  render?: (data: any) => React.ReactNode;
}

const FrontView = ({
  render,
  badge,
  template,
  layoutClassSelector = '',
  visitorMode,
  nameWithBackground = '',
  nameColor = '',
  badgeSize = '',
  barcodePosition = '',
  avatarPosition = '',
  avatarBorder = '',
  toggleClass,
  showLogo = false,
  currentFontColor,
  logo,
}: IFrontView) => {
  const currentBgColor = useMemo(() => (template.color ? template.color : badgeEditorColorMap.setOne.backgroundColor), [template.color]);
  const currentFont = useMemo(() => (template.font ? template.font : ''), [template.font]);

  return (
    <>
      {render({
        badge,
        template,
        layoutClassSelector,
        currentBgColor,
        currentFont,
        visitorMode,
        nameWithBackground,
        nameColor,
        badgeSize,
        barcodePosition,
        avatarPosition,
        avatarBorder,
        toggleClass,
        showLogo,
        currentFontColor,
        logo,
      })}
    </>
  );
};

export default memo(FrontView);
