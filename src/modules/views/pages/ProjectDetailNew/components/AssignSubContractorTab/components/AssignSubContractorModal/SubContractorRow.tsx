import React, { memo, useMemo, useCallback } from 'react';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import Checkbox from 'modules/views/shared/FormHandler/Checkbox';
import ControlledSelect from 'modules/views/shared/FormHandler/ControlledSelect/ControlledSelect';
import RoleGuard from 'modules/views/shared/RoleGuard';
import TableCellLink from 'modules/views/shared/TableCellLink';

import { ClientModel, UserModel } from 'modules/models';
import { getTradesString } from 'utils/tradeUtils';
import { getConditionalDefaultValue, isEmpty } from 'utils';
import { inputGlobalStyles } from 'assets/styles';
import { tableGlobalStyles, tableRowStyles } from 'assets/styles/Tables/styles';
import { useStyles } from '../../../../styles';

export interface ISubContractorProps {
  subContractor: ClientModel.IClient;
  isSelected: boolean;
  isTaxExempt?: boolean;
  showTaxCondition?: boolean;
  onSelect: (id: string) => void;
  onChangeTaxExempt: (id: string, value: boolean) => void;
}

const StyledTableRow = withStyles(tableRowStyles)(TableRow);

const SubContractor = ({ subContractor, isSelected, isTaxExempt, showTaxCondition, onSelect, onChangeTaxExempt }: ISubContractorProps) => {
  const globalClasses = tableGlobalStyles();
  const classes = useStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const isTaxExemptValue = useMemo(() => getConditionalDefaultValue(!isEmpty(isTaxExempt) && isSelected, Number(isTaxExempt), ''), [isTaxExempt, isSelected]);

  const onSelectHandler = useCallback(() => onSelect(subContractor.id), [subContractor, onSelect]);

  const tradeList = useMemo(() => getTradesString(subContractor.trades, subContractor.otherTrade), [subContractor.trades, subContractor.otherTrade]);

  const handleChangeTaxExempt = useCallback(
    event => {
      onChangeTaxExempt(subContractor.id, getConditionalDefaultValue(!isEmpty(event.target.value), Boolean(event.target.value), null));
    },
    [onChangeTaxExempt, subContractor.id]
  );

  return (
    <StyledTableRow className={isSelected ? globalClasses.selectedRow : ''} data-testid="assign-list-row" key={subContractor.id}>
      <TableCell>
        <div className={`${globalClasses.tableEllipsis} ${classes.assignNameLeftSpace}`}>
          <Checkbox name="subContractor" onChange={onSelectHandler} value={subContractor.id} isChecked={isSelected} />{' '}
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]} fallback={<>{subContractor.name}</>}>
            <TableCellLink href={`/clients/detail/${subContractor.id}`} text={subContractor.name} title="View Subcontractor details" />
          </RoleGuard>
        </div>
      </TableCell>
      <TableCell>
        {subContractor.billingAddress?.city && subContractor.billingAddress?.zipCode ? (
          <span>
            {subContractor.billingAddress?.city}
            {subContractor.billingAddress?.stateName && `, ${subContractor.billingAddress?.stateName}`}
            {subContractor.billingAddress?.zipCode && `, ${subContractor.billingAddress?.zipCode}`}
          </span>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>{tradeList}</TableCell>
      {showTaxCondition && (
        <TableCell>
          <ControlledSelect
            dataTestId="user-role-select"
            name="userRole"
            value={isTaxExemptValue}
            includeNone={true}
            disabled={!isSelected}
            options={ClientModel.taxExemptOptionList}
            variant="standard"
            onChange={handleChangeTaxExempt}
            styleClass={`${classes.minimalisticSelectWrapper} ${inputGlobalClasses.minimalisticSelect}`}
          />
        </TableCell>
      )}
    </StyledTableRow>
  );
};

export default memo(SubContractor);
