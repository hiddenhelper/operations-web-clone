import React, { Fragment, memo, useState, useMemo, useCallback, useEffect } from 'react';

import { Box, Typography, Button, Divider, Grid } from '@material-ui/core';

import EmptyList from 'modules/views/shared/EmptyList';
import Modal from 'modules/views/shared/Modal';
import Confirm from 'modules/views/shared/Modal/components/Confirm';
import AssignAccessControlSystemModal from './components/AssignAccessControlSystemModal';
import AccessControlSystemTabDrawer from './components/AccessControlSystemTabDrawer';
import RoleGuard from 'modules/views/shared/RoleGuard';
import SelectFilter from 'modules/views/shared/SelectFilter/SelectFilter';

import { GeneralModel, AccessControlSystemModel, ProjectModel, UserModel } from 'modules/models';
import { GENERAL, InventoryIcon } from 'constants/index';
import { getDefaultValue } from 'utils/generalUtils';
import { useStyles as modalStyles } from 'modules/views/shared/Modal/style';
import { useStyles as buttonStyles } from 'modules/views/shared/FormHandler/ControlledButton/styles';
import { tableGlobalStyles } from 'assets/styles';

import AccessControlSystemExpansibleList from './components/AccessControlSystemExpansibleList';
import { useStyles } from '../../styles';

export interface IAccessControlSystemTab {
  queryParams: GeneralModel.IQueryParams;
  currentProject: ProjectModel.IProject;
  accessControlSystemMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  modalMap: GeneralModel.IEntityMap<AccessControlSystemModel.IAccessControlSystem>;
  accessControlSystemCount: number;
  projectAccessControlSystem: AccessControlSystemModel.IProjectAccessControlSystem;
  accessControlSystemSummaryLoading: GeneralModel.ILoadingStatus;
  assignLoading: GeneralModel.ILoadingStatus;
  loadAccessControlSystemModalLoading: GeneralModel.ILoadingStatus;
  unassignAccessControlSystemLoading: GeneralModel.ILoadingStatus;
  accessControlSystemProjectLoading: GeneralModel.ILoadingStatus;
  accessControlSystemAssignProjectLoading: GeneralModel.ILoadingStatus;
  updateProjectAccessControlSystemLoading: GeneralModel.ILoadingStatus;
  assignAccessControlSystemLoading: GeneralModel.ILoadingStatus;
  accessControlSystemLoading: GeneralModel.ILoadingStatus;
  modalCount: number;
  projectListElement: React.ReactNode;
  isModalOpen: boolean;
  ctaDisabled: boolean;
  drawer: { open: boolean; id: string };
  onPageChange: (page: number) => void;
  openModal: () => void;
  closeModal: () => void;
  setDrawer: ({ open: boolean, id: string }) => void;
  fetchProjectAccessControlSystem: (projectId: string, acsId: string) => void;
  fetchAccessControlSystemList: (query: GeneralModel.IQueryParams) => void;
  fetchAccessControlSystemSummary: (acsId: string) => void;
  assignAccessControlSystem: (id: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) => void;
  updateAccessControlSystem: (projectId: string, acsId: string, acs: AccessControlSystemModel.IProjectAccessControlSystem) => void;
  unAssignAccessControlSystem: (projectId: string, acsId: string) => void;
  fetchProjectAccessControlSystemList: (id: string, query: GeneralModel.IQueryParams) => void;
  clearLoading: (key: string) => void;
  setQueryParams: (params) => void;
}

