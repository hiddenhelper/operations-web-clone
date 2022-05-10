import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAction } from '../../rootState';
import { coreState } from '../../core';
import { generalState } from '../../general';
import { ToastType } from '../../../models/general';

export const handleError = (loadingKey: string, additionalActions?: (error) => IAction[]) => (source: Observable<IAction>) =>
  source.pipe(
    catchError(error =>
      [
        coreState.actions.epicError(error),
        generalState.actions.setLoading(loadingKey, false, true, error.response),
        ...(additionalActions ? additionalActions(error) : []),
      ].filter(Boolean)
    )
  );

export const handleToastError = (
  loadingKey: string,
  errorKeyList: string[] = [],
  additionalActions?: (error) => IAction[],
  errorKeyMap?: { [key: string]: string }
) => (source: Observable<IAction>) =>
  source.pipe(
    handleError(loadingKey, error => {
      const matchedErrorList = error.response?.errors
        ? errorKeyList.map(errorKey => Object.keys(error?.response?.errors).find(key => errorKey === key)).filter(Boolean)
        : [];
      let toastError = error.response.title;
      if (!!matchedErrorList.length) {
        toastError = error.response.errors[matchedErrorList[0]][0];
        if (errorKeyMap && errorKeyMap[matchedErrorList[0]]) {
          toastError = errorKeyMap[matchedErrorList[0]];
        }
      }
      return [generalState.actions.addToastStart(toastError, ToastType.ERROR), ...(additionalActions ? additionalActions(error) : [])].filter(Boolean);
    })
  );
