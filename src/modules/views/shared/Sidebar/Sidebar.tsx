import React, { memo, useMemo, useCallback } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { useTheme } from '@material-ui/core/styles';

import LinkTab from '../LinkTab';

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
import PermissionGuard from '../PermissionGuard';
import { hasValidPermissions } from 'modules/models/user';

export interface ISidebarProps {
  location: { pathname: string };
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  currentUserPermissions: UserModel.IPermission[];
}

const Sidebar = ({ location, mobileOpen, currentUserPermissions, handleDrawerToggle }: ISidebarProps) => {
  const styles = useStyles();
  const pathname = location.pathname.split('/')[1] || 'dashboard';
  const getTabMap = useCallback(() => {
    const hasPermission = permissionsExpression => hasValidPermissions(permissionsExpression, currentUserPermissions);
    const permissionsTab = {
      dashboard: 0,
      projects: hasPermission(UserModel.ProjectsPermission.VIEWACCESS),
      clients: hasPermission(UserModel.ClientsPermission.VIEWACCESS),
      workers: hasPermission(UserModel.WorkersPermission.VIEWACCESS),
      invoices: hasPermission(UserModel.InvoicesPermission.VIEWACCESS),
      inventory: hasPermission(UserModel.StatisticsPermission.Inventory),
      reports: hasPermission(''),
      security: hasPermission(UserModel.AdminPermission.GENERAL),
      admin: hasPermission(UserModel.AdminPermission.GENERAL),
    };

    const tabMap = {};
    Object.keys(permissionsTab).forEach(key => {
      if (key === 'dashboard') {
        tabMap[key] = 0;
      }
      if (permissionsTab[key]) {
        tabMap[key] = Object.keys(tabMap).length;
      }
    });
    return tabMap;
  }, [currentUserPermissions]);
  const indexTabMap = useMemo(() => getTabMap() as any, [getTabMap]);
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
            display: currentTab > 0 ? 'flex' : 'none',
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
        <PermissionGuard permissionsExpression={ROUTES.PROJECT_LIST.permissionsExpression}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.projects}
            label="Projects"
            to={ROUTES.PROJECT_LIST.path}
            icon={<ProjectsIcon />}
            index={1}
          />
        </PermissionGuard>
        <PermissionGuard shouldbeFCAUser={true} permissionsExpression={ROUTES.CLIENT_LIST.permissionsExpression}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.clients}
            label="Clients"
            to={ROUTES.CLIENT_LIST.path}
            icon={<ClientsIcon />}
            index={2}
          />
        </PermissionGuard>
        <PermissionGuard permissionsExpression={ROUTES.WORKER_LIST.permissionsExpression}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.workers}
            label="Workers"
            to={ROUTES.WORKER_LIST.path}
            icon={<WorkersIcon />}
            index={3}
          />
        </PermissionGuard>
        <PermissionGuard permissionsExpression={ROUTES.INVOICE_LIST.permissionsExpression}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.invoices}
            label="Invoices"
            to={ROUTES.INVOICE_LIST.path}
            icon={<InvoiceIcon />}
            index={4}
          />
        </PermissionGuard>
        <PermissionGuard permissionsExpression={ROUTES.INVENTORY_LIST.permissionsExpression}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.inventory}
            label="Inventory"
            to={ROUTES.INVENTORY_LIST.path}
            icon={<InventoryIcon />}
            index={5}
          />
        </PermissionGuard>
        <PermissionGuard permissionsExpression={ROUTES.REPORTS.permissionsExpression}>
          <LinkTab selectedValue={indexTabMap[pathname] === indexTabMap.reports} label="Reports" to={ROUTES.REPORTS.path} icon={<ReportIcon />} index={6} />
        </PermissionGuard>
        <PermissionGuard permissionsExpression={ROUTES.SECURITY.permissionsExpression}>
          <LinkTab
            selectedValue={indexTabMap[pathname] === indexTabMap.security}
            label="Security"
            to={ROUTES.SECURITY.path}
            icon={<SecurityIcon />}
            index={7}
          />
        </PermissionGuard>
        <PermissionGuard permissionsExpression={ROUTES.ADMIN.permissionsExpression}>
          <Box style={{ marginTop: 'auto' }}>
            <LinkTab selectedValue={indexTabMap[pathname] === indexTabMap.admin} label="Admin" to={ROUTES.ADMIN.path} icon={<SettingsFullIcon />} index={8} />
          </Box>
        </PermissionGuard>
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
