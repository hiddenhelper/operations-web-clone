import { connect } from 'react-redux';

import { generalState } from '../../../state-mgmt/general';

import ButtonPrinter from './ButtonPrinter';

export const mapDispatchToProps = dispatch => ({
  destroyPrinter: () => dispatch(generalState.actions.destroyPrinter()),
});

export default connect(null, mapDispatchToProps)(ButtonPrinter);
