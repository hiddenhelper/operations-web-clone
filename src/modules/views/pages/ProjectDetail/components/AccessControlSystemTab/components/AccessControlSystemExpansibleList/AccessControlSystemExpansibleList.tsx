import React, { ReactNode } from 'react';

import { Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary, AccordionDetails as MuiAccordionDetails, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

import { STYLE } from 'constants/index';

import { acsListItemStyles } from '../../../../styles';

const ITEM_HEIGHT = 60;

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: STYLE.COLOR.WHITE,
    border: acsListItemStyles.border,
    borderRadius: acsListItemStyles.borderRadius,
    height: ITEM_HEIGHT,
    minHeight: ITEM_HEIGHT,
    marginTop: 10,
    padding: 0,
    '&$expanded': {
      minHeight: ITEM_HEIGHT,
    },
  },
  content: {
    alignItems: 'center',
  },
  expanded: {
    height: ITEM_HEIGHT,
    minHeight: ITEM_HEIGHT,
  },
  expandIcon: {
    order: -1,
    fontSize: 30,
    marginLeft: 5,
    marginRight: 15,
    color: STYLE.COLOR.UNCOMPLETED,
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    ...acsListItemStyles,
    height: ITEM_HEIGHT,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 0,
    width: undefined,
  },
})(MuiAccordionDetails);

interface IAccessControlSystemExpansibleList<T> {
  id: string;
  title: string;
  items: T[];
  getItemKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
}

const AccessControlSystemExpansibleList = ({ id, title, items, getItemKey, renderItem }: IAccessControlSystemExpansibleList<any>) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`location-${id}-acs-list`}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    {items.length > 0 && items.map(item => <AccordionDetails key={getItemKey(item)}>{renderItem(item)}</AccordionDetails>)}
  </Accordion>
);

export default AccessControlSystemExpansibleList;
