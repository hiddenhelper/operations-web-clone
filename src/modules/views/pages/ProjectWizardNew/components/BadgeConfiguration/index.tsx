import React, { memo, useCallback, useEffect, useMemo } from 'react';

import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Card from 'modules/views/shared/ResourceManagement/Card';
import BadgeEditor from 'modules/views/shared/ResourceManagement/BadgeEditor';
import Checkbox from 'modules/views/shared/FormHandler/Checkbox/Checkbox';

import { FileModel, GeneralModel, ProjectModel, BadgeModel, ProjectNewModel } from 'modules/models';
import { getConditionalDefaultValue } from 'utils/generalUtils';
import { useStyles } from '../../styles';
import ControlledRadio from 'modules/views/shared/FormHandler/ControlledRadio';
import { ControlledInput } from 'modules/views/shared';
import { Typography } from '@material-ui/core';
import FileUpload from 'modules/views/shared/FormHandler/FileUpload';

interface IUpload {
  uploadId: string;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  setHasChanged: (hasChanged: boolean) => void;
}

const Upload: React.FC<IUpload> = ({ uploadId, fileMap, setHasChanged }) => {
  const uncompletedFiles = useMemo(
    () =>
      fileMap[uploadId] &&
      Object.values(fileMap[uploadId]).some(
        currentFileValue => currentFileValue.status !== FileModel.FileStatus.SUCCESS && currentFileValue.status !== FileModel.FileStatus.FAIL
      ),
    [fileMap, uploadId]
  );

  useEffect(() => {
    if (uncompletedFiles) setHasChanged(true);
  }, [uncompletedFiles, setHasChanged]);

  return (
    <div>
      <Typography>Template file</Typography>
      <ControlledInput label={null}>
        <FileUpload
          uploadId={uploadId}
          showProgress={true}
          showDelete={true}
          placeholder="Upload file (Only dgn formats)"
          supportedExtensionList={['dgn']}
          inputProps={{
            multiple: false,
            'data-testid': 'badge-media',
          }}
        />
      </ControlledInput>
    </div>
  );
};

export interface IBadgeConfigurationProps {
  model: ProjectModel.IProject;
  errors: any;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  onChange: (data: any) => void;
  setHasChanged: (hasChanged: boolean) => void;
}

const BadgeConfiguration = ({ model, errors, fileMap, onChange, setHasChanged }: IBadgeConfigurationProps) => {
  const classes = useStyles();

  const [badgesType, setBadgesType] = React.useState({
    generalContractorBadgeType: ProjectNewModel.BadgeType.TEMPLATE,
    subcontractorBadgeType: ProjectNewModel.BadgeType.TEMPLATE,
    visitorBadgeType: ProjectNewModel.BadgeType.TEMPLATE,
  });
  const { generalContractorBadgeType, subcontractorBadgeType, visitorBadgeType } = badgesType;

  useEffect(() => {
    const initialBadgesType = {
      generalContractorBadgeType: model.generalContractorBadgeTemplate.templateFileUrl ? ProjectNewModel.BadgeType.CUSTOM : ProjectNewModel.BadgeType.TEMPLATE,
      subcontractorBadgeType: model.subcontractorBadgeTemplate.templateFileUrl ? ProjectNewModel.BadgeType.CUSTOM : ProjectNewModel.BadgeType.TEMPLATE,
      visitorBadgeType: model.visitorBadgeTemplate.templateFileUrl ? ProjectNewModel.BadgeType.CUSTOM : ProjectNewModel.BadgeType.TEMPLATE,
    };
    setBadgesType(initialBadgesType);
  }, [model.generalContractorBadgeTemplate.templateFileUrl, model.subcontractorBadgeTemplate.templateFileUrl, model.visitorBadgeTemplate.templateFileUrl]);

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

  const onBadgeTypeChange = (event, type) => {
    const value = parseInt(event.target.value, 10);
    const updatedBadgesType = {
      ...badgesType,
      [type]: value,
    };
    setBadgesType(updatedBadgesType);
  };

  return (
    <>
      <Card title="General Contractor Badge">
        <ControlledRadio
          containerStyleClass={classes.billingRadioContainer}
          row={true}
          radioItems={[
            {
              value: ProjectNewModel.BadgeType.TEMPLATE,
              label: 'Use Template',
            },
            {
              value: ProjectNewModel.BadgeType.CUSTOM,
              label: 'Use Custom File',
            },
          ]}
          formControlProps={{
            name: 'generalContractorBadgeType',
            label: '',
            value: generalContractorBadgeType,
            onChange: e => onBadgeTypeChange(e, 'generalContractorBadgeType'),
          }}
        />
        {generalContractorBadgeType === ProjectNewModel.BadgeType.CUSTOM ? (
          <Upload uploadId="generalContractorBadgeTemplate" fileMap={fileMap} setHasChanged={setHasChanged} />
        ) : (
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
        )}
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
          <>
            <ControlledRadio
              containerStyleClass={classes.billingRadioContainer}
              row={true}
              radioItems={[
                {
                  value: ProjectNewModel.BadgeType.TEMPLATE,
                  label: 'Use Template',
                },
                {
                  value: ProjectNewModel.BadgeType.CUSTOM,
                  label: 'Use Custom File',
                },
              ]}
              formControlProps={{
                name: 'subcontractorBadgeType',
                label: '',
                value: subcontractorBadgeType,
                onChange: e => onBadgeTypeChange(e, 'subcontractorBadgeType'),
              }}
            />
            {subcontractorBadgeType === ProjectNewModel.BadgeType.CUSTOM ? (
              <Upload uploadId="subcontractorBadgeTemplate" fileMap={fileMap} setHasChanged={setHasChanged} />
            ) : (
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
          </>
        )}
      </Card>
      <Card title="Visitor Badge">
        <ControlledRadio
          containerStyleClass={classes.billingRadioContainer}
          row={true}
          radioItems={[
            {
              value: ProjectNewModel.BadgeType.TEMPLATE,
              label: 'Use Template',
            },
            {
              value: ProjectNewModel.BadgeType.CUSTOM,
              label: 'Use Custom File',
            },
          ]}
          formControlProps={{
            name: 'visitorBadgeType',
            label: '',
            value: visitorBadgeType,
            onChange: e => onBadgeTypeChange(e, 'visitorBadgeType'),
          }}
        />
        {visitorBadgeType === ProjectNewModel.BadgeType.CUSTOM ? (
          <Upload uploadId="visitorBadgeTemplate" fileMap={fileMap} setHasChanged={setHasChanged} />
        ) : (
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
        )}
      </Card>
    </>
  );
};

export default memo(BadgeConfiguration);
