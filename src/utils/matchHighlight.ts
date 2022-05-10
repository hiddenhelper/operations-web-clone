import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export const parseText = (text: string, matches: [[number, number]]) => parse(text, matches);

export const matchAssignSearch = (name: string, value: string) => {
  const matchList = match(name, value);

  if (matchList.length === 0 && name.includes(value) && value.length > 0) {
    matchList.push([name.indexOf(value), name.indexOf(value) + value.length]);
  }

  return matchList;
};
