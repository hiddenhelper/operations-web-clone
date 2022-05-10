import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
      },
      '& ~ .MuiAutocomplete-popper': {
        '& .MuiAutocomplete-paper': {
          width: '100%',
          border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.15)',
          '& .MuiAutocomplete-listbox': {
            '& .MuiAutocomplete-option': {
              borderBottom: `1px solid ${STYLE.COLOR.DIVIDER}`,
              '&:last-child': {
                borderBottom: 0,
              },
            },
          },
        },
      },
      '& > div:first-child': {
        width: '100%',
      },
    },
    base: {
      '& .MuiTextField-root': {
        '& .MuiOutlinedInput-root': {
          padding: '0 9px',
          height: '34px',
          '&:hover': {
            backgroundColor: STYLE.COLOR.INPUT_BACKGROUND_HOVER,
          },
          '& .MuiOutlinedInput-input::placeholder': {
            fontWeight: '400 !important',
            opacity: '1 !important',
            fontSize: `${toREM(15)} !important`,
          },
          '&.Mui-focused': {
            backgroundColor: STYLE.COLOR.WHITE,
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: STYLE.COLOR.FOCUSED_PRIMARY,
            },
            '& .MuiInputAdornment-root': {
              opacity: 0,
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
          '& .MuiOutlinedInput-input': {
            padding: '8px 0',
            fontSize: `${toREM(15)}`,
          },
          '& .MuiInputAdornment-root': {
            '& .MuiSvgIcon-root': {
              width: `${toREM(20)}`,
            },
          },
        },
      },
    },
    outlined: {
      '& .MuiTextField-root': {
        '& .MuiOutlinedInput-root': {
          backgroundColor: STYLE.COLOR.SECONDARY_WHITE,
          '&:hover': {
            backgroundColor: STYLE.COLOR.WHITE,
          },
          '&.Mui-focused': {
            backgroundColor: STYLE.COLOR.WHITE,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
          },
        },
      },
    },
    disabled: {
      '& .MuiTextField-root': {
        '& .Mui-disabled': {
          backgroundColor: 'inherit !important',
          '&:hover': {
            backgroundColor: 'inherit !important',
          },
        },
      },
    },
  })
);
