import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core';

import { STYLE } from 'constants/index';
import { toREM } from 'utils';

const StyledLink = styled(Link)({
  color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
  fontWeight: 600,
  fontSize: toREM(15),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
    textDecoration: 'none',
  },
});

const stopEventPropagation = (event: SyntheticEvent) => event?.stopPropagation();

interface ITableCellLink {
  href: string;
  testId?: string;
  text: string;
  title: string;
}

const TableCellLink = ({ href, testId, text, title }: ITableCellLink) => (
  <StyledLink to={href} data-testid={testId} onClick={stopEventPropagation} title={title}>
    {text}
  </StyledLink>
);

export default TableCellLink;
