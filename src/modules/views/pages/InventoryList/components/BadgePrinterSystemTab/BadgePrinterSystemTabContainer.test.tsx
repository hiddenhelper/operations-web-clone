import { push } from 'connected-react-router';
import { mapDispatchToProps, mapStateToProps } from './BadgePrinterSystemTabContainer';
import { badgePrinterSystemState } from '../../../../../state-mgmt/badge-printer-system';
import { getInitialState } from '../../../../../../test/rootState';
import { getBadgePrinterSystem_1 } from '../../../../../../test/entities';

describe('BadgePrinterSystemTabContainer', () => {
  it('should mapStateToProps', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      userRole: getInitialState().auth.role,
      badgePrinterSystemMap: getInitialState().accessControlSystem.accessControlSystemMap,
      deviceCount: getInitialState().badgePrinterSystem.count,
      loading: undefined,
      summaryLoading: undefined,
      deleteLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchBadgePrinterSystemList: expect.any(Function),
      fetchBadgePrinterSystemSummary: expect.any(Function),
      deleteBadgePrinterSystem: expect.any(Function),
      navigate: expect.any(Function),
    });
  });

  it('should dispatch fetchBadgePrinterSystemList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgePrinterSystemList({});
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.fetchBadgePrinterSystemListStart({}));
  });

  it('should dispatch fetchBadgePrinterSystemSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgePrinterSystemSummary(getBadgePrinterSystem_1().id);
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.fetchBadgePrintingSystemSummaryStart(getBadgePrinterSystem_1().id));
  });

  it('should dispatch deleteBadgePrinterSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deleteBadgePrinterSystem(getBadgePrinterSystem_1().id, {});
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.deleteBadgePrinterSystemStart(getBadgePrinterSystem_1().id, {}));
  });

  it('should dispatch navigate action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.navigate('/some/path');
    expect(dispatch).toBeCalledWith(push('/some/path'));
  });
});
