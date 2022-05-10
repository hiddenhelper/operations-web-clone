import { mapStateToProps, mapDispatchToProps } from './BadgePrinterSystemWizardContainer';
import { getInitialState } from '../../../../test/rootState';
import { badgePrinterSystemState } from '../../../state-mgmt/badge-printer-system';
import { generalState } from '../../../state-mgmt/general';
import { GENERAL } from '../../../../constants';
import { getBadgePrinterSystem_1 } from '../../../../test/entities';

describe('BadgePrinterSystemWizardContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(getInitialState())).toEqual({
      badgePrinterSystemMap: getInitialState().badgePrinterSystem.badgePrinterSystemMap,
      loading: undefined,
    });
  });

  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchBadgePrinterSystem: expect.any(Function),
      saveBadgePrinterSystem: expect.any(Function),
      updateBadgePrinterSystem: expect.any(Function),
      clearBadgePrinterSystemMap: expect.any(Function),
      clearErrors: expect.any(Function),
    });
  });

  it('should dispatch fetchBadgePrinterSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchBadgePrinterSystem(getBadgePrinterSystem_1().id);
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.fetchBadgePrinterSystemStart(getBadgePrinterSystem_1().id));
  });

  it('should dispatch saveBadgePrinterSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.saveBadgePrinterSystem(getBadgePrinterSystem_1());
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.saveBadgePrinterSystemStart(getBadgePrinterSystem_1()));
  });

  it('should dispatch updateBadgePrinterSystem start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.updateBadgePrinterSystem(getBadgePrinterSystem_1());
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.updateBadgePrinterSystemStart(getBadgePrinterSystem_1()));
  });

  it('should dispatch clearBadgePrinterSystemMap start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearBadgePrinterSystemMap();
    expect(dispatch).toBeCalledWith(badgePrinterSystemState.actions.clearBadgePrinterSystemMap());
  });

  it('should dispatch clearErrors start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.clearErrors();
    expect(dispatch).toBeCalledWith(generalState.actions.clear(GENERAL.LOADING_KEY.SAVE_BADGE_PRINTER_SYSTEM));
  });
});
