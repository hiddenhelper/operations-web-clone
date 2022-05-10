import React, { memo, useEffect, useMemo } from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import MenuPopover from 'modules/views/shared/MenuPopover';
import DefaultAvatarSrc from 'assets/images/avatar.jpg';
import Button from '@material-ui/core/Button';
import { useStyles as buttonStyles } from '../../shared/FormHandler/ControlledButton/styles';

import { useHideScroll } from 'utils/useHideScroll';
import { useStyles } from './styles';
import { ClientModel, GeneralModel, UserModel } from 'modules/models';
import { cardGlobalStyles } from 'assets/styles/Cards/styles';

export interface IGuestHeaderProps {
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  user: UserModel.IUser;
  companyId: string;
  fetchClient: (id: string) => void;
  logout: () => void;
}

const GuestHeader = ({ clientMap, user, companyId, fetchClient, logout }: IGuestHeaderProps) => {
  const { isScrollHided } = useHideScroll();
  const classes = useStyles();
  const cardGlobalClasses = cardGlobalStyles();
  const buttonClasses = buttonStyles();
  const menuList = useMemo(() => [{ title: 'Sign Out', callback: logout }], [logout]);
  const currentClient = useMemo(() => (clientMap[companyId] ? clientMap[companyId] : ClientModel.getFallbackClient()), [clientMap, companyId]);

  useEffect(() => {
    if (!clientMap[companyId]) fetchClient(companyId);
  }, [fetchClient, clientMap, companyId]);

  return (
    <header key="Header" data-testid="header-wrapper" className={`${classes.container} ${isScrollHided ? classes.guestScrollHided : ''}`}>
      <div className={classes.mainContent}>
        <Link to="/client-onboarding">
          <Logo styleClass={classes.guestLoginLogo} />
        </Link>
        <Box>
          <Typography className={classes.guestAvatarText}>{currentClient.name}</Typography>
          <Typography>Please provide all your company information. All entered information will be subjected to FCA's approval.</Typography>
        </Box>
      </div>
      <div className={classes.secondaryContent}>
        <Button className={`${buttonClasses.createButton} ${buttonClasses.disabled}`} color="secondary" variant="contained" size="large">
          Send for Approval
        </Button>
        <Typography className={cardGlobalClasses.cardFont}>
          <strong>{user.email}</strong>
        </Typography>
        <Avatar className={classes.guestAvatarElement} src={DefaultAvatarSrc} />
        <span className={classes.guestDropdownIcon}>
          <MenuPopover divider={true} menuOptionList={menuList} placement={'bottom-end'} styleClass={classes.guestPopoverWrapper} />
        </span>
      </div>
    </header>
  );
};

export default memo(GuestHeader);
