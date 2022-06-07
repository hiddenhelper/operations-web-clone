import { createStyles, makeStyles } from '@material-ui/core/styles';
import { STYLE } from '../../../../constants';
import { toREM } from '../../../../utils/generalUtils';

export const useStyles = makeStyles(theme =>
  createStyles({
    modalWrapper: {
      '& .MuiPaper-root': {
        maxWidth: '1220px',
        width: '100%',
        minWidth: '72.5%',
      },
      '& .contentContainer': {
        position: 'relative',
        paddingRight: '2.3rem',
        paddingLeft: '2.3rem',
        backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      },
      '& .saveButton': {
        marginRight: '1rem',
      },
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
    acsFilterWrapper: {
      '& .MuiList-root': {
        right: 'initial',
      },
    },
    buttonWithoutFilter: {
      float: 'right',
    },
    autocompleteFilterPosition: {
      '& .MuiAutocomplete-root': {
        position: 'absolute',
      },

      '& .MuiAutocomplete-popper': {
        position: 'absolute',
        top: 65,
      },
    },
    inputErrorLeft: {
      '& .errorMessage': {
        left: '13px',
      },
    },
    inputErrorLeftWithMargin: {
      '& .errorMessage': {
        left: '15px',
      },
    },
    statusChip: {
      height: '22px !important',
      fontSize: `${toREM(12)} !important`,
      fontWeight: 600,
      marginLeft: '11px',
      color: `${STYLE.COLOR.SECONDARY_LIGHTER} !important`,
      backgroundColor: `${STYLE.COLOR.LIGHT_GRAY3} !important`,
    },
    modalEditLocation: {
      '& .MuiDialog-paper': {
        width: '500px',
        overflow: 'visible',
        '& > div': {
          padding: '7.5px 20px',
          '&:first-child': {
            paddingTop: '20px',
          },
          '&:last-child': {
            paddingBottom: '20px',
          },
        },
        '& .MuiDialogTitle-root': {
          fontSize: `${toREM(STYLE.FONT.SIZE.HEADING_MEDIUM)}`,
          color: 'rgba(0,0,0,0.7)',
          fontWeight: 'bold',
          lineHeight: `${toREM(28)}`,
          display: 'inline-block',
        },
      },
      '& .MuiButton-root': {
        maxWidth: `${toREM(136)}`,
        fontWeight: 600,
      },
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
          color: STYLE.COLOR.SECONDARY_LIGHTER,
          textDecoration: 'none',
        },
      },
      '& a': {
        outline: 'none',
        textDecoration: 'none',
      },
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '32px',
      marginBottom: '22px',
      borderBottom: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
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
    filterStatusSpaced: {
      justifyContent: 'space-between',
    },
    drawerDivider: {
      left: 0,
      right: 0,
      width: '100%',
    },
    boldAccent: {
      color: `${STYLE.COLOR.ACCENT_PRIMARY_LIGHTER} !important`,
      fontWeight: 600,

      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
    pointer: {
      cursor: 'pointer',
    },
    boldTitle: {
      '& > h1': {
        color: `${STYLE.COLOR.SECONDARY_DARKER}`,
        fontWeight: 600,
      },
    },
    stepWrapper: {
      fontSize: `${toREM(15)}`,
      color: STYLE.COLOR.ACCENT_SECONDARY,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    userTableWrapper: {
      '& td': {
        paddingTop: `${toREM(13)} !important`,
        paddingBottom: `${toREM(13)}!important`,
      },
    },
    noMargin: { margin: '0 !important' },
    assignNameLeftSpace: {
      position: 'relative',
      right: '10px',
    },
    archiveButton: {
      height: `${toREM(50)}`,
      width: `${toREM(160)}`,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
      lineHeight: '17px',
      textTransform: 'none',
      boxShadow: 'none',
      border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      fontWeight: 600,
      marginTop: toREM(23),

      '&:hover': {
        border: `2px solid ${STYLE.COLOR.ACCENT_PRIMARY}`,
      },
    },
    archiveDialog: {
      '& .MuiPaper-root': {
        width: `${toREM(440)}`,
      },
    },
    assignUserInitialCell: {
      maxWidth: '280px !important',
    },
    userCenter: {
      display: 'flex',
      alignItems: 'center',
    },
    userTitle: {
      cursor: 'pointer',
    },
    createUserHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingTop: `${toREM(25)}`,
      paddingBottom: `${toREM(20)}`,
    },
    createUserAssignWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingBottom: `${toREM(18)}`,
    },
    createUserTitle: {
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_BIG)}`,
      color: STYLE.COLOR.SECONDARY_DARKER,
      fontWeight: 'bold',
    },
    createUserWrapper: {
      padding: `0px ${toREM(22)}`,
      minHeight: `${toREM(540)}`,
      '& .MuiGrid-root': {
        borderBottom: 0,
      },
      '& .MuiOutlinedInput-input': {
        backgroundColor: STYLE.COLOR.SECONDARY_WHITE,
      },
    },
    createUserButtonPosition: {
      position: 'relative',
      bottom: `${toREM(30)}`,
    },
    createUserRowWrapper: {
      width: '102.4%',
    },
    createUserCloseButton: {
      padding: 0,
      minWidth: 0,

      '&:hover': {
        backgroundColor: 'initial',
      },

      '&:focus': {
        outline: 'none',
        border: 'none',
      },
    },
    createUserAssignInput: {
      width: '100%',

      '& .MuiSelect-root': {
        position: 'relative',
        top: '1px',
      },
      '& .MuiOutlinedInput-input': {
        padding: '10.5px 14px',
      },
    },
    errorPosition: {
      position: 'relative',
    },
    avatarPosition: {
      '& .MuiBadge-badge': {
        top: '3.5px !important',
        right: '22px !important',
      },
    },
    filterTextColor: {
      color: STYLE.COLOR.SECONDARY_DARKER,
    },
    hideOverflow: {
      overflow: 'hidden',
      minHeight: 'auto',
    },
    datePickerInline: {
      backgroundColor: 'transparent',
      cursor: 'default',
      '& .MuiInputBase-root': {
        '& svg': {
          width: `${toREM(20)}`,
          height: `${toREM(20)}`,
          '& path': {
            fill: STYLE.COLOR.SECONDARY_DARKER,
          },
        },
        '& .MuiInputBase-input, & .MuiInputBase-input::placeholder': {
          fontSize: `${toREM(15)}`,
          fontWeight: 400,
          color: STYLE.COLOR.SECONDARY_LIGHTER,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          opacity: 1,
          cursor: 'default',
        },
        '&.Mui-focused, &:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    disabled: {
      '& .MuiAutocomplete-popperDisablePortal': {
        display: 'none !important',
      },
    },
    workerName: {
      '& a': {
        textDecoration: 'none',
      },
    },
    visitorRowIconsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
    projectRowIcon: {
      position: 'relative',
      '& path': {
        fill: STYLE.COLOR.UNCOMPLETED,
      },
    },
    badgeVipIcon: {
      position: 'relative',
      '& path': {
        fill: `${STYLE.COLOR.ACCENT_TERTIARY} !important`,
      },
    },
    projectRowLastIcon: {
      marginLeft: 24,
    },
    projectRowFontColor: {
      color: STYLE.COLOR.ACCENT_QUATERNARY,
    },
    activeRowIcon: {
      opacity: 1,
      cursor: 'pointer',
    },
    inactiveRowIcon: {
      opacity: 0.3,
    },
    visitorRowLastCell: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 6,
      paddingBottom: 6,
    },
    visitorRowStatusChip: {
      '& .MuiChip-root': {
        marginLeft: 0,
      },
    },
    badgeIdAccent: {
      fontWeight: 600,
      color: STYLE.COLOR.ACCENT_PRIMARY_LIGHTER,
    },
    visitorModal: {
      '& .MuiPaper-root': {
        height: 350,
        maxWidth: 700,
      },
    },
    modalContentWrapper: {
      backgroundColor: STYLE.COLOR.QUINARY_LIGHTER,
      padding: '35px 40px 35px 40px',
    },
    confirmCta: {
      width: 140,
    },
    modalTextMarginBottom: {
      marginBottom: 22,
    },
    modalInput: {
      width: `${toREM(200)}`,

      '& .MuiInputBase-root': {
        backgroundColor: STYLE.COLOR.SECONDARY_WHITE,
      },
    },
    emptyTabBadgeIcon: {
      '& .MuiAvatar-root': {
        '& svg': {
          height: 37,
          width: 36,
          bottom: 0,
          '& g': {
            '& path': {
              fill: STYLE.COLOR.WHITE,
            },
          },
        },
      },
    },
    visitorRow: {
      '& .MuiTableCell-root': {
        paddingTop: `${toREM(12)} !important`,
        paddingBottom: `${toREM(12)} !important`,
      },
    },
    minimalisticSelectWrapper: {
      '& .MuiSelect-root': {
        padding: '5px 14px 5px 0px',
      },
      '& .MuiSvgIcon-root': {
        top: 0,
        right: 0,
      },
    },
    infoLabel: {
      fontWeight: 400,
      color: STYLE.COLOR.LIGHT_GRAY5,
      fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH_SMALL)}`,
      display: 'flex',
      position: 'absolute',
      top: '5px',

      '& svg': {
        width: '15px',
        height: '15px',
        marginRight: 10,
        flexShrink: 0,

        '& path': {
          transform: 'scale(1.000)',
          fill: STYLE.COLOR.INACTIVE,
        },
      },
    },
    assignVisitorModalContainer: {
      marginBottom: '25px',
    },
    assignVisitorModalGeneralInformationInput: {
      display: 'flex',
      justifyContent: 'center',
    },
    assignVisitorLastInput: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    infoLabelContainer: {
      position: 'relative',
    },
    assignVisitorDateRow: {
      paddingRight: '10px',
      marginBottom: '5px',
    },
    assignVisitorDateColumn: {
      display: 'flex',
      marginTop: '15px',
      marginBottom: '-10px',
    },
    assignVisitorDateInput: {
      width: '91%',
    },
    paymentModalWrapper: {
      '& .MuiDialog-paper': {
        width: '1040px',
        height: '700px',
        maxWidth: 'none !important',
      },
    },
    taxPopUpContainer: {
      '& .MuiPaper-root': {
        width: 440,
        height: 203,
      },
      '& .MuiButton-containedPrimary': {
        width: 100,
        height: 35,
      },
    },
    acsListHeader: {
      padding: '0 30px',
      '& .MuiTypography-root': {
        color: STYLE.COLOR.SECONDARY_LIGHTER,
        fontSize: `${toREM(15)}`,
        fontWeight: 600,
      },
    },
    acsListHeaderDivide: { marginTop: 10, marginBottom: 20 },
    acsListDivider: { marginTop: 20, marginBottom: 20 },
    acsListItemWrapper: { marginLeft: 40, width: 'calc(100% - 40px)' },
    acsListItem: acsListItemStyles,
    acsLocationName: { fontSize: `${toREM(15)}`, fontWeight: 700 },
  })
);

