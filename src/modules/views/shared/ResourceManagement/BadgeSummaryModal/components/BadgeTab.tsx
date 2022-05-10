import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import MatchingField, { MatchType } from '../../../MatchingField/MatchingField';
import BadgeSynchronizingLabel from '../../../BadgeSynchronizingLabel';
import ControlledRadio from '../../../FormHandler/ControlledRadio';
import ControlledDatePicker from '../../../FormHandler/ControlledDatePicker';
import ControlledInput from '../../../FormHandler/ControlledInput';
import ControlledError from '../../../FormHandler/ControlledError';
import ButtonMenu from '../../../ButtonMenu';

import { BadgeModel } from '../../../../../models';
import { ExpandIcon } from '../../../../../../constants';
import { getConditionalDefaultValue, getDefaultValue, TAG_ID_MASK } from '../../../../../../utils/generalUtils';
import { layoutMap } from '../../BadgeEditor/BadgeEditor';
import { formGlobalStyles } from '../../../../../../assets/styles';
import { useStyles as datePickerStyles } from '../../../FormHandler/ControlledDatePicker/styles';
import { useStyles as inputStyles } from '../../../FormHandler/ControlledInput/styles';
import { useStyles as modalStyles } from '../../../Modal/style';
import { useStyles } from '../styles';
import ControlledMaskInput from '../../../FormHandler/ControlledMaskInput/ControlledMaskInput';
import { validateBadgeTagId } from '../../../../../../utils/projectUtils';

export interface IBadgeTabProps {
  model: any;
  errors: any;
  serverErrors?: any;
  badge: BadgeModel.IBadge;
  isVisitor: boolean;
  isBadgePending: boolean;
  isDeactivated: boolean;
  isReactivateAllowed: boolean;
  isRequiredDocumentationCompleted: boolean;
  badgeStatusOptionList: { key: BadgeModel.BadgeStatus; title: string; callback?: () => void }[];
  onChange: (model: any) => void;
  updateRules: (model: any) => void;
}

