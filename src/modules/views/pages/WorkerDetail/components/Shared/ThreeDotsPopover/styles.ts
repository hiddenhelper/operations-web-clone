import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    invoiceIconDisabled: {
      '& path': {
        fill: STYLE.COLOR.LIGHT_GRAY7,
      },
    },
    invoiceRowButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& .MuiButtonBase-root': {
        padding: '0 5px 0 0',
        '&:hover': {
          background: 'none',
        },
      },

      '& .buttonMenuWrapper': {
        left: '0px !important',
      },

      '& .buttonMenuContainer': {
        height: 'auto',
      },

      '& .Mui-disabled': {
        backgroundColor: 'initial',
      },
    },
    invoiceActionsButton: {
      background: 'none',
      minWidth: 'initial',
    },
  })
);
