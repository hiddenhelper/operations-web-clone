import React, { useCallback, memo, useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';

import Address from '../Address';

import { WorkerModel, GeneralModel } from '../../../models';
import { EmergencyContactIcon } from '../../../../constants';
import { getConditionalDefaultValue, formatPhoneNumber, getFormattedDate } from '../../../../utils/generalUtils';
import { generalGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';

export interface ICardSummaryProps {
  model: WorkerModel.IWorker;
  styleClass?: string;
  editAction?: () => void;
}

const CardSummary = ({ model, editAction, styleClass = '' }: ICardSummaryProps) => {
  const classes = useStyles();
  const generalStyles = generalGlobalStyles();
  const handleEditAction = useCallback(() => editAction(), [editAction]);

  const tradeList = useMemo(() => [...model.trades, model.otherTrade && { name: model.otherTrade }].filter(Boolean), [model]);

  const extraTrades = useMemo(() => tradeList.length > 3, [tradeList]);

  const tradesToShow = useMemo(() => [...tradeList.slice(0, 3), extraTrades && { name: `${tradeList.length - 3}+` }].filter(Boolean), [tradeList, extraTrades]);

  return (
    <Paper className={`${classes.root} ${styleClass}`} variant="outlined">
      <div className={classes.header}>
        <Grid container={true} spacing={0}>
          <Grid item={true} xs={5}>
            <Typography variant="h3" className={classes.headerTitle}>
              Worker Summary
            </Typography>
            <Typography className={classes.subtitle}>Created on {getFormattedDate(model?.createdAt, GeneralModel.DateFormat.NUMERIC_DATE)}</Typography>
          </Grid>
          <Grid container={true} item={true} xs={7} spacing={0} justify="flex-end">
            <div className={classes.widget}>
              <span className={classes.widgetTotal}>{model?.certificationsCount}</span>
              <span className={classes.widgetDescription}>Certifications</span>
            </div>
            <div className={classes.widget}>
              <span className={classes.widgetTotal}>{model?.trainingsCount}</span>
              <span className={classes.widgetDescription}>Trainings</span>
            </div>
            <div className={classes.widget}>
              <span className={classes.widgetTotal}>{model?.observationsCount}</span>
              <span className={classes.widgetDescription}>Observations</span>
            </div>
          </Grid>
        </Grid>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.body}>
        <Grid container={true} spacing={0}>
          <Grid item={true} xs={4} className={`${classes.informationColumn} ${classes.borderRight}`}>
            <RoomIcon className={classes.informationColumnIcon} />
            <div className={classes.informationColumnText}>
              <Address address={model.address} isCountryOnNewLine={true} />
            </div>
          </Grid>
          <Grid item={true} xs={4} className={`${classes.informationColumn} ${classes.borderRight} ${classes.paddingLeft}`}>
            <CallIcon className={classes.informationColumnIcon} />
            <div className={`${classes.informationColumnText} ${generalStyles.textEllipsis}`}>
              <span className={classes.columnFont}>{`Phone: ${getConditionalDefaultValue(
                model && model.phoneNumber,
                formatPhoneNumber(model.phoneNumber)
              )}`}</span>
              <span className={classes.columnFont}>{`Mobile: ${getConditionalDefaultValue(
                model && model.mobilePhoneNumber,
                formatPhoneNumber(model.mobilePhoneNumber)
              )}`}</span>
              <span className={generalStyles.textEllipsis}>
                {model && model.email ? (
                  <a className={classes.emailAnchor} href={`mailto:${model.email}`}>
                    {model.email}
                  </a>
                ) : (
                  '-'
                )}
              </span>
            </div>
          </Grid>
          <Grid item={true} xs={4} className={`${classes.informationColumn} ${classes.paddingLeft}`}>
            <EmergencyContactIcon className={`${classes.informationColumnIcon} ${classes.emergencyContactIcon}`} />
            <div className={classes.informationColumnText}>
              <span className={classes.columnFont}>{model && model.emergencyContactName ? model.emergencyContactName : '-'}</span>
              <span className={classes.columnFont}>{model && model.emergencyContactRelationship ? model.emergencyContactRelationship : '-'}</span>
              <span className={classes.columnFont}>{model && model.emergencyContactName ? formatPhoneNumber(model.emergencyContactPhone) : '-'}</span>
            </div>
          </Grid>
          <Grid item={true} xs={12} className={classes.tradeWrapper}>
            {tradesToShow.map((trade, index) => (
              <Chip key={index} className={`${classes.cardSummaryChip}`} label={trade.name} />
            ))}
          </Grid>
        </Grid>
        {editAction && (
          <IconButton className={classes.headerEditButton} disableRipple={true} onClick={handleEditAction} data-testid="edit-button">
            <EditIcon />
          </IconButton>
        )}
      </div>
    </Paper>
  );
};

export default memo(CardSummary);
