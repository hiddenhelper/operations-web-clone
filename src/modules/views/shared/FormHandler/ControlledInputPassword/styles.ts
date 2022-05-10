import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    inputPasswordWrapper: {
      '& .MuiInputBase-input': {
        paddingLeft: 0,
        position: 'relative',
        top: 1,
      },
    },
    inputPasswordBackground: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
      },
      '& .MuiOutlinedInput-input': {
        backgroundColor: 'transparent',
      },
    },
    inactiveIcon: {
      '& path': {
        fill: STYLE.COLOR.INACTIVE,
      },
    },
    errorIcon: {
      '& path': {
        fill: STYLE.COLOR.ERROR_ICON,
      },
    },
    filledInput: {
      '& path': {
        fill: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
  })
);
