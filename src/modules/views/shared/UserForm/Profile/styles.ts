import { createStyles, makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme =>
  createStyles({
    inputBottomPadding: {
      paddingBottom: 25,
    },
    profileFormPaddingTop: {
      paddingTop: 22,
    },
    formButtonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: 5,
      paddingBottom: 40,
    },
    passwordButtonWrapper: {
      paddingTop: 33,
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPosition: {
      bottom: '2px',
    },
    errorPositionProcore: {
      bottom: 'unset',
    },
  })
);
