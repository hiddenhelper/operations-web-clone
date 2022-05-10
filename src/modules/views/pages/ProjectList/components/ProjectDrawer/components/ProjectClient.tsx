import React, { memo } from 'react';

import { ProjectModel } from '../../../../../../models';
import { LocationIcon } from '../../../../../../../constants';

import { useStyles as drawerStyles } from '../../../../../shared/ResourceManagement/Drawer/styles';
import { listGlobalStyles } from '../../../../../../../assets/styles';

export interface IProjectClientProps {
  dataTestId?: string;
  client: ProjectModel.IProjectCompany;
}

const ProjectClient = ({ dataTestId = '', client }: IProjectClientProps) => {
  const drawerClasses = drawerStyles();
  const listClasses = listGlobalStyles();
  return (
    <div data-testid={dataTestId} className={drawerClasses.projectWrapper}>
      <LocationIcon />
      <div className={`${drawerClasses.drawerText} ${drawerClasses.drawerTextSeparation}`}>
        {client && <span className={listClasses.listAccent}>{client.name}</span>}
        <span>{client ? ProjectModel.roleMap[client.role] : '-'}</span>
      </div>
    </div>
  );
};

export default memo(ProjectClient);
