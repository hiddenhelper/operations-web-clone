import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants/style';
import { toREM } from '../../../../../utils/generalUtils';

export const wrapperStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
    },
    generalContainerPadding: {
      paddingTop: 18,
    },
    formColumn: {
      flexDirection: 'column',
    },
    formRow: {
      flexDirection: 'row',
    },
    formBottomSpacing: {
      paddingBottom: 25,
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
    },
    formSpacing: {
      marginRight: theme.spacing(5),
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    formButtonSpacing: {
      paddingBottom: 24,
    },
    formUploadSpacing: {
      paddingBottom: 0,
    },
  })
);

export const badgeEditorStyles = makeStyles(theme =>
  createStyles({
    container: {
      alignItems: 'center',
      height: 490,
    },
    containerBackground: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      paddingBottom: 32,
    },
    badgeSubtitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    badgeLayoutSelector: {
      marginTop: 3,
      '& .MuiIconButton-root': {
        padding: 0,
        marginRight: 20,
        borderRadius: 0,
        '& :last-child': {
          marginRight: 0,
        },
      },
      '& button:focus': {
        outline: '0px',
      },
    },
    formUpload: {
      '& .MuiFormControl-root': {
        backgroundColor: 'rgba(249, 249, 249, 0.5)',
      },
      '& .MuiOutlinedInput-input': {
        backgroundColor: 'transparent',
      },
    },
    focus: {
      outline: 0,
      '& .Mui-focusVisible': {
        border: '2px solid #585858',
        borderRadius: '6px !important',
      },
    },
    formUploadIndex: {
      zIndex: 1,
    },
    badgeVisitorFontSpacing: {
      marginTop: 25,
    },
  })
);

export const colorSelectorStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'inline',
      flexDirection: 'row',
      width: '100%',
      maxWidth: 290,
      position: 'relative',
      top: 12,
    },
  })
);

export const colorSelectorRadio = makeStyles(theme =>
  createStyles({
    root: {
      padding: 0,
      marginRight: 18,
      marginBottom: 12,
      boxShadow: '0px 0px 0px 3px rgb(229 229 229), 0px 0px 0px 2px rgb(229 229 229)',
      width: 24,
      height: 24,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '100%',
      width: 18,
      height: 18,
      padding: 0,
    },
    checkedIcon: {
      borderRadius: '100%',
      '&:before': {
        display: 'block',
        width: 22,
        height: 22,
        content: '""',
        boxShadow: '0px 0px 0px 3px #444444',
        borderRadius: '100%',
      },
      '& .Mui-focusVisible': {
        boxShadow: '0px 0px 0px 2px #444444',
      },
    },
    focus: {
      outline: 0,
    },
  })
);
