import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM, hexToRgb } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    fileUploadWrapper: {
      width: '100%',
      position: 'relative',
      marginBottom: 0,
      '& .MuiInputBase-input': {
        display: 'none',
      },
      '&:hover': {
        cursor: 'pointer',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: STYLE.COLOR.FOCUSED_PRIMARY,
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        zIndex: 2,
      },
    },
    fileUpload: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: `${toREM(14)}`,
      backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
    },
    fileUploadText: {
      color: 'currentColor',
      opacity: 0.42,
      textTransform: 'initial',
      fontSize: `${toREM(17)}`,
      fontWeight: 500,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    fileList: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: `${toREM(20)}`,
    },
    fileItem: {
      position: 'relative',
      width: '100%',
      height: '52px',
      paddingTop: `${toREM(14)}`,
      paddingLeft: `${toREM(14)}`,
      paddingBottom: `${toREM(14)}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: `${toREM(20)}`,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    fileItemUploading: {
      paddingBottom: `${toREM(16)}`,
    },
    fileItemError: {
      backgroundColor: STYLE.COLOR.TERTIARY_ERROR,
    },
    fileItemProgress: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '4px',
      appearance: 'none',
      '&::-webkit-progress-bar': {
        backgroundColor: `rgba(${hexToRgb(STYLE.COLOR.ACCENT_PRIMARY_LIGHTER)}, 0.1)`,
      },
      '&::-webkit-progress-value': {
        backgroundColor: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      },
    },
    fileItemText: {
      fontSize: `${toREM(17)}`,
      fontWeight: 600,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    fileName: {
      color: STYLE.COLOR.ACCENT_PRIMARY,
    },
    fileRowTextContainer: {
      display: 'flex',
      width: '75%',
    },
    fileRowError: {
      position: 'relative',
      top: '2px',
    },
    fileRowText: {
      display: 'flex',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '98%',
      marginRight: 0,
    },
    fileSize: {
      color: 'inherit',
      marginLeft: `${toREM(10)}`,
      marginRight: `${toREM(10)}`,
      flex: '1 0 auto',
    },
    fileMessage: {
      fontSize: `${toREM(15)}`,
      fontWeight: 400,
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      marginLeft: `${toREM(20)}`,
    },
    fileError: {
      color: STYLE.COLOR.ERROR_ICON,
    },
    fileUploadItem: {
      minHeight: '140px',
    },
    singleInputUploadItem: {
      minHeight: '61px',
    },
    iconUpload: {
      height: 36,
      width: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: STYLE.COLOR.LIGHT_GRAY7,
      borderRadius: '50%',
      marginRight: 8,
      padding: 0,

      '& svg': {
        fill: STYLE.COLOR.SECONDARY_DARKER,
      },
      '&:hover': {
        backgroundColor: STYLE.COLOR.LIGHT_GRAY7,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    iconButton: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    formControl: {
      width: '100%',

      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },

      '& .MuiOutlinedInput-root': {
        lineHeight: '27px',
        fontWeight: 600,
      },

      '& .MuiOutlinedInput-input': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
        fontWeight: 600,
      },
      '& .MuiOutlinedInput-root:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '1.5px',
        },
      },
      '& .MuiOutlinedInput-root.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '1.5px',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
      },

      '& .Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1.5px',
        },
      },
    },
    requiredMark: {
      color: STYLE.COLOR.ERROR,
    },
    fileListEllipsis: {
      display: 'flex',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    fileCloseIcon: {
      marginRight: `${toREM(2)}`,
      fontSize: `${toREM(26)}`,
    },
    fileItemModal: {
      height: 46,
      '& span': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
  })
);
