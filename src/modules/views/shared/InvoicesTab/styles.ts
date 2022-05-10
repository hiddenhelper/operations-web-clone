import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    invoiceModal: {
      '& .MuiDialog-paper': {
        width: '960px',
      },

      '& .MuiDialog-paperWidthSm': {
        maxWidth: 960,
      },
    },
    modalContentWrapper: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
    },
    dividerMargin: {
      marginLeft: '25px !important',
      marginRight: '10px !important',
    },
    filterWrapper: {
      display: 'flex',
    },
  })
);
