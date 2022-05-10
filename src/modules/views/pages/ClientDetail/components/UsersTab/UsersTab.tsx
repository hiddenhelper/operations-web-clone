import React, { memo, useEffect, useMemo } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';

import MenuPopover from '../../../../shared/MenuPopover/MenuPopover';
import Pagination from '../../../../shared/Pagination/Pagination';
import EmptyList from '../../../../shared/EmptyList/EmptyList';

import { UserModel, GeneralModel } from '../../../../../models';
import { formatPhoneNumber, getDefaultValue } from '../../../../../../utils/generalUtils';
import { ProjectsIcon } from '../../../../../../constants';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useStyles, tableRowStyles } from '../../styles';

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

export interface IUsersTabProps {
  clientId: string;
  userMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<UserModel.IUser>>;
  userCount: number;
  queryParams: GeneralModel.IQueryParams;
  loading: GeneralModel.ILoadingStatus;
  onPageChange: (page: number) => void;
  fetchUserList: (id: string, pageNumber: number, pageSize: number) => void;
}

const UsersTab = ({ clientId, userMap, queryParams, userCount, loading, fetchUserList, onPageChange }: IUsersTabProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const userList = useMemo(() => (clientId && Object.keys(userMap).length && userMap[clientId] ? Object.values(userMap[clientId]) : []), [userMap, clientId]);

  const pageCount = useMemo(() => Math.ceil(userCount / queryParams.pageSize), [userCount, queryParams.pageSize]);

  useEffect(() => {
    fetchUserList(clientId, queryParams.pageNumber, queryParams.pageSize);
  }, [clientId, queryParams, fetchUserList]);

  if (loading && loading.isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      {userList.length === 0 ? (
        <EmptyList icon={<ProjectsIcon />} text="There are no Users assigned" />
      ) : (
        <>
          <div className={tableGlobalClasses.filterActionsContainer}>
            <Box className={`${tableGlobalClasses.filterStatusContainer}`}>
              <Typography className={tableGlobalClasses.filterTextColor}>Show all Projects</Typography>
              <div className={tableGlobalClasses.filterWrapper}>
                <Divider orientation="vertical" flexItem={true} className={tableGlobalClasses.dividerNoSpacing} />
                <span className={tableGlobalClasses.dropdownIcon}>
                  <MenuPopover menuOptionList={[{ title: 'Opt1' }, { title: 'Opt2' }]} placement={'bottom-end'} />
                </span>
              </div>
            </Box>
          </div>
          <Table aria-label="user-list">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile Phone</TableCell>
                <TableCell>Office Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map(user => (
                <StyledTableRow data-testid="user-client-list-row" key={user.id}>
                  <TableCell className={tableGlobalClasses.cellAvatar}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </TableCell>
                  <TableCell>{getDefaultValue(user.title)}</TableCell>
                  <TableCell className={classes.boldAccentAnchor}>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </TableCell>
                  <TableCell>{formatPhoneNumber(user.mobilePhoneNumber)}</TableCell>
                  <TableCell>{formatPhoneNumber(user.officePhoneNumber)}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination page={queryParams.pageNumber} count={pageCount} onChange={onPageChange} />
        </>
      )}
    </>
  );
};

export default memo(UsersTab);
