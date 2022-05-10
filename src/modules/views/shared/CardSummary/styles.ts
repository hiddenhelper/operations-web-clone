import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: '35px 40px 38px 40px',
      flexGrow: 1,
      boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    headerTitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: '24px',
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: '38px',
      display: 'inline-block',
    },
    subtitle: {
      color: STYLE.COLOR.SECONDARY,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    widget: {
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${toREM(20)}`,
      '&:first-child': {
        paddingLeft: 0,
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
    widgetTotal: {
      fontSize: `${toREM(40)}`,
      fontWeight: 600,
      color: 'rgba(0,0,0,0.7)',
    },
    widgetDescription: {
      fontSize: `${toREM(20)}`,
      letterSpacing: `${toREM(0.14)}`,
      color: STYLE.COLOR.LIGHT_GRAY5,
    },
    headerEditButton: {},
    divider: {
      margin: '32px 0 34px 0',
    },
    body: {},
    informationColumn: {
      display: 'flex',
      flexDirection: 'row',
    },
    borderRight: {
      borderRight: `1px solid rgba(0, 0, 0, 0.12)`,
      paddingRight: 15,
    },
    paddingLeft: {
      paddingLeft: 15,
    },
    informationColumnText: {
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
    informationColumnIcon: {
      width: `${toREM(40)}`,
      paddingRight: `${toREM(15)}`,
      fill: '#444444',
      '& path': {
        fill: '#444444',
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
    emergencyContactIcon: {
      width: `${toREM(48)}`,
    },
    columnFont: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    cardSummaryChip: {
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      backgroundColor: STYLE.COLOR.SELECTED_BACKGROUND,
      fontWeight: 500,
      borderRadius: '3px',
      fontSize: `${toREM(14)}`,
      marginRight: 10,
      marginBottom: 10,
      '&:last-child': {
        marginRight: 0,
      },
    },
    tradeWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      position: 'relative',
      top: 36,
      flexWrap: 'wrap',
      paddingBottom: 20,
    },
  })
);
