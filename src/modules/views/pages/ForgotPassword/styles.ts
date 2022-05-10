// @ts-nocheck
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toREM } from '../../../../utils/generalUtils';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    resetPasswordBtnWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      marginTop: 30,
    },
    resetPasswordBtn: {
      width: '100%',
      height: `${toREM(50)}`,
      textTransform: 'inherit',
      fontWeight: 600,
      boxShadow: 'none',

      '& .MuiButtonBase-root': {
        height: `${toREM(50)}`,
      },
      '&.MuiButton-label': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        textTransform: 'none',
      },
    },
    resetPasswordError: {
      '&.MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
        fontWeight: 600,
        marginBottom: 0,
        lineHeight: `${toREM(15)}`,
        position: 'relative',
      },
    },
    emailInput: {
      marginBottom: 2,
      '&.MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },

      '& .MuiTextField-root': {
        marginTop: '4px',
      },
    },
    emailTextField: {
      '&.MuiTextField-root': {
        backgroundColor: STYLE.COLOR.OCTONARY,
      },
      '&.MuiInputBase-input': {
        height: '0.85em',
        lineHeight: '27px',
        padding: '0 !important',

        '&::placeholder': {
          color: STYLE.COLOR.SECONDARY_DARKER,
        },
      },

      '&.MuiOutlinedInput-input': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
        fontWeight: 500,
        position: 'relative',
        top: `${toREM(2)}`,
      },

      '&.Mui-focused': {
        '&.MuiSvgIcon-root': {
          fill: STYLE.COLOR.SECONDARY_DARKER,
        },
      },
    },
    emailIcon: {
      '& svg': {
        fill: STYLE.COLOR.INACTIVE,
      },
    },
    filledEmailIcon: {
      '& svg': {
        fill: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    errorEmailIcon: {
      '& svg': {
        fill: STYLE.COLOR.ERROR_ICON,
      },
    },
  })
);
