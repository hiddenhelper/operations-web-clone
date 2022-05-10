import React, { memo, useMemo, useCallback } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { useTheme } from '@material-ui/core/styles';

import LinkTab from '../LinkTab';
import RoleGuard from '../RoleGuard';

import {
  FCLogoIcon,
  ClientsIcon,
  DashboardIcon,
  ProjectsIcon,
  WorkersIcon,
  InventoryIcon,
  ROUTES,
  InvoiceIcon,
  SettingsFullIcon,
  SecurityIcon,
  ReportIcon,
} from '../../../../constants';
import { UserModel } from '../../../models';
import { useStyles } from './styles';
import { getConditionalDefaultValue, isEmpty } from '../../../../utils/generalUtils';

export interface ISidebarProps {
  location: { pathname: string };
  userRole: UserModel.Role;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar = ({ userRole, location, mobileOpen, handleDrawerToggle }: ISidebarProps) => {
  const styles = useStyles();
  const pathname = location.pathname.split('/')[1] || 'dashboard';
  const getTabMap = useCallback((role: UserModel.Role) => {
    const tabMap = {
      [UserModel.Role.FCA_ADMIN]: {
        dashboard: 0,
        projects: 1,
        clients: 2,
        workers: 3,
        invoices: 4,
        inventory: 5,
        reports: 6,
        security: 7,
        admin: 8,
      },
      [UserModel.Role.CLIENT_ADMIN]: {
        dashboard: 0,
        projects: 1,
        workers: 2,
        invoices: 3,
        reports: 4,
      },
      [UserModel.Role.REGULAR_USER]: {
        dashboard: 0,
        projects: 1,
        workers: 2,
        invoices: 3,
        reports: 4,
      },
    };

    return tabMap[role];
  }, []);
  const indexTabMap = useMemo(() => getTabMap(userRole) as any, [userRole, getTabMap]);
  const currentTab = useMemo(() => getConditionalDefaultValue(isEmpty(indexTabMap[pathname]), false, indexTabMap[pathname]), [indexTabMap, pathname]);
  const theme = useTheme();

  const drawer = (
    <div className={styles.container}>
      <span className={styles.logo}>
        <FCLogoIcon />
      </span>
      <Tabs
        orientation="vertical"
        variant="standard"
        value={currentTab}
        aria-label="Sidebar Tabs"
        data-testid="sidebar-wrapper"
        TabIndicatorProps={{
          style: {
            display: getConditionalDefaultValue(currentTab === false, 'none', 'flex'),
          },
        }}
      >
        <LinkTab
          selectedValue={indexTabMap[pathname] === indexTabMap.dashboard}
          label="Dashboard"
          data-testid="dashboard-link"
          to={ROUTES.DASHBOARD.path}
          icon={<DashboardIcon />}
          index={0}
        />
        <LinkTab
          selectedValue={indexTabMap[pathname] === indexTabMap.projects}
          label="Projects"
          to={ROUTES.PROJECT_LIST.path}
          icon={<ProjectsIcon />}
          index={1}
        />
        <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.clients}
            label="Clients"
            to={ROUTES.CLIENT_LIST.path}
            icon={<ClientsIcon />}
            index={2}
          />
        </RoleGuard>
        <RoleGuard roleList={[UserModel.Role.FCA_ADMIN, UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.workers}
            label="Workers"
            to={ROUTES.WORKER_LIST.path}
            icon={<WorkersIcon />}
            index={3}
          />
        </RoleGuard>
        <RoleGuard roleList={[UserModel.Role.FCA_ADMIN, UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.invoices}
            label="Invoices"
            to={ROUTES.INVOICE_LIST.path}
            icon={<InvoiceIcon />}
            index={4}
          />
        </RoleGuard>
        <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.inventory}
            label="Inventory"
            to={ROUTES.INVENTORY_LIST.path}
            icon={<InventoryIcon />}
            index={5}
          />
        </RoleGuard>
        <RoleGuard roleList={[UserModel.Role.FCA_ADMIN, UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
          <LinkTab selectedValue={indexTabMap[pathname] === indexTabMap.reports} label="Reports" to={ROUTES.REPORTS.path} icon={<ReportIcon />} index={6} />
        </RoleGuard>
        <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.security}
            label="Security"
            to={ROUTES.SECURITY.path}
            icon={<SecurityIcon />}
            index={7}
          />
        </RoleGuard>
        <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
          <Box style={{ marginTop: 'auto' }}>
            <LinkTab selectedValue={indexTabMap[pathname] === indexTabMap.admin} label="Admin" to={ROUTES.ADMIN.path} icon={<SettingsFullIcon />} index={8} />
          </Box>
        </RoleGuard>
      </Tabs>
    </div>
  );

  return (
    <nav aria-label="mailbox folders">
      <Hidden smUp={true} implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown={true} implementation="css">
        <Drawer variant="permanent" open={true}>
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default memo(Sidebar);
