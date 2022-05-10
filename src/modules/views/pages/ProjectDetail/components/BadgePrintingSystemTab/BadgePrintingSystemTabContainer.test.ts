import { getInitialState } from '../../../../../../test/rootState';
import { getProject_1, getBadgePrinterSystem_1 } from '../../../../../../test/entities';
import { badgePrinterSystemState } from '../../../../../state-mgmt/badge-printer-system';
import { projectState } from '../../../../../state-mgmt/project';
import { mapStateToProps, mapDispatchToProps } from './BadgePrintingSystemTabContainer';

describe('BadgePrintingSystemTabContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      badgePrintingSystemMap: getInitialState().badgePrinterSystem.badgePrinterSystemMap,
      badgePrintingSystemCount: getInitialState().badgePrinterSystem.count,
      modalMap: getInitialState().general.modalMap,
      modalCount: getInitialState().general.modalCount,
      badgePrintingSystemSummaryLoading: undefined,
      loadBadgePrintingSystemModalLoading: undefined,
      unassignBadgePrintingSystemLoading: undefined,
      assignBadgePrintingSystemLoading: undefined,
      badgePrintingSystemProjectLoading: undefined,
      badgePrintingSystemLoading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      assignBadgePrintingSystem: expect.any(Function),
      fetchBadgePrintingSystemList: expect.any(Function),
      fetchBadgePrintingSystemSummary: expect.any(Function),
      unAssignBadgePrintingSystem: expect.any(Function),
      updateBadgePrintingSystemDate: expect.any(Function),
      fetchProjectBadgePrintingSystemList: expect.any(Function),
    });
  });

  it('should dispatch assignBadgePrintingSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.assignBadgePrintingSystem(getProject_1().id, [{ id: '1', location: 'test' }]);
    expect(dispatch).toBeCalledWith(projectState.actions.assignBadgePrintingProjectStart(getProject_1().id, [{ id: '1', location: 'test' }]));
  });

  it('should dispatch fetchBadgePrintingSystemList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = {} as any;
    props.fetchBadgePrintingSystemList(query);
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.fetchBadgePrintingSystemProjectListStart(query));
  });

  it('should dispatch fetchBadgePrintingSystemSummary start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgePrintingSystemSummary(getBadgePrinterSystem_1().id);
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.fetchBadgePrintingSystemSummaryStart(getBadgePrinterSystem_1().id));
  });

  it('should dispatch unAssignBadgePrintingSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.unAssignBadgePrintingSystem(getProject_1().id, getBadgePrinterSystem_1().id);
    expect(dispatch).toBeCalledWith(projectState.actions.unAssignBadgePrintingSystemStart(getProject_1().id, getBadgePrinterSystem_1().id));
  });

  it('should dispatch updateBadgePrintingSystemDate start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateBadgePrintingSystemDate(getProject_1().id, getBadgePrinterSystem_1().id, 'location');
    expect(dispatch).toBeCalledWith(
      badgePrinterSystemState.actions.updateBadgePrintingSystemDateStart(getProject_1().id, getBadgePrinterSystem_1().id, 'location')
    );
  });

  it('should dispatch fetchProjectBadgePrintingSystemList start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchProjectBadgePrintingSystemList(getBadgePrinterSystem_1().id, 1, 10);
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.fetchProjectBadgePrintingSystemListStart(getBadgePrinterSystem_1().id, 1, 10));
  });
});
