import React, { memo, useCallback, useMemo } from 'react';

import ButtonTab from '../../shared/ButtonTab';
import SettingsLayout from '../../shared/Settings/Layout';
import CreditCardTab from './components/CreditCardTab';

import { PaymentModel, UserModel } from '../../../models';
import { useQueryParamState } from '../../../../utils/useQueryParamState';

export interface IPaymentSettingsProps {
  userRole: UserModel.Role;
}

export interface IQueryParams {
  filter: string;
}

const PaymentSettings = ({ userRole }: IPaymentSettingsProps) => {
  const [queryParams, setQueryParams] = useQueryParamState<IQueryParams>({
    filter: PaymentModel.settingsFilterMap[PaymentModel.SettingsFilterType.CREDIT_CARD].key,
  });

  const tabList = useMemo(() => Object.values(PaymentModel.settingsFilterMap).filter(item => item.roleList.includes(userRole)), [userRole]);

  const setFilter = useCallback(
    (filter: number) => {
      setQueryParams({ filter: PaymentModel.settingsFilterMap[filter].key });
    },
    [setQueryParams]
  );

  return (
    <SettingsLayout
      title="Payment Settings"
      renderFilter={() => (
        <>
          {tabList.map(optFilter => (
            <ButtonTab key={optFilter.id} optFilter={optFilter} isActive={optFilter.key === queryParams.filter} setFilter={setFilter} />
          ))}
        </>
      )}
      renderContent={() => <>{queryParams.filter === 'credit-card' && <CreditCardTab />}</>}
    />
  );
};

export default memo(PaymentSettings);
