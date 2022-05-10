import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../../utils/generalUtils';
import { STYLE } from '../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    columnSummaryWrapper: {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      '& p': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      '& .MuiSkeleton-root': {
        border: '1px solid red',
      },
    },
    columnSummaryTitle: {
      color: STYLE.COLOR.SECONDARY_LIGHTER,
      fontSize: `${toREM(STYLE.FONT.SIZE.HEADING)}`,
      letterSpacing: 0.16,
      whiteSpace: 'initial !important' as any,
      lineHeight: '27px',
      marginBottom: 5,
      [theme.breakpoints.between(1278, 1295)]: {
        wordBreak: 'break-all',
        width: 160,
      },
    },
    columnSummarySubtitle: {
      color: STYLE.COLOR.LIGHT_GRAY4,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      letterSpacing: 0.1,
    },
    columnSummaryActivity: {},
    skeletonTextWrapper: {
      position: 'relative',
      top: 5,
      marginLeft: 15,
    },
  })
);
