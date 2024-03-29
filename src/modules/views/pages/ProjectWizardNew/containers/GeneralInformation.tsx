import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../../state-mgmt/rootState';
import { GeneralInformationComponent } from '../components';
import { generalState } from '../../../../state-mgmt/general';
import { projectNewState } from '../../../../state-mgmt/project-new';

class GeneralInformation extends React.Component<any, any> {
  public componentDidMount = () => {
    const { fetchCategoryListStart, fetchRegionListStart, fetchNaeListStart, fetchTimeZoneListStart } = this.props;
    fetchCategoryListStart();
    fetchTimeZoneListStart();
    fetchRegionListStart();
    fetchNaeListStart();
  };

  public render(): React.ReactNode {
    const { reviewMode, categoryList, regionList, fcaNaeList, timeZoneList, errors, model, onChange, isFcaUser } = this.props;
    return (
      <GeneralInformationComponent
        errors={errors}
        model={model}
        reviewMode={reviewMode}
        categoryList={categoryList}
        regionList={regionList}
        fcaNaeList={fcaNaeList}
        timeZoneList={timeZoneList}
        onChange={onChange}
        isFcaUser={isFcaUser}
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  reviewMode: state.projectNew.reviewMode,
  categoryList: state.projectNew.categoryList,
  regionList: state.projectNew.regionList,
  fcaNaeList: state.projectNew.fcaNaeList,
  timeZoneList: state.general.timeZoneList,
  isFcaUser: state.auth.isFcaUser,
});

const mapDispatchToProps = {
  fetchCategoryListStart: projectNewState.actions.fetchCategoryListStart,
  fetchTimeZoneListStart: generalState.actions.fetchTimeZoneListStart,
  fetchRegionListStart: projectNewState.actions.fetchRegionListStart,
  fetchNaeListStart: projectNewState.actions.fetchNaeListStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
