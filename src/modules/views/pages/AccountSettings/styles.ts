import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    fileUploadWrapper: {
      '& .MuiOutlinedInput-notchedOutline': {
        zIndex: 1,
      },
    },
    changePasswordButton: {
      '& .MuiButton-label': {
        paddingLeft: 10,
      },
    },
    box: {
      margin: theme.spacing(5, 0, 0, 0),
      width: '100%',
    },
    inputSubtitle: {
      color: STYLE.COLOR.LIGHT_GRAY6,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      marginBottom: 0,
      paddingBottom: `${toREM(18)}`,
      lineHeight: `${toREM(15)}`,
      paddingTop: 6,
      fontWeight: 600,
    },
    formContainerWrapper: {
      paddingTop: `${toREM(39)}`,
    },
    inputSubtitleError: {
      color: STYLE.COLOR.ERROR_FORM,
    },
    errorSettingsResponse: {
      display: 'flex',
      color: STYLE.COLOR.ERROR_ICON,
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontWeight: 'bold',
      backgroundColor: STYLE.COLOR.TERTIARY_ERROR,
      borderRadius: '4px',
      height: `${toREM(40)}`,
      padding: '8px 10px 8px 9px',
      position: 'relative',
      top: '3px',

      '& .MuiTypography-root': {
        fontSize: STYLE.FONT.SIZE.PARAGRAPH,
        color: STYLE.COLOR.SECONDARY_DARKER,
        paddingLeft: 14,
      },

      '&.MuiSvgIcon-root': {
        marginRight: '13px',
      },
    },
    errorSettingsResponseMarginBottom: {
      marginBottom: 22,
    },
    inputBottomPadding: {
      paddingBottom: 25,
    },
    formContainer: {
      position: 'relative',
      width: `${toREM(598)}`,
      minHeight: `${toREM(450)}`,
      backgroundColor: STYLE.COLOR.WHITE,
      padding: '0 38px',
      borderRadius: '6px',
      border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
    },
    profileFormPaddingTop: {
      paddingTop: 22,
    },
    formButtonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: 5,
      paddingBottom: 40,
    },
    passwordButtonWrapper: {
      paddingTop: 33,
    },
    profileUploadWrapper: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    profileUploadAvatarPosition: {
      paddingRight: 21,
    },
    profileUploadInput: {
      width: '100%',
      paddingBottom: 20,
      position: 'relative',

      '& .MuiOutlinedInput-input': {
        backgroundColor: 'transparent !important',
      },

      '& .MuiOutlinedInput-adornedEnd': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
        paddingRight: 10,
      },
    },
    profileUploadIcon: {
      height: 36,
      width: 43.6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: STYLE.COLOR.LIGHT_GRAY7,
      borderRadius: '50%',
      '& svg': {
        position: 'relative',
        left: '4.1px',
        fill: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    currentPasswordSpacing: {
      paddingBottom: 56,
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPosition: {
      bottom: '2px',
    },
  })
);
