import React, { memo, useMemo } from 'react';
import { ProjectModel } from '../../../models';

export interface IRolePillProps {
  role: ProjectModel.CompanyRole;
}

const RolePill = ({ role }: IRolePillProps) => {
  const textMap = useMemo(
    () => ({
      [ProjectModel.CompanyRole.DEVELOPER]: { x: '24', y: '40', fontSize: '11' },
      [ProjectModel.CompanyRole.GENERAL_CONTRACTOR]: { x: '26', y: '41', fontSize: '13' },
      [ProjectModel.CompanyRole.SUB_CONTRACTOR]: { x: '24', y: '40', fontSize: '11' },
      [ProjectModel.CompanyRole.DEVELOPER_PROJECT_OWNER]: { x: '26', y: '41', fontSize: '13' },
    }),
    []
  );

  return (
    <svg height="70" width="70">
      <circle cx="36" cy="36" r="18" fill="#E5E5E5" />
      <text x={textMap[role].x} y={textMap[role].y} fontFamily="Verdana" fontWeight="bold" fontSize={textMap[role].fontSize} fill="#AAAAAA">
        {ProjectModel.roleAcronymMap[role]}
      </text>
    </svg>
  );
};

export default memo(RolePill);
