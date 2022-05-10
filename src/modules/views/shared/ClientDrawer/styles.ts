import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      wordBreak: 'break-all',
      color: STYLE.COLOR.SECONDARY,
    },
    cancelButtonWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    closeButton: {
      width: `${toREM(80)}`,
      height: `${toREM(24)}`,

      '&:hover': {
        backgroundColor: 'initial',
      },
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    primaryButton: {
      marginLeft: `${toREM(19)}`,
    },
  })
);
