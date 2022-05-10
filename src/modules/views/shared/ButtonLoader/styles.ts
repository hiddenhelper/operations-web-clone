import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    loading: {
      backgroundColor: `${STYLE.COLOR.UNCOMPLETED} !important`,

      '& .MuiButton-label': {
        color: STYLE.COLOR.WHITE,
        display: 'flex',
        justifyContent: 'flex-start',
      },

      '& svg': {
        '& g': {
          stroke: STYLE.COLOR.WHITE,
        },
      },
    },
    spinnerWrapper: {
      position: 'relative',
      bottom: '0.5px',
      padding: '0 0.2em',
    },
    textWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '90%',
    },
  })
);
