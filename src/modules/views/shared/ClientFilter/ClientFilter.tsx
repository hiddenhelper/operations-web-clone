import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Box from '@material-ui/core/Box';

import AutocompleteFilter from '../AutocompleteFilter';

import { ClientModel, GeneralModel } from '../../../models';
import { getConditionalDefaultValue } from '../../../../utils/generalUtils';

import { tableGlobalStyles } from '../../../../assets/styles';
import { useStyles } from './styles';

export interface IClientFilterProps {
  queryParams: GeneralModel.IQueryParams;
  clientMap?: GeneralModel.IEntityMap<ClientModel.IClientProject>;
  projectId: string;
  isFcaUser: boolean;
  setQueryParams: (params: GeneralModel.IQueryParams) => void;
  fetchClientList?: (id: string, query: GeneralModel.IQueryParams) => void;
}

const ClientFilter = ({ queryParams, clientMap = {}, projectId, isFcaUser, setQueryParams, fetchClientList }: IClientFilterProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();

  const clientLabel = useMemo(() => getConditionalDefaultValue(isFcaUser, 'All Clients', 'All Companies'), [isFcaUser]);

  const entityTabList: GeneralModel.INamedEntity[] = useMemo(() => Object.values(clientMap), [clientMap]);
  const clientList = useMemo(() => entityTabList.reduce((tot, item) => [...tot, { id: item?.id, name: item?.name }], [{ id: '', name: clientLabel }]), [
    entityTabList,
    clientLabel,
  ]);
  const tabEntityMap = useMemo(() => entityTabList.reduce((tot, item) => ({ ...tot, [item?.id]: item?.name }), {}), [entityTabList]);

  const onFilterClientChange = useCallback(
    (companyId: string) => {
      setQueryParams({ ...queryParams, companyId, page: 1 });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    fetchClientList(projectId, { ...queryParams, page: 1, limit: 30 });
  }, [fetchClientList, projectId]); // eslint-disable-line

  return (
    <Box className={`${tableGlobalClasses.filterStatusContainer} ${classes.autocompleteFilterPosition}`}>
      <AutocompleteFilter
        value={queryParams.companyId}
        label={getConditionalDefaultValue(queryParams.companyId, tabEntityMap[queryParams.companyId], clientLabel)}
        optionList={clientList}
        onChange={onFilterClientChange}
      />
    </Box>
  );
};

export default memo(ClientFilter);
