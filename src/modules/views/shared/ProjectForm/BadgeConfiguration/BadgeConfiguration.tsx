import React, { memo, useCallback } from 'react';

import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Card from '../../ResourceManagement/Card';
import BadgeEditor from '../../ResourceManagement/BadgeEditor';
import Checkbox from '../../FormHandler/Checkbox/Checkbox';

import { FileModel, GeneralModel, ProjectModel, BadgeModel } from '../../../../models';
import { getConditionalDefaultValue } from '../../../../../utils/generalUtils';
import { useStyles } from '../styles';

export interface IBadgeConfigurationProps {
  model: ProjectModel.IProject;
  errors: any;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  onChange: (data: any) => void;
  setHasChanged: (hasChanged: boolean) => void;
}

const BadgeConfiguration = ({ model, errors, fileMap, onChange, setHasChanged }: IBadgeConfigurationProps) => {
  const classes = useStyles();
  const onSameBadgeChange = useCallback(
    event => {
      event.persist();
      onChange(prevState => ({
        ...prevState,
        subcontractorBadgeTemplateMatchesGeneralContractor: event.target.checked,
        subcontractorBadgeTemplate: getConditionalDefaultValue(
          event.target.checked,
          prevState.subcontractorBadgeTemplate,
          BadgeModel.getFallbackBadgeTemplate()
        ),
      }));
    },
    [onChange]
  );
  return (
    <>
      <Card title="General Contractor Badge">
        <BadgeEditor
          showLogo={true}
          badgeKey="generalContractorBadgeTemplate"
          badge={model.generalContractorBadgeTemplate}
          errors={errors}
          uploadId="generalContractorBadgeLogo"
          file={fileMap.generalContractorBadgeLogo}
          fileMap={fileMap}
          onChange={onChange}
          setHasChanged={setHasChanged}
        />
      </Card>
      <Card title="Subcontractor Badge">
        <FormControlLabel
          className={classes.badgeCheckbox}
          label="Same as General Contractor Badge"
          control={
            <Checkbox
              name="subcontractorBadgeTemplateMatchesGeneralContractor"
              value="subcontractorBadgeTemplateMatchesGeneralContractor"
              isChecked={model.subcontractorBadgeTemplateMatchesGeneralContractor}
              onChange={onSameBadgeChange}
              inputProps={{ 'data-testid': 'badge-same' }}
            />
          }
        />
        <Divider />
        {!model.subcontractorBadgeTemplateMatchesGeneralContractor && (
          <BadgeEditor
            showLogo={true}
            badgeKey="subcontractorBadgeTemplate"
            badge={model.subcontractorBadgeTemplate}
            errors={errors}
            uploadId="subContractorBadgeLogo"
            file={fileMap.subContractorBadgeLogo}
            fileMap={fileMap}
            onChange={onChange}
            setHasChanged={setHasChanged}
          />
        )}
      </Card>
      <Card title="Visitor Badge">
        <BadgeEditor
          visitorMode={true}
          showText={true}
          showLogo={true}
          badgeKey="visitorBadgeTemplate"
          badge={model.visitorBadgeTemplate}
          uploadId="visitorBadgeLogo"
          file={fileMap.visitorBadgeLogo}
          fileMap={fileMap}
          errors={errors}
          onChange={onChange}
          setHasChanged={setHasChanged}
        />
      </Card>
    </>
  );
};

export default memo(BadgeConfiguration);
