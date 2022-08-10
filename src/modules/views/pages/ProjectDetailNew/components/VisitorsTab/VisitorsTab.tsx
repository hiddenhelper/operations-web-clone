import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Pagination from '../../../../shared/Pagination';
import ControlledInput from '../../../../shared/FormHandler/ControlledInput';
import ControlledError from '../../../../shared/FormHandler/ControlledError';
import ControlledMaskInput from '../../../../shared/FormHandler/ControlledMaskInput';
import EmptyList from '../../../../shared/EmptyList';
import Modal from '../../../../shared/Modal';
import Confirm from '../../../../shared/Modal/components/Confirm';
import SelectFilter from '../../../../shared/SelectFilter';
import VisitorBadgeModal from './components/VisitorBadgeModal';
import VisitorBadgeDrawer from './components/VisitorBadgeDrawer';
import AssignVisitorBadgeModal from './components/AssignVisitorBadgeModal';
import VisitorRow from './VisitorRow';
import { BadgeModel, GeneralModel, ProjectModel, UserModel } from '../../../../../models';
import { EBadgeIcon } from '../../../../../../constants';
import { noop, getDefaultValue } from '../../../../../../utils/generalUtils';
import { useStyles as useButtonStyles } from '../../../../shared/FormHandler/ControlledButton/styles';
import { tableGlobalStyles } from '../../../../../../assets/styles';
import { useStyles as modalStyles } from '../../../../shared/Modal/style';
import { useStyles } from '../../styles';
import PermissionGuard from 'modules/views/shared/PermissionGuard';
import { hasValidPermissions } from 'modules/models/user';

export interface IVisitorsTabProps {
  projectId: string;
  isFcAdmin: boolean;
  queryParams: GeneralModel.IQueryParams;
  currentProject: ProjectModel.IProject;
  visitorCount: number;
  visitorMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<BadgeModel.IBadgeVisitor>>;
  ctaDisabled: boolean;
  drawer: { open: boolean; id: string };
  projectListElement: React.ReactNode;
  projectBadgeVisitorLoading: GeneralModel.ILoadingStatus;
  saveBadgeVisitorLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  updateBadgeDataLoading: GeneralModel.ILoadingStatus;
  badgeVisitorEntityLoading: GeneralModel.ILoadingStatus;
  currentUserPermissions: UserModel.IPermission[];
  setDrawer: ({ open: boolean, id: string }) => void;
  onPageChange: (page: number) => void;
  unassignBadgeVisitor: (id: string, badgeVisitor: BadgeModel.IBadgeVisitor) => void;
  saveBadgeVisitor: (id: string, number: number) => void;
  clearProjectMap: () => void;
  clearSaveBadgeLoading: () => void;
  fetchProjectBadgeVisitorList: (id: string, query: GeneralModel.IQueryParams) => void;
  fetchBadgeVisitorEntityList: (id: string) => void;
  setQueryParams: (params) => void;
}

