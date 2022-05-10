import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../constants';
import { toREM } from '../../../utils/generalUtils';

export const buttonsGlobalStyles = makeStyles(theme =>
  createStyles({
    regular: {
      height: toREM(35),
      fontSize: toREM(15),
      lineHeight: toREM(17),
      padding: `${toREM(8)} 0px`,
      width: toREM(120),
    },
    submitButton: {
      height: toREM(35),
      margin: '0 35px',
      padding: `${toREM(8)} 0px`,
      width: '120px',
    },
    createButton: {
      fontSize: `${toREM(15)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      fontWeight: 600,
      float: 'right',
      border: `${toREM(1.6)} solid ${STYLE.COLOR.ACCENT_PRIMARY}`,

      '& .MuiButton-label': {
        position: 'relative',
        top: '1px',
      },
    },
    primaryButtonLarge: {
      width: `${toREM(160)}`,
      height: `${toREM(50)}`,
    },
    noHover: {
      '& .MuiButton-root:hover': {
        backgroundColor: 'inherit !important',
      },
    },
  })
);
