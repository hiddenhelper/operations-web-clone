import React, { memo, useMemo } from 'react';

import BackView from '../BackView';
import FrontView from '../FrontView';
import BadgeLayout from '../BadgeLayout';

import { BadgeModel } from '../../../../../../../models';

import { avatarGlobalStyles } from '../../../../../../../../assets/styles/Avatars/styles';
import { BadgeLayoutTwoStyles } from '../../../../BadgeTemplate/styles';
import { badgeEditorColorMap } from '../../../../../../../../constants';

export interface IWhiteHeaderLayout {
  badge: BadgeModel.IBadge;
  template: BadgeModel.IBadgeTemplate;
  barCode: string;
  qrCode: string;
  toggleClass: string;
  showLogo?: boolean;
  logo?: string;
}

const WhiteHeaderLayout = ({ badge, barCode, qrCode, toggleClass, showLogo, template, logo }: IWhiteHeaderLayout) => {
  const layoutTwoClasses = BadgeLayoutTwoStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const currentFontColor = useMemo(() => (template.fontColor ? template.fontColor : badgeEditorColorMap.setSeven.fontColor), [template.fontColor]);
  return (
    <>
      <FrontView
        showLogo={showLogo}
        toggleClass={toggleClass}
        currentFontColor={currentFontColor}
        avatarBorder={avatarGlobalClasses.avatarXLBorder}
        avatarPosition={layoutTwoClasses.avatarPosition}
        nameColor={template.color}
        nameWithBackground={layoutTwoClasses.nameBackground}
        visitorMode={false}
        layoutClassSelector={layoutTwoClasses}
        badge={badge}
        logo={logo}
        template={template}
        render={props => <BadgeLayout {...props} />}
      />
      <BackView badge={badge} visitorMode={false} />
    </>
  );
};

export default memo(WhiteHeaderLayout);
