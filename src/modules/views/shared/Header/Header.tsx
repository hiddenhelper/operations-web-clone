import React, { memo, useEffect, useMemo } from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import MenuPopover from 'modules/views/shared/MenuPopover';
import Search from 'modules/views/shared/Search';

import DefaultAvatarSrc from 'assets/images/avatar.jpg';

import { ClientModel, UserModel } from 'modules/models';
import { ROUTES } from 'constants/index';
import { useHideScroll } from 'utils/useHideScroll';
import { useStyles } from './styles';
import { hasValidPermissions } from 'modules/models/user';

export interface IHeaderProps {
  user: UserModel.IUser;
  accountData: UserModel.IAccount;
  selfCompany: ClientModel.IClient;
  companyId: string;
  isFcaUser: boolean;
  isAdmin: boolean;
  currentUserPermissions: UserModel.IPermission[];
  navigate: (path: string) => void;
  logout: () => void;
  handleDrawerToggle: () => void;
  fetchSelfClient: () => void;
}

const Header = ({
  user,
  accountData,
  selfCompany,
  companyId,
  isFcaUser,
  isAdmin,
  currentUserPermissions,
  navigate,
  logout,
  handleDrawerToggle,
  fetchSelfClient,
}: IHeaderProps) => {
  const { isScrollHided, scrollWidth } = useHideScroll();
  const classes = useStyles({ scrollWidth });

  useEffect(() => {
    if (companyId && !selfCompany) {
      fetchSelfClient();
    }
  }, [companyId, selfCompany, fetchSelfClient]);

  const menuList = useMemo(
    () =>
      [
        { title: 'Account Settings', callback: () => navigate(ROUTES.ACCOUNT_SETTINGS.path) },
        {
          title: 'Payment Settings',
          callback: () => navigate(ROUTES.PAYMENT_SETTINGS.path),
          permissionsExpression: UserModel.PaymentMethodsPermission.VIEWACCESS,
        },
        { title: 'Sign Out', callback: logout },
      ].filter(menuItem => (menuItem.permissionsExpression ? hasValidPermissions(menuItem.permissionsExpression, currentUserPermissions) : true)),
    [currentUserPermissions, navigate, logout]
  );

  const profilePicture = useMemo(() => {
    if (accountData && accountData?.pictureUrl) {
      return accountData?.pictureUrl;
    }

    return DefaultAvatarSrc;
  }, [accountData]);

  const companyName = useMemo(() => {
    if (selfCompany) {
      return selfCompany.name;
    }
    return null;
  }, [selfCompany]);

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
            <Typography className={classes.userRole}>{isFcaUser && isAdmin ? 'FCA Admin' : isAdmin ? `${companyName} - Admin` : companyName}</Typography>
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
