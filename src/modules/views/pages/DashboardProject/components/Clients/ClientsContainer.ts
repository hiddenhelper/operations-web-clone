import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import Clients from './Clients';

export const mapStateToProps = (state: IRootState) => ({
  pieStatisticsMap: state.statistics.pieStatisticsMap,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECTS_CLIENTS_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchClientWidget: (key: string, query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchProjectClientsStart(key, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
