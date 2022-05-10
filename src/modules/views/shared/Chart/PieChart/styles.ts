import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    pieChartClass: {
      '& svg': {
        height: '255px !important',
      },
    },
  })
);
