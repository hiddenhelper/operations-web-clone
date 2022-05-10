import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import { getAddress_1, getCountry_1, getCountry_2, getCountry_3, getCountry_4 } from '../../../../../test/entities';

import AddressForm, { IAddressFormProps } from './AddressForm';
import { AddressModel } from '../../../../models';
import { noop } from '../../../../../utils/generalUtils';

describe('Address Form', () => {
  let props: IAddressFormProps;
  let wrapper;

  beforeEach(() => {
    props = {
      addressModel: getAddress_1(),
      modelProperty: 'addr',
      errors: {
        addr: {
          line1: ['err'],
          stateCode: ['err'],
          city: ['err'],
        },
      },
      countryList: [getCountry_1(), getCountry_2(), getCountry_3(), getCountry_4()],
      onChange: jest.fn(),
      fetchCountryList: jest.fn(),
    };
  });

  it('should render', async () => {
    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should fetchCountryList', async () => {
    await act(async () => {
      render(<AddressForm {...props} />);
    });
    expect(props.fetchCountryList).toHaveBeenCalled();
  });

  it('should render server errors', async () => {
    props.errors = {
      'addr.line2': ['err'],
    };

    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render NY resident', async () => {
    props.addressModel = { ...getAddress_1(), stateCode: 'NY', city: 'New York' };
    props.errors = {};
    props.includeCounty = true;

    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render NY resident optional', async () => {
    (props.addressModel = { ...getAddress_1(), stateCode: 'NY', city: 'New York' }), (props.errors = {});
    props.includeCounty = true;
    props.optional = true;

    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render attention field', async () => {
    props.includeAttentionField = true;

    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });

    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render zip code mask plus four', async () => {
    props.addressModel = { ...getAddress_1(), zipCode: '127833549' };

    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });

    expect(wrapper.getByTestId('zip-code').value).toEqual('12783-3549');
  });

  it('should change zip code mask', async () => {
    props.addressModel = { ...getAddress_1(), countryId: getCountry_1().id, zipCode: '' };
    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });

    act(() => {
      fireEvent.mouseDown(wrapper.getByText('United States'));
    });

    act(() => {
      fireEvent.click(wrapper.getByText('Canada'));
    });

    expect(wrapper.getByTestId('zip-code').placeholder).toEqual(AddressModel.zipCodeFormatMap[AddressModel.ZipCodeFormatType.CANADA_FORMAT].placeholder);
  });

  it('should change zip code', async () => {
    props.addressModel = { ...getAddress_1(), countryId: getCountry_1().id, zipCode: '' };
    await act(async () => {
      wrapper = render(<AddressForm {...props} />);
    });

    act(() => {
      fireEvent.change(wrapper.getByTestId('zip-code'), { persist: noop(), target: { name: 'zipCode', value: '12345' } });
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
