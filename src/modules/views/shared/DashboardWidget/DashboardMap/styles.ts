import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    mapWrapper: {
      width: '100%',
      height: '380px',
      display: 'flex',
      paddingTop: '24px',
      paddingBottom: '20px',
    },
  })
);
