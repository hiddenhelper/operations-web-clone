import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants/style';

export const useStyles = makeStyles(theme =>
  createStyles({
    appContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    headerSpacer: {
      width: '100%',
      height: STYLE.HEADER.SPACER_HEIGHT,
    },
    sectionContainer: {
      width: '100%',
      height: 0,
      paddingLeft: 0,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: STYLE.SIDEBAR.WIDTH,
      },
    },
  })
);
