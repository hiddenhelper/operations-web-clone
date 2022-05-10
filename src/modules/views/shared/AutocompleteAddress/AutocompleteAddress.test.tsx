import React from 'react';
import { render, RenderResult, act } from '@testing-library/react';

import AutocompleteAddress, { IAutocompleteAddress } from './AutocompleteAddress';

jest.mock('../../../services/AutocompleteService');

describe('AutocompleteAddress Component', () => {
  let wrapper: RenderResult;
  let props: IAutocompleteAddress;

  beforeEach(() => {
    props = {
      onAddressResponse: jest.fn(),
      valueToShow: '',
      mapInputRef: { current: null },
      inputRef: { current: null },
      forcedQuery: 'test',
    };
  });

  it('should render', async () => {
    await act(async () => {
      wrapper = await render(<AutocompleteAddress {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with initalized location', async () => {
    props.location = { lat: null, lng: 1 };
    await act(async () => {
      wrapper = await render(<AutocompleteAddress {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with initalized map', async () => {
    props.location = { lat: null, lng: null };
    props.mapInputRef = { current: 'ref' };
    await act(async () => {
      wrapper = await render(<AutocompleteAddress {...props} />);
    });
    expect(wrapper.container).toMatchSnapshot();
  });
});
