import React, { memo, useCallback, useMemo, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AssignModal from '../../../../shared/Modal/components/AssignModal';
import ControlledInput from '../../../../shared/FormHandler/ControlledInput';
import ControlledError from '../../../../shared/FormHandler/ControlledError';
import ControlledDatePicker from '../../../../shared/FormHandler/ControlledDatePicker';
import ControlledSelect from '../../../../shared/FormHandler/ControlledSelect';

import { inputGlobalStyles } from '../../../../../../assets/styles/Inputs/styles';
import { useStyles as datePickerStyles } from '../../../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from '../../styles';

import { FileModel, GeneralModel, TrainingModel } from '../../../../../models';
import { FormRules } from '../../../../../../constants';
import { useForm } from '../../../../../../utils/useForm';
import { sanitizeTraining } from '../../../../../../utils/workerUtils';
import ControlledMaskInput from '../../../../shared/FormHandler/ControlledMaskInput/ControlledMaskInput';
import { isEmpty } from '../../../../../../utils/generalUtils';
import MediaFiles from '../Shared/MediaFiles';

export interface ITrainingModalProps {
  workerId: string;
  uploadId: string;
  projectList: GeneralModel.INamedEntity[];
  trainingList: GeneralModel.INamedEntity[];
  assignLoading: boolean;
  addTraining: (id: string, training: TrainingModel.IWorkerTraining) => void;
  closeModal: () => void;
  trainingToEdit: { isEditing: boolean; id: string };
  fetchDetail: (entityId: string, detailId: string) => void;
  entityId: string;
  detailLoading: GeneralModel.ILoadingStatus;
  entityMap: GeneralModel.IEntityMap<any>;
  updateTraining: (id: string, certification: TrainingModel.IWorkerTraining, uploadId: string) => void;
  defaultFilesToRemove: string[];
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
}

const TrainingModal = ({
  workerId,
  uploadId,
  assignLoading,
  projectList,
  trainingList,
  addTraining,
  closeModal,
  trainingToEdit,
  fetchDetail,
  entityId,
  detailLoading,
  entityMap,
  updateTraining,
  defaultFilesToRemove,
  fileMap,
}: ITrainingModalProps) => {
  const classes = useStyles();
  const datePickerClasses = datePickerStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const projectOptionList = useMemo(() => projectList.map(opt => ({ value: opt.id, label: opt.name })), [projectList]);
  const trainingOptionList = useMemo(() => trainingList.map(opt => ({ value: opt.id, label: opt.name })), [trainingList]);

  const onAddTraining = useCallback(
    training => {
      if (isEmpty(training.id)) {
        addTraining(workerId, training);
      } else {
        updateTraining(workerId, sanitizeTraining(training), uploadId);
      }
    },
    [workerId, addTraining, updateTraining, uploadId]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (trainingToEdit.id) fetchDetail(entityId, trainingToEdit.id);
  }, [trainingToEdit, entityId, fetchDetail]);

  const { model, formRules, errors, onChange, onSubmit, update, hasChanges } = useForm<TrainingModel.IWorkerTraining>({
    initValues: trainingToEdit.isEditing ? entityMap[trainingToEdit.id] : TrainingModel.getTrainingFallback(),
    formRules: FormRules.worker.trainingRules,
    onSubmitCallback: onAddTraining,
  });

  useEffect(() => {
    if (!isEmpty(entityMap[trainingToEdit.id])) {
      update({
        ...entityMap[trainingToEdit.id],
        trainingId: entityMap[trainingToEdit.id].training?.id ?? '',
        projectId: entityMap[trainingToEdit.id].project?.id ?? '',
      });
    }
  }, [trainingToEdit.id, entityMap, update]);

  const onChangeHandler = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );

  const onChangeBadgeCode = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value.toUpperCase(),
      }));
    },
    [onChange]
  );

  return (
    <AssignModal
      title={`${trainingToEdit.isEditing ? 'Edit' : 'Add'} Training`}
      loading={assignLoading}
      confirmLabel={trainingToEdit.isEditing ? 'Save' : 'Add'}
      confirmLoadingLabel={trainingToEdit.isEditing ? 'Saving' : 'Adding'}
      isConfirmEnabled={!trainingToEdit.isEditing || hasChanges || !isEmpty(defaultFilesToRemove) || !isEmpty(fileMap?.workerTraining)}
      styleClass={classes.assignModalMaxHeight}
      onClose={closeModal}
      onSubmit={onSubmit}
      render={() =>
        detailLoading && detailLoading.isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <div>
              <Grid container={true}>
                <Grid item={true} xs={12} className={inputGlobalClasses.inputPaddingBottom}>
                  <ControlledError
                    show={!!errors.trainingId}
                    error={errors.trainingId && errors.trainingId === 'is required' ? 'Please enter Type.' : errors.trainingId}
                    styleClass={classes.errorPosition}
                  >
                    <ControlledInput label="Type" styleClass={classes.backgroundInput}>
                      <ControlledSelect
                        name="trainingId"
                        value={model.trainingId}
                        options={trainingOptionList}
                        onChange={onChangeHandler}
                        error={!!errors.trainingId}
                        includeNone={true}
                        dataTestId="training-name"
                      />
                    </ControlledInput>
                  </ControlledError>
                </Grid>
                <Grid container={true}>
                  <Grid item={true} xs={8} className={inputGlobalClasses.inputPaddingBottom}>
                    <Grid container={true} className={inputGlobalClasses.inputPaddingBottom}>
                      <Grid item={true} xs={6}>
                        <ControlledError
                          show={!!errors.completionDate}
                          error={errors.completionDate && errors.completionDate === 'is required' ? 'Please enter Date.' : errors.completionDate}
                        >
                          <ControlledInput label="Date" styleClass={`${inputGlobalClasses.inputPaddingRight} ${classes.backgroundInput}`}>
                            <ControlledDatePicker
                              placeholder="Select Option"
                              variant="outlined"
                              name="completionDate"
                              fullWidth={true}
                              styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                              value={model.completionDate}
                              error={!!errors.completionDate}
                              onChange={onChangeHandler}
                              invalidDateMessage={''}
                            />
                          </ControlledInput>
                        </ControlledError>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <ControlledError
                          show={!!errors.projectId}
                          error={errors.projectId && errors.projectId === 'is required' ? 'Please enter Project.' : errors.projectId}
                        >
                          <ControlledInput label="Project" styleClass={`${inputGlobalClasses.inputPaddingRight} ${classes.backgroundInput}`}>
                            <ControlledSelect
                              name="projectId"
                              value={model.projectId}
                              options={projectOptionList}
                              includeNone={true}
                              error={!!errors.projectId}
                              dataTestId="training-project"
                              onChange={onChangeHandler}
                            />
                          </ControlledInput>
                        </ControlledError>
                      </Grid>
                    </Grid>
                    <Grid container={true}>
                      <Grid item={true} xs={6}>
                        <ControlledError
                          show={!!errors.trainerName}
                          error={errors.trainerName && errors.trainerName === 'is required' ? 'Please enter Trainer Name.' : errors.trainerName}
                        >
                          <ControlledInput label="Trainer Name" styleClass={`${inputGlobalClasses.inputPaddingRight} ${classes.backgroundInput}`}>
                            <TextField
                              variant="outlined"
                              data-testid="training-trainerName-wrapper"
                              placeholder="Trainer Name"
                              type="text"
                              autoComplete="off"
                              fullWidth={true}
                              name="trainerName"
                              required={formRules.trainerName.required}
                              value={model.trainerName || ''}
                              onChange={onChangeHandler}
                              error={!!errors.trainerName}
                              inputProps={{
                                'data-testid': 'training-trainerName',
                              }}
                            />
                          </ControlledInput>
                        </ControlledError>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <ControlledError show={!!errors.trainerBadgeCode} error={errors.trainerBadgeCode}>
                          <ControlledInput
                            label="Trainer Badge Code (Optional)"
                            styleClass={`${inputGlobalClasses.inputPaddingRight} ${classes.backgroundInput}`}
                          >
                            <TextField
                              variant="outlined"
                              data-testid="training-trainerBadgeCode-wrapper"
                              placeholder="Trainer Badge Code"
                              type="text"
                              autoComplete="off"
                              fullWidth={true}
                              name="trainerBadgeCode"
                              required={formRules.trainerBadgeCode.required}
                              value={model.trainerBadgeCode || ''}
                              onChange={onChangeBadgeCode}
                              error={!!errors.trainerBadgeCode}
                              inputProps={{
                                maxLength: 8,
                                'data-testid': 'training-trainerBadgeCode',
                                mask: [/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/],
                                placeholderChar: '0',
                                showMask: true,
                                guide: false,
                              }}
                              InputProps={{
                                inputComponent: ControlledMaskInput as any,
                              }}
                            />
                          </ControlledInput>
                        </ControlledError>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item={true} xs={4} className={inputGlobalClasses.inputPaddingBottom}>
                    <ControlledInput label="Description (Optional)" styleClass={`${classes.textAreaWrapper} ${classes.backgroundInput}`}>
                      <TextField
                        className={classes.textArea}
                        variant="outlined"
                        data-testid="training-description-wrapper"
                        placeholder="Description (Optional)"
                        autoComplete="off"
                        fullWidth={true}
                        multiline={true}
                        rows={4}
                        name="description"
                        required={formRules.description.required}
                        value={model.description || ''}
                        onChange={onChangeHandler}
                        error={!!errors.description}
                        inputProps={{
                          'data-testid': 'training-description',
                        }}
                      />
                    </ControlledInput>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <MediaFiles uploadId={uploadId} assignLoading={assignLoading} files={model.files} />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </>
        )
      }
    />
  );
};

export default memo(TrainingModal);
