import React, { memo, useEffect, useMemo } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import Pagination from '../Pagination';

import { tableGlobalStyles } from '../../../../assets/styles';
import { useStyles as buttonStyles } from '../FormHandler/ControlledButton/styles';
import { GeneralModel } from '../../../models';

export interface IDetailTabProps {
  renderFilters: () => React.ReactNode;
  onButtonClick: () => void;
  buttonLabel: string;
  buttonTestId: string;
  listLoading: GeneralModel.ILoadingStatus;
  entityMap: GeneralModel.IEntityMap<any>;
  entityId: string;
  renderEmptyList?: () => React.ReactNode;
  tableAriaLabel: string;
  tableHeaders?: string[];
  renderRow?: (item, index) => React.ReactNode;
  queryParams: GeneralModel.IQueryParams;
  onPageChange: (page) => void;
  count: number;
  clearLoading: () => void;
  fetchList: (id: string, params: any) => void;
  showButton?: boolean;
  isDisabledButton?: boolean;
  renderCustomTable?: () => React.ReactNode;
}

const DetailTab = ({
  renderFilters,
  onButtonClick,
  buttonLabel,
  buttonTestId,
  listLoading,
  entityMap,
  entityId,
  renderEmptyList,
  tableAriaLabel,
  tableHeaders,
  renderRow,
  queryParams,
  onPageChange,
  count,
  clearLoading,
  fetchList,
  showButton = true,
  isDisabledButton = false,
  renderCustomTable,
}: IDetailTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();

  const list = useMemo(() => Object.values(entityMap), [entityMap]);

  const pageCount = useMemo(() => Math.ceil(count / queryParams.limit), [count, queryParams.limit]);

  useEffect(() => {
    fetchList(entityId, queryParams);
  }, [fetchList, entityId, queryParams]);

  useEffect(() => {
    return function unMount() {
      clearLoading();
    };
  }, [clearLoading]);

  return (
    <div className={tableGlobalClasses.tableWrapper}>
      <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
        <Box className={tableGlobalClasses.filterStatusContainer}>{renderFilters()}</Box>
        {showButton && (
          <Button
            className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonLarge}`}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            data-testid={buttonTestId}
            onClick={onButtonClick}
            disabled={isDisabledButton}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
      {renderCustomTable ? (
        renderCustomTable()
      ) : listLoading && !listLoading.isLoading ? (
        !list.length ? (
          renderEmptyList()
        ) : (
          <>
            <Table aria-label={tableAriaLabel}>
              <TableHead>
                <TableRow>
                  {tableHeaders.map(header => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{list.map((item, index) => renderRow(item, index))}</TableBody>
            </Table>
            <Pagination page={queryParams.page} count={pageCount} onChange={onPageChange} />
          </>
        )
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default memo(DetailTab);
