import React, { memo, useCallback, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonLoader from '../ButtonLoader';

import { useStyles } from './styles';
import ControlledSelect from '../FormHandler/ControlledSelect/ControlledSelect';
import { ClientModel } from '../../../models';

export interface IEditTaxesProps {
  taxCondition: boolean;
  loading: boolean;
  onCancel: () => void;
  onConfirm: (condition: boolean) => void;
}

const EditTaxes = ({ taxCondition, loading, onConfirm, onCancel }: IEditTaxesProps) => {
  const classes = useStyles();
  const [isTaxExempt, setIsTaxExempt] = useState(taxCondition);

  const handleTaxConditionChange = useCallback(
    event => {
      setIsTaxExempt(Boolean(event.target.value));
    },
    [setIsTaxExempt]
  );

  const handleConfirm = useCallback(() => {
    onConfirm(isTaxExempt);
  }, [onConfirm, isTaxExempt]);

  return (
    <>
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        Edit Tax Condition
      </DialogTitle>
      <DialogContent>
        <ControlledSelect
          label=""
          name="isTaxExempt"
          value={Number(isTaxExempt)}
          options={ClientModel.taxExemptOptionList}
          onChange={handleTaxConditionChange}
          error={null}
          disabled={false}
          dataTestId="tax-condition-select"
        />
      </DialogContent>
      <DialogActions>
        <Grid container={true}>
          <Grid item={true} xs={3} className={classes.cancelButtonWrapper}>
            <Button className={classes.closeButton} data-testid="cancel-button" onClick={onCancel} color="primary">
              Close
            </Button>
          </Grid>
          <Grid item={true} xs={9} className={classes.buttonsWrapper}>
            <ButtonLoader
              text="Save"
              loadingText="Saving..."
              isLoading={loading}
              className={classes.primaryButton}
              data-testid="confirm-button"
              onClick={handleConfirm}
              color="primary"
              variant="contained"
            />
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default memo(EditTaxes);
