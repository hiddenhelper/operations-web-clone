import React, { memo, useCallback, useMemo, useEffect, useState, useRef } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import MenuPopover from '../../../../shared/MenuPopover';
import Pagination from '../../../../shared/Pagination';
import AssignModal from '../../../../shared/Modal/components/AssignModal';
import ClientFilter from '../../../../shared/ClientFilter';
import RoleGuard from '../../../../shared/RoleGuard';
import UserRow from './components/UserRow';
import CreateTab from './components/CreateTab';

import { GeneralModel, UserModel, ClientModel, ProjectModel } from '../../../../../models';
import { SearchIcon } from '../../../../../../constants';
import { useDebounce } from '../../../../../../utils/useDebounce';
import { deleteObjectItem, getHideOverflowClass } from '../../../../../../utils/generalUtils';
import { tableGlobalStyles } from '../../../../../../assets/styles/Tables/styles';
import { inputGlobalStyles } from '../../../../../../assets/styles/Inputs/styles';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../../../../shared/Modal/components/AssignModal/styles';

export interface IAssignUserProps {
  id: string;
  count: number;
  currentUserRole: UserModel.Role;
  userCompanyId: string;
  isFcAdmin: boolean;
  userMap: GeneralModel.IEntityMap<UserModel.IUser>;
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  loading: GeneralModel.ILoadingStatus;
  saveUserLoading: GeneralModel.ILoadingStatus;
  assignLoading: GeneralModel.ILoadingStatus;
  userRoleList: GeneralModel.INamedEntity[];
  clientProjectMap?: GeneralModel.IEntityMap<GeneralModel.IEntityMap<ClientModel.IClientProject>>;
  closeModal: () => void;
  clearErrors: () => void;
  fetchUserProjectList: (query: any) => void;
  fetchUserRoleList: () => void;
  fetchClientList: (excludeFromProjectId: string) => void;
  assignUser: (id: string, list: ProjectModel.IProjectAssignUser[]) => void;
  saveUser: (companyId: string, user: UserModel.IUser) => void;
  fetchProjectClientList?: (id: string, query: GeneralModel.IQueryParams) => void;
}

interface ISelectedState {
  original: GeneralModel.IEntityMap<UserModel.IUser>;
  filtered: GeneralModel.IEntityMap<UserModel.IUser>;
}

