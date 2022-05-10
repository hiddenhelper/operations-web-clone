import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants/style';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding: '35px 40px 38px 40px',
      margin: '20px 0',
    },
    title: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: 0,
      lineHeight: '38px',
      display: 'inline-block',
      paddingRight: '24px',

      '& .MuiCheckbox-root': {
        paddingLeft: 0,
      },
    },
    secondaryActions: {
      '& .MuiButtonBase-root': {
        padding: 0,
        position: 'relative',
        bottom: '2px',
        fontWeight: 400,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '& .MuiButton-endIcon': {
          height: '26px',
          display: 'flex',

          '& svg': {
            width: '20px',
            height: '20px',

            '& path': {
              transform: 'scale(1.000)',
            },
          },
        },
      },
    },
    divider: {
      margin: '7px 0 11px 0',
      backgroundColor: STYLE.COLOR.DIVIDER,
    },
    separator: {
      margin: '10px 0',
    },
  })
);
