import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../constants';
import { toREM } from '../../../utils/generalUtils';

export const listGlobalStyles = makeStyles(theme =>
  createStyles({
    generalListMarginBottom: {
      marginBottom: STYLE.APPBAR.HEIGHT,
    },
    close: {
      display: 'none',
    },
    title: {
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING_BIG)}`,
      color: 'rgba(0,0,0,0.7)',
      fontWeight: 600,
      lineHeight: `${toREM(28)}`,
      top: '8px',
      position: 'relative',
      display: 'inline-block',
      marginTop: '5px',
      marginBottom: '30px',
    },
    createButton: {
      fontSize: `${toREM(15)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      float: 'right',
      border: `${toREM(1.6)} solid ${STYLE.COLOR.ACCENT_PRIMARY}`,

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
      '&:hover': {
        backgroundColor: 'transparent',
        border: `${toREM(1.6)} solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      },
    },
    primaryButtonLarge: {
      width: `${toREM(160)}`,
      height: `${toREM(50)}`,
    },
    noHover: {
      '& .MuiButton-root:hover': {
        backgroundColor: 'inherit !important',
      },
    },
    listName: {
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      fontWeight: 600,
      fontSize: '15px',
      textTransform: 'inherit',
      '& button': {
        display: 'flex',
        justifyContent: 'flex-start',
      },
      '& .MuiButton-label': {
        textTransform: 'capitalize',
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
        fontWeight: 600,
      },
    },
    listNameFullWidth: {
      width: '100%',
    },
    listGeneralText: {
      color: STYLE.COLOR.ACCENT_QUATERNARY,
    },
    widgetsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '17px',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',

        '& .MuiPaper-root': {
          marginBottom: 20,
          '&:last-child': {
            marginBottom: 0,
          },
        },
      },
    },
    dashboardWidgetsWrapper: {
      minHeight: 225,
    },
    filterDivider: {
      position: 'relative',
      bottom: '12px',
      marginBottom: '5px',
      marginTop: '12px',
    },
    entityTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    listDetail: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
    },
    company: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: `${toREM(73)}`,
    },
    listAccent: {
      fontWeight: 600,
      paddingBottom: '2px',
    },

    ctaWrapper: {
      position: 'relative',
      marginTop: `${toREM(30)}`,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px 4px',
      '& a': {
        textDecoration: 'none',

        '&:nth-child(2)': {
          position: 'relative',
          left: '12px',
        },
      },
    },
    generalListContent: {
      width: 'calc(100% - 321px)',
    },
    initialFilter: {
      position: 'relative',
      left: `${toREM(12)}`,
    },
    invertedRow: {
      '&:nth-of-type(even)': {
        backgroundColor: `${STYLE.COLOR.WHITE} !important`,
      },
      '&:nth-of-type(odd)': {
        backgroundColor: `${STYLE.COLOR.QUINARY_LIGHTER} !important`,
      },
    },
    ellipsedColumn: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    clickableRow: {
      cursor: 'pointer',
    },
    clickableTableCell: {
      color: `${STYLE.COLOR.ACCENT_PRIMARY_LIGHTER} !important`,
      fontWeight: 600,
      '&:hover': {
        color: `${STYLE.COLOR.ACCENT_PRIMARY_LIGHTER} !important`,
        textDecoration: 'none',
      },
    },
  })
);

export const listTableRowStyles = () =>
  createStyles({
    root: {
      height: 60,
      '& td': {
        minWidth: '160px',
        color: STYLE.COLOR.SECONDARY,
        maxWidth: '200px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      '& .MuiTableCell-root': {
        paddingTop: `${toREM(11)}`,
        paddingBottom: `${toREM(11)}`,
        '& .MuiButtonBase-root': {
          '& .MuiButton-label': {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'block',
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&:nth-of-type(odd)': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
  });
