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
import { BadgeType } from 'modules/models/badge';

interface IRadioButtons {
  name: string;
  value: ProjectNewModel.BadgeType;
  classes: any;
  onBadgeTypeChange: (e: React.MouseEvent, name: string) => void;
}

const RadioButtons: React.FC<IRadioButtons> = ({ name, value, classes, onBadgeTypeChange }) => (
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
      name: name,
      label: '',
      value: value,
      onChange: e => onBadgeTypeChange(e, name),
    }}
  />
);

interface IUpload {
  uploadId: string;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  setHasChanged: (hasChanged: boolean) => void;
  uploadedFileUrl: string;
  linkStyle: string;
  filename: string;
}

const Upload: React.FC<IUpload> = ({ uploadId, fileMap, setHasChanged, uploadedFileUrl, linkStyle, filename }) => {
  const uncompletedFiles = useMemo(
    () =>
      fileMap[uploadId] &&
      Object.values(fileMap[uploadId]).some(
        currentFileValue => currentFileValue.status !== FileModel.FileStatus.SUCCESS && currentFileValue.status !== FileModel.FileStatus.FAIL
      ),
    [fileMap, uploadId]
  );

  const isFileUploading = useMemo(() => Object.keys(fileMap[uploadId] || {}).length, [fileMap, uploadId]);

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
          style={{ minHeight: 70 }}
        />
      </ControlledInput>
      {uploadedFileUrl && !isFileUploading && (
        <a className={linkStyle} href={uploadedFileUrl}>
          <b>{filename}</b>
        </a>
      )}
    </div>
  );
};

export interface IBadgeConfigurationProps {
  model: ProjectModel.IProject;
  errors: any;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  badgesType: any;
  onChange: (data: any) => void;
  setHasChanged: (hasChanged: boolean) => void;
  setBadgesType: (badgesType: any, setAsPrev?: boolean) => void;
}

const BadgeConfiguration = ({ model, errors, fileMap, badgesType, onChange, setHasChanged, setBadgesType }: IBadgeConfigurationProps) => {
  const classes = useStyles();

  const { generalContractorBadgeType, subcontractorBadgeType, visitorBadgeType } = badgesType;

  useEffect(() => {
    const initialBadgesType = {
      generalContractorBadgeType: model.generalContractorBadgeTemplate.templateFileUrl ? ProjectNewModel.BadgeType.CUSTOM : ProjectNewModel.BadgeType.TEMPLATE,
      subcontractorBadgeType: model.subcontractorBadgeTemplate.templateFileUrl ? ProjectNewModel.BadgeType.CUSTOM : ProjectNewModel.BadgeType.TEMPLATE,
      visitorBadgeType: model.visitorBadgeTemplate.templateFileUrl ? ProjectNewModel.BadgeType.CUSTOM : ProjectNewModel.BadgeType.TEMPLATE,
    };
    setBadgesType(initialBadgesType, true);
  }, [
    model.generalContractorBadgeTemplate.templateFileUrl,
    model.subcontractorBadgeTemplate.templateFileUrl,
    model.visitorBadgeTemplate.templateFileUrl,
    setBadgesType,
  ]);

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
    event.persist();
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
        <RadioButtons name="generalContractorBadgeType" value={generalContractorBadgeType} classes={classes} onBadgeTypeChange={onBadgeTypeChange} />
        {generalContractorBadgeType === ProjectNewModel.BadgeType.CUSTOM ? (
          <Upload
            uploadId="generalContractorBadgeTemplate"
            fileMap={fileMap}
            setHasChanged={setHasChanged}
            uploadedFileUrl={model.generalContractorBadgeTemplate.templateFileUrl}
            linkStyle={classes.templateLink}
            filename={model.generalContractorBadgeTemplate.templateFileName}
          />
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
            <RadioButtons name="subcontractorBadgeType" value={subcontractorBadgeType} classes={classes} onBadgeTypeChange={onBadgeTypeChange} />
            {subcontractorBadgeType === ProjectNewModel.BadgeType.CUSTOM ? (
              <Upload
                uploadId="subcontractorBadgeTemplate"
                fileMap={fileMap}
                setHasChanged={setHasChanged}
                uploadedFileUrl={model.subcontractorBadgeTemplate.templateFileUrl}
                linkStyle={classes.templateLink}
                filename={model.subcontractorBadgeTemplate.templateFileName}
              />
            ) : (
              <BadgeEditor
                showLogo={true}
                badgeKey="subcontractorBadgeTemplate"
                badge={model.subcontractorBadgeTemplate}
                errors={errors}
                uploadId="subcontractorBadgeLogo"
                file={fileMap.subcontractorBadgeLogo}
                fileMap={fileMap}
                onChange={onChange}
                setHasChanged={setHasChanged}
              />
            )}
          </>
        )}
      </Card>
      <Card title="Visitor Badge">
        <RadioButtons name="visitorBadgeType" value={visitorBadgeType} classes={classes} onBadgeTypeChange={onBadgeTypeChange} />
        {visitorBadgeType === ProjectNewModel.BadgeType.CUSTOM ? (
          <Upload
            uploadId="visitorBadgeTemplate"
            fileMap={fileMap}
            setHasChanged={setHasChanged}
            uploadedFileUrl={model.visitorBadgeTemplate.templateFileUrl}
            linkStyle={classes.templateLink}
            filename={model.visitorBadgeTemplate.templateFileName}
          />
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
