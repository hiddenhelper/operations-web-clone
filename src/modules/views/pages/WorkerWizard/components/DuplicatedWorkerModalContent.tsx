import React, { memo, useCallback } from 'react';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';

import MatchingField, { MatchType } from '../../../shared/MatchingField/MatchingField';

import { UserModel, WorkerModel } from '../../../../models';

import { formatPhoneNumber, getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { avatarGlobalStyles, modalGlobalStyles } from '../../../../../assets/styles';
import { useStyles } from '../styles';

export interface IExistingWorkerModalProps {
  matchedFields: string[];
  existingWorker: WorkerModel.IExistingWorker;
  currentWorker: WorkerModel.IWorker;
  userRole: UserModel.Role;
}

const DuplicatedWorkerModalContent = ({ existingWorker, matchedFields, currentWorker, userRole }: IExistingWorkerModalProps) => {
  const modalClasses = modalGlobalStyles();
  const avatarGlobalClasses = avatarGlobalStyles();
  const classes = useStyles();

  const getMatchType = useCallback(
    (fieldName: string) => {
      return getConditionalDefaultValue(matchedFields.includes(fieldName), MatchType.MATCH, MatchType.NO_MATCH);
    },
    [matchedFields]
  );

  return (
    <div className={classes.duplicatedWorkerModalContent}>
      <Typography className={`${classes.workerModalSecondaryTextPosition} ${modalClasses.secondaryText}`}>
        This information matches with an existing worker.
      </Typography>
      <div className={classes.avatarWrapper}>
        <div>
          <Avatar
            className={`${classes.workerModalAvatarPosition} ${avatarGlobalClasses.avatarWrapper} ${avatarGlobalClasses.workerMedium}`}
            src={existingWorker.pictureUrl}
            alt="Worker profile"
          >
            <PersonIcon />
          </Avatar>
        </div>
        <span>
          <ul className={classes.listWrapper}>
            <MatchingField type={getMatchType('fullName')}>
              <Typography className={classes.workerAccent}>{existingWorker.fullName}</Typography>
            </MatchingField>
            {existingWorker.companyName && userRole === UserModel.Role.FCA_ADMIN && (
              <MatchingField type={getMatchType('companyName')}>
                <Typography className={classes.companyAccent}>{existingWorker.companyName}</Typography>
              </MatchingField>
            )}
            <MatchingField type={getMatchType('dateOfBirth')}>Date of Birth: {moment(existingWorker.dateOfBirth).format('MMM D, YYYY')}</MatchingField>
            <MatchingField type={getMatchType('email')}>
              <Typography>
                <a className={classes.emailAccent} href={`mailto:${existingWorker.email}`}>
                  {existingWorker.email}
                </a>
              </Typography>
            </MatchingField>
            {existingWorker.mobilePhoneNumber && currentWorker.mobilePhoneNumber && (
              <MatchingField type={getMatchType('mobilePhoneNumber')}>Mobile Phone: {formatPhoneNumber(existingWorker.mobilePhoneNumber)}</MatchingField>
            )}
            {existingWorker.socialSecurityNumber && currentWorker.socialSecurityNumber && (
              <MatchingField type={getMatchType('socialSecurityNumber')}>Last 4 SSN: {existingWorker.socialSecurityNumber}</MatchingField>
            )}
            {existingWorker.stateCode && currentWorker.address && (
              <MatchingField type={getMatchType('stateCode')}>State: {existingWorker.stateName}</MatchingField>
            )}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default memo(DuplicatedWorkerModalContent);
