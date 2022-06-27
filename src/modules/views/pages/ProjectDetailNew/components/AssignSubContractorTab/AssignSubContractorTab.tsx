import React, { memo, useMemo, useEffect, useState, useCallback } from 'react';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import SelectFilter from '../../../../shared/SelectFilter';
import AutocompleteFilter from '../../../../shared/AutocompleteFilter';
import AssignSubContractorModal from './components/AssignSubContractorModal';
import ListView from './components/ListView';
import HirearchyView from './components/HirearchyView';

import { GeneralModel, ProjectModel, ResourceModel } from '../../../../../models';
import { HierarchyIcon, ListIcon } from '../../../../../../constants';
import { getConditionalDefaultValue, getDefaultValue } from '../../../../../../utils/generalUtils';
import { useLocationFilter } from '../../../../../../utils/useLocationFilter';
import { useStyles as buttonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useStyles } from '../../styles';

export interface IAssignSubContractorTabProps {
  currentProject: ProjectModel.IProject;
  queryParams: GeneralModel.IQueryParams;
  isModalOpen: boolean;
  ctaDisabled: boolean;
  drawer: { open: boolean; id: string };
  setDrawer: ({ open: boolean, id: string }) => void;
  openModal: () => void;
  closeModal: () => void;
  onPageChange: (page: number) => void;
  setQueryParams: (params: GeneralModel.IQueryParams) => void;
  clearClientMap: () => void;
}

const AssignSubContractorTab = ({
  queryParams,
  isModalOpen,
  ctaDisabled,
  currentProject,
  drawer,
  setDrawer,
  openModal,
  closeModal,
  onPageChange,
  clearClientMap,
  setQueryParams,
}: IAssignSubContractorTabProps) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const tableGlobalClasses = tableGlobalStyles();
  const [activeView, setActiveView] = useState<ResourceModel.ListViewType>(ResourceModel.ListViewType.LIST);

  const isListView = useMemo(() => activeView === ResourceModel.ListViewType.LIST, [activeView]);
  const isHierarchyView = useMemo(() => activeView === ResourceModel.ListViewType.HIERARCHY, [activeView]);

  const [locationOptionList, locationLabel, onLocationChange, , , locationCode] = useLocationFilter({ queryParams, setQueryParams });

  const handleListViewClick = useCallback(() => {
    /* istanbul ignore else */
    if (!isListView) {
      clearClientMap();
      setActiveView(ResourceModel.ListViewType.LIST);
    }
  }, [isListView, setActiveView, clearClientMap]);

  const handleHierarchyViewClick = useCallback(() => {
    /* istanbul ignore else */
    if (!isHierarchyView) {
      clearClientMap();
      setActiveView(ResourceModel.ListViewType.HIERARCHY);
    }
  }, [isHierarchyView, setActiveView, clearClientMap]);

  const onFilterRoleChange = useCallback(
    (role: number) => {
      setQueryParams({ ...queryParams, role });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    return function unMount() {
      clearClientMap();
    };
  }, [clearClientMap]);
  return (
    <>
      <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
        <div className={tableGlobalClasses.filterActionsContainerLeft}>
          <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus} ${tableGlobalClasses.leftFilter}`}>
            <SelectFilter
              value={getDefaultValue(ProjectModel.roleMap[queryParams.role], 'All Roles')}
              optionList={ProjectModel.roleListOptions}
              onChange={onFilterRoleChange}
            />
          </Box>
          <Divider className={tableGlobalClasses.dividerColor} orientation="vertical" flexItem={true} />
          <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.leftFilterStatusContainer} ${classes.autocompleteFilterPosition}`}>
            <AutocompleteFilter value={locationCode} optionList={locationOptionList} onChange={onLocationChange} label={locationLabel} />
          </Box>
        </div>
        <div className={tableGlobalClasses.rightActionButtonsContainer}>
          <div className={tableGlobalClasses.iconActionButtonsContainer}>
            <ListIcon
              className={getConditionalDefaultValue(isListView, tableGlobalClasses.iconButtonActive, tableGlobalClasses.iconButtonInactive)}
              role="button"
              onClick={handleListViewClick}
              data-testid="list-view-btn"
            />
            <HierarchyIcon
              className={getConditionalDefaultValue(isHierarchyView, tableGlobalClasses.iconButtonActive, tableGlobalClasses.iconButtonInactive)}
              role="button"
              onClick={handleHierarchyViewClick}
              data-testid="hierarchy-view-btn"
            />
          </div>
          <Button
            className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonExtraLarge}`}
            color="primary"
            variant="contained"
            fullWidth={true}
            size="large"
            data-testid="opensubcontractor-modal-btn"
            onClick={openModal}
            disabled={ctaDisabled}
          >
            Assign Subcontractor
          </Button>
        </div>
      </div>
      {isListView && (
        <ListView
          projectId={currentProject.id}
          queryParams={queryParams}
          drawer={drawer}
          setDrawer={setDrawer}
          onPageChange={onPageChange}
          closeModal={closeModal}
        />
      )}
      {isHierarchyView && <HirearchyView projectId={currentProject.id} closeModal={closeModal} />}
      {isModalOpen && <AssignSubContractorModal id={currentProject.id} closeModal={closeModal} />}
    </>
  );
};

export default memo(AssignSubContractorTab);
