import React, { memo, useMemo, useCallback, useEffect } from 'react';

import AssignList from './AssignList';

import { GeneralModel, ProjectModel, ClientModel } from '../../../../models';
import { useStyles } from '../styles';

export interface IAssignClientProps {
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  relatedCompanies: ProjectModel.IProjectCompany[];
  uiRelationMap: GeneralModel.IRelationUiMap;
  searchLoading: GeneralModel.ILoadingStatus;
  mwbeList: GeneralModel.INamedEntity[];
  currentStep: GeneralModel.IStep;
  onChange: (model: any) => void;
  update: (model: any) => void;
  fetchMwbeList: () => void;
  clearRelationMap: () => void;
  clearClientErrors: () => void;
  setRelationUiId: (key: string, value: any) => void;
  searchCompanies: (params: GeneralModel.IQueryParams, tempId) => void;
  createCompany: (client: ClientModel.IClient, step: GeneralModel.IStep, tempId: string) => void;
}

const AssignClient = ({
  clientMap,
  relatedCompanies,
  uiRelationMap,
  searchLoading,
  mwbeList,
  currentStep,
  onChange,
  update,
  fetchMwbeList,
  setRelationUiId,
  searchCompanies,
  createCompany,
  clearRelationMap,
  clearClientErrors,
}: IAssignClientProps) => {
  const noneOption = useMemo(() => (mwbeList.length > 0 ? mwbeList.find(option => option.name === 'None') : { id: '' }), [mwbeList]);
  const classes = useStyles();

  const filterByRole = useCallback(
    (role: ProjectModel.CompanyRole) =>
      relatedCompanies
        .filter(company => company.role === role)
        .map((company, index) => ({ ...company, tempId: company.tempId ? company.tempId : `temp-${role}-search-id-${index}` })),
    [relatedCompanies]
  );
  const initializeList = useCallback(
    (filteredList: ProjectModel.IProjectCompany[], role: ProjectModel.CompanyRole) =>
      filteredList.length === 0 ? [{ ...ProjectModel.getFallbackRelatedCompany(`temp-${role}-search-id-0`, role) }] : filteredList,
    []
  );
  const projectOwnerFilteredList = useMemo(() => filterByRole(ProjectModel.CompanyRole.DEVELOPER_PROJECT_OWNER), [filterByRole]);
  const projectOwnerList = useMemo(() => initializeList(projectOwnerFilteredList, ProjectModel.CompanyRole.DEVELOPER_PROJECT_OWNER), [
    initializeList,
    projectOwnerFilteredList,
  ]);

  const devFilteredList = useMemo(() => filterByRole(ProjectModel.CompanyRole.DEVELOPER), [filterByRole]);
  const developerList = useMemo(() => initializeList(devFilteredList, ProjectModel.CompanyRole.DEVELOPER), [initializeList, devFilteredList]);

  const gcFilteredList = useMemo(() => filterByRole(ProjectModel.CompanyRole.GENERAL_CONTRACTOR), [filterByRole]);
  const generalContractorList = useMemo(() => initializeList(gcFilteredList, ProjectModel.CompanyRole.GENERAL_CONTRACTOR), [initializeList, gcFilteredList]);
  const filteredSearchDeveloperList = useMemo(() => projectOwnerList.map(item => item.id).filter(Boolean), [projectOwnerList]);
  const filteredSearchProjectOwnerList = useMemo(() => developerList.map(item => item.id).filter(Boolean), [developerList]);

  const onCreateCompany = useCallback(
    (clientName: string, tempId: string, isDeveloper: boolean) => {
      const newClient = { ...ClientModel.getFallbackClient(), name: clientName, mwbeTypeId: noneOption.id, isDeveloper };
      createCompany(newClient, currentStep, tempId);
    },
    [currentStep, noneOption, createCompany]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (!mwbeList.length) fetchMwbeList();
  }, [mwbeList, fetchMwbeList]);

  useEffect(() => {
    return function unMount() {
      clearClientErrors();
      clearRelationMap();
    };
  }, [clearClientErrors, clearRelationMap]);
  return (
    <>
      <AssignList
        title="Project Owner"
        type={ProjectModel.CompanyRole.DEVELOPER_PROJECT_OWNER}
        list={projectOwnerList}
        params={{ isDeveloper: true, excludeCompanies: filteredSearchProjectOwnerList }}
        relatedList={[...generalContractorList, ...developerList]}
        clientMap={clientMap}
        uiRelationMap={uiRelationMap}
        loading={searchLoading}
        showAttentionIcon={true}
        showAdd={false}
        hideBottom={true}
        styleClass={classes.projectOwnerCard}
        secondaryText="You need one Owner and at least one General Contractor. All assigned clients must be approved."
        showTaxExempt={true}
        onChange={onChange}
        update={update}
        setRelationUiId={setRelationUiId}
        searchCompanies={searchCompanies}
        createCompany={onCreateCompany}
      />
      <AssignList
        title="Developer"
        type={ProjectModel.CompanyRole.DEVELOPER}
        list={developerList}
        params={{ isDeveloper: true, excludeCompanies: filteredSearchDeveloperList }}
        relatedList={[...generalContractorList, ...projectOwnerList]}
        showTaxExempt={true}
        clientMap={clientMap}
        uiRelationMap={uiRelationMap}
        loading={searchLoading}
        onChange={onChange}
        update={update}
        setRelationUiId={setRelationUiId}
        searchCompanies={searchCompanies}
        createCompany={onCreateCompany}
      />
      <AssignList
        title="General Contractor"
        type={ProjectModel.CompanyRole.GENERAL_CONTRACTOR}
        list={generalContractorList}
        params={{ isDeveloper: false }}
        relatedList={[...developerList, ...projectOwnerList]}
        showTaxExempt={true}
        clientMap={clientMap}
        uiRelationMap={uiRelationMap}
        loading={searchLoading}
        onChange={onChange}
        update={update}
        setRelationUiId={setRelationUiId}
        searchCompanies={searchCompanies}
        createCompany={onCreateCompany}
      />
    </>
  );
};

export default memo(AssignClient);
