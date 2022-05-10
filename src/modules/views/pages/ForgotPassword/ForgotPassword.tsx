import React, { memo, useCallback, useEffect } from 'react';

import ResetPasswordMessage from './components/ResetPasswordMessage';
import ResetPasswordRequest from './components/ResetPasswordRequest';

import { GeneralModel } from '../../../models';
import { GENERAL } from '../../../../constants';

export interface IForgotPasswordProps {
  loadingStatus: GeneralModel.ILoadingStatus;
  resetPassword: (email: string) => void;
  clearLoading: (key: string) => void;
}

const ForgotPassword = ({ loadingStatus, resetPassword, clearLoading }: IForgotPasswordProps) => {
  const onResetPassword = useCallback(
    data => {
      resetPassword(data.email);
    },
    [resetPassword]
  );

  useEffect(() => {
    return function unMount() {
      clearLoading(GENERAL.LOADING_KEY.RESET_PASSWORD);
    };
  }, [clearLoading]);

  if (loadingStatus && !loadingStatus.isLoading && !loadingStatus.hasError) {
    return <ResetPasswordMessage />;
  }

  return <ResetPasswordRequest loadingStatus={loadingStatus} onResetPassword={onResetPassword} />;
};

export default memo(ForgotPassword);
