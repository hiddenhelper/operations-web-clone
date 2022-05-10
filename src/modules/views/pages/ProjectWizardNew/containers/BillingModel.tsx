import { projectNewState } from 'modules/state-mgmt/project-new';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../../state-mgmt/rootState';
import { BillingModelComponent } from '../components';

class BillingModel extends React.Component<any, any> {
  public componentDidMount(): void {
    const { fetchBillingTierList } = this.props;
    fetchBillingTierList();
  }

  public render(): React.ReactNode {
    const { billingTierList, errors, model, onChange, resetErrors } = this.props;
    return <BillingModelComponent model={model} errors={errors} onChange={onChange} resetErrors={resetErrors} billingTierList={billingTierList} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  billingTierList: state.projectNew.billingTierList,
});

const mapDispatchToProps = {
  fetchBillingTierList: projectNewState.actions.fetchBillingTierListStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingModel);
