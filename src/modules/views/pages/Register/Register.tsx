import React, { memo, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from '../../shared/Loader';
import Expired from './components/Expired';
import Success from './components/Success';
import AccountConfirm from './components/AccountConfirm';

import { GeneralModel } from '../../../models';
import { parseUrlSearch } from '../../../../utils/generalUtils';

export interface IRegisterProps {
  email: string;
  loadingCreateStatus: GeneralModel.ILoadingStatus;
  loadingTokenStatus: GeneralModel.ILoadingStatus;
  validateToken: (token: string) => void;
  createAccount: (token: string, password: string) => void;
  navigate: (path: string) => void;
}

const Register = ({ loadingCreateStatus, loadingTokenStatus, email, navigate, validateToken, createAccount }: IRegisterProps) => {
  const { search } = useLocation();
  const { token } = parseUrlSearch(search);

  const onCreateAccount = useCallback(
    data => {
      createAccount(token, data.password);
    },
    [token, createAccount]
  );

  useEffect(() => {
    if (token) validateToken(token);
    if (!token) navigate('/');
  }, [token, validateToken, navigate]);

  if (!loadingTokenStatus || (loadingTokenStatus && loadingTokenStatus.isLoading) || (loadingCreateStatus && loadingCreateStatus.isLoading)) {
    return <Loader />;
  }

  if (loadingTokenStatus && loadingTokenStatus.hasError) {
    return <Expired expired={loadingTokenStatus.error} />;
  }

  if (loadingCreateStatus && !loadingCreateStatus.hasError) {
    return <Success />;
  }

  return <AccountConfirm loadingStatus={loadingCreateStatus} email={email} onCreateAccount={onCreateAccount} />;
};

export default memo(Register);
