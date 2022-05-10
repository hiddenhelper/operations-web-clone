import { mapStateToProps, mapDispatchToProps } from './AddressFormContainer';
import { getInitialState } from '../../../../../test/rootState';
import { generalState } from '../../../../state-mgmt/general';

describe('AddressFormContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      countryList: getInitialState().general.countryList,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchCountryList: expect.any(Function),
    });
  });

  it('should dispatch fetchCountryList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchCountryList();
    expect(dispatch).toBeCalledWith(generalState.actions.fetchCountryListStart());
  });
});
