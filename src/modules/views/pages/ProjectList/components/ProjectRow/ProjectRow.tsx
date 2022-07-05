import React, { memo, useCallback, useMemo } from 'react';
import { TableCell, TableRow, Avatar, withStyles } from '@material-ui/core';
import { Room } from '@material-ui/icons';
import moment from 'moment';

import TableCellLink from 'modules/views/shared/TableCellLink';

import { ProjectModel, ResourceModel } from 'modules/models';
import { listGlobalStyles, listTableRowStyles } from 'assets/styles';
import { getConditionalDefaultValue, getDrawerButton } from 'utils/generalUtils';
import { useStyles } from '../../styles';

export interface IProjectRowProps {
  onOpen: (id: string) => void;
  project: ProjectModel.IProject;
}

const StyledTableRow = withStyles(listTableRowStyles)(TableRow);

const ProjectRow = ({ onOpen, project }: IProjectRowProps) => {
  const classes = useStyles();
  const listClasses = listGlobalStyles();
  const onClick = useCallback(() => {
    onOpen(project.id);
  }, [project, onOpen]);
  const { buttonText, linkTo } = useMemo(() => getDrawerButton(project.status, project.id, ResourceModel.Type.PROJECT), [project.status, project.id]);
  return (
    <StyledTableRow data-testid="project-list-row" key={project.id} onClick={onClick} className={listClasses.clickableRow}>
      <TableCell className={listClasses.listName}>
        <div className={classes.projectRow}>
          <Avatar>
            <Room />
          </Avatar>
          <TableCellLink href={linkTo} testId="project-list-row-item-link" text={project.name} title={buttonText} />
        </div>
      </TableCell>
      <TableCell className={listClasses.listGeneralText}>
        {project.jobSiteAddress && project.jobSiteAddress.city && project.jobSiteAddress.stateCode ? (
          <span>
            {project.jobSiteAddress.line1}, {project.jobSiteAddress.city}, {project.jobSiteAddress.stateName}
          </span>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell className={listClasses.listGeneralText}>
        {getConditionalDefaultValue(
          project.startDate && project.endDate,
          moment(project.startDate).format('MMM DD, YYYY') + ' to ' + moment(project.endDate).format('MMM DD, YYYY')
        )}
      </TableCell>
      <TableCell className={listClasses.listGeneralText}>{project.assignedCompaniesCount}</TableCell>
    </StyledTableRow>
  );
};

export default memo(ProjectRow);
