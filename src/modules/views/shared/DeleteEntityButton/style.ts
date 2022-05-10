import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    deleteButton: {
      position: 'relative',
      top: '39px',
      padding: 0,

      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& svg': {
        '& path': {
          fill: STYLE.COLOR.ERROR_ICON,
        },
      },
    },
  })
);
