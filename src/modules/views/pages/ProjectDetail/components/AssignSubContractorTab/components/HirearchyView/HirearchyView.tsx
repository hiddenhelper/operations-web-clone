import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';

import HirearchyNode from './HirearchyNode';

import { GeneralModel, ClientModel } from '../../../../../../../models';
import { toggleArray } from '../../../../../../../../utils/generalUtils';
import { useStyles } from './styles';

export interface IHirearchyViewProps {
  projectId: string;
  hirearchyMap: GeneralModel.IEntityMap<ClientModel.IHirearchyClientProject>;
  loading: GeneralModel.ILoadingStatus;
  assignClientLoading: GeneralModel.ILoadingStatus;
  fetchProjectClientHirearchyList: (id: string) => void;
  closeModal: () => void;
}

const HirearchyView = ({ projectId, hirearchyMap, loading, assignClientLoading, closeModal, fetchProjectClientHirearchyList }: IHirearchyViewProps) => {
  const classes = useStyles();

  const hirearchyList = useMemo(() => Object.values(hirearchyMap).filter(client => client.level === 0), [hirearchyMap]);

  const [childrenList, setChildrenList] = useState<string[]>([]);

  const showChildrenNode = useCallback(
    (id: string) => {
      setChildrenList(prevList => toggleArray(prevList, id));
    },
    [setChildrenList]
  );

  const drawNode = useCallback(
    node => {
      const isSpread = childrenList.includes(node.id);
      return (
        <div key={node.id} className={`${classes.nodeContainer} nodeContainer`}>
          <HirearchyNode client={node} isSpread={isSpread} showChilds={showChildrenNode} />
          <div className={classes.subLevelContainer} style={{ display: isSpread ? 'block' : 'none' }}>
            {node.sponsoredCompaniesIds
              .sort((a, b) => (hirearchyMap[b].createdAt || '').localeCompare(hirearchyMap[a].createdAt || ''))
              .map(id => drawNode(hirearchyMap[id]))}
          </div>
        </div>
      );
    },
    [childrenList, classes, hirearchyMap, showChildrenNode]
  );

  useEffect(() => {
    /* istanbul ignore else */
    if (assignClientLoading && !assignClientLoading.isLoading) {
      closeModal();
      fetchProjectClientHirearchyList(projectId);
    }
  }, [assignClientLoading, projectId, closeModal, fetchProjectClientHirearchyList]);

  useEffect(() => {
    fetchProjectClientHirearchyList(projectId);
  }, [projectId, fetchProjectClientHirearchyList]);

  if (!!loading?.isLoading) return <>Loading...</>;
  return <div className={classes.container}>{hirearchyList.map(client => drawNode(client))}</div>;
};

export default memo(HirearchyView);
