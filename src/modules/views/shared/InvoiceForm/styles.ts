import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    errorInputWrapper: {
      position: 'relative',
      width: '100%',
    },
    errorPosition: {
      position: 'relative',
    },
    autocompleteInput: {
      '& .MuiAutocomplete-root': {
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
          paddingRight: '35px',
        },
      },
    },
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
    inputMarginBottom: {
      marginBottom: 44,
    },
    serviceNameCell: {
      padding: '0 16px',

      '& .MuiSelect-root': {
        width: '85%',
      },

      '& .MuiOutlinedInput-notchedOutline': {
        border: 0,
      },

      '& .MuiOutlinedInput-root': {
        backgroundColor: STYLE.COLOR.WHITE,
      },

      '& .MuiOutlinedInput-input': {
        backgroundColor: STYLE.COLOR.WHITE,
        padding: '10px 0px',
        fontWeight: 400,
      },

      '& .MuiSelect-root:focus': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
    serviceAmount: {
      '& .MuiOutlinedInput-input': {
        backgroundColor: STYLE.COLOR.WHITE,
        padding: '10px 0px',
        fontWeight: 600,
      },
    },
    deleteCell: {
      display: 'flex',
      position: 'relative',
    },
    deleteRowContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteRow: {
      top: '0 !important',
    },
    rowButtonWrapper: {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      '& .MuiButton-label': {
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'left',
      },
      '& .MuiButtonBase-root': {
        width: '90%',
        padding: '6px 0',
      },
      '& .MuiButtonBase-root:hover': {
        backgroundColor: 'initial',
      },
    },
    invoiceStatusChip: {
      marginLeft: '0px !important',
    },
    boldTableCell: {
      fontWeight: 600,
    },
    invoiceRowLastCell: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    invoiceRowWithoutStatus: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    invoiceRowStatusCell: {
      display: 'flex',
      alignItems: 'center',
    },
    invoiceRowIconsWrapper: {
      display: 'flex',
      width: 72,
      justifyContent: 'space-around',
      marginLeft: 20,

      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
    invoiceIcon: {
      '& path': {
        fill: STYLE.COLOR.UNCOMPLETED,
      },
    },
    invoiceIconDisabled: {
      '& path': {
        fill: STYLE.COLOR.LIGHT_GRAY7,
      },
    },
    invoiceRowButton: {
      display: 'flex',

      '& .MuiButtonBase-root': {
        '&:hover': {
          background: 'none',
        },
      },

      '& .buttonMenuWrapper': {
        left: '0px !important',
      },

      '& .buttonMenuContainer': {
        height: 'auto',
      },

      '& .Mui-disabled': {
        backgroundColor: 'initial',
      },
    },
    invoiceActionsButton: {
      background: 'none',
      minWidth: 'initial',
    },
    skeletonMargin: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '10px 0px',
    },
    skeletonMarginFee: {
      marginTop: 26,
    },
    skeletonNoMarginBottom: {
      marginBottom: 0,
    },
  })
);