export const tableRowStyles = () =>
  createStyles({
    root: {
      '& .MuiTableCell-root': {
        paddingTop: `${toREM(18.5)}`,
        paddingBottom: `${toREM(18.5)}`,

        '& .MuiButtonBase-root': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&:nth-of-type(odd)': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
  });

export const tableRowSecondaryStyles = () =>
  createStyles({
    root: {
      '& td': {
        minWidth: '160px',
        color: STYLE.COLOR.SECONDARY_LIGHTER,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      '& .MuiTableCell-root': {
        paddingTop: `${toREM(10)}`,
        paddingBottom: `${toREM(10)}`,
        '& .MuiButtonBase-root': {
          width: '100%',
          display: 'flex',
          textAlign: 'left',
          maxWidth: '200px',
          '& .MuiButton-label': {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'block',
            fontWeight: 400,
            fontSize: `${toREM(STYLE.FONT.SIZE.PARAGRAPH)}`,
            color: STYLE.COLOR.SECONDARY_LIGHTER,
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&:nth-of-type(odd)': {
        backgroundColor: STYLE.COLOR.WHITE,
      },
    },
  });

export const drawerBadgeStyles = makeStyles(theme =>
  createStyles({
    badgeRegular: {
      '& svg': {
        '& path': {
          fill: `${STYLE.COLOR.UNCOMPLETED} !important`,
        },
      },
    },
    badgeVip: {
      '& svg': {
        '& path': {
          fill: `${STYLE.COLOR.ACCENT_TERTIARY} !important`,
        },
      },
    },
  })
);

export const acsListItemStyles = {
  backgroundColor: STYLE.COLOR.WHITE,
  border: `1px solid ${STYLE.COLOR.LIGHT_GRAY3}`,
  borderRadius: 5,
  height: 60,
  padding: '8px 30px',
  marginBottom: 10,
  width: '100%',
};
