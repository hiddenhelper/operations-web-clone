import React, { memo, useMemo } from 'react';

import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '../FormHandler/Checkbox';
import Card from '../ResourceManagement/Card';
import AddressForm from '../ResourceManagement/AddressForm';

import { AddressModel, ClientModel } from '../../../models';
import { getConditionalDefaultValue } from '../../../../utils/generalUtils';
import { formGlobalStyles } from '../../../../assets/styles';

export interface IAddressesProps {
  model: ClientModel.IClient;
  errors: any;
  onChange: (event: any) => void;
}

const Addresses = ({ model, errors, onChange }: IAddressesProps) => {
  const formClasses = formGlobalStyles();
  const onSameAddressChange = event => {
    event.persist();
    onChange(prevState => ({
      ...prevState,
      mailingAddressMatchesBillingAddress: event.target.checked,
      mailingAddress: event.target.checked ? prevState.mailingAddress : AddressModel.getFallbackAddress(),
    }));
  };
  const billingAddress = useMemo(
    () => (model[ClientModel.ClientFields.BILLING_ADDRESS] ? model[ClientModel.ClientFields.BILLING_ADDRESS] : AddressModel.getFallbackAddress()),
    [model]
  );
  const mailingAddress = useMemo(
    () => (model[ClientModel.ClientFields.MAILING_ADDRESS] ? model[ClientModel.ClientFields.MAILING_ADDRESS] : AddressModel.getFallbackAddress()),
    [model]
  );
  return (
    <>
      <Card title="Billing Address">
        <AddressForm
          includeAttentionField={true}
          onChange={onChange}
          addressModel={billingAddress}
          errors={errors}
          modelProperty={ClientModel.ClientFields.BILLING_ADDRESS}
          showAttentionHint={false}
        />
      </Card>
      <Card title="Mailing Address" styleClass={formClasses.mailingWrapper}>
        <FormControlLabel
          className={formClasses.addressCheckbox}
          label="Same as Billing Address"
          control={
            <Checkbox
              name="mailingAddress"
              value="mailingAddressMatchesBillingAddress"
              isChecked={model.mailingAddressMatchesBillingAddress}
              onChange={onSameAddressChange}
              inputProps={{ 'data-testid': 'addr-same' }}
            />
          }
        />
        <Divider className={getConditionalDefaultValue(!model.mailingAddressMatchesBillingAddress, formClasses.mailingAddressDivider, '')} />
        {!model.mailingAddressMatchesBillingAddress && (
          <AddressForm
            includeAttentionField={true}
            addressModel={mailingAddress}
            errors={errors}
            modelProperty={ClientModel.ClientFields.MAILING_ADDRESS}
            onChange={onChange}
            showAttentionHint={false}
          />
        )}
      </Card>
    </>
  );
};

export default memo(Addresses);
