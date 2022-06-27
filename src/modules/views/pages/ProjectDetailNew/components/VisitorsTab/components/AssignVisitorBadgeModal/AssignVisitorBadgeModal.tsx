import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import ControlledSelect from '../../../../../../shared/FormHandler/ControlledSelect';
import ControlledInput from '../../../../../../shared/FormHandler/ControlledInput';
import ControlledError from '../../../../../../shared/FormHandler/ControlledError';
import ControlledDatePicker from '../../../../../../shared/FormHandler/ControlledDatePicker';
import AssignEntity from '../../../../../../shared/AssignEntity';
import AssignEntityOption from '../../../../../../shared/AssignEntityOption';
import FormDialog from '../../../../../../shared/ResourceManagement/StepEditor/FormDialog';
import SearchEntity from '../../../../../../shared/SearchLocation';

import { GeneralModel, BadgeModel } from '../../../../../../../models';
import { FormRules, InfoIcon } from '../../../../../../../../constants';
import { useForm } from '../../../../../../../../utils/useForm';
import { getConditionalDefaultValue } from '../../../../../../../../utils/generalUtils';
import { formGlobalStyles } from '../../../../../../../../assets/styles';
import { useStyles as datePickerStyles } from '../../../../../../shared/FormHandler/ControlledDatePicker/styles';
import { useStyles } from '../../../../styles';

export interface IAssignVisitorBadgeModal {
  projectId: string;
  badgeVisitor: BadgeModel.IBadgeVisitor;
  entityList: string[];
  uiRelationMap: GeneralModel.IRelationUiMap;
  clientListLoading: GeneralModel.ILoadingStatus;
  updateLoading: GeneralModel.ILoadingStatus;
  searchCompanies: (params: GeneralModel.IQueryParams, tempId: string) => void;
  assignBadgeVisitor: (id: string, badgeVisitor: BadgeModel.IBadgeVisitor) => void;
  closeModal: () => void;
  clearErrors: () => void;
}

