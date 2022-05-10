import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    workerModalIcon: {
      height: 12,
    },
    workerModalIconMargin: {
      marginRight: 4,
    },
    labelWrapper: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      color: STYLE.COLOR.SECONDARY,
      wordBreak: 'break-all',

      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },
    },
  })
);
