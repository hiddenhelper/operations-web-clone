import { createStyles, makeStyles } from '@material-ui/core/styles';

export const tableRowStyles = () =>
  createStyles({
    container: {
      '.MuiTableCell-root': {
        position: 'relative',
        top: '10px',
        padding: 50,
      },
    },
  });

export const useStylesTable = makeStyles(theme =>
  createStyles({
    link: {
      fontWeight: 600,
      color: '#1F86E8',
      fontSize: '15px',
      '&:hover': {
        color: '#1F86E8',
        textDecoration: 'none',
      },
    },
    colorCell: {
      color: '#444444',
    },
  })
);
