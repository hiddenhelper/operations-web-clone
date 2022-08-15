import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ControlledError from '../../FormHandler/ControlledError';
import ControlledInput from '../../FormHandler/ControlledInput';
import ControlledButton from '../../FormHandler/ControlledButton';
import ControlledRadio from '../../FormHandler/ControlledRadio';
import ButtonLoader from '../../ButtonLoader';

import { UserModel, GeneralModel } from '../../../../models';
import { LANG } from '../../../../../constants';
import { IFormRules } from '../../../../../utils/useValidator';
import { getConditionalDefaultValue, getDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles as buttonStyles } from '../../FormHandler/ControlledButton/styles';
import { formGlobalStyles, inputGlobalStyles } from '../../../../../assets/styles';
import { useStyles } from './styles';
import PhoneNumberInput from '../../PhoneNumberInput';

export interface IProfile {
  model: UserModel.IAccount;
  account: UserModel.IAccount;
  formRules: IFormRules;
  errors: any;
  loading: boolean;
  hasChanges: boolean;
  onSubmit: () => void;
  onDiscard: () => void;
  onChange: (model: any) => void;
  countryList?: GeneralModel.INamedEntity[];
  isFcaUser: boolean;
}

const Profile = ({ model, formRules, hasChanges, errors, loading, onDiscard, onSubmit, onChange, countryList, isFcaUser }: IProfile) => {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const inputGlobalClasses = inputGlobalStyles();
  const formClasses = formGlobalStyles();

  return (
    <div className={classes.profileFormPaddingTop}>
      <Grid container={true}>
        <Grid item={true} xs={12} lg={12}>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.firstName}
              error={getConditionalDefaultValue(errors.firstName === 'is required', 'First Name is required.', errors.firstName)}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="First Name" styleClass={classes.inputBottomPadding}>
                <TextField
                  variant="outlined"
                  data-testid="profile-first-name-wrapper"
                  placeholder="First Name"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="firstName"
                  error={!!errors.firstName}
                  value={model.firstName}
                  required={formRules.firstName.required}
                  onChange={onChange}
                  inputProps={{
                    'data-testid': 'profile-first-name',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.lastName}
              error={getConditionalDefaultValue(errors.lastName === 'is required', 'Last Name is required.', errors.lastName)}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Last Name" styleClass={classes.inputBottomPadding}>
                <TextField
                  variant="outlined"
                  data-testid="profile-last-name-wrapper"
                  placeholder="Last Name"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  name="lastName"
                  error={!!errors.lastName}
                  value={getDefaultValue(model.lastName, '')}
                  onChange={onChange}
                  inputProps={{
                    'data-testid': 'profile-last-name',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={false} error={'Please enter Email.'} styleClass={classes.errorPosition}>
              <ControlledInput label="Email" styleClass={classes.inputBottomPadding}>
                <TextField
                  variant="outlined"
                  data-testid="profile-email"
                  placeholder="Email"
                  type="text"
                  autoComplete="off"
                  fullWidth={true}
                  disabled={true}
                  name="email"
                  value={getDefaultValue(model.email, '')}
                  inputProps={{
                    'data-testid': 'email',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>

          <div className={classes.errorInputWrapper}>
            <ControlledError
              show={!!errors.mobilePhoneNumber}
              error={getConditionalDefaultValue(errors.mobilePhoneNumber === 'is required', 'Please enter Mobile Phone Number.', errors.mobilePhoneNumber)}
              styleClass={classes.errorPosition}
            >
              <ControlledInput label="Mobile Phone Number" styleClass={`${classes.inputBottomPadding}`}>
                <PhoneNumberInput
                  countryList={countryList}
                  value={getDefaultValue(model.mobilePhoneNumber, '')}
                  onChange={onChange}
                  inputProps={{
                    variant: 'outlined',
                    error: !!errors.mobilePhoneNumber,
                    name: 'mobilePhoneNumber',
                    'data-testid': 'mobile-user-phone',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </div>
          <Grid container={true}>
            <Grid item={true} xs={9} lg={9}>
              <ControlledError
                show={!!errors.officePhoneNumber}
                error={getConditionalDefaultValue(errors.officePhoneNumber === 'is required', 'Please enter Phone Number.', errors.officePhoneNumber)}
              >
                <ControlledInput label="Office Phone Number (Optional)" styleClass={`${classes.inputBottomPadding} ${inputGlobalClasses.middleInput}`}>
                  <PhoneNumberInput
                    countryList={countryList}
                    value={getDefaultValue(model.officePhoneNumber, '')}
                    onChange={onChange}
                    inputProps={{
                      variant: 'outlined',
                      error: !!errors.officePhoneNumber,
                      name: 'officePhoneNumber',
                      'data-testid': 'office-user-phone',
                      id: 'officePhoneNumber',
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
            <Grid item={true} xs={3} lg={3}>
              <ControlledError show={!!errors.officePhoneExtension} error={errors.officePhoneExtension}>
                <ControlledInput label="Ext" styleClass={`${classes.inputBottomPadding}`}>
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Ext"
                    type="text"
                    fullWidth={true}
                    name="officePhoneExtension"
                    value={getDefaultValue(model.officePhoneExtension, '')}
                    onChange={onChange}
                    error={!!errors.officePhoneExtension}
                    inputProps={{
                      'data-testid': 'office-user-phone',
                      maxLength: 6,
                    }}
                  />
                </ControlledInput>
              </ControlledError>
            </Grid>
          </Grid>
          <div className={classes.errorInputWrapper}>
            <ControlledError show={!!errors.preferredContactMethod} error={errors.preferredContactMethod}>
              <ControlledRadio
                styleClass={formClasses.radioWrapper}
                row={true}
                radioItems={[
                  {
                    value: UserModel.PreferredContactMethod.EMAIL,
                    label: LANG.EN.CONTACT_METHOD.EMAIL,
                  },
                  {
                    value: UserModel.PreferredContactMethod.PHONE,
                    label: LANG.EN.CONTACT_METHOD.PHONE,
                  },
                ]}
                formControlProps={{
                  name: 'preferredContactMethod',
                  label: 'Preferred Contact Method',
                  value: parseInt(model.preferredContactMethod as any, 10),
                  onChange: onChange,
                }}
              />
            </ControlledError>
          </div>
        </Grid>
      </Grid>
      <div className={classes.formButtonWrapper}>
        <ControlledButton styleClass={hasChanges ? buttonClasses.noOutline : ''}>
          <Button data-testid="discard-changes-btn" color="primary" className={buttonClasses.discardButton} disabled={!hasChanges} onClick={onDiscard}>
            {LANG.EN.NAVIGATION_TOP.ACTIONS.DISCARD}
          </Button>
        </ControlledButton>
        <ControlledButton styleClass={hasChanges ? buttonClasses.noOutline : ''}>
          <ButtonLoader
            text={LANG.EN.NAVIGATION_TOP.ACTIONS.SAVE}
            loadingText="Saving..."
            isLoading={loading}
            data-testid="confirm-btn"
            className={`${buttonClasses.nextButton} ${loading ? buttonClasses.loadingPadding : buttonClasses.noPadding}`}
            color="primary"
            variant="contained"
            size="large"
            onClick={onSubmit}
            disabled={!hasChanges || !model.firstName || !model.lastName || (!isFcaUser && !model.mobilePhoneNumber)}
          />
        </ControlledButton>
      </div>
    </div>
  );
};

export default memo(Profile);
