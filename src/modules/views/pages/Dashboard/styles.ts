import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    dashboardName: {
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING_BIG)} !important`,
    },
    emptyValueWidgetContent: {
      color: 'rgba(0,0,0,0.7)',
      height: 45,
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING_1)}`,
      fontWeight: 400,
      letterSpacing: `0`,
      position: 'relative',
      top: 35,
    },
    dashboardTitleWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dashboardText: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(31)}`,
      letterSpacing: 0,
    },
    dashboardAccent: {
      fontWeight: 600,
    },
    dashboardLightText: {
      fontWeight: 300,
    },
    dashboardTitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(30)}`,
      letterSpacing: 0,
      fontWeight: 700,
    },
    dashboardSubtitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(25)}`,
      letterSpacing: 0,
    },
    widgetsContainer: {
      width: '100%',
      height: '100%',
      marginTop: `${toREM(20)}`,
    },
    maxHeight: {
      maxHeight: '496px',
    },
    widgetTrailingRight: {
      '& .MuiGrid-item': {
        '&:first-child': {
          paddingRight: 7,
        },
        '&:last-child': {
          paddingLeft: 10,
        },
      },
    },
    widgetTrailingLeft: {
      '& .MuiGrid-item': {
        '&:first-child': {
          paddingRight: 13,
        },
        '&:last-child': {
          paddingLeft: 7,
        },
      },
    },
    widgetTrailingResponsive: {
      '& .MuiGrid-item': {
        [theme.breakpoints.down('sm')]: {
          '&:first-child, &:last-child': {
            padding: 0,
            marginBottom: 20,
          },
          '&:last-child': {
            marginBottom: 0,
          },
        },
      },
    },
    temporalPlaceholder: {
      height: '185px',
      width: '100%',
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: STYLE.COLOR.SECONDARY_LIGHTER,
    },
    temporalPlaceholderResponsive: {
      [theme.breakpoints.between(960, 1104)]: {
        marginTop: 20,
      },
    },
    temporalLargePlaceholder: {
      height: 216,
    },
    widgetsContainerPaddingBottom: {
      paddingBottom: 37,
    },
    titlePaddingBottom: {
      paddingBottom: 17,
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
    activityWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    statusChipPosition: {
      marginLeft: '0 !important',
      '& .MuiChip-label': {
        top: '2px !important',
      },
    },
    filterWrapper: {
      display: 'flex',
      [theme.breakpoints.between(500, 885)]: {
        justifyContent: 'flex-end',
      },
    },
    filterMargin: {
      marginRight: 22,
    },
    filterDownloadIconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      bottom: 1,
      '& svg': {
        '& path': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
    },
    statusChipBottomPosition: {
      position: 'relative',
      bottom: 2,
    },
    widgetTitleWithFilter: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.between(500, 885)]: {
        flexDirection: 'column',
      },
    },
    noMarginRight: {
      marginRight: '0px',
    },
    bulletLabelPosition: {
      position: 'relative',
      top: 25,
    },
    dashboardHeavyAccent: {
      fontWeight: 'bold',
    },
    widgetSpacing: {
      '& .MuiGrid-item': {
        [theme.breakpoints.down('md')]: {
          // padding: 0,
          marginBottom: 20,
        },
        [theme.breakpoints.down('sm')]: {
          padding: 0,
          marginBottom: 20,
        },
      },
    },
    noMarginTop: {
      marginTop: 0,
    },
    tableWrapper: {
      paddingTop: 20,
      '& .MuiPaper-root': {
        border: '1px solid #E5E5E5',
        boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
        padding: 20,
        paddingBottom: 40,
      },
    },
    tableOverflow: {
      [theme.breakpoints.between(300, 990)]: {
        overflow: 'hidden',
        overflowX: 'scroll !important' as any,
      },
    },
    tableTitle: {
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      fontSize: 24,
      letterSpacing: 0.16,
    },
    tableTitlePaddingBottom: {
      paddingBottom: 14,
    },
    stepWrapper: {
      fontSize: `${toREM(15)}`,
      color: STYLE.COLOR.ACCENT_SECONDARY,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    widgetContentPaddingBottom: {
      paddingBottom: 23,
    },
    widgetContentPaddingTop: {
      paddingTop: 20,
    },
    widgetTitleMarginBottom: {
      marginBottom: 18,
    },
    smallWidgetMinHeight: {
      minHeight: '212px !important',
    },
    dualWidgetSeparation: {
      marginBottom: 22,
    },
    widgetCenterContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    labelWrapper: {
      '& div': {
        marginRight: 28,
        '&:last-child': {
          marginRight: 0,
        },
      },
    },
    threeColumnLayout: {
      [theme.breakpoints.only('sm')]: {
        margin: 0,
        width: '100%',
      },

      '& .MuiGrid-item': {
        paddingLeft: 10,
        paddingRight: 10,

        [theme.breakpoints.only('sm')]: {
          padding: 0,
        },
      },
    },
    labelSkeletonMarginBottom: {
      marginBottom: '17px !important',
    },
    ellipsisBulletLabel: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      '& span': {
        flexShrink: 0,
      },

      '& .MuiTypography-root': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    widgetBulletLabelWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    widgetBulletLabelItem: {
      display: 'flex',
      justifyContent: 'space-between',

      '& span': {
        color: STYLE.COLOR.SECONDARY_LIGHTER,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        letterSpacing: 0.1,
      },
    },
    widgetDivider: {
      backgroundColor: '#DCDCDC',
      marginBottom: 12,
    },
    widgetDividerTopMargin: {
      marginTop: 12,
    },
    revenueWidgetContent: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '350px',
      paddingRight: 0,
      height: 350,
    },
    middleWidget: {
      paddingRight: 20,
    },
    lastWidgetItem: {
      paddingRight: 7,
      [theme.breakpoints.down('md')]: {
        padding: 0,
      },
    },
    withFilter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    legend: {
      fontSize: '13px',
      color: STYLE.COLOR.LIGHT_GRAY5,
      '& svg': {
        width: '20px',
        height: '20px',

        '& path': {
          fill: STYLE.COLOR.INACTIVE,
          transform: 'scale(1.000)',
        },
      },
    },
  })
);
