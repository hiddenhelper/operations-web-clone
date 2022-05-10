import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    autocompleteFilterPosition: {
      '& .MuiAutocomplete-root': {
        position: 'absolute',
      },

      '& .MuiAutocomplete-popper': {
        position: 'absolute',
        top: 65,
      },
    },
  })
);
