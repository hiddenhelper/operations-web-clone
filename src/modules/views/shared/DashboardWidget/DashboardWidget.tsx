import React, { memo } from 'react';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { getDefaultValue } from '../../../../utils/generalUtils';
import { statusWidgetStyles } from './styles';

export interface IDashboardWidget {
  showDivider?: boolean;
  styleClass?: string;
  styles?: any;
  renderHeader?: () => React.ReactNode;
  renderContent?: () => React.ReactNode;
  renderDetail?: () => React.ReactNode;
}

const DashboardWidget = ({ renderHeader, renderContent, renderDetail, showDivider, styles, styleClass }: IDashboardWidget) => {
  const classes = statusWidgetStyles();

  return (
    <Paper className={`${getDefaultValue(styleClass, '')} ${classes.widget}`} style={getDefaultValue(styles, {})} elevation={0}>
      {renderHeader && renderHeader()}
      {renderContent && renderContent()}
      {showDivider && <Divider className={classes.widgetDivider} />}
      {renderDetail && renderDetail()}
    </Paper>
  );
};

export default memo(DashboardWidget);
