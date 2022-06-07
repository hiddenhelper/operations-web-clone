import React, { useEffect, memo, useCallback, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

import { UserModel, GeneralModel } from '../../../models';
import { LANG, DeleteIcon } from '../../../../constants';
import { userRules } from '../../../../constants/form/clientRules';
import { getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { formGlobalStyles } from '../../../../assets/styles';
import { useStyles as buttonStyles } from '../../shared/FormHandler/ControlledButton/styles';

import ControlledSelect from '../FormHandler/ControlledSelect';
import ControlledInput from '../FormHandler/ControlledInput';
import ControlledRadio from '../FormHandler/ControlledRadio';
import ControlledError from '../FormHandler/ControlledError';
import PhoneNumberInput from '../PhoneNumberInput';
import { IFormRules } from 'utils/useValidator';

export interface IUsersProps {
  autoFocus?: boolean;
  countryList?: GeneralModel.INamedEntity[];
  getErrors: (fieldName: string, index: number) => string;
  hideDeleteContainer?: boolean;
  index: number;
  isListItem?: boolean;
  onChange: (user: UserModel.IUser, index?: number) => void;
  onDeleteUser?: (id: any) => void;
  showDeleteButton: boolean;
  showInviteAs?: boolean;
  user: UserModel.IUser;
  updateRules?: (s: IFormRules | ((p: IFormRules) => IFormRules)) => void;
  formRules?: IFormRules;
  companyId?: string;
  fetchGroupSearch?: (searchRequest: any) => void;
  groupList?: any;
}

const UserRow = ({
  autoFocus = true,
  countryList,
  getErrors,
  hideDeleteContainer,
  index,
  isListItem = true,
  onChange,
  onDeleteUser,
  showDeleteButton,
  showInviteAs = true,
  user,
  updateRules,
  formRules,
  companyId,
  fetchGroupSearch,
  groupList,
}: IUsersProps) => {
  const [userInviteGroupList, setUserInviteGroupList] = useState(UserModel.userInviteList);
  const formClasses = formGlobalStyles();
  const buttonGlobalStyles = buttonStyles();
  const onChangeHandler = useCallback(event => onChange({ ...user, [event.target.name]: event.target.value }, index), [index, user, onChange]);
  const onChangeNumber = useCallback(/* istanbul ignore next */ event => onChange({ ...user, [event.target.name]: event.target.value }, index), [
    index,
    user,
    onChange,
  ]);
  const onChangeContactMethodHandler = useCallback(
    event => {
      event.persist();
      onChange({ ...user, [event.target.name]: event.target.value }, index);
      if (updateRules) {
        updateRules(
          /* istanbul ignore next */ prev => ({
            ...prev,
            users: {
              ...prev.users,
              [`users[${index}].mobilePhoneNumber.required`]: parseInt(event.target.value, 10) === UserModel.PreferredContactMethod.PHONE,
            },
          })
        );
      }
    },
    [index, user, onChange, updateRules]
  );

  useEffect(() => {
    if (groupList && groupList.length) {
      const dropdownList = groupList.map(group => {
        return {
          ...group,
          label: group.name,
          value: group.id,
        };
      });
      setUserInviteGroupList([...UserModel.userInviteList, ...dropdownList]);
      return;
    }

    setUserInviteGroupList(UserModel.userInviteList);
  }, [groupList]);

  useEffect(() => {
    if (!companyId) return;

    let searchRequest = {
      paging: {
        clientSidePagination: true,
      },
      expand: ['company', 'metadata', 'parentGroup'],
      searchParameters: [
        {
          field: 'companyId',
          operator: 'equals',
          value: companyId,
        },
      ],
    };

    fetchGroupSearch(searchRequest);
  }, [companyId]);

  return (
    <Grid data-testid="user-row-item" container={true} className={`${formClasses.formWrapper} ${isListItem ? formClasses.rowsWrapper : ''}`}>
      <Grid item={true} xs={true} lg={true}>
        <Grid container={true}>
          <Grid item={true} xs={showInviteAs ? 4 : 6} lg={showInviteAs ? 4 : 6} className={formClasses.errorPosition}>
            <ControlledError
              show={!!getErrors('firstName', index)}
              error={getConditionalDefaultValue(getErrors('firstName', index) === 'is required', 'Please enter First Name.', getErrors('firstName', index))}
            >
              <ControlledInput styleClass={formClasses.userWrapper} label="First Name">
                <TextField
                  autoFocus={autoFocus}
                  autoComplete="off"
                  variant="outlined"
                  placeholder="First Name"
                  type="text"
                  fullWidth={true}
                  name="firstName"
                  required={userRules.firstName.required}
                  value={user.firstName || ''}
                  onChange={onChangeHandler}
                  error={!!getErrors('firstName', index)}
                  inputProps={{
                    'data-testid': 'user-first-name',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
          <Grid item={true} xs={showInviteAs ? 4 : 6} lg={showInviteAs ? 4 : 6} className={formClasses.errorPosition}>
            <ControlledError
              show={!!getErrors('lastName', index)}
              error={getConditionalDefaultValue(getErrors('lastName', index) === 'is required', 'Please enter Last Name.', getErrors('lastName', index))}
            >
              <ControlledInput styleClass={formClasses.userWrapper} label="Last Name">
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  placeholder="Last Name"
                  type="text"
                  fullWidth={true}
                  name="lastName"
                  required={userRules.lastName.required}
                  value={user.lastName || ''}
                  onChange={onChangeHandler}
                  error={!!getErrors('lastName', index)}
                  inputProps={{
                    'data-testid': 'user-last-name',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
          <Grid item={true} xs={showInviteAs ? 4 : 6} lg={showInviteAs ? 4 : 6} className={formClasses.errorPosition}>
            <ControlledError
              show={!!getErrors('email', index)}
              error={getConditionalDefaultValue(getErrors('email', index) === 'is required', 'Please enter Email Address.', getErrors('email', index))}
            >
              <ControlledInput styleClass={`${formClasses.userWrapper} ${!showInviteAs ? formClasses.userInputControl : ''}`} label="Email Address">
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  placeholder="Email"
                  type="text"
                  fullWidth={true}
                  name="email"
                  required={userRules.email.required}
                  value={user.email || ''}
                  onChange={onChangeHandler}
                  error={!!getErrors('email', index)}
                  inputProps={{
                    'data-testid': 'user-email',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
          <Grid item={true} xs={showInviteAs ? 4 : 6} lg={showInviteAs ? 4 : 6} className={formClasses.errorPosition}>
            <ControlledError
              show={!!getErrors('title', index)}
              error={getConditionalDefaultValue(getErrors('title', index) === 'is required', 'Please enter Title.', getErrors('title', index))}
            >
              <ControlledInput label="Title (Optional)" styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl}`}>
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  placeholder="title"
                  type="text"
                  fullWidth={true}
                  name="title"
                  required={userRules.title.required}
                  value={user.title || ''}
                  onChange={onChangeHandler}
                  error={!!getErrors('title', index)}
                  inputProps={{
                    'data-testid': 'user-title',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
          {showInviteAs && (
            <>
              <Grid item={true} xs={4} lg={4} className={formClasses.errorPosition}>
                <ControlledError show={!!getErrors('invitationType', index)} error={getErrors('invitationType', index)}>
                  <ControlledInput
                    label="Invite User to FCA as"
                    styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl} ${formClasses.userInput}`}
                  >
                    <ControlledSelect
                      label=""
                      name="invitationType"
                      value={user.invitationType || UserModel.InviteType.DO_NOT_INVITE}
                      options={userInviteGroupList}
                      error={!!getErrors('invitationType', index)}
                      onChange={onChangeNumber}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={4} lg={4} className={formClasses.errorPosition}>
                <div className={formClasses.invitationWrapper}>
                  {/* {user.invitationType !== UserModel.InviteType.DO_NOT_INVITE && <Typography>{LANG.EN.INVITE_MESSAGE}</Typography>} */}
                </div>
              </Grid>
            </>
          )}
          <Grid item={true} xs={4} lg={4} className={formClasses.errorPosition}>
            <ControlledError
              show={!!getErrors('mobilePhoneNumber', index)}
              error={getConditionalDefaultValue(
                getErrors('mobilePhoneNumber', index) === 'is required',
                'Please enter Mobile Phone Number.',
                getErrors('mobilePhoneNumber', index)
              )}
            >
              <ControlledInput
                label={`Mobile Phone Number ${Number(user.preferredContactMethod) !== UserModel.PreferredContactMethod.PHONE ? '(Optional)' : ''}`}
                styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl}`}
              >
                <PhoneNumberInput
                  countryList={countryList}
                  value={user.mobilePhoneNumber || ''}
                  onChange={onChangeHandler}
                  inputProps={{
                    variant: 'outlined',
                    error: !!getErrors('mobilePhoneNumber', index),
                    name: 'mobilePhoneNumber',
                    required: formRules?.mobilePhoneNumber?.required || userRules.mobilePhoneNumber.required,
                    'data-testid': 'mobile-user-phone',
                  }}
                />
              </ControlledInput>
            </ControlledError>
          </Grid>
          <Grid item={true} xs={4} lg={4} className={formClasses.errorPosition}>
            <Grid container={true}>
              <Grid className={formClasses.optionalWrapper} item={true} xs={9} lg={9}>
                <ControlledError
                  show={!!getErrors('officePhoneNumber', index)}
                  error={getConditionalDefaultValue(
                    getErrors('officePhoneNumber', index) === 'is required',
                    'Please enter Phone Number.',
                    getErrors('officePhoneNumber', index)
                  )}
                >
                  <ControlledInput label="Office Phone Number (Optional)" styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl}`}>
                    <PhoneNumberInput
                      countryList={countryList}
                      value={user.officePhoneNumber || ''}
                      onChange={onChangeHandler}
                      inputProps={{
                        variant: 'outlined',
                        error: !!getErrors('officePhoneNumber', index),
                        name: 'officePhoneNumber',
                        required: userRules.officePhoneNumber.required,
                        'data-testid': 'office-user-phone',
                        id: `officePhoneNumber-${index}`,
                      }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
              <Grid item={true} xs={3} lg={3} className={formClasses.errorPosition}>
                <ControlledError show={!!getErrors('officePhoneExtension', index)} error={getErrors('officePhoneExtension', index)}>
                  <ControlledInput label="Ext (Optional)" styleClass={`${formClasses.userWrapper} ${formClasses.userInputControl}`}>
                    <TextField
                      autoComplete="off"
                      variant="outlined"
                      placeholder="Ext"
                      type="text"
                      fullWidth={true}
                      name="officePhoneExtension"
                      required={userRules.officePhoneExtension.required}
                      value={user.officePhoneExtension || ''}
                      onChange={onChangeHandler}
                      error={!!getErrors('officePhoneExtension', index)}
                      inputProps={{
                        'data-testid': 'office-user-phone',
                        maxLength: 6,
                      }}
                    />
                  </ControlledInput>
                </ControlledError>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={4} lg={4} className={formClasses.errorPosition}>
            <ControlledError show={!!getErrors('preferredContactMethod', index)} error={getErrors('preferredContactMethod', index)}>
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
                  value: parseInt(user.preferredContactMethod as any, 10),
                  onChange: onChangeContactMethodHandler,
                }}
              />
            </ControlledError>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={getConditionalDefaultValue(hideDeleteContainer, buttonGlobalStyles.hideDeleteButton, formClasses.deleteGridLg)} item={true}>
        <IconButton
          className={`${buttonGlobalStyles.deleteButton} ${showDeleteButton ? buttonGlobalStyles.showDeleteButton : buttonGlobalStyles.hideDeleteButton}`}
          data-testid="delete-user-button"
          onClick={() => onDeleteUser(index)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
UserRow.defaultProps = {
  hideDeleteContainer: false,
  onDeleteUser: /* istanbul ignore next */ () => {
    /* */
  },
};
export default memo(UserRow);
