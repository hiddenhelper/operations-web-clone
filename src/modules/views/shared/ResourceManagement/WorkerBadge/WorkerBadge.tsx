import React, { useMemo, memo } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

import BadgeTemplate from '../../ResourceManagement/BadgeTemplate';
import Logo from '../../Logo';

import { WorkerModel } from '../../../../models';

import { BarcodeIcon, QRIcon } from '../../../../../constants';
import { formatPhoneNumber, formatBadgeCode, getConditionalDefaultValue, getDefaultValue } from '../../../../../utils/generalUtils';
import WorkerInviteStatusIcon from 'modules/views/shared/WorkerInviteStatusIcon';

import { avatarGlobalStyles } from '../../../../../assets/styles/Avatars/styles';
import { useStyles as badgeTemplateStyles } from '../../ResourceManagement/BadgeTemplate/styles';
import { useStyles } from './styles';

export interface IBadgeProps {
  worker: WorkerModel.IWorker;
}

const WorkerBadge = ({ worker }: IBadgeProps) => {
  const classes = useStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const badgeTemplateClasses = badgeTemplateStyles();
  const nameAndRelation = useMemo(() => {
    return [worker.emergencyContactName, worker.emergencyContactRelationship].filter(Boolean).join(', ');
  }, [worker.emergencyContactName, worker.emergencyContactRelationship]);
  return (
    <BadgeTemplate
      showBackView={false}
      render={({ toggleClass }) => (
        <>
          <div className={`${badgeTemplateClasses.dataContainerOverlap} ${toggleClass} ${badgeTemplateClasses.badgeContainerBorderRadius}`}>
            <div className={`${badgeTemplateClasses.dataContainer} ${classes.dataContainerLeft} ${badgeTemplateClasses.badgeBorderRadius}`}>
              <div className={badgeTemplateClasses.avatarPosition}>
                <Badge
                  className={`${badgeTemplateClasses.badgePosition} ${avatarGlobalClasses.badgeXL}`}
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={<WorkerInviteStatusIcon invitationStatus={worker.invitationStatus} />}
                >
                  <Avatar className={` ${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.avatarXL} ${avatarGlobalClasses.avatarXLBorder}`}>
                    {worker?.pictureUrl ? (
                      <img
                        srcSet={`${worker?.pictureUrl} 1x, ${worker?.pictureUrl} 2x`}
                        alt={WorkerModel.workerInviteMap[worker.invitationStatus]}
                        width="100%"
                      />
                    ) : (
                      <PersonIcon titleAccess={WorkerModel.workerInviteMap[worker.invitationStatus]} />
                    )}
                  </Avatar>
                </Badge>
              </div>
              <div className={`${badgeTemplateClasses.badgeTextWrapper} ${badgeTemplateClasses.summaryBadgeTextWrapper}`}>
                <Typography className={badgeTemplateClasses.badgeTitle}>
                  {worker && worker.firstName && worker.lastName ? `${worker.firstName} ${worker.lastName}` : '-'}
                </Typography>
                <Typography className={badgeTemplateClasses.badgeSubtitle}>{worker?.company?.name}</Typography>
              </div>
              <div className={`${badgeTemplateClasses.summaryBarcodePosition} ${badgeTemplateClasses.barcodePosition}`}>
                <Typography style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {getConditionalDefaultValue(!!worker?.electronicBadgeCode, formatBadgeCode(getDefaultValue(worker?.electronicBadgeCode, '')), '')}
                </Typography>
                <BarcodeIcon />
              </div>
            </div>
          </div>
          <div className={`${badgeTemplateClasses.dataContainer} ${classes.dataContainerLeft} ${badgeTemplateClasses.badgeBorderRadius}`}>
            <div className={badgeTemplateClasses.logoWrapper}>
              <Logo />
            </div>
            <div className={badgeTemplateClasses.emergencyWrapper}>
              <Typography className={`${badgeTemplateClasses.badgeSubtitle} ${badgeTemplateClasses.emergencyAccent}`}>In case of emergency:</Typography>
              <Typography className={badgeTemplateClasses.badgeSubtitle}>{`${nameAndRelation.length > 0 ? nameAndRelation : '-'}`}</Typography>
              <Typography className={badgeTemplateClasses.badgeSubtitle}>
                {worker && worker.emergencyContactPhone && formatPhoneNumber(worker.emergencyContactPhone)}
              </Typography>
            </div>
            <div className={`${badgeTemplateClasses.emergencyWrapper} ${badgeTemplateClasses.emergencyQrRow}`}>
              <Typography className={`${badgeTemplateClasses.badgeSubtitle} ${badgeTemplateClasses.emergencySpecialText}`}>
                Scan this QR code to verify the badge
              </Typography>
              <div className={badgeTemplateClasses.qrWrapper}>
                <QRIcon />
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
};

export default memo(WorkerBadge);
