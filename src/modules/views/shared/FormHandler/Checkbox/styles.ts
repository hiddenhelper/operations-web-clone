import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    iconRoot: {
      fontSize: '1.2rem',
    },
    iconRootError: {
      color: STYLE.COLOR.ERROR,
    },
  })
);
