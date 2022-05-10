import React, { memo } from 'react';

import { BadgeModel } from '../../../../../../../models';

import { avatarGlobalStyles } from '../../../../../../../../assets/styles/Avatars/styles';
import { useStyles, BadgeLayoutOneStyles } from '../../../../BadgeTemplate/styles';

import FrontView from '../FrontView';
import BackView from '../BackView';
import BadgeLayout from '../BadgeLayout';

export interface ILargeHeaderLayout {
  template: BadgeModel.IBadgeTemplate;
  badge?: BadgeModel.IBadge;
  barCode: string;
  qrCode: string;
  toggleClass: string;
  showLogo?: boolean;
  logo?: string;
}

const LargeHeaderLayout = ({ badge, barCode, qrCode, toggleClass, showLogo, template, logo }: ILargeHeaderLayout) => {
  const classes = useStyles();
  const layoutOneClasses = BadgeLayoutOneStyles();
  const avatarGlobalClasses = avatarGlobalStyles();

  return (
    <>
      <FrontView
        showLogo={showLogo}
        toggleClass={toggleClass}
        avatarBorder={avatarGlobalClasses.avatarXLBorder}
        avatarPosition={classes.avatarPosition}
        visitorMode={false}
        layoutClassSelector={layoutOneClasses}
        badge={badge}
        logo={logo}
        template={template}
        render={props => <BadgeLayout {...props} />}
      />
      <BackView badge={badge} visitorMode={false} />
    </>
  );
};

export default memo(LargeHeaderLayout);
