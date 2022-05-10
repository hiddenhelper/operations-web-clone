import React from 'react';
import { render } from '@testing-library/react';

import { UserModel } from '../../../models';
import RoleGuard, { IRoleGuardProps } from './RoleGuard';

describe('RoleGuard', () => {
  let wrapper;
  let props: IRoleGuardProps;

  describe('should render', () => {
    beforeEach(() => {
      props = {
        currentUserRole: null,
        roleList: [UserModel.Role.FCA_ADMIN, UserModel.Role.FCA_ADMIN],
        children: null,
      };
    });

    it('should render when role matches with one of the roleList', () => {
      props.currentUserRole = UserModel.Role.FCA_ADMIN;
      wrapper = render(
        <RoleGuard {...props}>
          <p>render me</p>
        </RoleGuard>
      );
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should NOT render when role DOES NOT match', () => {
      props.currentUserRole = UserModel.Role.CLIENT_ADMIN;
      wrapper = render(
        <RoleGuard {...props}>
          <p>{"don't render me"}</p>
        </RoleGuard>
      );
      expect(wrapper.container).toMatchSnapshot();
    });
  });

  it('should render fallback', () => {
    props.currentUserRole = UserModel.Role.REGULAR_USER;
    props.fallback = <p>fallback</p>;
    wrapper = render(
      <RoleGuard {...props}>
        <p>wrapper</p>
      </RoleGuard>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
