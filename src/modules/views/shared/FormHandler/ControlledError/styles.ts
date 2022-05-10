import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    errorMessage: {
      color: STYLE.COLOR.ERROR_FORM,
      fontWeight: 600,
      fontSize: `${toREM(13)} !important`,
      lineHeight: '21px',
      position: 'absolute',
    },
  })
);
