import React, { memo, useMemo } from 'react';

import Typography from '@material-ui/core/Typography';

import FrontView from '../FrontView';
import BackView from '../BackView';

import { BadgeModel } from '../../../../../../../models';
import { BarcodeIcon, badgeEditorColorMap } from '../../../../../../../../constants';
import { useStyles, BadgeLayoutStyles, VisitorLayoutStyles } from '../../../../BadgeTemplate/styles';
import { formatBadgeCode, getVisitorBadgeText, getConditionalDefaultValue, getDefaultValue } from '../../../../../../../../utils/generalUtils';

export interface IVisitorLayoutProps {
  badge: BadgeModel.IBadge;
  template: BadgeModel.IBadgeTemplate;
  barCode: string;
  qrCode: string;
  toggleClass: string;
  visitorMode: boolean;
  logo?: string;
  showLogo?: boolean;
  badgeNumber?: number;
}

const VisitorLayout = ({ badge, barCode, qrCode, toggleClass, visitorMode, template, logo, showLogo = false, badgeNumber }: IVisitorLayoutProps) => {
  const classes = useStyles();
  const generalLayoutClasses = BadgeLayoutStyles();
  const visitorLayoutClasses = VisitorLayoutStyles();
  const currentBgColor = useMemo(() => (template.color ? template.color : badgeEditorColorMap.setOne.backgroundColor), [template.color]);
  const currentFontColor = useMemo(() => (template.fontColor ? template.fontColor : badgeEditorColorMap.setSeven.fontColor), [template.fontColor]);
  const currentFont = useMemo(() => (template.font ? template.font : ''), [template.font]);
  const logoToShow = useMemo(() => logo || template.logoUrl, [logo, template]);
  return (
    <>
      <FrontView
        toggleClass={toggleClass}
        visitorMode={visitorMode}
        badge={badge}
        template={template}
        render={() => (
          <div
            className={`frontView ${visitorLayoutClasses.dataContainerSecondaryBg} ${classes.dataContainerOverlap} ${generalLayoutClasses.badgeGeneralRadius} ${toggleClass}`}
          >
            <div className={`${visitorLayoutClasses.container} ${classes.dataContainer} ${generalLayoutClasses.badgeInfoRadius}`}>
              {showLogo && !logoToShow && (
                <div className={`${visitorLayoutClasses.imageWrapper} ${visitorLayoutClasses.placeholderColor} ${generalLayoutClasses.placeholderWrapper}`}>
                  Badge Logo
                </div>
              )}
              {showLogo && logoToShow && <img className={visitorLayoutClasses.imageWrapper} srcSet={`${logoToShow} 1x, ${logoToShow} 2x`} alt="Badge Logo" />}
              <div
                style={{ backgroundColor: `#${currentBgColor}` }}
                className={`${visitorLayoutClasses.badgeTextPosition} ${classes.badgeTextWrapper} ${visitorLayoutClasses.nameBackground}`}
              >
                <Typography style={{ fontFamily: currentFont, color: `#${currentFontColor}` }} className={visitorLayoutClasses.visitorTitle}>
                  {getVisitorBadgeText(getDefaultValue(badgeNumber, '001'))}
                </Typography>
              </div>
              <div className={`${visitorLayoutClasses.subDataContainer} ${classes.badgeTextWrapper}`}>
                <Typography style={{ fontFamily: currentFont }} className={`${generalLayoutClasses.badgeLayoutSubtitle} ${generalLayoutClasses.badgeCode}`}>
                  {getConditionalDefaultValue(!!badge?.code, formatBadgeCode(getDefaultValue(badge?.code, '')), 'XX 00 XX')}
                </Typography>
              </div>
              <div className={classes.barcodePosition}>
                <BarcodeIcon />
              </div>
            </div>
          </div>
        )}
      />
      <BackView badge={badge} visitorMode={true} />
    </>
  );
};

export default memo(VisitorLayout);
