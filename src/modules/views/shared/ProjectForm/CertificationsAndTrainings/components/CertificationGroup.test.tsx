import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getCertification_1, getProject_1 } from 'test/entities';
import CertificationGroup, { ICertificationGroupProps } from './CertificationGroup';

describe('AliasRow', () => {
  let props: ICertificationGroupProps;

  beforeEach(() => {
    props = {
      errors: {},
      group: getProject_1().certificationGroups[0],
      options: [getCertification_1()],
      index: 0,
      onChange: jest.fn(),
      onDelete: jest.fn(),
      resetErrors: jest.fn(),
    };
  });

  it('should call resetErrors when delete an item', async () => {
    props.errors = { 'certificationGroups[0].certifications[0].alias': 'Alias is already in use.' };
    const wrapper = render(<CertificationGroup {...props} />);

    const aliasInput = await wrapper.getAllByTestId('item-alias')[0];
    await fireEvent.focus(aliasInput.querySelector('input'));

    const deleteItemButton = await wrapper.getByTestId('delete-item-button');
    fireEvent.click(deleteItemButton);

    expect(props.resetErrors).toHaveBeenCalled();
  });
});
