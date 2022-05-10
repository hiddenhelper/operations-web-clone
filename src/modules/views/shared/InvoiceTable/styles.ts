import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    confirmDialog: {
      '& .MuiPaper-root': {
        width: `${toREM(440)}`,
      },
    },
    confirmButton: {
      width: '173px',
    },
  })
);
