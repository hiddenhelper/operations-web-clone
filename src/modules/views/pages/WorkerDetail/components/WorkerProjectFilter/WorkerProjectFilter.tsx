import React, { memo, useEffect, useMemo } from 'react';

import { Box } from '@material-ui/core';

import AutocompleteFilter from '../../../../shared/AutocompleteFilter';

import { getConditionalDefaultValue } from '../../../../../../utils/generalUtils';
import { GeneralModel, ProjectModel } from '../../../../../models';

import { tableGlobalStyles } from '../../../../../../assets/styles';

export interface IWorkerProjectFilterProps {
  workerId: string;
  queryParams: GeneralModel.IQueryParams;
  projectMap: GeneralModel.IEntityMap<ProjectModel.IWorkerProject>;
  onFilterProjectChange: (projectId: string) => void;
  fetchWorkerProjectList: (id: string, params: GeneralModel.IQueryParams) => void;
}

const WorkerProjectFilter = ({ workerId, queryParams, projectMap, onFilterProjectChange, fetchWorkerProjectList }: IWorkerProjectFilterProps) => {
  const tableGlobalClasses = tableGlobalStyles();

  const workerProjectList: ProjectModel.IWorkerProject[] = useMemo(() => (projectMap ? Object.values(projectMap) : []), [projectMap]);

  const projectList = workerProjectList.reduce((tot, item) => [...tot, { id: item?.project?.id, name: item?.project?.name }], [
    { id: '', name: 'All projects' },
  ]);
  const userProjectMap = workerProjectList.reduce((tot, item) => ({ ...tot, [item?.project?.id]: item?.project?.name }), {});

  useEffect(() => {
    fetchWorkerProjectList(workerId, queryParams);
  }, []); // eslint-disable-line

  return (
    <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus}`}>
      <AutocompleteFilter
        value={queryParams.projectId}
        label={getConditionalDefaultValue(queryParams.projectId, userProjectMap[queryParams.projectId], 'All Projects')}
        optionList={projectList}
        onChange={onFilterProjectChange}
      />
    </Box>
  );
};

export default memo(WorkerProjectFilter);
