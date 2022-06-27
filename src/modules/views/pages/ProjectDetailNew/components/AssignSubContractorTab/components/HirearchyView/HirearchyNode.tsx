import React, { memo, useMemo, useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';

import RoleGuard from 'modules/views/shared/RoleGuard';
import RolePill from 'modules/views/shared/RolePill';
import StatusChip from 'modules/views/shared/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { ClientModel, ProjectModel, UserModel } from 'modules/models';
import { listGlobalStyles } from 'assets/styles';
import { useStyles as statusChipStyles } from '../../../../../../shared/StatusChip/styles';
import { useStyles } from './styles';

export interface IHirearchyNodeProps {
  client: ClientModel.IHirearchyClientProject;
  isSpread: boolean;
  showChilds: (id: string) => void;
}

const HirearchyNode = ({ client, isSpread, showChilds }: IHirearchyNodeProps) => {
  const classes = useStyles();
  const statusChipClasses = statusChipStyles();
  const listClasses = listGlobalStyles();

  const clientProjectStatusMap = useMemo(
    () => ({
      [ProjectModel.CompanyProjectStatus.PENDING]: { label: 'Pending', class: statusChipClasses.pending },
      [ProjectModel.CompanyProjectStatus.ACCEPTED]: { label: 'Accepted', class: statusChipClasses.active },
      [ProjectModel.CompanyProjectStatus.REJECTED]: { label: 'Rejected', class: statusChipClasses.expired },
    }),
    [statusChipClasses]
  );

  const onClick = useCallback(() => {
    showChilds(client.id);
  }, [client.id, showChilds]);

  return (
    <div className={classes.node}>
      <div className={classes.nodeContent}>
        <div className="spread-icon" style={{ minWidth: '30px' }}>
          {!!client.sponsoredCompaniesIds.length && (
            <IconButton data-testid="open-hirearchy-child-list" onClick={onClick} disableRipple={true} aria-label="hirearchy-client-node" color="default">
              {isSpread ? <ExpandMore /> : <ChevronRight />}
            </IconButton>
          )}
        </div>
        <div className={classes.role}>
          <RolePill role={client.role} />
        </div>
        <div className={`${listClasses.listName} ${listClasses.listGeneralText}`}>
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]} fallback={<>{client.name}</>}>
            <TableCellLink href={`/clients/detail/${client.id}`} testId="client-navigate-btn" text={client.name} title="View Client details" />
          </RoleGuard>
        </div>
        <div className="role">{ProjectModel.roleMap[client.role]}</div>
        <div className={classes.nodeTrades}>{client.trades.map(trade => trade.name).join(', ')}</div>
      </div>
      <div className={classes.nodeStatus} style={{ display: 'flex' }}>
        <StatusChip
          styleClasses={`${clientProjectStatusMap[client.companyProjectStatus].class} `}
          label={clientProjectStatusMap[client.companyProjectStatus].label}
        />
      </div>
    </div>
  );
};

export default memo(HirearchyNode);
