import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants/style';

export const useStyles = makeStyles(theme =>
  createStyles({
    addressWrapper: {
      width: '100%',
      height: '75px',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '8px',
      marginBottom: STYLE.FORM.BOTTOM_SPACING,
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPosition: {
      position: 'relative',
    },
  })
);
