import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

import Container from 'modules/views/shared/Container';
import PageTitle from 'modules/views/shared/PageTitle';

import ProjectMappingsTabContainer from './components/ProjectMappingsTab';
import VendorMappingsTabContainer from './components/VendorMappingsTab';
import { ConfigureReportFrequency } from './components';

import { ClientModel, GeneralModel, ProcoreModel } from 'modules/models';
import { isUUID, getConditionalDefaultValue, getDefaultValue } from 'utils';
import { tableGlobalStyles } from 'assets/styles';
import { useStyles } from './styles';

const breadcrumbs = [{ label: 'Procore Clients', link: '/procore-clients' }, { label: 'Client Mapping' }];

export interface IProcoreMappingProps {
  fetchClient: (companyId: string) => void;
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  clientLoading: GeneralModel.ILoadingStatus;
  fetchProcoreReportFrequency: (clientId: string) => void;
  saveProcoreReportFrequency: (clientId: string, frequency: number) => void;
  procoreReportFrequency: number;
  procoreSaveReportFrequencyLoading: GeneralModel.ILoadingStatus;
}

const ProcoreMapping = ({
  fetchClient,
  clientMap,
  procoreReportFrequency,
  procoreSaveReportFrequencyLoading,
  fetchProcoreReportFrequency,
  saveProcoreReportFrequency,
}: IProcoreMappingProps) => {
  const classes = useStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const { id, step } = useParams<{ id?: string; step?: string }>();
  const clientId = useMemo(() => (/* istanbul ignore next */ isUUID(id) ? id : null), [id]);
  const currentTab = getDefaultValue(step, ProcoreModel.MappingTabType.PROJECTS);
  const tabList = useMemo(() => Object.values(ProcoreModel.tabMap), []);
  const currentClient = useMemo(() => clientMap[clientId], [clientMap, clientId]);
  const projectListRef = useRef();

  useEffect(() => {
    fetchClient(clientId);
  }, [clientId, fetchClient]);

  useEffect(() => {
    fetchProcoreReportFrequency(clientId);
  }, [clientId, fetchProcoreReportFrequency]);

  const handleSaveProcoreReportFrequency = /* istanbul ignore next */ (frequency: number) => {
    saveProcoreReportFrequency(clientId, frequency);
  };

  return (
    <Container id="project-detail" ref={projectListRef}>
      <PageTitle
        breadcrumb={breadcrumbs}
        title={currentClient?.name}
        right={
          <ConfigureReportFrequency
            procoreReportFrequency={procoreReportFrequency}
            handleSaveProcoreReportFrequency={handleSaveProcoreReportFrequency}
            procoreSaveReportFrequencyLoading={procoreSaveReportFrequencyLoading}
          />
        }
      />
      <div className={classes.statusFilter}>
        {tabList.map(optFilter => (
          <Link tabIndex={-1} key={optFilter.id} to={`/procore-clients/client-mapping/${clientId}/${optFilter.key}`} data-testid="filter-status-opt">
            <Button className={getConditionalDefaultValue(optFilter.key === currentTab, classes.activeFilter, '')}>{optFilter.title}</Button>
          </Link>
        ))}
      </div>
      <div className={tableGlobalClasses.tableWrapper}>
        {currentTab === ProcoreModel.MappingTabType.PROJECTS && <ProjectMappingsTabContainer clientId={clientId} />}
        {currentTab === ProcoreModel.MappingTabType.VENDORS && <VendorMappingsTabContainer clientId={clientId} />}
      </div>
    </Container>
  );
};

export default memo(ProcoreMapping);
