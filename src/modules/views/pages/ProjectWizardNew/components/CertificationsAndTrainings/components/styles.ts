import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from 'constants/index';
import { toREM } from 'utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    autocompleteTextInput: {
      backgroundColor: STYLE.COLOR.WHITE,
      marginBottom: 0,
    },
    autocomplete: {
      backgroundColor: STYLE.COLOR.WHITE,
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
        padding: '7.5px 4px',
      },
    },
    autocompleteWrapper: {
      marginTop: 17,

      '& .MuiSelect-root': {
        width: '85%',
      },

      '& .MuiAutocomplete-popper': {
        zIndex: 3,
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
    autocompleteGroupLabel: {
      fontSize: STYLE.FONT.SIZE.PARAGRAPH,
      fontWeight: 600,
      color: STYLE.COLOR.BLACK,
    },
    deleteGroupButton: { marginRight: -15 },
    group: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      padding: '20px 40px 40px 40px',
      margin: '20px 0',
    },
    groupTitle: {
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontSize: `${toREM(17)}`,
      fontWeight: 600,
    },
    validationTypeWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      flex: '0 1 auto',
      maxWidth: '100%',
    },
    validationTypeInput: {
      backgroundColor: STYLE.COLOR.SECONDARY_WHITE,
      height: `${toREM(40)}`,
      width: 'auto',
      '& .MuiInputBase-root': {
        fontWeight: 600,
        fontSize: `${toREM(17)}`,
      },
      '& .MuiSelect-root': {
        paddingRight: 30,
      },
    },
    groupNameErrorMessage: {
      position: 'relative',
    },
    transparentAutocomplete: {
      '&.MuiAutocomplete-root': {
        backgroundColor: 'transparent !important',
      },
    },
    groupDivider: { marginTop: 10 },
    groupHeader: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' },
    titleInput: {
      height: 40,
      width: '100%',
      marginRight: 24,
      marginBottom: 10,
      '& .MuiInput-root': {
        fontSize: toREM(15),
        fontWeight: 600,
      },
      '& .MuiInput-underline': {
        '&:hover::before': {
          borderBottomColor: STYLE.COLOR.FOCUSED_PRIMARY,
        },
        '&::before': {
          borderBottom: 0,
          borderBottomColor: STYLE.COLOR.FOCUSED_PRIMARY,
        },
      },
    },

    listWrapper: {
      marginTop: 10,
      '& .MuiGrid-container': {
        minHeight: 60,
        alignItems: 'center',
        whiteSpace: 'nowrap',
      },
      '& .MuiTypography-root': {
        fontSize: toREM(15),
        fontWeight: 600,
        color: STYLE.COLOR.SECONDARY_DARKER,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      '& .errorMessage': {
        marginTop: 3,
        color: STYLE.COLOR.ERROR,
        position: 'relative',
      },
    },
    aliasInput: {
      height: 30,
      '& .MuiInput-root': {
        fontSize: toREM(15),
        color: STYLE.COLOR.SECONDARY_DARKER,
      },
      '& .MuiInput-underline': {
        '&:hover::before': {
          borderBottomColor: STYLE.COLOR.FOCUSED_PRIMARY,
        },
        '&::before': {
          borderBottom: 0,
          borderBottomColor: STYLE.COLOR.FOCUSED_PRIMARY,
        },
      },
    },
    aliasError: {
      height: 25,
      '& .MuiInput-root': {
        fontSize: toREM(14),
        color: STYLE.COLOR.SECONDARY_DARKER,
      },
    },
    deleteAliasButton: {
      padding: 0,
      marginLeft: 15,
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& svg': {
        '& path': {
          fill: STYLE.COLOR.ERROR_ICON,
        },
      },
    },
  })
);
