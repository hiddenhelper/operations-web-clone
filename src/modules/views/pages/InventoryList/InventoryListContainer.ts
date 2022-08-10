import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '../../../state-mgmt/rootState';
import { GENERAL } from '../../../../constants';
import InventoryList from './InventoryList';
import { statisticsState } from '../../../state-mgmt/statistics';

export const mapStateToProps = (state: IRootState) => ({
  userRole: state.auth.role,
  inventoryStatistics: state.statistics.inventoryStatistics,
  statisticsLoading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_INVENTORY_STATISTICS],
  currentUserPermissions: state.auth.session?.permissions,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchInventoryStatistics: () => dispatch(statisticsState.actions.fetchInventoryStatisticsStart()),
  clearInventoryStatistics: () => dispatch(statisticsState.actions.clearInventoryStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
