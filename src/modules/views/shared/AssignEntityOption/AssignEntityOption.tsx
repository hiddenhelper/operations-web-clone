import React, { memo } from 'react';

import { matchAssignSearch, parseText } from '../../../../utils/matchHighlight';

export interface IAssignEntityOptionProps {
  option: { name: string };
  inputValue: string;
}

const AssignEntityOption = ({ option, inputValue }: IAssignEntityOptionProps) => {
  const matchList = matchAssignSearch(option.name, inputValue);
  const highlightTextList = parseText(option.name, matchList);

  return (
    <div data-testid="search-option-item">
      {highlightTextList.map((part, index) => {
        return (
          <span key={index} style={{ fontWeight: part.highlight ? 600 : 400 }}>
            {part.text}
          </span>
        );
      })}
    </div>
  );
};

export default memo(AssignEntityOption);
