import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    stepWrapper: {
      fontSize: `${toREM(15)}`,
      color: STYLE.COLOR.ACCENT_SECONDARY,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    step: {
      '& > span': {
        marginLeft: 5,
        marginRight: 5,
      },
    },
  })
);
