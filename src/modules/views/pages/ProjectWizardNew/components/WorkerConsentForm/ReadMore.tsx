import React, { useState } from 'react';

import { useStyles } from './styles';

interface IReadMoreProps {
  children: React.ReactElement;
}

const ReadMore: React.FC<IReadMoreProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const classes = useStyles();

  return (
    <div>
      <div className={isExpanded ? classes.readMoreExpanded : classes.readMoreCollapsed}>{children}Î</div>
      <p className={classes.readMoreButton} onClick={() => setIsExpanded(!isExpanded)}>
        Read {isExpanded ? 'Less' : 'More'}
      </p>
    </div>
  );
};

export default ReadMore;
