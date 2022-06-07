import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from 'constants/style';

export const useStyles = makeStyles(theme =>
  createStyles({
    rowSpace: {
      marginBottom: `${STYLE.FORM.BOTTOM_SPACING} !important`,
    },
    addressWrapper: {
      '& .MuiGrid-root.MuiGrid-container': {
        justifyContent: 'space-between',

        '& .MuiGrid-grid-lg-6': {
          flexBasis: '49%',
          maxWidth: '49%',
        },
        '& .MuiGrid-grid-lg-4': {
          flexBasis: '32%',
          maxWidth: '32%',
        },
      },
    },
    addressLine2: {
      marginBottom: `${STYLE.FORM.BOTTOM_SPACING} !important`,
      '& .MuiInputBase-input': {
        '&::placeholder': {
          textTransform: 'inherit',
        },
      },
    },
    county: {
      marginBottom: '8px !important',
      '& .MuiInputBase-input': {
        '&::placeholder': {
          textTransform: 'inherit',
        },
      },
    },
    middleWrapper: {
      justifyContent: 'space-between',

      '& .MuiGrid-grid-lg-6': {
        flexBasis: '48% !important',
        maxWidth: '48% !important',
      },
    },
    city: {
      maxWidth: '71%',
      flexBasis: '71%',
    },
    enableUserButton: {
      opacity: '1',
    },
    disableUserButton: {
      opacity: '0.5',
      color: 'Gray',
      cursor: 'not-allowed !important',
    },
    inactiveAdd: {
      color: STYLE.COLOR.UNCOMPLETED,
    },
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    mapWrapper: {
      padding: '0px',
    },
  })
);
