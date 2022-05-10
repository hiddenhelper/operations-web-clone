import { getInitialState } from '../../../../../../test/rootState';
import { procoreState } from '../../../../../state-mgmt/procore';
import { mapStateToProps, mapDispatchToProps } from './VendorMappingsTabContainer';

describe('ProcoreVendorMappingsTabContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      procoreVendors: getInitialState().procore.procoreVendors,
      procoreVendorMappings: getInitialState().procore.procoreVendorMappings,
      procoreVendorsLoading: undefined,
      procoreVendorMappingsLoading: undefined,
      procoreVendorMappingsSaving: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchProcoreVendors: expect.any(Function),
      fetchProcoreVendorMappings: expect.any(Function),
      saveProcoreVendorMappings: expect.any(Function),
    });
  });

  it('should dispatch fetch data start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProcoreVendors('123');
    props.fetchProcoreVendorMappings('123');
    expect(dispatch).toBeCalledWith(procoreState.actions.fetchProcoreVendorsStart('123'));
    expect(dispatch).toBeCalledWith(procoreState.actions.fetchProcoreVendorMappingsStart('123'));
  });

  it('should dispatch save data', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveProcoreVendorMappings('123', []);
    expect(dispatch).toBeCalledWith(procoreState.actions.saveProcoreVendorMappingsStart('123', []));
  });
});
