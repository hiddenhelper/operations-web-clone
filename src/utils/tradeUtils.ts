import { isEmpty } from './generalUtils';

export const getTradesString = (trades, otherTrade) =>
  isEmpty(trades) && isEmpty(otherTrade)
    ? '-'
    : (trades || [])
        .map(trade => trade.name)
        .concat([otherTrade])
        .filter(Boolean)
        .join(', ');
