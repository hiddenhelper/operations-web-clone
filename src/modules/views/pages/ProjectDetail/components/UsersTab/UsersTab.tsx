import React, { memo, useEffect, useState, useMemo } from 'react';
import { Avatar, Badge, Button, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from '@material-ui/core';
import { Person } from '@material-ui/icons';

import ClientFilter from 'modules/views/shared/ClientFilter';
import EmptyList from 'modules/views/shared/EmptyList';
import Pagination from 'modules/views/shared/Pagination';
import RoleGuard from 'modules/views/shared/RoleGuard';
import TableCellLink from 'modules/views/shared/TableCellLink';

import AssignUser from '../AssignUser';

import { ClientModel, GeneralModel, UserModel } from 'modules/models';
import { AcceptedIcon, ExpiredIcon, NotInvitedIcon, PendingIcon, WorkersIcon } from 'constants/index';
import { getConditionalDefaultValue } from 'utils';

import { avatarGlobalStyles, tableGlobalStyles } from 'assets/styles';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { tableRowStyles, useStyles } from '../../styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IUsersTabProps {
  userMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<UserModel.IUserProject>>;
  clientMap?: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ClientModel.IClientProject>>;
  userCount: number;
  queryParams: GeneralModel.IQueryParams;
  isModalOpen: boolean;
  projectId: string;
  ctaDisabled: boolean;
  isFcAdmin: boolean;
  userLoading: GeneralModel.ILoadingStatus;
  assignUserLoading: GeneralModel.ILoadingStatus;
  openModal: () => void;
  closeModal: () => void;
  onPageChange: (page: number) => void;
  clearUserMap: () => void;
  fetchUserList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchProjectClientList?: (id: string, query: GeneralModel.IQueryParams) => void;
  setQueryParams: (params) => void;
}

const UsersTab = ({
  userMap,
  userCount,
  queryParams,
  isModalOpen,
  projectId,
  clientMap,
  ctaDisabled,
  isFcAdmin,
  assignUserLoading,
  userLoading,
  fetchUserList,
  openModal,
  closeModal,
  onPageChange,
  clearUserMap,
  setQueryParams,
  fetchProjectClientList,
}: IUsersTabProps) => {
  const classes = useStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();

  const [isEditUser, setIsEditUser] = useState<boolean>(false);

  const countUsers = useMemo(() => Math.ceil(userCount / queryParams.limit), [userCount, queryParams.limit]);

  const userList = useMemo(() => (projectId && Object.keys(userMap).length && userMap[projectId] ? Object.values(userMap[projectId]) : []), [
    userMap,
    projectId,
  ]);

  const userStatusIcon = useMemo(
    () => ({
      [UserModel.InvitationStatus.ACCEPTED]: <AcceptedIcon />,
      [UserModel.InvitationStatus.PENDING]: <PendingIcon />,
      [UserModel.InvitationStatus.NOT_INVITED]: <NotInvitedIcon />,
      [UserModel.InvitationStatus.EXPIRED]: <ExpiredIcon />,
    }),
    []
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (assignUserLoading && !assignUserLoading.isLoading) {
      closeModal();
      fetchUserList(projectId, queryParams);
    }
  }, [assignUserLoading, projectId, queryParams, closeModal, fetchUserList]);

  useEffect(() => {
    fetchUserList(projectId, queryParams);
  }, [projectId, queryParams, fetchUserList]);

  useEffect(() => {
    return function unMount() {
      clearUserMap();
    };
  }, [clearUserMap]);

  if (userLoading && userLoading.isLoading) {
    return <>Loading...</>;
  }

  const openEditTab = () => {
    if (!isFcAdmin) return;

    setIsEditUser(true);
    openModal();
  };

  const onCloseModal = () => {
    setIsEditUser(false);
    closeModal();
  };

  return (
    <>
      <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
        <ClientFilter
          queryParams={queryParams}
          clientMap={clientMap[projectId]}
          projectId={projectId}
          isFcAdmin={isFcAdmin}
          setQueryParams={setQueryParams}
          fetchClientList={fetchProjectClientList}
        />
        <Button
          className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge}`}
          color="primary"
          variant="contained"
          fullWidth={true}
          size="large"
          type="submit"
          data-testid="user-modal-open-btn"
          onClick={openModal}
          disabled={ctaDisabled}
        >
          Assign User
        </Button>
      </div>
      {userList.length === 0 ? (
        <EmptyList data-testid="empty-user-list" icon={<WorkersIcon />} text="There are no Users assigned" />
      ) : (
        <>
          <div className={classes.userTableWrapper}>
            <Table aria-label="user-list">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
                    <>
                      <TableCell>Type</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Project Role</TableCell>
                    </>
                  </RoleGuard>
                  <RoleGuard roleList={[UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
                    <>
                      <TableCell>Title</TableCell>
                      <TableCell>Project Role</TableCell>
                      <TableCell>Company</TableCell>
                    </>
                  </RoleGuard>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map(user => (
                  <StyledTableRow data-testid="client-list-row" key={user.id}>
                    <TableCell>
                      <div className={classes.userCenter}>
                        <Badge
                          className={`${classes.avatarPosition} ${avatarGlobalClasses.avatarWithSmallBadge}`}
                          overlap="circle"
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          badgeContent={userStatusIcon[user.invitationStatus]}
                        >
                          <Avatar className={`${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.avatarMedium}`}>
                            <Person titleAccess={UserModel.userInviteMap[user.invitationType]} />
                          </Avatar>
                        </Badge>
                        <span onClick={openEditTab} className={classes.userTitle}>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
                      <TableCell>{UserModel.userInviteMap[user.invitationType]}</TableCell>
                    </RoleGuard>
                    <TableCell>{user.title}</TableCell>
                    <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
                      <TableCell>
                        {user.company?.id ? (
                          <TableCellLink href={`/clients/detail/${user.company.id}`} text={user.company.name} title="View Client details" />
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </RoleGuard>
                    <TableCell>{getConditionalDefaultValue(user.roleName, `${user.roleName}`, 'Not defined')}</TableCell>
                    <RoleGuard roleList={[UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
                      <TableCell>{user.company?.name}</TableCell>
                    </RoleGuard>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination page={queryParams.page} count={countUsers} onChange={onPageChange} />
        </>
      )}

      {isModalOpen && <AssignUser id={projectId} closeModal={onCloseModal} isFcAdmin={isFcAdmin} isEditUser={isEditUser} />}
    </>
  );
};

export default memo(UsersTab);
