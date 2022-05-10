import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    descriptionInput: {
      '& .MuiInputBase-root': {
        padding: 0,
        height: '147px',
      },
      '& .MuiInputBase-input': {
        height: '110px !important',
        padding: '12px 16px 25px 16px',

        '&::placeholder': {
          textTransform: 'none',
        },
      },
    },
    dateInput: {
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPosition: {
      bottom: '2px',
    },
  })
);
