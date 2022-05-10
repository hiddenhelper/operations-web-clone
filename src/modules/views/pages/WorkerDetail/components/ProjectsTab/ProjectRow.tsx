import React, { memo, useCallback, useMemo } from 'react';
import { IconButton, TableCell, TableRow, withStyles } from '@material-ui/core';

import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import ControlledTooltip from 'modules/views/shared/ResourceManagement/ControlledTooltip';
import StatusChip from 'modules/views/shared/StatusChip';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { BadgeModel, ProjectModel } from 'modules/models';
import {
  BadgeActive,
  BadgeDeactivated,
  BadgeRevoked,
  BadgeUniversalActiveIcon,
  BadgeUniversalDeactiveIcon,
  BadgeUniversalRevokedIcon,
  DocumentIcon,
  DocumentEditIcon,
} from 'constants/index';
import { getAddressString } from 'utils/addressUtils';
import { getConditionalDefaultValue, isEmpty } from 'utils';

import { useStyles as statusChipStyles } from '../../../../../views/shared/StatusChip/styles';
import { tableRowStyles } from '../../../../../../assets/styles/Tables/styles';
import { listGlobalStyles } from '../../../../../../assets/styles';
import { useStyles } from '../../styles';

export interface IProjectRowProps {
  project: ProjectModel.IWorkerProject;
  onOpenConsentForm: (id: string, isEditable: boolean) => void;
  openBadgeModal: (id: string) => void;
  onClick: (id: string) => void;
}

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const ProjectRow = ({ project, onOpenConsentForm, openBadgeModal, onClick }: IProjectRowProps) => {
  const classes = useStyles();
  const listClasses = listGlobalStyles();
  const statusChipClasses = statusChipStyles();
  const isUniversal: boolean = useMemo(() => project.badgeType === BadgeModel.BadgeType.UNIVERSAL, [project.badgeType]);

  const onOpenBadgeModal = useCallback(() => openBadgeModal(project.id), [project, openBadgeModal]);

  const openConsentForm = useCallback(
    (isEditable: boolean) => {
      /* istanbul ignore else */
      if (project.workerProjectStatus === ProjectModel.WorkerProjectStatus.ACCEPTED) onOpenConsentForm(project.id, isEditable);
    },
    [onOpenConsentForm, project]
  );

  const onViewConsentForm = useCallback(() => openConsentForm(false), [openConsentForm]);
  const onEditConsentForm = useCallback(() => openConsentForm(true), [openConsentForm]);

  const badgeStatusIcon = useMemo(
    () => ({
      [BadgeModel.BadgeStatus.ACTIVE]: getConditionalDefaultValue(
        isUniversal,
        <BadgeUniversalActiveIcon />,
        <BadgeActive className={classes.projectRowIcon} />
      ),
      [BadgeModel.BadgeStatus.DEACTIVATE]: getConditionalDefaultValue(
        isUniversal,
        <BadgeUniversalDeactiveIcon />,
        <BadgeDeactivated className={classes.projectRowIcon} />
      ),
      [BadgeModel.BadgeStatus.REVOKED]: getConditionalDefaultValue(
        isUniversal,
        <BadgeUniversalRevokedIcon />,
        <BadgeRevoked className={classes.projectRowIcon} />
      ),
      [BadgeModel.BadgeStatus.EXPIRED]: getConditionalDefaultValue(
        isUniversal,
        <BadgeUniversalDeactiveIcon />,
        <BadgeDeactivated className={classes.projectRowIcon} />
      ),
    }),
    [isUniversal, classes.projectRowIcon]
  );

  return (
    <StyledTableRow data-testid="project-list-row">
      <TableCell className={listClasses.listName}>
        {project.project?.id ? (
          <TableCellLink
            href={`/projects/detail/${project.project.id}`}
            testId="project-list-row-open-button"
            text={project.project.name}
            title="View Project details"
          />
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>
        <span className={classes.projectRowFontColor}>{getAddressString(project.jobSiteAddress)}</span>
      </TableCell>
      <TableCell style={{ textAlign: 'right' }}>
        <span
          className={classes.projectRowFontColor}
          style={{ marginRight: getConditionalDefaultValue(project.workerProjectStatus === ProjectModel.WorkerProjectStatus.PENDING, '37px', '30px') }}
        >
          <StatusChip
            styleClasses={`${classes.statusChipMargin} ${statusChipClasses[ProjectModel.workerProjectStatus[project.workerProjectStatus]]}`}
            label={ProjectModel.workerProjectStatus[project.workerProjectStatus]}
          />
        </span>
      </TableCell>
      <TableCell>
        <div className={classes.projectRowLastCell}>
          <div className={classes.projectRowIconsWrapper}>
            <ControlledButton>
              <ControlledTooltip title={BadgeModel.badgeStatusMap[project.badgeStatus]} placement={'left-start'}>
                <IconButton data-testid="open-badge-modal" onClick={onOpenBadgeModal} disableRipple={true} aria-label="badge-modal" color="default">
                  {badgeStatusIcon[project.badgeStatus]}
                </IconButton>
              </ControlledTooltip>
            </ControlledButton>
            <ControlledButton>
              <ControlledTooltip title={'Consent Form'} placement={'left-start'}>
                <span>
                  {project.sourceType === ProjectModel.SourceType.MIGRATION ? (
                    <a
                      href={project.scannedFileUrl}
                      title={`consent-form-${project.id}.tiff`}
                      download={!isEmpty(project.scannedFileUrl)}
                      data-testid="scannedfile-download"
                    >
                      <DocumentIcon
                        className={`${getConditionalDefaultValue(!isEmpty(project.scannedFileUrl), classes.activeRowIcon, classes.inactiveRowIcon)} ${
                          classes.projectRowIcon
                        }`}
                      />
                    </a>
                  ) : (
                    <IconButton disabled={!project.workerProjectStatus} disableRipple={true} data-testid="open-view-consent-form" onClick={onViewConsentForm}>
                      <DocumentIcon
                        className={`${getConditionalDefaultValue(project.workerProjectStatus, classes.activeRowIcon, classes.inactiveRowIcon)} ${
                          classes.projectRowIcon
                        }`}
                      />
                    </IconButton>
                  )}
                </span>
              </ControlledTooltip>
            </ControlledButton>
            <ControlledButton>
              <ControlledTooltip title={'Project Information'} placement={'left-start'}>
                <span>
                  <IconButton disabled={!project.workerProjectStatus} disableRipple={true} data-testid="open-edit-consent-form" onClick={onEditConsentForm}>
                    <DocumentEditIcon
                      className={`${getConditionalDefaultValue(project.workerProjectStatus, classes.activeRowIcon, classes.inactiveRowIcon)} ${
                        classes.projectRowIcon
                      }`}
                    />
                  </IconButton>
                </span>
              </ControlledTooltip>
            </ControlledButton>
          </div>
        </div>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(ProjectRow);
