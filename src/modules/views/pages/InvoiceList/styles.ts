import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    modalContentWrapper: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
    },
    invoiceModal: {
      '& .MuiDialog-paper': {
        width: '960px',
      },

      '& .MuiDialog-paperWidthSm': {
        maxWidth: 960,
      },
    },
    deviceListContent: {
      width: 'calc(100% - 321px)',
    },
    listIconLabel: {
      lineHeight: '24px',
    },
  })
);