const VisitorsTab = ({
  projectId,
  isFcAdmin,
  visitorCount,
  queryParams,
  currentProject,
  visitorMap,
  projectListElement,
  ctaDisabled,
  drawer,
  projectBadgeVisitorLoading,
  saveBadgeVisitorLoading,
  updateLoading,
  updateBadgeDataLoading,
  badgeVisitorEntityLoading,
  currentUserPermissions,
  setDrawer,
  onPageChange,
  saveBadgeVisitor,
  unassignBadgeVisitor,
  clearProjectMap,
  clearSaveBadgeLoading,
  fetchProjectBadgeVisitorList,
  fetchBadgeVisitorEntityList,
  setQueryParams,
}: IVisitorsTabProps) => {
  const tableGlobalClasses = tableGlobalStyles();
  const buttonStyles = useButtonStyles();
  const modalClasses = modalStyles();
  const classes = useStyles();

  const [visitorBadgeModal, setVisitorBadgeModal] = useState({ id: null, open: false });
  const [assignVisitorBadgeModal, setAssignVisitorBadgeModal] = useState({ id: null, open: false });
  const [isCreateModalOpen, setCreateModal] = useState<boolean>(false);
  const [badgeNumber, setBadgeNumber] = useState<number>(0);

  const isConfirmDisabled = useMemo(
    () => badgeNumber === 0 || (badgeNumber > 50 && !hasValidPermissions(UserModel.BadgesPermission.MANAGE, currentUserPermissions)),
    [badgeNumber, currentUserPermissions]
  );
  const projectListHeight = (projectListElement as any)?.offsetHeight;

  const visitorBadgeList = useMemo(() => (currentProject.id && Object.keys(visitorMap).length ? Object.values(visitorMap[currentProject.id]) : []), [
    visitorMap,
    currentProject,
  ]);

  const countVisitors = useMemo(() => Math.ceil(visitorCount / queryParams.limit), [visitorCount, queryParams.limit]);

  const entityFilterOptionList = useMemo(() => [{ value: '', label: 'All Entities' }, ...BadgeModel.entityOptionList], []);

  const openModal = useCallback(() => setCreateModal(true), [setCreateModal]);
  const closeModal = useCallback(() => setCreateModal(false), [setCreateModal]);

  const onOpenDrawer = useCallback((id: string) => setDrawer({ id, open: true }), [setDrawer]);
  const onCloseDrawer = useCallback(() => setDrawer({ open: false, id: null }), [setDrawer]);

  const openVisitorBadgeModal = useCallback((id: string) => setVisitorBadgeModal({ id, open: true }), [setVisitorBadgeModal]);
  const closeVisitorBadgeModal = useCallback(() => {
    onCloseDrawer();
    setVisitorBadgeModal({ id: null, open: false });
  }, [setVisitorBadgeModal, onCloseDrawer]);

  const openAssignVisitorBadgeModal = useCallback((id: string) => setAssignVisitorBadgeModal({ id, open: true }), [setAssignVisitorBadgeModal]);
  const closeAssignVisitorBadgeModal = useCallback(() => {
    onCloseDrawer();
    setAssignVisitorBadgeModal({ id: null, open: false });
  }, [onCloseDrawer, setAssignVisitorBadgeModal]);

  const getBadgeVisitor = useCallback(
    (id: string) => {
      return visitorMap && visitorMap[currentProject.id] && visitorMap[currentProject.id][id]
        ? visitorMap[currentProject.id][id]
        : BadgeModel.getFallbackBadgeVisitor();
    },
    [currentProject.id, visitorMap]
  );

  const onChangeBadgeNumber = useCallback(
    event => {
      event.persist();
      const badgeCount = Number(event.target.value);
      setBadgeNumber(badgeCount);
    },
    [setBadgeNumber]
  );
  const onConfirm = useCallback(() => {
    saveBadgeVisitor(currentProject.id, badgeNumber);
  }, [badgeNumber, currentProject, saveBadgeVisitor]);

  const onUnassignBadgeVisitor = useCallback(
    (id: string) => {
      unassignBadgeVisitor(id, {
        ...visitorMap[currentProject.id][id],
        visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.AVAILABLE,
        availability: BadgeModel.VisitorAvailability.AVAILABLE,
      });
    },
    [currentProject, visitorMap, unassignBadgeVisitor]
  );

  const onFilterEntityChange = useCallback(
    (entity: number) => {
      setQueryParams({ ...queryParams, entity });
    },
    [setQueryParams, queryParams]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (saveBadgeVisitorLoading && !saveBadgeVisitorLoading.isLoading) {
      fetchProjectBadgeVisitorList(currentProject.id, queryParams);
      clearSaveBadgeLoading();
      closeModal();
      setBadgeNumber(0);
    }
  }, [saveBadgeVisitorLoading, currentProject.id, queryParams, setBadgeNumber, closeModal, clearSaveBadgeLoading, fetchProjectBadgeVisitorList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (hasValidPermissions(UserModel.BadgesPermission.VIEWACCESS, currentUserPermissions)) fetchBadgeVisitorEntityList(currentProject.id);
    fetchProjectBadgeVisitorList(currentProject.id, queryParams);
  }, [currentProject.id, queryParams, currentUserPermissions, fetchProjectBadgeVisitorList, fetchBadgeVisitorEntityList]);

  useEffect(() => {
    /* istanbul ignore else */
    if (updateLoading && !updateLoading.isLoading && !updateLoading.hasError) {
      if (hasValidPermissions(UserModel.BadgesPermission.VIEWACCESS, currentUserPermissions)) fetchBadgeVisitorEntityList(currentProject.id);
      fetchProjectBadgeVisitorList(currentProject.id, queryParams);
      onCloseDrawer();
      closeModal();
      closeAssignVisitorBadgeModal();
    }
  }, [
    updateLoading,
    currentProject.id,
    queryParams,
    currentUserPermissions,
    closeAssignVisitorBadgeModal,
    closeModal,
    onCloseDrawer,
    fetchProjectBadgeVisitorList,
    fetchBadgeVisitorEntityList,
  ]);

  useEffect(() => {
    /* istanbul ignore else */
    if (updateBadgeDataLoading && !updateBadgeDataLoading.isLoading && !updateBadgeDataLoading.hasError) {
      fetchProjectBadgeVisitorList(projectId, queryParams);
    }
  }, [updateBadgeDataLoading, projectId, queryParams, fetchProjectBadgeVisitorList]);

  useEffect(() => {
    return function unMount() {
      onCloseDrawer();
      clearProjectMap();
    };
  }, [clearProjectMap, onCloseDrawer]);

  if (projectBadgeVisitorLoading && projectBadgeVisitorLoading.isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        <div className={`${tableGlobalClasses.filterActionsContainer} ${tableGlobalClasses.filterActionsContainerPadding} ${classes.createBadgeWrapper}`}>
          <Box className={`${tableGlobalClasses.filterStatusContainer} ${tableGlobalClasses.autocompleteFilterStatus}`}>
            <div className={`${classes.buttonSpacer}`}>
              <SelectFilter
                value={getDefaultValue(BadgeModel.visitorEntityMap[queryParams.entity], 'All Entities')}
                optionList={entityFilterOptionList}
                onChange={onFilterEntityChange}
              />
            </div>
          </Box>
          <PermissionGuard permissionsExpression={`${UserModel.VisitorsPermission.MANAGE} AND ${UserModel.BadgesPermission.MANAGE}`}>
            <Button
              className={`${buttonStyles.createButton} ${buttonStyles.primaryButtonLarge}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              size="large"
              data-testid="open-create-badge-modal-btn"
              onClick={openModal}
              disabled={ctaDisabled}
            >
              Create Badges
            </Button>
          </PermissionGuard>
        </div>
        {(!projectBadgeVisitorLoading || (projectBadgeVisitorLoading && !projectBadgeVisitorLoading.isLoading)) && visitorBadgeList.length === 0 ? (
          <EmptyList styleClass={classes.emptyTabBadgeIcon} icon={<EBadgeIcon />} text="There are no Visitor Badges" />
        ) : (
          <>
            <Table aria-label="visitor-badge-list">
              <TableHead>
                <TableRow className={tableGlobalClasses.fontHeadAccent}>
                  <TableCell>Badge ID</TableCell>
                  <TableCell>Badge Code</TableCell>
                  <TableCell>Visitor Name</TableCell>
                  <TableCell>Entity</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visitorBadgeList.map(visitor => (
                  <VisitorRow key={visitor.id} visitor={visitor} openBadge={openVisitorBadgeModal} openDrawer={onOpenDrawer} />
                ))}
              </TableBody>
            </Table>
            <Pagination page={queryParams.page} count={countVisitors} onChange={onPageChange} />
          </>
        )}
      </div>
      <Modal
        show={isCreateModalOpen}
        onClose={closeModal}
        styleClass={classes.visitorModal}
        render={() => (
          <Confirm
            title="Create Visitor Badges"
            backgroundTitle={true}
            confirmLabel="Create"
            confirmLoadingText="Creating..."
            closeLabel="Close"
            onConfirm={onConfirm}
            onClose={closeModal}
            isLoading={saveBadgeVisitorLoading && saveBadgeVisitorLoading.isLoading}
            backgroundContent={classes.modalContentWrapper}
            confirmButtonStyleClass={classes.confirmCta}
            backgroundButtonWrapper={true}
            disableConfirm={isConfirmDisabled}
            content={
              <div>
                <Typography className={`${classes.modalTextMarginBottom} ${modalClasses.modalContentSecondaryText}`}>
                  Please select the Number of Visitor Badges you would like to generate. You can select between 1 and 50 Badges at a time.
                </Typography>
                <div>
                  <ControlledError show={false} error={null}>
                    <ControlledInput label="Number of Badges">
                      <TextField
                        variant="outlined"
                        placeholder="0"
                        type="text"
                        autoComplete="off"
                        fullWidth={true}
                        name="name"
                        value={badgeNumber}
                        onChange={onChangeBadgeNumber}
                        className={classes.modalInput}
                        inputProps={{
                          'data-testid': 'badge-number',
                          mask: [/\d/, /\d/],
                          placeholderChar: '0',
                          showMask: true,
                          guide: false,
                          maxLength: 2,
                        }}
                        InputProps={{
                          inputComponent: ControlledMaskInput as any,
                        }}
                      />
                    </ControlledInput>
                  </ControlledError>
                </div>
              </div>
            }
          />
        )}
      />
      <VisitorBadgeDrawer
        badgeVisitor={getBadgeVisitor(drawer.id)}
        height={projectListHeight}
        isOpen={drawer.open}
        isLoading={undefined}
        updateLoading={updateLoading}
        onClose={onCloseDrawer}
        onOpenAssign={openAssignVisitorBadgeModal}
        onUnassign={onUnassignBadgeVisitor}
      />
      {assignVisitorBadgeModal.open && (
        <AssignVisitorBadgeModal
          projectId={projectId}
          updateLoading={updateLoading}
          badgeVisitor={getBadgeVisitor(assignVisitorBadgeModal.id)}
          closeModal={closeAssignVisitorBadgeModal}
          clearErrors={noop}
        />
      )}
      {visitorBadgeModal.open && (
        <VisitorBadgeModal project={currentProject} badgeVisitor={getBadgeVisitor(visitorBadgeModal.id)} closeModal={closeVisitorBadgeModal} />
      )}
    </>
  );
};

export default memo(VisitorsTab);
