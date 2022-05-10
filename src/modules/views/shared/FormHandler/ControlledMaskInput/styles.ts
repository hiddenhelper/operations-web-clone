import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      width: '100%',
      '&:not(:first-child)': {
        margin: theme.spacing(1, 0, 0, 0),
      },
    },
    requiredMark: {
      color: STYLE.COLOR.ERROR,
    },
  })
);
