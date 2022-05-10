import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    autoCompleteWrapper: {
      '& .MuiSelect-root': {
        width: '85%',
      },

      '& .MuiAutocomplete-popper': {
        '& .MuiAutocomplete-paper': {
          boxShadow: '0 0 5px 0 rgba(0,0,0,0.15)',
          border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
          borderRadius: `${toREM(5)}`,
        },

        '& .MuiPaper-root': {
          padding: 0,
        },

        '& .MuiAutocomplete-listbox': {
          padding: 0,

          '& .MuiAutocomplete-option': {
            height: `${toREM(42)}`,
            fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
            borderBottom: `1px solid ${STYLE.COLOR.QUINARY_LIGHTER}`,
          },

          '& li:last-child': {
            borderBottom: 'none',
          },

          '& [data-testid="search-option-item"]': {
            width: '100%',
            color: STYLE.COLOR.ACCENT_QUINARY,
            maxWidth: '95%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },

          '& .MuiAutocomplete-option[data-focus="true"]': {
            '&:hover': {
              backgroundColor: 'transparent !important',
            },
          },
        },
      },
      '& .MuiAutocomplete-root': {
        backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,

        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
          padding: 0,
          paddingLeft: '9px',
          backgroundColor: STYLE.COLOR.INPUT_BACKGROUND,
        },
      },
      '& .MuiButton-root:hover': {
        backgroundColor: 'transparent',
      },
    },
    autoCompleteButton: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
    },
    createButtonWrapper: {
      position: 'relative',
    },
    createButton: {
      fontSize: '13px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
      color: STYLE.COLOR.ACCENT_PRIMARY,
      fontWeight: 600,
      textTransform: 'inherit',
      left: '0px',
      paddingLeft: '0 !important',
    },
    errorInput: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: STYLE.COLOR.ERROR_FORM,
      },
    },
  })
);
