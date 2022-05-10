import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      position: 'fixed',
      justifyContent: 'center',
      width: '100%',
      zIndex: 99999,
      top: '10px',
      flexDirection: 'column',
      alignItems: 'center',
      lineHeight: '24px',
    },
    toastItem: {
      marginTop: 15,
      padding: '0 16px',
      borderRadius: '4px',
      boxShadow: '0 0 5px 0 rgba(0,0,0,0.25)',
      color: STYLE.COLOR.WHITE,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 400,
      height: `${toREM(40)}`,
      display: 'flex',
      width: 'auto',
      '& p': {
        marginBottom: 0,
      },
    },
    success: {
      backgroundColor: STYLE.COLOR.SUCCESS,
    },
    error: {
      backgroundColor: STYLE.COLOR.ERROR,
    },
    warn: {
      backgroundColor: STYLE.COLOR.SUCCESS,
    },
    info: {
      backgroundColor: STYLE.COLOR.SUCCESS,
    },
  })
);