const AssignVisitorBadgeModal = ({
  projectId,
  badgeVisitor,
  entityList,
  uiRelationMap,
  clientListLoading,
  updateLoading,
  searchCompanies,
  assignBadgeVisitor,
  closeModal,
  clearErrors,
}: IAssignVisitorBadgeModal) => {
  const classes = useStyles();
  const formClasses = formGlobalStyles();
  const datePickerClasses = datePickerStyles();
  const projectCompanyId = 'project-badge-company-id';

  const [entityNameList, setEntityNameList] = useState(entityList.map(item => ({ name: item })));
  const [entity, setEntity] = useState<number>(BadgeModel.VisitorEntity.CLIENT);

  const isClientListLoading = useMemo(() => clientListLoading && clientListLoading.isLoading, [clientListLoading]);

  const typeOptionList = useMemo(
    () => [
      { value: BadgeModel.VisitorType.REGULAR, label: BadgeModel.visitorTypeMap[BadgeModel.VisitorType.REGULAR] },
      { value: BadgeModel.VisitorType.VIP, label: BadgeModel.visitorTypeMap[BadgeModel.VisitorType.VIP] },
    ],
    []
  );
  const modalTextMap = useMemo(
    () => ({
      [BadgeModel.VisitorAvailability.AVAILABLE]: {
        title: `Assign Visitor Badge ${badgeVisitor.number} (#${badgeVisitor.code})`,
        confirmLabel: 'Assign',
        confirmLoadingLabel: 'Assigning...',
      },
      [BadgeModel.VisitorAvailability.ASSIGNED]: {
        title: `Edit Visitor Badge ${badgeVisitor.number} (#${badgeVisitor.code})`,
        confirmLabel: 'Save',
        confirmLoadingLabel: 'Saving...',
      },
    }),
    [badgeVisitor]
  );

  const onAssignBadge = useCallback(
    data => {
      assignBadgeVisitor(badgeVisitor.id, {
        ...data,
        companyId: data.companyId?.id ? data.companyId?.id : data.company?.id ? data.company.id : null,
        validFrom: moment(data.validFrom),
        validTo: moment(data.validTo),
        visitorBadgeStatus: BadgeModel.VisitorBadgeStatus.ASSIGNED,
        availability: BadgeModel.VisitorAvailability.ASSIGNED,
      });
    },
    [badgeVisitor.id, assignBadgeVisitor]
  );

  const { model, errors, hasChanges, onChange, update, discardChanges, updateRules, onSubmit, resetErrors } = useForm<BadgeModel.IBadgeVisitor>({
    initValues: { ...BadgeModel.getFallbackBadgeVisitor(), availability: BadgeModel.VisitorAvailability.ASSIGNED },
    formRules: FormRules.badge.assignBadgeVisitorRules,
    onSubmitCallback: onAssignBadge,
  });

  const onSwitchEntity = useCallback(
    badgeVisitorModel => {
      if (!badgeVisitorModel.entityName) {
        setEntity(BadgeModel.VisitorEntity.CLIENT);
        update({ ...badgeVisitorModel, entityName: null });
        updateRules(prevRules => ({ ...prevRules, companyId: { required: true, rules: [] }, entityName: { required: false, rules: [] } } as any));
      } else {
        setEntity(BadgeModel.VisitorEntity.OTHER);
        updateRules(prevRules => ({ ...prevRules, companyId: { required: false, rules: [] }, entityName: { required: true, rules: [] } } as any));
        update({ ...badgeVisitorModel, companyId: null, company: null });
      }
    },
    [setEntity, updateRules, update]
  );

  const onChangeEntityName = useCallback(
    option => {
      const exist = entityNameList.find(item => item.name === option.name);
      onChange(prevModel => ({ ...prevModel, entityName: option.name }));
      /* istanbul ignore else */
      if (!exist) setEntityNameList(prevState => [...prevState, { name: option.name }]);
    },
    [entityNameList, setEntityNameList, onChange]
  );

  const onChangeEntity = useCallback(
    event => {
      setEntity(event.target.value);
      if (event.target.value === BadgeModel.VisitorEntity.CLIENT) {
        onChange({ ...model, entityName: null });
        updateRules(prevRules => ({ ...prevRules, companyId: { required: true, rules: [] }, entityName: { required: false, rules: [] } } as any));
      } else {
        updateRules(prevRules => ({ ...prevRules, companyId: { required: false, rules: [] }, entityName: { required: true, rules: [] } } as any));
        onChange({ ...model, companyId: null, company: null });
      }
    },
    [model, setEntity, onChange, updateRules]
  );

  const onChangeHandler = useCallback(
    event => {
      /* istanbul ignore else */
      if (event.persist) event.persist();
      onChange(prevModel => ({
        ...prevModel,
        [event.target.name]: event.target.value,
      }));
    },
    [onChange]
  );

  const onDiscard = useCallback(() => {
    discardChanges();
    onSwitchEntity(badgeVisitor);
    resetErrors();
    clearErrors();
  }, [badgeVisitor, discardChanges, onSwitchEntity, resetErrors, clearErrors]);

  const onCloseModal = useCallback(() => {
    closeModal();
    clearErrors();
  }, [closeModal, clearErrors]);

  const onSelect = useCallback(
    (index: number, item, tempId: string) => {
      update(prevModel => ({
        ...prevModel,
        companyId: item,
      }));
    },
    [update]
  );

  const onReset = useCallback(() => {
    update(
      /* istanbul ignore next */ prevModel => ({
        ...prevModel,
        companyId: null,
      })
    );
  }, [update]);

  const clientRenderOption = useCallback((option, inputValue) => <AssignEntityOption option={option} inputValue={inputValue} />, []);

  const onSearchCompany = useCallback(
    (query: GeneralModel.IQueryParams, tempId: string) => {
      searchCompanies({ ...query, projectId, isDeveloper: '' as any }, tempId);
    },
    [searchCompanies, projectId]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (!!badgeVisitor.id) {
      onSwitchEntity(badgeVisitor);
      update({ ...badgeVisitor, companyId: badgeVisitor?.company?.id ? badgeVisitor?.company?.id : null });
    }
  }, []); // eslint-disable-line
  return (
    <FormDialog
      open={true}
      hasChanges={hasChanges}
      showHasChanges={badgeVisitor.availability === BadgeModel.VisitorAvailability.ASSIGNED}
      title={modalTextMap[badgeVisitor.availability].title}
      isLoading={updateLoading && updateLoading.isLoading}
      confirmLabel={modalTextMap[badgeVisitor.availability].confirmLabel}
      confirmLoadingLabel={modalTextMap[badgeVisitor.availability].confirmLoadingLabel}
      handleClose={onCloseModal}
      handleSubmit={onSubmit}
      handleDiscard={onDiscard}
      styleClasses={{ root: `${classes.modalWrapper}` }}
    >
      <>
        <Grid container={true} className={`${formClasses.rowsWrapper} ${formClasses.modalForm} ${classes.assignVisitorModalContainer}`}>
          <Grid item={true} xs={true} lg={true}>
            <Grid container={true}>
              <Grid item={true} xs={4} lg={4} className={formClasses.errorPosition}>
                <ControlledError
                  show={!!errors.firstName}
                  error={errors.firstName && errors.firstName === 'is required' ? 'Please select First Name.' : errors.firstName}
                >
                  <ControlledInput
                    styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl} ${formClasses.userInput} ${formClasses.badgeInput}`}
                    label="First Name"
                  >
                    <TextField
                      autoFocus={true}
                      autoComplete="off"
                      variant="outlined"
                      placeholder="First Name"
                      type="text"
                      fullWidth={true}
                      name="firstName"
                      required={false}
                      value={model.firstName || ''}
                      onChange={onChangeHandler}
                      error={!!errors.firstName}
                      inputProps={{
                        'data-testid': 'visitor-first-name',
                      }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={4} lg={4} className={`${formClasses.errorPosition} ${classes.inputErrorLeft}`}>
                <ControlledError
                  show={!!errors.lastName}
                  error={errors.lastName && errors.lastName === 'is required' ? 'Please select Last Name.' : errors.lastName}
                >
                  <div className={classes.assignVisitorModalGeneralInformationInput}>
                    <ControlledInput styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl} ${formClasses.userInput}`} label="Last Name">
                      <TextField
                        autoFocus={true}
                        autoComplete="off"
                        variant="outlined"
                        placeholder="Last Name"
                        type="text"
                        fullWidth={true}
                        name="lastName"
                        required={false}
                        value={model.lastName || ''}
                        onChange={onChangeHandler}
                        error={!!errors.lastName}
                        inputProps={{
                          'data-testid': 'visitor-last-name',
                        }}
                      />
                    </ControlledInput>
                  </div>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={4} lg={4} className={`${formClasses.errorPosition} ${classes.assignVisitorLastInput}`}>
                <ControlledInput
                  label="Visitor Type"
                  styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl} ${formClasses.userInput} ${formClasses.badgeInput}`}
                >
                  <ControlledSelect
                    label=""
                    name="visitorType"
                    value={model.visitorType}
                    options={typeOptionList}
                    error={!!errors.visitorType}
                    onChange={onChangeHandler}
                    inputProps={{
                      'data-testid': 'visitor-type',
                    }}
                  />
                  {model.visitorType === BadgeModel.VisitorType.VIP && (
                    <div className={classes.infoLabelContainer}>
                      <div className={classes.infoLabel}>
                        <InfoIcon /> VIP Badges activity will trigger notifications to different users in the project
                      </div>
                    </div>
                  )}
                </ControlledInput>
              </Grid>
            </Grid>
            <Grid container={true}>
              <Grid item={true} xs={4} lg={4} className={formClasses.errorPosition}>
                <ControlledInput
                  label="Entity"
                  styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl} ${formClasses.userInput} ${formClasses.badgeInput}`}
                >
                  <ControlledSelect label="" name="entity" value={entity} options={BadgeModel.entityOptionList} onChange={onChangeEntity} />
                </ControlledInput>
              </Grid>
              <Grid item={true} xs={8} lg={8} className={`${formClasses.errorPosition} ${classes.inputErrorLeftWithMargin}`}>
                {entity === BadgeModel.VisitorEntity.CLIENT ? (
                  <ControlledError
                    show={!!errors.companyId}
                    error={!!errors.companyId && errors.companyId === 'is required' ? 'Client Name is required.' : errors.companyId}
                  >
                    <div className={classes.assignVisitorLastInput}>
                      <ControlledInput styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl} ${formClasses.entityField}`} label="">
                        <AssignEntity
                          index={0}
                          tempId={projectCompanyId}
                          optionLabel="name"
                          result={uiRelationMap[projectCompanyId]?.searchResult || []}
                          isLoading={isClientListLoading}
                          showCreateNew={false}
                          assignValue={model.company}
                          placeholder="Client Name"
                          existRelation={uiRelationMap && uiRelationMap[projectCompanyId]}
                          onSelect={onSelect}
                          search={onSearchCompany}
                          renderOption={clientRenderOption}
                          onReset={onReset}
                          showError={!!errors.companyId}
                        />
                      </ControlledInput>
                    </div>
                  </ControlledError>
                ) : (
                  <ControlledError
                    show={!!errors.entityName}
                    error={errors.entityName && errors.entityName === 'is required' ? 'Please select Entity Name.' : errors.entityName}
                  >
                    <div className={classes.assignVisitorLastInput}>
                      <ControlledInput styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl} ${formClasses.entityField}`} label="Entity Name">
                        <SearchEntity
                          id={'entity'}
                          onChange={onChangeEntityName}
                          value={getConditionalDefaultValue(model.entityName, { name: model.entityName }, null)}
                          optionList={entityNameList}
                          placeholder="Entity Name"
                          outlined={true}
                          hasIcon={false}
                          disabled={false}
                        />
                      </ControlledInput>
                    </div>
                  </ControlledError>
                )}
              </Grid>
            </Grid>
            <Grid container={true}>
              <Grid item={true} xs={12} lg={12} style={{ margin: '15px 0' }} className={formClasses.errorPosition}>
                <ControlledError
                  show={!!errors.description}
                  error={errors.description && errors.description === 'is required' ? 'Please enter Description.' : errors.description}
                >
                  <ControlledInput label="Reason for visit">
                    <TextField
                      autoFocus={true}
                      autoComplete="off"
                      variant="outlined"
                      placeholder="Reason for visit"
                      type="text"
                      fullWidth={true}
                      name="description"
                      required={false}
                      value={model.description || ''}
                      onChange={onChangeHandler}
                      error={!!errors.description}
                      inputProps={{
                        'data-testid': 'visitor-description',
                      }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid data-testid="user-row-item" container={true} className={`${formClasses.rowsWrapper} ${formClasses.modalForm}`}>
          <Grid item={true} xs={true} lg={true}>
            <Grid container={true}>
              <Grid item={true} xs={4} lg={4} className={`${formClasses.errorPosition} ${classes.assignVisitorDateRow}`}>
                <Grid container={true}>
                  <ControlledInput label="Valid From:" styleClass={`${classes.boldTitle}`}>
                    <ControlledError
                      show={!!errors.validFrom}
                      error={errors.validFrom && errors.validFrom === 'is required' ? 'Please select Valid From date.' : errors.validFrom}
                    >
                      <div className={classes.assignVisitorDateColumn}>
                        <Grid item={true} xs={7} lg={7} className={formClasses.errorPosition}>
                          <ControlledInput label="Date">
                            <ControlledDatePicker
                              placeholder="Select Date"
                              variant="outlined"
                              name="validFrom"
                              endDate={String(model.validTo).toString()}
                              styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput} ${classes.assignVisitorDateInput}`}
                              value={model.validFrom}
                              error={!!errors.validFrom}
                              onChange={onChangeHandler}
                              invalidDateMessage={''}
                            />
                          </ControlledInput>
                        </Grid>
                      </div>
                    </ControlledError>
                  </ControlledInput>
                </Grid>
              </Grid>
              <Grid item={true} xs={4} lg={4} style={{ marginLeft: '15px' }} className={formClasses.errorPosition}>
                <Grid container={true}>
                  <ControlledInput label="Valid To:" styleClass={`${classes.boldTitle}`}>
                    <ControlledError
                      show={!!errors.validTo}
                      error={errors.validTo && errors.validTo === 'is required' ? 'Please select Valid To date.' : errors.validTo}
                    >
                      <div className={classes.assignVisitorDateColumn}>
                        <Grid item={true} xs={7} lg={7} className={formClasses.errorPosition}>
                          <ControlledInput label="Date">
                            <ControlledDatePicker
                              placeholder="Select Date"
                              variant="outlined"
                              name="validTo"
                              styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.adornmentStart} ${datePickerClasses.leftInput} ${classes.assignVisitorDateInput}`}
                              startDate={String(model.validFrom).toString()}
                              value={model.validTo}
                              error={!!errors.validTo}
                              onChange={onChangeHandler}
                              invalidDateMessage={''}
                            />
                          </ControlledInput>
                        </Grid>
                      </div>
                    </ControlledError>
                  </ControlledInput>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    </FormDialog>
  );
};

export default memo(AssignVisitorBadgeModal);
