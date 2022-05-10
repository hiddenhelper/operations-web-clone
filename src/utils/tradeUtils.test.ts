import { getTradesString } from './tradeUtils';
import { getTrades_1 } from '../test/entities';

describe('Trade Utils', () => {
  describe('getTradesString', () => {
    it('should get trades string', () => {
      expect(getTradesString([getTrades_1()[0]], 'other')).toEqual(`${getTrades_1()[0].name}, other`);
    });

    it('should get other trade with empty trades', () => {
      expect(getTradesString(null, 'other')).toEqual(`other`);
    });

    it('should get empty string', () => {
      expect(getTradesString([], null)).toEqual('-');
    });
  });
});
