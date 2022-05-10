import React, { memo, useMemo, useCallback, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ColorSelector from './components/ColorSelector';
import VisitorLayout from './components/BadgeLayout/VisitorLayout';
import LargeHeaderLayout from './components/BadgeLayout/LargeHeaderLayout';
import SmallHeaderLayout from './components/BadgeLayout/SmallHeaderLayout';
import WhiteHeaderLayout from './components/BadgeLayout/WhiteHeaderLayout';
import FileUpload from '../../FormHandler/FileUpload';
import ControlledInput from '../../FormHandler/ControlledInput';
import ControlledSelect from '../../FormHandler/ControlledSelect';
import ControlledButton from '../../FormHandler/ControlledButton';
import BadgeTemplate from '../BadgeTemplate';

import { BadgeModel, FileModel, GeneralModel } from '../../../../models';
import {
  badgeEditorColorMap,
  badgeEditorFontMap,
  BadgeLayout1Icon,
  BadgeLayout1IconWithBorder,
  BadgeLayout2Icon,
  BadgeLayout2IconWithBorder,
  BadgeLayout3Icon,
  BadgeLayout3IconWithBorder,
} from '../../../../../constants';
import { getConditionalDefaultValue, getImageUrl } from '../../../../../utils/generalUtils';
import { wrapperStyles, badgeEditorStyles } from './style';

export interface IBadgeEditor {
  badge: BadgeModel.IBadgeTemplate;
  showText?: boolean;
  showLogo?: boolean;
  badgeKey: string;
  visitorMode?: boolean;
  errors: any;
  uploadId: string;
  file?: GeneralModel.IEntityMap<FileModel.IFile>;
  fileMap: GeneralModel.IEntityMap<GeneralModel.IEntityMap<FileModel.IFile>>;
  onChange: (data: any) => void;
  setHasChanged: (hasChanged: boolean) => void;
}

export const layoutMap = {
  [BadgeModel.BadgeLayout.LARGE_HEADER]: LargeHeaderLayout,
  [BadgeModel.BadgeLayout.SMALL_HEADER]: SmallHeaderLayout,
  [BadgeModel.BadgeLayout.WHITE_HEADER]: WhiteHeaderLayout,
  [BadgeModel.BadgeLayout.VISITOR]: VisitorLayout,
};

const BadgeEditor = ({
  badge,
  badgeKey,
  visitorMode = false,
  errors,
  showLogo,
  showText = false,
  uploadId,
  file,
  fileMap,
  onChange,
  setHasChanged,
}: IBadgeEditor) => {
  const wrapperClasses = wrapperStyles();
  const badgeEditorClasses = badgeEditorStyles();
  const fontOptionList = useMemo(() => Object.values(badgeEditorFontMap).map(font => ({ value: font, label: font })), []);
  const onChangeLayout = useCallback(
    layout => {
      const { backgroundColor: color, fontColor } = badgeEditorColorMap.setOne;
      onChange(/* istanbul ignore next */ prevState => ({ ...prevState, [badgeKey]: { ...badge, color, fontColor, layout: layout } }));
    },
    [badge, badgeKey, onChange]
  );

  const logoFromMap = useMemo(() => file && Object.values(file).length && !Object.values(file)[0].error && Object.values(file)[0].file, [file]);
  const logoFile = useMemo(() => getConditionalDefaultValue(logoFromMap, getImageUrl(logoFromMap), badge.logoUrl || null), [logoFromMap, badge.logoUrl]);

  const onChangeLayoutOne = useCallback(
    event => {
      event.persist();
      onChangeLayout(BadgeModel.BadgeLayout.LARGE_HEADER);
    },
    [onChangeLayout]
  );
  const onChangeLayoutTwo = useCallback(
    event => {
      event.persist();
      onChangeLayout(BadgeModel.BadgeLayout.WHITE_HEADER);
    },
    [onChangeLayout]
  );
  const onChangeLayoutThree = useCallback(
    event => {
      event.persist();
      onChangeLayout(BadgeModel.BadgeLayout.SMALL_HEADER);
    },
    [onChangeLayout]
  );
  const onColorChange = useCallback(
    colors => {
      const color = colors.color;
      const fontColor = colors.fontColor;
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          [badgeKey]: { ...badge, color, fontColor },
        })
      );
    },
    [badge, badgeKey, onChange]
  );
  const onChangeFont = useCallback(
    event => {
      onChange(
        /* istanbul ignore next */ prevState => ({
          ...prevState,
          [badgeKey]: { ...badge, font: event.target.value },
        })
      );
    },
    [badge, badgeKey, onChange]
  );

  const LayoutComponent = useMemo(() => layoutMap[badge.layout], [badge]);
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
    <Grid container={true} className={`${wrapperClasses.container} ${wrapperClasses.generalContainerPadding}`} spacing={2}>
      <Grid
        item={true}
        xs={true}
        className={`${wrapperClasses.center} ${badgeEditorClasses.container} ${badgeEditorClasses.containerBackground} ${wrapperClasses.formSpacing}`}
      >
        <BadgeTemplate
          template={badge}
          visitorMode={visitorMode}
          editorBadge={true}
          barCode={null}
          qrCode={null}
          showLogo={showLogo}
          logo={logoFile}
          render={props => <LayoutComponent {...props} />}
        />
      </Grid>

      <Grid item={true} xs={12} md={6} className={`${wrapperClasses.container} ${wrapperClasses.formColumn}`}>
        {!visitorMode && (
          <div className={`${wrapperClasses.container} ${wrapperClasses.formButtonSpacing} ${wrapperClasses.formColumn}`}>
            <Typography className={badgeEditorClasses.badgeSubtitle}>Badge Layout</Typography>
            <div className={badgeEditorClasses.badgeLayoutSelector}>
              <ControlledButton styleClass={badgeEditorClasses.focus}>
                <IconButton data-testid="badge-layout-one-btn" disableRipple={true} onClick={onChangeLayoutOne}>
                  {getConditionalDefaultValue(badge.layout === BadgeModel.BadgeLayout.LARGE_HEADER, <BadgeLayout1IconWithBorder />, <BadgeLayout1Icon />)}
                </IconButton>
              </ControlledButton>
              <ControlledButton styleClass={badgeEditorClasses.focus}>
                <IconButton data-testid="badge-layout-two-btn" disableRipple={true} onClick={onChangeLayoutTwo}>
                  {getConditionalDefaultValue(badge.layout === BadgeModel.BadgeLayout.WHITE_HEADER, <BadgeLayout2IconWithBorder />, <BadgeLayout2Icon />)}
                </IconButton>
              </ControlledButton>
              <ControlledButton styleClass={badgeEditorClasses.focus}>
                <IconButton data-testid="badge-layout-three-btn" disableRipple={true} onClick={onChangeLayoutThree}>
                  {getConditionalDefaultValue(badge.layout === BadgeModel.BadgeLayout.SMALL_HEADER, <BadgeLayout3IconWithBorder />, <BadgeLayout3Icon />)}
                </IconButton>
              </ControlledButton>
            </div>
          </div>
        )}

        {showLogo && (
          <Grid item={true} xs={12} sm={6} md={12} className={`${wrapperClasses.container} ${wrapperClasses.formColumn} ${wrapperClasses.formUploadSpacing}`}>
            <Typography className={badgeEditorClasses.badgeSubtitle}>Badge Logo</Typography>
            <ControlledInput label={null} styleClass={`${badgeEditorClasses.formUploadIndex} ${badgeEditorClasses.formUpload}`}>
              <FileUpload
                uploadId={uploadId}
                showProgress={true}
                maxFileSize={5242880} // 5Mb
                showDelete={true}
                placeholder="Upload file (Only jpg, png and gif formats) Max Size: 5 MB"
                supportedExtensionList={['png', 'jpg', 'jpeg', 'gif']}
                inputProps={{
                  multiple: false,
                  'data-testid': 'badge-media',
                }}
              />
            </ControlledInput>
          </Grid>
        )}
        {showText && !visitorMode && (
          <Grid item={true} xs={12} sm={6} md={12} className={`${wrapperClasses.container} ${wrapperClasses.formColumn} ${wrapperClasses.formBottomSpacing}`}>
            <ControlledInput label={'Badge Text'}>
              <TextField
                autoComplete="off"
                variant="outlined"
                placeholder="Badge Text"
                type="text"
                fullWidth={true}
                value="VISITOR BADGE"
                name="text"
                disabled={true}
                inputProps={{
                  'data-testid': 'badge-text',
                  maxLength: 14,
                }}
              />
            </ControlledInput>
          </Grid>
        )}
        <div className={`${wrapperClasses.container} ${wrapperClasses.formColumn} ${wrapperClasses.formBottomSpacing}`}>
          <Typography className={badgeEditorClasses.badgeSubtitle}>Color</Typography>

          <ColorSelector value={badge.color} onChange={onColorChange} />
        </div>
        <Grid item={true} xs={12} sm={6} md={12}>
          <ControlledSelect
            label="Badge Font"
            name="badgeFont"
            value={badge.font}
            styleClass={`${badgeEditorClasses.badgeSubtitle} ${getConditionalDefaultValue(visitorMode, badgeEditorClasses.badgeVisitorFontSpacing, '')}`}
            options={fontOptionList}
            onChange={onChangeFont}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(BadgeEditor);
