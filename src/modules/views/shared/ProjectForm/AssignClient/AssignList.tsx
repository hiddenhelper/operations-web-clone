import React, { memo, useMemo, useCallback, useState } from 'react';

import Card from '../../ResourceManagement/Card';
import Chip from '../../FormHandler/Chip';
import AssignClientRow from './AssignRow';
import AddEntityButton from '../../AddEntityButton';

import { GeneralModel, ProjectModel, ClientModel, ResourceModel } from '../../../../models';
import { generateTempId, deleteObjectItem } from '../../../../../utils/generalUtils';
import { parseText, matchAssignSearch } from '../../../../../utils/matchHighlight';
import { useStyles } from '../styles';

export interface IAssignClientProps {
  title: string;
  type: ProjectModel.CompanyRole;
  list: ProjectModel.IProjectCompany[];
  relatedList: ProjectModel.IProjectCompany[];
  clientMap: GeneralModel.IEntityMap<ClientModel.IClient>;
  uiRelationMap: GeneralModel.IRelationUiMap;
  loading: GeneralModel.ILoadingStatus;
  params: GeneralModel.IQueryParams;
  secondaryText?: string;
  showAttentionIcon?: boolean;
  showCreateNew?: boolean;
  showAdd?: boolean;
  hideBottom?: boolean;
  styleClass?: string;
  onChange: (model: any) => void;
  update: (model: any) => void;
  showTaxExempt?: boolean;
  setRelationUiId: (key: string, value: any) => void;
  searchCompanies: (params: GeneralModel.IQueryParams, tempId) => void;
  createCompany: (clientName: string, tempId: string, isDeveloper: boolean) => void;
}

