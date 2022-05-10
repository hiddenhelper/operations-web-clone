import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    widget: {
      minHeight: '115px',
      // width: '400px',
      width: '100%',
      padding: '9px 18px',
      border: '1px solid #E5E5E5',
      boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
      borderRadius: '5px',
      marginRight: '40px',
      '&:last-child': {
        marginRight: 0,
      },
    },
    totalFont: {
      fontSize: '40px',
      fontWeight: 600,
      color: 'rgba(0, 0, 0, 0.7)',
      position: 'relative',
      top: '6px',
    },
    statusFont: {
      fontSize: '20px',
      color: ' #767C85',
    },
    contentFont: {
      minWidth: 63,
      fontSize: '15px',
      color: '#006DF7',
      '& a': {
        textDecoration: 'none',
      },
    },
    contentContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
      top: '2px',
      alignItems: 'center',
    },
  })
);
