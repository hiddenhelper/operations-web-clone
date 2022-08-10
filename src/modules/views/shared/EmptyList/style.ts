import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '300px',
    },
    missingListText: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(24)}`,
      fontWeight: 'bold',
      position: 'relative',
      top: `${toREM(24)}`,
      textAlign: 'center',
    },
    missingAvatarWrapper: {
      backgroundColor: STYLE.COLOR.LIGHT_GRAY7,
      height: `${toREM(64)}`,
      width: `${toREM(64)}`,

      '& svg': {
        fill: STYLE.COLOR.WHITE,
        position: 'relative',
        bottom: '1px',
      },
    },
  })
);
