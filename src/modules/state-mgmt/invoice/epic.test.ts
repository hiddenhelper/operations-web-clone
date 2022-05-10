import { throwError } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { IEpicDependencies } from '../rootState';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';
import { coreState } from '../core';
import { generalState } from '../general';
import {
  confirmInvoiceStart,
  deleteInvoiceStart,
  editInvoiceStart,
  fetchInvoiceListStart,
  fetchInvoiceStart,
  fetchInvoiceSummaryStart,
  fetchServiceTypeListStart,
  markInvoiceAsPaidStart,
  markInvoiceAsVoidStart,
  payInvoiceStart,
  saveInvoiceStart,
  downloadInvoiceStart,
} from './epics';
import { actions } from './actions';
import { actions as statisticsActions } from '../statistics/actions';
import { GENERAL } from '../../../constants';
import { ToastType } from '../../models/general';
import { InvoiceModel, GeneralModel } from '../../models';
import { getInvoice_1, getProjectInvoiceServiceList_1 } from '../../../test/entities';

describe('invoice epics', () => {
  let deps: IEpicDependencies;
  let error;
  let errorResponse = { title: 'scary error' };
  beforeEach(() => {
    error = { response: errorResponse };
    deps = getDeps();
    deps.history = {
      ...deps.history,
      location: {
        ...deps.history.location,
        search: '',
      },
    };
  });

  describe('fetchServiceTypeListStart', () => {
    it('should get epic for project fetch service type list', () => {
      return runEpic(fetchServiceTypeListStart(ActionsObservable.of(actions.fetchServiceTypeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SERVICE_TYPE_LIST, true));
        expect(deps.apiService.getServiceTypeList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchServiceTypeListSuccess(getProjectInvoiceServiceList_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SERVICE_TYPE_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getServiceTypeList = () => throwError(error);
      return runEpic(fetchServiceTypeListStart(ActionsObservable.of(actions.fetchServiceTypeListStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SERVICE_TYPE_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_SERVICE_TYPE_LIST, false, true, errorResponse));
      });
    });
  });

  describe('fetchInvoiceListStart', () => {
    it('should get epic for invoice fetch invoice list', () => {
      return runEpic(fetchInvoiceListStart(ActionsObservable.of(actions.fetchInvoiceListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_LIST, true));
        expect(deps.apiService.getInvoiceList).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchInvoiceListSuccess([getInvoice_1()], 1));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_LIST, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getInvoiceList = () => throwError(error);
      return runEpic(fetchInvoiceListStart(ActionsObservable.of(actions.fetchInvoiceListStart({})), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_LIST, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_LIST, false, true, errorResponse));
      });
    });
  });

  describe('saveInvoiceStart', () => {
    it('should get epic for save invoice', () => {
      return runEpic(
        saveInvoiceStart(ActionsObservable.of(actions.saveInvoiceStart(getInvoice_1(), InvoiceModel.InvoiceStep.DRAFT)), {} as any, deps),
        actionList => {
          expect(deps.apiService.saveInvoice).toHaveBeenCalledWith(getInvoice_1());
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, true));
          expect(actionList[1]).toEqual(
            actions.fetchInvoiceListStart({ isPaid: false, pageSize: 15, pageNumber: 1, period: GeneralModel.TimeFilterType.ALL_TIMES, sortType: 'descending' })
          );
          expect(actionList[2]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
          expect(actionList[3]).toEqual(actions.saveInvoiceSuccess());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, false));
        }
      );
    });

    it('should get epic for save invoice and confirm', () => {
      return runEpic(
        saveInvoiceStart(ActionsObservable.of(actions.saveInvoiceStart(getInvoice_1(), InvoiceModel.InvoiceStep.CONFIRM)), {} as any, deps),
        actionList => {
          expect(deps.apiService.saveInvoice).toHaveBeenCalledWith(getInvoice_1());
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, true));
          expect(actionList[1]).toEqual(actions.confirmInvoiceStart(getInvoice_1().id, undefined, false));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.saveInvoice = () => throwError(error);
      return runEpic(
        saveInvoiceStart(ActionsObservable.of(actions.saveInvoiceStart(getInvoice_1(), InvoiceModel.InvoiceStep.DRAFT)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.SAVE_INVOICE, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
        }
      );
    });
  });

  describe('editInvoiceStart', () => {
    it('should get epic for edit invoice', () => {
      return runEpic(
        editInvoiceStart(ActionsObservable.of(actions.editInvoiceStart(getInvoice_1().id, getInvoice_1(), InvoiceModel.InvoiceStep.DRAFT)), {} as any, deps),
        actionList => {
          expect(deps.apiService.editInvoice).toHaveBeenCalledWith(getInvoice_1().id, getInvoice_1());
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, true));
          expect(actionList[1]).toEqual(
            actions.fetchInvoiceListStart({ isPaid: false, pageSize: 15, pageNumber: 1, period: GeneralModel.TimeFilterType.ALL_TIMES, sortType: 'descending' })
          );
          expect(actionList[2]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
          expect(actionList[3]).toEqual(actions.editInvoiceSuccess());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, false));
        }
      );
    });

    it('should get epic for edit invoice and confirm', () => {
      return runEpic(
        editInvoiceStart(ActionsObservable.of(actions.editInvoiceStart(getInvoice_1().id, getInvoice_1(), InvoiceModel.InvoiceStep.CONFIRM)), {} as any, deps),
        actionList => {
          expect(deps.apiService.editInvoice).toHaveBeenCalledWith(getInvoice_1().id, getInvoice_1());
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, true));
          expect(actionList[1]).toEqual(actions.confirmInvoiceStart(getInvoice_1().id, undefined, false));
          expect(actionList[2]).toEqual(actions.editInvoiceSuccess());
          expect(actionList[3]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.editInvoice = () => throwError(error);
      return runEpic(
        editInvoiceStart(ActionsObservable.of(actions.editInvoiceStart(getInvoice_1().id, getInvoice_1(), InvoiceModel.InvoiceStep.DRAFT)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.EDIT_INVOICE, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
        }
      );
    });
  });

  describe('fetchInvoiceSummaryStart', () => {
    it('should get epic for invoice fetch invoice summary', () => {
      return runEpic(fetchInvoiceSummaryStart(ActionsObservable.of(actions.fetchInvoiceSummaryStart('1')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY, true));
        expect(deps.apiService.getInvoiceSummary).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchInvoiceSummarySuccess(getInvoice_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getInvoiceSummary = () => throwError(error);
      return runEpic(fetchInvoiceSummaryStart(ActionsObservable.of(actions.fetchInvoiceSummaryStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE_SUMMARY, false, true, errorResponse));
      });
    });
  });

  describe('fetchInvoiceStart', () => {
    it('should get epic for invoice fetch invoice', () => {
      return runEpic(fetchInvoiceStart(ActionsObservable.of(actions.fetchInvoiceStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE, true));
        expect(deps.apiService.getInvoice).toHaveBeenCalled();
        expect(actionList[1]).toEqual(actions.fetchInvoiceSuccess(getInvoice_1()));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getInvoice = () => throwError(error);
      return runEpic(fetchInvoiceStart(ActionsObservable.of(actions.fetchInvoiceStart('id')), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.FETCH_INVOICE, false, true, errorResponse));
      });
    });
  });

  describe('deleteInvoiceStart', () => {
    it('should get epic for delete invoice', () => {
      return runEpic(
        deleteInvoiceStart(ActionsObservable.of(actions.deleteInvoiceStart(getInvoice_1().id, InvoiceModel.defaultInvoiceSearch)), {} as any, deps),
        actionList => {
          expect(deps.apiService.deleteInvoice).toHaveBeenCalledWith(getInvoice_1().id);
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_INVOICE, true));
          expect(actionList[1]).toEqual(actions.deleteInvoiceSuccess(getInvoice_1().id));
          expect(actionList[2]).toEqual(actions.fetchInvoiceListStart(InvoiceModel.defaultInvoiceSearch));
          expect(actionList[3]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_INVOICE, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.deleteInvoice = () => throwError(error);
      return runEpic(
        deleteInvoiceStart(ActionsObservable.of(actions.deleteInvoiceStart(getInvoice_1().id, InvoiceModel.defaultInvoiceSearch)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_INVOICE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DELETE_INVOICE, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
        }
      );
    });
  });

  describe('markInvoiceAsPaidStart', () => {
    it('should get epic for mark as paid invoice', () => {
      return runEpic(
        markInvoiceAsPaidStart(ActionsObservable.of(actions.markAsPaidInvoiceStart(getInvoice_1().id, InvoiceModel.defaultInvoiceSearch)), {} as any, deps),
        actionList => {
          expect(deps.apiService.markInvoiceAsPaid).toHaveBeenCalledWith(getInvoice_1().id);
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE, true));
          expect(actionList[1]).toEqual(actions.markAsPaidInvoiceSuccess(getInvoice_1().id));
          expect(actionList[2]).toEqual(actions.fetchInvoiceListStart(InvoiceModel.defaultInvoiceSearch));
          expect(actionList[3]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.markInvoiceAsPaid = () => throwError(error);
      return runEpic(
        markInvoiceAsPaidStart(ActionsObservable.of(actions.markAsPaidInvoiceStart(getInvoice_1().id, InvoiceModel.defaultInvoiceSearch)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_PAID_INVOICE, false, true, errorResponse));
          expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
        }
      );
    });
  });

  describe('payInvoiceStart', () => {
    it('should get epic for pay invoice', () => {
      return runEpic(payInvoiceStart(ActionsObservable.of(actions.payInvoiceStart(getInvoice_1().id)), {} as any, deps), actionList => {
        expect(deps.apiService.payInvoice).toHaveBeenCalledWith(getInvoice_1().id);
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PAY_INVOICE, true));
        expect(actionList[1]).toEqual(actions.payInvoiceSuccess(getInvoice_1().id));
        expect(actionList[2]).toEqual(
          actions.fetchInvoiceListStart({ isPaid: false, pageSize: 15, pageNumber: 1, period: GeneralModel.TimeFilterType.ALL_TIMES, sortType: 'descending' })
        );
        expect(actionList[3]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PAY_INVOICE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.payInvoice = () => throwError(error);
      return runEpic(payInvoiceStart(ActionsObservable.of(actions.payInvoiceStart(getInvoice_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PAY_INVOICE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.PAY_INVOICE, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
      });
    });
  });

  describe('confirmInvoiceStart', () => {
    it('should get epic for confirm invoice', () => {
      return runEpic(confirmInvoiceStart(ActionsObservable.of(actions.confirmInvoiceStart(getInvoice_1().id, {} as any)), {} as any, deps), actionList => {
        expect(deps.apiService.confirmInvoice).toHaveBeenCalledWith(getInvoice_1().id);
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, true));
        expect(actionList[1]).toEqual(actions.confirmInvoiceSuccess());
        expect(actionList[2]).toEqual(
          actions.fetchInvoiceListStart({ isPaid: false, pageSize: 15, pageNumber: 1, period: GeneralModel.TimeFilterType.ALL_TIMES, sortType: 'descending' })
        );
        expect(actionList[3]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, false));
      });
    });

    it('should get epic for confirm invoice without toast', () => {
      return runEpic(confirmInvoiceStart(ActionsObservable.of(actions.confirmInvoiceStart(getInvoice_1().id, {}, false)), {} as any, deps), actionList => {
        expect(deps.apiService.confirmInvoice).toHaveBeenCalledWith(getInvoice_1().id);
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, true));
        expect(actionList[1]).toEqual(actions.confirmInvoiceSuccess());
        expect(actionList[2]).toEqual(
          actions.fetchInvoiceListStart({ isPaid: false, pageSize: 15, pageNumber: 1, period: GeneralModel.TimeFilterType.ALL_TIMES, sortType: 'descending' })
        );
        expect(actionList[3]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
        expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.confirmInvoice = () => throwError(error);
      return runEpic(confirmInvoiceStart(ActionsObservable.of(actions.confirmInvoiceStart(getInvoice_1().id, {} as any)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.CONFIRM_INVOICE, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
      });
    });
  });

  describe('markInvoiceAsVoidStart', () => {
    it('should get epic for mark as void invoice', () => {
      return runEpic(
        markInvoiceAsVoidStart(ActionsObservable.of(actions.markAsVoidInvoiceStart(getInvoice_1().id, InvoiceModel.defaultInvoiceSearch)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE, true));
          expect(deps.apiService.markInvoiceAsVoid).toHaveBeenCalledWith(getInvoice_1().id);
          expect(actionList[1]).toEqual(actions.markAsVoidInvoiceSuccess(getInvoice_1().id));
          expect(actionList[2]).toEqual(actions.fetchInvoiceListStart(InvoiceModel.defaultInvoiceSearch));
          expect(actionList[3]).toEqual(statisticsActions.fetchInvoiceStatisticsStart());
          expect(actionList[4]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE, false));
        }
      );
    });

    it('should catch errors', () => {
      deps.apiService.markInvoiceAsVoid = () => throwError(error);
      return runEpic(
        markInvoiceAsVoidStart(ActionsObservable.of(actions.markAsVoidInvoiceStart(getInvoice_1().id, InvoiceModel.defaultInvoiceSearch)), {} as any, deps),
        actionList => {
          expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE, true));
          expect(actionList[1]).toEqual(coreState.actions.epicError(error));
          expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.MARK_AS_VOID_INVOICE, false, true, errorResponse));
        }
      );
    });
  });

  describe('downloadInvoiceStart', () => {
    it('should get epic for download invoice', () => {
      return runEpic(downloadInvoiceStart(ActionsObservable.of(actions.downloadStart(getInvoice_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_INVOICE, true));
        expect(deps.apiService.downloadInvoice).toHaveBeenCalledWith(getInvoice_1().id);
        expect(deps.fileService.download).toHaveBeenCalled();
        expect(actionList[1]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_INVOICE, false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.downloadInvoice = () => throwError(error);
      return runEpic(downloadInvoiceStart(ActionsObservable.of(actions.downloadStart(getInvoice_1().id)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_INVOICE, true));
        expect(actionList[1]).toEqual(coreState.actions.epicError(error));
        expect(actionList[2]).toEqual(generalState.actions.setLoading(GENERAL.LOADING_KEY.DOWNLOAD_INVOICE, false, true, errorResponse));
        expect(actionList[3]).toEqual(generalState.actions.addToastStart('scary error', ToastType.ERROR));
      });
    });
  });
});
