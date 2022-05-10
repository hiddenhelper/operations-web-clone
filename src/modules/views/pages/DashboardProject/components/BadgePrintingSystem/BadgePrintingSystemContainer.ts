import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import BadgePrintingSystem from './BadgePrintingSystem';

export const mapStateToProps = (state: IRootState) => ({
  bpsWidget: state.statistics.bpsProjectStatistics,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECTS_BPS_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBpsWidget: (query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchProjectBpsStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgePrintingSystem);
