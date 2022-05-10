import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../../state-mgmt/rootState';
import { addToast, destroyPrinter, fetchCountryListStart, fetchSearchStart, fetchSearchMoreStart, fetchTimeZoneListStart } from './epics';
import { GENERAL } from '../../../constants';
import { ToastType } from '../../models/general';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';
import { actions } from './actions';
import { coreState } from '../core';
import { getCountry_1, getCountry_2, getCountry_3, getCountry_4, getSearchWoker, getTimeZone_1 } from '../../../test/entities';

describe('general epics', () => {
  let deps: IEpicDependencies;
  let error;

  beforeEach(() => {
    deps = getDeps();
    error = new Error('scary error');
  });

  describe('addToast', () => {
    it('should get epic for addToast', () => {
      return runEpic(
        addToast(ActionsObservable.of(actions.addToastStart('title', ToastType.ERROR)), {} as any, deps),
        emittedActions => {
          expect(emittedActions[0].type).toEqual(actions.addToastSuccess(null, 'title', ToastType.ERROR).type);
          expect(emittedActions[1]).toEqual(actions.removeToast(emittedActions[0].payload._id));
        },
        500
      );
    });
  });

  describe('destroyPrinter', () => {
    it('should get epic for destroy printer', () => {
      return runEpic(destroyPrinter(ActionsObservable.of(actions.destroyPrinter()), {} as any, deps), emittedActions => {
        expect(deps.printerService.destroy).toHaveBeenCalled();
      });
    });
  });

  describe('fetchCountryListStart', () => {
    it('should get epic for get country list', () => {
      return runEpic(fetchCountryListStart(ActionsObservable.of(actions.fetchCountryListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_COUNTRY_LIST, true));
        expect(deps.apiService.getCountryList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchCountryListSuccess([getCountry_1(), getCountry_2(), getCountry_3(), getCountry_4()]));
        expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_COUNTRY_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getCountryList = () => throwError(error);
      return runEpic(fetchCountryListStart(ActionsObservable.of(actions.fetchCountryListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_COUNTRY_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_COUNTRY_LIST, false, true, error));
      });
    });
  });

  describe('fetchTimeZoneListStart', () => {
    it('should get epic for project fetch time zones', () => {
      return runEpic(fetchTimeZoneListStart(ActionsObservable.of(actions.fetchTimeZoneListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_TIME_ZONE_LIST, true));
        expect(deps.apiService.getTimeZones).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchTimeZoneListSuccess([getTimeZone_1()]));
        expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_TIME_ZONE_LIST, false));
      });
    });

    it('should catch default error', () => {
      deps.apiService.getTimeZones = () => throwError(error);
      return runEpic(fetchTimeZoneListStart(ActionsObservable.of(actions.fetchTimeZoneListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_TIME_ZONE_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_TIME_ZONE_LIST, false, true, error));
      });
    });
  });

  describe('fetchSearchStart', () => {
    it('should get epic for start search', () => {
      return runEpic(fetchSearchStart(ActionsObservable.of(actions.fetchSearchStart({ searchType: 1, nameContains: 'Fer' })), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH, true));
        expect(deps.apiService.quickSearch).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchSearchSuccess(getSearchWoker()));
        expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH, false));
      });
    });

    it('should catch default error', () => {
      deps.apiService.quickSearch = () => throwError(error);
      return runEpic(fetchSearchStart(ActionsObservable.of(actions.fetchSearchStart({ searchType: 1, nameContains: 'Fer' })), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH, false, true, error));
      });
    });
  });

  describe('fetchSearchMoreStart', () => {
    it('should get epic for start search more', () => {
      return runEpic(
        fetchSearchMoreStart(ActionsObservable.of(actions.fetchSearchMoreStart({ searchType: 1, nameContains: 'Fer', pageNumber: 2 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_MORE, true));
          expect(deps.apiService.quickSearch).toHaveBeenCalled();
          expect(actionList[1]).toEqual(actions.fetchSearchMoreSuccess(getSearchWoker()));
          expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_MORE, false));
        }
      );
    });

    it('should catch default error', () => {
      deps.apiService.quickSearch = () => throwError(error);
      return runEpic(
        fetchSearchMoreStart(ActionsObservable.of(actions.fetchSearchMoreStart({ searchType: 1, nameContains: 'Fer', pageNumber: 2 })), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_MORE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(actions.setLoading(GENERAL.LOADING_KEY.FETCH_SEARCH_MORE, false, true, error));
        }
      );
    });
  });
});
