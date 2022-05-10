import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Box, Typography } from '@material-ui/core';

import AvatarImage from 'modules/views/shared/AvatarImage';
import WorkerInviteStatusIcon from 'modules/views/shared/WorkerInviteStatusIcon';

import { SearchModel, WorkerModel } from 'modules/models';
import { avatarGlobalStyles } from 'assets/styles';
import { useStyles, workerStyles } from '../styles';

const WorkerResult = ({ onClick, worker }: { onClick: () => void; worker: SearchModel.IWorker }) => {
  const classes = useStyles({});
  const workerClasses = workerStyles({});
  const avatarGlobalClasses = avatarGlobalStyles();

  return (
    <Link className={`${classes.searchResult} ${workerClasses.avatar}`} onClick={onClick} title="View Worker details" to={`/workers/detail/${worker.id}`}>
      <Badge
        className={avatarGlobalClasses.avatarWithSmallBadge}
        overlap="circle"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        badgeContent={<WorkerInviteStatusIcon invitationStatus={worker.invitationStatus} />}
      >
        <Avatar className={`${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.avatarBig}`}>
          <AvatarImage url={worker?.pictureUrl} title={WorkerModel.workerInviteMap[worker.invitationStatus]} />
        </Avatar>
      </Badge>
      <Box className={`${classes.searchResultName} ${workerClasses.name}`}>
        <Typography>{worker.name}</Typography>
        {worker?.company && <Typography>{worker.company.name}</Typography>}
      </Box>
    </Link>
  );
};

export default WorkerResult;
