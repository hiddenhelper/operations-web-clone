import React, { memo, useCallback, useMemo } from 'react';
import { IconButton, TableCell, TableRow, withStyles } from '@material-ui/core';

import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import ControlledTooltip from 'modules/views/shared/ResourceManagement/ControlledTooltip';
import RoleGuard from 'modules/views/shared/RoleGuard';
import StatusChip from 'modules/views/shared/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { BadgeModel, UserModel } from 'modules/models';
import { BadgeActive, BadgeDeactivated, BadgeRevoked, BadgeVipActive, BadgeVipDeactivated } from 'constants/index';
import { formatBadgeCode, getConditionalDefaultValue, getDefaultValue } from 'utils';
import { useStyles, tableRowSecondaryStyles } from '../../styles';
import { useStyles as statusChipStyles } from '../../../../shared/StatusChip/styles';

const StyledTableRow = withStyles(tableRowSecondaryStyles)(TableRow);

export interface IBadgeVisitorRowProps {
  visitor: BadgeModel.IBadgeVisitor;
  openBadge: (id: string) => void;
  openDrawer: (id: string) => void;
}

const VisitorRow = ({ visitor, openBadge, openDrawer }: IBadgeVisitorRowProps) => {
  const statusChipClasses = statusChipStyles();
  const classes = useStyles();
  const projectInvitationStatusChipMap = useMemo(
    () => ({
      [BadgeModel.VisitorAvailability.PENDING]: { label: 'Pending', class: statusChipClasses.pending },
      [BadgeModel.VisitorAvailability.AVAILABLE]: { label: 'Available', class: statusChipClasses.active },
      [BadgeModel.VisitorAvailability.ASSIGNED]: { label: 'Assigned', class: statusChipClasses.assigned },
    }),
    [statusChipClasses]
  );
  const visitorStatusIconMap = useMemo(
    () => ({
      [BadgeModel.BadgeStatus.ACTIVE]:
        visitor.visitorType === BadgeModel.VisitorType.REGULAR ? (
          <BadgeActive className={classes.projectRowIcon} />
        ) : (
          <BadgeVipActive className={classes.badgeVipIcon} />
        ),
      [BadgeModel.BadgeStatus.DEACTIVATE]:
        visitor.visitorType === BadgeModel.VisitorType.REGULAR ? (
          <BadgeDeactivated className={classes.projectRowIcon} />
        ) : (
          <BadgeVipDeactivated className={classes.badgeVipIcon} />
        ),
      [BadgeModel.BadgeStatus.REVOKED]: <BadgeRevoked className={classes.projectRowIcon} />,
    }),
    [visitor.visitorType, classes]
  );
  const onOpenBadge = useCallback(
    event => {
      event.stopPropagation();
      openBadge(visitor.id);
    },
    [visitor, openBadge]
  );
  const onOpenDrawer = useCallback(
    event => {
      openDrawer(visitor.id);
    },
    [visitor, openDrawer]
  );
  return (
    <StyledTableRow className={classes.visitorRow} style={{ cursor: 'pointer' }} onClick={onOpenDrawer} data-testid="visitor-list-row" key={visitor.id}>
      <TableCell>Visitor Badge {visitor.number}</TableCell>
      <TableCell>{formatBadgeCode(visitor.code)}</TableCell>
      <TableCell>{getConditionalDefaultValue(visitor.firstName && visitor.lastName, `${visitor.firstName} ${visitor.lastName}`)}</TableCell>
      <TableCell>
        {!visitor.entityName && !visitor.company && '-'}
        {getDefaultValue(visitor.entityName, null)}
        {visitor.company?.id && (
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]} fallback={<>{visitor.company.name}</>}>
            <TableCellLink href={`/clients/detail/${visitor.company.id}`} text={visitor.company.name} title="View Client details" />
          </RoleGuard>
        )}
      </TableCell>
      <TableCell>
        <div className={classes.visitorRowLastCell}>
          <span className={classes.visitorRowStatusChip}>
            <StatusChip
              styleClasses={projectInvitationStatusChipMap[visitor?.availability]?.class}
              label={projectInvitationStatusChipMap[visitor?.availability]?.label}
            />
          </span>
          <div className={classes.visitorRowIconsWrapper}>
            <ControlledButton>
              <ControlledTooltip title={BadgeModel.badgeStatusMap[visitor.status]} placement={'left-start'}>
                <IconButton data-testid="open-visitor-badge-modal" onClick={onOpenBadge} disableRipple={true} aria-label="badge-modal" color="default">
                  {visitorStatusIconMap[visitor.status]}
                </IconButton>
              </ControlledTooltip>
            </ControlledButton>
          </div>
        </div>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(VisitorRow);