const AccessControlSystemTab = ({
  queryParams,
  currentProject,
  accessControlSystemCount,
  accessControlSystemMap,
  projectAccessControlSystem,
  projectListElement,
  modalCount,
  modalMap,
  isModalOpen,
  ctaDisabled,
  drawer,
  assignLoading,
  accessControlSystemSummaryLoading,
  loadAccessControlSystemModalLoading,
  unassignAccessControlSystemLoading,
  accessControlSystemProjectLoading,
  accessControlSystemAssignProjectLoading,
  updateProjectAccessControlSystemLoading,
  assignAccessControlSystemLoading,
  accessControlSystemLoading,
  assignAccessControlSystem,
  openModal,
  closeModal,
  fetchProjectAccessControlSystem,
  fetchAccessControlSystemList,
  fetchAccessControlSystemSummary,
  fetchProjectAccessControlSystemList,
  updateAccessControlSystem,
  unAssignAccessControlSystem,
  onPageChange,
  setDrawer,
  clearLoading,
  setQueryParams,
}: IAccessControlSystemTab) => {
  const tableGlobalClasses = tableGlobalStyles();
  const buttonClasses = buttonStyles();
  const modalClasses = modalStyles();
  const classes = useStyles();

  const projectListHeight = (projectListElement as any)?.offsetHeight;
  const [unAssignModal, setUnAssignModal] = useState({ open: false, id: null, type: null });
  const [editAcs, setEditAcs] = useState(null);

  const accessControlSystemList = useMemo<AccessControlSystemModel.IProjectAccessControlSystemByLocation[]>(
    () =>
      currentProject.acsIdListByLocation
        ? currentProject.acsIdListByLocation.map(locationItem => ({
            location: locationItem.location,
            accessControlSystems: locationItem.accessControlSystems.map(acsId => accessControlSystemMap[acsId]).filter(Boolean),
          }))
        : [],
    [accessControlSystemMap, currentProject.acsIdListByLocation]
  );
  const hasItemsWithLocation = useMemo<boolean>(() => !!accessControlSystemList.find(item => item.location !== null), [accessControlSystemList]);

  const acsTypeFilterOptionList = useMemo(() => [{ value: '', label: 'All ACS' }, ...AccessControlSystemModel.typeOptionList], []);

  const onOpenDrawer = useCallback(
    (acsId: string) => {
      fetchAccessControlSystemSummary(acsId);
      setDrawer({ open: true, id: acsId });
    },
    [setDrawer, fetchAccessControlSystemSummary]
  );
  const onCloseDrawer = useCallback(/* istanbul ignore next */ () => setDrawer({ open: false, id: null }), [setDrawer]);

  const onCloseUnAssignModal = useCallback(() => {
    setUnAssignModal(prevState => ({ ...prevState, open: false, id: null }));
  }, [setUnAssignModal]);

  const onCloseAssignModal = useCallback(() => {
    setEditAcs(null);
    closeModal();
  }, [setEditAcs, closeModal]);

  const onEdit = useCallback(
    (id: string) => {
      onCloseDrawer();
      setEditAcs(id);
    },
    [setEditAcs, onCloseDrawer]
  );

  const onUnAssign = useCallback(
    id => {
      setUnAssignModal({ open: true, id, type: AccessControlSystemModel.accessControlSystemTypeMap[accessControlSystemMap[id].type] });
    },
    [setUnAssignModal, accessControlSystemMap]
  );

  const onUnAssignConfirm = useCallback(() => unAssignAccessControlSystem(currentProject.id, unAssignModal.id), [
    currentProject.id,
    unAssignModal.id,
    unAssignAccessControlSystem,
  ]);

  const onFilterAcsTypeChange = useCallback(
    (type: number) => {
      setQueryParams({ ...queryParams, type });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    if (editAcs) openModal();
  }, [editAcs, openModal]);

  useEffect(() => {
    /* istanbul ignore else */
    if (unassignAccessControlSystemLoading && !unassignAccessControlSystemLoading.isLoading) {
      onCloseUnAssignModal();
      onCloseDrawer();
    }
  }, [unassignAccessControlSystemLoading, onCloseUnAssignModal, onCloseDrawer]);

  useEffect(() => {
    if (isModalOpen) onCloseDrawer();
  }, [isModalOpen, onCloseDrawer]);

  useEffect(() => {
    /* istanbul ignore else */
    if (assignLoading && !assignLoading.isLoading && !assignLoading.hasError) {
      onCloseDrawer();
    }
  }, [assignLoading, onCloseDrawer]);

  useEffect(() => {
    /* istanbul ignore else */
    if (
      (assignAccessControlSystemLoading && !assignAccessControlSystemLoading.isLoading && !assignAccessControlSystemLoading.hasError) ||
      (updateProjectAccessControlSystemLoading && !updateProjectAccessControlSystemLoading.isLoading && !updateProjectAccessControlSystemLoading.hasError)
    ) {
      closeModal();
      clearLoading(GENERAL.LOADING_KEY.ASSIGN_ACCESS_CONTROL_SYSTEM_PROJECT);
      clearLoading(GENERAL.LOADING_KEY.UPDATE_PROJECT_ACCESS_CONTROL_SYSTEM_PROJECT);
      fetchProjectAccessControlSystemList(currentProject.id, queryParams);
    }
  }, [
    assignAccessControlSystemLoading,
    updateProjectAccessControlSystemLoading,
    currentProject.id,
    queryParams,
    closeModal,
    fetchProjectAccessControlSystemList,
    clearLoading,
  ]);

  useEffect(() => {
    fetchProjectAccessControlSystemList(currentProject.id, queryParams);
  }, [currentProject.id, queryParams, fetchProjectAccessControlSystemList]);

  useEffect(() => {
    return function unMount() {
      onCloseDrawer();
    };
  }, [onCloseDrawer]);

  if (accessControlSystemLoading && accessControlSystemLoading.isLoading) {
    return <>Loading...</>;
  }

  const renderAcsItem = (acs: AccessControlSystemModel.IAccessControlSystem) => (
    <Grid container={true} alignItems="center" style={{ cursor: 'pointer', height: '100%' }} data-testid="acs-item" onClick={() => onOpenDrawer(acs.id)}>
      <Grid item={true} xs={true}>
        <Typography>{acs.deviceName}</Typography>
      </Grid>
      <Grid item={true} xs={true}>
        <Typography>{AccessControlSystemModel.accessControlSystemTypeMap[acs.type]}</Typography>
      </Grid>
      <Grid item={true} xs={true}>
        <Typography>{acs.serialNumber}</Typography>
      </Grid>
      <Grid item={true} xs={true}>
        <Typography>{getDefaultValue(acs.reader1SerialNumber)}</Typography>
      </Grid>
      <Grid item={true} xs={true}>
        <Typography>{getDefaultValue(acs.reader2SerialNumber)}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <div>
        <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding}`}>
          <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus} ${classes.acsFilterWrapper}`}>
            <SelectFilter
              value={getDefaultValue(AccessControlSystemModel.accessControlSystemTypeMap[queryParams.type], 'All ACS')}
              optionList={acsTypeFilterOptionList}
              onChange={onFilterAcsTypeChange}
            />
          </Box>
          <RoleGuard roleList={[UserModel.Role.FCA_ADMIN]}>
            <Button
              className={`${buttonClasses.createButton} ${buttonClasses.primaryButtonExtraLarge}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              size="large"
              data-testid="open-acs-modal-btn"
              onClick={openModal}
              disabled={ctaDisabled}
            >
              Assign ACS
            </Button>
          </RoleGuard>
        </div>
        {accessControlSystemProjectLoading && !accessControlSystemProjectLoading.isLoading && accessControlSystemList.length === 0 ? (
          <EmptyList icon={<InventoryIcon />} text="There are no ACS assigned" />
        ) : (
          <>
            <Grid container={true} className={`${classes.acsListItemWrapper} ${classes.acsListHeader}`}>
              <Grid item={true} xs={true}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item={true} xs={true}>
                <Typography>Device Type</Typography>
              </Grid>
              <Grid item={true} xs={true}>
                <Typography>Serial Number</Typography>
              </Grid>
              <Grid item={true} xs={true}>
                <Typography>Reader 1</Typography>
              </Grid>
              <Grid item={true} xs={true}>
                <Typography>Reader 2</Typography>
              </Grid>
            </Grid>
            <Divider className={classes.acsListHeaderDivide} />
            {accessControlSystemList
              .filter(item => item.location !== null)
              .map(acsByLocation => (
                <AccessControlSystemExpansibleList
                  key={acsByLocation.location.id}
                  id={acsByLocation.location.id}
                  title={acsByLocation.location.name}
                  items={acsByLocation.accessControlSystems}
                  getItemKey={item => item.id}
                  renderItem={renderAcsItem}
                />
              ))}

            {accessControlSystemList
              .filter(item => item.location === null)
              .map(acsByLocation => (
                <Fragment key="no-location-devices">
                  {hasItemsWithLocation && <Divider className={classes.acsListDivider} />}
                  <Box className={classes.acsListItemWrapper} data-testid="no-location-item-wrapper">
                    {acsByLocation.accessControlSystems.map(acs => (
                      <Box key={acs.id} className={classes.acsListItem}>
                        {renderAcsItem(acs)}
                      </Box>
                    ))}
                  </Box>
                </Fragment>
              ))}
          </>
        )}
        <AccessControlSystemTabDrawer
          isOpen={drawer?.open}
          isLoading={accessControlSystemSummaryLoading}
          accessControlSystem={accessControlSystemMap[drawer?.id] || AccessControlSystemModel.getFallbackAccessControlSystem()}
          unAssign={onUnAssign}
          onEdit={onEdit}
          onCloseDrawer={onCloseDrawer}
          height={projectListHeight}
        />
        {isModalOpen && (
          <AssignAccessControlSystemModal
            acsId={editAcs}
            isEditable={!!editAcs}
            count={modalCount}
            modalMap={modalMap}
            projectId={currentProject.id}
            projectLocations={currentProject.locations}
            loading={loadAccessControlSystemModalLoading}
            assignLoading={assignLoading}
            accessControlSystemMap={accessControlSystemMap}
            projectAccessControlSystem={projectAccessControlSystem}
            accessControlSystemAssignProjectLoading={accessControlSystemAssignProjectLoading}
            unassignAccessControlSystemAssignProjectLoading={accessControlSystemSummaryLoading}
            updateProjectAccessControlSystemLoading={updateProjectAccessControlSystemLoading}
            fetchAccessControlSystemList={fetchAccessControlSystemList}
            fetchProjectAccessControlSystem={fetchProjectAccessControlSystem}
            assignAccessControlSystem={assignAccessControlSystem}
            updateAccessControlSystem={updateAccessControlSystem}
            fetchAccessControlSystemSummary={fetchAccessControlSystemSummary}
            closeModal={onCloseAssignModal}
            clearLoading={clearLoading}
          />
        )}
      </div>
      <Modal
        show={unAssignModal.open}
        styleClass={`${modalClasses.dialogContainer} ${unAssignModal.open ? 'open' : 'closed'}`}
        onClose={onCloseUnAssignModal}
        render={() => (
          <Confirm
            title={`Unassign ${unAssignModal.type}?`}
            content={<Typography className={modalClasses.modalContentText}>If you do it, the device will be removed from {currentProject.name}.</Typography>}
            closeLabel="Close"
            confirmLabel="Yes, Unassign"
            confirmLoadingText="Unassigning..."
            isLoading={unassignAccessControlSystemLoading && unassignAccessControlSystemLoading.isLoading}
            onClose={onCloseUnAssignModal}
            onConfirm={onUnAssignConfirm}
          />
        )}
      />
    </>
  );
};

export default memo(AccessControlSystemTab);