const AssignClient = ({
  title,
  type,
  list,
  params,
  clientMap,
  relatedList,
  uiRelationMap,
  loading,
  styleClass,
  showAttentionIcon = false,
  secondaryText = '',
  showCreateNew = true,
  showAdd = true,
  hideBottom = false,
  showTaxExempt,
  onChange,
  update,
  setRelationUiId,
  searchCompanies,
  createCompany,
}: IAssignClientProps) => {
  const classes = useStyles();
  const isLoading = useMemo(() => loading && loading.isLoading, [loading]);
  const [entityResponse, setEntityResponse] = useState({});
  const [duplicity, setDuplicity] = useState({});

  const clearDuplicity = useCallback(
    (tempId: string) => {
      setDuplicity(deleteObjectItem(duplicity, tempId));
    },
    [duplicity, setDuplicity]
  );

  const clearEntity = useCallback(
    (tempId: string) => {
      setEntityResponse(deleteObjectItem(entityResponse, tempId));
    },
    [entityResponse, setEntityResponse]
  );

  const clearTempId = useCallback(
    (tempId: string) => {
      clearDuplicity(tempId);
      clearEntity(tempId);
      setRelationUiId(tempId, undefined);
      Object.entries(uiRelationMap).forEach(([key, value]) => {
        /* istanbul ignore else */
        if (value && value.clientId) setRelationUiId(key, undefined);
      });
    },
    [uiRelationMap, setRelationUiId, clearDuplicity, clearEntity]
  );

  const validateUnicity = useCallback(clientId => list.filter(company => company.id === clientId).length > 0, [list]);

  const onAdd = useCallback(() => {
    onChange(
      /* istanbul ignore next */ prevModel => ({
        ...prevModel,
        relatedCompanies: [...relatedList, ...list, { ...ProjectModel.getFallbackRelatedCompany(generateTempId(), type) }],
      })
    );
  }, [relatedList, list, type, onChange]);

  const onDelete = useCallback(
    (index: number, tempId: string) => {
      onChange(
        /* istanbul ignore next */ prevModel => ({
          ...prevModel,
          relatedCompanies: [
            ...relatedList,
            ...(list.length > 0 ? list.filter((u, i) => i !== index) : [{ ...ProjectModel.getFallbackRelatedCompany(generateTempId(), type) }]),
          ],
        })
      );
      clearTempId(tempId);
    },
    [relatedList, list, type, onChange, clearTempId]
  );

  const onSelect = useCallback(
    (index: number, item, tempId: string) => {
      if (item && item.id !== list[index].id && validateUnicity(item.id)) {
        setDuplicity({ [tempId]: 'Client is already selected' });
        setEntityResponse(prevState => ({ ...prevState, [tempId]: undefined }));
      } else {
        onChange(
          /* istanbul ignore next */ prevModel => ({
            ...prevModel,
            relatedCompanies: [
              ...relatedList,
              ...list.slice(0, index),
              {
                ...list[index],
                ...(!item ? { ...ProjectModel.getFallbackRelatedCompany(generateTempId(), type) } : item),
              },
              ...list.slice(index + 1, list.length),
            ],
          })
        );
        clearDuplicity(tempId);
        setEntityResponse(prevState => ({ ...prevState, [tempId]: item.id }));
      }
    },
    [relatedList, list, type, validateUnicity, setDuplicity, clearDuplicity, onChange]
  );

  const clientRenderOption = useCallback((option, inputValue) => {
    const matchList = matchAssignSearch(option.name, inputValue);
    const highlightTextList = parseText(option.name, matchList);
    const resourceStatus = `statusChip${ResourceModel.statusMap[option.status]}`.replace(/ /g, '');
    return (
      <>
        <div data-testid="search-option-item">
          {highlightTextList.map((part, index) => {
            return (
              <span key={index} style={{ fontWeight: part.highlight ? 600 : 400 }}>
                {part.text}
              </span>
            );
          })}
        </div>

        <Chip statusChipClass={resourceStatus} label={ResourceModel.statusMap[option.status]} statusChip={true} dataTestId="search-option-chip" />
      </>
    );
  }, []);

  const onCreate = useCallback(
    (name: string, tempId: string) => {
      createCompany(name, tempId, params.isDeveloper);
    },
    [createCompany, params]
  );

  const onReset = useCallback(
    (index: number, tempId: string) => {
      update(
        /* istanbul ignore next */ prevModel => ({
          ...prevModel,
          relatedCompanies: prevModel.relatedCompanies.map(item =>
            item.tempId === tempId ? ProjectModel.getFallbackRelatedCompany(generateTempId(), type) : item
          ),
        })
      );
      clearTempId(tempId);
    },
    [type, update, clearTempId]
  );

  const isAddDisabled = useMemo(() => list[list.length - 1].name.length <= 0, [list]);

  const handleUpdate = useCallback(
    (index: number, value: boolean) => {
      onChange(
        /* istanbul ignore next */ prevModel => ({
          ...prevModel,
          relatedCompanies: [
            ...relatedList,
            ...list.slice(0, index),
            {
              ...list[index],
              isTaxExempt: value,
            },
            ...list.slice(index + 1, list.length),
          ],
        })
      );
    },
    [onChange, list, relatedList]
  );

  return (
    <>
      <Card title={title} showAttentionIcon={showAttentionIcon} actionStyleClass={classes.userAction} secondaryAction={secondaryText} styleClass={styleClass}>
        {list.map((assignItem, index) => {
          const existRelation = uiRelationMap && uiRelationMap[assignItem.tempId];
          const hasError = existRelation && uiRelationMap[assignItem.tempId].error;
          /* istanbul ignore next line */
          let entity = !hasError && (assignItem || null);
          if (Object.keys(entityResponse).length && existRelation && uiRelationMap[assignItem.tempId].searchResult) {
            entity = uiRelationMap[assignItem.tempId].searchResult.find(item => item.id === entityResponse[assignItem.tempId]);
          }
          if (existRelation && uiRelationMap[assignItem.tempId].clientId) {
            entity = clientMap[uiRelationMap[assignItem.tempId].clientId] as any;
          }
          return (
            <React.Fragment key={index}>
              <AssignClientRow
                index={index}
                assignEntityProps={{
                  index,
                  tempId: assignItem.tempId,
                  optionLabel: 'name',
                  result: existRelation && uiRelationMap[assignItem.tempId].searchResult ? uiRelationMap[assignItem.tempId].searchResult : [],
                  params,
                  isLoading: isLoading,
                  showCreateNew,
                  assignValue: assignItem,
                  placeholder: 'Client Name',
                  existRelation: !!existRelation,
                  onSelect: onSelect,
                  search: searchCompanies,
                  renderOption: clientRenderOption,
                  onCreate: onCreate,
                  onReset: onReset,
                }}
                hideBottom={hideBottom}
                isNew={!!(existRelation && uiRelationMap[assignItem.tempId].clientId)}
                duplicity={duplicity && duplicity[assignItem.tempId] ? duplicity && duplicity[assignItem.tempId] : null}
                error={hasError && uiRelationMap[assignItem.tempId].error}
                showTaxExempt={showTaxExempt}
                entityResponse={entity}
                onDelete={onDelete}
                onUpdate={handleUpdate}
              />
            </React.Fragment>
          );
        })}
        {showAdd && <AddEntityButton onAdd={onAdd} isAddDisabled={isAddDisabled} title={title} />}
      </Card>
    </>
  );
};

export default memo(AssignClient);
