import { mapStateToProps, mapDispatchToProps } from './SettingsContainer';

import { getInitialState } from '../../../../test/rootState';
import { userState } from '../../../state-mgmt/user';
import { generalState } from '../../../state-mgmt/general';
import { fileState } from '../../../state-mgmt/file';
import { GENERAL } from '../../../../constants';
import { procoreState } from '../../../state-mgmt/procore';

describe('SettingsContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      isAdmin: getInitialState().auth.isAdmin,
      isFcaUser: getInitialState().auth.isFcaUser,
      user: getInitialState().auth.session,
      accountData: getInitialState().user.accountData,
      fileMap: getInitialState().file.fileMap,
      loadingMap: getInitialState().general.loadingMap,
      saveLoading: undefined,
      saveProcoreLoading: undefined,
      changePasswordLoading: undefined,
      status: { isConnected: false },
      countryList: [],
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      changePassword: expect.any(Function),
      clearChangePasswordLoading: expect.any(Function),
      updateProfile: expect.any(Function),
      updateProfilePhoto: expect.any(Function),
      getAccountData: expect.any(Function),
      clearFileUpload: expect.any(Function),
      getStatusProcore: expect.any(Function),
      connectProcore: expect.any(Function),
      disconnectProcore: expect.any(Function),
    });
  });

  it('should dispatch getStatusProcore start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.getStatusProcore();
    expect(dispatch).toBeCalledWith(procoreState.actions.getStatusProcoreStart());
  });

  it('should dispatch connectProcore start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const data = { clientId: '123', clientSecret: '321' };
    props.connectProcore(data);
    expect(dispatch).toBeCalledWith(procoreState.actions.connectProcoreStart(data));
  });

  it('should dispatch disconnectProcore start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.disconnectProcore();
    expect(dispatch).toBeCalledWith(procoreState.actions.disconnectProcoreStart());
  });

  it('should dispatch changePassword start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.changePassword('old', 'new');
    expect(dispatch).toBeCalledWith(userState.actions.changePasswordStart('old', 'new'));
  });

  it('should dispatch clearChangePasswordLoading start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearChangePasswordLoading();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.CHANGE_PASSWORD));
  });

  it('should dispatch updateProfile start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateProfile({ firstName: 'John', lastName: 'Doe' });
    expect(dispatch).toBeCalledWith(userState.actions.updateProfileStart({ firstName: 'John', lastName: 'Doe' }));
  });

  it('should dispatch updateProfilePhoto start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateProfilePhoto();
    expect(dispatch).toBeCalledWith(userState.actions.updateProfilePhotoStart());
  });

  it('should dispatch getAccountData start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.getAccountData();
    expect(dispatch).toBeCalledWith(userState.actions.fetchProfileDataStart());
  });

  it('should dispatch clearFileUpload start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearFileUpload();
    expect(dispatch).toBeCalledWith(fileState.actions.clearMap());
  });
});
