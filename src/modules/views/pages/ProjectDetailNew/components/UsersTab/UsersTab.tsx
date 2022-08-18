import React, { memo, useEffect, useState, useMemo } from 'react';
import { Avatar, Badge, Button, Table, TableHead, TableRow, TableCell, TableBody, withStyles } from '@material-ui/core';
import { Person } from '@material-ui/icons';

import ClientFilter from 'modules/views/shared/ClientFilter';
import EmptyList from 'modules/views/shared/EmptyList';
import Pagination from 'modules/views/shared/Pagination';
import PermissionGuard from 'modules/views/shared/PermissionGuard';
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
  isFcaUser: boolean;
  userLoading: GeneralModel.ILoadingStatus;
  assignUserLoading: GeneralModel.ILoadingStatus;
  openModal: () => void;
  closeModal: () => void;
  onPageChange: (page: number) => void;
  clearUserMap: () => void;
  fetchUserList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchProjectClientList?: (id: string, query: GeneralModel.IQueryParams) => void;
  setQueryParams: (params) => void;
  fetchUserProfile: (companyId: string, companyUserId: string) => void;
}

const UsersTab = ({
  userMap,
  userCount,
  queryParams,
  isModalOpen,
  projectId,
  clientMap,
  ctaDisabled,
  isFcaUser,
  assignUserLoading,
  userLoading,
  fetchUserList,
  openModal,
  closeModal,
  onPageChange,
  clearUserMap,
  setQueryParams,
  fetchProjectClientList,
  fetchUserProfile,
}: IUsersTabProps) => {
  const classes = useStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();

  const [isEditUser, setIsEditUser] = useState<boolean>(false);

  const [userCompanyId, setUserCompanyId] = useState<string>('');

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

  const editCompanyUser = (companyId: string, companyUserId: string) => {
    if (!companyId || !companyUserId) return;

    fetchUserProfile(companyId, companyUserId);
    setUserCompanyId(companyId);
    setIsEditUser(true);
    openModal();
  };

  const onCloseModal = () => {
    fetchUserList(projectId, queryParams);
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
          isFcaUser={isFcaUser}
          setQueryParams={setQueryParams}
          fetchClientList={fetchProjectClientList}
        />
        <PermissionGuard permissionsExpression={`${UserModel.UsersPermission.MANAGE} AND ${UserModel.ProjectsPermission.VIEWACCESS}`}>
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
        </PermissionGuard>
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
                  <TableCell>Title</TableCell>
                  {isFcaUser && <TableCell>Client</TableCell>}
                  <TableCell>Project Role</TableCell>
                  {!isFcaUser && <TableCell>Company</TableCell>}
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
                        <PermissionGuard
                          permissionsExpression={`${UserModel.UsersPermission.VIEWACCESS} AND ${UserModel.UsersPermission.MANAGE}`}
                          fallback={
                            <span className={classes.userTitle}>
                              {user.firstName} {user.lastName}
                            </span>
                          }
                        >
                          <span
                            onClick={() => (user.invitationStatus === UserModel.InvitationStatus.PENDING ? editCompanyUser(user.company.id, user.id) : {})}
                            className={classes.userTitle}
                          >
                            {user.firstName} {user.lastName}
                          </span>
                        </PermissionGuard>
                      </div>
                    </TableCell>
                    <TableCell>{user.title || '-'}</TableCell>
                    {isFcaUser && (
                      <TableCell>
                        {user.company?.id ? (
                          <PermissionGuard permissionsExpression={UserModel.ClientsPermission.VIEWACCESS} fallback={<>{user.company.name}</>}>
                            <TableCellLink href={`/clients/detail/${user.company.id}`} text={user.company.name} title="View Client details" />
                          </PermissionGuard>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    )}
                    <TableCell>{getConditionalDefaultValue(user.roleName, `${user.roleName}`, 'Not defined')}</TableCell>
                    {!isFcaUser && <TableCell>{user.company?.name}</TableCell>}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination page={queryParams.page} count={countUsers} onChange={onPageChange} />
        </>
      )}

      {isModalOpen && <AssignUser id={projectId} closeModal={onCloseModal} isEditUser={isEditUser} companyId={userCompanyId} />}
    </>
  );
};

export default memo(UsersTab);
