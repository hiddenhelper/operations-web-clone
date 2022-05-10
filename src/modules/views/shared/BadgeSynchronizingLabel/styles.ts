import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    isSynchronizingLegendContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: '20px',
      fontSize: '13px',
      color: '#777777',
      '& svg': {
        width: '18px',
        height: '18px',
      },
      '& path': {
        fill: '#C9C9C9',
      },
    },
    isSynchronizingLegend: {
      marginLeft: '8px',
    },
  })
);
