import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    tooltipRoot: {
      fontSize: 13,
      borderRadius: 2,
      height: 24,
      color: STYLE.COLOR.WHITE,
      backgroundColor: STYLE.COLOR.LIGHT_GRAY8,
    },
  })
);
