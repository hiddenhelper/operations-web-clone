import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const statusWidgetStyles = makeStyles(theme =>
  createStyles({
    widget: {
      minHeight: '100%',
      width: '100%',
      padding: '9px 20px',
      border: '1px solid #E5E5E5',
      boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
      borderRadius: '5px',
      marginRight: 20,
      paddingTop: `${toREM(12)}`,
      paddingBottom: `${toREM(20)}`,

      '&:last-child': {
        marginRight: 0,
      },
    },
    widgetContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    widgetTitle: {
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING)}`,
      '@media (max-width:415px)': {
        fontSize: '1rem',
      },
    },
    widgetSubtitle: {
      color: STYLE.COLOR.LIGHT_GRAY8,
      fontSize: `${toREM(15)}`,
      letterSpacing: 0.1,
    },
    widgetSubtitlePosition: {
      position: 'relative',
      bottom: 5,
    },
    widgetSubtitleInlinePosition: {
      position: 'relative',
      top: 14,
      paddingBottom: 14,
    },
    widgetTitleBottomMargin: {
      marginBottom: 4,
    },
    widgetContentWrapper: {
      display: 'flex',
      alignItems: 'flex-end',
      maxHeight: 34,
    },
    widgetContentWrapperBottomMargin: {
      marginBottom: 34,
    },
    widgetContentWrapperNoTopMargin: {
      marginTop: 0,
    },
    widgetMarginBottom: {
      marginBottom: 10,
    },
    widgetAuxContentPadding: {
      paddingTop: 20,
      paddingBottom: 23,
    },
    widgetContent: {
      color: 'rgba(0,0,0,0.7)',
      fontSize: `${toREM(45)}`,
      fontWeight: 600,
      letterSpacing: '1.13px',
      height: 45,
    },
    widgetContentResponsive: {
      [theme.breakpoints.between(960, 1140)]: {
        height: 36,
        fontSize: `${toREM(36)}`,
      },
    },
    widgetInlineMargin: {
      marginRight: 11,
      position: 'relative',
      top: 1,
    },
    widgetPaddingTitle: {
      paddingTop: 10,
    },
    widgetInlineStatusWrapper: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
    },
    widgetTitleInlinePosition: {
      position: 'relative',
      top: 11,
    },
    widgetStatus: {
      color: '#8E8D8D',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      letterSpacing: 0.1,
    },
    widgetStatusMarginBottom: {
      marginBottom: 9,
    },
    widgetDivider: {
      backgroundColor: '#DCDCDC',
      marginBottom: 12,
      '@media (max-width:415px)': {
        marginTop: '22px',
      },
    },
    widgetCta: {
      color: STYLE.COLOR.ACCENT_PRIMARY,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      letterSpacing: 0.1,
    },
    chipStatusLeftMargin: {
      marginLeft: `${toREM(20)} !important`,
    },
    statusWrapper: {
      display: 'flex',
      '& div': {
        '&:last-child': {
          marginLeft: 21,
        },
      },
      [theme.breakpoints.between(961, 1120)]: {
        flexDirection: 'column',
        '& div': {
          marginLeft: '0px !important',
        },
      },
    },
    statusWrapperInline: {
      display: 'flex',
      '& div': {
        marginLeft: 21,
        '&:last-child': {
          marginLeft: 21,
        },
      },
      '& .MuiTypography-root': {
        color: STYLE.COLOR.SECONDARY_LIGHTER,
      },
      flexWrap: 'wrap',
      [theme.breakpoints.between(550, 700)]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'end',
        marginLeft: 'auto',
        flexDirection: 'column',
      },
    },
    statusIconPosition: {
      paddingRight: 2,
      '& .MuiChip-label': {
        position: 'relative',
        right: 3,
      },
      '& svg': {
        order: 1,
        position: 'relative',
        right: 14,
        '& g': {
          '& path': {
            fill: STYLE.COLOR.WHITE,
          },
        },
      },
    },
    widgetTitleMarginBottom: {
      marginBottom: 6,
    },
    noDetail: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    widgetMinHeight: {
      minHeight: '496px !important',
    },
    smallMinHeight: {
      minHeight: '440px !important',
      paddingBottom: '0px !important',
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    lineChartWithPieContent: {
      maxHeight: '335px',
      borderRight: '1px solid #DCDCDC',
      paddingRight: '9px',
    },
    pieChartWithLineDefaultContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '350px',
    },
    lineChartMaxHeight: {
      maxHeight: '460px !important',
    },
    pieWidgetDefault: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '335px',
      marginBottom: '52px',
      height: '335px',
    },
    pieWidgetItemDefault: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '350px',
      height: 'auto',
      paddingRight: 0,
    },
  })
);

export const statusWidgetSkeletonStyles = makeStyles(theme =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    columnTitle: {
      position: 'relative',
      top: '3px',
    },
    columnMainContent: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.between('xs', 'sm')]: {
        position: 'relative',
        bottom: 10,
      },

      [theme.breakpoints.between(960, 1155)]: {
        '& .MuiSkeleton-root': {
          width: '100% !important',
        },
      },
    },
    columnContent: {
      position: 'relative',
      bottom: '14px',
      [theme.breakpoints.between('xs', 'sm')]: {
        position: 'relative !important',
        top: 0,
        marginBottom: '39px !important',
      },
    },
    columnAuxContent: {
      top: '41px',
      marginBottom: '20px',
      [theme.breakpoints.between('xs', 'sm')]: {
        position: 'relative !important',
        top: -6,
      },
    },
    columnActivity: {
      position: 'relative',

      [theme.breakpoints.between('xs', 'sm')]: {
        position: 'relative !important',
        top: -20,
      },
    },
    columnCta: {
      position: 'relative',
      top: '42px',

      [theme.breakpoints.between('xs', 'sm')]: {
        position: 'relative !important',
        top: 0,
      },
    },
    inlineMain: {
      position: 'relative',
      top: '3px',
      [theme.breakpoints.between('xs', 1230)]: {
        marginRight: 30,
      },
    },
    inlineActivity: {
      position: 'relative',
      top: '3px',
    },
    inlineAuxContent: {
      marginTop: 22,
      marginBottom: 22,
    },
    inlineCta: {
      position: 'relative',
      top: '10',
    },
    skeletonChipMarginLeft: {
      marginLeft: 20,
    },
  })
);

export const dashboardWidgetInlineHeaderSkeletonStyles = makeStyles(theme =>
  createStyles({
    valueWrapper: {
      marginRight: 15,
    },
    elementBottomMargin: {
      position: 'relative',
      bottom: 4,
    },
    pillMarginLeft: {
      marginLeft: 10,
    },
  })
);

export const dashboardWidgetHeaderSkeletonStyles = makeStyles(theme =>
  createStyles({
    headerMarginTop: {
      marginTop: 10,
    },
  })
);
