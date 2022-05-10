import { parseText, matchAssignSearch } from './matchHighlight';

describe('matchHighlight', () => {
  it('should parse a string with match', () => {
    const inputValue = 'Alpha';
    const listItem = 'Alpha Brothers';

    const matches = matchAssignSearch(listItem, inputValue);
    const parts = parseText(listItem, matches);

    expect(parts).toMatchObject([
      { highlight: true, text: 'Alpha' },
      { highlight: false, text: ' Brothers' },
    ]);
  });
});
