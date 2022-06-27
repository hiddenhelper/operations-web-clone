import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from 'constants/style';
import { toREM } from 'utils';

export const useStyles = makeStyles(theme =>
  createStyles({
    dialogPaper: {
      width: '100%',
      maxWidth: '85vw',
    },
    contentContainer: {
      position: 'relative',
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
    },
    title: {
      fontSize: toREM(20),
      fontWeight: 600,
      marginLeft: 12,
    },
    closeButton: {
      marginRight: 'auto',
      fontWeight: 600,
      fontSize: '15px',

      '&:hover': {
        backgroundColor: 'initial',
      },

      '&:focus': {
        outline: 'none',
        border: 'none',
      },

      '& .MuiButton-label:focus': {
        outline: 'none',
        border: 'none',
      },
    },
    discardButton: {
      fontWeight: 600,
      fontSize: '15px',

      '&:hover': {
        backgroundColor: 'initial',
      },

      '&:focus': {
        outline: 'none',
        border: 'none',
      },

      '& .MuiButton-label:focus': {
        outline: 'none',
        border: 'none',
      },
    },
    buttonsContainer: {
      marginRight: 12,
      marginLeft: 16,
      fontSize: toREM(15),
      height: 68,
    },
    titleContainer: {
      padding: '20px 24px',
    },
  })
);
