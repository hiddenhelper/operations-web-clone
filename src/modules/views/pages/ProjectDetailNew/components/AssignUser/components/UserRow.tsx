import React, { memo, useMemo, useCallback } from 'react';
import { Avatar, Badge, TableCell, TableRow, withStyles } from '@material-ui/core/';
import { Person } from '@material-ui/icons';

import Checkbox from 'modules/views/shared/FormHandler/Checkbox';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect';
import TableCellLink from 'modules/views/shared/TableCellLink';
import PermissionGuard from 'modules/views/shared/PermissionGuard';

import { AcceptedIcon, PendingIcon, NotInvitedIcon, ExpiredIcon } from 'constants/index';
import { UserModel, GeneralModel } from 'modules/models';
import { tableGlobalStyles, tableRowStyles } from 'assets/styles/Tables/styles';
import { avatarGlobalStyles, inputGlobalStyles } from 'assets/styles';
import { useStyles } from '../../../styles';

export interface IUserTabProps {
  user: UserModel.IUser;
  roleList: GeneralModel.INamedEntity[];
  isSelected: boolean;
  onChange: (id: string, role: string) => void;
  onSelect: (id: string) => void;
  isFcaUser: boolean;
}

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const UserRow = ({ user, isSelected, roleList, onChange, onSelect, isFcaUser }: IUserTabProps) => {
  const globalClasses = tableGlobalStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const classes = useStyles();
  const roleOptionList = useMemo(() => [...roleList, { id: '', name: 'Select Role' }].map(role => ({ value: role.id, label: role.name })), [roleList]);
  const onSelectHandler = useCallback(() => onSelect(user.id), [user, onSelect]);
  const onChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(user.id, event.target.value);
    },
    [onChange, user]
  );

  const userStatusIcon = useMemo(
    () => ({
      [UserModel.InvitationStatus.ACCEPTED]: <AcceptedIcon />,
      [UserModel.InvitationStatus.PENDING]: <PendingIcon />,
      [UserModel.InvitationStatus.NOT_INVITED]: <NotInvitedIcon />,
      [UserModel.InvitationStatus.EXPIRED]: <ExpiredIcon />,
    }),
    []
  );

  return (
    <StyledTableRow className={isSelected ? globalClasses.selectedRow : ''} data-testid="assign-list-row" key={user.id}>
      <TableCell className={classes.assignUserInitialCell}>
        <div className={`${globalClasses.tableEllipsis} ${classes.assignNameLeftSpace}`}>
          <Checkbox name="user" onChange={onSelectHandler} value={user.id} isChecked={isSelected} />{' '}
          <Badge
            className={avatarGlobalClasses.avatarWithSmallBadge}
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={userStatusIcon[user.invitationStatus]}
          >
            <Avatar className={`${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.avatarSecondaryMargin}`}>
              <Person titleAccess={UserModel.userInviteMap[user.invitationType]} />
            </Avatar>
          </Badge>
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </TableCell>
      {isFcaUser && <TableCell>{UserModel.userInviteMap[user.invitationType]}</TableCell>}
      <TableCell>{user.title}</TableCell>
      <TableCell>
        <PermissionGuard permissionsExpression={UserModel.ClientsPermission.VIEWACCESS} fallback={<>{user.company?.name}</>}>
          <>{user.company?.id ? <TableCellLink href={`/clients/detail/${user.company.id}`} text={user.company.name} title="View Client details" /> : '-'}</>
        </PermissionGuard>
      </TableCell>
      <TableCell>
        <ControlledSelect
          dataTestId="user-role-select"
          name="userRole"
          value={user.roleName}
          options={roleOptionList}
          variant="standard"
          onChange={onChangeHandler}
          styleClass={`${classes.minimalisticSelectWrapper} ${inputGlobalClasses.minimalisticSelect}`}
        />
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(UserRow);
