import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { GeneralModel, ProcoreModel } from '../../../../../models';
import { IProcoreSaveProjectMapping } from '../../../../../models/procore';
import Mapping, { INewMapping } from '../Mapping';

export interface IProjectMappingsTabProps {
  clientId: string;
  procoreProjects?: {
    clientId: string;
    projects: ProcoreModel.IProcoreProjects;
  };
  procoreProjectMappings?: {
    clientId: string;
    mappings: ProcoreModel.IProcoreProjectMappings;
  };
  procoreProjectsLoading: GeneralModel.ILoadingStatus;
  procoreProjectMappingsLoading: GeneralModel.ILoadingStatus;
  procoreProjectMappingsSaving: GeneralModel.ILoadingStatus;
  fetchProcoreProjects: (clientId: string) => void;
  fetchProcoreProjectMappings: (clientId: string) => void;
  saveProcoreProjectMappings: (clientId: string, mappings: IProcoreSaveProjectMapping[]) => void;
}

const ProjectMappingsTab = ({
  clientId,
  procoreProjects,
  procoreProjectMappings,
  procoreProjectsLoading,
  procoreProjectMappingsLoading,
  procoreProjectMappingsSaving,
  fetchProcoreProjects,
  fetchProcoreProjectMappings,
  saveProcoreProjectMappings,
}: IProjectMappingsTabProps) => {
  const projectMappingsReady = useMemo(
    () => procoreProjects?.clientId === clientId && procoreProjects?.projects?.items && procoreProjectMappings?.mappings?.items,
    [clientId, procoreProjects, procoreProjectMappings]
  );

  const projectMappingsIsLoading = useMemo(() => procoreProjectMappingsLoading?.isLoading || procoreProjectsLoading?.isLoading, [
    procoreProjectsLoading,
    procoreProjectMappingsLoading,
  ]);

  const projectMappingsLoadingError = useMemo(() => procoreProjectMappingsLoading?.hasError || procoreProjectsLoading?.hasError, [
    procoreProjectsLoading,
    procoreProjectMappingsLoading,
  ]);

  const projectOptions = useMemo(() => procoreProjects?.projects?.items, [procoreProjects]);
  const projectItems: any[] = useMemo(
    () =>
      procoreProjectMappings?.mappings?.items?.map(item => ({
        id: item.project.id,
        name: item.project.name,
        status: item.mappingStatus,
        mapId: item.procoreProjectId,
        isDisabled: item.isDisabled,
      })),
    [procoreProjectMappings]
  );

  useEffect(() => {
    if (!projectMappingsReady) {
      fetchProcoreProjects(clientId);
      fetchProcoreProjectMappings(clientId);
    }
  }, [clientId, fetchProcoreProjects, fetchProcoreProjectMappings, projectMappingsReady]);

  const saveProjectMappings = useCallback(
    (mappings: INewMapping[]) => {
      saveProcoreProjectMappings(
        clientId,
        mappings.map(mapping => ({ projectId: mapping.itemId, procoreProjectId: mapping.mapId, isDisabled: mapping.disabled }))
      );
    },
    [clientId, saveProcoreProjectMappings]
  );

  return (
    <>
      {projectMappingsIsLoading && 'Loading...'}
      {projectMappingsLoadingError && 'Error while loading Procore Data...'}
      {!projectMappingsLoadingError && projectMappingsReady && (
        <Mapping
          onSave={saveProjectMappings}
          options={projectOptions}
          items={projectItems}
          saving={procoreProjectMappingsSaving?.isLoading || procoreProjectMappingsLoading?.isLoading}
        />
      )}
    </>
  );
};

export default memo(ProjectMappingsTab);
