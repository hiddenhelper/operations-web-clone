import { createStyles, makeStyles } from '@material-ui/core/styles';

import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    box: {
      margin: theme.spacing(5, 0, 0, 0),
      width: '100%',
    },
    formContainerWrapper: {
      paddingTop: `${toREM(39)}`,
    },
    formContainer: {
      position: 'relative',
      minWidth: '398px',
      maxWidth: '398px',
      minHeight: `${toREM(450)}`,
      backgroundColor: STYLE.COLOR.WHITE,
      padding: '0 38px',
      borderRadius: '6px',
      border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      boxShadow: '0 2px 6px 0 rgba(0,0,0,0.03)',
      '@media (max-width:415px)': {
        minWidth: '325px',
        maxWidth: '325px',
      },
      '@media (max-width:321px)': {
        minWidth: '300px',
        maxWidth: '300px',
      },
    },
  })
);
