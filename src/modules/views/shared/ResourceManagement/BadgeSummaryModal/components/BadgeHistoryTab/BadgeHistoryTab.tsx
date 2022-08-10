import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';

import Pagination from '../../../../Pagination';
import EmptyList from '../../../../EmptyList';

import { BadgeModel, GeneralModel, UserModel } from '../../../../../../models';
import { getFormattedDate } from '../../../../../../../utils/generalUtils';
import { listGlobalStyles, listTableRowStyles } from '../../../../../../../assets/styles';
import { EBadgeIcon } from '../../../../../../../constants';
import { useStyles } from '../../styles';
import { hasValidPermissions } from 'modules/models/user';

const StyledTableRow = withStyles(listTableRowStyles)(TableRow);

export interface IBadgeHistoryTabProps {
  badgeId: string;
  historyList: BadgeModel.IBadgeHistory[];
  count: number;
  loading: GeneralModel.ILoadingStatus;
  currentUserPermissions: UserModel.IPermission[];
  fetchBadgeHistory: (id: string, query: GeneralModel.IQueryParams) => void;
  clearBadgeHistory: () => void;
}

const BadgeHistoryTab = ({ badgeId, historyList, count, loading, currentUserPermissions, fetchBadgeHistory, clearBadgeHistory }: IBadgeHistoryTabProps) => {
  const listGlobalClasses = listGlobalStyles();
  const classes = useStyles();
  const [queryParams, setQueryParams] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 15,
  });
  const pageCount = useMemo(() => Math.ceil(count / queryParams.limit), [count, queryParams.limit]);

  const onPageChange = useCallback(
    newPage => {
      setQueryParams({ ...queryParams, page: newPage });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    if (hasValidPermissions(UserModel.BadgesPermission.VIEWACCESS, currentUserPermissions)) fetchBadgeHistory(badgeId, queryParams);
  }, [badgeId, queryParams, currentUserPermissions, fetchBadgeHistory]);

  useEffect(() => {
    return function unMount() {
      clearBadgeHistory();
    };
  }, [clearBadgeHistory]);

  if (historyList.length === 0) {
    return (
      <div style={{ padding: '15px' }}>
        <EmptyList styleClass={classes.emptyBadgeHistory} icon={<EBadgeIcon />} text="There is no Badge History" />
      </div>
    );
  }

  return (
    <div style={{ padding: '15px' }}>
      {loading && !loading.isLoading ? (
        <>
          <Table aria-label="project-list">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Badge Action</TableCell>
                <TableCell>Tag ID</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyList.map(item => (
                <StyledTableRow data-testid="project-list-row" key={item.id}>
                  <TableCell>{getFormattedDate(item.date, GeneralModel.DateFormat.DATE_TIME)}</TableCell>
                  <TableCell>
                    {item.user?.firstName} {item.user?.lastName}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={BadgeModel.badgeActionMap[item.badgeAction](
                        item?.projectAccessControlSystem?.deviceName + ' (Reader ' + item?.reader?.hostname + ')'
                      )}
                      placement="bottom"
                    >
                      <div className={listGlobalClasses.ellipsedColumn}>
                        {BadgeModel.badgeActionMap[item.badgeAction](item?.projectAccessControlSystem?.deviceName + ' (Reader ' + item?.reader?.hostname + ')')}
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{item.tagId}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination data-testid="pagination" page={queryParams.page} count={pageCount} onChange={onPageChange} />
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default memo(BadgeHistoryTab);
