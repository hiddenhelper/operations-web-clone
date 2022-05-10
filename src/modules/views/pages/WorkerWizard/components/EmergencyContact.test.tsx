import React from 'react';
import { render, act } from '@testing-library/react';
import EmergencyContact from './EmergencyContact';

describe('EmergencyContact Component', () => {
  let props;

  beforeEach(() => {
    props = {
      model: { emergencyContactPhone: null, emergencyContactName: null, emergencyContactRelationship: null },
      formRules: {
        emergencyContactName: {
          required: true,
        },
        emergencyContactPhone: {
          required: false,
        },
        emergencyContactRelationship: {
          required: false,
        },
      },
      errors: {},
      onChangeHandler: jest.fn(),
    };
  });
  it('should show error messages', async () => {
    const { getByText, rerender } = render(<EmergencyContact {...props} />);
    const validationMessage = 'Please enter a valid Emergency Contact Phone.';
    let newProps = props;
    newProps.errors = { emergencyContactPhone: 'is invalid phone number' };
    rerender(<EmergencyContact {...newProps} />);

    await act(async () => {
      expect(getByText(validationMessage));
    });
  });
});
