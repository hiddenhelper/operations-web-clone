import { useCallback, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { safeParse, parseUrlSearch } from './generalUtils';

const conflictingCharacters: Map<string, string> = new Map([
  ['%26', '&'],
  ['%3D', '='],
  ['%23', '#'],
  ['&', '%26'],
  ['=', '%3D'],
  ['#', '%23'],
]);

const replacer = (match: string): string => conflictingCharacters.get(match);

const parse = (value: string): any => {
  const str = decodeURI(value).replace(/%26|%3D|%23/g, replacer);
  return safeParse(str);
};

const stringify = (value: any): string => {
  return JSON.stringify(value).replace(/&|=|#/g, replacer);
};

export const useQueryParamState = <T extends { [key: string]: any }>(initialState: T): [T, (state: Partial<T>) => void] => {
  const { pathname, search } = useLocation();
  const { push } = useHistory();
  const decodeQuery: <Q>(q: string) => Q = useCallback(
    q =>
      Object.entries(parseUrlSearch(q))
        .filter(([key]) => !!key)
        .reduce((total, [key, value]) => ({ ...total, [key]: parse(value as string) }), {} as any),
    []
  );
  const state: T = useMemo(() => ({ ...initialState, ...decodeQuery<T>(search) }), [search, decodeQuery]); // eslint-disable-line
  const setState = useCallback(
    (s: Partial<T>) => {
      const params = Object.entries({ ...state, ...s })
        .filter(([key, value]) => value !== undefined)
        .reduce((total, [key, value]) => [...total, `${key}=${stringify(value)}`], [])
        .join('&');
      return push(`${pathname}?${params}`);
    },
    [state, pathname, push]
  );
  return [state, setState];
};
