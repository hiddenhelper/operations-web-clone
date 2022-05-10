import React from 'react';
import { render } from '@testing-library/react';
import DuplicatedWorkerModalContent from './DuplicatedWorkerModalContent';
import { UserModel } from '../../../../models';
import { getExistingWorkerResponse, getWorker_1 } from '../../../../../test/entities';

describe('DuplicatedWorkerModalContent', () => {
  let props;

  beforeEach(() => {
    props = {
      matchedFields: ['fullName', 'email'],
      existingWorker: getExistingWorkerResponse().worker,
      currentWorker: { ...getWorker_1(), mobilePhoneNumber: '123456789' },
      userRole: UserModel.Role.FCA_ADMIN,
    };
  });

  it('should render', () => {
    const wrapper = render(<DuplicatedWorkerModalContent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
