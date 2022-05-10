import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import Mappings, { IWorkerConsentFormMappingProps } from './Mappings';
import { getConsentFormFieldConfigs, getConsentFormFields } from '../../../../../test/entities';

const consentFormFields = getConsentFormFields();
const fieldConfigs = getConsentFormFieldConfigs();

describe('WorkerConsentFormMappings', () => {
  let props: IWorkerConsentFormMappingProps;

  beforeEach(() => {
    props = {
      name: 'consentFormFields',
      items: consentFormFields,
      value: fieldConfigs,
      onChange: jest.fn(),
    };
  });

  it('should render worker consent form and show available fields', () => {
    const wrapper = render(<Mappings {...props} />);
    expect(wrapper.getByText(consentFormFields[0].name));
    expect(wrapper.getAllByTestId('field-is-visible-checkbox').length).toBe(props.items.length);
    expect(wrapper.getAllByTestId('field-is-mandatory-checkbox').length).toBe(props.items.length);
  });

  it('should render worker consent form with default settings if no custom settings are provided', () => {
    props.value = [];
    const wrapper = render(<Mappings {...props} />);
    // field non visible non mandatory
    expect(wrapper.getAllByTestId('field-is-visible-checkbox')[0].classList).not.toContain('Mui-checked');
    expect(wrapper.getAllByTestId('field-is-mandatory-checkbox')[0].classList).not.toContain('Mui-checked');
  });

  it('checks should respect the state from field configs/value', () => {
    const fieldWithDefaultSettings0 = consentFormFields[0];
    const fieldWithDefaultSettings1 = consentFormFields[1];
    const fieldWithDefaultSettings2 = consentFormFields[2];
    props.items = [fieldWithDefaultSettings0, fieldWithDefaultSettings1, fieldWithDefaultSettings2];
    props.value = [
      {
        consentFormFieldId: fieldWithDefaultSettings0.id,
        consentFormFieldName: fieldWithDefaultSettings0.name,
        isVisible: false,
        isMandatory: false,
      },
      {
        consentFormFieldId: fieldWithDefaultSettings1.id,
        consentFormFieldName: fieldWithDefaultSettings1.name,
        isVisible: true,
        isMandatory: false,
      },
      {
        consentFormFieldId: fieldWithDefaultSettings2.id,
        consentFormFieldName: fieldWithDefaultSettings2.name,
        isVisible: true,
        isMandatory: true,
      },
    ];
    const wrapper = render(<Mappings {...props} />);

    const isVisibleChecks = wrapper.getAllByTestId('field-is-visible-checkbox');
    const isMandatoryChecks = wrapper.getAllByTestId('field-is-mandatory-checkbox');

    expect(isVisibleChecks.length).toBe(3);
    expect(isMandatoryChecks.length).toBe(3);

    // field non visible non mandatory
    expect(isVisibleChecks[0].classList).not.toContain('Mui-checked');
    expect(isMandatoryChecks[0].classList).not.toContain('Mui-checked');

    // field visible non mandatory
    expect(isVisibleChecks[1].classList).toContain('Mui-checked');
    expect(isMandatoryChecks[1].classList).not.toContain('Mui-checked');

    // field visible and mandatory
    expect(isVisibleChecks[2].classList).toContain('Mui-checked');
    expect(isMandatoryChecks[2].classList).toContain('Mui-checked');
  });

  it('should set mandatory to false if visible is set to false', async () => {
    props.items = [consentFormFields[0]];
    props.value = [
      {
        consentFormFieldId: consentFormFields[0].id,
        consentFormFieldName: consentFormFields[0].name,
        isVisible: true,
        isMandatory: true,
      },
    ];
    const wrapper = render(<Mappings {...props} />);
    const isVisibleCheck = wrapper.getAllByTestId('field-is-visible-checkbox')[0];
    const isMandatoryCheck = wrapper.getAllByTestId('field-is-mandatory-checkbox')[0];

    expect(isVisibleCheck.classList).toContain('Mui-checked');
    expect(isMandatoryCheck.classList).toContain('Mui-checked');

    await act(async () => {
      await fireEvent.click(isVisibleCheck.querySelector('input'));
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should set a new config for a not configured field', () => {
    props.value = [];
    const wrapper = render(<Mappings {...props} />);

    const isVisibleChecks = wrapper.getAllByTestId('field-is-visible-checkbox');
    const isMandatoryChecks = wrapper.getAllByTestId('field-is-mandatory-checkbox');

    expect(isVisibleChecks[0].classList).not.toContain('Mui-checked');
    expect(isMandatoryChecks[0].classList).not.toContain('Mui-checked');

    act(() => {
      fireEvent.click(isVisibleChecks[0].querySelector('input'));
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should trigger a state change when clicking visibility check', () => {
    const wrapper = render(<Mappings {...props} />);
    const isVisibleCheck = wrapper.getAllByTestId('field-is-visible-checkbox')[0];

    act(() => {
      fireEvent.click(isVisibleCheck.querySelector('input'));
    });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should trigger a state change when clicking mandatory check', () => {
    const wrapper = render(<Mappings {...props} />);
    const isMandatoryCheck = wrapper.getAllByTestId('field-is-mandatory-checkbox')[0];

    act(() => {
      fireEvent.click(isMandatoryCheck.querySelector('input'));
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
