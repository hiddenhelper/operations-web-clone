import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    mapWrapper: {
      width: '100%',
      height: '380px',
      display: 'flex',
      paddingTop: '24px',
      paddingBottom: '20px',
    },
    columnActivityList: {
      padding: 0,
      columnCount: 2,
      position: 'relative',
      top: 7,

      '& li:nth-child(3) p': {
        overflow: 'initial',
      },
    },
    columnActivityListItem: {
      display: 'flex',

      '& span, .MuiTypography-root': {
        color: STYLE.COLOR.SECONDARY_LIGHTER,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
        letterSpacing: 0.38,
      },

      '& span': {
        marginRight: 10,
        fontWeight: 600,
      },
    },
    columnNoActivity: {
      padding: 0,
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
    middleWidget: {
      paddingRight: 20,
    },
    lastWidgetItem: {
      paddingRight: 7,
      [theme.breakpoints.down('md')]: {
        padding: 0,
      },
    },
    columnWidgetsWrapper: {
      paddingLeft: 13,
      [theme.breakpoints.down('md')]: {
        padding: 0,

        '& .MuiPaper-root': {
          marginBottom: 20,
          '&:last-child': {
            marginBottom: 0,
          },
        },
      },
      [theme.breakpoints.down('sm')]: {
        padding: 0,

        '& .MuiPaper-root': {
          marginBottom: 20,
          '&:last-child': {
            marginBottom: 0,
          },
        },
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
    widgetTopTitle: {
      '& div': {
        padding: 0,
        position: 'relative',
        bottom: 4,
      },
      '& .MuiSkeleton-root': {
        position: 'relative',
        top: 6,
      },
    },
    contentWrapperLessPaddingBottom: {
      marginBottom: '26px !important',
    },
    skeletonWrapper: {
      width: '90% !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    skeletonTextWrapper: {
      position: 'relative',
      top: 5,
      marginLeft: 15,
    },
    widgetMarginBottom: {
      display: 'flex',
      marginBottom: '20px',
    },
  })
);
