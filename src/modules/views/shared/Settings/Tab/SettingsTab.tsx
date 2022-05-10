import React, { memo } from 'react';

import Box from '@material-ui/core/Box';

import { useStyles } from './style';
import { getDefaultValue } from '../../../../../utils/generalUtils';

export interface ISettingsTabProps {
  styleClass?: string;
  renderWrapperContent: () => React.ReactNode;
  renderContainerContent?: () => React.ReactNode;
}

const SettingsTab = ({ styleClass = '', renderWrapperContent, renderContainerContent = () => undefined }: ISettingsTabProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.box} component="div" display="flex" alignItems="center" justifyContent="flex-start" flexDirection="column">
      <div className={`${classes.formContainer} ${getDefaultValue(styleClass, '')}`}>
        <div className={classes.formContainerWrapper}>{renderWrapperContent()}</div>
        {renderContainerContent()}
      </div>
    </Box>
  );
};

export default memo(SettingsTab);
