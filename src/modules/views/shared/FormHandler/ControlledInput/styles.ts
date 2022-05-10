import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../../constants';
import { toREM } from '../../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    loginIcons: {
      '& svg': {
        fill: STYLE.COLOR.INACTIVE,
      },
    },
    loginLabels: {
      '&.MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      },

      '& .MuiTextField-root': {
        marginTop: '4px',
      },
    },
    textField: {
      '&.MuiTextField-root': {
        margin: theme.spacing(1, 0, 1, 0),
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
    formControl: {
      width: '100%',

      '& .MuiTypography-root': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      '& .MuiOutlinedInput-root': {
        lineHeight: '27px',
        fontWeight: 600,
      },

      '& .MuiOutlinedInput-input': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
        fontWeight: 600,
      },
      '& .MuiOutlinedInput-root:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '2px',
        },
      },
      '&.disabled .MuiOutlinedInput-root:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.INPUT_HOVER_DISABLED}`,
        },
      },
      '& .MuiOutlinedInput-root.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '2px',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
      },

      '& .Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: STYLE.COLOR.ERROR_FORM,
          borderWidth: '2px',
        },
      },
    },
    requiredMark: {
      color: STYLE.COLOR.ERROR,
    },
  })
);
