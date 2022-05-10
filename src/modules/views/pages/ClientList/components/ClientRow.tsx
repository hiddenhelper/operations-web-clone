import React, { memo, useCallback, useMemo } from 'react';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

import TableCellLink from 'modules/views/shared/TableCellLink';

import { ClientModel } from 'modules/models';
import { getTradesString } from 'utils/tradeUtils';
import { getConditionalDefaultValue } from 'utils/generalUtils';
import { getDrawerButton } from 'utils/clientUtils';
import { listGlobalStyles, listTableRowStyles } from 'assets/styles';

export interface IClientRowProps {
  company: ClientModel.IClient;
  onOpen: (id: string) => void;
}

const StyledTableRow = withStyles(listTableRowStyles)(TableRow);

const ClientRow = ({ company, onOpen }: IClientRowProps) => {
  const listClasses = listGlobalStyles();
  const onClick = useCallback(() => {
    onOpen(company.id);
  }, [company, onOpen]);
  const { buttonText, linkTo } = useMemo(() => getDrawerButton(company.status, company.id), [company.status, company.id]);
  const tradeList = useMemo(() => getTradesString(company.trades, company.otherTrade), [company]);
  return (
    <StyledTableRow data-testid="client-list-row" key={company.id} className={listClasses.clickableRow} onClick={onClick}>
      <TableCell className={linkTo ? listClasses.listName : ''}>
        {linkTo ? <TableCellLink href={linkTo} testId="client-list-row-item-link" text={company.name} title={buttonText} /> : <>{company.name}</>}
      </TableCell>
      <TableCell className={listClasses.listGeneralText}>{getConditionalDefaultValue(tradeList, tradeList)}</TableCell>
    </StyledTableRow>
  );
};

export default memo(ClientRow);
