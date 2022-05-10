import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Tab from '@material-ui/core/Tab';
export interface ILinkTabProps {
  to: string;
  label: string;
  icon: JSX.Element;
  index: number;
  selectedValue: boolean;
}

const LinkTab = ({ to, label, icon, index, selectedValue }: ILinkTabProps) => (
  <Tab selected={selectedValue} component={Link} to={to} data-testid={`tab-${index}`} label={label} icon={icon} aria-controls={`tabpanel-${index}`} />
);

export default memo(LinkTab);