const AssignUser = ({
  id,
  userMap,
  clientMap,
  clientProjectMap,
  currentUserRole,
  userCompanyId,
  userRoleList,
  count,
  isFcAdmin,
  loading,
  saveUserLoading,
  assignLoading,
  saveUser,
  assignUser,
  closeModal,
  fetchUserProjectList,
  fetchUserRoleList,
  fetchClientList,
  clearErrors,
  fetchProjectClientList,
}: IAssignUserProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const buttonClasses = buttonStyles();
  const modalRef = useRef(null);

  const [userRole, setUserRole] = useState({});
  const [queryParams, setQueryParams] = useState<GeneralModel.IQueryParams>({ page: 1, lastPage: 1, limit: 6, excludeFromProjectId: id, query: '' });
  const [selectedUserMap, setSelectedUserMap] = useState<ISelectedState>({ original: {}, filtered: {} });
  const [search, setSearch] = useState<string>('');
  const [isSearching, setSearching] = useState<boolean>(false);
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [tab, setTab] = useState<string>('assign');
  const debouncedSearch = useDebounce(search, 350);

  const assignEnabled = useMemo(
    () =>
      Object.keys(selectedUserMap.original).length > 0 && Object.keys(selectedUserMap.original).every(userId => userRole[userId] && userRole[userId] !== ''),
    [selectedUserMap, userRole]
  );
  const pageCount = useMemo(
    () => (showSelected ? Math.ceil(Object.keys(selectedUserMap.original).length / queryParams.limit) : Math.ceil(count / queryParams.limit)),
    [count, queryParams.limit, showSelected, selectedUserMap.original]
  );

  const userList = useMemo(() => {
    if (showSelected) {
      const startPage = (queryParams.page - 1) * queryParams.limit;
      const endPage = startPage + queryParams.limit;
      return Object.values(selectedUserMap.original).slice(startPage, endPage);
    }
    return Object.values(userMap);
  }, [userMap, queryParams, showSelected, selectedUserMap]);

  const hideOverflow = useMemo(() => {
    return getHideOverflowClass(userList, modalRef, classes.hideOverflow);
  }, [userList, classes.hideOverflow]);

  const onSelectUser = useCallback(
    (selectedId: string) => {
      setSelectedUserMap(prevState =>
        !prevState.original[selectedId]
          ? { ...prevState, original: { ...prevState.original, [selectedId]: userMap[selectedId] } }
          : { filtered: deleteObjectItem(prevState.filtered, selectedId), original: deleteObjectItem(prevState.original, selectedId) }
      );
    },
    [setSelectedUserMap, userMap]
  );

  const onChangeRole = useCallback(
    (userId: string, role: string) => {
      setUserRole(prevState => ({ ...prevState, [userId]: role }));
    },
    [setUserRole]
  );

  const onShowAll = useCallback(() => {
    /* istanbul ignore else */
    if (showSelected) {
      setShowSelected(false);
      setSearching(true);
      setQueryParams(prevState => ({ ...prevState, page: prevState.lastPage }));
    }
  }, [showSelected, setSearching, setShowSelected]);

  const onShowSelected = useCallback(() => {
    /* istanbul ignore else */
    if (!showSelected) {
      setShowSelected(true);
      setSearching(true);
      setQueryParams(prevState => ({ ...prevState, page: 1 }));
      setSelectedUserMap(prevState => ({ ...prevState, filtered: prevState.original }));
    }
  }, [showSelected, setSearching, setShowSelected, setQueryParams]);

  const onNewUser = useCallback(() => setTab('create'), [setTab]);
  const onAssignList = useCallback(() => {
    setTab('assign');
    clearErrors();
  }, [setTab, clearErrors]);

  const onSubmit = useCallback(
    event => {
      event.persist();
      assignUser(
        id,
        Object.values(selectedUserMap.original).map(user => ({ id: user.id, roleId: userRole[user.id] }))
      );
    },
    [id, selectedUserMap, userRole, assignUser]
  );

  const onPageChange = useCallback(
    (newPage: number) => {
      setSearching(true);
      setQueryParams({ ...queryParams, page: newPage, lastPage: /* istanbul ignore next */ !showSelected ? newPage : queryParams.lastPage });
      /* istanbul ignore else */
      if (!showSelected) fetchUserProjectList({ ...queryParams, page: newPage });
    },
    [setSearching, fetchUserProjectList, setQueryParams, queryParams, showSelected]
  );

  const onCloseModal = useCallback(() => {
    closeModal();
    clearErrors();
  }, [closeModal, clearErrors]);

  const onSearchChange = useCallback(
    event => {
      event.persist();
      setSearching(true);
      setQueryParams({ ...queryParams, page: 1, query: event.target.value });
      setSearch(event.target.value);
    },
    [queryParams, setSearching, setQueryParams, setSearch]
  );

  useEffect(() => {
    if (!showSelected) fetchUserProjectList({ ...queryParams, query: debouncedSearch });
    if (showSelected) {
      setSelectedUserMap(prevState => {
        if (debouncedSearch.length > 0) {
          const searchValue = debouncedSearch.toLowerCase();
          return {
            ...prevState,
            original: Object.values(prevState.filtered)
              .filter(item => {
                const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
                return fullName.indexOf(searchValue) > -1;
              })
              .reduce((total, item) => ({ ...total, [item.id]: item }), {}),
          };
        }
        return { ...prevState, original: prevState.filtered };
      });
      setSearching(false);
    }
  }, [debouncedSearch, showSelected, setSearching, setSelectedUserMap, fetchUserProjectList, queryParams.companyId]); // eslint-disable-line

  useEffect(() => {
    if (loading && !loading.isLoading) setSearching(false);
  }, [loading, setSearching]);

  useEffect(() => {
    if (saveUserLoading && !saveUserLoading.isLoading && !saveUserLoading.hasError) {
      fetchUserProjectList(queryParams);
      onAssignList();
    }
  }, [saveUserLoading, onAssignList, fetchUserProjectList]); // eslint-disable-line

  useEffect(() => {
    if (!userRoleList.length) fetchUserRoleList();
  }, [userRoleList, fetchUserRoleList]);

  useEffect(() => {
    fetchClientList(id);
  }, [fetchClientList, id]);

  return (
    <AssignModal
      title="Assign User"
      loading={assignLoading && assignLoading.isLoading}
      confirmLabel="Assign"
      confirmLoadingLabel="Assigning..."
      modalRef={modalRef}
      isConfirmEnabled={assignEnabled}
      hideOverflow={hideOverflow}
      onClose={onCloseModal}
      onSubmit={onSubmit}
      render={() => (
        <>
          {tab === 'assign' && (
            <>
              <div>
                <Box className={`${tableGlobalClasses.filterStatusContainer} ${classes.filterStatusSpaced} ${classes.filterAssignSpacing}`}>
                  <TextField
                    variant="outlined"
                    data-testid="assign-search-wrapper"
                    placeholder="Find a user..."
                    type="text"
                    autoComplete="off"
                    name="find"
                    value={search}
                    onChange={onSearchChange}
                    className={`${inputGlobalClasses.searchInput} ${inputGlobalClasses.searchSvg}`}
                    inputProps={{
                      'data-testid': 'search-filter',
                    }}
                    InputProps={{
                      startAdornment: <SearchIcon />,
                    }}
                  />
                  <div className={classes.assignFilters}>
                    <div className={classes.filterElement}>
                      <Typography className={classes.filterTextColor}>Show {showSelected ? 'selected' : 'all'}</Typography>
                      <span className={`${tableGlobalClasses.dropdownIcon} ${classes.boldFilter}`}>
                        <MenuPopover
                          menuOptionList={[
                            { title: 'Show all', callback: onShowAll },
                            { title: 'Show selected', callback: onShowSelected },
                          ]}
                          placement={'bottom-end'}
                        />
                      </span>
                    </div>
                    <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
                    <Box
                      className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer} ${classes.locationModalFilter}`}
                    >
                      <ClientFilter
                        queryParams={queryParams}
                        clientMap={clientProjectMap[id]}
                        projectId={id}
                        isFcAdmin={isFcAdmin}
                        setQueryParams={setQueryParams}
                        fetchClientList={fetchProjectClientList}
                      />
                    </Box>
                    <div className={`${classes.boldFilter} ${classes.filterTextColor}`}>
                      {count} Users. {Object.keys(selectedUserMap.original).length} Selected
                    </div>
                    <div className={classes.filterElement}>
                      <Button
                        className={`${buttonClasses.saveButton} ${classes.assignButtonWidth}`}
                        color="primary"
                        variant="contained"
                        data-testid="tab-create-new-btn"
                        onClick={onNewUser}
                      >
                        New User
                      </Button>
                    </div>
                  </div>
                </Box>
              </div>
              <div className={classes.assignSkeletonWrapper}>
                {loading && !loading.isLoading && !isSearching && userList.length === 0 && (
                  <div className={classes.assignViewWrapper}>
                    <Typography className={classes.notFoundText} data-testid="not-found">
                      Your search did not match any User
                    </Typography>
                  </div>
                )}
                {(!loading || (loading && loading.isLoading) || isSearching) && (
                  <div className={classes.assignViewWrapper}>
                    <Typography>Loading...</Typography>
                  </div>
                )}
                {loading && !loading.isLoading && !isSearching && userList.length > 0 && (
                  <>
                    <Table aria-label="user-list">
                      <TableHead>
                        <TableRow>
                          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
                            <>
                              <TableCell>Name</TableCell>
                              <TableCell>Type</TableCell>
                              <TableCell>Title</TableCell>
                              <TableCell>Client</TableCell>
                              <TableCell>Project Role</TableCell>
                            </>
                          </RoleGuard>
                          <RoleGuard roleList={[UserModel.Role.CLIENT_ADMIN, UserModel.Role.REGULAR_USER]}>
                            <>
                              <TableCell>Name</TableCell>
                              <TableCell>Title</TableCell>
                              <TableCell>Company</TableCell>
                              <TableCell>Project Role</TableCell>
                            </>
                          </RoleGuard>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userList.map(user => (
                          <UserRow
                            key={user.id}
                            user={{ ...user, roleName: userRole[user.id] || '' }}
                            isSelected={!!selectedUserMap.original[user.id]}
                            roleList={userRoleList}
                            onSelect={onSelectUser}
                            onChange={onChangeRole}
                          />
                        ))}
                      </TableBody>
                    </Table>
                    <Pagination page={queryParams.page} count={pageCount} onChange={onPageChange} />
                  </>
                )}
              </div>
            </>
          )}
          {tab === 'create' && (
            <CreateTab
              userCompanyId={userCompanyId}
              userRole={currentUserRole}
              saveUserLoading={saveUserLoading}
              clientMap={clientMap}
              saveUser={saveUser}
              changeAssignTab={onAssignList}
            />
          )}
        </>
      )}
    />
  );
};

export default memo(AssignUser);
