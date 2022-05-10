import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import Card from 'modules/views/shared/ResourceManagement/Card';
import ControlledError from 'modules/views/shared/FormHandler/ControlledError';
import ControlledInput from 'modules/views/shared/FormHandler/ControlledInput';
import TaxpayerIdHelperModal from 'modules/views/shared/ClientForm/TaxpayerIdHelperModal';
import UserRow from 'modules/views/shared/ClientForm/UserRow';

import { ClientModel, GeneralModel } from 'modules/models';
import { IFormRules } from 'utils/useValidator';
import { getConditionalDefaultValue, isEmpty } from 'utils';
import { formGlobalStyles } from 'assets/styles';

export interface IProps {
  countryList?: GeneralModel.INamedEntity[];
  edit: boolean;
  errors: any;
  formRules: IFormRules;
  model: ClientModel.IClient;
  onChange: (model: any) => void;
  updateRules: (s: IFormRules | ((p: IFormRules) => IFormRules)) => void;
}

const ClientInviteForm = ({ countryList, errors, formRules, model, onChange, updateRules }: IProps) => {
  const formClasses = formGlobalStyles();

  const [showTaxpayerHint, setShowTaxpayerHint] = useState<boolean>(false);
  const togglesShowTaxpayerHint = () => setShowTaxpayerHint(prevVal => !prevVal);

  const onChangeHandler = useCallback(
    event => {
      event?.persist();
      onChange(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
    },
    [onChange]
  );
  const userChangeHandler = useCallback(user => onChange(prevState => ({ ...prevState, users: [user] })), [onChange]);

  const getUsersErrors = useCallback(
    (field: string, index: number) => {
      if (field === 'mobilePhoneNumber' && !isEmpty(errors) && formRules?.users?.[`users[${index}].mobilePhoneNumber.required`]) {
        return errors?.[`users[${index}].${field}`] ?? 'is required';
      }
      return errors?.users?.[`users[${index}].${field}`] || errors?.[`users[${index}].${field}`];
    },
    [errors, formRules]
  );

  return (
    <>
      <Card title="Client Name">
        <ControlledError show={!!errors.name} error={getConditionalDefaultValue(errors.name === 'is required', 'Please enter Client Name.', errors.name)}>
          <ControlledInput label="Client Name">
            <TextField
              variant="outlined"
              data-testid="client-name-wrapper"
              placeholder="Client name"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="name"
              required={formRules.name.required}
              value={model.name || ''}
              onChange={onChangeHandler}
              error={!!errors.name}
              inputProps={{ 'data-testid': 'client-name' }}
            />
          </ControlledInput>
        </ControlledError>
      </Card>

      <Card
        title="Legal Information"
        showAttentionIcon={true}
        actionStyleClass={formClasses.infoSecondaryAction}
        secondaryAction={
          <>
            Taxpayer ID Number depends on the Client’s country.
            <Button color="primary" onClick={togglesShowTaxpayerHint} size="small" tabIndex={-1}>
              More info
            </Button>
          </>
        }
      >
        <ControlledError
          show={!!errors.taxpayerIdentificationNumber}
          error={getConditionalDefaultValue(
            errors.taxpayerIdentificationNumber === 'is required',
            'Please enter Taxpayer Identification Number.',
            errors.taxpayerIdentificationNumber
          )}
        >
          <ControlledInput label="Taxpayer Identification Number (Optional)">
            <TextField
              variant="outlined"
              data-testid="client-taxpayerIdentificationNumber-wrapper"
              placeholder="Taxpayer Identification Number"
              type="text"
              autoComplete="off"
              fullWidth={true}
              name="taxpayerIdentificationNumber"
              required={formRules.taxpayerIdentificationNumber.required}
              value={model.taxpayerIdentificationNumber || ''}
              onChange={onChangeHandler}
              error={!!errors.taxpayerIdentificationNumber}
              inputProps={{ 'data-testid': 'client-taxpayerIdentificationNumber' }}
            />
          </ControlledInput>
        </ControlledError>
      </Card>

      <Card title="Client Admin">
        {model?.users?.[0] && (
          <UserRow
            autoFocus={false}
            countryList={countryList}
            getErrors={getUsersErrors}
            hideDeleteContainer={true}
            index={0}
            isListItem={false}
            onChange={userChangeHandler}
            showDeleteButton={false}
            showInviteAs={false}
            user={model.users[0]}
            formRules={formRules}
            updateRules={updateRules}
          />
        )}
      </Card>

      <TaxpayerIdHelperModal onClose={togglesShowTaxpayerHint} show={showTaxpayerHint} />
    </>
  );
};

export default ClientInviteForm;
