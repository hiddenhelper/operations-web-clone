import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Search from './Search';

import { IRootState } from 'modules/state-mgmt/rootState';
import { generalState } from 'modules/state-mgmt/general';
import { SearchModel } from 'modules/models';
import { GENERAL } from 'constants/index';

export const mapStateToProps = ({ auth, general }: IRootState) => ({
  loading: general.loadingMap[GENERAL.LOADING_KEY.FETCH_SEARCH],
  loadingMore: general.loadingMap[GENERAL.LOADING_KEY.FETCH_SEARCH_MORE],
  searchResults: general.searchResults,
  userRole: auth.role,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearSearch: () => dispatch(generalState.actions.clearSearch()),
  triggerSearch: (search: SearchModel.ISearchParams) => dispatch(generalState.actions.fetchSearchStart(search)),
  triggerSearchMore: (search: SearchModel.ISearchParams) => dispatch(generalState.actions.fetchSearchMoreStart(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
