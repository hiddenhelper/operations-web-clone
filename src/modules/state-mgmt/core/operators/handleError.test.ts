import { handleError, handleToastError } from './handleError';
import { throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';

describe('handleError', () => {
  const errorResponse = { title: 'scary error' };
  const error = { response: errorResponse };

  const additionalAction = () => ({
    type: 'Additional',
    payload: { title: 'New' },
  });

  it('should catch error', done => {
    const response$ = throwError(error);

    response$
      .pipe(handleError('key', () => [additionalAction()]))
      .pipe(toArray())
      .subscribe(result => {
        expect(result[0]).toEqual({ type: '[core] epic error', payload: { error: error } });
        expect(result[1]).toEqual({
          type: '[general] set loading',
          payload: { key: 'key', isLoading: false, hasError: true, error: { title: 'scary error' } },
        });
        expect(result[2]).toEqual({
          type: 'Additional',
          payload: { title: 'New' },
        });
        done();
      });
  });

  it('should catch toast error', done => {
    const response$ = throwError(error);

    response$
      .pipe(handleToastError('key', ['errorKey'], () => [additionalAction()]))
      .pipe(toArray())
      .subscribe(result => {
        expect(result[0]).toEqual({ type: '[core] epic error', payload: { error: error } });
        expect(result[1]).toEqual({
          type: '[general] set loading',
          payload: { key: 'key', isLoading: false, hasError: true, error: { title: 'scary error' } },
        });
        expect(result[2]).toEqual({ type: '[general] add toast start', payload: { message: 'scary error', type: 'error' } });
        expect(result[3]).toEqual({
          type: 'Additional',
          payload: { title: 'New' },
        });
        done();
      });
  });

  it('should catch toast error with key', done => {
    const errorWithKey = { ...error, response: { errors: { errorKey: ['error with key'] } } };
    const response$ = throwError(errorWithKey);

    response$
      .pipe(handleToastError('key', ['errorKey'], () => [additionalAction()]))
      .pipe(toArray())
      .subscribe(result => {
        expect(result[0]).toEqual({ type: '[core] epic error', payload: { error: errorWithKey } });
        expect(result[1]).toEqual({
          type: '[general] set loading',
          payload: { key: 'key', isLoading: false, hasError: true, error: { errors: { errorKey: ['error with key'] } } },
        });
        expect(result[2]).toEqual({ type: '[general] add toast start', payload: { message: 'error with key', type: 'error' } });
        expect(result[3]).toEqual({
          type: 'Additional',
          payload: { title: 'New' },
        });
        done();
      });
  });

  it('should catch toast error with key map', done => {
    const errorWithKey = { ...error, response: { errors: { errorKey: ['error with key'] } } };
    const response$ = throwError(errorWithKey);

    response$
      .pipe(handleToastError('key', ['errorKey'], undefined, { errorKey: 'my error message' }))
      .pipe(toArray())
      .subscribe(result => {
        expect(result[0]).toEqual({ type: '[core] epic error', payload: { error: errorWithKey } });
        expect(result[1]).toEqual({
          type: '[general] set loading',
          payload: { key: 'key', isLoading: false, hasError: true, error: { errors: { errorKey: ['error with key'] } } },
        });
        expect(result[2]).toEqual({ type: '[general] add toast start', payload: { message: 'my error message', type: 'error' } });
        done();
      });
  });
});
