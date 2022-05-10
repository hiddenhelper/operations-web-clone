import React, { memo, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ResetPasswordForm from './components/ResetPasswordForm';
import ResetPasswordSuccess from './components/ResetPasswordSuccess';

import { parseUrlSearch } from '../../../../utils/generalUtils';
import { GENERAL } from '../../../../constants';
import { GeneralModel } from '../../../models';

export interface IResetPasswordProps {
  loadingStatus: GeneralModel.ILoadingStatus;
  confirmResetPassword: (token: string, email: string, password: string) => void;
  clearLoading: (key: string) => void;
}

const ResetPassword = ({ loadingStatus, confirmResetPassword, clearLoading }: IResetPasswordProps) => {
  const { search } = useLocation();
  const { token, email } = parseUrlSearch(search);

  const onResetPasswordConfirm = useCallback(
    data => {
      confirmResetPassword(token, email, data.password);
    },
    [token, email, confirmResetPassword]
  );

  useEffect(() => {
    return function unMount() {
      clearLoading(GENERAL.LOADING_KEY.CONFIRM_RESET_PASSWORD);
    };
  }, [clearLoading]);

  if (loadingStatus && !loadingStatus.isLoading && !loadingStatus.hasError) {
    return <ResetPasswordSuccess />;
  }

  return <ResetPasswordForm loadingStatus={loadingStatus} onResetPasswordConfirm={onResetPasswordConfirm} />;
};

export default memo(ResetPassword);
