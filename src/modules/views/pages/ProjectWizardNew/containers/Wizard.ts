import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { IRootState } from '../../../../state-mgmt/rootState';
import Wizard from '../components/Wizard';
import { generalState } from 'modules/state-mgmt/general';
import { projectNewState } from 'modules/state-mgmt/project-new';
import { projectState } from 'modules/state-mgmt/project';

const mapStateToProps = (state: IRootState) => ({
  projectMap: state.projectNew.projectMap,
  reviewMode: state.projectNew.reviewMode,
  categoryList: state.projectNew.categoryList,
  regionList: state.projectNew.regionList,
  fcaNaeList: state.projectNew.fcaNaeList,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigate: (path: string) => dispatch(push(path)),
  setReviewMode: (reviewMode: boolean) => dispatch(projectNewState.actions.setReviewMode(reviewMode)),
  clearLoadingMap: () => dispatch(generalState.actions.clearLoadingMap()),
  fetchCategoryList: () => dispatch(projectNewState.actions.fetchCategoryListStart()),
  fetchRegionList: () => dispatch(projectNewState.actions.fetchRegionListStart()),
  fetchNaeList: () => dispatch(projectState.actions.fetchNaeListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
