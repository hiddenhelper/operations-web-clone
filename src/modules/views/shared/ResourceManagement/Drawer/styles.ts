import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    drawer: {
      width: 331,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 331,
      padding: '0px 30px',
      overflowX: 'hidden',

      '&.MuiPaper-root': {
        position: 'fixed',
        top: 80,
        zIndex: 1,
        overflowY: 'scroll',
        height: 'calc(100% - 80px)',
        paddingBottom: 30,
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
      paddingLeft: 0,
      minHeight: '43px !important',
    },
    drawerButtonWrapper: {
      paddingBottom: `${toREM(10)}`,
    },
    drawerButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'relative',
      left: `${toREM(35)}`,
      paddingTop: '9px',
      '& svg': {
        '& polygon': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
      '& .MuiButtonBase-root': {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    drawerTitle: {
      color: STYLE.COLOR.GRAY20,
      fontSize: `${toREM(20)}`,
      fontWeight: 600,
    },
    drawerSection: {
      display: 'flex',
      paddingBottom: '3px',
      paddingTop: `${toREM(29)}`,
      wordBreak: 'break-word',
      '& svg': {
        '& path': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
    },
    drawerText: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      wordBreak: 'break-word',
      '& span': {
        paddingBottom: '4px',

        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
    drawerMainText: {
      paddingLeft: `${toREM(39)}`,
      display: 'flex',
      flexDirection: 'column',
      '& span': {
        paddingBottom: '4px',

        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
    drawerTextSeparation: {
      paddingLeft: `${toREM(15)}`,
    },
    drawerDivider: {
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
    },
    close: {
      display: 'none',
    },
    projectWrapper: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: `${toREM(28)}`,

      '&:last-child': {
        marginBottom: 0,
      },
    },
    emailAnchor: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 600,
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      textDecoration: 'none !important',
      '&:hover': {
        color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      },
    },
    // repeated
    drawerProjectColumn: {
      flexDirection: 'column',
    },
    drawerColumnDirection: {
      display: 'flex',
      flexDirection: 'column',
    },
    drawerRowDirection: {
      display: 'flex',
      flexDirection: 'row',
    },
    // repeated
  })
);
