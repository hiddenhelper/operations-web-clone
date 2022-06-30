import React, { memo, useMemo } from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import MenuPopover from 'modules/views/shared/MenuPopover';
import Search from 'modules/views/shared/Search';

import DefaultAvatarSrc from 'assets/images/avatar.jpg';

import { ClientModel, GeneralModel, UserModel } from 'modules/models';
import { ROUTES } from 'constants/index';
import { useHideScroll } from 'utils/useHideScroll';
import { useStyles } from './styles';
import { RoleMap } from 'modules/models/user';

export interface IHeaderProps {
  user: UserModel.IUser;
  userRole: UserModel.Role;
  accountData: UserModel.IAccount;
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  companyId: string;
  isGeneralAdmin: boolean;
  navigate: (path: string) => void;
  logout: () => void;
  handleDrawerToggle: () => void;
}

const Header = ({ user, userRole, accountData, clientMap, companyId, isGeneralAdmin, navigate, logout, handleDrawerToggle }: IHeaderProps) => {
  const { isScrollHided, scrollWidth } = useHideScroll();
  const classes = useStyles({ scrollWidth });

  const menuList = useMemo(
    () =>
      [
        { title: 'Account Settings', callback: () => navigate(ROUTES.ACCOUNT_SETTINGS.path) },
        { title: 'Payment Settings', callback: () => navigate(ROUTES.PAYMENT_SETTINGS.path), role: [UserModel.Role.CLIENT_ADMIN] },
        { title: 'Sign Out', callback: logout },
      ].filter(menuItem => !menuItem.role || menuItem.role.includes(userRole)),
    [userRole, navigate, logout]
  );

  const profilePicture = useMemo(() => {
    if (accountData && accountData?.pictureUrl) {
      return accountData?.pictureUrl;
    }

    return DefaultAvatarSrc;
  }, [accountData]);

  const companyName = useMemo(() => {
    return clientMap[companyId] && clientMap[companyId].name ? clientMap[companyId].name : '';
  }, [clientMap, companyId]);

  return (
    <header key="Header" data-testid="header-wrapper" className={`${classes.container} ${isScrollHided ? classes.scrollHided : ''}`}>
      <nav>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Search />
        <Box className={classes.avatarContainer}>
          <Box className={classes.emailAndRoleWrapper}>
            <Typography className={classes.avatarText}>{user.email}</Typography>
            <Typography className={classes.userRole}>{isGeneralAdmin ? `${companyName} - ${RoleMap[userRole]}` : RoleMap[userRole]}</Typography>
          </Box>
          <Avatar className={classes.avatarElement} alt="John Doe" src={profilePicture} />
          <span className={classes.dropdownIcon}>
            <MenuPopover divider={true} menuOptionList={menuList} placement={'bottom-end'} styleClass={classes.popoverWrapper} />
          </span>
        </Box>
      </nav>
    </header>
  );
};

export default memo(Header);
