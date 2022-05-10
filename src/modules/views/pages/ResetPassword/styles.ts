// @ts-nocheck
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    confirmResetPasswordBtnWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      marginTop: 30,
    },
    confirmResetPasswordBtn: {
      width: '100%',
      height: `${toREM(50)}`,
      textTransform: 'inherit',
      fontWeight: 600,
      boxShadow: 'none',

      '& .MuiButtonBase-root': {
        height: `${toREM(50)}`,
      },
      '&.MuiButton-label': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        textTransform: 'none',
      },
    },
  })
);
