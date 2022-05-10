import React, { memo, useCallback, useMemo, useState } from 'react';
import { Button, Divider } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card/Card';
import ControlledButton from 'modules/views/shared/FormHandler/ControlledButton';
import DeleteModal from 'modules/views/shared/Modal/components/Delete/Delete';
import Modal from 'modules/views/shared/Modal';

import CertificationGroup from './components/CertificationGroup';
import TrainingGroup from './components/TrainingGroup';

import { GeneralModel, ProjectModel } from 'modules/models';
import { AddIcon } from 'constants/index';
import { getConditionalDefaultValue } from 'utils/generalUtils';
import { formGlobalStyles } from 'assets/styles';
import { useStyles as modalStyles } from 'modules/views/shared/Modal/style';
import { useStyles as buttonStyles } from 'modules/views/shared/FormHandler/ControlledButton/styles';
import { useStyles } from '../styles';

export interface ICertificationsAndTrainingProps {
  certificationList: GeneralModel.INamedEntity[];
  errors: any;
  model: ProjectModel.IProject;
  onChange: (event: any) => void;
  trainingList: GeneralModel.INamedEntity[];
  resetErrors: () => void;
}

const CertificationsAndTrainings = ({ certificationList, errors, trainingList, model, onChange, resetErrors }: ICertificationsAndTrainingProps) => {
  const classes = useStyles();
  const buttonGlobalStyles = buttonStyles();
  const formClasses = formGlobalStyles();
  const modalClasses = modalStyles();

  const [groupToDelete, setGroupToDelete] = useState<{ type?: 'certification' | 'training'; index?: number }>();

  const canCreateCertificationsGroup = useMemo(() => model.certificationGroups.filter(group => group.name === '').length === 0, [model.certificationGroups]);
  const canCreateTrainingsGroup = useMemo(() => model.trainingGroups.filter(group => group.name === '').length === 0, [model.trainingGroups]);

  const handleAddCertificationGroup = useCallback(
    () =>
      onChange(prevState => ({
        ...prevState,
        certificationGroups: [
          ...prevState.certificationGroups,
          { name: '', validationType: GeneralModel.GroupValidationType.NOT_MANDATORY, certifications: [] },
        ],
      })),
    [onChange]
  );
  const handleAddTrainingGroup = useCallback(
    () =>
      onChange(prevState => ({
        ...prevState,
        trainingGroups: [...prevState.trainingGroups, { name: '', validationType: GeneralModel.GroupValidationType.NOT_MANDATORY, trainings: [] }],
      })),
    [onChange]
  );

  const handleCertificationGroupUpdated = useCallback(
    (groupIndex, changes) =>
      onChange(prevState => {
        const certificationGroupsCopy = [...prevState.certificationGroups];
        certificationGroupsCopy[groupIndex] = changes;
        return { ...prevState, certificationGroups: certificationGroupsCopy };
      }),
    [onChange]
  );
  const handleTrainingGroupUpdated = useCallback(
    (groupIndex, changes) =>
      onChange(prevState => {
        const trainingGroupsCopy = [...prevState.trainingGroups];
        trainingGroupsCopy[groupIndex] = changes;
        return { ...prevState, trainingGroups: trainingGroupsCopy };
      }),
    [onChange]
  );

  const cancelDelete = useCallback(() => setGroupToDelete({}), [setGroupToDelete]);
  const handleDelete = useCallback(() => {
    const key = groupToDelete.type === 'certification' ? 'certificationGroups' : 'trainingGroups';
    onChange(prevState => ({ ...prevState, [key]: prevState[key].filter((_, index) => index !== groupToDelete.index) }));
    setGroupToDelete(null);
  }, [groupToDelete, onChange, setGroupToDelete]);

  return (
    <>
      <Card
        title="Certifications"
        showAttentionIcon={true}
        actionStyleClass={classes.userAction}
        secondaryAction="Certifications selected in groups are the ones that will be available in this Project"
      >
        {model.certificationGroups.map((group, index) => (
          <CertificationGroup
            key={group.id || index}
            errors={errors?.certificationGroups || errors}
            group={group}
            index={index}
            onChange={handleCertificationGroupUpdated}
            onDelete={() => setGroupToDelete({ type: 'certification', index })}
            options={certificationList}
            resetErrors={resetErrors}
          />
        ))}
        {model.certificationGroups.length > 0 && <Divider />}
        <ControlledButton>
          <Button
            disableRipple={true}
            startIcon={<AddIcon />}
            className={`${buttonGlobalStyles.addUserButton} ${classes.createGroupButton} ${getConditionalDefaultValue(
              canCreateCertificationsGroup,
              formClasses.enableUserButton,
              formClasses.disableUserButton
            )}`}
            disabled={!canCreateCertificationsGroup}
            data-testid="add-certification-group-button"
            onClick={handleAddCertificationGroup}
          >
            Create Group
          </Button>
        </ControlledButton>
      </Card>
      <Card
        title="Trainings"
        showAttentionIcon={true}
        actionStyleClass={classes.userAction}
        secondaryAction="Trainings selected in groups are the ones that will be available in this Project"
      >
        {model.trainingGroups.map((group, index) => (
          <TrainingGroup
            key={group.id || index}
            errors={errors?.trainingGroups || errors}
            group={group}
            index={index}
            onChange={handleTrainingGroupUpdated}
            onDelete={() => setGroupToDelete({ type: 'training', index })}
            options={trainingList}
          />
        ))}
        {model.trainingGroups.length > 0 && <Divider />}
        <ControlledButton>
          <Button
            disableRipple={true}
            startIcon={<AddIcon />}
            className={`${buttonGlobalStyles.addUserButton} ${classes.createGroupButton} ${getConditionalDefaultValue(
              canCreateTrainingsGroup,
              formClasses.enableUserButton,
              formClasses.disableUserButton
            )}`}
            disabled={!canCreateTrainingsGroup}
            data-testid="add-training-group-button"
            onClick={handleAddTrainingGroup}
          >
            Create Group
          </Button>
        </ControlledButton>
      </Card>
      <Modal
        show={!!(groupToDelete?.type && groupToDelete?.index >= 0)}
        styleClass={`${modalClasses.dialogContainer} ${modalClasses.deleteModal}`}
        render={() => (
          <DeleteModal
            onCancel={cancelDelete}
            onConfirm={handleDelete}
            title="Are you sure you want to delete this Group?"
            text="This action cannot be undone."
          />
        )}
      />
    </>
  );
};

export default memo(CertificationsAndTrainings);
