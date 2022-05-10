import React, { memo } from 'react';

import FrontView from '../FrontView';
import BackView from '../BackView';
import BadgeLayout from '../BadgeLayout';

import { BadgeModel } from '../../../../../../../models';

import { avatarGlobalStyles } from '../../../../../../../../assets/styles/Avatars/styles';
import { BadgeLayoutThreeStyles } from '../../../../BadgeTemplate/styles';

export interface ISmallHeaderLayout {
  badge: BadgeModel.IBadge;
  template: BadgeModel.IBadgeTemplate;
  barCode: string;
  qrCode: string;
  toggleClass: string;
  showLogo?: boolean;
  logo?: string;
}

const SmallHeaderLayout = ({ badge, barCode, qrCode, toggleClass, showLogo, template, logo }: ISmallHeaderLayout) => {
  const layoutThreeClasses = BadgeLayoutThreeStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  return (
    <>
      <FrontView
        showLogo={showLogo}
        toggleClass={toggleClass}
        avatarBorder={avatarGlobalClasses.avatarXLBorder}
        avatarPosition={layoutThreeClasses.avatarPosition}
        visitorMode={false}
        layoutClassSelector={layoutThreeClasses}
        badge={badge}
        logo={logo}
        template={template}
        render={props => <BadgeLayout {...props} />}
      />
      <BackView badge={badge} visitorMode={false} />
    </>
  );
};

export default memo(SmallHeaderLayout);
