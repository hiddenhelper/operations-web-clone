import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants/style';

export const useStyles = makeStyles(theme =>
  createStyles({
    badgeDivider: {
      width: '100%',
      maxWidth: 80,
      height: '6px',
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
      marginTop: 10,
      borderRadius: 6,
      zIndex: 2,
    },
    dataContainerLeft: {
      width: 289,
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        display: 'block',
        opacity: 1,
      },
    },
    show: {
      animation: '$fadeIn forwards .2s ease-in-out',
    },
    '@keyframes fadeOut': {
      '0%': {
        opacity: 1,
      },
      '99%': {
        display: 'block',
        opacity: 0,
      },
      '100%': {
        opacity: 0,
        display: 'none',
      },
    },
    hide: {
      animation: '$fadeOut forwards .2s ease-in-out',
    },
  })
);
