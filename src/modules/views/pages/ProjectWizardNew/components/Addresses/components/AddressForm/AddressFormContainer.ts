import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from 'modules/state-mgmt/rootState';
import { generalState } from 'modules/state-mgmt/general';

import AddresForm from './AddressForm';

export const mapStateToProps = (state: IRootState) => ({
  countryList: state.general.countryList,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCountryList: () => dispatch(generalState.actions.fetchCountryListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddresForm);
