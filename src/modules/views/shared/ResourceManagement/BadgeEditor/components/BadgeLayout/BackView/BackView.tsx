import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';

import Logo from '../../../../../Logo';

import { BadgeModel } from '../../../../../../../models';
import { getDefaultValue, getConditionalDefaultValue, formatPhoneNumber } from '../../../../../../../../utils/generalUtils';
import { useStyles, BadgeLayoutStyles, BadgeLayoutOneStyles, VisitorLayoutStyles } from '../../../../BadgeTemplate/styles';

export interface IBackView {
  badge: BadgeModel.IBadge;
  visitorMode: boolean;
}

const BackView = ({ badge, visitorMode }: IBackView) => {
  const classes = useStyles();
  const generalLayoutClasses = BadgeLayoutStyles();
  const layoutClasses = BadgeLayoutOneStyles();
  const visitorLayoutClasses = VisitorLayoutStyles();

  return (
    <>
      {visitorMode ? (
        <div className={`backView ${generalLayoutClasses.fullHeight} ${classes.dataContainer} ${generalLayoutClasses.badgeGeneralRadius}`}>
          <div className={`${generalLayoutClasses.badgeIssuedWrapper} ${visitorLayoutClasses.badgeIssuedPosition}`}>
            <Typography className={generalLayoutClasses.badgeSmallParagraph}>Badge Issued By</Typography>
            <Logo styleClass={generalLayoutClasses.FCLogo} />
          </div>
          <div className={`${visitorLayoutClasses.badgeFCCopy}`}>
            <Typography className={generalLayoutClasses.badgeSmallParagraph}>www.fieldcontrolanalytics.com</Typography>
            <Typography className={generalLayoutClasses.badgeSmallParagraph}>(800) 388-8827</Typography>
          </div>
        </div>
      ) : (
        <div className={`backView ${generalLayoutClasses.fullHeight} ${classes.dataContainer} ${generalLayoutClasses.badgeGeneralRadius} `}>
          <div className={`${generalLayoutClasses.emergencyWrapper} ${generalLayoutClasses.emergencyWrapperPosition}`}>
            <Typography className={`${generalLayoutClasses.badgeEmergencyText} ${generalLayoutClasses.badgeEmergencyTitle}`}>Emergency Contact</Typography>
            <Typography className={`${generalLayoutClasses.badgeEmergencyText}`}>{getDefaultValue(badge?.emergencyContactName, 'Contact Name')}</Typography>
            <Typography className={`${generalLayoutClasses.badgeEmergencyText}`}>
              {getConditionalDefaultValue(badge?.emergencyContactPhone, formatPhoneNumber(badge?.emergencyContactPhone), 'Phone Number')}
            </Typography>
            <Typography className={`${generalLayoutClasses.badgeEmergencyText}`}>
              {getDefaultValue(badge?.emergencyContactRelationship, 'Relationship')}
            </Typography>
          </div>
          <div className={`${generalLayoutClasses.badgeIssuedWrapper} ${generalLayoutClasses.badgeIssuedPosition}`}>
            <Typography className={generalLayoutClasses.badgeSmallParagraph}>Badge Issued By</Typography>
            <Logo styleClass={generalLayoutClasses.FCLogo} />
          </div>
          <div className={`${layoutClasses.badgeFCCopy}`}>
            <Typography className={generalLayoutClasses.badgeSmallParagraph}>www.fieldcontrolanalytics.com</Typography>
            <Typography className={generalLayoutClasses.badgeSmallParagraph}>(800) 388-8827</Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(BackView);
