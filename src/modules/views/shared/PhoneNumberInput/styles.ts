import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    phoneInput: {
      '&:hover': {
        '&.react-tel-input .flag-dropdown': {
          border: '2px solid rgb(130, 130, 130)',
        },
        '&.react-tel-input .form-control': {
          border: '2px solid rgb(130, 130, 130)',
        },
      },
      '&.react-tel-input': {
        width: 'unset',
      },
      '&.react-tel-input .flag-dropdown': {
        border: '2px solid #CCC',
        backgroundColor: '#fff',
      },
      '&.react-tel-input .form-control': {
        height: '50px',
        margin: 0,
        display: 'block',
        color: 'currentColor',
        padding: '15.5px 14px',
        paddingLeft: '48px',
        minWidth: 0,
        backgroundColor: '#fff',
        animationName: 'mui-auto-fill-cancel',
        letterSpacing: 'inherit',
        animationDuration: '10ms',
        fontWeight: 600,
        '-webkit-tap-highlight-color': 'transparent',
        width: '100%',
        border: '2px solid #CCC',
        '&::placeholder': {
          color: '#C7C7C7',
        },
        '&:disabled': {
          color: 'rgba(0, 0, 0, 0.38)',
        },
      },
      '&.react-tel-input .country-list': {
        border: 'none',
      },
      '&.react-tel-input .form-control.open': {
        border: '2px solid #CCC',
      },
    },
    focus: {
      '&.react-tel-input .flag-dropdown': {
        border: '2px solid rgb(130, 130, 130)',
      },
      '&.react-tel-input .form-control': {
        border: '2px solid rgb(130, 130, 130)',
      },
    },
    errorBorder: {
      borderColor: `${STYLE.COLOR.ERROR_FORM} !important`,
    },
  })
);
