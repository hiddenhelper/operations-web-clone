import React, { useState, useCallback, useEffect, memo } from 'react';

import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

import { BadgeModel } from '../../../../models';

import { useStyles, BadgeLayoutStyles } from './styles';

export interface IBadgeTemplateProps {
  badge?: BadgeModel.IBadge;
  template?: BadgeModel.IBadgeTemplate;
  editorBadge?: boolean;
  barCode?: string;
  qrCode?: string;
  visitorMode?: boolean;
  showLogo?: boolean;
  logo?: string;
  showBackView?: boolean;
  render: (data?: any) => void;
}

const BadgeTemplate = ({
  badge = null,
  template = null,
  editorBadge = false,
  barCode = null,
  qrCode = null,
  visitorMode = false,
  showLogo,
  logo,
  showBackView = true,
  render,
}: IBadgeTemplateProps) => {
  const classes = useStyles();
  const badgeLayoutClasses = BadgeLayoutStyles();
  const [toggleView, setToggleView] = useState(false);
  const [toggleClass, setToggleClass] = useState('');

  const handleClick = useCallback(() => {
    setToggleView(prev => !prev);
  }, []);

  useEffect(() => {
    return function unMount() {
      setToggleClass(toggleView ? classes.show : classes.hide);
    };
  }, [toggleView, classes.show, classes.hide]);

  return (
    <Paper
      className={`${editorBadge ? badgeLayoutClasses.badgeLayoutContainer : ''} ${badgeLayoutClasses.badgeGeneralRadius} ${classes.container} ${
        classes.leftContainerTemplate
      } ${!toggleView ? '' : classes.secondaryContainerBackground}`}
      variant="outlined"
    >
      {render({ badge, barCode, qrCode, toggleClass, visitorMode, showLogo, template, logo })}
      {showBackView && (
        <div className={`${editorBadge ? `${badgeLayoutClasses.buttonWrapperPosition} ${classes.buttonWrapper}` : classes.buttonWrapper}`}>
          <Radio
            data-testid="badge-front-view-btn"
            className={`${classes.circleButton} ${!toggleView ? classes.circleButtonActive : classes.circleButtonInactive}`}
            checked={!toggleView}
            onChange={handleClick}
            disableRipple={true}
            value={!toggleView ? 'checked' : 'unchecked'}
            inputProps={{ 'data-testid': 'worker-badge-button' } as any}
          />
          <Radio
            data-testid="badge-back-view-btn"
            className={`${classes.circleButton} ${toggleView ? classes.circleButtonActive : classes.circleButtonInactive}`}
            checked={toggleView}
            onChange={handleClick}
            disableRipple={true}
            value={toggleView ? 'checked' : 'unchecked'}
            inputProps={{ 'data-testid': 'worker-badge-button' } as any}
          />
        </div>
      )}
    </Paper>
  );
};

export default memo(BadgeTemplate);
