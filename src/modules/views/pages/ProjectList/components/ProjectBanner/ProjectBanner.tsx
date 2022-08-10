import React, { memo, useCallback } from 'react';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import RoomIcon from '@material-ui/icons/Room';

import { ProjectModel } from '../../../../../models';
import { getConditionalDefaultValue, getDefaultValue } from '../../../../../../utils/generalUtils';
import { avatarGlobalStyles } from '../../../../../../assets/styles/Avatars/styles';
import { useStyles } from '../../styles';
import { Grid } from '@material-ui/core';

export interface IProjectBannerProps {
  project: ProjectModel.IProject;
  onOpen: (id: string) => void;
}

const ProjectBanner = ({ project, onOpen }: IProjectBannerProps) => {
  const avatarGlobalClasses = avatarGlobalStyles();
  const classes = useStyles();

  const onClick = useCallback(() => {
    onOpen(project.id);
  }, [project, onOpen]);

  return (
    <Paper className={classes.bannerWrapper} elevation={0} data-testid="project-list-banner-open-button" onClick={onClick}>
      <div>
        <Avatar className={`${avatarGlobalClasses.avatarWrapper} ${classes.bannerAvatarPosition}`}>
          <RoomIcon />
        </Avatar>
      </div>
      <div className={classes.bannerProjectWrapper} onClick={onClick}>
        <Typography className={`${classes.bannerTitle} ${classes.bannerProjectTitle}`}>New Project:</Typography>
        <Typography className={`${classes.bannerTitle} ${classes.bannerTitleAccent}`}>{project.name}</Typography>
      </div>
      <div className={classes.bannerInformationWrapper}>
        <Grid container={true} className={classes.bannerGrid}>
          <Grid item={true} xs={6}>
            <Typography className={classes.bannerInformation}>
              <span>
                {project.jobSiteAddress &&
                  getConditionalDefaultValue(
                    project.jobSiteAddress.line1 && project.jobSiteAddress.city && project.jobSiteAddress.stateName,
                    `${project.jobSiteAddress.line1}, ${project.jobSiteAddress.city}, ${project.jobSiteAddress.stateName}`
                  )}
              </span>
            </Typography>
          </Grid>
          <Grid item={true} xs={3}>
            <Typography className={classes.bannerInformation}>
              {getConditionalDefaultValue(
                project.startDate && project.endDate,
                moment(project.startDate).format('MMM DD, YYYY') + ' to ' + moment(project.endDate).format('MMM DD, YYYY')
              )}
            </Typography>
          </Grid>
          <Grid item={true} xs={3}>
            <Typography className={classes.bannerInformation}>{getDefaultValue(project.clientCount)} Client/s</Typography>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default memo(ProjectBanner);
