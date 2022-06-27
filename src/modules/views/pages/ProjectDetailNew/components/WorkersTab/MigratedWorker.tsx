import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import AvatarImage from '../../../../shared/AvatarImage';
import WorkerInviteStatusIcon from '../../../../shared/WorkerInviteStatusIcon';
import ControlledInput from '../../../../shared/FormHandler/ControlledInput';

import { GeneralModel, WorkerModel } from '../../../../../models';
import { useStyles } from '../../../../shared/Modal/components/AssignModal/styles';
import { avatarGlobalStyles, tableGlobalStyles } from '../../../../../../assets/styles';
import ControlledRadio from '../../../../shared/FormHandler/ControlledRadio';
import ControlledError from '../../../../shared/FormHandler/ControlledError';
import { isEmpty } from '../../../../../../utils/generalUtils';
import PhoneNumberInput from 'modules/views/shared/PhoneNumberInput';
import { IMigratedWorkersErrors } from './WorkerModal';

export interface IMigratedWorkerProps {
  worker: WorkerModel.IWorker;
  countryList?: GeneralModel.INamedEntity[];
  onChange: (prev: any) => void;
  errors: GeneralModel.IEntityMap<IMigratedWorkersErrors>;
}

const MigratedWorker = ({ worker, countryList, onChange, errors }: IMigratedWorkerProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const avatarGlobalClasses = avatarGlobalStyles();

  const [currentInviteMethod, setCurrentInviteMethod] = useState(worker.inviteMethod ?? WorkerModel.InviteMethod.MOBILE_PHONE);
  const [currentEmail, setCurrentEmail] = useState(worker.email ?? '');
  const [currentMobilePhoneNumber, setCurrentMobilePhoneNumber] = useState(worker.mobilePhoneNumber ?? '');

  const both = useMemo(() => currentInviteMethod === WorkerModel.InviteMethod.BOTH, [currentInviteMethod]);
  const email = useMemo(() => currentInviteMethod === WorkerModel.InviteMethod.EMAIL || both || isEmpty(currentInviteMethod), [currentInviteMethod, both]);
  const mobile = useMemo(() => currentInviteMethod === WorkerModel.InviteMethod.MOBILE_PHONE || both, [currentInviteMethod, both]);

  useEffect(() => {
    onChange(prev => ({
      ...prev,
      [worker.id]: {
        ...prev[worker.id],
        inviteMethod: currentInviteMethod,
        email: currentEmail,
        mobilePhoneNumber: currentMobilePhoneNumber,
      },
    }));
  }, [currentInviteMethod, currentEmail, currentMobilePhoneNumber, onChange, worker.id]);

  const onChangeInviteMethod = useCallback(event => {
    event.persist();
    setCurrentInviteMethod(Number(event.target.value));
  }, []);

  const onChangeEmail = useCallback(event => {
    event.persist();
    setCurrentEmail(event.target.value);
  }, []);

  const onChangeMobilePhoneNumber = useCallback(event => {
    event.persist();
    setCurrentMobilePhoneNumber(event.target.value);
  }, []);

  return (
    <>
      <Grid className={classes.migratedWorkerContainer} container={true} key={`filling-inviteMethod-${worker.id}`}>
        <Grid item={true} xs={4}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={3}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<WorkerInviteStatusIcon invitationStatus={worker.invitationStatus} />}
              >
                <Avatar className={`${avatarGlobalClasses.missingAvatarBig}`}>
                  <AvatarImage url={worker?.pictureUrl} title={WorkerModel.workerInviteMap[worker.invitationStatus]} />
                </Avatar>
              </Badge>
            </Grid>
            <Grid
              item={true}
              xs={9}
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Typography className={classes.workerName}>{`${worker.firstName} ${worker.lastName}`}</Typography>
              <Typography className={classes.workerCompanyName}>{`${worker.company?.name}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} xs={8}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={6}>
              <ControlledError show={!!errors[worker.id]?.mobilePhoneNumber} error={errors[worker.id]?.mobilePhoneNumber} styleClass={classes.errorPosition}>
                <ControlledInput label={`Mobile Phone ${!mobile ? '(Optional)' : ''}`}>
                  <PhoneNumberInput
                    countryList={countryList}
                    value={currentMobilePhoneNumber}
                    className="contact-information-mobile"
                    onChange={onChangeMobilePhoneNumber}
                    disabled={false}
                    inputProps={{
                      variant: 'outlined',
                      error: !!errors[worker.id]?.mobilePhoneNumber ? true : undefined,
                      name: 'mobilePhoneNumber',
                      required: worker.inviteMethod === WorkerModel.InviteMethod.MOBILE_PHONE,
                      'data-testid': 'mobile-worker-phone',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid item={true} xs={6}>
              <ControlledError show={!!errors[worker.id]?.email} error={errors[worker.id]?.email} styleClass={`${classes.errorPosition} email`}>
                <ControlledInput label={`Email ${!email ? '(Optional)' : ''}`}>
                  <TextField
                    variant="outlined"
                    data-testid="worker-email-wrapper"
                    placeholder="Email"
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    name="email"
                    required={worker.inviteMethod === WorkerModel.InviteMethod.EMAIL}
                    value={currentEmail}
                    onChange={onChangeEmail}
                    error={!!errors[worker.id]?.email}
                    disabled={false}
                    inputProps={{
                      'data-testid': 'worker-email',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid className={classes.inviteMethodGridContainer} item={true} xs={12}>
              <ControlledInput label="Invite Method">
                <ControlledRadio
                  row={true}
                  containerStyleClass={classes.inviteMethodContainer}
                  radioItems={WorkerModel.InviteMethodValues}
                  disabled={false}
                  formControlProps={{
                    name: 'inviteMethod',
                    label: '',
                    value: currentInviteMethod,
                    onChange: onChangeInviteMethod,
                  }}
                />
              </ControlledInput>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          xs={12}
          style={{
            marginTop: '20px',
            justifyContent: 'flex-end',
          }}
        >
          <Divider className={tableGlobalClasses.dividerColor} variant={'fullWidth'} />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(MigratedWorker);
