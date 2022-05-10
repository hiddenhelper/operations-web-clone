import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography } from '@material-ui/core';
import { Room } from '@material-ui/icons';

import StatusChip from 'modules/views/shared/StatusChip';

import { ResourceModel, SearchModel } from 'modules/models';
import { getDrawerButton } from 'utils';
import { getDrawerButton as getClientDrawerButton } from 'utils/clientUtils';
import { avatarGlobalStyles } from 'assets/styles';
import { useStyles as statusChipStyles } from 'modules/views/shared/StatusChip/styles';
import { useStyles } from '../styles';

const ResultWithAddress = ({ onClick, item }: { onClick: () => void; item: SearchModel.IResponse }) => {
  const classes = useStyles({});
  const avatarGlobalClasses = avatarGlobalStyles();
  const statusChipClasses = statusChipStyles();
  const { buttonText, linkTo } = useMemo(
    () =>
      item.entityType === SearchModel.SearchType.Project
        ? getDrawerButton(item.status, item.id, ResourceModel.Type.PROJECT)
        : getClientDrawerButton(item.status, item.id),
    [item]
  );
  const statusLabel = ResourceModel.statusMap[item.status];
  const statusClass = useMemo(() => statusChipClasses[statusLabel?.replace(/ /g, '').toLowerCase()], [statusChipClasses, statusLabel]);
  const address = useMemo(
    () =>
      item?.address
        ? [item.entityType === SearchModel.SearchType.Project ? item.address.line1 : null, item.address.city, item.address.stateName]
            .filter(_item => !!_item)
            .join(', ')
        : null,
    [item]
  );
  return (
    <Link className={classes.searchResult} onClick={linkTo ? onClick : undefined} title={buttonText} to={linkTo} component={!linkTo ? Box : undefined}>
      <Avatar className={`${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.avatarBig}`}>
        <Room />
      </Avatar>
      <Box className={classes.searchResultName}>
        <Typography>{item.name}</Typography>
        {!!address && <Typography>{address}</Typography>}
      </Box>
      {statusLabel && <StatusChip label={statusLabel} styleClasses={statusClass} />}
    </Link>
  );
};

export default ResultWithAddress;
