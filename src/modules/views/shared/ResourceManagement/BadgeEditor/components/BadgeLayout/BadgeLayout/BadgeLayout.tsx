import React, { memo, useMemo } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';

import { BadgeModel } from '../../../../../../../models';
import { BarcodeIcon } from '../../../../../../../../constants';
import { getConditionalDefaultValue, getDefaultValue, formatBadgeCode } from '../../../../../../../../utils/generalUtils';
import { useStyles, BadgeLayoutStyles } from '../../../../BadgeTemplate/styles';
import { avatarGlobalStyles } from '../../../../../../../../assets/styles/Avatars/styles';

export interface IBadgeLayout {
  layoutClassSelector: any;
  nameWithBackground?: string;
  nameColor?: string;
  avatarPosition?: string;
  avatarBorder?: string;
  toggleClass: string;
  showLogo?: boolean;
  currentBgColor: string;
  currentFont: string;
  currentFontColor: string;
  logo?: string;
  badge: BadgeModel.IBadge;
}

const BadgeLayout = ({
  currentBgColor,
  currentFont,
  currentFontColor,
  layoutClassSelector,
  nameWithBackground = '',
  nameColor = '',
  avatarPosition = '',
  avatarBorder = '',
  toggleClass,
  showLogo = false,
  logo,
  badge,
}: IBadgeLayout) => {
  const classes = useStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const generalLayoutClasses = BadgeLayoutStyles();
  const logoToShow = useMemo(() => logo || badge?.badgeTemplate?.logoUrl, [logo, badge]);

  return (
    <>
      <div
        style={{ backgroundColor: `#${currentBgColor}` }}
        className={`frontView ${layoutClassSelector.dataContainerSecondaryBg} ${classes.dataContainerOverlap} ${generalLayoutClasses.badgeGeneralRadius} ${toggleClass}`}
      >
        <div className={`${layoutClassSelector.container} ${classes.dataContainer} ${generalLayoutClasses.badgeInfoRadius}`}>
          {showLogo && !logoToShow && (
            <div className={`${layoutClassSelector.imageWrapper} ${generalLayoutClasses.placeholderWrapper} ${layoutClassSelector.placeholderColor}`}>
              Badge Logo
            </div>
          )}
          {showLogo && logoToShow && <img className={layoutClassSelector.imageWrapper} srcSet={`${logoToShow} 1x, ${logoToShow} 2x`} alt="Badge Logo" />}
          <div className={avatarPosition}>
            <Badge
              className={`${classes.badgePosition} ${avatarGlobalClasses.badgeMedium}`}
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Avatar className={` ${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.badgeMedium} ${avatarBorder}`}>
                {getConditionalDefaultValue(
                  badge?.pictureUrl,
                  <img alt="" style={{ width: '100%' }} src={badge?.pictureUrl} />,
                  <PersonIcon titleAccess={''} />
                )}
              </Avatar>
            </Badge>
          </div>
          <div
            style={{ backgroundColor: `#${nameColor}` }}
            className={`${nameWithBackground} ${layoutClassSelector.badgeTextPosition} ${classes.badgeTextWrapper}`}
          >
            <Typography style={{ fontFamily: currentFont, color: `#${currentFontColor}` }} className={generalLayoutClasses.badgeLayoutTitle}>
              {getDefaultValue(badge?.firstName, 'Worker')} {getDefaultValue(badge?.lastName, 'Name')}
            </Typography>
            <Typography style={{ fontFamily: currentFont, color: `#${currentFontColor}` }} className={generalLayoutClasses.badgeLayoutSubtitle}>
              {getDefaultValue(badge?.companyName, 'Company Name')}
            </Typography>
          </div>
          <div className={`${layoutClassSelector.subDataContainer} ${classes.badgeTextWrapper}`}>
            <Typography style={{ fontFamily: currentFont }} className={`${generalLayoutClasses.badgeLayoutSubtitle} ${generalLayoutClasses.badgeCode}`}>
              {getConditionalDefaultValue(!!badge?.code, formatBadgeCode(getDefaultValue(badge?.code, '')), 'XX 00 XX')}
            </Typography>
          </div>
          <div className={`${classes.barcodePosition}`}>
            <BarcodeIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BadgeLayout);
