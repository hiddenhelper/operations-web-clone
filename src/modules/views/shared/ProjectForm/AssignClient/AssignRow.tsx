import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AssignEntity from '../../AssignEntity';
import DeleteEntityButton from '../../DeleteEntityButton';
import Checkbox from '../../FormHandler/Checkbox';
import ControlledError from '../../FormHandler/ControlledError';

import { IAssignEntityProps } from '../../AssignEntity/AssignEntity';
import { ResourceModel } from '../../../../models';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { getDrawerButton } from '../../../../../utils/clientUtils';
import { useStyles } from '../styles';

export interface IAssignClientRowProps {
  index: number;
  isNew: boolean;
  duplicity: string;
  error: string;
  assignEntityProps: IAssignEntityProps;
  entityResponse: { id: string; name: string; status?: number };
  hideBottom?: boolean;
  showTaxExempt?: boolean;
  onDelete: (id: number, tempId: string) => void;
  onUpdate: (index: number, value: boolean) => void;
}

const AssignClientRow = ({
  isNew,
  error,
  duplicity,
  assignEntityProps,
  index,
  entityResponse,
  hideBottom = false,
  showTaxExempt,
  onDelete,
  onUpdate,
}: IAssignClientRowProps) => {
  const classes = useStyles();
  const statusListToShowResponse = useMemo(
    () => [
      ResourceModel.CompanyStatus.DRAFT,
      ResourceModel.CompanyStatus.PENDING_APPROVAL,
      ResourceModel.CompanyStatus.ARCHIVED,
      ResourceModel.CompanyStatus.ACTIVE,
    ],
    []
  );
  const showEntityResponse = useMemo(() => entityResponse && statusListToShowResponse.includes(entityResponse.status), [
    entityResponse,
    statusListToShowResponse,
  ]);
  const onDeleteHandler = useCallback(() => onDelete(index, assignEntityProps.tempId), [index, onDelete]); // eslint-disable-line
  const duplicityMsg = useMemo(() => (duplicity ? duplicity : ''), [duplicity]);
  const errorMsg = useMemo(() => (error ? error : duplicityMsg), [duplicityMsg, error]);

  const handleTaxExemptChange = useCallback(
    event => {
      onUpdate(index, event.target.checked);
    },
    [onUpdate, index]
  );

  useEffect(() => {
    if (isNew && entityResponse) assignEntityProps.onSelect(index, entityResponse, assignEntityProps.tempId);
  }, [index, entityResponse, isNew]); // eslint-disable-line
  return (
    <Grid
      key={`${assignEntityProps.tempId}-${index}`}
      container={true}
      className={`${classes.formControlWrapper} ${getConditionalDefaultValue(hideBottom, classes.rowsWrapperWithoutButton, classes.rowsWrapper)}`}
    >
      <Grid item={true} xs={11} className={classes.inputWrapper}>
        <ControlledError show={!!errorMsg} error={errorMsg}>
          <AssignEntity {...assignEntityProps} />
          {!duplicity && showEntityResponse && (
            <Typography data-testid="entity-row" className={classes.entityResponse}>
              "{entityResponse.name}" is <span className={classes.accent}>{ResourceModel.statusMap[entityResponse.status]}</span>.
              {entityResponse.status !== ResourceModel.CompanyStatus.ACTIVE && (
                <>
                  {' '}
                  You can add more information and approve it in{' '}
                  <Link className={`${classes.accent} ${classes.editAccentColor}`} to={getDrawerButton(entityResponse.status, entityResponse.id).linkTo}>
                    Edit Client
                  </Link>
                </>
              )}
            </Typography>
          )}
        </ControlledError>
        {showTaxExempt && (
          <FormControlLabel
            className={classes.taxExemptCheckbox}
            label="Tax exempt"
            disabled={!assignEntityProps?.assignValue?.name}
            control={
              <Checkbox
                name="isTaxExempt"
                value="isTaxExempt"
                isChecked={assignEntityProps?.assignValue?.isTaxExempt}
                onChange={handleTaxExemptChange}
                inputProps={{ 'data-testid': 'client-isTaxExempt' }}
                disabled={!assignEntityProps?.assignValue?.name}
              />
            }
          />
        )}
      </Grid>
      <Grid item={true}>
        <DeleteEntityButton
          styleClass={`${assignEntityProps && assignEntityProps.assignValue.name.length ? classes.showDeleteButton : classes.hideDeleteButton}`}
          onClick={onDeleteHandler}
        />
      </Grid>
    </Grid>
  );
};

export default memo(AssignClientRow);
