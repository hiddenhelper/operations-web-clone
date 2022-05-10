import React, { memo, useMemo } from 'react';

import Card from '../../../shared/ResourceManagement/Card/Card';
import AddressForm from '../../../shared/ResourceManagement/AddressForm';

import { AddressModel, WorkerModel } from '../../../../models';
import { IFormRules } from '../../../../../utils/useValidator';

export interface IHomeAddressProps {
  model: WorkerModel.IWorker;
  errors: any;
  onChangeHandler: (model: any) => void;
  formRules: IFormRules;
}

const HomeAddress = ({ model, errors, onChangeHandler, formRules }: IHomeAddressProps) => {
  const homeAddress = useMemo(() => model.address ?? AddressModel.getFallbackAddress(), [model.address]);
  return (
    <Card title="Home Address">
      <AddressForm
        addressModel={homeAddress}
        modelProperty="address"
        optional={false}
        line1Placeholder="Address Line 1"
        line2Placeholder="Address Line 2"
        includeCounty={true}
        errors={errors}
        onChange={onChangeHandler}
        labelRules={formRules}
      />
    </Card>
  );
};

export default memo(HomeAddress);
