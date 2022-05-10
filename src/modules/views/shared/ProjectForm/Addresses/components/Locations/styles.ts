import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from 'constants/style';
import { toREM } from 'utils';

export const useStyles = makeStyles(theme =>
  createStyles({
    field: {
      borderBottom: 'none',
      marginBottom: 0,
    },
    divider: {
      marginTop: toREM(19),
      marginBottom: toREM(20),
      backgroundColor: STYLE.COLOR.DIVIDER,
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    addButtonRow: {
      marginTop: toREM(33),
    },
  })
);