const BadgeTab = ({
  model,
  errors,
  serverErrors,
  badge,
  badgeStatusOptionList,
  isVisitor,
  isBadgePending,
  isReactivateAllowed,
  isDeactivated,
  isRequiredDocumentationCompleted,
  onChange,
  updateRules,
}: IBadgeTabProps) => {
  const classes = useStyles();
  const datePickerClasses = datePickerStyles();
  const formClasses = formGlobalStyles();
  const inputClasses = inputStyles();
  const modalClasses = modalStyles();

  const LayoutComponent = layoutMap[badge.badgeTemplate.layout];
  const visitorMode = badge.badgeTemplate.layout === BadgeModel.BadgeLayout.VISITOR;
  const isBadgeExpired = badge.status === BadgeModel.BadgeStatus.EXPIRED;

  const isSynchronizing = useMemo(() => badge?.isSynchronizing, [badge]);

  const isStatusButtonDisabled = useMemo(() => !isVisitor && (isBadgePending || !isRequiredDocumentationCompleted || !isReactivateAllowed), [
    isBadgePending,
    isRequiredDocumentationCompleted,
    isReactivateAllowed,
    isVisitor,
  ]);

  const tagIdError = useMemo(
    () =>
      getConditionalDefaultValue(
        errors?.tagId,
        getConditionalDefaultValue(errors.tagId === 'is required', 'Please enter Tag Id', errors.tagId),
        serverErrors?.tagId?.[0]
      ),
    [errors, serverErrors]
  );

  const onChangeExpiration = useCallback(
    event => {
      event.persist();
      onChange(prevModel => ({
        ...prevModel,
        [event.target.name]: Number(event.target.value),
        expirationDate: getConditionalDefaultValue(
          Number(event.target.value) === 0,
          null,
          getDefaultValue(prevModel.expirationDate, badge.defaultExpirationDate)
        ),
      }));
    },
    [badge, onChange]
  );
  const onChangeDate = useCallback(
    event => {
      event.persist();
      onChange(prevModel => ({ ...prevModel, expirationDate: event.target.value }));
    },
    [onChange]
  );
  const onChangeTagId = useCallback(
    event => {
      event.persist();
      onChange(prevModel => ({ ...prevModel, tagId: event.target.value.toUpperCase() }));
    },
    [onChange]
  );

  useEffect(() => {
    updateRules({
      expirationDate: {
        required: model.hasExpiration,
        rules: [],
      },
      tagId: {
        required: isVisitor,
        rules: [validateBadgeTagId],
      },
    });
  }, [model.hasExpiration, updateRules, isVisitor]);
  return (
    <Grid container={true} className={`${classes.modalBadgeWrapper} ${formClasses.modalForm}`}>
      <Grid item={true} xl={7} lg={7} className={classes.modalBadgeContainer}>
        <LayoutComponent
          showLogo={true}
          badge={badge}
          badgeNumber={getDefaultValue((badge as any).number)}
          visitorMode={visitorMode}
          template={badge.badgeTemplate}
          barCode={null}
          qrCode={null}
          toggleClass={''}
        />
      </Grid>
      <Grid item={true} xl={5} lg={5} style={{ paddingLeft: '6.5%' }}>
        {!isVisitor && (
          <>
            <div className={classes.badgeSection}>
              <h2 className={classes.titleMargin}>Required Documentation</h2>
              <MatchingField type={getConditionalDefaultValue(!!badge?.workerProjectStatus, MatchType.MATCH, MatchType.NO_MATCH)}>
                Consent Form Signed
              </MatchingField>
              <MatchingField type={getConditionalDefaultValue(badge?.trainingsCompleted, MatchType.MATCH, MatchType.NO_MATCH)}>
                Required Training/s Completed
              </MatchingField>
              <MatchingField type={getConditionalDefaultValue(badge?.certificationsCompleted, MatchType.MATCH, MatchType.NO_MATCH)}>
                Required Certifications Completed
              </MatchingField>
            </div>
            <div className={classes.badgeSection}>
              <ButtonMenu
                styleClass={getConditionalDefaultValue(
                  isDeactivated || isBadgeExpired || isSynchronizing,
                  `${classes.badgeButtonContainer} ${classes.ProjectActiveBadgeDeactivated}`,
                  `${classes.badgeButtonContainer} ${classes[BadgeModel.badgeStatusMap[badge.status]]}`
                )}
                disabled={!!(isStatusButtonDisabled || isSynchronizing)}
                buttonProps={{ endIcon: <ExpandIcon /> }}
                showDivider={false}
                text={BadgeModel.badgeStatusMap[badge.status]}
                optionList={badgeStatusOptionList}
                showIconMargin={false}
              />
              {isSynchronizing && <BadgeSynchronizingLabel />}
            </div>
          </>
        )}
        <div className={classes.badgeSection}>
          <h2 className={classes.titleMargin}>Tag ID</h2>
          {!isVisitor && (
            <MatchingField type={getConditionalDefaultValue(badge?.tagId, MatchType.MATCH, MatchType.NO_MATCH)}>
              {getConditionalDefaultValue(badge?.tagId, badge?.tagId, 'Tag ID must be entered to activate the badge.')}
            </MatchingField>
          )}
          {isVisitor && (
            <div className={inputClasses.formControl} style={{ paddingBottom: '18px' }}>
              <ControlledError error={tagIdError} show={!!errors.tagId || serverErrors?.tagId}>
                <ControlledInput label="">
                  <TextField
                    className={modalClasses.inputField}
                    type="text"
                    onChange={onChangeTagId}
                    placeholder="Enter Tag Id"
                    name="tagId"
                    value={getDefaultValue(model.tagId, '')}
                    variant="outlined"
                    multiline={false}
                    rows={1}
                    autoComplete="off"
                    fullWidth={true}
                    error={!!errors.tagId}
                    inputProps={{
                      'data-testid': 'badge-tagid',
                      maxLength: 12,
                      mask: TAG_ID_MASK,
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
            </div>
          )}
        </div>
        {!isVisitor && (
          <Grid container={true}>
            <Grid item={true} xl={12} lg={12} className={classes.badgeSection}>
              <Grid container={true}>
                <Grid item={true}>
                  <h2 className={classes.titleMargin}>Badge Expiration</h2>
                  <ControlledRadio
                    row={true}
                    radioItems={[
                      { value: 0, label: 'No' },
                      { value: 1, label: 'Yes' },
                    ]}
                    formControlProps={{
                      name: 'hasExpiration',
                      label: '',
                      value: model.hasExpiration,
                      onChange: onChangeExpiration,
                    }}
                  />
                </Grid>
                {!!model.hasExpiration && (
                  <Grid item={true} className={classes.expirationDateContainer}>
                    <ControlledError
                      show={!!errors?.expirationDate}
                      error={errors?.expirationDate === 'is required' ? 'Please enter Expiration Date' : errors?.expirationDate}
                    >
                      <ControlledInput label="Date:">
                        <ControlledDatePicker
                          placeholder="Select Date"
                          variant="outlined"
                          name="expirationDate"
                          styleClass={`${datePickerClasses.datePicker} ${datePickerClasses.fullWidth} ${datePickerClasses.adornmentStart} ${datePickerClasses.blackIcon}`}
                          value={model.expirationDate}
                          error={!!errors?.expirationDate}
                          onChange={onChangeDate}
                          invalidDateMessage={''}
                        />
                      </ControlledInput>
                    </ControlledError>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(BadgeTab);
