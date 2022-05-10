// @ts-nocheck
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    termsWrapper: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      paddingTop: '20px',
      paddingBottom: '24px',
      color: STYLE.COLOR.LIGHT_GRAY6,
      display: 'flex',
      alignItems: 'start',
      '& .MuiCheckbox-root': {
        padding: `0`,
        color: STYLE.COLOR.INACTIVE,
        position: 'relative',
        right: '2px',
      },
    },
    legalButton: {
      padding: `0 !important`,
      textTransform: 'inherit',

      '& .MuiButton-label': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        fontWeight: 400,
        textTransform: 'none !important',
      },

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    expiredDateWrapper: {
      paddingTop: `${toREM(38)}`,
      paddingBottom: `${toREM(36)}`,

      '& h1': {
        paddingBottom: '1.5rem',
        wordBreak: 'break-word',
      },
    },
    expiredMessage: {
      color: STYLE.COLOR.LIGHT_GRAY6,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
    },
    successWrapper: {
      position: 'relative',
      top: `${toREM(40)}`,

      '& h1': {
        paddingBottom: `${toREM(32)}`,
        paddingRight: `${toREM(8)}`,
      },
    },
    successContainer: {
      height: `${toREM(285)}`,
    },
    successSubTitle: {
      color: STYLE.COLOR.LIGHT_GRAY6,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
      paddingBottom: `${toREM(28)}`,
    },
    submitWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      bottom: '5px',
    },
    submit: {
      width: '100%',
      height: `${toREM(50)}`,
      textTransform: 'inherit',
      fontWeight: 600,
      boxShadow: 'none',

      '& .MuiButtonBase-root': {
        height: `${toREM(50)}`,
      },
      '&.MuiButton-label': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        textTransform: 'none',
      },
    },
    errorPassword: {
      position: 'relative !important',
      bottom: '14px',
    },
    termConditionError: {
      position: 'relative !important',
      bottom: '18px',
    },
    accentText: {
      color: `${STYLE.COLOR.ACCENT_PRIMARY} !important`,
    },
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

      '&.MuiTypography-root': {
        fontSize: STYLE.FONT.SIZE.PARAGRAPH,
        color: STYLE.COLOR.SECONDARY_DARKER,
      },

      '&.MuiSvgIcon-root': {
        marginRight: '13px',
      },
    },
    confirmTitle: {
      marginBottom: `${toREM(10)}`,
    },
    errorLoginMessage: {
      '&.MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
        fontWeight: 600,
        marginBottom: 0,
        lineHeight: `${toREM(15)}`,
        position: 'relative',
      },
    },
  })
);
