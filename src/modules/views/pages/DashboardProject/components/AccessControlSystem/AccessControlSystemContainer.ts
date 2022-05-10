import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeneralModel } from '../../../../../models';
import { GENERAL } from '../../../../../../constants';
import { IRootState } from '../../../../../state-mgmt/rootState';
import { statisticsState } from '../../../../../state-mgmt/statistics';

import AccessControlSystem from './AccessControlSystem';

export const mapStateToProps = (state: IRootState) => ({
  acsWidget: state.statistics.acsProjectStatistics,
  loading: state.general.loadingMap[GENERAL.LOADING_KEY.FETCH_PROJECTS_ACS_STATISTICS],
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAcsWidget: (query: GeneralModel.IQueryParams) => dispatch(statisticsState.actions.fetchProjectAcsStart(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccessControlSystem);
