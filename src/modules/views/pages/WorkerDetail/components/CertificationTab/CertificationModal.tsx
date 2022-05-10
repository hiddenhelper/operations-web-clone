import React, { memo, useCallback, useMemo, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AssignModal from '../../../../shared/Modal/components/AssignModal';
import ControlledInput from '../../../../shared/FormHandler/ControlledInput';
import ControlledError from '../../../../shared/FormHandler/ControlledError';
import ControlledDatePicker from '../../../../shared/FormHandler/ControlledDatePicker';
import ControlledSelect from '../../../../shared/FormHandler/ControlledSelect';
import MediaFiles from '../Shared/MediaFiles';

import { inputGlobalStyles } from '../../../../../../assets/styles/Inputs/styles';
import { useStyles as datePickerStyles } from '../../../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from '../../styles';

import { GeneralModel, CertificationModel, FileModel } from '../../../../../models';
import { FormRules } from '../../../../../../constants';
import { sanitizeCertification } from '../../../../../../utils/workerUtils';
import { useForm } from '../../../../../../utils/useForm';
import { isEmpty } from '../../../../../../utils/generalUtils';

export interface ICertificationModalProps {
  workerId: string;
  uploadId: string;
  projectList: GeneralModel.INamedEntity[];
  certificationList: GeneralModel.INamedEntity[];
  assignLoading: boolean;
  addCertification: (id: string, certification: CertificationModel.IWorkerCertification) => void;
  closeModal: () => void;
  certificationToEdit: { isEditing: boolean; id: string };
  fetchDetail: (entityId: string, detailId: string) => void;
  entityId: string;
  detailLoading: GeneralModel.ILoadingStatus;
  entityMap: GeneralModel.IEntityMap<any>;
  updateCertification: (id: string, certification: CertificationModel.IWorkerCertification, uploadId: string) => void;
  defaultFilesToRemove: string[];
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
}

const CertificationModal = ({
  workerId,
  uploadId,
  assignLoading,
  projectList,
  certificationList,
  addCertification,
  closeModal,
  certificationToEdit,
  fetchDetail,
  entityId,
  detailLoading,
  entityMap,
  updateCertification,
  defaultFilesToRemove,
  fileMap,
}: ICertificationModalProps) => {
  const classes = useStyles();
  const datePickerClasses = datePickerStyles();
  const inputGlobalClasses = inputGlobalStyles();

  const projectOptionList = useMemo(() => projectList.map(opt => ({ value: opt.id, label: opt.name })), [projectList]);
  const certificationOptionList = useMemo(() => certificationList.map(opt => ({ value: opt.id, label: opt.name })), [certificationList]);

  const onAddCertification = useCallback(
    certification => {
      if (isEmpty(certification.id)) {
        addCertification(workerId, sanitizeCertification(certification));
      } else {
        updateCertification(workerId, sanitizeCertification(certification), uploadId);
      }
    },
    [workerId, addCertification, updateCertification, uploadId]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (certificationToEdit.id) fetchDetail(entityId, certificationToEdit.id);
  }, [certificationToEdit, entityId, fetchDetail]);

  const { model, formRules, errors, onChange, onSubmit, update, hasChanges } = useForm<CertificationModel.IWorkerCertification>({
    initValues: certificationToEdit.isEditing ? entityMap[certificationToEdit.id] : CertificationModel.getCertificationFallback(),
    formRules: FormRules.worker.certificationRules,
    onSubmitCallback: onAddCertification,
  });

  useEffect(() => {
    if (!isEmpty(entityMap[certificationToEdit.id])) {
      update({
        ...entityMap[certificationToEdit.id],
        certificationId: entityMap[certificationToEdit.id].certification?.id ?? '',
        projectId: entityMap[certificationToEdit.id].project?.id ?? '',
      });
    }
  }, [certificationToEdit.id, entityMap, update]);

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

  return (
    <AssignModal
      title={`${certificationToEdit.isEditing ? 'Edit' : 'Add'} Certification`}
      loading={assignLoading}
      confirmLabel={certificationToEdit.isEditing ? 'Save' : 'Add'}
      confirmLoadingLabel={certificationToEdit.isEditing ? 'Saving' : 'Adding'}
      isConfirmEnabled={!certificationToEdit.isEditing || hasChanges || !isEmpty(defaultFilesToRemove) || !isEmpty(fileMap?.workerCertification)}
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
                    show={!!errors.certificationId}
                    error={errors.certificationId && errors.certificationId === 'is required' ? 'Please enter Certification Name.' : errors.certificationId}
                    styleClass={classes.errorPosition}
                  >
                    <ControlledInput label="Type" styleClass={classes.backgroundInput}>
                      <ControlledSelect
                        name="certificationId"
                        value={model.certificationId}
                        options={certificationOptionList}
                        onChange={onChangeHandler}
                        error={!!errors.certificationId}
                        includeNone={true}
                        dataTestId="certification-name"
                      />
                    </ControlledInput>
                  </ControlledError>
                </Grid>
                <Grid container={true}>
                  <Grid item={true} xs={8} className={inputGlobalClasses.inputPaddingBottom}>
                    <Grid container={true} className={inputGlobalClasses.inputPaddingBottom}>
                      <Grid item={true} xs={6}>
                        <ControlledError show={!!errors.idNumber} error={errors.idNumber}>
                          <ControlledInput label="Certification ID (Optional)" styleClass={`${classes.inputPaddingRight} ${classes.backgroundInput}`}>
                            <TextField
                              variant="outlined"
                              data-testid="certification-idNumber-wrapper"
                              placeholder="00000"
                              type="text"
                              autoComplete="off"
                              fullWidth={true}
                              name="idNumber"
                              required={formRules.idNumber.required}
                              value={model.idNumber || ''}
                              onChange={onChangeHandler}
                              error={!!errors.idNumber}
                              inputProps={{
                                'data-testid': 'certification-idNumber',
                              }}
                            />
                          </ControlledInput>
                        </ControlledError>
                      </Grid>
                      <Grid item={true} xs={6}>
                        <ControlledError show={!!errors.project} error={errors.project}>
                          <ControlledInput label="Project (Optional)" styleClass={`${inputGlobalClasses.inputPaddingRight} ${classes.backgroundInput}`}>
                            <ControlledSelect
                              name="projectId"
                              value={model.projectId}
                              options={projectOptionList}
                              includeNone={true}
                              error={!!errors.project}
                              dataTestId="certification-project"
                              onChange={onChangeHandler}
                            />
                          </ControlledInput>
                        </ControlledError>
                      </Grid>
                    </Grid>
                    <Grid container={true}>
                      <Grid item={true} xs={6}>
                        <ControlledError show={!!errors.completionDate} error={errors.completionDate}>
                          <ControlledInput label="Completion Date (Optional)" styleClass={`${inputGlobalClasses.inputPaddingRight} ${classes.backgroundInput}`}>
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
                        <ControlledError show={!!errors.expirationDate} error={errors.expirationDate}>
                          <ControlledInput label="Expiration Date (Optional)" styleClass={`${inputGlobalClasses.inputPaddingRight} ${classes.backgroundInput}`}>
                            <ControlledDatePicker
                              placeholder="Select Option"
                              variant="outlined"
                              name="expirationDate"
                              fullWidth={true}
                              styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput}`}
                              value={model.expirationDate}
                              error={!!errors.expirationDate}
                              onChange={onChangeHandler}
                              invalidDateMessage={''}
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
                        data-testid="certification-description-wrapper"
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
                          'data-testid': 'certification-description',
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

export default memo(CertificationModal);
