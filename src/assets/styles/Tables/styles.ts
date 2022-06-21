import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../constants/';
import { toREM } from '../../../utils/generalUtils';

export const tableGlobalStyles = makeStyles(theme =>
  createStyles({
    tableWrapper: {
      overflowX: 'initial',
      '& .MuiTableCell-head': {
        paddingBottom: '5px',
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        color: STYLE.COLOR.SECONDARY_LIGHTER,
      },
      '& .MuiTable-root': {
        tableLayout: 'fixed',
      },
      '& .MuiTableCell-root': {
        color: STYLE.COLOR.SECONDARY_LIGHTER,
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
    leftFilter: {
      '& .MuiList-root': {
        right: 'initial !important',
      },
    },
    boldAccent: {
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      fontWeight: 600,

      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
    tableBackground: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
    },
    tableColoredEllipsis: {
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    selectedRow: {
      backgroundColor: `${STYLE.COLOR.SELECTED_BACKGROUND} !important`,
    },
    tableEllipsis: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    widgetFilterContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: `${toREM(40)}`,
      '@media (max-width:415px)': {
        marginBottom: `${toREM(52)}`,
      },
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingTop: '32px',
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
      marginBottom: `${toREM(17)}`,
    },
    statusFilter: {
      display: 'flex',
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
          color: '#4C4C4C',
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
    filterActionsContainer: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px',
      '& .MuiBox-root': {
        height: `${toREM(24)}`,
      },
      '& .MuiDivider-vertical': {
        marginLeft: `${toREM(16)}`,
        marginRight: `${toREM(16)}`,
        '&$dividerNoSpacing': {
          margin: 0,
        },
      },
    },
    filterActionsContainerLeft: {
      display: 'flex',
    },
    filterActionsContainerPadding: {
      paddingTop: `${toREM(10)}`,
      paddingBottom: `${toREM(16)}`,
    },
    filterStatusContainer: {
      width: 'auto',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& .MuiTypography-root': {
        fontSize: STYLE.FONT.SIZE.PARAGRAPH,
      },
    },
    subFilterContainer: {
      paddingTop: '25px',
    },
    filterContainerMaxWidth: {
      '& .MuiButton-label': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .MuiAutocomplete-root, & .MuiAutocomplete-popper': {
        position: 'absolute',
        right: 0,
      },
      '& .MuiAutocomplete-popper': {
        top: '65px',
      },
      '& .MuiAutocomplete-listbox li': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    filterContainerTopPadding: {
      paddingTop: `${toREM(18)} !important`,
    },
    leftFilterStatusContainer: {
      '& .MuiList-root': {
        zIndex: 1,
        right: 'initial !important',
      },
    },
    filterWrapper: {
      display: 'flex',
      position: 'relative',
      left: `${toREM(20)}`,
    },
    floatingFilterWrapper: {
      display: 'inline-block',
      position: 'relative',
      left: `${toREM(0)}`,
      height: '100%',

      '& .MuiAutocomplete-popper': {
        '& .MuiAutocomplete-paper': {
          margin: '0px 0',
          borderRadius: '0 0 5px 5px',
        },
        '& .MuiAutocomplete-listbox': {
          padding: '0px 0',
          maxHeight: 280,

          '& li': {
            height: 40,
            backgroundColor: STYLE.COLOR.WHITE,
            color: STYLE.COLOR.ACCENT_QUINARY,
            fontSize: `${toREM(17)}`,
            letterSpacing: 0,
            borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,

            '&:last-child': {
              borderBottom: 'none',
            },

            '&:hover': {
              backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
            },
          },
        },
        '& .MuiAutocomplete-option': {
          paddingTop: 7,
        },
      },

      '& .MuiList-root': {
        position: 'absolute',
        backgroundColor: STYLE.COLOR.WHITE,
        padding: 0,
        borderRadius: '5px',
        boxShadow: '0 0 5px 0 rgba(0,0,0,0.15)',
        right: 6,
        zIndex: 3,

        '& li': {
          height: 40,
          borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
          color: STYLE.COLOR.ACCENT_QUINARY,
          fontSize: `${toREM(17)}`,
          letterSpacing: 0,
          paddingTop: 7,

          '&:last-child': {
            borderBottom: 'none',
          },

          '&:hover': {
            backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
          },
        },
      },
    },
    floatingFilterButton: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    filterTextColor: {
      color: STYLE.COLOR.SECONDARY_LIGHTER,
    },
    dropdownIcon: {
      opacity: '0.3',
      height: '17px',
      width: '17px',
      marginLeft: '10px',
      '& .MuiButton-root': {
        minWidth: 0,
      },
      '& .MuiButtonBase-root': {
        padding: 0,

        '& .MuiButton-label': {
          '& .MuiButton-startIcon': {
            margin: 0,
          },
        },
      },

      '& .MuiIconButton-root': {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },

      '& svg': {
        opacity: '0.3',
        height: '17px',
        width: '17px',
      },
    },
    dividerColor: {
      backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
    },
    dividerNoSpacing: {
      margin: 0,
    },
    cellAvatar: {
      display: 'flex !important',
      position: 'relative',
      top: '1px',
      alignItems: 'center',
      '& .MuiAvatar-root': {
        backgroundColor: STYLE.COLOR.LIGHT_GRAY3,
        height: `${toREM(32)}`,
        width: `${toREM(32)}`,
        marginRight: `${toREM(20)}`,

        '& .MuiSvgIcon-root': {
          fill: STYLE.COLOR.INACTIVE,
        },
      },
    },
    threeDotsWrapper: {
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'center',
      maxWidth: '100% !important',
      position: 'relative',
      top: 1,
      paddingRight: `${toREM(23)}`,
    },
    threeDotsElement: {
      width: 18,
      fill: STYLE.COLOR.UNCOMPLETED,
    },
    buttonFilter: {
      padding: 0,
      '& .MuiButton-label': {
        fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
        fontWeight: 400,
        color: '#4C4C4C',
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    fontHeadAccent: {
      '& .MuiTableCell-head': {
        fontWeight: 600,
      },
    },
    autocompleteFilterStatus: {
      '& .MuiAutocomplete-root': {
        position: 'absolute',
      },

      '& .MuiAutocomplete-popper': {
        top: 65,
      },
      '& .MuiAutocomplete-option': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'block',
      },
    },
    rightActionButtonsContainer: {
      display: 'flex',
    },
    iconActionButtonsContainer: {
      padding: 10,
      fill: 'currentColor',

      '& svg': {
        marginRight: 30,
        cursor: 'pointer',
      },
    },
    iconButtonActive: {
      color: STYLE.COLOR.ACCENT_PRIMARY,
    },
    iconButtonInactive: {
      color: STYLE.COLOR.UNCOMPLETED,
    },
    disabled: {
      color: STYLE.COLOR.INACTIVE,
    },
    buttonCell: {
      cursor: 'pointer',
    },
    noTopCell: {
      top: 0,
    },
  })
);

export const tableRowStyles = () =>
  createStyles({
    root: {
      '& td': {
        height: 50,
        minWidth: '160px',
        color: STYLE.COLOR.SECONDARY_DARKER,
        maxWidth: '200px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',

        '&:last-child': {
          paddingRight: `${toREM(20)}`,
        },
      },
      '& .MuiTableCell-root': {
        paddingTop: `${toREM(11)}`,
        paddingBottom: `${toREM(11)}`,
      },
      '&:nth-of-type(odd)': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
  });
