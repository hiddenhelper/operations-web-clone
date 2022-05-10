import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Logo from '../Logo/Logo';

import { LANG } from '../../../../constants/locales';

import { useStyles } from './styles';

export interface IAuthScreenLayoutProps {
  title: string;
  subtitle?: React.ReactNode;
  titleTestId?: string;
  renderContent: () => React.ReactNode;
  titleStyleClass?: string;
  subtitleStyleClass?: string;
  formContainerStyleClass?: string;
  formContainerWrapperStyleClass?: string;
}

const AuthScreenLayout = ({
  title,
  subtitle,
  renderContent,
  titleTestId,
  titleStyleClass,
  subtitleStyleClass,
  formContainerStyleClass,
  formContainerWrapperStyleClass,
}: IAuthScreenLayoutProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.box} component="div" display="flex" alignItems="center" justifyContent="flex-start" flexDirection="column">
      <div className={classes.logoWrapper}>
        <Link to="/">
          <Logo styleClass={classes.loginLogo} />
        </Link>
      </div>
      <div className={`${classes.formContainer} ${formContainerStyleClass}`}>
        <div className={`${formContainerWrapperStyleClass ? formContainerWrapperStyleClass : classes.formContainerWrapper}`}>
          <Typography variant="h1" className={`${classes.formTitle} ${titleStyleClass}`} data-testid={titleTestId ? titleTestId : 'form-title'}>
            {title}
          </Typography>
          {subtitle && <Typography className={subtitleStyleClass ? subtitleStyleClass : classes.formSubtitle}>{subtitle}</Typography>}
          {renderContent()}
        </div>
      </div>
      <div className={classes.legalLabelWrapper}>
        <Typography className={classes.legalLabel}>{LANG.EN.LOGIN.LEGAL_LABEL}</Typography>
      </div>
    </Box>
  );
};

export default memo(AuthScreenLayout);
