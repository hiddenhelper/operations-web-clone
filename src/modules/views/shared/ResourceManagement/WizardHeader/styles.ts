import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    panelContainer: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      flexWrap: 'nowrap',
    },
    leftPanel: {
      padding: '40px 40px 33px 40px',
      borderRight: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      height: `${toREM(140)}`,
      justifyContent: 'space-between',
    },
    fixedHeader: {
      top: 0,
      zIndex: 999,
      position: 'fixed',
      right: '320px',
      left: '80px',
      width: 'auto',
    },
    fullWidth: {
      right: '0px',
    },
    step: {
      lineHeight: '28px',
      color: STYLE.COLOR.LIGHT_GRAY2,
    },
    stepWrapper: {
      top: '4px',
      position: 'relative',
      height: `${toREM(28)}`,
      lineHeight: `${toREM(28)}`,
      fontSize: `${toREM(15)}`,
      color: STYLE.COLOR.ACCENT_SECONDARY,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '70vw',
      textOverflow: 'ellipsis',
      maxWidth: '75vw',

      [theme.breakpoints.down('lg')]: {
        width: '60vw',
      },

      [theme.breakpoints.down('md')]: {
        width: '40vw',
      },
      '& a': {
        textDecoration: 'none',
      },
    },
    stepLink: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.ACCENT_PRIMARY,
    },
    stepLinkSeparator: {
      margin: '0 8px',
    },
    title: {
      fontSize: `${toREM(30)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 'bold',
      lineHeight: `${toREM(28)}`,
      top: '8px',
      position: 'relative',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      '& .MuiButton-outlined': {
        padding: '5px 5px',
      },

      '& .MuiButton-label': {
        position: 'relative',
        top: '2px',
      },
    },
    actionButtonsWrapper: {
      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
    discardButton: {
      height: '36px',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      marginRight: '17px',
    },
    saveButton: {
      height: `${toREM(36)}`,
      width: `${toREM(120)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      fontWeight: 600,
      '&:hover': {
        border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      },
    },
    updateSaveButton: {
      height: `${toREM(50)}`,
      width: `${toREM(163)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      outline: 'none',

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
    savedAt: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      marginRight: `${toREM(25)}`,
      lineHeight: `${toREM(27)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      position: 'relative',
      bottom: '3px',
    },
    checkmark: {
      position: 'relative',
      bottom: '2px',
      right: '2px',
      '& svg': {
        height: `${toREM(14)}`,
      },
    },
    nextButton: {
      height: `${toREM(36)}`,
      width: `${toREM(120)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      outline: 'none',

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
  })
);
