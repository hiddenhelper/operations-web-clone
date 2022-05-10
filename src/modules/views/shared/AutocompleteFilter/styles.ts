import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      backgroundColor: '#fff',

      '& .MuiAutocomplete-inputRoot': {
        '& .MuiAutocomplete-input': {
          padding: '2.5px 4px',
        },
      },
      '& .MuiAutocomplete-endAdornment': {
        display: 'none',
      },
      '& .Mui-focused': {
        border: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
      },
      '& .MuiInputBase-root': {
        paddingRight: '9px !important',
        height: 39,
        borderBottom: '1px solid #E5E5E5',
        boxShadow: '0 0 5px 0 rgba(0,0,0,0.15)',
        borderRadius: '5px 5px 0 0',
      },
    },
    buttonContainer: {
      '& .MuiAutocomplete-root': {
        '& .MuiFormControl-root': {
          zIndex: 9,
        },
      },
    },
  })
);
