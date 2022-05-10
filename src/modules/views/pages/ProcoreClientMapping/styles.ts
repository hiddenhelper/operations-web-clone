import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';

export const useStyles = makeStyles(theme =>
  createStyles({
    procoreMapping: {
      position: 'relative',
    },
    mappingContainer: {
      padding: 40,
      color: 'rgba(0,0,0,0.7)',
    },
    logo: {
      maxWidth: 150,
    },
    mappingHeader: {
      position: 'relative',
    },
    mappingRow: {
      display: 'flex',
      borderBottom: '1px solid #E5E5E5',
      justifyContent: 'space-between',
    },
    mappingRowHeader: {
      display: 'flex',
      borderBottom: '1px solid #E5E5E5',
      paddingBottom: 35,
      justifyContent: 'space-between',
    },
    mappingRowContent: {
      width: 'calc(50% - 20px)',
      display: 'flex',
      justifyContent: 'space-between',
    },
    actionButtons: {
      display: 'flex',
    },
    mappingColumn: {
      width: 'calc(50% - 20px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      flexDirection: 'column',
      paddingBottom: 12,
      paddingTop: 5,
    },
    mappingRowLeft: {},
    mappingRowRight: {},
    mappingButton: {},
    mappingRowLabel: {
      fontSize: STYLE.FONT.SIZE.PARAGRAPH_SMALL,
      lineHeight: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: 44,
      '& span': {
        position: 'relative',
        top: 5,
        fontWeight: 500,
      },
    },
    mappingRowIndicator: {
      display: 'flex',
      height: 40,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    mappingItemName: {
      fontSize: STYLE.FONT.SIZE.PARAGRAPH_BIG,
      fontWeight: 800,
      lineHeight: 1.6,
      flexGrow: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    mappingSuggestion: {
      color: STYLE.COLOR.SUCCESS,
      fontWeight: 800,
      fontSize: STYLE.FONT.SIZE.PARAGRAPH,
      whiteSpace: 'nowrap',
      marginLeft: 10,
    },
    mappingItemIcon: {
      marginLeft: 20,
      minWidth: 24,
      '& #next': {
        fill: STYLE.COLOR.UNCOMPLETED,
      },
    },
    mappingInputFilter: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      '& .MuiOutlinedInput-input': {
        backgroundColor: 'transparent',
        fontSize: '15px',
      },
    },
    mappingInputSelect: {
      height: 40,
      width: 'calc(100% - 50px)',
      '&.MuiInputBase-root .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
      },
      '&.MuiOutlinedInput-root': {
        '&.MuiInputBase-root .MuiSelect-select:focus': {
          backgroundColor: 'transparent',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${STYLE.COLOR.FOCUSED_PRIMARY}`,
          borderWidth: '2px',
        },
      },
    },
    iconCheck: {
      margin: '0 10px 0',
      height: 30,
      minWidth: 30,
      '& path': {
        fill: STYLE.COLOR.SUCCESS,
      },
    },
    iconInfo: {
      margin: '0 10px 0',
      height: 30,
      minWidth: 30,
      '& path': {
        fill: STYLE.COLOR.ACCENT_TERTIARY,
      },
    },
    iconSaved: {
      margin: '0 10px 0',
      height: 30,
      minWidth: 30,
      '& path': {
        fill: STYLE.COLOR.UNCOMPLETED,
      },
    },

    statusFilter: {
      display: 'flex',
      marginBottom: 40,
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      '& .MuiButtonBase-root': {
        marginRight: '30px',
        textTransform: 'capitalize',
        fontSize: STYLE.FONT.SIZE.PARAGRAPH,
        fontWeight: 600,
        borderRadius: 0,
        minWidth: 0,
        outline: 'none',
        paddingLeft: 0,
        paddingRight: 0,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: 'transparent',
        },
        '& .MuiButton-label': {
          color: STYLE.COLOR.SECONDARY_LIGHTER,
          textDecoration: 'none',
        },
      },
      '& a': {
        outline: 'none',
        textDecoration: 'none',
      },
    },
    activeFilter: {
      '&::after': {
        content: '""',
        float: 'left',
        background: 'rgba(31,134,232,1)',
        width: '100%',
        height: '4px',
        borderRadius: '2px',
        position: 'absolute',
        bottom: '0px',
      },
    },
    autocompleteInput: {
      backgroundColor: '#fff',
      height: 40,
      padding: '3px 60px 3px 8px',
      textOverflow: 'ellipsis',
    },
    switchWrapper: {
      marginLeft: 50,
    },
  })
);
