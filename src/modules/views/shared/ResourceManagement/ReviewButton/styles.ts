import { createStyles, makeStyles } from '@material-ui/core/styles';

import { toREM } from '../../../../../utils/generalUtils';
import { STYLE } from '../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    fieldWrapper: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      fontWeight: 500,
      textTransform: 'inherit',
      '& svg': {
        fill: STYLE.COLOR.BLACK,
      },
    },
    fieldsMissing: {
      color: STYLE.COLOR.SECONDARY_ERROR,
    },
    fieldsCompleted: {
      color: STYLE.COLOR.SUCCESS,
    },
  })
);
