import { useMemo } from 'react';
import moment from 'moment-timezone';

export function useTimeZone() {
  const timeZoneOffset = useMemo(() => moment().format('Z'), []);

  return {
    timeZoneOffset,
  };
}
