import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: '100vh',
      backgroundColor: STYLE.COLOR.LOGIN_BACKGROUND,
    },
    box: {
      margin: theme.spacing(2, 0, 0, 0),
      width: '100%',
    },
    placeholderLogo: {
      margin: theme.spacing(0, 0, 8, 0),
    },
    formTitle: {
      margin: '0px 0px 18px 0px',
      fontWeight: 'bold',
      position: 'relative',
      top: `${toREM(31)}`,
    },
    formLoginContainer: {
      height: '540px',
      width: '100%',
      maxWidth: `${toREM(900)}`,
      maxHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: STYLE.COLOR.WHITE,
      borderRadius: '10px',
      boxShadow: '0 0 15px 0 rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    formLoginWrapper: {
      width: '100%',
      maxWidth: `${toREM(440)}`,
    },
    formLoginImg: {
      height: '100%',
      width: 'auto',
      maxWidth: `${toREM(440)}`,
      objectFit: 'cover',
    },
    formRightContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 3.6em',
      position: 'relative',

      '& .MuiInputBase-root': {
        '& .MuiOutlinedInput-inputAdornedStart': {
          paddingLeft: '0 !important',
        },
      },
    },
    formRightContainerWrapper: {
      position: 'relative',
      top: `${toREM(80)}`,
    },
    formControl: {
      width: '100%',
    },
    formControlMargin: {
      margin: theme.spacing(0, 0, 1, 0),
    },
    textField: {
      margin: theme.spacing(1, 0, 1, 0),
      backgroundColor: 'rgba(249,249,249,0.5)',
      '& .MuiInputBase-input': {
        height: '0.85em',
        lineHeight: '27px',

        '&::placeholder': {
          color: STYLE.COLOR.SECONDARY_DARKER,
        },
      },

      '& .MuiOutlinedInput-input': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
        fontWeight: 500,
        position: 'relative',
        top: `${toREM(2)}`,
      },

      '& .Mui-focused': {
        '& .MuiSvgIcon-root': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
    },
    submitWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      bottom: '5px',
    },

    submitWrapperAnchor: {
      color: STYLE.COLOR.ACCENT_PRIMARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      '&:hover': {
        color: STYLE.COLOR.ACCENT_PRIMARY_DARKER,
        textDecoration: 'none',
      },
    },
    submit: {
      margin: theme.spacing(2, 0, 2, 0),
      width: `${toREM(160)}`,
      height: `${toREM(50)}`,
      textTransform: 'capitalize',
      fontWeight: 600,
      boxShadow: 'none',

      '& .MuiButton-label': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
    legalLabelWrapper: {
      position: 'relative',
      top: '40px',
    },
    legalLabel: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 500,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
    },
    loginLabels: {
      '&:not(:first-child)': {
        margin: '10px 0px 0px 0px',
      },

      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },

      '& .MuiTypography-caption': {
        position: 'relative',
        top: '8px',
      },
    },
    loginIcons: {
      '& svg': {
        fill: STYLE.COLOR.INACTIVE,
      },
    },
    loginLogo: {
      width: `${toREM(192.85)}`,
      height: `${toREM(74.79)}`,
    },
    errorLoginMessage: {
      lineHeight: '3px',
    },
    errorIcon: {
      '& svg': {
        fill: STYLE.COLOR.ERROR_ICON,
      },
    },
    filledInput: {
      '& svg': {
        fill: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    logoWrapper: { top: '50px', position: 'absolute' },
    errorResponse: {
      display: 'flex',
      color: 'red',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: '9px',
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
      },

      '& .MuiSvgIcon-root': {
        marginRight: '13px',
      },
    },
  })
);
