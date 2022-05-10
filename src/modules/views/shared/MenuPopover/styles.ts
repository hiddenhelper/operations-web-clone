import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    iconInactive: {
      '& .MuiButton-endIcon': {
        transform: 'rotate(0deg)',
      },
      '& .MuiIconButton-root': {
        transform: 'rotate(0deg)',
      },
    },
    iconActive: {
      '& .MuiButton-endIcon': {
        transform: 'rotate(180deg)',
      },
      '& .MuiIconButton-root': {
        transform: 'rotate(180deg)',
      },
    },
    buttonWrapper: {
      '& .MuiButton-label': {
        '& span': {
          width: '100%',
          textAlign: 'left',
        },
      },
    },
    itemDivider: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: STYLE.COLOR.ACCENT_SEPTENARY,
    },
  })
);
